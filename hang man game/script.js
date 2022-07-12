const words = ["biology", "carbondioxide", "glucose", "stoma"]

const questions = [
    "What is the study of living things?", "What is waste material that the lungs breathe out", "What sugar is used a the beginning of cellular respiration",
    "What part of the plant does photo synthesis occur?"
]



let html = ""
let underscore = document.getElementById("underscore")
let mistakes = 0;
let wordselected;

let wordStatus = null;


let listofGuessedletters = [];

let arrayOfUnderscore = [];




const showCount = function(word) {

    let ws = word;


    html = "";




    for (i = 0; i < ws.length; i++) {
        arrayOfUnderscore.push("_")


        html += "_ ";

    }



    underscore.textContent = html;



}


const updateShowCount = function(index, guessedletter) {
    console.log("this is the index " + index)

    console.log(wordselected.length)



    wordStatus = wordselected.split('').map(letter => (listofGuessedletters.indexOf(letter) >= 0 ? letter : " _ ")).join('');

    //converting the word selected into arrays with strings in them, then for each array element, compar4e it to all the saved ones in array

    document.getElementById('underscore').innerHTML = wordStatus;






}




const wordDisplay = function(number) {

    wordselected = words[number]


    console.log(wordselected)

    showCount(wordselected)



};




const randomQuestion = function() {

    let number = Math.floor(Math.random() * 3)
    document.querySelector(".hint").textContent = questions[number]
    wordDisplay(number)



};

randomQuestion();





handleGuess = function(chosenletter) {




    if (wordselected.indexOf(chosenletter) >= 0) {

        document.querySelector(".checkguess").textContent = "Guessed letter right"

        console.log("The letter is the index of the word at position" + wordselected.indexOf(chosenletter))


        listofGuessedletters.push(chosenletter) //creating an array 

        wordStatus = wordselected.split('').map(letter => (listofGuessedletters.indexOf(letter) >= 0 ? letter : " _ ")).join('');

        //converting the word selected into arrays with strings in them, then for each array element, compar4e it to all the saved ones in array

        document.getElementById('underscore').innerHTML = wordStatus;

        winGame()





    } else if (wordselected.indexOf(chosenletter) == -1) {

        document.querySelector(".checkguess").textContent = "You're wrong"
        mistakes++;
        hangmanpicupdate();



    }


}


function generateButtons() {
    let buttonsHTML = 'abcdefghijklmnopqrstuvwxyz'.split('').map(letter =>
        `
        <button
          class="btn btn-lg btn-primary m-2"
          id='` + letter + `'
          onClick="handleGuess('` + letter + `')"
        >
          ` + letter + `
        </button>
      `).join('');

    document.getElementById('keyboard').innerHTML = buttonsHTML;
}


function hangmanpicupdate() {

    if (mistakes < 7) {
        console.log("pic change")

        document.getElementById('hangmanPic').src = './images/' + mistakes + '.jpg';


    } else {

        document.querySelector(".checkguess").textContent = "You lost the game! Play again!"
        resetGame();

    }



}


function winGame() {

    text = wordStatus.toString();

    console.log(text)
    console.log(wordselected)


    if (text == wordselected) {
        document.querySelector(".checkguess").textContent = "You won the game!"
        resetGame();



    } else {

        console.log("didnt win yet")

    }



}


function resetGame() {
    mistakes = 0;
    document.querySelector(".btn-reset").textContent = "Play again";





}

document.querySelector(".btn-reset").addEventListener('click', function(e) {

    mistakes = 0;
    randomQuestion();
    hangmanpicupdate();
    html = "";
    listofGuessedletters = []
    document.querySelector(".checkguess").textContent = "";



})







generateButtons();