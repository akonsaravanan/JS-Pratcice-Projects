"use strict";

const tabButton = document.querySelector(".tab-button");
const btns = document.querySelectorAll(".btn");
const tabContent = document.querySelectorAll(".tab-content");

/* function tab(e) {
  const btnEl = e.target.closest('.btn');
  const data = btnEl.getAttribute('tab-data');
  btns.forEach((btn) => btn.classList.remove('btn--active'));
  btnEl.classList.add('btn--active');
  tabContent.forEach((tab) => tab.classList.remove('tab-content--active'));
  document
    .querySelector(`.tab-content--${data}`)
    .classList.add('tab-content--active');
}

tabButton.addEventListener('click', tab); */

btns.forEach((btn) =>
  btn.addEventListener("click", () => {
    btns.forEach((btn) => btn.classList.remove("btn--active"));
    tabContent.forEach((tab) => tab.classList.remove("tab-content--active"));
    const tabData = btn.getAttribute("tab-data");
    btn.classList.add("btn--active");
    document
      .querySelector(`.tab-content--${tabData}`)
      .classList.add("tab-content--active");
  })
);
