
let ready = false;
let playerChoice = "unknown";
let computerChoice = "unknown";

const options = ["rock","scissors","paper"];

const playEl = document.getElementById("play");
const resetEl = document.getElementById("reset");
const resultEl = document.getElementById("result");
const playerImg = document.querySelector(".player-img");
const computerImg = document.querySelector(".computer-img");
const rockEl = document.getElementById("rock");
const scissorsEl = document.getElementById("scissors");
const paperEl = document.getElementById("paper");


rockEl.addEventListener("click",function(){
    playerChoice = "rock";
    renderPlayer();
})
scissorsEl.addEventListener("click",function(){
    playerChoice = "scissors";
    renderPlayer();
})
paperEl.addEventListener("click",function(){
    playerChoice = "paper";
    renderPlayer();
})

playEl.addEventListener("click",function(){
    if(ready){
        computerPlay();
        // console.log(computerChoice);
         render();
    }else{
        alert("Select a hand at the top!");
    }
})

resetEl.addEventListener("click",function(){
    playerChoice = "unknown";
    computerChoice = "unknown";
    renderPlayer();
    ready = false;
    render();
})



function renderPlayer(){
    playerImg.src = "images/" + playerChoice + ".png";
    ready = true;
}

function render(){
    computerImg.src = "images/" + computerChoice +".png";
    // manipulate result paragraph
    let status = winner();
    resultEl.textContent = status;
    if(status == "win"){
        resultEl.style.color = "green";
    }
    else if(status == "lost"){
        resultEl.style.color = "red";
    }
    else{
        resultEl.style.color = "black";
    }
}

function computerPlay(){
    let index = getRandom();
    computerChoice = options[index];
}

function winner(){
    if(playerChoice === "rock"){
        if(computerChoice === "rock") return "draw";
        else if(computerChoice === "scissors") return "win";
        else return "lost";
    }
    else if(playerChoice === "scissors"){
        if(computerChoice === "rock") return "lost";
        else if(computerChoice === "paper") return "win";
        else return "draw";
    }
    else{
        if(computerChoice === "rock") return "win";
        else if(computerChoice === "scissors") return "lost";
        else return "draw";
    }
}

function getRandom(){
    return Math.floor(Math.random()*options.length);
}

