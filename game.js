const buttonColors = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];
let level = 0;
let started = false;

const blue = new Audio("./sounds/blue.mp3");
const green = new Audio("./sounds/green.mp3");
const red = new Audio("./sounds/red.mp3");
const yellow = new Audio("./sounds/yellow.mp3");
const wrong = new Audio("./sounds/wrong.mp3");

const nextSquence = () => {
  level++;
  userClickedPattern = [];
  $("h1").text(`Level ${level}`);
  const randomNumber = Math.floor(Math.random() * 3);
  const randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);
  console.log(gamePattern);

  $("#" + randomChosenColor)
    .fadeOut(100)
    .fadeIn(100);
};

const playSound = (color) => {
  switch (color) {
    case "red":
      red.play();
      break;

    case "blue":
      blue.play();
      break;

    case "green":
      green.play();
      break;

    case "yellow":
      yellow.play();
      break;

    default:
      break;
  }
};

const animatePress = (currentColor) => {
  $("#" + currentColor).addClass("pressed");
  setTimeout(() => {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
};

const checkAnswer = (currentLevel) => {
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    if (userClickedPattern.length === level) {
      setTimeout(() => {
        nextSquence();
      }, 1000);
    }
  } else {
    wrong.play();

    $("body").addClass("game-over");
    setTimeout(() => {
      $("body").removeClass("game-over");
    }, 200);

    $("h1").text("Game Over, Press Any Key to Restart");
    startOver();
  }
};

$(".btn").click((e) => {
  const userChosenColor = e.target.id;

  userClickedPattern.push(userChosenColor);

  checkAnswer(userClickedPattern.length - 1);
  playSound(userChosenColor);
  animatePress(userChosenColor);
});

$(document).keypress(() => {
  started = true;
  if (started) {
    $("h1").text(`Level ${level}`);
    nextSquence();
  }
});

const startOver = () => {
  level = 0;
  gamePattern = [];
  started = false;
};
