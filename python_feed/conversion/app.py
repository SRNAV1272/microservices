from flask  import Flask
import requests
import os

app = Flask(__name__)

@app.route('/')
def index():
    # print(os.environ.get('PORT'))
    return {'Health':'Good'} 

@app.route('/convert/dollartoinr/<value>')
def convert(value):
    url = os.environ.get('Exchange_Value')
    response = requests.get(f'{url}/convert/dollartoinr').json()
    return {'exchange' : float(value)*float(response.get('exchange'))}
    # return {'exchange' : os.environ.get('Exchange_Value')}
    