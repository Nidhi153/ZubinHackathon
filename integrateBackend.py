import requests

def test1():
    url = "http://localhost:3000/api/ai/whatsapp/broadcast"

    data = {
        "broadcastmessage": "Hello, this is a broadcast message from the AI",
        "phonenumbers": ["+639123456789", "+639987654321"]
    }
    res = requests.post(url, json=data)
    data = res.json()
    print(data)


def test2():
    url = "http://localhost:3000/api/ai/chatbot"

    data = {
        "input": "Hello, this is a broadcast message from the AI",
    }
    res = requests.post(url, json=data)
    data = res.json()
    print(data)


def test3():
    url = "http://localhost:3000/api/ai/recommendation"

    data = {
        "skills": ["Python", "Java", "C++"],
        "events": [
            {
                "_id": "1",
                "title": "Event 1",
            },
            {
                "_id": "2",
                "title": "Event 2",
            }
        ]
    }
    res = requests.post(url, json=data)
    data = res.json()
    print(data)


def test4():
    url = "http://localhost:3000/api/ai/recommendation"

    data = {
        "skills": ["Python", "Java", "C++"],
        "events": [
            {
                "_id": "1",
                "title": "Event 1",
            },
            {
                "_id": "2",
                "title": "Event 2",
            }
        ]
    }
    res = requests.post(url, json=data)
    data = res.json()
    print(data)

test1()