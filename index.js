
// hide navbar on scroll

var prevScrollpos = window.pageYOffset;
window.onscroll = function() {
var currentScrollPos = window.pageYOffset;
  if (prevScrollpos > currentScrollPos) {
    document.getElementById("navbar").style.top = "0";
  } else {
    document.getElementById("navbar").style.top = "-130px";
  }
  prevScrollpos = currentScrollPos;
}

// img clicking voice

let ppEl = document.getElementById("profile-photo");

ppEl.addEventListener("click",function(){
  new Audio("sounds/yamete.mp3").play();
})
