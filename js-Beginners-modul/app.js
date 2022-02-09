"use strict";
const btn1 = document.querySelector(".btn1");
const modal = document.querySelector(".modal");
const btn2 = document.querySelector(".btn2");
const btn3 = document.querySelector(".btn3");
const btn = document.querySelector(".btn-secondary");

function btn1Fun() {
  modal.classList.add("show");
  modal.style.display = "flex";
}

function closeFun() {
  modal.classList.remove("show");
  modal.style.display = "none";
}

btn1.addEventListener("click", btn1Fun);

[btn, btn2, btn3].forEach((a) => {
  a.addEventListener("click", closeFun);
});
