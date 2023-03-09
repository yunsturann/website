
let activeAlarms = new Set();
let allAlarms = [];

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

    const allClocks = document.querySelectorAll(".text-clock");
  
    let alarmItem = {
        textClock: `${h}:${m}`,
        id: generateUniqueId()
    }

    for(let x of allClocks){
        if(x.textContent === alarmItem.textClock){
            alert(`You have already this:${alarmItem.textClock} alarm!`);
            return;
        }
    }

    addAlarmItem(alarmItem);

}

function addAlarmItem(alarmItem){

    let item = document.createElement("li");
    item.classList.add("item");
    item.id = alarmItem.id;
    console.log(item);
    item.innerHTML = `
            <p class="text-clock">${alarmItem.textClock}</p>
            <div class="form-check form-switch d-flex gap-2">
                <input class="form-check-input" type="checkbox" role="switch" title="on/off">
                <i class="fa-solid fa-trash"></i>
                <i class="fa-solid fa-chevron-down"></i>
            </div>
            <div class="down-content">
                <div class="input-group mb-1">
                    <input type="text" class="form-control alarm-label" placeholder="Label">
                    <button class="btn btn-outline-primary" type="button">save</button>
                </div>
                <p class="remaning-time"></p>
            </div>`
   
    listEl.append(item);

    item.querySelector(".form-check-input").addEventListener("click",setAlarm);
    item.querySelector(".fa-trash").addEventListener("click",deleteListItem);
    item.querySelector(".fa-chevron-down").addEventListener("click",toggleDropDown);
    
    
}

function setAlarm(e){
    
    let textClock = e.target.parentNode.parentNode.firstElementChild.textContent;
    if(e.target.checked){
        activeAlarms.add(textClock);
    }else{
        activeAlarms.delete(textClock);
    }
  
}

function deleteListItem(e){
    
    if(!confirm("Are you sure?")){
        return;
    }
  
    let textClock = e.target.parentNode.parentNode.firstElementChild.textContent;

    activeAlarms.delete(textClock);

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

    if(activeAlarms.has(textClock)){
        playVoice("sounds/alarm.mp3");
    }
    //console.log(typeof textClock, textClock);

}

function playVoice(path){
    let audio = new Audio(path);
    audio.play();
}

function toggleDropDown(e){
    let id = e.target.parentNode.parentNode.id;
    $(`#${id} .down-content`).slideToggle();

}
/*
function calculateRemaningTime(id){
    let alarmText = $(`#${id} .text-clock`).text();
    let alarmH = parseInt(alarmText.substring(0,2));
    let alarmM = parseInt(alarmText.substring(3,5));
    console.log(alarmH,alarmM);
    let currTime = new Date();
    let h = currTime.getHours();
    let m = currTime.getMinutes();
    console.log(h, m);
    let remaning = "";
    if(h < alarmH){
        let hours = alarmH-h;
    }
}*/

function generateUniqueId(){
    let random = Math.floor(Math.random()*10000);
    for(let i = 0;i<allAlarms.length;i++){
        if(allAlarms[i].id == random){
            return generateUniqueId();
        }
    }
    return random; 
}