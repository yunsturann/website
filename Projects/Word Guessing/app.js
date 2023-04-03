
let started = false;
let word;
let maxGuessing;
let correctLetter = [];
let incorrectLetter = [];
let timer = null, time = 60;

const inputs = document.querySelector(".inputs");
const btnPlay = document.querySelector(".play-btn");
const hint = document.querySelector(".hint span");
const guessLeft = document.querySelector(".guess-left span");
const wrongLetter = document.querySelector(".wrong-letter span");
const details = document.querySelector(".details");
const timeDom = document.getElementById("time");
const popup = document.querySelector(".popup");
const btnPopupClose = document.getElementById("close-popup");
const btnPopupNextGame = document.getElementById("next-game");
 
function randomWord(){
    let randObj = wordList[getRandomIndex(wordList.length)];
    word = randObj.word;

    maxGuessing = word.length > 5 ? 8 : 6; 

    let html = "";

    for (let i = 0; i < word.length; i++) {
        html += "<input type='text' disabled>";
    }

    inputs.innerHTML = html;
    hint.textContent = randObj.hint;
    guessLeft.textContent = maxGuessing;

}

function startGame(){

    if(btnPlay.textContent == "Reset Game!"){
        resetGame();
    }

    if(started){
        if(confirm("Game's already started. Do you want a new game ?")){
            resetGame();
        }else{
            return;
        }
    }

    btnPlay.textContent = "Play Game";
    started = true;
    timer = setInterval(checkTime,1000);
    details.style.display = "block";
    randomWord();
    
}

function checkInput(e){

    e.preventDefault();
    
    let key = e.key.toLowerCase();

    if(!started){
        return;
    }

    if(!/^[A-Za-z]+$/.test(key) || key.length != 1) {
        console.log("Bune ", key);
        return;
    }

    if(correctLetter.includes(key) || incorrectLetter.includes(key)){
        alert("You already pushed the key: " + key);
        return;
    } 

    let index = word.indexOf(key);

    if(index >= 0){
        inputs.querySelectorAll("input")[index].value = key;
        correctLetter.push(key);
        if(correctLetter.length === word.length){
            popupToggle("You Win!");
            btnPlay.textContent = "Reset Game!";
            clearInterval(timer);
            return;
        }
    }else{
        incorrectLetter.push(key);
        wrongLetter.textContent += key + " ";
    }

    guessLeft.textContent = (--maxGuessing).toString();
    if(maxGuessing === 0){
        popupToggle("You lost!");
        clearInterval(timer);
        btnPlay.textContent = "Reset Game!";
    }

}

function resetGame(){
    started = false;
    btnPlay.textContent = "Reset Game!";
    incorrectLetter = [];
    correctLetter = [];
    wrongLetter.textContent = "";
    time = 60;
}

function checkTime(){
    timeDom.textContent = --time;
    if(time == 0){
        clearInterval(timer);
        started = false;
        btnPlay.textContent = "Reset Game!";
        popupToggle("Time is up!");
    }
}


function getRandomIndex(upper){
    // from zero to length - 1
    return Math.floor(Math.random()*upper);
}

function popupToggle(title){

    if(popup.classList.contains("popup-open")){
        popup.classList.remove("popup-open");
    }else{
        started = false;
        popup.classList.add("popup-open");
        popup.querySelector("h2").textContent = title;
        popup.querySelector("p").innerHTML = "Word: " + word  +"<br>" +
        "Time: " + time + "<br>" +
        "Incorrect letters: " + incorrectLetter.map((element)=>" "+ element) + "<br>"
        "Remaning Guess: " + maxGuessing;
    }
    
}


  
btnPlay.addEventListener("click",startGame);
document.addEventListener("keydown",checkInput);

btnPopupClose.addEventListener("click",popupToggle);
btnPopupNextGame.addEventListener("click",()=>{popup.classList.remove("popup-open");startGame()});
