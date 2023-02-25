
let numGuesses = document.getElementById('numOfAttempts')




/* This is a 2 player version of the classic Hangman game. 1 player will choose the 
word and the other player will guess and play the game. player 1 will also choose how many 
chances player 2 can take. */

// sets the word used for the guessing portion of the game
let firstGuess = prompt("What word or Phrase would you like to use?");
chosenWord = firstGuess.toUpperCase();
console.log(chosenWord)
// below -- Used to evaluate against
let chosenWordArray =[];
// used to keep up with empty slots/ show correct guesses
let blankArray = [];
// keeps up with wrong letters
let usedWrongLetters = [];
// lets the user select just how many tries the opponent gets to make. 

// This part fills the arrays with the starting values.
function createArray(chosenWord) {
    for(let i = 0; i < chosenWord.length; i++) {
        chosenWordArray.push(chosenWord.charAt(i));
    if (chosenWord.charAt(i) != " ") {
    blankArray.push("_");
    } else {blankArray.push(" ")};
    }
}

// this calls the function to fill the arrays and feeds in the chosenWord as a parameter. 
createArray(chosenWord);

// evaluates players guess and adds a wrong guess to the usedWrongLetters array. 
function evaluateGuess(playerGuess) {
   // this while statment validates that the user has only entered 1 letter. 
    while (playerGuess.length > 1){
        playerGuess = prompt("Your guess can only have 1 letter enter it again:");
        playerGuess = playerGuess.toUpperCase();
    }
    for (let i = 0; i < chosenWordArray.length; i++) {
        if(chosenWordArray[i] === playerGuess) {
        blankArray[i] = playerGuess;
       
        } 
    }    
        if (!blankArray.includes(playerGuess) && !usedWrongLetters.includes(playerGuess)){
            usedWrongLetters.push(playerGuess);
            
        }
} 

    

// This is the meat of the game, it runs until the max number of guesses is hit, or until the puzzle is solved.
// each time it evaluates to see if the player has gotten their guess correct or not. 
     do {playerGuess = prompt(
        ` ${blankArray.join(" ")}
        So far you have used the following letters:
        ${usedWrongLetters}
        You have ${numGuesses - usedWrongLetters.length} tries left.
        What is your next guess?`);
        playerGuess = playerGuess.toUpperCase();
        evaluateGuess(playerGuess); 
        // if the user guess is not correct the below code will let the player know they have lost. 
        if (usedWrongLetters.length > numGuesses-1) {
            alert(`You have guessed wrong ${numGuesses} times and did not guess the word correctly.
            the correct word was ${chosenWord}. You final correct letters were:
            ${blankArray.join(" ")} and your wrong letters were ${usedWrongLetters}. Sorry play again soon!`)
        } 
        playerGuess = playerGuess.toUpperCase();
    } while (blankArray.includes("_") && usedWrongLetters.length <= numGuesses -1);   

    // displays the win message if the player has won the game. 
    if (!blankArray.includes('_')) {
    alert(`
    ${blankArray.join("")} was the solution!
    You Win!
    `) 
} 




