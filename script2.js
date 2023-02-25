let numGuesses = 6;
let gamePlayArea = document.getElementById('gamePlayArea');
let parentContainer = document.getElementById('parentContainer')
let chosenWord = "";
let textBox = document.getElementById('textBox')
let chosenWordArray = [];
// used to keep up with empty slots/ show correct guesses
let blankArray = [];
// keeps up with wrong letters
let usedWrongLetters = [];
let playerGuess = document.getElementById('textBox').value;
document.getElementById('letsPlayBtn').addEventListener('click', letsPlay);


function letsPlay() {

    chosenWord = document.getElementById("textBox").value;
    chosenWord = chosenWord.toUpperCase();
    console.log(chosenWord);
    createArray(chosenWord);

    console.log(chosenWordArray);
    console.log(blankArray);
    console.log(usedWrongLetters);
    document.getElementById('blankArray').innerText = blankArray.join(" ");
    document.getElementById('textOutput').innerText = "What's your guess?";
    document.getElementById('secondLine').innerText = usedWrongLetters.join(",");
    document.getElementById("textBox").value = "";
    console.log(document.getElementById('letsPlayBtn'));
    window.location.href = "guess.html";

}


// This part fills the arrays with the starting values.
function createArray(chosenWord) {
    for (let i = 0; i < chosenWord.length; i++) {
        chosenWordArray.push(chosenWord.charAt(i));
        if (chosenWord.charAt(i) != " ") {
            blankArray.push("_");
        } else { blankArray.push(" ") };
    }
}

console.log(playerGuess);
function evaluateGuess() {
    document.getElementById('blankArray').innerText = blankArray.join(" ");
    console.log(playerGuess);
    console.log(chosenWordArray);
    console.log(blankArray);
    console.log(usedWrongLetters);
}

// // evaluates players guess and adds a wrong guess to the usedWrongLetters array. 
// function evaluateGuess() {
//     playerGuess = document.getElementById('textBox').value;
//     // this while statment validates that the user has only entered 1 letter. 
//     while (playerGuess.length > 1) {
//         playerGuess = prompt("Your guess can only have 1 letter enter it again:");
//         playerGuess = playerGuess.toUpperCase();
//     }
//     for (let i = 0; i < chosenWordArray.length; i++) {
//         if (chosenWordArray[i] === playerGuess) {
//             blankArray[i] = playerGuess;

//         }
//     }
//     if (!blankArray.includes(playerGuess) && !usedWrongLetters.includes(playerGuess)) {
//         usedWrongLetters.push(playerGuess);

//     }
//     console.log("this ran correctly the evaluateGuess()");
//     console.log(chosenWordArray);
//     console.log(blankArray);
//     console.log(usedWrongLetters);
//     document.getElementById("textBox").value = "";
// }


// do {
//     playerGuess = prompt(
//         ` ${blankArray.join(" ")}
//         So far you have used the following letters:
//         ${usedWrongLetters}
//         You have ${numGuesses - usedWrongLetters.length} tries left.
//         What is your next guess?`);
//     playerGuess = playerGuess.toUpperCase();
//     evaluateGuess(playerGuess);
//     // if the user guess is not correct the below code will let the player know they have lost. 
//     if (usedWrongLetters.length > numGuesses - 1) {
//         alert(`You have guessed wrong ${numGuesses} times and did not guess the word correctly.
//             the correct word was ${chosenWord}. You final correct letters were:
//             ${blankArray.join(" ")} and your wrong letters were ${usedWrongLetters}. Sorry play again soon!`)
//     }
//     playerGuess = playerGuess.toUpperCase();
// } while (blankArray.includes("_") && usedWrongLetters.length <= numGuesses - 1);

// // displays the win message if the player has won the game. 
// if (!blankArray.includes('_')) {
//     alert(`
//     ${blankArray.join("")} was the solution!
//     You Win!
//     `)
// }




