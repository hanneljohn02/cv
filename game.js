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
    var soundsWrong = new Audio('sounds/' + name + '.mp3')
    soundsWrong.play();
}

function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");
    setTimeout(function () {
        $("#" + currentColor).removeClass("pressed");
    }, 100);
}

$(".btn").click(function () {
    var userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);

    animatePress(userChosenColor);
    playSound(userChosenColor);
    checkAnswer(userChosenColor);
});

$("h1").click(function () {
    if (started === level) {
        nextSequence()
        started = 1;
    }
});

function checkAnswer(currentLevel) {
    if (userClickedPattern.indexOf(currentLevel) == gamePattern.indexOf(currentLevel)){
        console.log("success");
        if (userClickedPattern.length == gamePattern.length) {
            setTimeout(function () {
                nextSequence();
            }, 1000);
            userClickedPattern = [];
            console.log("success");
        }
    } else {
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200);
        $("#level-title").text("Game Over, tap to restart");
         startOver();
        console.log("wrong number yung index ng user pattern")
    }
}

function startOver() {
    level = 0;
    started = 0;
    gamePattern = [];
    userClickedPattern = [];
}