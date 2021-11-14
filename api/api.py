import logging
import time

from flask import Flask
from flask import request
from flask_cors import CORS
logging.getLogger('flask_cors').level = logging.DEBUG

app = Flask(__name__)
CORS(app)

@app.route("/")
def hello_world():
    return "<p>Hello, World!</p>"

@app.route("/post", methods=["POST"])
def post_post():
    time.sleep(0.5)
    return request.form
