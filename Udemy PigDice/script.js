//Selecting Elements
const sectionPL1 = document.querySelector(".player--0");
const sectionPL2 = document.querySelector(".player--1");

const scorePlayer = document.querySelector(".score");
const scorePlayer1 = document.querySelector("#score--0");
const scorePlayer2 = document.querySelector("#score--1");

let currentScoreField = document.querySelector(".current-score");
/* const currentP1 = document.querySelector("#current--0");
const currentP2 = document.querySelector("#current--1"); */

const dice_img = document.querySelector(".dice");
const btnNew = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");

//Variables
let playingNow, bothScores, commonCurrentScore, activePlayer;

//Functions
const startGame = function () {
  playingNow = true;
  bothScores = [0, 0];
  commonCurrentScore = 0;
  activePlayer = 0;
  scorePlayer1.textContent = 0;
  scorePlayer2.textContent = 0;
  dice_img.classList.add("hidden");
  sectionPL1.classList.add("player--active");
  sectionPL2.classList.remove("player--active");
  sectionPL1.classList.remove("player--winner");
  sectionPL2.classList.remove("player--winner");
};
const rollDice = function () {
  if (playingNow) {
    const diceValue = Math.floor(Math.random() * 6) + 1;
    dice_img.classList.remove("hidden");
    dice_img.setAttribute("src", `dice-${diceValue}.png`);
    if (diceValue !== 1) {
      commonCurrentScore += diceValue;
      console.log(activePlayer);
      /* currentScoreField.setAttribute("id", `#current--${activePlayer}`);
      currentScoreField.innerHTML = commonCurrentScore; */
      document.querySelector(`#current--${activePlayer}`).textContent =
        commonCurrentScore;
    } else {
      switchPlayer();
    }
  }
};

const switchPlayer = function () {
  commonCurrentScore = 0;
  document.querySelector(`#current--${activePlayer}`).textContent =
    commonCurrentScore;
  /* currentScoreField.textContent = commonCurrentScore;
  currentScoreField.removeAttribute("id"); */
  activePlayer = activePlayer === 0 ? 1 : 0;
  sectionPL1.classList.toggle("player--active");
  sectionPL2.classList.toggle("player--active");
};

const holdPlayer = function () {
  if (playingNow) {
    bothScores[activePlayer] += commonCurrentScore;
    console.log(bothScores[activePlayer]);
    document.querySelector(`#score--${activePlayer}`).textContent =
      bothScores[activePlayer];
    commonCurrentScore = 0;
    document.querySelector(`#current--${activePlayer}`).textContent =
      commonCurrentScore;
    if (bothScores[activePlayer] >= 10) {
      playingNow = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--winner");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove("player--active");
      document.querySelector(`#score--${activePlayer}`).textContent += " 🏆";

      dice_img.classList.add("hidden");
    } else {
      switchPlayer();
    }
  }
};

const newGame = function () {
  document.querySelector(`#name--${activePlayer}`).textContent = document
    .querySelector(`#name--${activePlayer}`)
    .textContent.replace(/🏆/g, " ");
  startGame();
};

startGame();

//Events
btnHold.addEventListener("click", holdPlayer);
btnNew.addEventListener("click", newGame);
btnRoll.addEventListener("click", rollDice);
