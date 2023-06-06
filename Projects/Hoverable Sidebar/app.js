
const sidebar = document.querySelector(".sidebar");
const sidebarOpenBtn = document.querySelector("#sidebar-open");
const sidebarCloseBtn = document.querySelector("#sidebar-close");
const sidebarLockBtn = document.querySelector("#lock-icon");



const toggleLock = () =>{
    sidebar.classList.toggle("locked");

    if(!sidebar.classList.contains("locked")){
        sidebar.classList.add("hoverable");
        sidebarLockBtn.classList.replace("bx-lock-alt", "bx-lock-open-alt");
    }else{
        sidebar.classList.remove("hoverable");
        sidebarLockBtn.classList.replace("bx-lock-open-alt", "bx-lock-alt")
    }
}

const hideSidebar = () =>{
    if(sidebar.classList.contains("hoverable")){
        sidebar.classList.add("close");
    }
}

const showSidebar = () =>{
    if(sidebar.classList.contains("hoverable")){
        sidebar.classList.remove("close");
    }
}

const toggleSidebar = () =>{
    sidebar.classList.toggle("close");
}

//If the window width is less than 800px, close the sidebar and remove hoverablity and lock

if(window.innerWidth < 800){
    sidebar.classList.add("close");
    sidebar.classList.remove("locked");
    sidebar.classList.remove("hoverable");
}

sidebarLockBtn.addEventListener("click", toggleLock);
sidebar.addEventListener("mouseleave", hideSidebar);
sidebar.addEventListener("mouseenter", showSidebar);
sidebarOpenBtn.addEventListener("click", toggleSidebar);
sidebarCloseBtn.addEventListener("click", toggleSidebar);

