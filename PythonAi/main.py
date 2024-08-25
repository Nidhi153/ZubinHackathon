from fastapi import FastAPI, Request
from fastapi.responses import JSONResponse
import os
from ai_chatbot import Chatbot
from ai_chatbot import init_chatbot
import recommendation
from dotenv import load_dotenv
from pydantic import BaseModel
from whatsapp_api.relay import get_text_message_input, get_image_input, send_message

load_dotenv()
HF_TOKEN = os.getenv("HF_TOKEN")

app = FastAPI()

chat = Chatbot()

client = init_chatbot(HF_TOKEN)
class Broadcast(BaseModel):
    phonenumbers: list
    broadcastmessage: str

class Image(BaseModel):
    phonenumbers: list
    image_id: str

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
  

class Broadcast(BaseModel):
    phonenumbers: list
    broadcastmessage: str

class Image(BaseModel):
    phonenumbers: list
    image_id: str

@app.post("/recommendation")
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

@app.post("/ai/whatsapp/broadcast")
def relay(item: Broadcast):
    for phone_num in item.phonenumbers:
        send_message(get_text_message_input(phone_num, item.broadcastmessage))
    return item

@app.post("/ai/whatsapp/images")
def relay_images(item: Image):
    for phone_num in item.phonenumbers:
        send_message(get_image_input(phone_num, item.image_id))3
