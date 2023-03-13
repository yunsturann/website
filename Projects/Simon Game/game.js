
const colors = ["green","red","yellow","blue"];
let levelPattern = [];
let userPattern = [];

let started = false;
let clickable = false;
let level = 0;
let speed = 1000;

$(document).on("keypress",startGame);
$(document).on("dblclick",startGame);

function startGame(){
    if(started){           // if game isn't started doesnt allow clicking
       return;
    }else{
        started = true;
        $("body").removeClass("game-over");
        playGame();
    }
}

$(".btn").click(function(){
    if(!clickable){                               // if clicking is not available dont allow.
        return;
    }
    let userChosenColour = $(this).attr("id");  // get the color clicked from user.
    userPattern.push(userChosenColour);         // push it user pattern
    pressed(userChosenColour);             // pressed effect
    playSound(userChosenColour);                //
    checkPatterns();                            // check user pattern is true or not and create result

})


function playGame(){
    level++;                        // level up
    $("h1").text("Level " + level); // change h1 title with respect to the level
    createElement();                // create next pattern element
    showPattern();                  // while showing pattern doesnt allow to click!
    
}

function checkPatterns(){
    for(let i = 0;i<userPattern.length;i++){
        if(userPattern[i] != levelPattern[i]){      // if pattern isnt same to levelPattern
            gameOver();                             // call gameOver function
            return;                                 // end it up 
        }
    }

    if(userPattern.length === levelPattern.length){ // if all user click is the same, go to the next level
        $("h1").text("Level Completed!");
        setTimeout(()=>{
            playGame();                             // to pass the next level
            userPattern = [];                       // user pattern should be empty to get input for next level
        },1000);
      
    }
    
}

function gameOver(){
    $("body").addClass("game-over");
    $("h1").text("Game over! Press a key to restart!");   // Game over content show in the title
    playSound("wrong");                                   // play wrong.mp3 sound 
    levelPattern = [];                                    // make levelPattern empty for a new game
    userPattern = [];                                     // make userPattern empty for a new game
    started = false;                                      
    clickable = false;                                    // should be false not to allow clicking btns
    level = 0;                                            // make it 0 for a new game
}

function setSpeed(){         // setting the speed of timeOut functions and effects
    if(level < 3){
     speed = 1000;
    }else if(level < 5){
     speed = 750;
    }else if(level < 10){
     speed = 500;
    }else{
     speed = 300;
    }
}


function showPattern(){
    setSpeed();
    clickable = false;                             // make it false not to allow for clicking while showing steps
        for(let i = 0;i<levelPattern.length;i++){
            setTimeout(function(){                  // call functions in order 
                pressed(levelPattern[i]);
                playSound(levelPattern[i]);
                if(i === levelPattern.length -1){   // if all pattern is shown, make buttons clickable and get inputs 
                    clickable = true;
                }
            }, i*speed);                            // essantial to call all functions in the different time
        } 
}

function pressed(color){      // pressed animation
    $("#" + color).addClass("pressed").fadeOut(speed/4).fadeIn(speed/4).delay(speed/2).queue(function(next){
        $(this).removeClass('pressed');
        next();
    });
}

function playSound(name) {
    new Audio("sounds/" + name + ".mp3").play(); 
}

function createElement(){
    let nextPattern = randomNumber(3);
    levelPattern.push(colors[nextPattern]);
}

function randomNumber(upper){
    return Math.floor(Math.random()*(upper +1));
}