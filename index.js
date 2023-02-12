const rightSide = document.querySelector(".right-side");
const navToggle = document.querySelector(".nav-toggle");
const navbar = document.getElementById("navbar");

// hide navbar on scroll

let prevScrollpos = window.pageYOffset;
window.onscroll = function() {
let currentScrollPos = window.pageYOffset;
  if (prevScrollpos > currentScrollPos) {
    navbar.style.top = "0";
  } else {
    navbar.style.top = "-130px";
    if(window.getComputedStyle(navToggle).display === "block"){
      rightSide.setAttribute("style","display:none");
    }
  }
  prevScrollpos = currentScrollPos;
}

let screen = window.matchMedia("(max-width: 600px)");

screen.addListener(myFunction); // listen screen width
navToggle.addEventListener("click",renderNavbar); // nav toggle click event

function myFunction(screen){
  if (screen.matches) { // 600px or less
    //navToggle.style.display === "block";
    rightSide.setAttribute("style","display:none");
  }
  else{ //more than 600px
    rightSide.setAttribute("style","display:flex");
  }
}

function renderNavbar(){
  (rightSide.style.display === "flex") ?
   rightSide.setAttribute("style","display:none") :
   rightSide.setAttribute("style","display:flex");
}




