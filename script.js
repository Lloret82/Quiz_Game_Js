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
    choices: [ "Used for storing and manipulating text.",
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

//setting the numerical variables for the functions.. scores and timers..
var score = 0;
var displayQuestion = 0;
var timeLeft = 0;
var timer;

//starts the countdown timer once user clicks the 'start' button
function start() {
  timeLeft = 100;
  document.getElementById("timeLeft").innerHTML = timeLeft;

  timer = setInterval(function () {
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

  var quizContent =
    `
    <h1>Game over!</h1>
    <h2>You got a total of ` +
    score +
    ` points!</h2>
    <h3>That means you got ` +
    score / 25 +
    ` questions correct!</h3>
    <input type="text" id="name" placeholder="First name"> 
    <button onclick="setScore()">Set score!</button>
    <button onclick="resetGame()">Play Again!</button>`;
    


  document.getElementById("Body").innerHTML = quizContent;
}

//store the scores on local storage
function setScore() {
  localStorage.setItem("highscore", score);
  localStorage.setItem("highscoreName", document.getElementById("name").value);
  getScore();
}

function getScore() {
  var quizContent =
    `
    <h2>` +
    localStorage.getItem("highscoreName") +
    `'s highscore is:</h2>
    <h1>` +
    localStorage.getItem("highscore") +
    `</h1><br> 
    
    <button onclick="clearScore()">Clear score!</button><button onclick="resetGame()">Play Again!</button>
    
    `;

  document.getElementById("Body").innerHTML = quizContent;
}

//clears the score name and value in the local storage if the user selects 'clear score'
function clearScore() {
  localStorage.setItem("highscore", "");
  localStorage.setItem("highscoreName", "");

  resetGame();
}

//reset the game
function resetGame() {
  clearInterval(timer);
  score = 0;
  displayQuestion = 0;
  timeLeft = 0;
  timer = null;

  document.getElementById("timeLeft").innerHTML = timeLeft;

  var quizContent = `
    <h1>
        JavaScript Quiz!
    </h1>
    <h3>
        Click to play!   
    </h3>
    <button onclick="start()">Start!</button>`;

  document.getElementById("Body").innerHTML = quizContent;
}

//deduct 15seconds from the timer if user chooses an incorrect answer
function incorrect() {
  timeLeft -= 15;
  next();
}

//increases the score by 20points if the user chooses the correct answer
function correct() {
  score += 25;
  next();
}

//loops through the questions
function next() {
  displayQuestion++;

  if (displayQuestion > questions.length - 1) {
    endGame();
    return;
  }

  var quizContent = '<h1>' + questions[displayQuestion].title + '</h1>';

  for (
    var buttonLoop = 0;
    buttonLoop < questions[displayQuestion].choices.length;
    buttonLoop++
  ) {
    var buttonCode = '<button onclick="[ANS]">[CHOICE]</button>';
    buttonCode = buttonCode.replace(
      "[CHOICE]",
      questions[displayQuestion].choices[buttonLoop]
    );
    if (
      questions[displayQuestion].choices[buttonLoop] ==
      questions[displayQuestion].answer
    ) {
      buttonCode = buttonCode.replace("[ANS]", "correct()");
    } else {
      buttonCode = buttonCode.replace("[ANS]", "incorrect()");
    }
    quizContent += buttonCode;
  }

  document.getElementById("Body").innerHTML = quizContent;
}
