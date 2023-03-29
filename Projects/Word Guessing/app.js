
let started = false;
let word;
let maxGuessing;
let correctLetter = [];
let incorrectLetter = [];

const inputs = document.querySelector(".inputs");
const btnPlay = document.querySelector(".play-btn");
const hint = document.querySelector(".hint span");
const guessLeft = document.querySelector(".guess-left span");
const wrongLetter = document.querySelector(".wrong-letter span");

function randomWord(){
    let randObj = wordList[getRandomIndex(wordList.length)];
    word = randObj.word;
    console.log(randObj);

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
    randomWord();
    
}

function checkInput(e){
    let key = e.key.toLowerCase();

    if(!started){
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
            alert("You won this game!");
            btnPlay.textContent = "Reset Game!";
            return;
        }
    }else{
        incorrectLetter.push(key);
        wrongLetter.textContent += key + " ";
    }

    guessLeft.textContent = (--maxGuessing).toString();
    if(maxGuessing === 0){
        alert("You lost! KEY: " + word);
        btnPlay.textContent = "Reset Game!";
    }

}

function resetGame(){
    started = false;
    btnPlay.textContent = "Reset Game!";
    incorrectLetter = [];
    correctLetter = [];
    wrongLetter.textContent = "";
}


function getRandomIndex(upper){
    // from zero to length - 1
    return Math.floor(Math.random()*upper);
}

  
btnPlay.addEventListener("click",startGame);
document.addEventListener("keydown",checkInput);