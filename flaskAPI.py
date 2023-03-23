# Import Flask and requests
from flask import Flask, request
import requests

# Create an instance of Flask app
app = Flask(__name__)

# Define an endpoint for receiving user inputs
@app.route("/chat", methods=["POST"])
def chat():
    # Get the user input from the request body
    user_input = request.json["user_input"]

    # Send the user input to the chatbot API using requests
    url = "https://example.com/chatbot/api" # Replace this with your chatbot API URL
    payload = {"user_input": user_input}
    response = requests.post(url, json=payload)

    # Get the chatbot response from the response body
    chatbot_response = response.json()["chatbot_response"]

    # Return the chatbot response as JSON data
    return {"chatbot_response": chatbot_response}
