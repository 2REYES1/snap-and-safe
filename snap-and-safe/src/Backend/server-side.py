from flask import Flask, request, jsonify
import subprocess

app = Flask(__name__)

@app.route('/send-email', methods=['POST'])
def send_email():
    subprocess.run(['python', 'alert.py'])

    return jsonify({'message': 'Email sent successfully'})

if __name__ == '__main__':
    app.run(debug=True)
