// variables
let [seconds, minutes, hours] = [0,0,0];
let timer = null;
let started = false;

// DOMS
const timeDOM = document.getElementById("time");
const pauseDOM = document.getElementById("pause");
const startDOM = document.getElementById("start");
const resetDOM = document.getElementById("reset");

// events
startDOM.addEventListener("click",watchStart);
pauseDOM.addEventListener("click",watchStop);
resetDOM.addEventListener("click",watchReset);

// set time by incrementing seconds 
function setWatch(){
    seconds++;
    if(seconds === 60){
        seconds = 0;
        minutes++;
        if(minutes === 60){
            minutes = 0;
            hours++;
        }
    }

    let s = seconds < 10 ? "0" + seconds : seconds;
    let m = minutes < 10 ? "0" + minutes : minutes;
    let h = hours < 10 ? "0" + hours : hours;

    timeDOM.textContent = h + ":" + m + ":" + s;
}

function watchStart(){
    if(started) return;
    started = true;
   
    // just add an interval
    timer = setInterval(setWatch,1000);
    timeDOM.style.color = "green";
}

function watchStop(){
    started = false;
    // clear interval to stop incrementing 
    clearInterval(timer);
    timeDOM.style.color = "red";
}

function watchReset(){
    started = false;
    // clear timer and set values to the default which is 0!
    clearInterval(timer);
    [seconds,minutes,hours] = [0,0,0];
    timeDOM.textContent = "00:00:00";
    timeDOM.style.color = "rgb(0, 0, 0)";
}
