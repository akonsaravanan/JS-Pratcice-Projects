const button = document.querySelector(".btn-outline-secondary");
const body = document.querySelector("body");
const colors = ["red", "green", "blue", "yellow", "pink", "purple"];

const changeColor = function () {
  let randomValue = Math.floor(Math.random() * colors.length);
  let colorValue = colors[randomValue];
  console.log(colorValue);
  body.style.backgroundColor = colorValue;
  setTimeout(changeColor, 1000);
};

changeColor();
// button.addEventListener("click", changeColor);
