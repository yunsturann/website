
let data;
let currIndex = 1;
let numberOfQuestions;

$(()=>{
    data = JSON.parse(sessionStorage.getItem("QuesAllDOM"));
    let data2= JSON.parse(sessionStorage.getItem("quizApp"));
    numberOfQuestions = parseInt(data2.numberOfQuestions);
    let paginationItems = () =>{
        let content = "";
        for(let i = 1; i<=numberOfQuestions;i++){
            content += `<li class="item${i}" onclick="showItem(${i})">${i}</li>`;
        } 
        return content;
    }

    $("#pag-prev").after(paginationItems());

    showItem(currIndex);
});

function showItem(index){
    currIndex = index
    $(`.pagination .active`).removeClass("active");
    $(`.pagination .item${index}`).addClass("active");
    $("#category").text(data[index -1].category);
    $("#question").text(data[index -1].question);
    $("#options").html("");
    $("#options").append(data[index -1].options);

}

function nextQuestion(){
    if(currIndex == numberOfQuestions){
        return;
    }
    showItem(++currIndex);
}

function prevQuestion(){
    if(currIndex == 1){
        return;
    }
    showItem(--currIndex);
}

$("#pag-next").click(nextQuestion);
$("#pag-prev").click(prevQuestion);
$("#next").click(nextQuestion);
$("#prev").click(prevQuestion);