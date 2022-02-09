const addQuestion = document.querySelector("#show-btn");
const closeQuestion = document.querySelector(".close-btn");
const feedback = document.querySelector(".feedback");
const questionCard = document.querySelector(".question-card");
const form = document.querySelector("#question-form");
const questionInput = document.querySelector("#question-input");
const answerInput = document.querySelector("#answer-input");
const formSubmitbutton = document.querySelector(".submitBtn");
const questionList = document.querySelector("#questions-list");
const editQuestion = document.querySelector("#edit-flashcard");
const deleteQuestion = document.querySelector("#delete-flashcard");

let data, id, showDisplay, currentQuestion;

document.addEventListener("DOMContentLoaded", function () {
  showDisplay = new Display();
  data = showDisplay.getLocalStorage()
    ? showDisplay.getLocalStorage()
    : (data = []);
  id = data.length > 0 ? data[data.length - 1].id + 1 : 1;
  data.forEach(function (data) {
    showDisplay.renderQA(data);
  });
});

//Event to open question form
addQuestion.addEventListener("click", function (e) {
  e.preventDefault();
  feedback.innerHTML = "";
  feedback.classList.remove("showItem", "alert-success", "alert-danger");
  showDisplay.showQuestionForm(questionCard);
});

//Event to close question form

closeQuestion.addEventListener("click", function (e) {
  e.preventDefault();
  showDisplay.closeQuestionForm(questionCard);
});

//Event to submit question form

form.addEventListener("submit", function (e) {
  e.preventDefault();
  const questionData = questionInput.value;
  const answerData = answerInput.value;
  if (questionData && answerData !== " ") {
    feedback.classList.add("showItem", "alert-success");
    feedback.textContent = "Question and Answer Added Successfully";
    setTimeout(function () {
      feedback.classList.remove("showItem", "alert-success");
    }, 2000);

    let createQAS;
    if (currentQuestion) {
      createQAS = new QASet(
        currentQuestion[0].id,
        (currentQuestion[0].question = questionData),
        (currentQuestion[0].answer = answerData)
      );
      data;
      currentQuestion = "";
    } else {
      createQAS = new QASet(id, questionData, answerData);
    }
    data.push(createQAS);
    showDisplay.addToLocalStorage(data);
    id++;
    showDisplay.clearFields(questionInput, answerInput);
    showDisplay.renderQA(createQAS);
  } else {
    feedback.textContent = "Please enter all fields";
    feedback.classList.add("showItem", "alert-danger");
    setTimeout(function () {
      feedback.classList.remove("showItem", "alert-danger");
    }, 2000);
    showDisplay.clearFields(questionInput, answerInput);
  }
});

//Events to edit/delete questions
questionList.addEventListener("click", function (e) {
  e.preventDefault();
  if (e.target.classList.contains("show-answer")) {
    e.target.nextElementSibling.classList.toggle("showItem");
  } else if (e.target.classList.contains("delete-flashcard")) {
    const questionId = e.target.dataset.id;
    const questioncontent = e.target.parentElement.parentElement.parentElement;

    questionList.removeChild(questioncontent);
    showDisplay.clearStorageValue(questionId);
  } else if (e.target.classList.contains("edit-flashcard")) {
    const questionId = +e.target.dataset.id;
    const questioncontent = e.target.parentElement.parentElement.parentElement;
    questionList.removeChild(questioncontent);
    showDisplay.showQuestionForm(questionCard);

    currentQuestion = data.filter(function (question) {
      if (question.id === questionId) {
        return question;
      }
    });

    let tempData = data.filter(function (question) {
      if (question.id !== questionId) {
        return question;
      }
    });

    questionInput.value = currentQuestion[0].question;
    answerInput.value = currentQuestion[0].answer;
    data = tempData;
  }
});

//Question /Answer function constructor or class which returns object
function QASet(id, question, answer) {
  this.id = id;
  this.question = question;
  this.answer = answer;
}

//Display function constructor or class which returns object
function Display() {
  Display.prototype.showQuestionForm = function (element) {
    element.classList.add("showItem");
  };

  Display.prototype.closeQuestionForm = function (element) {
    element.classList.remove("showItem");
  };

  Display.prototype.clearFields = function (Q_element, A_element) {
    Q_element.value = "";
    A_element.value = "";
  };

  Display.prototype.addToLocalStorage = function (arrayOfQAs) {
    localStorage.clear();
    localStorage.setItem("QA_info", JSON.stringify(arrayOfQAs));
  };
  Display.prototype.getLocalStorage = function () {
    const retrievedStorage = localStorage.getItem("QA_info");
    if (retrievedStorage) {
      retrievedStorageData = JSON.parse(retrievedStorage);
      return retrievedStorageData;
    }
  };
  Display.prototype.renderQA = function (data) {
    let renderHtml = `
    <div class="col-md-4">
    <div class="card card-body flashcard my-3">
     <h4 class="text-capitalize">${data.question}</h4>
     <a href="#" class="text-capitalize my-3 show-answer">show/hide answer</a>
     <h5 class="answer mb-3">${data.answer}</h5>
     <div class="flashcard-btn d-flex justify-content-between">
      <a href="#" id="edit-flashcard" class=" btn my-1 edit-flashcard text-uppercase" data-id="${data.id}">edit</a>
      <a href="#" id="delete-flashcard" class=" btn my-1 delete-flashcard text-uppercase" data-id="${data.id}">delete</a>
     </div>`;
    questionList.insertAdjacentHTML("beforeend", renderHtml);
  };

  //delete single elements from localstorage and setting new storage with new filtered array
  Display.prototype.clearStorageValue = function (questionId) {
    const tempItems = JSON.parse(localStorage.getItem("QA_info"));
    const items = tempItems.filter(function (item) {
      if (item.id !== +questionId) {
        return item; //returns new filtered out array without passed value
      }
    });
    localStorage.removeItem("QA_info");
    localStorage.setItem("QA_info", JSON.stringify(items));
    data = items;
  };
}
