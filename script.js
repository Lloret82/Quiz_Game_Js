
//arrray of the quiz questions, avaialble choices, and correct answers
var questions = [
  {
    title: "Where can JavaScript be inserted in an HTML document?",
    choices: [
      "The head tag.",
      "The body tag.",
      "An external script sheet.",
      "All of the above.",
    ],
    answer: "All of the above.",
  },
  {
    title: "What is a JavaScript string?",
    choices: ["Used for storing and manipulating text.",
      "A string is written inside quotes.",
      "Both",
      "None of this",
    ],
    answer:
      "Both",
  },
  {
    title:
      " Which of the below statements about JavaScript functions is true?",
    choices: [
      "A JavaScript function is a block of code designed to perform a particular task.",
      "A JavaScript function does not have to be called to execute.",
      "A JavaScript function can only be used once.",
      "None of the above.",
    ],
    answer:
      "A JavaScript function is a block of code designed to perform a particular task.",
  },
  {
    title:
      "Which of the following function of an array object adds and/or removes elements from an array?",
    choices: ["toSource( )", "sort( )", "unshift( )", "splice( )"],
    answer: "splice( )",
  },
  {
    title:
      "Which of the following function of String object combines the text of two strings and returns a new string?",
    choices: ["add( )", "concat( )", " merge( )", "append( )"],
    answer: "concat( )",
  },
];

//setting the numerical variables for the functions, scores and timer
var score = 0;
var showQuestion = 0;
var timeLeft = 0;
var timer = 0;
var feedback = ""

//starts the countdown timer once user clicks the 'start' button
function start() {
  timeLeft = 100;
  document.getElementById("timeLeft").innerHTML = timeLeft;

  timer = setInterval(function (seconds) {
    timeLeft--;
    document.getElementById("timeLeft").innerHTML = timeLeft;
    //proceed to end the game function when timer is below 0 at any time
    if (timeLeft <= 0) {
      clearInterval(timer);
      endGame();
    }
  }, 1000);

  next();
}

//stop the timer to end the game
function endGame() {
  clearInterval(timer);

  var content =
    `<h1>GAME OVER!</h1>
    <h2>You got a total of ` +
    score +
    ` points!</h2>
    <h3>You answered to ` +
    score / 25 +
    ` questions correct!</h3>
    <input type="text" id="name" placeholder="First name"> 
    <button onclick="setScore()">Set score!</button>
    <button onclick="resetGame()">Play Again!</button>`;




  document.getElementById("Body").innerHTML = content;
}



//store the scores on local storage
function setScore() {
  localStorage.setItem("highscore", score);
  localStorage.setItem("highscoreName", document.getElementById("name").value);
  displayScore();
}

function displayScore() {

  var content =
    `
    <h2>` +
    localStorage.getItem("highscoreName") +
    ` highscore is:</h2>
    <h1>` +
    localStorage.getItem("highscore") +
    `</h1><br> 
    
    <button onclick="clearScore()">Clear score!</button>
    <button onclick="resetGame()">Play Again!</button>
    
    `;


  document.getElementById("Body").innerHTML = content;

}


document.getElementById("quiz").onload = function () { onLoad() };
function onLoad() {
  document.getElementById("quiz").innerHTML = content;
}
//clears the score name and value in the local storage if the user selects 'clear score'
function clearScore() {
  localStorage.setItem("highscore", "");
  localStorage.setItem("highscoreName", "");

  resetGame();
}
function gohome() {
  window.location = "index.html"
}
//reset the game
function resetGame() {
  clearInterval(timer);
  score = 0;
  showQuestion = 0;
  timeLeft = 0;
  timer = null;

  document.getElementById("timeLeft").innerHTML = timeLeft;
  return gohome()
}

function displayWrong() {
  document.getElementById("wrong").innerHTML = 'Wrong ❌❌❌❌';
  setTimeout(() => {
    document.getElementById("wrong").innerHTML = ''

  }, 1000);
}

function playSoundW() {
  var soundW = document.getElementById("audioW");
  soundW.play();
}
//deduct 25seconds from the timer if user chooses an incorrect answer

function incorrect() {
  timeLeft -= 25;
  next();
  displayWrong();
  playSoundW();
}

function playSoundC() {
  var sound = document.getElementById("audioC");
  sound.play();
}
function displayCorrect() {
  document.getElementById("correct").innerHTML = 'Correct 🏆🏆🏆🏆';
  setTimeout(() => {
    document.getElementById("correct").innerHTML = ''

  }, 1000);
}
//increases the score by 25points if the user chooses the correct answer
function correct() {
  score += 25;
  next();
  displayCorrect();
  playSoundC();
}

//loops through the questions
function next() {
  showQuestion++;

  if (showQuestion > questions.length - 1) {
    endGame();
    return;
  }

  var content = '<h1 class="anim container">' + questions[showQuestion].title + '</h1>';

  for (
    var buttonLoop = 0;
    buttonLoop < questions[showQuestion].choices.length;
    buttonLoop++
  ) {
    var buttonCode = '<button onclick="[answer]">[question]</button>';
    buttonCode = buttonCode.replace(
      "[question]",
      questions[showQuestion].choices[buttonLoop]
    );
    if (
      questions[showQuestion].choices[buttonLoop] ==
      questions[showQuestion].answer
    ) {
      buttonCode = buttonCode.replace("[answer]", "correct()");
    } else {
      buttonCode = buttonCode.replace("[answer]", "incorrect()");
    }
    content += buttonCode;
  }

  document.getElementById("Body").innerHTML = content;
}
