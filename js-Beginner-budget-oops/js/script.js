class BudgetExpenseApp {
  constructor() {
    //Budget form
    this.budgetForm = document.querySelector("#budget-form");
    this.budgetFormInput = document.querySelector("#budget-input");
    this.budgetFormSubmit = document.querySelector("#budget-submit");
    //Calculation Panel
    this.budgetAmount = document.querySelector("#budget-amount");
    this.expenseAmount = document.querySelector("#expense-amount");
    this.balanceAmount = document.querySelector("#balance-amount");
    this.balance = document.querySelector("#balance");

    //Expense form
    this.expenseForm = document.querySelector("#expense-form");
    this.expenseFormInput = document.querySelector("#expense-input");
    this.expenseFormAmount = document.querySelector("#amount-input");
    this.expenseFormSubmit = document.querySelector("#expense-submit");
    //feedback elements
    this.budgetFormFeedback = document.querySelector(".budget-feedback");
    this.expenseFormFeedback = document.querySelector(".expense-feedback");
    //Transaction lists
    this.expenseList = document.querySelector("#expense-list");

    this.expensesList = [];
    this.expenseID = 0;
  }

  //Budget form submit validation function
  submitBudgetForm() {
    const value = this.budgetFormInput.value;
    const self = this;
    if (value == "" || value < 0) {
      this.budgetFormFeedback.textContent = "Should not be empty or Zero";
      this.budgetFormFeedback.classList.add("showItem", "alert-danger");
      setTimeout(function () {
        self.budgetFormFeedback.classList.remove("showItem", "alert-danger");
        self.budgetFormFeedback.textContent = "";
      }, 1500);
    } else {
      this.budgetAmount.textContent = value;
      this.budgetFormFeedback.classList.remove("showItem", "alert-danger");
      this.budgetFormFeedback.textContent = "Budget Added successfully";
      this.budgetFormFeedback.classList.add("showItem", "alert-success");
      setTimeout(function () {
        self.budgetFormFeedback.classList.remove("showItem", "alert-success");
        self.budgetFormFeedback.textContent = "";
      }, 1500);
    }
    this.budgetFormInput.value = "";
    this.showBalance();
  }

  showBalance() {
    const totalExpenses = this.totalExpenses();
    const totalAvailableBalance =
      parseInt(this.budgetAmount.textContent) - parseInt(totalExpenses);
    this.balanceAmount.textContent = totalAvailableBalance;
    if (totalAvailableBalance > 0) {
      this.balance.classList.add("showGreen");
      this.balance.classList.remove("showRed", "showBlack");
    } else if (totalAvailableBalance < 0) {
      this.balance.classList.remove("showGreen", "showBlack");
      this.balance.classList.add("showRed");
    } else if (totalAvailableBalance == 0) {
      this.balance.classList.remove("showRed", "showGreen");
      this.balance.classList.add("showBlack");
    }
  }

  totalExpenses() {
    let total = 0;
    if (this.expensesList.length > 0) {
      total = this.expensesList.reduce(function (acc, expense) {
        acc += +expense.amount;
        return acc;
      }, 0);
    }
    this.expenseAmount.textContent = parseInt(total);
    return parseInt(total);
  }

  submitExpenseForm() {
    const self = this;
    const expenseDetailValue = this.expenseFormInput.value;
    const expenseAmountValue = this.expenseFormAmount.value;
    if (
      expenseDetailValue == "" ||
      expenseAmountValue == "" ||
      expenseAmountValue < 0
    ) {
      this.expenseFormFeedback.textContent = "Should not be empty or Zero";
      this.expenseFormFeedback.classList.add("showItem", "alert-danger");
      setTimeout(function () {
        self.expenseFormFeedback.classList.remove("showItem", "alert-danger");
        self.expenseFormFeedback.textContent = "";
      }, 1500);
    } else {
      self.expenseFormFeedback.classList.remove("showItem", "alert-danger");
      this.expenseFormFeedback.classList.add("showItem", "alert-success");
      this.expenseFormFeedback.textContent = "Expense Added successfully";
      this.expenseAmount.textContent = parseInt(expenseAmountValue);
      setTimeout(function () {
        self.expenseFormFeedback.classList.remove("showItem", "alert-success");
        self.expenseFormFeedback.textContent = "";
      }, 1500);
    }
    this.expenseFormInput.value = "";
    this.expenseFormAmount.value = "";
    let expenseObject = {
      id: this.expenseID,
      title: expenseDetailValue,
      amount: expenseAmountValue,
    };
    this.expenseID++;
    this.expensesList.push(expenseObject);
    this.addExpense(expenseObject);
    this.showBalance();
  }

  addExpense(expenseObject) {
    const expenseData = `<div class="expense">
      <div class="expense-item d-flex justify-content-between align-items-baseline">

       <h6 class="expense-title mb-0 text-uppercase list-item">${expenseObject.title}</h6>
       <h5 class="expense-amount mb-0 list-item">${expenseObject.amount}</h5>

       <div class="expense-icons list-item">

        <a href="#" class="edit-icon mx-2" data-id="${expenseObject.id}">
         <i class="fas fa-edit"></i>
        </a>
        <a href="#" class="delete-icon" data-id="${expenseObject.id}">
         <i class="fas fa-trash"></i>
        </a>
       </div>
      </div>

     </div>`;
    this.expenseList.insertAdjacentHTML("beforeend", expenseData);
  }
  editExpense(element) {
    const id = parseInt(element.dataset.id);
    const parent = element.parentElement.parentElement.parentElement;
    this.expenseList.removeChild(parent);
    const currentEditExpense = this.expensesList.filter((expense) => {
      if (id == expense.id) return expense;
    });
    const currentRemainingExpense = this.expensesList.filter((expense) => {
      if (id !== expense.id) return expense;
    });

    this.expenseFormInput.value = currentEditExpense[0].title;
    this.expenseFormAmount.value = currentRemainingExpense[0].amount;
    this.expensesList = currentRemainingExpense;
  }
  deleteExpense(element) {
    const id = +element.dataset.id;
    console.log(id);
    const parent = element.parentElement.parentElement.parentElement;
    this.expenseList.removeChild(parent);
    const filteredExpenses = this.expensesList.filter(function (expense) {
      if (id !== expense.id) {
        return expense;
      }
    });

    console.log(filteredExpenses);
    this.expensesList = filteredExpenses;
    this.showBalance();
    // return filteredExpenses;
  }
}

function eventsOfBudgetExpenseApp() {
  const app = new BudgetExpenseApp();
  //Submit Budget Form Event
  app.budgetForm.addEventListener("submit", function (e) {
    e.preventDefault();
    app.submitBudgetForm();
  });
  app.expenseForm.addEventListener("submit", function (e) {
    e.preventDefault();
    app.submitExpenseForm();
  });
  app.expenseList.addEventListener("click", function (e) {
    e.preventDefault();
    if (e.target.parentElement.classList.contains("delete-icon")) {
      app.deleteExpense(e.target.parentElement);
    } else if (e.target.parentElement.classList.contains("edit-icon")) {
      console.log(e.target.parentElement);
      app.editExpense(e.target.parentElement);
    }
  });
}

document.addEventListener("DOMContentLoaded", function () {
  eventsOfBudgetExpenseApp();
});
