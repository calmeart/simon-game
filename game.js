var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var count = 0;

function nextSequence() {
  var randomNumber = Math.floor(Math.random() * 4);
  var selectedColor = buttonColors[randomNumber];
  count++;
  $("h1").text("Level " + count);
  animateButton(selectedColor);
  var audio = new Audio("sounds/" + selectedColor + ".mp3")
  audio.play();
  gamePattern.push(selectedColor);
  userClickedPattern = [];
}

function gameOver() {
  $("body").addClass("game-over");
  setTimeout(function() {
    $("body").removeClass("game-over");
  }, 500);
  var gameOverAudio = new Audio("sounds/wrong.mp3");
  gameOverAudio.play();
  gamePattern = [];
  userClickedPattern = [];
  count = 0;
  $("h1").text("Game Over, Press Any Key to Restart!");
}

function animateButton(color) {
  $("#" + color).addClass("pressed")
  setTimeout(function() {
    $("#" + color).removeClass("pressed")
  }, 100);
}

$(".btn").click(function(event) {
  var userChosenColor = event.target.id;
  animateButton(userChosenColor);
  var userAudio = new Audio("sounds/" + userChosenColor + ".mp3");
  userAudio.play();
  userClickedPattern.push(userChosenColor);
  for (var i = 0; i < userClickedPattern.length; i++) {
    if (gamePattern[i] != userClickedPattern[i]) {
      gameOver();
    } else if (count == i + 1) {
      setTimeout(function() {
        nextSequence();
      }, 500);
    }
  }
})

$(document).keypress(function(event) {
  if (!gamePattern[0]) {
    nextSequence();
  }
})
