'use strict';
//Selecting Elements
const mainPL1 = document.querySelector('.player--0');
const mainPL2 = document.querySelector('.player--1');

const scorePlayer1 = document.querySelector('#score--0');
const scorePlayer2 = document.querySelector('#score--1');

const currentP1 = document.querySelector('#current--0');
const currentP2 = document.querySelector('#current--1');

const dice_img = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

//Starting conditions

let playingNow, bothScores, commonCurrentScore, activePlayer;

const startGame = function () {
  playingNow = true;
  bothScores = [0, 0];
  commonCurrentScore = 0;
  activePlayer = 0;
  scorePlayer1.textContent = 0;
  scorePlayer2.textContent = 0;
  dice_img.classList.add('hidden');
  mainPL1.classList.add('player--active');
  mainPL2.classList.remove('player--active');
  mainPL1.classList.remove('player--winner');
  mainPL2.classList.remove('player--winner');
};

startGame();

//Switching Player
const switchPlayer = function () {
  commonCurrentScore = 0;
  document.querySelector(`#current--${activePlayer}`).textContent =
    commonCurrentScore;
  activePlayer = activePlayer === 0 ? 1 : 0;
  mainPL1.classList.toggle('player--active');
  mainPL2.classList.toggle('player--active');
};

//ROLL DICE BUTTON
btnRoll.addEventListener('click', function () {
  if (playingNow) {
    const dice_value = Math.trunc(Math.random() * 6) + 1;
    console.log(dice_value);
    dice_img.classList.remove('hidden');
    // In two ways we can assign or update new values to attributes
    dice_img.setAttribute('src', `dice-${dice_value}.png`);
    //dice_img.src = `dice-${dice_value}.png`;
    if (dice_value !== 1) {
      commonCurrentScore += dice_value;
      document.querySelector(`#current--${activePlayer}`).textContent =
        commonCurrentScore;
    } else {
      switchPlayer();
    }
  }
});

//HOLD BUTTON
btnHold.addEventListener('click', function () {
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
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
      document.querySelector(`#name--${activePlayer}`).innerHTML +=
        '\n You Win!';
      dice_img.classList.add('hidden');
    } else {
      switchPlayer();
    }
  }
});

btnNew.addEventListener('click', function () {
  document.querySelector(`#name--${activePlayer}`).textContent = document
    .querySelector(`#name--${activePlayer}`)
    .textContent.replace(/You Win!/g, ' ');
  startGame();
});
