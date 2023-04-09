
const notifications = document.querySelector(".notifications");
const buttons = document.querySelectorAll(".buttons .btn");

const toastDetails = {
    success:{
        icon: "fa-circle-check",
        text: "Success: This is a success toast.",
    },
    error:{
        icon: "fa-circle-xmark",
        text: "Error: This is a error toast.",
    },
    warning:{
        icon: "fa-triangle-exclamation",
        text: "Warning: This is a warning toast.",
    },
    info:{
        icon: "fa-circle-info",
        text: "Info: This is a info toast.",
    }
}

const removeToast = (toast)=>{
    toast.classList.add("hide");
    if(toast.timeoutId) clearTimeout(toast.timeoutId);
    setTimeout(()=> toast.remove(),500);
}

const createToast = (id) =>{
    //Getting the icon and text for the toast based on the id passed
    const {icon,text} = toastDetails[id];
    const toast = document.createElement("li"); //creating a new li element
    toast.className = `toast ${id}`;
    toast.innerHTML = ` <div class="column">
                        <i class="fa-solid ${icon}"></i>
                        <span>${text}</span>
                        </div>
                        <i class="fa-solid fa-xmark" onclick="removeToast(this.parentElement)"></i>`
    notifications.appendChild(toast);

    toast.timeoutId = setTimeout(()=>removeToast(toast) ,5000);
}

buttons.forEach(button =>{
    button.addEventListener("click",()=> createToast(button.id));
});