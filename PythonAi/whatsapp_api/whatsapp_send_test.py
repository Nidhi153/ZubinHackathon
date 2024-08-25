import json
from dotenv import load_dotenv
import os
import requests

"""
Load Environment Variables
"""

load_dotenv()
ACCESS_TOKEN = os.getenv("ACCESS_TOKEN")
RECIPIENT_WAID = json.loads(os.getenv("RECIPIENT_WAID"))
PHONE_NUMBER_ID = os.getenv("PHONE_NUMBER_ID")
VERSION = os.getenv("VERSION")

APP_ID = os.getenv("APP_ID")
APP_SECRET = os.getenv("APP_SECRET")

"""
Define Functions
"""

print("Recipient Whatsapp Numbers:", RECIPIENT_WAID)

def send_whatsapp_message(phone_number:str):
    """
    This function sends a template message to establish a connection with the recipient phone number.
    """

    url = f"https://graph.facebook.com/{str.lower(VERSION)}/{PHONE_NUMBER_ID}/messages"
    headers = {
        "Authorization": "Bearer " + ACCESS_TOKEN,
        "Content_Type": "application/json"
    }
    data = {
        "messaging_product": "whatsapp",
        "to": phone_number,
        "type": "template",
        "template": {"name": "hello_world", "language": {"code": "en_US"}}
    }

    response = requests.post(url, headers=headers, json=data)
    return response

# response = send_whatsapp_message()
# print(response.status_code)
# print(response.json())

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
    
"""
Call Functions
"""

#This one is for template messages
# for phone_number in RECIPIENT_WAID:
#     response = send_whatsapp_message(phone_number)
#     print(response.status_code)
#     print(response.json())

#This one is for custom messages
for phone_number in RECIPIENT_WAID:
    data = get_text_message_input(
        recipient=phone_number, text="There's a new event happening!"
    )

    response = send_message(data)






