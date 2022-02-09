const allbuttons = document.querySelectorAll(".btn");
const storeItems = document.querySelectorAll(".store-item");
const searchBox = document.querySelector("#search-item");
let buttonFilter;

//Filter by Buttons
allbuttons.forEach(function (button) {
  button.addEventListener("click", function (e) {
    e.preventDefault();
    buttonFilter = e.target.dataset.filter;
    console.log(buttonFilter);
    storeItems.forEach(function (item) {
      if (buttonFilter === "all") {
        item.style.display = "block";
      } else if (
        item.dataset.item === buttonFilter ||
        item.classList.contains(buttonFilter)
      ) {
        item.style.display = "block";
      } else {
        item.style.display = "none";
      }
    });
  });
});

//Filter by Search query
searchBox.addEventListener("keyup", function (e) {
  //   e.preventDefault();
  const searchquery = e.target.value.toLowerCase().trim();
  storeItems.forEach(function (item) {
    if (item.dataset.item.includes(searchquery)) {
      item.style.display = "block";
    } else {
      item.style.display = "none";
    }
    //alternative
    /* if (item.textContent.includes(searchFilter)) {
      item.style.display = "block";
    } else {
      item.style.display = "none";
    } */
  });
});
