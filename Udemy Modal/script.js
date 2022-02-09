//Page variables
const showModal = document.querySelectorAll(".show-modal");
const closeModal = document.querySelector(".close-modal");
const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");

//Functions
const ShowModal = function () {
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
};

const CloseModal = function () {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};

const CloseOnEscape = function (e) {
  if (e.key === "Escape" && !modal.classList.contains("hidden")) {
    modal.classList.add("hidden");
    overlay.classList.add("hidden");
  }
};

//Events
closeModal.addEventListener("click", CloseModal);
overlay.addEventListener("click", CloseModal);
document.addEventListener("keydown", CloseOnEscape);
showModal.forEach((modals) => modals.addEventListener("click", ShowModal));
