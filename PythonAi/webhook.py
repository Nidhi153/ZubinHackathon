"""
IMPORTANT NOTES

We need a static domain to expose this API!
Current free domain: concrete-premium-snake.ngrok-free.app 
To launch static domain in command prompt: ngrok http <port_number> --domain <domain>
Then, run app.py!

RUN: ngrok http 60000 --domain concrete-premium-snake.ngrok-free.app

Update API Token when needed.

Run this file directly to activate WhatsApp API.
"""

from flask import Flask, request, jsonify
import sys, os, requests, json
from huggingface_hub import InferenceClient
from whatsapp_api.run_server import run_server
from dotenv import load_dotenv

app = Flask(__name__)

load_dotenv()
ACCESS_TOKEN = os.getenv("ACCESS_TOKEN")
APP_ID = os.getenv("APP_ID")
APP_SECRET = os.getenv("APP_SECRET")
VERSION = os.getenv("VERSION")
PHONE_NUMBER_ID = os.getenv("PHONE_NUMBER_ID")
VERIFY_TOKEN = os.getenv("VERIFY_TOKEN")
WEBHOOK_PORT = "60000"

@app.route("/webhook", methods=["POST"])
def webhook_post():
    print("Got a POST request!")
    body = request.get_json()
    print(json.dumps(body, indent=4))
    print(process_whatsapp_message(body))
    return "OK", 200


# Please Ignore but do not delete.
@app.route("/webhook", methods=["GET"])
def webshook_get():
    """
    GET request establishes a connection!
    Code below verifies the connection using the token.
    """

    print("Got a GET request!")
    mode = request.args.get("hub.mode")
    token = request.args.get("hub.verify_token")
    challenge = request.args.get("hub.challenge")
    # print(mode, token, challenge)

    if mode and token:
        if mode == "subscribe" and token == VERIFY_TOKEN:
            return challenge, 200
        else:
            return jsonify({"status": "error", "message": "Verification failed"}), 403
    else:
        return jsonify({"status": "error", "message": "Verification failed"}), 400


def process_whatsapp_message(body) -> str:
    """
    As the name suggests, this function processes an input from the user, produces a response and converts it to
    WhatsApp API format, and sends it back to the user.

    Returns a string signifying that the message and generated keywords has been sent to the backend API Endpoint.

    Parameters:

    body (str): This is the JSON returned by the WhatsApp API which is based of the message received from the user's phone number.
    """

    try:
        recipient_number = body["entry"][0]["changes"][0]["value"]["messages"][0][
            "from"
        ]
        message = body["entry"][0]["changes"][0]["value"]["messages"][0]["text"]["body"]

        # Keyword Generation (Just use prompt engineering for LLM to generate)
        keywords = keyword_generator(message)
        print("The keywords are:", keywords)

    except Exception as e:
        print(
            "These are message status changes and pricing notifications (a.k.a. outbound notifications), can ignore!"
        )
        print("Exception:", e)
        return "Successfuly handled, not sent message!!"

    # Send keywords, messages and phone numbers to backend API endpoint
    res = convert_response_to_json("+" + recipient_number, message, keywords)
    send_message(res)
    return "Successfully handled, sent message!"


def convert_response_to_json(recipient, message, res) -> json:
    """
    This function acts to convert the response from the chatbot to json format with the required format for WhatsApp API.
    """

    return json.dumps({"phonenumber": recipient, "message": message, "categories": res})


def send_message(data):
    """
    This function sends the message, phone number and keywords to our Backend API Endpoint
    """

    headers = {"Content-type": "application/json"}

    url = f"http://172.29.3.2/zubin-frontend/whatsapp/question"  # Ask Kohei to replace with link to endpoint

    response = requests.post(
        url, data=data, headers=headers, timeout=10
    )  # 10 seconds timeout as an example


def keyword_generator(p) -> list:
    """
    This function generates the top keywords to describe a message.
    """
    keywords = [
        "Food",
        "Location",
        "Transport",
        "Emergency",
        "Feedback",
        "Volunteer",
        "Donation",
        "Jobs",
        "Training",
        "Education",
    ]

    prompt = f""" Given this list of keywords {keywords} and a message, please choose the
    keywords that relate the most to the following message separated by ', ', please do not give any
    explanation: {p}"""

    API_TOKEN = "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"
    repo_id = "meta-llama/Meta-Llama-3-8B-Instruct"

    client = InferenceClient(repo_id, token=API_TOKEN, timeout=120)

    res = (
        client.chat_completion(
            messages=[
                {"role": "system", "content": prompt},
                {"role": "user", "content": p},
            ],
            max_tokens=150,
            temperature=0.0,
            stream=False,
        )
        .choices[0]
        .message.content
    )

    return res.replace("\n", " ").strip().split(", ")


if __name__ == "__main__":
    app.run(port=WEBHOOK_PORT)
    # os.system(f"ngrok http {PORT} --domain concrete-premium-snake.ngrok-free.app")
