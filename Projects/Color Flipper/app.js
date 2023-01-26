const colors = ["green", "red", "rgba(133,122,200)", "#f15025"];

const btn = document.getElementById("btn");
const colorEl = document.querySelector(".color");

btn.addEventListener("click",function(){

    const randomNumber = Math.floor(Math.random()*colors.length); // 0-3 

    document.body.style.backgroundColor = colors[randomNumber];
    colorEl.textContent = colors[randomNumber];

})