

let draw_color = "black";
let draw_width = "2";
let is_drawing = false;
let start_bg_color = "white";

let restore_array = [];
let index = -1;

const canvas = document.querySelector("canvas");
canvas.width = window.innerWidth -60;
canvas.height = 500;

const ctx = canvas.getContext("2d");
ctx.fillStyle = start_bg_color;
ctx.fillRect(0,0,canvas.width,canvas.height);


const colorFields = document.querySelectorAll(".color-field");
const colorPicker = document.querySelector("#color-picker");
const penRange = document.getElementById("pen-range");
const btnClearCanvas = document.getElementById("clear-canvas");
const btnUndo = document.getElementById("undo");

colorFields.forEach((element)=>{
    element.addEventListener("click",(e)=>{
        draw_color = e.target.style.backgroundColor;
    });
});

colorPicker.addEventListener("input",(e)=> draw_color = e.target.value);

penRange.addEventListener("input",(e)=> draw_width = e.target.value);

btnClearCanvas.addEventListener("click",clearCanvas);

btnUndo.addEventListener("click",undoLast);

canvas.addEventListener("touchstart",start);
canvas.addEventListener("touchmove",draw);
canvas.addEventListener("mousedown",start);
canvas.addEventListener("mousemove",draw);

canvas.addEventListener("touchend",stop);
canvas.addEventListener("mouseup",stop);
canvas.addEventListener("mouseout",stop);


function start(e){
    is_drawing = true;
    ctx.beginPath();
    ctx.moveTo(e.clientX - canvas.offsetLeft,
               e.clientY - canvas.offsetTop);
    e.preventDefault();
}

function draw(e){
    if(is_drawing){
        ctx.lineTo(e.clientX - canvas.offsetLeft,
                   e.clientY - canvas.offsetTop);

        ctx.strokeStyle = draw_color;
        ctx.lineWidth = draw_width;
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        ctx.stroke();
    }
    e.preventDefault();
}

function stop(e){
    if(is_drawing){
        ctx.stroke();
        ctx.closePath();
        is_drawing = false;
    }
    e.preventDefault();

    if(e.type != "mouseout"){
        restore_array.push(ctx.getImageData(0,0,canvas.width,canvas.height));
        index += 1;
    }
 

}

function clearCanvas(){
    ctx.fillStyle = start_bg_color;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    restore_array = [];
    index = -1;
}

function undoLast(){
  
    if(index <= 0){
        clearCanvas();
    } else{
        index -= 1;
        restore_array.pop();
        ctx.putImageData(restore_array[index], 0, 0);
    }

}