 
let score1 = document.querySelector(".score1");
let score2 = document.querySelector(".score2");
let title = document.querySelector("#title");


// RANDOM NUMBER GENERATOR

function randomNumber() {
   return Math.floor(Math.random() * 6 + 1);
}

//play button

function play(){

  //first dice

  var number1 = randomNumber();
  var imageSource = "images/dice"+number1+".png";
  document.querySelector(".img1").setAttribute("src",imageSource);

  // second dice

  var number2 = randomNumber();
  imageSource = "images/dice"+number2+".png";
  document.querySelector(".img2").setAttribute("src",imageSource);

  // to change h1
  if(number1>number2){
    document.querySelector("h1").innerHTML="<small>🚩</small>Player 1 Wins!";
    
    //score 1
    score1.textContent++;
    score1.textContent = score1.textContent;
  }
  else if(number2>number1){
    document.querySelector("h1").innerHTML="Player 2 Wins!<small>🚩</small>";

    //score 2
    let value = score2.textContent;
    value++;
    score2.textContent = value;

  }
  else{
    document.querySelector("h1").innerHTML="Draw!"
  }
  
  
}

function reset(){  // refreshing page is the easiest way but I'm trying this way to grisp the subject.
  score1.textContent = 0;
  score2.textContent = 0;
  title.textContent="Let's Play!!!";

  document.querySelector(".img1").src = "images/dice6.png";
  document.querySelector(".img2").src = "images/dice6.png";
}