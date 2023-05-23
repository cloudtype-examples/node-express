let userMessages = [];
let assistantMessages = [];

const chatBox = document.querySelector('.chat-box');

const sendMessage = async() => {
    const chatInput = document.querySelector('.chat-input input');
    const message = chatInput.value;

    // Create user message div and append to chatbox
    const userMessage = document.createElement('div');
    userMessage.classList.add('chat-message', 'user');
    userMessage.innerHTML = `<p>${message}</p>`;
    chatBox.appendChild(userMessage);
    
    //add userMessage message
    userMessages.push(message);
    
    chatInput.value = '';

    // Show spinner
    document.getElementById('spinner').style.display = 'block';

    const response = await fetch('https://isvu5wdiychklgafmi4fkrturu0wbjtm.lambda-url.us-east-1.on.aws/tarsumy', {
        method: 'POST',
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            message: message,
            userMessages: userMessages,
            assistantMessages: assistantMessages,
        })
    });

    const data = await response.json();

    // hide spinner
    document.getElementById('spinner').style.display = 'none';
    
    //add assistantMessage message
    assistantMessages.push(data.assistant);

    // Create assistant message div and append to chatbox
    const assistantMessage = document.createElement('div');
    assistantMessage.classList.add('chat-message', 'assistant');
    assistantMessage.innerHTML = `<p>${data.assistant}</p>`;
    chatBox.appendChild(assistantMessage);

    // scroll to bottom
    chatBox.scrollTop = chatBox.scrollHeight;
};

document.querySelector('.chat-input button').addEventListener('click', sendMessage);

// add event listener for Enter key
document.querySelector('.chat-input input').addEventListener('keyup', function(event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        sendMessage();
    }
});

// Create an introduction message from the assistant
const introductionMessage = document.createElement('div');
introductionMessage.classList.add('chat-message', 'assistant');
introductionMessage.innerHTML = `<p>안녕하세요. 저는 수원타겟존의 안내도우미인 타수미입니다. 무엇을 도와드릴까요?</p>`;

window.onload = function() {
    const notification = document.getElementById('notification');
    notification.style.display = "block";
    
    setTimeout(function() {
        notification.style.display = "none";
    }, 10000); // The notification will display for 10 seconds
};

// Append the introduction to the chat box
chatBox.appendChild(introductionMessage);
