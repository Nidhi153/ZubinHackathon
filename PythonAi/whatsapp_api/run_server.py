import os

def run_server():
    PORT = "60000"
    os.system(f"ngrok http {PORT} --domain concrete-premium-snake.ngrok-free.app")
