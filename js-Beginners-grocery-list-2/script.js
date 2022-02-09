//page ELements

const addItemsDisplayAction = document.querySelector(".addItems-action");
const inputItems = document.querySelector(".addItems-input");
const inputSubmitButton = document.querySelector(".addItems-submit");
const form = document.querySelectorAll("form");

const displayItemsAction = document.querySelector(".displayItems-action");
const groceryList = document.querySelector(".grocery-list");
const displaySubmitButton = document.querySelector(".displayItems-clear");
let groceries = [];
//Events form submit
form.forEach((form) => {
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    if (inputItems.value == "") {
      showMessages(false, addItemsDisplayAction, "Please Enter a value 🛑");
    } else {
      groceries.push(inputItems.value);
      addItemsToDom(inputItems.value);
      addToLocalStorage("Grocery List", groceries);
      inputItems.value = "";
      showMessages(true, addItemsDisplayAction, "Grocery Added....👋🏻🤝🏻");
    }
  });
});

//Handling messages

function showMessages(flag, element, text) {
  if (flag == true) {
    // element.style.display = "block";
    element.textContent = text;
    element.classList.add("success");
  } else {
    // element.style.display = "block";
    element.textContent = text;
    element.classList.add("alert");
  }

  setTimeout(function () {
    element.classList.remove("alert");
    element.classList.remove("success");
  }, 2000);
}

// Add items to front end displaysection
function addItemsToDom(value) {
  //   groceryList.style.display = "block";
  let element = `<div class="grocery-item">
  <h4 class="grocery-item__title">${value}</h4>
  <a href="#" class="grocery-item__link">
      <i class="far fa-trash-alt"></i>
      </a>`;
  groceryList.insertAdjacentHTML("beforeend", element);
}

//Creating localStorage fully
const addToLocalStorage = function (key, value) {
  localStorage.setItem(key, JSON.stringify(value));
};

//on page load render the localstorage items into frontend
const loadLocalStorageToDom = function () {
  if (localStorage.getItem("Grocery List")) {
    const items = JSON.parse(localStorage.getItem("Grocery List"));
    items.forEach(function (item) {
      addItemsToDom(item);
    });
  }
};
//page load event
document.addEventListener("DOMContentLoaded", function () {
  loadLocalStorageToDom();
});

//delete all elements from localstorage and front end
displaySubmitButton.addEventListener("click", function (e) {
  e.preventDefault();
  let child = e.target.previousElementSibling;
  groceryList.parentElement.removeChild(child);
  clearLocalStorage("Grocery List");
  //   groceryList.innerHTML = "";
});

//deleting the localstorage fully
const clearLocalStorage = function (key) {
  localStorage.removeItem(key);
};

// delete single element from front end
groceryList.addEventListener("click", function (e) {
  e.preventDefault();
  if (e.target.parentElement.classList.contains("grocery-item__link")) {
    let child = e.target.parentElement.parentElement;
    let value = e.target.parentElement.previousElementSibling.textContent;
    // console.log(value);
    clearSingleStorageElement(value);
    groceryList.removeChild(child);
  }
});

//delete single elements from localstorage and setting new storage with new filtered array
function clearSingleStorageElement(value) {
  const tempItems = JSON.parse(localStorage.getItem("Grocery List"));
  const items = tempItems.filter(function (item) {
    if (item !== value) {
      //   console.log(item);
      return item; //returns new filtered out array without passed value
    }
  });
  localStorage.removeItem("Grocery List");
  localStorage.setItem("Grocery List", JSON.stringify(items));
}
