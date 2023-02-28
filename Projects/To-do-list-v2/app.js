
let todos =[];

const submitBtn = $("#btn-submit");
const deleteAllBtn = $("#delete-all-btn");

// add todo by pressing enter 
$("#task-input").keypress(function (e) { 
    if(e.key === "Enter"){
        submitTask();
    }
});

// when document is ready, load todos
$(function () {
    loadTodosFromStorage();
});

/////////////////////////
// Add and Delete Section
/////////////////////////
submitBtn.click(submitTask);

function submitTask(e){
    //e.preventDefault();
    // get input entered
    let taskInput = $("#task-input").val();
    // if input is empty, end it up 
    if(taskInput ==="") return; 
    // push to do array todos 
    todos.push(taskInput);
    // add todo 
    addTodo(taskInput);
    // update storage
    updateStorage();
}

function addTodo(todo){
    // create list item
    let item = document.createElement("li");
    item.classList.add("list-group-item");
    item.classList.add("list-item-dark");
    item.innerHTML = `${todo}<span class="delete float-end">X</span><i title="move up" class="fa-solid fa-chevron-up float-end mx-1 px-1"></i>`
    //add item as a last child of ul.
    $("ul").append(item);
    // clear input value
    $("#task-input").val("");
    // delete(X) event listener
    item.querySelector(".delete").addEventListener("click",(event)=>deleteNode(event.target));
    // move the dblclicked item to the top 
    item.querySelector(".fa-chevron-up").addEventListener("click",moveUp);
    // check todos for display of btn
    checkDeleteAllBtn()
}

function deleteNode(node){
    // get and assign the text content of list item, slice x from textContent
    let text = node.parentNode.textContent.slice(0,-1); 
    console.log(text);
    //delete item from array
    todos.splice(todos.indexOf(text),1);
    // remove item's parent('li') from html
    node.parentNode.remove();
    // check todos for display of btn
    checkDeleteAllBtn()
    // update storage
    updateStorage();
}

//////////////////
// reset tasks btn

deleteAllBtn.click(deleteAll);

function deleteAll(){

    if(confirm("Are you sure to delete all tasks?") === false) return;
    
    // select all Li and remove
    $("li").remove();
    // make todos empty
    todos = [];
    // check todos for visibility of btn
    checkDeleteAllBtn()
    // update storage
    updateStorage();
}

function checkDeleteAllBtn(){
    if(todos.length === 0) // if there is no todo, hide btn
        deleteAllBtn.fadeOut(500);
    else                   // else show btn
        deleteAllBtn.fadeIn(500);
}

////////////////
// Local Storage

function updateStorage(){
    localStorage.setItem("todos",JSON.stringify(todos));
}

function loadTodosFromStorage(){
    if(localStorage.getItem("todos") === null){
        todos = [];
    } else{
        todos = JSON.parse(localStorage.getItem("todos"));
        todos.forEach((item)=>addTodo(item));
    }
}

////////////////////
// Filter Section //
////////////////////

$("#input-search").on("keyup",filterTasks);

function filterTasks(e){
    //get input from user make it lower case and remove whitespace
    let textInput = e.target.value.toLowerCase().trim();
    const listElements = document.querySelectorAll("li");  
    
    //compare input with the list items and set their display property
    for(let i=0;i<todos.length;i++){
      if(todos[i].toLowerCase().trim().includes(textInput)){
        listElements[i].setAttribute("style","display: block");
      }else{
        listElements[i].setAttribute("style","display: none");
      }
    }//end-for
}

//////////////////////////////////
//add a slide toggle to search icon 

$("#btn-search").click(function(){
    let input = $("#input-search");
    if(input.css("display") === "none"){
        $("#btn-search").removeClass("search-icon");
        input.fadeIn(500);
    }else{
        input.fadeOut(500);
        setTimeout(()=>{
            $("#btn-search").addClass("search-icon");
        },500)
    }
})

////////////
// Dark mode

const moonIcon = $(".dark-mode");

moonIcon.click(function(){
    if($("body").css("background-color") === "rgb(255, 255, 255)"){
        $(".container").css("background-color", "#2C3333");
        $(".container").css("color", "white");
        $("body").css("background-color","rgb(34, 31, 31)");
        moonIcon.css("color","white");
        $("li").addClass("list-item-dark");
        $(".fa-github").css("color","white");
        $(".fa-y").css("color","white");
        
    } else{
        $(".container").css("background-color", "#eceaea");
        $(".container").css("color", "black");
        $("body").css("background-color","white");
        moonIcon.css("color","black");
        $("li").removeClass("list-item-dark");
        $(".fa-github").css("color","black");
        $(".fa-y").css("color","black");
        
    }
})

////////////////
// dbclick event

function moveUp(e){
   
    $("ul").prepend(e.target.parentNode);
    let text = e.target.parentNode.textContent.slice(0,-1);
    shiftTodos(todos.indexOf(text));

}

function shiftTodos(index){
    // shifting elements
    let prependedItem = todos[index];
    for(let i = index;i>0;i--){
        todos[i] = todos[i-1];
    }
    todos[0] = prependedItem;
    updateStorage();
}