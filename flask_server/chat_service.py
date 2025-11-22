import os
from dotenv import load_dotenv 
import sys 
import  google.generativeai as genai

#load_dotenv()
api_key = os.getenv("GOOGLE_API_KEY")
if not api_key :
    print("error! , no api key")
else :
    print("apikey fetched")
'''
def format_chat_history(chat_history) :
    formatted_prompt = "<s>"
    for msg in chat_history :
        if msg['role'] == "user" :
            formatted_prompt += f"[INST] {msg['content']} [/INST]"
        elif msg['role'] == "assistant" :
            formatted_prompt += f"[INST] {msg['content']}[/INST]"

    return formatted_prompt.strip()
'''

def format_chat_history(chat_history):
messages = []
    for msg in chat_history:
        role = "model" if msg["role"] == "assistant" else "user"
        messages.append({"role": role, "parts": msg["content"]})
    return messages

def generate_text(prompt: str, userid=None) -> str:
    genai.configure(api_key=api_key)
    model = genai.GenerativeModel("gemini-2.5-flash")
    
    history = []
    if userid:
        history = format_chat_history(get_chat_history(userid))

    # Add the new user message
    history.append({"role": "user", "parts": prompt})

    response = model.generate_content(history)
    return response.text
"""
def generate_text(prompt : str ) -> str:
    full_prompt = f"['INST'] {prompt} ['/INST']"
    
    genai.configure(api_key=api_key)

    model = genai.GenerativeModel("gemini-2.5-flash")

    response = model.generate_content(full_prompt)
    
    return response.text
"""
