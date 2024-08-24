import requests
import time

def get_qr_code():
    res = requests.get("http://localhost:2000/start", timeout=2)
    if res.status_code == 200:
        print("Video capture started")
    else:
        print("Failed to start video capture")

def fetch_data():
    try:
        res = requests.get("http://localhost:2000/data", timeout=2)
        if res.status_code == 200:
            data = res.json()
            if "current_data" in data:
                print(f"Received QR Code data: {data['current_data']}")
            else:
                print("No data available")
        else:
            print("Failed to fetch data")
    except requests.RequestException as e:
        print(f"Error fetching data: {e}")

if __name__ == "__main__":
    get_qr_code()
    while True:
        fetch_data()
        time.sleep(0.5)  # Poll the server every second