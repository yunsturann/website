
let words = [];
let onSearch = true;



$("#submit").click(searchWord);

$("#word-input").keypress((e)=>{
    if(e.key ==="Enter"){
        searchWord();
    }
})

// get item from API and evalutate and append it 
function searchWord(){
    
    let word = $("#word-input").val();
    let url = "https://api.dictionaryapi.dev/api/v2/entries/en/"+ word;
    fetch(url).then(function(response){
        if(!response.ok){
            throw new Error("Word not found!");
        }
        return response.json();
    }).then(function(res){
        // show search, hide saved cards
        $("#search-section").show();
        $("#saved-section").hide();

        // clear cards
        $(".card-row").html("");
        // add and show found cards  
        for(let i = 0;i<res[0].meanings.length;i++){
            let card ={
                title: res[0].word,
                subtitle: res[0].meanings[i].partOfSpeech,
                text: res[0].meanings[i].definitions[0].definition,
                example: res[0].meanings[i].definitions[0].example,
                src:res[0].phonetics[0].audio
            };
            appendCard(card,".card-row","save");
        }

    }).catch((err)=>{
        alert(err);
    });
}

// add triggered item into array and update local storage
function addCard(e){
   
    let item = {
        title: e.target.parentNode.children[0].textContent,
        subtitle: e.target.parentNode.children[1].textContent,
        text: e.target.parentNode.children[2].textContent,
        example: e.target.parentNode.children[3].textContent,
        src:e.target.parentNode.children[4].firstElementChild.src
    }
    words.push(item);
    updateLocalStorage();
    appendCard(item,".saved-cards","delete");
    // show card saved
    e.target.textContent = "saved succesfully";
    setTimeout(function(){
        e.target.textContent = "save";
    },1000);

}


function appendCard(card,parent,type){
    // prevent undefined objects, make its display none 
    let display = "";
    if(card.example === undefined || card.example === "undefined" ){
        display = "d-none";
    }
    //append
    $(parent).append(`
                <div class="col col-card">
                    <div class="card h-100">
                        <div class="card-body">
                            <h5 class="card-title" title="word">${card.title}</h5>
                            <h6 class="card-subtitle mb-2 text-muted" title="part of speech">${card.subtitle}</h6>
                            <p class="card-text" title="meaning">${card.text}</p>
                            <p class="card-example ${display}" title="example">${card.example}</p>
                            <audio controls class="w-100"> <source src="${card.src}" type="audio/mpeg"></audio>
                            <button class="${type}-card btn btn-outline-primary d-block">${type}</button>                         
                        </div>  
                    </div>
                </div>`);

    if(type === "save"){
        //click event to btn-save to save card
        $(".save-card").off("click").on("click",addCard);
    }
    else if(type === "delete"){
        //click event to delete card
        $(".delete-card").off("click").on("click",deleteNode);
    }
}

// saved-cards-btn

$("#btn-saved-words").click(()=>{
    if(!onSearch){
        $("#btn-saved-words").text("Go to saved cards");
        $("#search-section").show();
        $("#saved-section").hide();
        $(".search-input").css("visibility","visible");
        onSearch = true;
        return;
    }

    $(".search-input").css("visibility","hidden");
    $("#search-section").hide();
    $("#saved-section").show();
    $("#btn-saved-words").text("Go to search");

    onSearch = false;

    //delete card
    $(".delete-card").off("click").on("click",deleteNode);

    // filter icon and section
    $(".fa-filter").off("click").on("click",function(){
        $("#filter-section").slideToggle();
    });
    
  
});

//deletion function
function deleteNode(e){

    let item = {
        title: e.target.parentNode.children[0].textContent,
        subtitle: e.target.parentNode.children[1].textContent,
        text: e.target.parentNode.children[2].textContent,
        example: e.target.parentNode.children[3].textContent,
        src: e.target.parentNode.children[4].firstElementChild.src
    }
    
    //delete card from array that holds cards
    for(let i = 0;i<words.length;i++){
        // stringify to compare objects
        if(JSON.stringify(words[i]) === JSON.stringify(item)){
            words.splice(i,1);
            break;
        }
    }
    // delete from html
    e.target.textContent = "Deleting...";
    setTimeout(()=>{
        e.target.parentNode.parentNode.parentNode.remove();
    },1000)
    
    // update storage 
    updateLocalStorage();

}

// sort
$("#btn-sort").click(()=>{

    if($("#btn-sort").text() === "Unsorted Cards"){
        $("#btn-sort").text("Sort Cards");
        $(".saved-cards").html("");
        words.forEach((card)=>{
            appendCard(card,".saved-cards","delete");
        })
        return;
    }

    $("#btn-sort").text("Unsorted Cards");
    let sortedWords = sort();
    $(".saved-cards").html("");
    sortedWords.forEach((card)=>{
        appendCard(card,".saved-cards","delete");
    });

});


$(".form-select").on("change",function(e){
    let value = e.target.value.toLowerCase();
    if(value === "1"){
        $(".col-card").css("display","block");
        return;
    }
    let allCards = document.querySelectorAll(".col-card");
    for(let i = 0; i<allCards.length;i++){
        if(allCards[i].firstElementChild.firstElementChild.firstElementChild.textContent[0] === value){
            allCards[i].style.display ="block";
        }else{
            allCards[i].style.display ="none";
        }
    }   
})

//create and return a sorted new array.
function sort(){
    let sortedWords = [...words];
    sortedWords.sort((a,b) => (a.title > b.title) ? 1 : ((b.title > a.title) ? -1 : 0));
    return sortedWords;
}


// document ready part includes loading and adding options
$(document).ready(function () {
    if(localStorage.getItem("savedWords") === null){
        words = [];
    }
    else{
        words = JSON.parse(localStorage.getItem("savedWords"));
        words.forEach(function(card){
            appendCard(card,".saved-cards","delete");
        });
        
    }
    // add options when it is ready
    // Using for loop for (A-Z):
    for (let i = 65; i <= 90; i++) {
        $(".form-select").append(`<option value="${String.fromCharCode(i)}">${String.fromCharCode(i)}</option>`);
    }
    
});

// storage part
function updateLocalStorage(){
    localStorage.setItem("savedWords",JSON.stringify(words));
}

