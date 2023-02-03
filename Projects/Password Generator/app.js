
const alphabet="ABCDEFGHIJKLMNOPRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
const specialCh = "@!.,+-*&%^/";


const clipboardEl = document.getElementById("clipboard-btn");
const passwordEl = document.getElementById("generated-password");
const passwordBtn = document.getElementById("generate-btn");
const messageEl = document.getElementById("message");


passwordBtn.addEventListener("click",generator);
clipboardEl.addEventListener("click",clipBoard);
passwordEl.addEventListener("click",clipBoard);


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
    
    let size = document.getElementById("size-input").value;
    //check size input
  
    if(size.length === 0 || size <= 0){
        Alert("Enter size!");
        return;
    }

    size = parseInt(size);

    if(size > 35){
        Alert("Size too big!\nMax 35 characters!");
        return;
    }

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
    passwordEl.setAttribute("style","cursor: copy");

    passwordEl.textContent = password;
    
}

function Alert(text){
    messageEl.textContent = text;
}

function generateIndex(upper){
    return Math.floor(Math.random()*upper);
}
