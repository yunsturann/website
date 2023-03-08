
let alarms = new Set();

const hInput = $("#hours-input");
const mInput = $("#minutes-input");
const listEl = $(".list");


$("#submit-el").click(createAlarmItem);

function createAlarmItem(e){
    e.preventDefault();

    if(hInput.val() === "" || mInput.val() === "") {
        alert("Enter inputs!");
        return;
    }else if(hInput.val() > 23 || mInput.val() > 59){
        alert("Exceed!");
        return;
    }else if(hInput.val().length > 2 || mInput.val().length > 2){
        alert("undefined time length");
        return;
    }

    let h = (hInput.val().length === 1 ? "0" + hInput.val() : hInput.val());
    let m = (mInput.val().length === 1 ? "0" + mInput.val() : mInput.val());

    let textClock = `${h}:${m}`;
    const allClocks = document.querySelectorAll(".text-clock");

    for(let x of allClocks){
        if(x.textContent === textClock){
            alert(`You have already this:${textClock} alarm!`);
            return;
        }
    }

    addAlarmItem(textClock);

}

function addAlarmItem(textClock){

    let item = document.createElement("li");
    item.classList.add("item");

    item.innerHTML = `<p class="text-clock">${textClock}</p>
    <div class="form-check form-switch">
        <input class="form-check-input" type="checkbox" role="switch" title="on/off">
        <i class="fa-solid fa-trash"></i>
    </div>`
   
    listEl.append(item);

    item.querySelector(".form-check-input").addEventListener("click",setAlarm);
    item.querySelector(".fa-trash").addEventListener("click",deleteListItem);
    
}

function setAlarm(e){
    
    let textClock = e.target.parentNode.parentNode.firstElementChild.textContent;
    if(e.target.checked){
        alarms.add(textClock);
    }else{
        alarms.delete(textClock);
    }
  
}

function deleteListItem(e){
    
    if(!confirm("Are you sure?")){
        return;
    }
  
    let textClock = e.target.parentNode.parentNode.firstElementChild.textContent;

    alarms.delete(textClock);

    e.target.parentNode.parentNode.remove();
}

setInterval(checkAlarm,1000)

function checkAlarm(){

    let currentClock = new Date();
    if(currentClock.getSeconds() != 0){
        return;
    }

    let h = currentClock.getHours();
    let m = currentClock.getMinutes();
    h = h < 10 ? "0" + h : h;
    m = m < 10 ? "0" + m : m; 

    let textClock = `${h}:${m}`;

    if(alarms.has(textClock)){
        playVoice("sounds/alarm.mp3");
    }
    //console.log(typeof textClock, textClock);

}

function playVoice(path){
    let audio = new Audio(path);
    audio.play();
}