import requests
import json
# def test1():
#     url = "http://localhost:3000/api/ai/whatsapp/broadcast"
#     # url = "http://10.68.44.147:8000/ai/whatsapp/broadcast"

#     data = {
#         "phonenumbers": ["+85298226209", "+85298226209"],
#         "broadcastmessage": "Hello from Zubin",
#     };
#     res = requests.post(url, json=data)
#     data = res.json()
#     print(data)

# def test2():
#     url = "http://localhost:3000/api/ai/chatbot"

#     data = {
#         "input": "Hello, this is a broadcast message from the AI",
#     }
#     res = requests.post(url, json=data)
#     data = res.json()
#     print(data)


# def test3():
#     url = "http://localhost:3000/api/ai/recommendation"

#     data = {
#         "skills": ["pottery", "painting"],
#         "events": [
#             {"eventid": "1", "skills": ["public speaking", "painting", "pottery"]},
#             {"eventid": "2", "skills": ["cooking", "yoga", "dancing"]},
#             {"eventid": "3", "skills": ["painting", "singing", "dancing"]},
#             {"eventid": "4", "skills": ["archery", "pottery", "public speaking"]}
#         ]
#     }
    
#     res = requests.post(url, json=data)
#     data = res.json()
#     print(data)


# def test5():
#     data = {
#         "phonenumbers": ["+85298226209", "+85298226209"],
#         "broadcastmessage": "Hello from Zubin",
#     };
#     res = requests.post("http://0.0.0.0:8000/ai/whatsapp/broadcast", json=data)
#     # print(res)
#     data = res.json()
#     print(data)

# def test6():

#     url = "http://localhost:3000/api/ai/whatsapp/images"
#     data = {
#         "phonenumbers": ["+85298226209"],
#         "caption": "Hello from Zubin",
#         # "imageid": "3828433507389017"
#         # "imageid":"851422080388100"
#         # "imageid":"490776113888285"
#     };
#     res = requests.post(url, json=data)
#     data = res.json()
#     print(data)

# test3()