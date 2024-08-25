import json
from dotenv import load_dotenv
import os
import requests

"""
Load Environment Variables
"""

load_dotenv()
ACCESS_TOKEN = os.getenv("ACCESS_TOKEN")
PHONE_NUMBER_ID = os.getenv("PHONE_NUMBER_ID")
VERSION = os.getenv("VERSION")

APP_ID = os.getenv("APP_ID")
APP_SECRET = os.getenv("APP_SECRET")

"""
Define Functions
"""


def send_image(image_url):
    data = json.dumps(
        {
            "messaging_product": "whatsapp",
            "type": "JPEG",
            "file":  image_url
        }
    )
    headers = {
        "Content-type": "application/json",
        "Authorization": f"Bearer {ACCESS_TOKEN}"
    }

    url = f"https://graph.facebook.com/{str.lower(VERSION)}/{PHONE_NUMBER_ID}/media"

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
"""
Call Functions
"""

response = send_image( "https://www.python.org/static/img/python-logo.png")
print(response)





