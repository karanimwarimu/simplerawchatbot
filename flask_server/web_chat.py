from llama_cpp import Llama
import json
from pathlib  import Path 

BASE_DIR = Path(__file__).resolve().parent
CONFIG_PATH = BASE_DIR / "configfile.json"

with open(CONFIG_PATH, "r") as config_read:
    configfile = json.load(config_read)

llama_pipeline = Llama(  
    model_path = configfile["modelpath"] , 
    n_ctx = configfile["n_ctx"] ,
    n_threads = configfile["n_threads"], 
    n_gpu_layers = configfile["n_gpu_layers"]
    )

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
    result = llama_pipeline(prompt = full_prompt , **configfile["model_configuration"])
    return result["choices"][0]["text"].strip()