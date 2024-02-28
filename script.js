let gamePlayArea = document.getElementById('gamePlayArea');
let parentContainer = document.getElementById('parentContainer')
let textBox = document.getElementById('textBox')



let guess = document.getElementById('textBox').value;
document.getElementById("letsPlayBtn").addEventListener("click", letsPlay);

const textbox = document.getElementById("textBox");

textbox.addEventListener("keyup", function (event) {
  const textBoxValue = document.getElementById("textBox").value;
  if (event.key === "Enter" && textBoxValue !== "") {
    document.getElementById("letsPlayBtn").click();
    console.log("Enter key pressed!");
  }
});



function createArray(chosenWord) {
  const specialCharRegex = /[^A-Za-z0-9 ]/g;
  if (
    typeof chosenWord !== "string" ||
    chosenWord.trim() === "" ||
    specialCharRegex.test(chosenWord)
  ) {
    console.error(
      "Invalid input. Please provide a non-empty string without special characters."
    );
    return;
  }
  let chosenWordArray = [...chosenWord];
  let blankArray = chosenWord
    .split("")
    .map((char) => (char === " " ? " " : "_"));
  document.getElementById("blankArray").innerText = blankArray.join("\xa0");
  return chosenWordArray;
}

function letsPlay() {
  let chosenWord = document.getElementById("textBox").value.toUpperCase();
  if (!chosenWord) {
    alert("Please enter a word to start the game.");
    return;
  }
  console.log(chosenWord);
  let chosenWordArray = createArray(chosenWord);
  document.getElementById("instructions").innerText =
    "Type in 1 letter and click Play to guess, your wrong letters will appear here:";
  const letsPlayBtn = document.getElementById("letsPlayBtn");
  letsPlayBtn.removeEventListener("click", letsPlay);
  letsPlayBtn.addEventListener("click", () => nextGuess(chosenWordArray));
  document.getElementById("textBox").value = "";
}

// Function to validate the guess
function validateGuess(guess, instructions, textBox) {
  if (guess.length > 1) {
    instructions.innerText =
      "You can't guess more than 1 letter at a time, try again.";
    textBox.value = "";
    return false;
  }
  if (!guess.match(/^[A-Z]$/)) {
    instructions.innerText = "Please enter a valid letter.";
    textBox.value = "";
    return false;
  }
  return true;
}

// Function to check if the guess is in the chosen word
function checkGuessInWord(guess, chosenWordArray, blankArray) {
    let found = false;
    for (let i = 0; i < chosenWordArray.length; i++) {
        if (chosenWordArray[i] === guess) {
            blankArray[i] = guess;
            found = true;
        }
    }
    return found;
}

// Function to handle a wrong guess
function handleWrongGuess(guess, usedWrongLetters, numGuesses, instructions, textOutput) {
    if (!usedWrongLetters.includes(guess)) {
        numGuesses -= 1;
        usedWrongLetters.push(guess);
        instructions.innerText = "Type in 1 letter and click Play to guess, your wrong letters will appear here: " + usedWrongLetters.join(" ");
        textOutput.innerText = "You have: " + numGuesses + " wrong guesses left";
    }
    return numGuesses;
}

// The refactored nextGuess function
function nextGuess(chosenWordArray) {
  let numGuesses = 6;
  let usedWrongLetters = [];
  let blankArray = Array(chosenWordArray.length).fill("_");
  const guess = document.getElementById("textBox").value.toUpperCase();
  const instructions = document.getElementById("instructions");
  const blankArrayElement = document.getElementById("blankArray");
  const textBox = document.getElementById("textBox");
  const textOutput = document.getElementById("textOutput");
  const hangPic = document.getElementById("hangImg");

  if (!validateGuess(guess, instructions, textBox)) {
    return;
  }

  let found = checkGuessInWord(guess, chosenWordArray, blankArray);
  blankArrayElement.innerText = blankArray.join("\xa0");
  textBox.value = "";

  if (found) {
    checkWinLoss(blankArray, numGuesses, chosenWordArray);
  } else {
    numGuesses = handleWrongGuess(
      guess,
      usedWrongLetters,
      numGuesses,
      instructions,
      textOutput
    );
    checkWinLoss(blankArray, numGuesses, chosenWordArray);
  }

  hangPic.src = `hang${7 - numGuesses}.PNG`;
}

function checkWinLoss() {
    const textOutput = document.getElementById('textOutput');
    const instructions = document.getElementById('instructions');
    const letsPlayBtn = document.getElementById('letsPlayBtn');

    if (blankArray.includes("_") && numGuesses === 0) {
        textOutput.innerText = "You Lose! " + chosenWordArray.join("") + " was the solution.";
        const audio = new Audio("mixkit-arcade-fast-game-over-233.wav");
        audio.play();
        instructions.innerText = "Click the play button to play again.";
        letsPlayBtn.removeEventListener('click', nextGuess);
        letsPlayBtn.addEventListener('click', () => window.location.reload());
    } else if (!blankArray.includes('_')) {
        textOutput.innerText = "Winner, winner, chicken dinner!";
        instructions.innerText = "Click the play button to play again.";
        letsPlayBtn.removeEventListener('click', nextGuess);
        letsPlayBtn.addEventListener('click', () => window.location.reload());
    }
}
