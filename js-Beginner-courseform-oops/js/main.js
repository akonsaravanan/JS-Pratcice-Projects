const inputName = document.querySelector("#name");
const inputCourse = document.querySelector("#course");
const inputAuthor = document.querySelector("#author");
const submitBtn = document.querySelector(".submitBtn");
const form = document.querySelector("#customer-form");
const customers = document.querySelector(".customer-list");
const loading = document.querySelector(".loading");
const feedback = document.querySelector(".feedback");
let display;

const init = function () {
  display = new Customer(inputName, inputCourse, inputAuthor);
  display.checkfields();
  submitBtn.disabled = true;
};

form.addEventListener("submit", function (e) {
  e.preventDefault();
  const createCustomer = new Customer(
    inputName.value,
    inputCourse.value,
    inputAuthor.value
  );
  display.feedback();
  display.addNewCustomer(createCustomer);
  display.clearFields();
});

function Customer(name, course, author) {
  this.name = name;
  this.course = course;
  this.author = author;
}

Customer.prototype.checkfields = function () {
  this.name.addEventListener("blur", this.validateField);
  this.course.addEventListener("blur", this.validateField);
  this.author.addEventListener("blur", this.validateField);
};

Customer.prototype.validateField = function () {
  if (this.value === "") {
    this.classList.add("fail");
    this.classList.remove("complete");
  } else {
    this.classList.add("complete");
    this.classList.remove("fail");
  }

  const complete = document.querySelectorAll(".complete");
  if (complete.length === 3) {
    submitBtn.disabled = false;
  } else {
    submitBtn.disabled = true;
  }
};
Customer.prototype.feedback = function () {
  loading.classList.add("showItem");
  feedback.classList.add("showItem", "alert", "alert-success");
  submitBtn.disabled = true;
  setTimeout(function () {
    feedback.classList.remove("showItem", "alert", "alert-success");
    loading.classList.remove("showItem");
  }, 3000);
};
Customer.prototype.addNewCustomer = function (createCustomer) {
  let random = Math.trunc(Math.random() * 5 + 1);
  let customerinfo = `<div class="col-11 mx-auto col-md-6 col-lg-4 my-3">
  <div class="card text-left">
    <img src="./img/cust-${random}.jpg" class="card-img-top" alt="">
    <div class="card-body">
       <h6 class="text-capitalize">
        <span class="badge badge-warning mr-2">name :</span><span id="customer-name"> ${createCustomer.name}</span>
      </h6>
       <h6 class="text-capitalize my-3">
        <span class="badge badge-success mr-2">course :</span><span id="customer-course">${createCustomer.course}</span>
      </h6>
       <h6 class="text-capitalize">
        <span class="badge badge-danger mr-2">author :</span><span id="course-author">${createCustomer.author}</span>
      </h6>
     </div>
  </div>

 </div>`;
  customers.insertAdjacentHTML("beforeend", customerinfo);
};

Customer.prototype.clearFields = function () {
  this.name.value = "";
  this.course.value = "";
  this.author.value = "";
};

init();
