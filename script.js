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

  timer = setInterval(function(seconds) {
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
    ` correct questions!</h3>
    <input type="text" id="name" placeholder="First name"> 
    <button onclick="setScore()">Set score!</button>
    <button onclick="resetGame()">Play Again!</button>`;
    
    


  document.getElementById("Body").innerHTML = content;
}



//store the scores in local storage
function setScore() {
  localStorage.setItem("highscore", score);
  localStorage.setItem("highscoreName", document.getElementById("name").value);
  displayScore();
}
// display the generated screen with the last game score
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

//clears local storage when clear score button is clicked
function clearScore() {
  localStorage.setItem("highscore", "");
  localStorage.setItem("highscoreName", "");

  resetGame();
}

//reset the game and display the generated home screen
function resetGame() {
  clearInterval(timer);
  score = 0;
  showQuestion = 0;
  timeLeft = 0;
  timer = null;

  document.getElementById("timeLeft").innerHTML = timeLeft;
  
  var content = `
    <h1>
        JavaScript Quiz!
    </h1>
    <h3>
        Click to play!   
    </h3>
    <button onclick="start()">Start!</button>`;

  document.getElementById("Body").innerHTML = content;
}

//display an alert for 1 sec when the answwwr is wrong
function displayWrong(){
    document.getElementById("wrong").innerHTML = 'Wrong!! ❌❌❌❌';
    setTimeout(() => {document.getElementById("wrong").innerHTML = ''
      
    }, 1000);
}

// play a sound when the answer is wrong

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
// play a sound when the answer is correct

function playSoundC() {
  var sound = document.getElementById("audioC");
  sound.play();
}
//display a correct alert when the right answer is clicked
function displayCorrect(){
  document.getElementById("correct").innerHTML = 'Correct!!🏆🏆🏆🏆🏆';
  setTimeout(() => {document.getElementById("correct").innerHTML = ''
    
  }, 1000);
}
//assign 25points if the user chooses the correct answer
function correct() {
  score += 25;
  next();
  displayCorrect();
  playSoundC();
}

//questions loop and end the game when last question is answered
function next() {
  showQuestion++;

  if (showQuestion > questions.length - 1) {
    endGame();
    return;
  }
  // check if the answer is correct
  var content = '<h1 class="anim container">' + questions[showQuestion].title + '</h1>';

  for (
    var i = 0;
    i < questions[showQuestion].choices.length; i++) {
    var answered = '<button onclick="[answer]">[question]</button>';
    answered = answered.replace(
      "[question]",
      questions[showQuestion].choices[i]
    );
    if (
      questions[showQuestion].choices[i] ==
      questions[showQuestion].answer
    ) {
      answered = answered.replace("[answer]", "correct()");
    } else {
      answered = answered.replace("[answer]", "incorrect()");
    }
    content += answered;
  }

  document.getElementById("Body").innerHTML = content;
}
