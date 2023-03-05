// confusing line of codes
// can be writen so better
// no comments
// will be coded better

const questions = [
    {
        question: "What is the biggest sport clup in Turkey ?",
        options:["Trabzonspor","Fenerbahçe","Beşiktaş","Galatasaray"],
        answer:"Fenerbahçe"
    },
    {
        question: "Most beautiful city in Turkey ?",
        options:["Eskisehir","Düzce","Ankara","İzmir"],
        answer:"Eskisehir"
    },
    {
        question: "What is the capital of Turkey ?",
        options:["İstanbul","Ankara","İzmir","Antalya"],
        answer:"Ankara"
    },
    {
        question: "Who is the richest person ?",
        options:["Ali Koc","Elon Musk","Kiliclaroglu","Erdogan"],
        answer:"Elon Musk"
    },
    {
        question: "Which country has the most population?",
        options:["France","India","Brazil","China"],
        answer:"China"
    }
];

let index = 0;
let clickable = false;

const startBtn = document.getElementById("btn-start");
const question = document.getElementById("question");
const questionNumber = document.getElementById("question-number");
const options = document.getElementById("options");
const contents = document.querySelectorAll(".content");
const score = document.getElementById("score");
const optionAll = document.querySelectorAll(".option");
const message = document.getElementById("message");

startBtn.addEventListener("click",startQuiz);

document.getElementById("number-all").textContent = questions.length;

for(let i = 0; i<optionAll.length;i++){
    optionAll[i].addEventListener("click",selectOption);
}


function startQuiz(){

    for(let i = 0;i<contents.length;i++){
        contents[i].parentNode.classList.remove("bg-success");
        contents[i].parentNode.classList.remove("bg-danger");
    }

    if(startBtn.textContent === "Start again!"){
        resetQuiz();
    }

    startBtn.textContent = "Next";

    if(index === questions.length){  
        return;
    }

    displayNextQues(questions[index++]);
}


function displayNextQues(item){
    clickable = true;
    for(let i = 0;i < optionAll.length;i++){
        optionAll[i].setAttribute("style","cursor:pointer");
    }

    if(index === questions.length) startBtn.textContent = "Start again!";
    
    questionNumber.textContent = index;
    question.textContent = item.question;
    for(let i = 0;i<contents.length;i++){
        contents[i].textContent = item.options[i];
    }

}

function selectOption(e){
    if(!clickable){
        myAlert("Start/Go to the Next!",2000);
        return;
    } 
    clickable = false;
    for(let i = 0;i < optionAll.length;i++){
        optionAll[i].setAttribute("style","cursor:default");
    }

    if(questions[index - 1].answer === e.currentTarget.firstElementChild.textContent){
        e.currentTarget.classList.add("bg-success");
        score.textContent = parseInt(score.textContent) + 1 + " score";
    }else{
        e.currentTarget.classList.add("bg-danger");
    }
        
}

function resetQuiz(){

    myAlert(`Your score is ${score.textContent}!`,4000);

    setTimeout(()=>{
        index = 1;
        score.textContent = "0 score";
        displayNextQues(questions[0]);
        startBtn.textContent = "Start"
    },2000);
}

function myAlert(text,duration){
    message.style.display="block";
    message.textContent = text;
    setTimeout(()=>{
        message.textContent="";
        message.style.display="none";
    },duration);
}