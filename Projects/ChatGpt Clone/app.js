const chatInput = document.getElementById("chat-input");
const sendBtn = document.getElementById("send-btn");
const chatContainer = document.querySelector(".chat-container");

let userText = null;
const API_KEY = "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";

const createElement = (html,className)=>{
    // create new div and apply chat, specified class and set html content of div
    const chatDiv = document.createElement("div");
    chatDiv.classList.add("chat", className);
    chatDiv.innerHTML = html;
    console.log(chatDiv);
    return chatDiv;
}

const getChatResponse = async (incomingChatDiv) => {
    const API_URL = "https://api.openai.com/v1/completions";
    const pElement = document.createElement("p");

    const requestOptions = {
        method:"POST",
        headers:{
            "Content-Type": "application/json",
            "Authorization": `Bearer ${API_KEY}`
        },
        body: JSON.stringify({
            model: "text-davinci-003",
            prompt: userText,
            max_tokens: 1024,
            temperature: 0.2,
            n: 1,
            stop: null,
        })
    }

    try {
        const response = await (await fetch(API_URL, requestOptions)).json();
        pElement.textContent = response.choices[0].text.trim();
    } catch (error) {
        console.log(error);
    }

    incomingChatDiv.querySelector(".typing-animation").remove();
    incomingChatDiv.querySelector(".chat-details").appendChild(pElement);

}

const copyResponse = (copyBtn) =>{
    const responseTextElement = copyBtn.parentElement.querySelector("p");
    navigator.clipboard.writeText(responseTextElement.textContent);
    copyBtn.innerHTML = `<i class="fa-solid fa-check"></i>`;

    setTimeout(()=>{
        copyBtn.innerHTML = `<i class="fa-regular fa-copy fa-lg"></i>`;
    },1500);
}

const showTypingAnimation = () =>{
    const html = `<div class="chat-content">
                    <div class="chat-details">
                        <img src="images/chatbot.jpg" alt="ChatBot-img">
                        <div class="typing-animation">
                            <div class="typing-dot" style = "--delay: 0.2s"></div>
                            <div class="typing-dot" style = "--delay: 0.3s"></div>
                            <div class="typing-dot" style = "--delay: 0.4s"></div>
                        </div>
                    </div>
                    <span onclick = "copyResponse(this)" class="copy-icon"><i class="fa-regular fa-copy fa-lg"></i></span>
                </div>`;
    const incomingChatDiv = createElement(html,"incoming");
    chatContainer.appendChild(incomingChatDiv);
    getChatResponse(incomingChatDiv);
}

const handleOutgoingChat = () => {
    userText = chatInput.value.trim();
    chatInput.value = '';
    if(!userText) return;
    const html = `<div class="chat-content">
                    <div class="chat-details">
                        <img src="images/user.jpg" alt="User-img">
                        <p></p>
                    </div>
                </div>`;
    const outgoingChatDiv = createElement(html,"outgoing");
    outgoingChatDiv.querySelector("p").textContent = userText;
    chatContainer.appendChild(outgoingChatDiv);
    setTimeout(showTypingAnimation,500);
} 

sendBtn.addEventListener("click", handleOutgoingChat);