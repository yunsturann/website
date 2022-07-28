
function randomNumber() {
   return Math.floor(Math.random() * 6 + 1);
}

//first dice

var number1=randomNumber();
var imageSource="images/dice"+number1+".png";
document.querySelector(".img1").setAttribute("src",imageSource);

// second dice

var number2=randomNumber();
imageSource="images/dice"+number2+".png";
document.querySelector(".img2").setAttribute("src",imageSource);

// to change h1
if(number1>number2){
  document.querySelector("h1").innerHTML="🚩Player 1 Wins!";
}
else if(number2>number1){
  document.querySelector("h1").innerHTML="Player 2 Wins!🚩";
}
else{
  document.querySelector("h1").innerHTML="🚩Draw!🚩"
}
