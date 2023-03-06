// variables
let [seconds, minutes, hours] = [0,0,0];
let timer = null;

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
    // if interval is alredy running, clear it first not to add new interval
    if(timer != null){
        clearInterval(timer);
    }
    // just add an interval to reach more correct result!
    timer = setInterval(setWatch,1000);
}

function watchStop(){
    // clear interval to stop incrementing 
    clearInterval(timer);
}

function watchReset(){
    // clear timer and set values to the default which is 0!
    clearInterval(timer);
    [seconds,minutes,hours] = [0,0,0];
    timeDOM.textContent = "00:00:00";
}
