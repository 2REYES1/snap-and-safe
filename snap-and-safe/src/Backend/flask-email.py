from flask import Flask
from flask_cors import CORS

import subprocess

app = Flask(__name__)
CORS(app)

@app.route("/email")
def send_email():
    print("flask-email recv dir, proceed to run alert.py")
    subprocess.run(['python', 'alert.py'])
    return 'Email sent successfully'

if __name__ == '__main__':
    app.run(debug=True)