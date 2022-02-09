//Page Elements
const btnAgain = document.querySelector(".again");
const btnCheck = document.querySelector(".check");
const resultNumber = document.querySelector(".number");
const inputGuessNumber = document.querySelector(".guess");
const message = document.querySelector(".message");
const highScorefield = document.querySelector(".highscore");
const scorefield = document.querySelector(".score");

//Variables

let secretNumber = Math.floor(Math.random() * 20) + 1;
console.log(secretNumber);
let score = 20;
let highScore = 0;
const lostmsg = "Sorry You have lost 😭";
const toolowmsg = "Too Low....👎";
const toohighmsg = "Too High...🙅‍♀️";
const successmsg = "Congrats You Win 🏆";
const nodatamsg = "Please Enter Number";

//Functions

const displayMessage = function (givenmessage) {
  message.textContent = givenmessage;
};

const guessMyNumber = function () {
  const guess = +inputGuessNumber.value;

  if (!guess) {
    displayMessage(nodatamsg);
  } else if (guess === secretNumber) {
    document.body.style.backgroundColor = "#60b347";
    displayMessage(successmsg);
    resultNumber.textContent = guess;
    inputGuessNumber.value = "";
    if (score > highScore) {
      highScore = score;
      highScorefield.textContent = highScore;
    }
  } else if (guess !== secretNumber) {
    console.log("under validation");
    if (score > 1) {
      displayMessage(guess > secretNumber ? toohighmsg : toolowmsg);
      score--;
      scorefield.textContent = score;
    } else {
      displayMessage(lostmsg);
      scorefield.textContent = 0;
    }
  }
};

const restartGame = function () {
  location.reload();
  secretNumber = Math.floor(Math.random() * 20) + 1;
  document.body.style.backgroundColor = "#222";
  scorefield.textContent = score;
  displayMessage("Start Guessing!");
  resultNumber.textContent = "?";
  inputGuessNumber.value = "";
};

//Events
btnCheck.addEventListener("click", guessMyNumber);
btnAgain.addEventListener("click", restartGame);
