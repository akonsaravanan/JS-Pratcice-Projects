const question = document.querySelector("#question");
const inputRadios = document.querySelectorAll(".answer");
const optionA = document.querySelector("#a_text");
const optionB = document.querySelector("#b_text");
const optionC = document.querySelector("#c_text");
const optionD = document.querySelector("#d_text");
const submitButton = document.querySelector("#submit");

let currentQuestion = 0;
let currentScore = 0;

const quizSet = [
  {
    question: "How old is Akil?",
    a: "10",
    b: "25",
    c: "30",
    d: "40",
    correct: "c",
  },
  {
    question: "What is the most used language in 2019?",
    a: "Java",
    b: "C",
    c: "Python",
    d: "Javascript",
    correct: "d",
  },
  {
    question: "Who is the president of US?",
    a: "Macron",
    b: "Trump",
    c: "Chirac",
    d: "Saldano",
    correct: "b",
  },
  {
    question: "What does HTML stand for?",
    a: "Hypertext Markup Language",
    b: "Cascading style Sheet",
    c: "Jason Object Notation",
    d: "Application Programming Language",
    correct: "a",
  },
  {
    question: "What year was JavaScript launched?",
    a: "1996",
    b: "1995",
    c: "1994",
    d: "none of the above",
    correct: "b",
  },
  a,
];

const loadQuiz = () => {
  checkedFalse();
  question.innerHTML = quizSet[currentQuestion].question;
  optionA.innerHTML = quizSet[currentQuestion].a;
  optionB.innerHTML = quizSet[currentQuestion].b;
  optionC.innerHTML = quizSet[currentQuestion].c;
  optionD.innerHTML = quizSet[currentQuestion].d;
};

const checkedFalse = () => {
  inputRadios.forEach((input) => {
    input.checked = false;
  });
};

const validateInput = () => {
  let answer = "";
  inputRadios.forEach((input) => {
    if (input.checked) {
      answer = input.id;
    }
  });

  return answer;
};

const validateQuiz = (e) => {
  e.preventDefault();
  const answer = validateInput();
  if (answer == "" || answer == "undefined") {
    document
      .querySelector("#quiz")
      .insertAdjacentHTML(
        "afterbegin",
        `<p><strong>You have to select one answer to continue.</strong></p>`
      );
    setTimeout(function () {
      document.querySelector("p").textContent = "";
    }, 1500);
  } else if (answer == quizSet[currentQuestion].correct) {
    currentScore++;
    currentQuestion++;
  } else if (answer !== quizSet[currentQuestion].correct) {
    currentQuestion++;
  }
  console.log(currentQuestion);
  if (currentQuestion < quizSet.length - 1) {
    loadQuiz();
  } else {
    document.querySelector(
      "#quiz"
    ).innerHTML = `<h2>You answered correctly at ${currentScore}/${quizSet.length} questions.</h2> 
            
    <button onclick="location.reload()">Reload</button>`;
  }
};

loadQuiz();
submitButton.addEventListener("click", validateQuiz);
