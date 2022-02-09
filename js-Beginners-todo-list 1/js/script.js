const toDoForm = document.querySelector("#itemForm");
const formInput = document.querySelector("#itemInput");
const item = document.querySelector(".item-list");
const clearAll = document.querySelector("#clear-list");
const feedBackMessage = document.querySelector(".feedback");

let toDoList, index;

//Events form submit

toDoForm.addEventListener("submit", function (e) {
  e.preventDefault();
  if (formInput.value == "") {
    showMessages(false, feedBackMessage, "Please Enter a value 🛑");
  } else {
    addItemsToDom(formInput.value);
    addToLocalStorage(formInput.value);
    showMessages(true, feedBackMessage, "To do List Added....👋🏻🤝🏻");
    formInput.value = "";
  }
});

//Handling messages

function showMessages(flag, element, text) {
  if (flag == true) {
    // element.style.display = "block";
    // element.textContent = text;
    // element.classList.add("showItem", "alert-success");
  } else {
    // element.style.display = "block";
    element.textContent = text;
    element.classList.add("showItem", "alert-danger");
  }

  setTimeout(function () {
    element.classList.remove("showItem");
  }, 2000);
}

// Add items to front end displaysection
const addItemsToDom = function (value) {
  //   item.innerHTML = "";
  let element = `<div class="item my-3">
  <h5 class="item-name text-capitalize">${value}</h5>
  <div class="item-icons">
   <a href="#" class="complete-item mx-2 item-icon"><i class="far fa-check-circle"></i></a>
   <a href="#" class="edit-item mx-2 item-icon"><i class="far fa-edit"></i></a>
   <a href="#" class="delete-item item-icon"><i class="far fa-times-circle"></i></a>
  </div>
 </div>`;
  item.insertAdjacentHTML("beforeend", element);
};

//Creating localStorage fully
const addToLocalStorage = function (value) {
  let items;
  if (localStorage.getItem("ToDo-List")) {
    items = JSON.parse(localStorage.getItem("ToDo-List"));
  } else {
    items = [];
  }
  if (index === undefined && items.indexOf(value) == -1) {
    items.push(value);
  } else if (index >= 0) {
    items[index] = value;
  }
  location.reload();
  localStorage.setItem("ToDo-List", JSON.stringify(items));
  return (toDoList = items);
};

//on page load render the localstorage items into frontend
const loadLocalStorageToDom = function () {
  if (localStorage.getItem("ToDo-List")) {
    toDoList = JSON.parse(localStorage.getItem("ToDo-List"));
    toDoList.forEach(function (item) {
      addItemsToDom(item);
    });
  }
};

//page load event
document.addEventListener("DOMContentLoaded", function () {
  loadLocalStorageToDom();
});

// actions / events for each to do list

item.addEventListener("click", function (e) {
  e.preventDefault();
  let Row = e.target.parentElement.parentElement.closest("div").parentElement;
  if (e.target.parentElement.classList.contains("delete-item")) {
    let deleteRowValue =
      e.target.parentElement.parentElement.closest("div").previousElementSibling
        .textContent;
    item.removeChild(Row);
    console.log(deleteRowValue);
    clearSingleStorageElement(deleteRowValue);
  } else if (e.target.parentElement.classList.contains("edit-item")) {
    item.removeChild(Row);
    let text =
      e.target.parentElement.closest("div").previousElementSibling.textContent;
    formInput.value = text;
    index = toDoList.indexOf(text);
  } else if (e.target.parentElement.classList.contains("complete-item")) {
    e.target.parentElement
      .closest("div")
      .previousElementSibling.classList.toggle("completed");
  } else {
  }
});

//delete single elements from localstorage and setting new storage with new filtered array
function clearSingleStorageElement(value) {
  const tempItems = JSON.parse(localStorage.getItem("ToDo-List"));
  const items = tempItems.filter(function (item) {
    if (item !== value) {
      //   console.log(item);
      return item; //returns new filtered out array without passed value
    }
  });
  // console.log(items);
  localStorage.removeItem("ToDo-List");
  localStorage.setItem("ToDo-List", JSON.stringify(items));
  const removeIndex = toDoList.indexOf(value);
  // console.log(removeIndex);
  toDoList.splice(removeIndex, 1);
}

//delete all elements from localstorage and front end
clearAll.addEventListener("click", function (e) {
  e.preventDefault();
  let child = e.target.previousElementSibling;
  item.parentElement.removeChild(child);
  clearLocalStorage("ToDo-List");
  location.reload();

  //   groceryList.innerHTML = "";
});

//deleting the localstorage fully
const clearLocalStorage = function (key) {
  localStorage.removeItem(key);
};
