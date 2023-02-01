let taskInput = document.getElementById("task");
let addTaskBtn = document.getElementById("add-task-btn");
let taskList = document.getElementById("task-list");

addTaskBtn.addEventListener("click", function(e) {
  
  e.preventDefault();
  
  if (taskInput.value === "") {
    alert("Please enter a task.");
    return;
  }
  
  let task = taskInput.value;
  let newTask = document.createElement("li");
  newTask.innerHTML = task + '<span>X</span>';
  
  taskList.appendChild(newTask);
  taskInput.value = "";
  
  newTask.querySelector('span').addEventListener('click', function(e){
    e.target.parentNode.remove();
  });
});
