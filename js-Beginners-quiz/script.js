const quizContainer = document.querySelector(".quizContainer");
const questionName = document.querySelector(".question");
const choiceList = document.querySelector(".choiceList");
const quizMessage = document.querySelector(".quizMessage");
const quizResult = document.querySelector(".result");
const nextButton = document.querySelector(".nextButton");

let quizOver = false;
let currentQuestions = 0;
let correctAnswers = 0;

const questionsSet = [
  {
    question: "What is the baby of a moth known as?",
    choices: ["baby", "infant", "kit", "larva"],
    correctAnswer: 3,
  },
  {
    question: "What is the adult of a kid called?",
    choices: ["calf", "doe", "goat", "chick"],
    correctAnswer: 2,
  },
  {
    question: "What is the young of buffalo called?",
    choices: ["calf", "baby", "pup", "cow"],
    correctAnswer: 0,
  },
  {
    question: "What is a baby alligator called?",
    choices: ["baby", "gator", "hatchling", "calf"],
    correctAnswer: 1,
  },
  {
    question: "What is a baby goose called?",
    choices: ["gooser", "gosling", "gup", "pup"],
    correctAnswer: 1,
  },
];

//Display the quiz questions to start the game

document.addEventListener("DOMContentLoaded", function () {
  displayQuestions();
  quizMessage.style.display = "none";
  quizMessage.innerHTML = "";
  if (!quizOver) {
    nextButton.addEventListener("click", function () {
      const selectedAnswer = document.querySelector(
        "input[name=choices]:checked"
      );
      if (selectedAnswer === null) {
        quizMessage.innerText = "Please select an answer";
        quizMessage.style.display = "block";
      } else {
        quizMessage.style.display = "none";
        if (
          parseInt(selectedAnswer.value) ===
          questionsSet[currentQuestions].correctAnswer
        ) {
          correctAnswers++;
        }

        currentQuestions++;
        if (currentQuestions < questionsSet.length) {
          displayQuestions();
        } else {
          quizOver = true;
          displayScore();
          nextButton.textContent = "PlayAgain";
        }
      }
    });
  } else {
    quizOver = false;
    nextButton.textContent = "Next Question";
    resetQuiz();
    hideScore();
    displayQuestions();
  }
});
const displayQuestions = function () {
  questionName.innerHTML = "";
  questionName.innerHTML = questionsSet[currentQuestions].question;
  choiceList.innerHTML = "";
  for (let i = 0; i < questionsSet[currentQuestions].choices.length; i++) {
    let choice = `<li><input type="radio" name="choices" value="${i}">${questionsSet[currentQuestions].choices[i]}</li>`;
    choiceList.insertAdjacentHTML("beforeend", choice);
  }
};

const displayScore = function () {
  quizResult.innerText =
    "You scored: " + correctAnswers + " out of " + questionsSet.length;
  quizResult.style.display = "block";
};

const hideScore = function () {
  quizResult.style.display = "none";
};

const resetQuiz = function () {
  currentQuestions = 0;
  correctAnswers = 0;
  hideScore();
};
