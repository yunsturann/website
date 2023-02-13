//chars to generate passwords
const alphabet="ABCDEFGHIJKLMNOPRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
const specialCh = "@!.,+-*&%^/";

// Elements
const clipboardEl = document.getElementById("clipboard-btn");
const passwordEl = document.getElementById("generated-password");
const passwordBtn = document.getElementById("generate-btn");
const messageEl = document.getElementById("message");
const sliderEl = document.getElementById("size-input");

// Events
passwordBtn.addEventListener("click",generator);
clipboardEl.addEventListener("click",clipBoard);
sliderEl.addEventListener("input",(e)=>
document.getElementById("slider-value").textContent = e.target.value);

function clipBoard(e){
    e.preventDefault();

    if(passwordEl.textContent === "Password"){
        return;
    }
    navigator.clipboard.writeText(passwordEl.textContent);

    Alert("Password Copied!");
}

function generator(e){
    e.preventDefault();
    
    let size = sliderEl.value;
    //check size input

    let checked =  document.getElementById("special-input").checked;
    let password ="";
    let allCharacters = alphabet;
   
    if(checked){
        allCharacters += specialCh;
    }

    for(let i=0;i<size;i++){
        let index = generateIndex(allCharacters.length);
        password += allCharacters[index];
    }//end-for

    Alert("Password Generated Succesfully!");

    clipboardEl.setAttribute("style","cursor: pointer");
    passwordEl.textContent = password;
    
}

function Alert(text){
    messageEl.textContent = text;
    setTimeout(function(){
        messageEl.textContent = "";
    },2500)
}

function generateIndex(upper){
    return Math.floor(Math.random()*upper);
}
