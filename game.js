var userClickedPattern = [];

var gamePattern = [];

var buttonColors = ["red", "blue", "green", "yellow"];

var numberOfColors = buttonColors.length;

var randomChosenColors;

var level = 0;

var started = 0;

function nextSequence() {
    var randomNumber = Math.random()
    randomNumber = (randomNumber * numberOfColors);
    randomNumber = Math.floor(randomNumber);
    randomChosenColors = buttonColors[randomNumber];

    $('#' + randomChosenColors).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColors);

    gamePattern.push(randomChosenColors);

    level++
    $("#level-title").text("level " + level);
}

function playSound(name) {
    var sounds = new Audio('sounds/' + name + '.mp3');
    sounds.play();
}

function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");
    setTimeout(function () {
        $("#" + currentColor).removeClass("pressed");
    }, 100);
}

$(document).keydown(function () {
    if (started === level) {

        nextSequence()

        $(".btn").click(function () {
            var userChosenColor = $(this).attr("id");
            userClickedPattern.push(userChosenColor);

            animatePress(userChosenColor);
            playSound(userChosenColor);
            checkAnswer(userClickedPattern.length);
        });

    } else {
        console.log("false babe babe")
    }
});

function checkAnswer(currentLevel) {
    if (gamePattern.length == currentLevel) {
        console.log("success");
        
        setTimeout(function(){
            nextSequence();
            userClickedPattern = [];
        },1000);

    } else {
        console.log("wrong kasi nag reset yung user clicked pattern");
    }
    
}