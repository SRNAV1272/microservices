from flask  import Flask
# import requests
import os

app = Flask(__name__)

@app.route('/')
def index():
    # print(os.environ.get('PORT'))
    return {'Health':'Good'} 

@app.route('/convert/dollartoinr')
def convert():
    # response = requests.get(f'{os.environ.get('Exchange_Value')}/convert/dollartoinr').json()
    return {'exchange' : '82'}