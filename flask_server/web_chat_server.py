from flask import  Flask , request , jsonify , render_template
from flask_cors import CORS 
from chat_history import chat_history_chain , get_chat_history
#from web_chat import format_chat_history , generate_text
from chat_service import format_chat_history , generate_text
import os
import time 
import json 
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent
CONFIG_PATH = BASE_DIR / "configfile.json"

with open(CONFIG_PATH, "r") as config_read:
    configfile = json.load(config_read)

TEMPLATE_DIR = (BASE_DIR / configfile["templatepath"]).resolve()
STATIC_DIR = (BASE_DIR / configfile["staticpath"]).resolve()


app = Flask(__name__ , template_folder = TEMPLATE_DIR , static_folder = STATIC_DIR)
CORS(app)
@app.route('/') 
def homepageopen():
   return render_template('home.html')


@app.route('/ASK' , methods =['POST'])
def server_work():
   data =  request.get_json()
   prompt = data.get("prompt" , " ")
   user_id = request.remote_addr
   role = "user"
   chat_history_chain(user_id , role , prompt )
   chat_history = get_chat_history(user_id)

   full_prompt = format_chat_history(chat_history)

   start_time=time.time()
   response = generate_text(full_prompt)
   end_time = time.time()

   chat_history_chain( user_id , "assistant" , response)

   time_taken = end_time - start_time

   print(f"\n[DEBUG] Chat history for user '{user_id}':")
   for i, message in enumerate(chat_history, start=1):
        print(f"{i}. {message['role']}: {message['content']}")

   #print ("userID : " + user_id)
   #print("chat history : " + chat_history)
   print("response : " + response)
   print(f"timetaken : {time_taken:.2f}  Seconds")
   return jsonify({
    "response" : response,
    "duration" : f"{time_taken:.2f} seconds "
    })
  
  

if __name__ == '__main__':
   app.run(host = '0.0.0.0' , port = 5000 , debug =True )



