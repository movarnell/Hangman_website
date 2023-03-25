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
let guess = document.getElementById('textBox').value;
document.getElementById('letsPlayBtn').addEventListener('click', letsPlay);




const textbox = document.getElementById('textBox');

textbox.addEventListener('keyup', function (event) {
    if (event.key === 'Enter') {
        if (document.getElementById('textBox').value === "") {

        } else {
            letsPlayBtn.click()
            console.log('Enter key pressed!');
        }
    }
});


function createArray(chosenWord) {
    for (let i = 0; i < chosenWord.length; i++) {
        chosenWordArray.push(chosenWord.charAt(i));
        if (chosenWord.charAt(i) != " ") {
            blankArray.push("_");
        } else { blankArray.push(" ") };
    }
    document.getElementById('blankArray').innerText = blankArray.join("  ");
}

function letsPlay() {
    let chosenWord = document.getElementById('textBox').value;
    chosenWord = chosenWord.toUpperCase();
    console.log(chosenWord);
    createArray(chosenWord);
    document.getElementById('instructions').innerText = "Type in 1 letter and click Play to guess, your wrong letters will appear here:";
    document.getElementById('letsPlayBtn').removeEventListener('click', letsPlay);
    document.getElementById('letsPlayBtn').addEventListener('click', () => { nextGuess() });
    document.getElementById('textBox').value = "";
}

function nextGuess() {
    let guess = document.getElementById('textBox').value.toUpperCase();
    console.log(guess.length);
    if (guess.length <= 1) {
        for (let i = 0; i < chosenWordArray.length; i++) {
            if (chosenWordArray[i] === guess) {
                blankArray[i] = guess;
                document.getElementById('blankArray').innerText = blankArray.join(" ");
                document.getElementById('textBox').value = "";
                checkWinLoss();

            }
        }

        console.log(blankArray);
        console.log(chosenWordArray);


        if (!blankArray.includes(guess) && !usedWrongLetters.includes(guess)) {
            numGuesses -= 1;
            usedWrongLetters.push(guess);
            document.getElementById('instructions').innerText = "Type in 1 letter and click Play to guess, your wrong letters will appear here: " + usedWrongLetters.join(" ");
            document.getElementById('textOutput').innerText = "You have: " + numGuesses + " wrong guesses left";
            document.getElementById('blankArray').innerText = blankArray.join(" ");
            document.getElementById('textBox').value = "";

            checkWinLoss();
        }
    } else {
        document.getElementById('instructions').innerText = "You can't guess more than 1 letter at a time, try again.";
        document.getElementById('textBox').value = "";
    }
    document.getElementById('textBox').value = "";

    let hangPic = document.getElementById('hangImg');
    switch (numGuesses) {
        case 0:
            hangPic.src = "hang7.PNG";
            break;
        case 1:
            hangPic.src = "hang6.PNG";
            break;
        case 2:
            hangPic.src = "hang5.PNG";
            break;
        case 3:
            hangPic.src = "hang4.PNG";
            break;
        case 4:
            hangPic.src = "hang3.PNG";
            break;
        case 5:
            hangPic.src = "hang2.PNG";
            break;
        case 6:
            hangPic.src = "hang1.PNG";
            break;
    }
}

function checkWinLoss() {
    if (blankArray.includes("_") && numGuesses == 0) {
        console.log(numGuesses);
        console.log(usedWrongLetters.length)
        document.getElementById('textOutput').innerText = "You Lose! " + chosenWordArray.join("") + " was the solution.";
        const audio = new Audio("mixkit-arcade-fast-game-over-233.wav");
        audio.play();
        document.getElementById('instructions').innerText = "Click the play button to play again.";
        document.getElementById('letsPlayBtn').removeEventListener('click', () => { nextGuess() });
        document.getElementById('letsPlayBtn').addEventListener('click', () => { window.location.reload() });

    }
    if (!blankArray.includes('_')) {
        document.getElementById('textOutput').innerText = "Winner, winner, chicken dinner!";
        document.getElementById('instructions').innerText = "Click the play button to play again.";
        document.getElementById('letsPlayBtn').removeEventListener('click', () => { nextGuess() });
        document.getElementById('letsPlayBtn').addEventListener('click', () => { window.location.reload() });

    }
}
