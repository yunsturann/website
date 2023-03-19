
let data;
let quizApp;
let time;
let nOfQuestions;
let index = 0;
let timer;
let started = false;
let score = 0;
let correctIndex;


/*Click event to the options */

$(".option").click((e)=>{
   

    if(!started){
        return;
    }

    if(data[index].correctAnswer === e.currentTarget.firstElementChild.textContent){
        score++;
        $("#score").text(score+" score");
    }else{
        e.currentTarget.classList.add("bg-danger");
    }

    $(`#btn${correctIndex}`).addClass("bg-success");

    started = false;
    index++;

    if(index === nOfQuestions){
        setTimeout(()=>{
             if(confirm("Do you want to restart ?")){
                window.location.reload();
             }
             else{
                $("footer").after("<button class='btn btn-primary mt-3 returnHomage'> Return Homepage </button>")
                $(".returnHomage").click(()=> window.location.assign("start.html"));
             }
        },1000);

        myAlert("Your Score is " + score +".",10000);
        return;
    }

    myAlert("Next question is coming...",2000);
    setTimeout(()=>clearOptionColors(e),2000);

    setTimeout(nextQuestion,2000);


    console.log(e.currentTarget.firstElementChild.textContent);
    console.log(score+"  index:"+index)


});

function clearOptionColors(e){
    e.currentTarget.classList.remove("bg-danger");
    $(`#btn${correctIndex}`).removeClass("bg-success");
}


// document ready
$(function(){
    myAlert("Document is ready!", 2000);
    
    quizApp = JSON.parse(sessionStorage.getItem("quizApp"));

    nOfQuestions = parseInt(quizApp.numberOfQuestions);

    if(quizApp.difficulty === "Easy"){
        time = nOfQuestions * 20;
    }else if(quizApp.difficulty === "Medium"){
        time = nOfQuestions * 15;
    }else if(quizApp.difficulty === "Hard"){
        time = nOfQuestions * 10;
    }
    
    fetchQuestions();

});

function fetchQuestions(){
    
    myAlert("Fetching Data",10000);
    let category = "";
    if(quizApp.category != "random"){
        category = "categories=" + quizApp.category +"&";
    }
    const url = `https://the-trivia-api.com/api/questions?${category}limit=${nOfQuestions}&region=TR&difficulty=${quizApp.difficulty.toLowerCase()}`
    console.log(url);
    fetch(url)
    .then((response)=>response.json())
    .then((res)=>{
        data = res;
        myAlert("Fetched Data",1000);
        console.log(data);

        startQuiz();
    });

}


function startQuiz(){
    timer = setInterval(setTime,1000);

    $("#number-all").text(nOfQuestions);
    nextQuestion();

}

function nextQuestion(){

    started = true;
    ques = data[index];
    let j = 0;
    
    $("#question").text(ques.question);
    $("#question-number").text(index+1);
    $("#category").text(ques.category);
    

    correctIndex = randomNumberGenerator(3);

    let options = document.querySelectorAll(".content");

    for(let i = 0; i<options.length;i++){
        if(i === correctIndex){
            options[i].textContent = ques.correctAnswer; 
        }
        else{
            options[i].textContent = ques.incorrectAnswers[j];
            j++;
        }
    }

}


function setTime(){

    if(!started){
        return;
    }

    if(time === 0){
        alert("Time is up!");
        $("#count-down").text("No time left");
        clearInterval(timer);
        started = false;
        return;
    }

    time--;
    $("#count-down").text(`${time} sec left!`);
    
}



/* My alert function creates a pop-up */
function myAlert(text,duration){
    const message = $("#message");
    message.css("display","block");
    message.text(text);
    setTimeout(()=>{
        message.text("");
        message.css("display","none");
    },duration);
}

function randomNumberGenerator(upperBound){
    let random = Math.floor(Math.random()*(upperBound + 1));
    return random;
}

