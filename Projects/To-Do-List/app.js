let todos = [];

const taskInput = document.getElementById("task");
const addTaskBtn = document.getElementById("add-task-btn");
const taskList = document.getElementById("task-list");
const resetAllBtn = document.getElementById("reset");



///////////////////
// Events        //
///////////////////

// if storage has elements load them
window.addEventListener("DOMContentLoaded", loadTasksFromStorage);
addTaskBtn.addEventListener("click",submitItem);
resetAllBtn.addEventListener("click",resetTasks);

//if submit button runs
function submitItem(e){
    e.preventDefault();

    let input = taskInput.value;
    if(input ===""){
        alert("Enter a task to submit!");
        return;
    }
    // add item
    addItem(input);

    // push item to the list
    todos.push(input);
    // update storage
    updateStorage()

}

// add item to the list as a html not to the array.
function addItem(input){

    let element = document.createElement("li");
    element.innerHTML = input + '<span class="delete">X</span>';
    taskList.appendChild(element);

    taskInput.value = "";

    element.querySelector(".delete").addEventListener("click",deleteBtn);
    // if there is a item make its style block of resetAllButton
    renderResetButton()
}

// delete item function when clicked "x"
function deleteBtn(e){
    // send node triggered
    deleteItem(e.target);
}

function deleteItem(node){
    let text = node.parentNode.textContent;
    //slice 'x' textContent of span which is trival
    text = text.slice(0, -1);
    //delete item from array
    todos.splice(todos.indexOf(text), 1);
    // remove item's parent('li') from html
    node.parentNode.remove();
    // update storage
    updateStorage()
    // if there isn't any item rest, remove resetAllButton
    renderResetButton()
}

///////////////////
// local storage //
///////////////////

function loadTasksFromStorage(){
    getStorage();
    todos.forEach((item)=>addItem(item));

}

function updateStorage(){
    localStorage.setItem("todos",JSON.stringify(todos));
}

// check storage and assign them to the array
function getStorage(){
  if(localStorage.getItem("todos") === null){
    todos = [];
  }else{
    todos = JSON.parse(localStorage.getItem("todos"));
  }

}

///////////////////
// Reset Button  //
///////////////////


function resetTasks(){
  const tasks = document.querySelectorAll(".delete");
  for(let i = 0;i<tasks.length;i++){
    //send all nodes
    deleteItem(tasks[i]);
  }

}

function renderResetButton(){
  if(taskList.children.length === 0){
    resetAllBtn.style.display = "none";
  }
  else{
    resetAllBtn.style.display = "block";
  }
}
