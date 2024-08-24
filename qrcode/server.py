import cv2 as cv
import numpy as np
from pyzbar.pyzbar import decode
from fastapi import FastAPI
import asyncio

app = FastAPI()

# Global variables to control the video capture loop and store the current data
running = False
current_data = None

async def video_capture():
    global running, current_data
    cap = cv.VideoCapture(0)
    cap.set(3, 640)
    cap.set(4, 480)

    while running:
        ret, frame = cap.read()
        if not ret:
            break
        for barcode in decode(frame):
            myData = barcode.data.decode('utf-8')
            current_data = myData  # Store the latest decoded data
            pts = np.array([barcode.polygon], np.int32)
            cv.polylines(frame, [pts], True, (255, 0, 255), 5)
            pts2 = barcode.rect
            cv.putText(frame, myData, (pts2[0], pts2[1]), cv.FONT_HERSHEY_SIMPLEX, 0.9, (255, 0, 255), 2)
        cv.imshow('In', frame)
        if cv.waitKey(1) & 0xFF == ord('q'):
            break
        await asyncio.sleep(0)  # Yield control to the event loop

    cap.release()
    cv.destroyAllWindows()

@app.on_event("startup")
async def startup_event():
    global running
    if not running:
        running = True
        asyncio.create_task(video_capture())

@app.get("/start")
async def start_capture():
    global running
    if not running:
        running = True
        await video_capture()
        return {"message": "Video capture started"}
    else:
        return {"message": "Video capture is already running"}

@app.get("/stop")
def stop_capture():
    global running
    if running:
        running = False
        return {"message": "Video capture stopped"}
    else:
        return {"message": "Video capture is not running"}

@app.get("/data")
def get_current_data():
    global current_data
    if current_data:
        return {"current_data": current_data}
    else:
        return {"message": "No data available"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="localhost", port=2000)