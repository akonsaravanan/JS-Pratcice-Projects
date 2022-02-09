const inputName = document.querySelector("#name");
const inputCourse = document.querySelector("#course");
const inputAuthor = document.querySelector("#author");
const submitBtn = document.querySelector(".submitBtn");
const form = document.querySelector("#customer-form");
const customers = document.querySelector(".customer-list");
const feedback = document.querySelector(".feedback");
const loading = document.querySelector(".loading");

(function () {
  const display = new Customer(inputName, inputCourse, inputAuthor);

  document.addEventListener("DOMContentLoaded", function () {
    display.checkFields();
    display.hideSubmit();
  });

  function Customer(name, course, author) {
    this.name = name;
    this.course = course;
    this.author = author;
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    const customer = new Customer(
      inputName.value,
      inputCourse.value,
      inputAuthor.value
    );
    display.feedback(customer);
    display.clearFields();
  });

  Customer.prototype.checkFields = function () {
    this.name.addEventListener("blur", this.validateFields);
    this.course.addEventListener("blur", this.validateFields);
    this.author.addEventListener("blur", this.validateFields);
  };

  Customer.prototype.validateFields = function () {
    if (this.value === "") {
      this.classList.remove("complete");
      this.classList.add("fail");
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

  Customer.prototype.hideSubmit = function () {
    submitBtn.disabled = true;
  };

  //show loading and feedback
  Customer.prototype.feedback = function (customer) {
    const self = this;

    feedback.classList.add("showItem", "alert", "alert-success");
    loading.classList.add("showItem");

    this.hideSubmit();

    setTimeout(function () {
      feedback.classList.remove("showItem", "alert", "alert-success");
      loading.classList.remove("showItem");
      self.addCustomer(customer);
    }, 3000);
  };

  Customer.prototype.addCustomer = function (customer) {
    const random = this.getRandom();

    const div = document.createElement("div");
    div.classList.add("col-11", "mx-auto", "col-md-6", "my-3", "col-lg-4");
    div.innerHTML = `<div class="card text-left">
         <img src="./img/cust-${random}.jpg" class="card-img-top" alt="">
         <div class="card-body">
          <!-- customer name -->
          <h6 class="text-capitalize "><span class="badge badge-warning mr-2">name :</span><span id="customer-name">${customer.name}</span></h6>
          <!-- end of customer name -->
          <!-- customer name -->
          <h6 class="text-capitalize my-3"><span class="badge badge-success mr-2">course :</span><span id="customer-course">
            ${customer.course}
           </span></h6>
          <!-- end of customer name -->
          <!-- customer name -->
          <h6 class="text-capitalize"><span class="badge badge-danger mr-2">author :</span><span id="course-author">${customer.author}</span></h6>
          <!-- end of customer name -->
         </div>
        </div>`;
    customers.appendChild(div);
  };
  Customer.prototype.getRandom = function () {
    let random = Math.floor(Math.random() * 5 + 1);
    return random;
  };

  Customer.prototype.clearFields = function () {
    this.name.value = "";
    this.course.value = "";
    this.author.value = "";

    this.name.classList.remove("complete", "fail");
    this.course.classList.remove("complete", "fail");
    this.author.classList.remove("complete", "fail");
  };
})();
