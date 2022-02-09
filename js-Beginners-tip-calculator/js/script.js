/* 
1. Need to define tips feedback
2. Generate tips feedback on frontend
3. entering all the inputs
4. while submitting need validation for inputs with feedbacks
5. calculate tips
6. show results below
*/

//Elements
const inputBill = document.querySelector("#input-bill");
const inputUsers = document.querySelector("#input-users");
const inputService = document.querySelector("#input-service");
const inputForm = document.querySelector("#tip-form");
const feedbackSection = document.querySelector(".feedback");
const loaderGif = document.querySelector(".loader");
const resultsSection = document.querySelector(".results");
const tipAmount = document.querySelector("#tip-amount");
const totalAmount = document.querySelector("#total-amount");
const personAmount = document.querySelector("#person-amount");

//variables
let isFeedback = false;
let tipPercent, tipAmountvalue, totalAmountvalue, perHeadAmountvalue;
let services = [
  {
    value: 1,
    title: "Great - 20%",
  },
  {
    value: 2,
    title: "Good - 10%",
  },
  {
    value: 3,
    title: "Bad - 5%",
  },
];

//Load services into DOM
const init = function () {
  services.forEach(function (service) {
    const option = document.createElement("option");
    option.textContent = service.title;
    option.value = service.value;
    inputService.appendChild(option);
  });
};

//Getting user bill information , validate with feedback and generate results in DOM
const getUserInputs = function (e) {
  e.preventDefault();
  let Bill = +inputBill.value;
  let Users = +inputUsers.value;
  let Service = +inputService.value;
  isFeedback = feedbackValidation(Bill, Users, Service);
  console.log(isFeedback);
  if (!isFeedback) {
    if (Service == 1) tipPercent = 0.2;
    else if (Service == 2) tipPercent = 0.1;
    else if (Service == 3) tipPercent = 0.02;
    tipAmountvalue = Bill * tipPercent;
    totalAmountvalue = tipAmountvalue + Bill;
    perHeadAmountvalue = totalAmountvalue / Users;
    loaderGif.classList.toggle("showItem");
    /* after two seconds callback function which is 
    inside setTimeout will start to execute */
    setTimeout(function () {
      loaderGif.classList.toggle("showItem");
      tipAmount.innerHTML = `${tipAmountvalue.toFixed(2)}`;
      totalAmount.innerHTML = `${totalAmountvalue.toFixed(2)}`;
      personAmount.innerHTML = `${perHeadAmountvalue.toFixed(2)}`;
      resultsSection.classList.toggle("showItem");
    }, 2000);
    setTimeout(function () {
      inputBill.value = "";
      inputUsers.value = "";
      inputService.value = 0;
      resultsSection.classList.toggle("showItem");
    }, 10000);
  }
};

//Validating inputs & returning alert feedbacks
const feedbackValidation = function (Bill, Users, Service) {
  feedbackSection.innerHTML = "";
  if (Bill == "" || Bill <= 0) {
    feedbackSection.classList.add("showItem", "alert-danger");
    feedbackSection.innerHTML += `<p>Bill amount cannot be blank</p>`;
    isFeedback = true;
  }

  if (Users <= 0) {
    feedbackSection.classList.add("showItem", "alert-danger");
    feedbackSection.innerHTML += `<p>Number of users must be greater than zero</p>`;
    isFeedback = true;
  }

  if (Service === 0) {
    feedbackSection.classList.add("showItem", "alert-danger");
    feedbackSection.innerHTML += `<p>You must select a Service</p>`;
    isFeedback = true;
  }
  return isFeedback;
};

init();

//Form Event
inputForm.addEventListener("submit", getUserInputs);
