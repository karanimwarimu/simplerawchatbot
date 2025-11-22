import os
from dotenv import load_dotenv 
import sys 
import  google.generativeai as genai

#load_dotenv()
api_key = os.getenv("GOOGLE_APIKEY")

if not api_key :
    print("Error , invalid key !")
    sys.exit(1)
else :
    print("key fetched :)" )
    

def format_chat_history(chat_history) :
    formatted_prompt = "<s>"
    for msg in chat_history :
        if msg['role'] == "user" :
            formatted_prompt += f"[INST] {msg['content']} [/INST]"
        elif msg['role'] == "assistant" :
            formatted_prompt += f"[INST] {msg['content']}[/INST]"

    return formatted_prompt.strip()

def generate_text(prompt : str ) -> str:
    full_prompt = f"['INST'] {prompt} ['/INST']"
    
    genai.configure(api_key=api_key)

    model = genai.GenerativeModel("gemini-2.5-flash")

    response = model.generate_content(full_prompt)
    
    return response.text
    
