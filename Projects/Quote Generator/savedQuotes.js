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

        event.target.style.display = "none";
        event.target.parentNode.children[1].style.display ="flex";
        
        $(".btn-success").one("click",(e)=>{
            console.log(e.target.parentNode.parentNode.parentNode.parentNode.parentNode);
           //event.target.parentNode.parentNode.parentNode.remove();
        });

        $(".btn-danger").off("click").on("click",(e)=>{
            console.log(e.target);
           
           // e.target.parentNode.parentNode.children[0].style.display= "inline-block";
           // e.target.parentNode.parentNode.children[1].style.display ="none";
           //event.target.parentNode.children[1].style.display ="none";
            //event.target.style.display = "inline-block";
        });

    });

}

