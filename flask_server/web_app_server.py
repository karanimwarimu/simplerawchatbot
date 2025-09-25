from flask import Flask , jsonify , render_template , request
from flask_cors import CORS 
from  web_chat import generate_text
import json
import os 
import time 

with open("configfile.json", "r") as config_read :
   configfile = json.load(config_read)


BASE_DIR = os.path.abspath(os.path.dirname(__file__))
TEMPLATE_DIR = configfile["templatepath"]
STATIC_DIR = configfile["staticpath"]

app = Flask(__name__ , template_folder = TEMPLATE_DIR , static_folder = STATIC_DIR)
CORS(app)
@app.route('/') 
def homepageopen():
   return render_template('home.html')

@app.route('/ASK' , methods=['POST'])
def prompt_send():
    data = request.get_json()
    prompt= data.get("prompt" , " ")
    start_time= time.time()
    result = generate_text(prompt)
    end_time = time.time()

    time_taken = start_time -end_time
    
    print(result)
    print(f"timetaken : {time_taken:.2f}  Seconds")
    return jsonify({
      "response" : result ,
      "duration" : f"{time_taken:.2f} seconds "
      })

if __name__ == '__main__':
  app.run(host = '0.0.0.0' , port = 5000 , debug = True)