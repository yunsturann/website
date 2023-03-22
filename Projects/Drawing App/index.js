
const canvas = document.querySelector("canvas");
canvas.width = window.innerWidth -60;
canvas.height = 500;

const ctx = canvas.getContext("2d");
ctx.fillStyle = "white";
ctx.fillRect(0,0,canvas.width,canvas.height);

let draw_color = "black";
let draw_width = "2";
let is_drawing = false;