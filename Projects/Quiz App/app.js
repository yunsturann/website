// required variables 
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
   
    // dont execute click event if quiz is not started.
    if(!started){
        return;
    }
    // check clicked choice is true, increment score. Otherwise, make clicked html danger to show wrong user choice  
    if(data[index].correctAnswer === e.currentTarget.firstElementChild.textContent){
        score++;
        $("#score").text(score+" score");
    }else{
        e.currentTarget.classList.add("bg-danger");
    }
    // show correct answer by adding backgronund class in every click
    $(`#btn${correctIndex}`).addClass("bg-success");

    // make started false until the next question
    started = false;
    // increment index to call next question
    index++;
    // if all questions are done, offer two option one of is to restart the same category quiz.
    // another one is adding button below the footer in order to return homepage of the quiz app. 
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
        // show score 5 sec
        myAlert("Your Score is " + score +".",5000);
        return;
    }
    // send parameter for alert to inform user
    myAlert("Next question is coming...",2000);
    // to delete bgrounds of choices
    setTimeout(()=>clearOptionColors(e),2000);
    // call the next question function 
    setTimeout(nextQuestion,2000);

});

// removes backgrounds on choices.
function clearOptionColors(e){
    e.currentTarget.classList.remove("bg-danger");
    $(`#btn${correctIndex}`).removeClass("bg-success");
}


// document ready
$(function(){
    myAlert("Document is ready!", 2000);
    // get inputs, which user selected, from session storage
    quizApp = JSON.parse(sessionStorage.getItem("quizApp"));
    // assign variables decleared on the top
    nOfQuestions = parseInt(quizApp.numberOfQuestions);

    if(quizApp.difficulty === "Easy"){
        time = nOfQuestions * 20;
    }else if(quizApp.difficulty === "Medium"){
        time = nOfQuestions * 15;
    }else if(quizApp.difficulty === "Hard"){
        time = nOfQuestions * 10;
    }
    // call fetching function
    fetchQuestions();

});

async function fetchQuestions(){
    
    myAlert("Fetching Data",10000);

    // set url to fetch data from api with respect to inputs from user.
    let category = "";
    if(quizApp.category != "random"){
        category = "categories=" + quizApp.category +"&";
    }
    const url = `https://the-trivia-api.com/api/questions?${category}limit=${nOfQuestions}&region=TR&difficulty=${quizApp.difficulty.toLowerCase()}`

    // fetch data by using asynchronous function and await keyword 
    const response = await fetch(url);
    // checking whether server is ok or not 
    if(!response.ok){
        alert("Couldn't fetched data from API");
        return;
    }
    // converting data to json as an array 
    data = await response.json();
    // alert to inform user
    myAlert("Fetched Data",1000);

    startQuiz();
 
/* first way I made to manage a promise which is data returned from fetch func.
    fetch(url)
    .then((response)=>response.json())
    .then((res)=>{
        data = res;
        myAlert("Fetched Data",1000);
        console.log(data);

        startQuiz();
    });
*/
}


function startQuiz(){
    // set timer variable to stop when I need.
    timer = setInterval(setTime,1000);
    // change text which has the number of questions
    $("#number-all").text(nOfQuestions);
    // calling nextQuestion
    nextQuestion();

}

function nextQuestion(){
    // make options clickable by setting started bool
    started = true;
    // create a variable keeping data about the question
    const ques = data[index];
    let j = 0;
    
    // write question, question number and category to the screen
    $("#question").text(ques.question);
    $("#question-number").text(index+1);
    $("#category").text(ques.category);
    
    //! all codes below for showing options randomly.

    // generate an integer index between [0-3] to assign correct choice index. 
    correctIndex = randomNumberGenerator(3);
    // get all nodes to add choices to them
    let options = document.querySelectorAll(".content");

    for(let i = 0; i<options.length;i++){
        // assign correct answer to the option with the help of index generated before
        if(i === correctIndex){
            options[i].textContent = ques.correctAnswer; 
        }
        // in else condition assign all other wrong options
        else{
            options[i].textContent = ques.incorrectAnswers[j];
            j++;
        }
    }

}

// it is needed to set time user has
function setTime(){
    // if there is no available question loaded or remained, dont execute the function 
    if(!started){
        return;
    }
    // if time runs out.Do these in order: inform user , clear interval and finish quiz. 
    if(time === 0){
        alert("Time is up!");
        $("#count-down").text("No time left");
        clearInterval(timer);
        started = false;
        return;
    }

    // if User has time. decrement time every second. And show it to user  
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

