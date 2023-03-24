
const sevmem = document.getElementById("sevmem");
const severim = document.getElementById("severim");

const width = window.innerWidth - sevmem.offsetWidth;
const height = window.innerHeight - sevmem.offsetHeight;


sevmem.addEventListener("mouseover",changeLocation);

function changeLocation(e){
    const location = generateLocation(width,height); 
      
    sevmem.style.position = "absolute";
    sevmem.style.top = `${location.top}px`;
    sevmem.style.left = `${location.left}px`;
    
}

severim.addEventListener("click",function(){
    alert("Teşekkür ederim ben de seni çok seviyorum <3");
});

sevmem.addEventListener("click",()=>{
   alert("Buna tiklamak icin cidden bu kadar ugrastiysan tebrik ediyorm beni sevmiyosun üzüldüm."); 
});

function generateLocation(w,h){

    let topLeft = {
        top: Math.floor(Math.random()*h),
        left: Math.floor(Math.random()*w)
    }
    return topLeft;
}