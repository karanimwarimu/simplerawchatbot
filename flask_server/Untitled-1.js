
    try {
        const res = await fetch("http://127.0.0.1:5000/ASK", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ prompt })
        });

        const data = await res.json();
        appendMessage(data.response, "bot");
    } catch (error) {
        appendMessage("Error: " + error.message, "bot");
    } finally {
        loading.style.display = "none";
        chatBox.scrollTop = chatBox.scrollHeight;
    }


    fetch('/ask', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ prompt: "Hello" })
})
.then(res => res.text())
.then(text => {
    console.log("RAW response text:", text);
    try {
        const data = JSON.parse(text);
        console.log("Parsed JSON:", data);
        console.log("Response:", data.response); // << Check this line
        document.getElementById('chat-box').innerText = data.response;
    } catch (err) {
        console.error("JSON parsing failed:", err);
        document.getElementById('chat-box').innerText = "Parsing error";
    }
})
.catch(err => {
    console.error("Request failed:", err);
    document.getElementById('chat-box').innerText = "Network error";
});


 const res = await fetch("http://127.0.0.1:5000/ASK", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ prompt })
        });
.then(res => res.text())
.then(text => {
    console.log("RAW response text:", text);
    try {
        const data = JSON.parse(text);
        console.log("Parsed JSON:", data);
        console.log("Response:", data.response); // << Check this line
        document.getElementById('chat-box').innerText = data.response;
    } catch (err) {
        console.error("JSON parsing failed:", err);
        document.getElementById('chat-box').innerText = "Parsing error";
    }
})
.catch(err => {
    console.error("Request failed:", err);
    document.getElementById('chat-box').innerText = "Network error";
});
