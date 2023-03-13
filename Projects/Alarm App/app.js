// I used set and map to learn them better 
// there always might be better ways to solve problems
// I applied these lines of codes below to learn better some concepts and solve problems.


// activeAlarms set holds activated alarms
let activeAlarms = new Set();
// alarms map holds objects associated with alarms 
let alarms = new Map();


const hInput = $("#hours-input");
const mInput = $("#minutes-input");
const listEl = $(".list");


// click event to add to the list
$("#submit-el").click(createAlarmItem);


function createAlarmItem(e){
    // to prevent default properties of form submit
    e.preventDefault();
    // to validate inputs if they are invalid, dont execute other codes. 
    if(hInput.val() === "" || mInput.val() === "") {
        alert("Enter inputs!");
        return;
    }else if(hInput.val() > 23 || mInput.val() > 59){
        alert("Exceeded!");
        return;
    }else if(hInput.val().length > 2 || mInput.val().length > 2){
        alert("undefined time length");
        return;
    }

    // assign inputs to variables
    let h = (hInput.val().length === 1 ? "0" + hInput.val() : hInput.val());
    let m = (mInput.val().length === 1 ? "0" + mInput.val() : mInput.val());

    // select all clocks
    const allClocks = document.querySelectorAll(".text-clock");
    // create alarm object by using datas from inputs 
    let alarmItem = {
        textClock: `${h}:${m}`,
        id: generateUniqueId(),
        timer:null,
        label:""
    }
    // check clocks to block repeated clock
    for(let x of allClocks){
        if(x.textContent === alarmItem.textClock){
            alert(`You have already this:${alarmItem.textClock} alarm!`);
            return;
        }
    }
    // add item to the map
    alarms.set(alarmItem.id,alarmItem);
    // create and add item to the DOM!
    addAlarmItem(alarmItem);
  
}
    
function addAlarmItem(alarmItem){
    // create element and assign its values
    let item = document.createElement("li");
    item.classList.add("item");
    item.id = alarmItem.id;
    
    item.innerHTML = `
            <p class="text-clock">${alarmItem.textClock}</p>
            <div class="form-check form-switch d-flex gap-2">
                <input class="form-check-input" type="checkbox" role="switch" title="on/off">
                <i class="fa-solid fa-trash"></i>
                <i class="fa-solid fa-chevron-down"></i>
            </div>
            <div class="down-content">
                <div class="input-group mb-1">
                    <input type="text" class="form-control alarm-label" placeholder="dblclick to change label" disabled>
                    <button class="btn btn-outline-primary save-label" type="button">save</button>
                </div>
                <p class="remaning-time"></p>
            </div>`
    // append item to the end of the clock list
    listEl.append(item);
    // events to realize some functionalities
    item.querySelector(".form-check-input").addEventListener("click",setAlarm);
    item.querySelector(".fa-trash").addEventListener("click",deleteListItem);
    item.querySelector(".fa-chevron-down").addEventListener("click",toggleDropDown);
    
    item.querySelector(".input-group").addEventListener("dblclick",enableLabel);
    
    item.querySelector(".alarm-label").addEventListener("blur",disableLabel);
}

function setAlarm(e){
    // makes clocks activated or deactivated by clicking checkbox
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
    // get id of the clicked list element  
    let itemId = parseInt(e.target.parentNode.parentNode.id);
    // get text of the clicked list element
    let textClock = e.target.parentNode.parentNode.firstElementChild.textContent;
    // make timer null to stop setInterval
    updateRemaningTime(itemId,"clear");
    // delete clicked element from set and map
    activeAlarms.delete(textClock);
    alarms.delete(itemId);
    // remove from html document
    e.target.parentNode.parentNode.remove();
}

// check and play audio all seconds
setInterval(checkAlarm,1000)

function checkAlarm(){
    // get current clock
    let currentClock = new Date();
    // if seconds isn't equal to zero return function and don't run other codes unnecessarily!
    if(currentClock.getSeconds() != 0){
        return;
    }
    // get hours and minutes and adjust them in intended form like hh:mm
    let h = currentClock.getHours();
    let m = currentClock.getMinutes();
    h = h < 10 ? "0" + h : h;
    m = m < 10 ? "0" + m : m; 

    let textClock = `${h}:${m}`;
    // if set has the current clock, play voice because it means that there is a clock in the activealarms which is equal to current clock
    if(activeAlarms.has(textClock)){
        playVoice("sounds/alarm.mp3");
    }
   
}
    // play voice with respect to path parameter
function playVoice(path){
    let audio = new Audio(path);
    audio.play();
}

// slide toggle to the clicked element 
function toggleDropDown(e){
    let id = parseInt(e.target.parentNode.parentNode.id);
    const dropDown =  $(`#${id} .down-content`);

    if(dropDown.css('display') == 'none'){ 
        // show dropdown and make setInterval active 
        dropDown.slideDown('slow'); 
        updateRemaningTime(id,"set");
    } else { 
        // delete setInterval of clicked element
        dropDown.slideUp('slow'); 
        updateRemaningTime(id,"clear");
    }
}

        // make label-input useable by dblclicking 
function enableLabel(e){
    // get the id of clicked element
    let itemId = parseInt(e.target.parentNode.parentNode.parentNode.id);
    // change disabled property false and focus the input
    $(`#${itemId} .alarm-label`).prop("disabled", false).focus();
}

function disableLabel(e){
    // get id and make input disabled
    let itemId = parseInt(e.target.parentNode.parentNode.parentNode.id);

    $(`#${itemId} .alarm-label`).prop("disabled", true);
    // set label in the object in the map 
    alarms.get(id).label = $(`#${id} .alarm-label`).val();
   
}

function updateRemaningTime(id,type){
    // according to type parameter, execute a part of condition
    if(type === "set"){
        calculateRemaningTime(alarms.get(id).id);
        alarms.get(id).timer = setInterval(()=>{calculateRemaningTime(alarms.get(id).id)},60000);
    }
    else if(type === "clear"){
        clearInterval(alarms.get(id).timer);
        alarms.get(id).timer = null; 
    }

}

function calculateRemaningTime(id){
    // calculate difference between two clock
    // the calculation requires math knowledge and a little logic
    // maybe there are function to calculate but I just wanna use my logic and codes 
    console.log("Runs");
    let alarmText = $(`#${id} .text-clock`).text();
    let alarmH = parseInt(alarmText.substring(0,2));
    let alarmM = parseInt(alarmText.substring(3,5));
    // convert clock to the minutes
    let endMinutes = (alarmH*60) + alarmM 
    console.log(alarmH,alarmM);
    let currTime = new Date();
    let h = currTime.getHours();
    let m = currTime.getMinutes();
    console.log(h, m);
    // convert current clock to the minutes
    let startMinutes = (h*60) + m;
    let remaningMinutes = endMinutes - startMinutes;
    // if result is negative, minutes as much as a day should be added to calculate difference 
    if(remaningMinutes < 0 ){
        remaningMinutes += (24*60);
    }
    // convert all minutes to hours and minutes
    h = Math.floor(remaningMinutes / 60);
    m = remaningMinutes % 60;
    console.log(h,m);

    h = h < 10 ? "0" + h : h;
    m = m < 10 ? "0" + m : m; 
    // change text of html element 
    $(`#${id} .remaning-time`).text(`${h}:${m} left!`);

}
    // generate unique id !
function generateUniqueId(){
    let random = Math.floor(Math.random()*10000);

    for (const x of alarms.values()) {
        if(x.id === random){
            return generateUniqueId();
        }
    }
    return random; 
}