//-----------------------------------------DROPDOW MENUS--------------------------------//
const userMenu = document.querySelector('#user');
const userDropMenu = document.querySelector('#dropdown-user');

userMenu.onclick = () => {
    userDropMenu.classList.toggle('none');
};

const languageMenu = document.querySelector('#language');
const languageDropMenu = document.querySelector('#dropdown-language');

languageMenu.onclick = () => {
    languageDropMenu.classList.toggle('none');
};

//-------------------------Remove Dropdown menus-------------------------//
window.onscroll = () => {
    userDropMenu.classList.add('none');
    languageDropMenu.classList.add('none');
};
// Detect clicks on document
document.addEventListener("click", function(event) {
    // Check if the clicked element is not the target element
    if (!userMenu.contains(event.target)) {
      // Add a class to the clicked element
      userDropMenu.classList.add("none");
    }
    if (!languageMenu.contains(event.target)) {
        // Add a class to the clicked element
        languageDropMenu.classList.add("none");
    }
})
//-----------------------------------------Available Balance--------------------------------//

let availableBalance;
const availableBalanceContainer = document.getElementById("balance");
availableBalance = availableBalanceContainer.innerText;

//-----------------------------------------INPUT BET--------------------------------//
//-------------------Filter input characters-----------------//
function setInputFilter(textbox, inputFilter, errMsg) {
    [ "input", "keydown", "keyup", "mousedown", "mouseup", "select", "contextmenu", "drop", "focusout" ].forEach(function(event) {
      textbox.addEventListener(event, function(e) {
        if (inputFilter(this.value)) {
          // Accepted value.
          if ([ "keydown", "mousedown", "focusout" ].indexOf(e.type) >= 0){
            this.classList.remove("input-error");
            this.setCustomValidity("");
          }
  
          this.oldValue = this.value;
          this.oldSelectionStart = this.selectionStart;
          this.oldSelectionEnd = this.selectionEnd;
        }
        else if (this.hasOwnProperty("oldValue")) {
          // Rejected value: restore the previous one.
          this.classList.add("input-error");
          this.setCustomValidity(errMsg);
          this.reportValidity();
          this.value = this.oldValue;
          this.setSelectionRange(this.oldSelectionStart, this.oldSelectionEnd);
        }
        else {
          // Rejected value: nothing to restore.
          this.value = "";
        }
      });
    });
}

setInputFilter(document.getElementById("bet-amount"), function(value) {
  return /^\d*\.?\d*$/.test(value); // Allow digits and '.' only, using a RegExp.
}, "Only digits and '.' are allowed");

//-------------------Input Keys-----------------//

const cButton = document.getElementById("c-button");
const halfButton = document.getElementById("1/2-button");
const doubleButton = document.getElementById("2x-button");
const zeroButton = document.getElementById("0.1-button");
const oneButton = document.getElementById("1-button");
const tenButton = document.getElementById("10-button");
const maxButton = document.getElementById("m-button");
// Bet Amount input
const betAmount = document.getElementById("bet-amount");

// To check if the input bet is a number
function checkNumbers(str) {
  return /\d/.test(str);
}

cButton.onclick = () => {
  betAmount.value = "0";
}

halfButton.onclick = () =>{
  if (checkNumbers(betAmount.value)){
    betAmount.value *= 0.5;
  }
}

doubleButton.onclick = () =>{
  if (checkNumbers(betAmount.value)){
    betAmount.value *= 2;
  }
}

zeroButton.onclick = () =>{
  if (checkNumbers(betAmount.value)){
    betAmount.value = (parseFloat(betAmount.value) + 0.1).toFixed(2);
  }
  else{
    betAmount.value = "0.1"
  }
}

oneButton.onclick = () =>{
  if (checkNumbers(betAmount.value)){
    betAmount.value = (parseFloat(betAmount.value) + 1);
  }
  else{
    betAmount.value = "1"
  }
}

tenButton.onclick = () =>{
  if (checkNumbers(betAmount.value)){
    betAmount.value = (parseFloat(betAmount.value) + 10);
  }
  else{
    betAmount.value = "10"
  }
}

maxButton.onclick = () =>{
  betAmount.value = parseFloat(availableBalance);
}

//-----------------------------------------Play Button--------------------------------//

const startButton = document.getElementById("start");

startButton.onclick = () =>{
  if (checkNumbers(betAmount.value) && betAmount.value < availableBalance){ // check bet is correct
    // charge bet
    availableBalance -= betAmount.value;
    availableBalanceContainer.innerText = availableBalance;
    // start game
    startGame(betAmount.value);
    alert("test222222222222222222222");
  }
}

//-----------------------------------------BLACKJACK GAME--------------------------------//

function startGame(bet){
  let hiddenCard = document.getElementsByClassName("card-hidden");
  hiddenCard.forEach(function(element){
    element.classList.remove("card-hidden");
    element.classList.add("none");
  });
  alert("test");
}
//-------------- Random ----------//
function generateRandom(){
  let randomNumber = Math.floor(Math.random() * 13) + 1; // generates a number between 1 and 13
  return randomNumber;
}
