

/* slider */

$("#slider-input").on("input",setSliderLabel);

function setSliderLabel(e){
    $("#slider-label").text(e.target.value +" questions");
}

/* start quiz btn*/

$("#btn-start").click(startQuiz);

function startQuiz(e){
    e.preventDefault();

    // validation of inputs
    if($(".category option:selected").text() === "Category" || $(".difficulty option:selected").text() === "Difficulty")
    {
        alert("Select inputs!");
        return;
    }

    const QuizApp = {
        numberOfQuestions: $("#slider-input").val(),
        category: $(".category option:selected").val(),
        difficulty: $(".difficulty option:selected").text()
    }

    sessionStorage.setItem("quizApp",JSON.stringify(QuizApp));

    window.location.assign("app.html");
    
}


