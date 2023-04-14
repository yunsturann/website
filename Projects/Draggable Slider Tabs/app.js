
const tabsBox = document.querySelector(".tabs-box");
const arrowIcons = document.querySelectorAll(".icon i");
const allTabs = document.querySelectorAll(".tab");

let isDragging = false;

const handleIcons = () =>{
    let scrollVal = Math.round(tabsBox.scrollLeft);
    let maxScrollableWidth = tabsBox.scrollWidth - tabsBox.clientWidth;
    arrowIcons[0].parentElement.style.display = scrollVal > 0 ? "flex" : "none";
    arrowIcons[1].parentElement.style.display = maxScrollableWidth > scrollVal ? "flex" : "none";
}

arrowIcons.forEach(icon =>{
    icon.addEventListener("click",()=>{
        // if clicked icon is left, reduce 350 from tabsBox scrollLeft else add
        tabsBox.scrollLeft += icon.id === "left" ? -350 : 350;
        setTimeout(()=> handleIcons(),50); // calling handleIcons after 50 ms
    })
});

allTabs.forEach( tab =>{
    tab.addEventListener("click", () =>{
        // remove active class then add the active class to clicked tab 
        tabsBox.querySelector(".active").classList.remove("active");
        tab.classList.add("active");
    });
});

const dragging = (e) =>{
    if(!isDragging) return;
    tabsBox.scrollLeft -= e.movementX;
    tabsBox.classList.add("dragging");
    handleIcons();

}

const dragStop = ()=>{
    isDragging = false;
    tabsBox.classList.remove("dragging");
}

tabsBox.addEventListener("mousedown",()=> isDragging = true);
tabsBox.addEventListener("mouseup", dragStop);
tabsBox.addEventListener("mousemove",dragging);
tabsBox.addEventListener("mouseleave",dragStop);