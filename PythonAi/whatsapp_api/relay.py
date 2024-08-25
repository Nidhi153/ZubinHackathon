from fastapi import FastAPI
from pydantic import BaseModel
import os, requests, json
from dotenv import load_dotenv

# Get tokens
load_dotenv()
ACCESS_TOKEN = os.getenv("ACCESS_TOKEN")
APP_ID = os.getenv("APP_ID")
APP_SECRET = os.getenv("APP_SECRET")
VERSION = os.getenv("VERSION")
PHONE_NUMBER_ID = os.getenv("PHONE_NUMBER_ID")

# app = FastAPI()

# class Broadcast(BaseModel):
#     phonenumbers: list
#     broadcastmessage: str

# class Image(BaseModel):
#     phonenumbers: list
#     image_id: str

# @app.post("/ai/whatsapp/broadcast")
# def relay(item: Broadcast):
#     for phone_num in item.phonenumbers:
#         send_message(get_text_message_input(phone_num, item.broadcastmessage))
#     return item

# @app.post("/ai/whatsapp/images")
# def relay_images(item: Image):
#     for phone_num in item.phonenumbers:
#         send_message(get_image_input(phone_num, item.image_id))

def get_text_message_input(recipient, text):
    return json.dumps(
        {
            "messaging_product": "whatsapp",
            "recipient_type": "individual",
            "to": recipient,
            "type": "text",
            "text": {"preview_url": False, "body": text},
        }
    )

def send_message(data):
    print(data)
    headers = {
        "Content-type": "application/json",
        "Authorization": f"Bearer {ACCESS_TOKEN}",
    }

    url = f"https://graph.facebook.com/{str.lower(VERSION)}/{PHONE_NUMBER_ID}/messages"

    response = requests.post(url, data=data, headers=headers)

    if response.status_code == 200:
        print("Status:", response.status_code)
        print("Content-type:", response.headers["content-type"])
        print("Body:", response.text)
        return response
    else:
        print(response.status_code)
        print(response.text)
        return response

def get_image_input(recipient, image_id: str, caption: str = ""):
    return json.dumps(
        {
            "messaging_product": "whatsapp",
            "recipient_type": "individual",
            "to": recipient,
            "type": "image",
            "image": {"id": image_id, "caption": caption},
        }
    )