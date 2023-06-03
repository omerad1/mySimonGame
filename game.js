var started = false;
var level = 0;
var buttonColors =["red","blue","green","yellow"];
var gamePattern =[];
var userClickPattern = [];
var nextLevel = true;

$(document).on("keypress",function(){
    if(started == false){
        nextSequence();
        started = true;
    }
});

$(".btn").on("click",function(){

    userClickPattern.push(this.id);

    animatedPress(this.id);

    playSound(this.id);

    checkAnswer(userClickPattern.length-1);

});

function checkAnswer(level){
    if(userClickPattern[level] !== gamePattern[level]){
        console.log("failure");
        playSound("wrong");
        $("body").addClass("game-over");
        $("h1").text("Game Over :(\n Press Any Key to Restart")
        setTimeout(function(){ $("body").removeClass("game-over");},1300);
        startOver();
       
    }
    if(level == gamePattern.length-1){
        setTimeout(function(){
            nextSequence();
        },1000);
    }
    console.log("success");
    return true;
}

function nextSequence(){
    userClickPattern = [];

    $("h1").text("Level "+(++level));

    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);

    
    animatedPress(randomChosenColor);

    playSound(randomChosenColor);


}



function playSound(id){
    var audio = new Audio("./sounds/"+id+".mp3");
    audio.play();
}

function animatedPress(id){
    $("#"+id).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    $("#"+id).addClass("pressed");

    setTimeout(function(){
        $("#"+id).removeClass("pressed");

      },115);
}

function startOver(){
    gamePattern = [];
    userClickPattern = [];
    level = 0;
    started = false;
}