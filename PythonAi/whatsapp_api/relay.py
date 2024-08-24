from fastapi import FastAPI
from pydantic import BaseModel
import os, requests, json

#Run: fastapi dev relay.py

"""
Constants
"""

#Please update API Token daily!
ACCESS_TOKEN = "EABycHlgN6cgBOxh3AL5VnwML8PxXuS6821KKoUqR2ZAvJ77UwpMZBVGGhROZBvR4obtDuouZBB5iBGEKkHxnqTfZBqtyj8N7QfWy1yk08GgevnBfCW62v2ZAzU6lPZCkEg12dy0ZASZCXGKQnKZCLSb5HETVmR7OIcBZBcMlO6SgZCMvdYkvlLws29p5JuLBs87nWKnIrfhGcJ5XhBVzOQjJV0IZD"

APP_ID = "8052953488157128"

APP_SECRET = "adce737c3c4faa7191aedf206448a7a4"

VERSION="v20.0"

PHONE_NUMBER_ID="423268137527656"

app = FastAPI()

class Broadcast(BaseModel):
    phonenumbers: list
    broadcastmessage: str

@app.post("/ai/whatsapp/broadcast")
def relay(item: Broadcast):
    for phone_num in item.phonenumbers:
        send_message(get_text_message_input(phone_num, item.broadcastmessage))

    return item

def get_text_message_input(recipient, text):
    return json.dumps(
        {
            "messaging_product": "whatsapp",
            "recipient_type": "individual",
            "to": recipient,
            "type": "text",
            "text": {"preview_url": False, "body": text}
        }
    )

def send_message(data):
    headers = {
        "Content-type": "application/json",
        "Authorization": f"Bearer {ACCESS_TOKEN}"
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
