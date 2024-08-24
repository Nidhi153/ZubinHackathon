import cv2 as cv
import numpy as np
from pyzbar.pyzbar import decode
import asyncio
from fastapi import FastAPI, File, UploadFile
import requests
import qrcode
import qrcode.image.svg
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

# @app.on_event("startup")
# async def startup_event():
#     global running
#     if not running:
#         running = True
#         asyncio.create_task(video_capture())

@app.get("/start")
async def start_capture():
    global running
    if not running:
        running = True
        asyncio.create_task(video_capture())
        return {"message": "Video capture started"}


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

@app.post("/upload-qrcode/")
async def upload_qrcode(input: str):
    # Generate QR code
    # img = qrcode.make(input, image_factory=qrcode.image.svg.SvgImage)

    try:
        img = qrcode.make(input)
        # Save the QR code to a file
        img_file_path = "/tmp/qrcode.png"
        with open(img_file_path, "wb") as f:
            img.save(f)
        
        # Prepare the file for upload
        with open(img_file_path, "rb") as f:
            files = {
                'file': ("qrcode.png", f, "image/png")
            }
            data = {
                'type': "image/png",
                'messaging_product': 'whatsapp'
            }
            headers = {
                'Authorization': 'Bearer EABycHlgN6cgBOxh3AL5VnwML8PxXuS6821KKoUqR2ZAvJ77UwpMZBVGGhROZBvR4obtDuouZBB5iBGEKkHxnqTfZBqtyj8N7QfWy1yk08GgevnBfCW62v2ZAzU6lPZCkEg12dy0ZASZCXGKQnKZCLSb5HETVmR7OIcBZBcMlO6SgZCMvdYkvlLws29p5JuLBs87nWKnIrfhGcJ5XhBVzOQjJV0IZD'
            }
            url = 'https://graph.facebook.com/v20.0/423268137527656/media'

            # Send the request
            response = requests.post(url, headers=headers, files=files, data=data)

        return {
            "status": response.status_code,
            "response": response.json()
        }

    except Exception as e:
        return {
            "status": 500,
            "response": str(e)
        }


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="localhost", port=2000)