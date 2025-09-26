
FROM python:3.10-slim

WORKDIR /chatbot

COPY . .

RUN apt-get update && apt-get install -y \
    build-essential \
    cmake \
    git \
    && rm -rf /var/lib/apt/lists/*

RUN pip install --no-cache-dir -r flask_server/requirements.txt

EXPOSE 5000

CMD ["python", "flask_server/web_chat_server.py"]
