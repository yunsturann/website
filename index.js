
// hide navbar on scroll

let prevScrollpos = window.pageYOffset;
window.onscroll = function() {
let currentScrollPos = window.pageYOffset;
  if (prevScrollpos > currentScrollPos) {
    document.getElementById("navbar").style.top = "0";
  } else {
    document.getElementById("navbar").style.top = "-130px";
  }
  prevScrollpos = currentScrollPos;
}

// nav-toggle

const rightSide = document.querySelector(".right-side");
const navToggle = document.querySelector(".nav-toggle");
const navbar = document.getElementById("navbar");

navToggle.addEventListener("click",renderNavbar );
navbar.addEventListener("mouseleave",() => rightSide.setAttribute("style","display:none"));

function renderNavbar(){
  if(rightSide.style.display==="none"){
    rightSide.setAttribute("style","display:flex");
  }
  else{
    rightSide.setAttribute("style","display:none");
  }
}



