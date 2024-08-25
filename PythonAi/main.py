from fastapi import FastAPI, Request
from fastapi.responses import JSONResponse
import os
from ai_chatbot import Chatbot
from ai_chatbot import init_chatbot
import recommendation
from dotenv import load_dotenv

load_dotenv()
HF_TOKEN = os.getenv("HF_TOKEN")

app = FastAPI()

chat = Chatbot()

client = init_chatbot(HF_TOKEN)


@app.post("/ai/recommendation")
async def get_recommended_events(request: Request):
    request_data = await request.json()
    response = recommendation.recommend_events(request_data)
    return JSONResponse(content=response)


@app.post("/ai/chatbot")
async def get_chat_response(request: Request):

    # Parse the JSON request body
    request_data = await request.json()

    response = chat.query(request_data, client)

    # Return the response as a JSON response
    return JSONResponse(content=response)


@app.get("/hello")
async def hello():
    return {"message": "Hello, World!"}

    # Return the response as a JSON response


@app.get("/helloworld")
async def hello_world():
    return {"message": "Hello, World!"}  # Return a JSON response
