//Elements
const buttonStart = document.querySelector("#button-start");
const buttonStop = document.querySelector("#button-stop");
const buttonReset = document.querySelector("#button-reset");
const secondsField = document.querySelector("#seconds");
const tensField = document.querySelector("#tens");

//Variables
let seconds = 00;
let tens = 00;
let interval;

//Functions

const startTimer = function () {
  //   console.log("In START TIMER");
  tens++;
  if (tens <= 9) {
    tensField.textContent = "0" + tens;
  }
  if (tens > 9) {
    tensField.textContent = tens;
  }
  if (tens > 99) {
    tens = 0;
    seconds++;
    tensField.textContent = tens;
  }
  if (seconds <= 9) {
    secondsField.textContent = "0" + seconds;
  } else {
    secondsField.textContent = seconds;
  }
};
const resetTimer = function () {
  clearInterval(interval);
  tensField.textContent = "00";
  secondsField.textContent = "00";
};

//Events
buttonStart.addEventListener("click", function () {
  clearInterval(interval);
  interval = setInterval(startTimer, 10);
});
buttonStop.addEventListener("click", function () {
  clearInterval(interval);
});
buttonReset.addEventListener("click", resetTimer);
