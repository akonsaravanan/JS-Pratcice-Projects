//Page Elements
const form = document.querySelector("#input-form");
const formInput = document.querySelector("#input-value");
const clearItems = document.querySelector(".clearBtn");
const feedbackMessages = document.querySelector(".feedback");
const listItems = document.querySelector(".list-items");

//Variables
let groceriesList = [];

//Event submitting the form
form.addEventListener("submit", function (e) {
  e.preventDefault();

  if (formInput.value == "") {
    displayFeedbackMessage("Please enter a value", "alert-danger");
  } else {
    groceriesList.push(formInput.value);
    addToList(formInput.value);
    formInput.value = "";
    addToLocalStorage("Groceries List", groceriesList);
    displayFeedbackMessage("Grocery Added", "alert-success");
  }
});

//Creating localStorage fully
const addToLocalStorage = function (key, value) {
  localStorage.setItem(key, JSON.stringify(value));
};

//deleting the localstorage fully
const clearLocalStorage = function (key) {
  localStorage.removeItem(key);
};

//Rendering the added groceries into frontend
const addToList = function (value) {
  listItems.style.display = "block";
  let listElement = `<div class="item my-3 d-flex justify-content-between p-2">
  <h5 class="item-title text-capitalize">${value}</h5>
  <span class="remove-icon text-danger"><i class="fas fa-trash"></i></span>
 </div>`;
  listItems.insertAdjacentHTML("beforeend", listElement);
};
//page load event
document.addEventListener("DOMContentLoaded", function () {
  loadLocalStorageToDom();
});

//on page load render the localstorage items into frontend
const loadLocalStorageToDom = function () {
  if (localStorage.getItem("Groceries List")) {
    const items = JSON.parse(localStorage.getItem("Groceries List"));
    items.forEach(function (item) {
      addToList(item);
    });
  }
};

//clear all event delete both front end elements and localstorage items
clearItems.addEventListener("click", function () {
  while (listItems.firstChild) {
    listItems.removeChild(listItems.lastChild);
  }
  clearLocalStorage("Groceries List");
  //   listItems.innerHTML = ""; easy and alternative
});

//Delete icon event using event delegation function
listItems.addEventListener("click", function (e) {
  if (e.target.parentElement.classList.contains("remove-icon")) {
    let item = e.target.parentElement.parentElement;
    listItems.removeChild(item);
    let text = e.target.parentElement.previousElementSibling.textContent;
    clearSingleStorageElement(text); //passing value to remove from localstorage
  }
});

//delete single elements from localstorage and setting new storage with new filtered array
function clearSingleStorageElement(value) {
  const tempItems = JSON.parse(localStorage.getItem("Groceries List"));
  const items = tempItems.filter(function (item) {
    if (item !== value) {
      console.log(item);
      return item; //returns new filtered out array without passed value
    }
  });
  localStorage.removeItem("Groceries List");
  localStorage.setItem("Groceries List", JSON.stringify(items));
}

//displaying infos using feedback elements class properties
function displayFeedbackMessage(text, alert) {
  feedbackMessages.textContent = text;
  feedbackMessages.classList.add("showItem", alert);
  setTimeout(function () {
    feedbackMessages.classList.remove("showItem");
  }, 3000);
}
