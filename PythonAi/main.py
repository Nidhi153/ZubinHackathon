from fastapi import FastAPI, Request
from fastapi.responses import JSONResponse

from ai_chatbot import Chatbot
import recommendation

app = FastAPI()

chat = Chatbot()

@app.post("/recommendation")
async def get_recommended_events(request: Request):
    request_data = await request.json()
    response = recommendation.recommend_events(request_data)
    return JSONResponse(content=response)

@app.post("/ai/chatbot")
async def get_chat_response(request : Request):
    request_data = await request.json()
    response = chat.query(request_data)
    return JSONResponse(content=response)

if __name__ == '__main__':
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)