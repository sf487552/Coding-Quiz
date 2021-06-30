//VARIABLES
var quizBody = document.getElementById("quiz");
var resultsEl = document.getElementById("result");
var finalScoreEl = document.getElementById("finalScore");
var gameoverDiv = document.getElementById("gameover");
var questionsEl = document.getElementById("questions");
var quizTimer = document.getElementById("timer");
var startQuizButton = document.getElementById("startbtn");
var startQuizDiv = document.getElementById("startpage");
var highscoreContainer = document.getElementById("highscoreContainer");
var highscoreDiv = document.getElementById("high-scorePage");
var highscoreInputName = document.getElementById("initials");
var highscoreDisplayName = document.getElementById("highscore-initials");
var endGameBtns = document.getElementById("endGameBtns");
var submitScoreBtn = document.getElementById("submitScore");
var highscoreDisplayScore = document.getElementById("highscore-score");
var buttonA = document.getElementById("a");
var buttonB = document.getElementById("b");
var buttonC = document.getElementById("c");
var buttonD = document.getElementById("d");

// QUIZ QUESTIONS AND ANSWERS
var quizQuestions = [{
    question: "What is element that is used in HTML for JavaScript",
    choiceA: "index",
    choiceB: "stylesheet",
    choiceC: "javaScript",
    choiceD: "script",
    correctAnswer: "d"},
  {
    question: "What character should you end your statements in when using JavaScript?",
    choiceA: ";",
    choiceB: ":",
    choiceC: "]",
    choiceD: "}",
    correctAnswer: "a"},
  {
    question: "How do you enter comments on your JavaScript file?",
    choiceA: "://",
    choiceB: "\\:",
    choiceC: "//",
    choiceD: "!//",
    correctAnswer: "c"},
  {
    question: "_______ is a primititve data type in JavaScript that can have only 2 values, True or False.",
    choiceA: "Boolean",
    choiceB: "Caveman Data",
    choiceC: "",
    choiceD: "d",
    correctAnswer: "a"},
  {
    question: "In Javascript, _______ is a sequence of characters used to represent text.",
    choiceA: "Rope",
    choiceB: "String",
    choiceC: "Chain",
    choiceD: "Link",
    correctAnswer: "b"},
];


var finalQuestionIndex = quizQuestions.length;
var currentQuestionIndex = 0;
var timeLeft = 100;
var timerInterval;
var score = 0;
var correct;

//FUNCTION TO GO THROUGH SELECTON OF QUESTIONS
function generateQuizQuestion(){
    gameoverDiv.style.display = "none";
    if (currentQuestionIndex === finalQuestionIndex){
        return showScore();
    } 
    var currentQuestion = quizQuestions[currentQuestionIndex];
    questionsEl.innerHTML = "<p>" + currentQuestion.question + "</p>";
    buttonA.innerHTML = currentQuestion.choiceA;
    buttonB.innerHTML = currentQuestion.choiceB;
    buttonC.innerHTML = currentQuestion.choiceC;
    buttonD.innerHTML = currentQuestion.choiceD;
};

//FUNCTION TO START QUIZ, STARTS TIMER, HIDES START BUTTON, SHOWS QUESTION 1
function startQuiz(){
    gameoverDiv.style.display = "none";
    startQuizDiv.style.display = "none";
    generateQuizQuestion();

    //TIMER
    timerInterval = setInterval(function() {
        timeLeft--;
        quizTimer.textContent = "Time left: " + timeLeft;
    
        if(timeLeft === 0) {
          clearInterval(timerInterval);
          showScore();
        }
      }, 1000);
    quizBody.style.display = "block";
}

//START QUIZ
startQuizButton.addEventListener("click",startQuiz);

//CHECK ANSWER FUNCTION
function checkAnswer(answer){
    correct = quizQuestions[currentQuestionIndex].correctAnswer;

    if (answer === correct && currentQuestionIndex !== finalQuestionIndex){
        score++;
        alert("Correct");
        currentQuestionIndex++;
        generateQuizQuestion();
        
    }else if (answer !== correct && currentQuestionIndex !== finalQuestionIndex){
        alert("Incorrect")
        currentQuestionIndex++;
        generateQuizQuestion();
        
    }else{
        showScore();
    }
}

//ENDS SCREEN AND DISPLAYS SCORE AFTER COMPLETING THE QUIZ OR RUNNING OUT OF TIME
function showScore(){
    quizBody.style.display = "none"
    gameoverDiv.style.display = "flex";
    clearInterval(timerInterval);
    highscoreInputName.value = "";
    finalScoreEl.innerHTML = "You got " + score + " out of " + quizQuestions.length + " correct!";
}

//ONCE SUBMIT BUTTON IS CLICKED, SCORE IS SAVED AND ADDED TO ARRAY OF HIGH SCORES IN LOCAL STORAGE AND HIGH SCORES APPEAR
submitScoreBtn.addEventListener("click", function highscore(){
    
    
    if(highscoreInputName.value === "") {
        alert("Initials cannot be blank");
        return false;
    }else{
        var savedHighscores = JSON.parse(localStorage.getItem("savedHighscores")) || [];
        var currentUser = highscoreInputName.value.trim();
        var currentHighscore = {
            name : currentUser,
            score : score
        };
    
        gameoverDiv.style.display = "none";
        highscoreContainer.style.display = "flex";
        highscoreDiv.style.display = "block";
        endGameBtns.style.display = "flex";
        
        savedHighscores.push(currentHighscore);
        localStorage.setItem("savedHighscores", JSON.stringify(savedHighscores));
        generateHighscores();

    }
    
});

//DELETE HIGH SCORES AND CREATE NEW HIGH SCORE LIST
function generateHighscores(){
    highscoreDisplayName.innerHTML = "";
    highscoreDisplayScore.innerHTML = "";
    var highscores = JSON.parse(localStorage.getItem("savedHighscores")) || [];
    for (i=0; i<highscores.length; i++){
        var newNameSpan = document.createElement("li");
        var newScoreSpan = document.createElement("li");
        newNameSpan.textContent = highscores[i].name;
        newScoreSpan.textContent = highscores[i].score;
        highscoreDisplayName.appendChild(newNameSpan);
        highscoreDisplayScore.appendChild(newScoreSpan);
    }
}

//HIDES ALL SCREENS EXCEPT FOR HIGH SCORE SCREEN 
function showHighscore(){
    startQuizDiv.style.display = "none"
    gameoverDiv.style.display = "none";
    highscoreContainer.style.display = "flex";
    highscoreDiv.style.display = "block";
    endGameBtns.style.display = "flex";

    generateHighscores();
}

// This function clears the local storage of the high scores as well as clearing the text from the high score board
function clearScore(){
    window.localStorage.clear();
    highscoreDisplayName.textContent = "";
    highscoreDisplayScore.textContent = "";
}

//RESETS ALL THE VARIABLES TO ORIGINAL SETTINGS TO RESTART QUIZ
function replayQuiz(){
    highscoreContainer.style.display = "none";
    gameoverDiv.style.display = "none";
    startQuizDiv.style.display = "flex";
    timeLeft = 100;
    score = 0;
    currentQuestionIndex = 0;
}

