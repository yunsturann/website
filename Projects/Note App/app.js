
let notes = [];

const btn = document.querySelector("#btn");
const parentNotes = document.querySelector("#app"); 

// click event to create a new note
btn.addEventListener("click",()=>{
    let item = {
        id:generateUniqueId(),
        content:""
    };
    createNote(item);
    notes.push(item);
    // save localstorage
    save();
});

// runs when document is ready
document.addEventListener("DOMContentLoaded",()=>loadFromStorage());

function createNote(item){
    
    //create a node and set its values of attributes
    let node = document.createElement("textarea");
    node.setAttribute("placeholder", "Empty Note");
    node.setAttribute("spellcheck","false");
    node.id = item.id;
    node.classList.add("note");
    node.value = item.content;
    

    // add the node bofore button by calling insertBefore function
    parentNotes.insertBefore(node,btn);
    
    // add dbclick event to remove the note
    node.addEventListener("dblclick",deleteNote);

    // blur event when focusing out of input
    node.addEventListener("blur",(e)=>{
        
        for(let i = 0; i<notes.length;i++){
            if(notes[i].id === parseInt(e.target.id)){
                notes[i].content = e.target.value;
                break;
            }
        }
        // save localstorage
        save();
    });
}

// to delete note
function deleteNote(e){
    if(confirm("Are you sure to remove the note ?")){
        for(let i=0;i<notes.length;i++){
            if(notes[i].id == e.target.id){
                notes.splice(i,1);
                break;
            }                
        }          
        e.target.remove();
        save();
    }
}

// save notes to the local storage
function save(){
    localStorage.setItem("MySavedNotes",JSON.stringify(notes));
}

// get notes from local storage
function loadFromStorage(){
    if(localStorage.getItem("MySavedNotes") != null){
        notes = JSON.parse(localStorage.getItem("MySavedNotes"));
        notes.forEach((element)=>createNote(element));
    }
}

function generateUniqueId(){
    let random = Math.floor(Math.random()*10000);
    for(let x of notes){
        if(x.id === random){
            return generateUniqueId();
        }
    }
    return random; 
}
