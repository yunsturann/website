const chatInput = document.getElementById("chat-input");
const sendBtn = document.getElementById("send-btn");
const chatContainer = document.querySelector(".chat-container");
const themeBtn = document.getElementById("theme");
const clearBtn = document.getElementById("clear");

let userText = null;
let API_KEY = "";
const initialHeight = chatInput.scrollHeight;

const loadChat = () =>{
    const defaultText = `<div class="default-text">
                            <h1>ChatGPT Clone</h1>
                            <p>Start a conversation and explore the power of AI.<br/>Your chat history will be displayed here.</p>
                        </div>`;

    if(localStorage.getItem("all-chats") == null){
        chatContainer.innerHTML = defaultText;
    }else{
        chatContainer.innerHTML = localStorage.getItem("all-chats");
    }
}
const loadTheme = () =>{
    let theme = localStorage.getItem("theme-color");
    if(theme == null) return;
    if(theme == "light"){
        document.body.classList.add("light-mode");
    }
}

document.addEventListener("DOMContentLoaded", () => {
   
    API_KEY = prompt("Enter API KEY");  
   
    loadChat();
    loadTheme();
});


const createElement = (html,className)=>{
    // create new div and apply chat, specified class and set html content of div
    const chatDiv = document.createElement("div");
    chatDiv.classList.add("chat", className);
    chatDiv.innerHTML = html;
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
        pElement.classList.add("error");
        pElement.textContent = "Oops! Something went wrong while retrieving the response. Please try again.";
    }

    incomingChatDiv.querySelector(".typing-animation").remove();
    incomingChatDiv.querySelector(".chat-details").appendChild(pElement);
    chatContainer.scrollTop = chatContainer.scrollHeight;
    localStorage.setItem("all-chats", chatContainer.innerHTML);

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

    chatInput.style.height = `${initialHeight}px`;

    const html = `<div class="chat-content">
                    <div class="chat-details">
                        <img src="images/user.jpg" alt="User-img">
                        <p></p>
                    </div>
                </div>`;
    const outgoingChatDiv = createElement(html,"outgoing");
    outgoingChatDiv.querySelector("p").textContent = userText;
    document.querySelector(".default-text") ?.remove();
    chatContainer.appendChild(outgoingChatDiv);
    //chatContainer.scrollTo(0,chatContainer.scrollHeight);
    chatContainer.scrollTop = chatContainer.scrollHeight;
    setTimeout(showTypingAnimation,500);
} 


themeBtn.addEventListener("click", ()=>{
    if(document.body.classList.contains("light-mode")){
        document.body.classList.remove("light-mode");
        localStorage.setItem("theme-color", "dark");
    }
    else{
        document.body.classList.add("light-mode");
        localStorage.setItem("theme-color", "light");
    }
    
});

clearBtn.addEventListener("click",()=>{
    if(!confirm("Are you sure to clear chat!")) return;
    localStorage.removeItem("all-chats");
    loadChat();
});





chatInput.addEventListener("input", ()=>{
    //Adjust the height of the input filed dynamically based on content
    chatInput.style.height = `${initialHeight}px`;
    chatInput.style.height = `${chatInput.scrollHeight}px`;
});

chatInput.addEventListener("keydown", (e) =>{
    
    if(e.key === "Enter" && !e.shiftKey && window.innerWidth > 800){
        e.preventDefault();
        handleOutgoingChat();
    }

});


sendBtn.addEventListener("click", handleOutgoingChat);