# Simple Flask Chatbot

A minimal chatbot app built with **Flask**, **HTML/CSS/JS** for the UI, and a local **Mistral 7B GGUF** model.  
Chats are stored **in memory** (no database) for the session. Both the **model** and the **UI** are served from the Flask server.

---

## Features
- 🗨️ Chat with a local **Mistral 7B** model
- 💾 In-memory chat history (resets on server restart)
- 🌐 Simple HTML/CSS/JS frontend
- 🐍 Flask server backend
- 🔒 Runs fully locally (no external API required)

---

## Installation Guide

### 1. Install Python
- Make sure you have **Python 3.10+** installed.  
Check with:
```bash
python --version
If not installed:

Download Python and follow your OS instructions.
```

### 2. Clone this repository
bash
Copy code
git clone https://github.com/your-username/flask-chatbot.git
cd flask-chatbot

### 3. Create a virtual environment
bash
Copy code
python -m venv venv
Activate it:

Windows (PowerShell)

bash
Copy code
venv\Scripts\activate
Linux / macOS

bash
Copy code
source venv/bin/activate

### 4. Install requirements
bash
Copy code
pip install -r requirements.txt
5. Add the Mistral 7B GGUF model
Download the model file (mistral-7b-instruct-v0.1.Q4_K_M.gguf or similar).

Place it inside a folder called models/ in the project root:

cpp
Copy code

      flask-chatbot/
  ├── web chat/
  │     ├── web_chat_server.py
  │     ├── configfile.json
  ├── static/
  │     └── style.css
  ├── templates/
  │     └── home.html
  ├── models/
       └── mistral-7b-instruct-v0.1.Q4_K_M.gguf

Running the App
Start the Flask server:

bash
Copy code
python web_chat_server.py
You should see output like:

csharp
Copy code
 * Running on http://127.0.0.1:5000/ (Press CTRL+C to quit)
Accessing the Web Page
Open your browser.

Go to 👉 http://127.0.0.1:5000.

Start chatting with the bot.

Notes
Chat history is only in memory. Restarting the server clears it.

Models can be large; ensure you have enough RAM/VRAM.

To run with Docker, you can extend this project with a Dockerfile.
