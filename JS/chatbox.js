function sendMessage() {
    var userInput = document.getElementById("user-input");
    var message = userInput.value;

    if (message.trim() !== "") {
        var chatBox = document.getElementById("chat-box");

        // Display user's message
        displayMessage(message, true);

        // Get bot's reply
        var botReply = getBotReply(message);

        // Display bot's reply after a short delay
        setTimeout(function() {
            displayMessage(botReply, false);
        }, 500);

        // Clear input field after sending message
        userInput.value = "";
    }
}

function displayMessage(message, isUser) {
    var chatBox = document.getElementById("chat-box");
    var messageElement = document.createElement("div");
    messageElement.textContent = message;
    messageElement.classList.add("message");
    if (isUser) {
        messageElement.classList.add("user");
    } else {
        messageElement.classList.add("bot");
    }
    chatBox.appendChild(messageElement);
}

function getBotReply(userMessage) {
    // Simple bot replies based on user input
    if (userMessage.toLowerCase().includes("hello") || userMessage.toLowerCase().includes("hi")) {
        return "Hello there!";
    } else if (userMessage.toLowerCase().includes("how are you")) {
        return "I'm just a bot, but thanks for asking!";
    } else {
        return "I'm sorry, I didn't understand that.";
    }
}

function toggleChatBox() {
    var chatBox = document.getElementById("chat-box");
    var chatIcon = document.getElementById("chat-icon");
    var closeButton = document.getElementById("close-chat");
    var userInput = document.getElementById("user-input");
    var sendButton = document.querySelector(".send");

    if (chatBox.style.display === "none") {
        // Show chat box, text area, and send button
        chatBox.style.display = "block";
        chatIcon.style.display = "none";
        closeButton.style.display = "inline-block";
        userInput.style.display = "block";
        sendButton.style.display = "inline-block";
    } else {
        // Hide chat box, text area, and send button
        chatBox.style.display = "none";
        chatIcon.style.display = "block";
        closeButton.style.display = "none";
        userInput.style.display = "none";
        sendButton.style.display = "none";
    }
}
