const allImages = document.querySelectorAll(".store-img");
const imageContainer = document.querySelectorAll(".img-container");
const lightBox = document.querySelector(".lightbox-container");
const lightBoxItem = document.querySelector(".lightbox-item");
const btnRight = document.querySelector(".btnRight");
const btnLeft = document.querySelector(".btnLeft");
const lightBoxClose = document.querySelector(".lightbox-close");

let imagesArray = [];
let imageCounter = 0;
let lightboxImage;

allImages.forEach(function (img) {
  imagesArray.push(img.src);
});

imageContainer.forEach(function (img) {
  img.addEventListener("click", function (e) {
    lightboxImage = e.target.src;
    lightBox.classList.add("show");
    lightBoxItem.style.backgroundImage = `url(${lightboxImage})`;
    imageCounter = imagesArray.indexOf(lightboxImage);
  });
});

btnLeft.addEventListener("click", function () {
  imageCounter--;
  if (imageCounter < 0) {
    imageCounter = imagesArray.length - 1;
  }
  lightBoxItem.style.backgroundImage = `url(${imagesArray[imageCounter]})`;
});

btnRight.addEventListener("click", function () {
  imageCounter++;
  if (imageCounter >= imagesArray.length - 1) {
    imageCounter = 0;
  }
  lightBoxItem.style.backgroundImage = `url(${imagesArray[imageCounter]})`;
});
lightBoxClose.addEventListener("click", function () {
  lightBox.classList.remove("show");
});
