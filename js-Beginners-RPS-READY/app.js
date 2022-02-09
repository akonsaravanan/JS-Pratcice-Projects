let userScore = 0;
let computerScore = 0;
const userScore_span = document.getElementById("user-score");
const computerScore_span = document.getElementById("computer-score");
const scoreBoard_div = document.querySelector(".score-board");
const result_p = document.querySelector(".result p")
const rock_div = document.getElementById("r")
const paper_div = document.getElementById("p")
const scissor_div = document.getElementById("s")

function getComputerchoice() {
    const choices = ['r','p','s'];
    const randomNumber = Math.floor(Math.random() * 3);
    return choices[randomNumber];
}
function convertToWord(letter) {
    if (letter==="r") return "Rock";
    if (letter==="p") return "Paper";
    return "Scissor";
    
}
function win(userChoice, computerChoice) {
    userScore++;
    userScore_span.innerHTML = userScore;
    computerScore_span.innerHTML = computerScore;
    const smalluserword = "user".fontsize(4).sub();
    const smallcompword = "comp".fontsize(4).sub();
    result_p.innerHTML = `${convertToWord(userChoice)}${smalluserword} beats ${convertToWord(computerChoice)}${smallcompword}. YOU WIN!`;
}

function lose(userChoice, computerChoice) {
    computerScore++;
    userScore_span.innerHTML = userScore;
    computerScore_span.innerHTML = computerScore;
    const smalluserword = "user".fontsize(4).sub();
    const smallcompword = "comp".fontsize(4).sub();
    result_p.innerHTML = `${convertToWord(userChoice)}${smalluserword} loses ${convertToWord(computerChoice)}${smallcompword}. YOU LOST!`;

}

function draw(userChoice, computerChoice) {
    const smalluserword = "user".fontsize(4).sub();
    const smallcompword = "comp".fontsize(4).sub();
    result_p.innerHTML = `${convertToWord(userChoice)}${smalluserword} equals ${convertToWord(computerChoice)}${smallcompword}. It's a Draw.`;
}

function game(userChoice) {
    const computerChoice = getComputerchoice();
    switch(userChoice + computerChoice) {
        case "rs":
        case "pr":
        case "sp":
            win(userChoice,computerChoice);
            break;
        case "rp":
        case "ps":
        case "sr":
            lose(userChoice, computerChoice);
            break;
        case "rr":
        case "pp":
        case "ss":
            draw(userChoice, computerChoice);
            break;                    
    }
}


function main() {
    rock_div.addEventListener("click",function() {
        game("r");
    })
    
    paper_div.addEventListener("click",function() {
        game("p");
    })
    
    scissor_div.addEventListener("click",function() {
        game("s");
    })
    
}

main();
