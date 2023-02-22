
let words = [];
let onSearch = true;

$("#submit").click(searchWord);

$("#word-input").keypress((e)=>{
    if(e.key ==="Enter"){
        searchWord();
    }
})

function searchWord(){
   
    let word = $("#word-input").val();
    let url = "https://api.dictionaryapi.dev/api/v2/entries/en/"+ word;
    fetch(url).then(function(response){
        if(!response.ok){
            throw new Error("Word not found!");
        }
        return response.json();
    }).then(function(res){
        
        //console.log(res);
        
        // clear cards
        $(".card-row").html("");

        // add card
        for(let i = 0;i<res[0].meanings.length;i++){
            let card ={
                title: res[0].word,
                subtitle: res[0].meanings[i].partOfSpeech,
                text: res[0].meanings[i].definitions[0].definition
            };
            appendCard(card,".card-row","save");
            
        }

        // save card
        $(".save-card").click(function(e){
            let item = {
               title: e.target.parentNode.children[0].textContent,
               subtitle: e.target.parentNode.children[1].textContent,
               text: e.target.parentNode.children[2].textContent
            }
            words.push(item);
            updateLocalStorage();
            
        })
     

    }).catch((err)=>{
        alert(err);
    })
}

function appendCard(card,parent,type){
    $(parent).append(`
                <div class="col">
                    <div class="card h-100">
                        <div class="card-body">
                            <h5 class="card-title">${card.title}</h5>
                            <h6 class="card-subtitle mb-2 text-muted">${card.subtitle}</h6>
                            <p class="card-text">${card.text}</p>
                            <button class="${type}-card btn btn-outline-primary">${type}</button>                         
                        </div>
                    </div>
                </div>`);
}

// saved-cards

$("#btn-saved-words").click(()=>{
    if(!onSearch){
        $("#btn-saved-words").text("Go to saved cards");
        $("#search-section").show();
        $("#saved-section").hide();
        $(".saved-cards").html("");
        $(".search-input").show();
        onSearch = true;
        return;
    }

    $(".search-input").hide();
    $("#search-section").hide();
    $("#saved-section").show();
    $("#btn-saved-words").text("Go to search");

    onSearch = false;
    words.forEach(function(card){
        appendCard(card,".saved-cards","delete");
    });

    //delete card
    $(".delete-card").click((e)=>{
        let item = {
            title: e.target.parentNode.children[0].textContent,
            subtitle: e.target.parentNode.children[1].textContent,
            text: e.target.parentNode.children[2].textContent
        }
        
        //delete card from array that holds cards
        for(let i = 0;i<words.length;i++){
            // stringify to compare objects
            if(JSON.stringify(words[i]) === JSON.stringify(item)){ // 
                console.log("Found");
                words.splice(i,1);
                break;
            }
        }
        // delete from html
        e.target.parentNode.parentNode.parentNode.remove();
        // update storage 
        updateLocalStorage();
    })

});



// storage part
$(document).ready(function () {
    if(localStorage.getItem("savedWords") === null){
        words = [];
    }
    else{
        words = JSON.parse(localStorage.getItem("savedWords"));
    }
});

function updateLocalStorage(){
    localStorage.setItem("savedWords",JSON.stringify(words));
}