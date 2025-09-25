const chatBox = document.getElementById("chat-box");
const promptInput = document.getElementById("prompt");
const loading = document.getElementById("loading");

// Auto-resize textarea
promptInput.addEventListener("input", () => {
    promptInput.style.height = "auto";
    promptInput.style.height = promptInput.scrollHeight + "px";
});

async function sendMessage() {
    const prompt = promptInput.value.trim();
    if (!prompt) return;

    appendMessage(prompt, "user");
    appendThinkingBubble();
    promptInput.value = "";
    promptInput.style.height = "auto";
    loading.style.display = "block";

    try {
        const res = await fetch("http://127.0.0.1:5000/ASK", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ prompt })
        });

        const data = await res.json();
        const timeTaken = data.duration
        updateAIResponse(data.response);
        document.getElementById("loading-time").textContent = `⏱ ${timeTaken}`;
    } catch (error) {
        appendMessage("Error: " + error.message, "bot");
    } finally {
        loading.style.display = "none";
        chatBox.scrollTop = chatBox.scrollHeight;
    }
}
function appendThinkingBubble() {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message', 'ai-message');
    messageDiv.setAttribute('id', 'thinking-bubble');

    const messageText = document.createElement('p');
    messageText.classList.add('message-text');
    messageText.textContent = 'Thinking ...';

    const copyButton = document.createElement('button');
    copyButton.classList.add('copy-btn');
    copyButton.textContent = 'Copy';
    copyButton.disabled = true;

    messageDiv.appendChild(messageText);
    messageDiv.appendChild(copyButton);

    chatBox.appendChild(messageDiv);
    chatBox.scrollTop = chatBox.scrollHeight;
}

function appendMessage(text, sender) {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message', sender === 'user' ? 'user-message' : 'ai-message');

    const messageText = document.createElement('p');
    messageText.classList.add('message-text');
    messageText.textContent = text;

    const copyButton = document.createElement('button');
    copyButton.classList.add('copy-btn');
    copyButton.textContent = 'Copy';
    copyButton.onclick = () => {
        navigator.clipboard.writeText(text).then(() => {
            copyButton.textContent = 'Copied!';
            setTimeout(() => copyButton.textContent = 'Copy', 1500);
        });
    };

    messageDiv.appendChild(messageText);
    messageDiv.appendChild(copyButton);
    document.getElementById('chat-box').appendChild(messageDiv);
    document.getElementById('chat-box').scrollTop = document.getElementById('chat-box').scrollHeight;
}


function updateAIResponse(responseText) {
    const thinkingBubble = document.getElementById("thinking-bubble");
    if (thinkingBubble) {
        const textEl = thinkingBubble.querySelector('.message-text');
        const copyBtn = thinkingBubble.querySelector('.copy-btn');


        textEl.textContent = responseText;

    
        copyBtn.disabled = false;
        copyBtn.onclick = () => {
            navigator.clipboard.writeText(responseText).then(() => {
                copyBtn.textContent = 'Copied!';
                setTimeout(() => copyBtn.textContent = 'Copy', 1500);
            });
        };
        thinkingBubble.removeAttribute('id');
    }
    chatBox.scrollTop = chatBox.scrollHeight;
}
let loadingInterval;

function showLoading() {
  const loadingDiv = document.getElementById("loading");
  loadingDiv.style.display = "block";

  // Start time update
  updateLoadingTime(); // immediate update
  loadingInterval = setInterval(updateLoadingTime, 1000);
}
document.addEventListener("DOMContentLoaded", showWelcomeMessage);

function showWelcomeMessage() {
    const welcomeTextOptions = [
    "👋 Hey there, I'm MK1 – ready to dive in!",
    "✨ Hi! What brilliant idea are we working on today?",
    "🙌 Welcome back, legend! Let's create something awesome.",
    "💡 Need a hand? MK1's on it!",
    "😄 Hello again! Got a new challenge for me?",
    "🧠 Ready when you are – just type it in!",
    "🚀 Let's make magic happen. What's the plan?",
    "📚 Got questions? I've got answers!",
    "⚡ Let's tackle it together. Fire away!",
    "🤖 MK1 here – what's cooking today?"
    ];

    const randomText = welcomeTextOptions[Math.floor(Math.random() * welcomeTextOptions.length)];

    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message', 'ai-message');

    const messageText = document.createElement('p');
    messageText.classList.add('message-text');
    messageText.textContent = randomText;

    const copyButton = document.createElement('button');
    copyButton.classList.add('copy-btn');
    copyButton.textContent = 'Copy';
    copyButton.onclick = () => {
        navigator.clipboard.writeText(randomText).then(() => {
            copyButton.textContent = 'Copied!';
            setTimeout(() => copyButton.textContent = 'Copy', 1500);
        });
    };

    messageDiv.appendChild(messageText);
    messageDiv.appendChild(copyButton);
    document.getElementById('chat-box').appendChild(messageDiv);
}
