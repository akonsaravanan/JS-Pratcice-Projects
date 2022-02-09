const images = document.querySelectorAll("img");
const paraElement = document.querySelector(".name");
const overlaySection = document.querySelector(".overlay");

const imageAnimel = function (e) {
  let element = e.target.getAttribute("alt");
  overlaySection.style.display = "flex";
  paraElement.textContent = element;
  speechAudio(element);
};

images.forEach(function (image) {
  image.addEventListener("click", imageAnimel);
});

overlaySection.addEventListener("click", function (e) {
  if (!e.target.classList.contains("name")) {
    overlaySection.style.display = "none";
  }
});

const speechAudio = function (text) {
  const synth = window.speechSynthesis;
  const voice = new SpeechSynthesisUtterance(text);
  synth.speak(voice);
};
