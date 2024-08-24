import requests

url = "http://localhost:2000/upload-qrcode/"
params = {
    "input":"123@gmail.com"
}

response = requests.post(url, params=params)

print(response.status_code)
print(response.json())