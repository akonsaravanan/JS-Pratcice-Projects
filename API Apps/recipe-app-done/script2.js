const searchField = document.querySelector("#search-term");
const searchButton = document.querySelector("#search");
const favMealsContainer = document.querySelector(".fav-container");
const favMeals = document.querySelector(".fav-meals");
const mealContainer = document.querySelector("#meals");
const mealPopup = document.querySelector("#meal-popup");
const mealclosePopup = document.querySelector("#close-popup");
const mealInfoEl = document.getElementById("meal-info");

let storageMealIdArray = localStorage.getItem("mealIds")
  ? JSON.parse(localStorage.getItem("mealIds"))
  : [];
mealContainer;
let resultMeals;
const randomSingleMealApi =
  "https://www.themealdb.com/api/json/v1/1/random.php";
const idMealApi = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=`;
const searchByName = `https://www.themealdb.com/api/json/v1/1/search.php?s=
`;

getRandomMeal();
document.addEventListener("DOMContentLoaded", function () {
  generateFavoriteMeals();
});

async function getRandomMeal() {
  const data = await fetch(randomSingleMealApi);
  const result = await data.json();
  const resultMeal = result.meals[0];
  console.log(resultMeal);
  addMeal(resultMeal);
  return (resultMeals = result);
}

async function getMealBySearchValue(term) {
  const data = await fetch(searchByName + term);
  const result = await data.json();
  return (resultMeals = result);
}

async function getMealByID(id) {
  const data = await fetch(idMealApi + id);
  const result = await data.json();
  return (resultMeals = result);
}

function addMeal(data) {
  // console.log(data);
  // mealContainer.innerHTML = "";
  let newMeal = `<div class="meal">
    <div class="meal-header">
        
        <img src="${data.strMealThumb}" alt="${data.strMeal}" data-id="${data.idMeal}">
    </div>
    <div class="meal-body">
        <h4>${data.strMeal}</h4>
        <button class="fav-btn">
            <i class="fas fa-heart"></i>
        </button>
    </div>`;
  mealContainer.insertAdjacentHTML("afterbegin", newMeal);

  const mealFavbtn = document.querySelector(".fav-btn");

  mealFavbtn.addEventListener("click", (e) => {
    let favId = +mealFavbtn.parentElement.parentElement
      .querySelector("img")
      .getAttribute("data-id");
    // resultMeals.forEach((result) => {
    if (mealFavbtn.classList.contains("active")) {
      mealFavbtn.classList.remove("active");
      RemoveFavMealsFromLocalStorage(favId);
    } else {
      mealFavbtn.classList.add("active");
      addFavMealsToLocalStorage(favId);
    }
    // });
    generateFavoriteMeals();
  });
}

function addMealsFavorite(data) {
  const ele = `<li>
  <img src="${data["meals"][0].strMealThumb}" alt="${data["meals"][0].strMeal}" data-id="${data["meals"][0].idMeal}"/>
  <span>${data["meals"][0].strMeal}</span>
  <button class="clear"><i class="fas fa-window-close"></i></button>
    </li>`;
  favMeals.insertAdjacentHTML("beforeend", ele);
}

searchButton.addEventListener("click", async function (e) {
  e.preventDefault();

  const term = searchField.value;
  mealContainer.innerHTML = "";
  const meals = await getMealBySearchValue(term);
  // console.log(meals);
  if (meals) {
    meals.forEach((meal) => {
      addMeal(meal);
    });
  }
});

function RemoveFavMealsFromLocalStorage(id) {
  const temp = storageMealIdArray.filter((mealId) => {
    if (mealId !== id) {
      return id;
    }
  });
  storageMealIdArray = temp;
  localStorage.removeItem("mealIds");
  localStorage.setItem("mealIds", JSON.stringify(storageMealIdArray));
}
function addFavMealsToLocalStorage(id) {
  storageMealIdArray.push(id);
  localStorage.setItem("mealIds", JSON.stringify(storageMealIdArray));
}

async function generateFavoriteMeals() {
  favMeals.innerHTML = "";
  if (storageMealIdArray.length > 0) {
    for (let i = 0; i < storageMealIdArray.length; i++) {
      const data = await getMealByID(storageMealIdArray[i]);
      addMealsFavorite(data);
    }
  }
}

favMeals.addEventListener("click", async (e) => {
  const mealFavbtn = document.querySelector(".fav-btn");

  if (e.target.parentElement.classList.contains("clear")) {
    let favele = e.target.parentElement.parentElement;
    let favId = +e.target.parentElement.parentElement
      .querySelector("img")
      .getAttribute("data-id");
    let favicon = +mealFavbtn.parentElement.parentElement
      .querySelector("img")
      .getAttribute("data-id");
    favMeals.removeChild(favele);
    if (favId == favicon) {
      mealFavbtn.classList.remove("active");
    }
    RemoveFavMealsFromLocalStorage(favId);
    generateFavoriteMeals();
  } else if (e.target.parentElement.parentElement.querySelector("img")) {
    mealPopup.classList.remove("hidden");
    let dataid = +e.target.parentElement.parentElement
      .querySelector("img")
      .getAttribute("data-id");
    // console.log(dataid);
    const data = await getMealByID(dataid);
    const ingredients = [];

    for (let i = 1; i <= 20; i++) {
      if (data["meals"][0]["strIngredient" + i]) {
        ingredients.push(
          `${data["meals"][0]["strIngredient" + i]} - ${
            data["meals"][0]["strMeasure" + i]
          }`
        );
      } else {
        break;
      }
    }

    mealInfoEl.innerHTML = "";
    let ele = `<div> <h1>${data["meals"][0].strMeal}</h1>
    <img
        src="${data["meals"][0].strMealThumb}"
        alt="${data["meals"][0].strMeal}"
    />
    <p>
    ${data["meals"][0].strInstructions}
    </p>
    <h3>Ingredients:</h3>
    <ul>
        ${ingredients
          .map(
            (ing) => `
        <li>${ing}</li>
        `
          )
          .join("")} 
    </ul>
    </div>`;
    mealInfoEl.insertAdjacentHTML("afterbegin", ele);
  }
  mealclosePopup.addEventListener("click", function () {
    mealPopup.classList.add("hidden");
  });
});
const mealHeader = document.querySelector(".meal-header");

mealContainer.addEventListener("click", async function (e) {
  // console.log(e.target.querySelector("img"));
  if (
    e.target.closest("div").classList.contains("meal-header")
    // e.target.closest("div").classList.contains("meal-body")
  ) {
    mealPopup.classList.remove("hidden");
    let dataid = +e.target.parentElement.parentElement
      .querySelector("img")
      .getAttribute("data-id");
    // console.log(dataid);
    const data = await getMealByID(dataid);
    // console.log(data);
    const ingredients = [];

    for (let i = 1; i <= 20; i++) {
      if (data["meals"][0]["strIngredient" + i]) {
        ingredients.push(
          `${data["meals"][0]["strIngredient" + i]} - ${
            data["meals"][0]["strMeasure" + i]
          }`
        );
      } else {
        break;
      }
    }

    mealInfoEl.innerHTML = "";
    let ele = `<div> <h1>${data["meals"][0].strMeal}</h1>
    <img
        src="${data["meals"][0].strMealThumb}"
        alt="${data["meals"][0].strMeal}"
    />
    <p>
    ${data["meals"][0].strInstructions}
    </p>
    <h3>Ingredients:</h3>
    <ul>
        ${ingredients
          .map(
            (ing) => `
        <li>${ing}</li>
        `
          )
          .join("")} 
    </ul>
    </div>`;
    mealInfoEl.insertAdjacentHTML("afterbegin", ele);
  }
  mealclosePopup.addEventListener("click", function () {
    mealPopup.classList.add("hidden");
  });
});

/* */
