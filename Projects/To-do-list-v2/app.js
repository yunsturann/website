
let todos =[];

const submitBtn = $("#btn-submit");
const deleteAllBtn = $("#delete-all-btn");


$("#btn-search").click(function(){
    $("#input-search").slideToggle(500);
})

submitBtn.click(submitTask);
deleteAllBtn.click(deleteAll);

function submitTask(e){
    // prevent default 
    e.preventDefault();
    // get input entered
    let taskInput = $("#task-input").val();
    // if input is empty, end it up 
  
    if(taskInput ==="") return; 
    // push to do array todos 
    todos.push(taskInput);
    // create list item
    let item = document.createElement("li");
    item.classList.add("list-group-item");
    item.innerHTML = `${taskInput}<span class="delete float-end">X</span>`
    //add item as a last child of ul.
    $("ul").append(item);
    // clear input value
    $("#task-input").val("");

    // delete(X) event listener
    item.querySelector(".delete").addEventListener("click",(event)=>deleteNode(event.target));

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
}

function deleteAll(){
    // select all Li and remove
    $("li").remove();
    // make todos empty
    todos = [];
    // check todos for visibility of btn
    checkDeleteAllBtn()
}

function checkDeleteAllBtn(){
    if(todos.length === 0) // if there is no todo, hide btn
        deleteAllBtn.fadeOut(500);
    else                   // else show btn
        deleteAllBtn.fadeIn(500);
}



