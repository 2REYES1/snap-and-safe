from uagents import Agent, Context, Model
from set_events import main
import json
# app.py
from flask import Flask, request, jsonify
from flask_cors import CORS

florance = Agent(name="Florence", seed="nightingale")

global_data = ""

app = Flask(__name__)
CORS(app)  # This enables CORS for all domains on all routes

@app.route('/receive_data', methods=['POST'])
def receive_data():
    data = request.get_json()
    print("Received data:", data)
    global global_data
    global_data = data

    florance.run()
    return jsonify({"status": "Data received successfully"}), 200

# def load_data_from_json(filepath):
#     try:
#         with open(filepath, 'r') as file:
#             data = json.load(file)
#             # Extracting data into variables
#             email = data['email']
#             user_email_input = data['userEmailInput']
#             timestamp = data['time']
#             return email, user_email_input, timestamp
#     except FileNotFoundError:
#         print("File not found. Please check the file path.")
#         return None, None, None
#     except json.JSONDecodeError:
#         print("Error decoding JSON. Please check the file content.")
#         return None, None, None
    
# email, user_email_input, timestamp = load_data_from_json('data.json')

# print("Email:", email)
# print("User Email Input:", user_email_input)
# print("Time:", timestamp)

class Message(Model):
    medication: str
    time_to_take: str

prac = "pus"
timing = '2024-04-21T09:00:00-09:00'
timing1 = '2024-04-21T22:30:00.000Z'

@florance.on_event("startup")
async def send_msg(ctx: Context):
    ctx.logger.info(f"Hello, I'm agent {ctx.name} and my address is {ctx.address}.")
    message = "med, 2024-04-21T09:00:00-09:00" # str(input('You:'))
    # Sending the user's message back to the sender (restaurant agent)
    complete = f"Your medication of  is added onto your calendar"
    # main(data.user_email_input, timestamp)
    print(global_data, "this is my glo")
    main(global_data['userEmailInput'], global_data['time'])
    ctx.logger.info(complete)



if __name__ == "__main__":
    app.run(debug=True)
    florance.run()