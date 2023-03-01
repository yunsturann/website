let quotes = [];
// run when document is ready
$(function () {
    if(localStorage.getItem("quotes") != null){
        quotes = JSON.parse(localStorage.getItem("quotes"));
        quotes.forEach(element => {
            addQuotes(element);
        });
    }
});

function addQuotes(item){
    // append card holds the quote and author
    $(".cards").append(`
        <div class="col">
            <div class="card h-100">
                <div class="card-body">
                    <p class="card-text">${item.quote}</p>
                    <p class="card-text float-end">${item.author}</p>
                </div>
                <div class="card-footer">
                   <button type="submit" class="delete btn btn-primary">Delete</button>
                   <div class="approval">
                    <button type="submit" class = "btn btn-success"> <i class="fa-solid fa-check"></i></button>
                    <button type="submit" class = "btn btn-danger"> <i class="fa-solid fa-x"></i></button>
                   </div>
                </div>
            </div>
        </div>`);

    
    // delete event
    $(".delete").off("click").on("click",(event)=>{
        // adjust displays
        event.target.style.display = "none";
        event.target.parentNode.children[1].style.display ="flex";
        
        $(".btn-success").off("click").on("click",(e)=>{
            // select body node
            let cardBody = e.currentTarget.parentNode.parentNode.parentNode.firstElementChild;
            let item ={ // create object that approved to delete
                quote:cardBody.firstElementChild.textContent,
                author: cardBody.lastElementChild.textContent
            };
            // delete from array
            for(let i = 0;i<quotes.length;i++){
                if(JSON.stringify(quotes[i]) === JSON.stringify(item)){
                    quotes.splice(i,1);
                }
            }
            //delete node
            e.currentTarget.parentNode.parentNode.parentNode.parentNode.remove();
            //update storage
            localStorage.setItem("quotes",JSON.stringify(quotes));
        });

        $(".btn-danger").off("click").on("click",(e)=>{
            e.currentTarget.parentNode.parentNode.children[0].style.display= "inline-block";
            e.currentTarget.parentNode.parentNode.children[1].style.display ="none";
        });

    });

}

