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

let availableBalance = 0.0;
const availableBalanceContainer = document.getElementById("balance");
availableBalance = parseFloat(availableBalanceContainer.innerText).toFixed(2);

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
const multiplyButton = document.getElementById("2x-button");
const zeroButton = document.getElementById("0.1-button");
const oneButton = document.getElementById("1-button");
const tenButton = document.getElementById("10-button");
const maxButton = document.getElementById("m-button");
// Bet Amount input
const betAmountContainer = document.getElementById("bet-amount");
let betAmount = 0.0;

// To check if the input bet is a number
function checkNumbers(str) {
  return /\d/.test(str);
}

cButton.onclick = () => {
  betAmountContainer.value = "0";
  betAmount = 0
}

halfButton.onclick = () =>{
  if (checkNumbers(betAmountContainer.value)){
    betAmountContainer.value *= 0.5;
    betAmount *= 0.5
  }
}

multiplyButton.onclick = () =>{
  if (checkNumbers(betAmountContainer.value)){
    betAmountContainer.value *= 2;
    betAmount *= 2
  }
}

zeroButton.onclick = () =>{
  if (checkNumbers(betAmountContainer.value)){
    betAmountContainer.value = (parseFloat(betAmountContainer.value) + 0.1).toFixed(2);
    betAmount = parseFloat(betAmountContainer.value).toFixed(2)
  }
  else{
    betAmountContainer.value = "0.1"
    betAmount = 0.1
  }
}

oneButton.onclick = () =>{
  if (checkNumbers(betAmountContainer.value)){
    betAmountContainer.value = (parseFloat(betAmountContainer.value) + 1)
    betAmount = parseFloat(betAmountContainer.value).toFixed(2)
  }
  else{
    betAmountContainer.value = "1"
    betAmount = 1
  }
}

tenButton.onclick = () =>{
  if (checkNumbers(betAmountContainer.value)){
    betAmountContainer.value = (parseFloat(betAmountContainer.value) + 10)
    betAmount = parseFloat(betAmountContainer.value).toFixed(2)
  }
  else{
    betAmountContainer.value = "10"
    betAmount = 10
  }
}

maxButton.onclick = () =>{
  betAmountContainer.value = parseFloat(availableBalance);
  betAmount = parseFloat(availableBalance).toFixed(2)
}

//-----------------------------------------Play Button--------------------------------//

const startButton = document.getElementById("start");
const timer = document.getElementById("timer")

startButton.onclick = () =>{
  betAmount = parseFloat(betAmountContainer.value)
  availableBalance = parseFloat(availableBalance)

  if (checkNumbers(betAmount) && betAmount <= availableBalance &&  0 < betAmount){ // check bet is possible
    // charge bet
    availableBalance -= betAmount;
    availableBalanceContainer.innerText = availableBalance.toFixed(2);
    // hide play button
    startButton.classList.add("none")
    timer.classList.remove("none")

    // start game
    startGame();
  }
}

//-----------------------------------------BLACKJACK GAME--------------------------------//
const dealerCountContainer = document.getElementById("dealer-counter");
const clientCountContainer = document.getElementById("client-counter"); 

let dealerBlackJack = false;
let clientBlackJack = false;

// images
const hiddenImage = new Image();
hiddenImage.src = "img/cards/card-hidden.png";
hiddenImage.classList.add("card-hidden");
const asImage = new Image();
asImage.src = "img/cards/card-as.png";
const twoImage = new Image();
twoImage.src = "img/cards/card-2.png";
const threeImage = new Image();
threeImage.src = "img/cards/card-3.png";
const fourImage = new Image();
fourImage.src = "img/cards/card-4.png";
const fiveImage = new Image();
fiveImage.src = "img/cards/card-5.png";
const sixImage = new Image();
sixImage.src = "img/cards/card-6.png";
const sevenImage = new Image();
sevenImage.src = "img/cards/card-7.png";
const eightImage = new Image();
eightImage.src = "img/cards/card-8.png";
const nineImage = new Image();
nineImage.src = "img/cards/card-9.png";
const tenImage = new Image();
tenImage.src = "img/cards/card-10.png";
const jImage = new Image();
jImage.src = "img/cards/card-j.png";
const kImage = new Image();
kImage.src = "img/cards/card-k.png";
const qImage = new Image();
qImage.src = "img/cards/card-q.png";
// Images containers
const dealerImagesContainer = document.getElementById("dealer-cards");
const clientImagesContainer = document.getElementById("client-cards");

// Options
const doubleOption = document.getElementById("double");
const standOption = document.getElementById("stand");
const hitOption = document.getElementById("hit");
const splitOption = document.getElementById("split");

let doubleAllowed = false;
let standAllowed = false;
let hitAllowed = false;
let splitAllowed = false;

// Cards

let dealerCards = [] // declare array
let clientCards = [] // declare array

// -------------- Start Game --------------//
async function startGame(){
  // remove default cards
  removeAllChildNodes(dealerImagesContainer);
  removeAllChildNodes(clientImagesContainer);
  // generate initial cards
  dealerCards = [generateRandom()];

  // show initial cards and update counters
  dealerImagesContainer.append(imageSelector(dealerCards[0]).cloneNode(true));
  dealerCountContainer.innerText = checkSum(dealerCards)
  dealerCards.push(generateRandom())
  dealerCards.forEach(card => console.log(card));
  dealerImagesContainer.append(hiddenImage);
  addClientCard()
  await sleep(500)
  addClientCard()
  // check blackjack
  if (checkSum(dealerCards) === 21) dealerBlackJack = true
  else dealerBlackJack = false
  if (checkSum(clientCards) === 21) clientBlackJack = true
  else clientBlackJack = false

  if(dealerBlackJack || clientBlackJack){
    removeAllChildNodes(dealerImagesContainer) // clear
    // show cards and update counters
    dealerImagesContainer.append(imageSelector(dealerCards[0]).cloneNode(true))
    dealerImagesContainer.append(imageSelector(dealerCards[1]).cloneNode(true))
    dealerCountContainer.innerText = checkSum(dealerCards)
    if(dealerBlackJack){
      if(!clientBlackJack){
        // client loses
        console.log("Dealer BlackJack you lost!")
      }
      else{
        // draw double blackjack
        console.log("Push!")
      }
    }
    else if(clientBlackJack){
      console.log("BlackJack you won!")
      availableBalance += 2*betAmount
    }
    await sleep(2000)
    restartGame()
    return 0 // exit game
  }

  // continue game => show options
  if (betAmount <= availableBalance && (clientCards[0] === clientCards[1])){ // double and split
    showOptions(true, true, true, true);
  }
  else if (betAmount <= availableBalance && !(clientCards[0] === clientCards[1])){ // double only
    showOptions(true, true, true, false);
  }
  else showOptions (false, true, true, false); // neither split nor double

  // listen choosen option
  listenOption()
    .then(onOptionClick) // 0=double, 1=stand, 2=hit, 3=split
    .then(dealerTurn) // dealer turn
    .then(endGame) // finish game
    .then(restartGame) // restart
}
//-------------- Random ----------//
function generateRandom(){
  let randomNumber = Math.floor(Math.random() * 13) + 1; // generates a number between 1 and 13
  // 1 = as, 2-10 = 2-10, 11 = j, 12 = k, 13 = q
  return randomNumber;
}
//-------------- Check BlackJack ----------//
function checkBlackJack(cards){
  if((cards[0] === 1 || cards[1] === 1) && (cards[0] >= 10 || cards[1] >= 10)){
    return true;
  }
}
//-------------- Grab images ----------//
function imageSelector(number){
  switch(number){
    case 1:
      return asImage;
    case 2:
      return twoImage;
    case 3:
      return threeImage;
    case 4:
      return fourImage;
    case 5:
      return fiveImage;
    case 6:
      return sixImage;
    case 7:
      return sevenImage;
    case 8:
      return eightImage;
    case 9:
      return nineImage;
    case 10:
      return tenImage;
    case 11:
      return jImage;
    case 12:
      return kImage;
    case 13:
      return qImage;
  }
}
// clear function
function removeAllChildNodes(parent) {
  while (parent.firstChild) {
      parent.removeChild(parent.firstChild);
  }
}
function showOptions(double, stand, hit, split){
  if (double) {
    doubleOption.classList.add("double");
    doubleAllowed = true;
  }
  else {
    doubleOption.classList.remove("double");
    doubleAllowed = false;
  }

  if (stand) {
    standOption.classList.add("stand");
    standAllowed = true;
  }
  else {
    standOption.classList.remove("stand");
    standAllowed = false;
  }

  if (hit) {
    hitOption.classList.add("hit");
    hitAllowed = true;
  }
  else {
    hitOption.classList.remove("hit");
    hitAllowed = false;
  }
  if (split) {
    splitOption.classList.add("split");
    splitAllowed = true;
  }
  else {
    splitOption.classList.remove("split");
    splitAllowed = false;
  }
}
function listenOption(){ // promise
  return new Promise(function(resolve, reject){
    // 0=double, 1=stand, 2=hit, 3=split
    if (doubleAllowed){
      doubleOption.onclick = () => {
        resolve(0)
      }
    }
    if (standAllowed){
      standOption.onclick = () => {
        resolve(1)
      }
    }
    if (hitAllowed){
      hitOption.onclick = () => {
        resolve(2)
      }
    }
    if (splitAllowed){
      splitOption.onclick = () => {
        resolve(3)
      }
    }
  })
}
async function onOptionClick(option){
  console.log(option + ", option selected")
    // 0=double, 1=stand, 2=hit, 3=split
    if(option === 0){ // double
      availableBalance -= betAmount // charge bet
      availableBalanceContainer.innerText = availableBalance.toFixed(2)
      betAmount *= 2
      addClientCard()
      // unable options
      showOptions(false, false, false, false)
      // check sum
      if(checkSum(clientCards) <= 21){
        // dealers turn
        return 1
      }
      else{
        // lost
        return 0
      }
    }
    else if(option === 1){ // stand
      // unable options
      showOptions(false, false, false, false)
      // dealers turn
      return 1
    }
    else if(option === 2){ // hit
      addClientCard()
      showOptions(false, true, true, false)
      if(checkSum(clientCards) <= 21){
        // continue client turn
        if(checkSum(clientCards) === 21){ // if client reaches 21
          // dealer turn
          return 1;
        }
        await listenOption().then(onOptionClick)
        // once the client stops selection options or loses
        if (checkSum(clientCards) <= 21) return 1 // dealer turn
        else return 0 // lost
      }
      else{
        // lost
        // unable options
        showOptions(false, false, false, false)
        return 0
      }
    }
    else if(option === 3){ // split
      // ni idea yet
      // continue client turn
    }
}
function checkSum(cards){ // returns the sum of a deck of cards
  let sum = 0
  let aces = 0;

  cards.forEach((card) =>{
    // check how many aces do we have
    if(card === 1){
      aces++
    }
    // sum value = code cards
    else if (card >= 2 && card <= 10) sum += card
    // sum j q k cards
    else sum += 10
    }
  )
  if (aces >= 2){ // if there is more than 1 ace
    for(let i = 0; i < aces - 1; i++){
      sum++ // add 1 for every ace (except last one)
    }
    if(sum <= 10){
      sum += 11 // add 11 to the sum
    }
    else{
      sum++ // add 1 to the sum
    }
  }
  else if (aces == 1){ // if there is only one ace
    if(sum <= 10){
      sum += 11 // add 11 to the sum
    }
    else{
      sum++ // add 1 to the sum
    }
  }
  return sum
}
function addClientCard(){
  clientCards.push(generateRandom())
  clientImagesContainer.append(imageSelector(clientCards[clientCards.length - 1]).cloneNode(true))
  clientCountContainer.innerText = checkSum(clientCards)
  console.log(clientCards[clientCards.length - 1])
}
async function dealerTurn(continueGame){
  await sleep(500)
  console.log(continueGame + ": 1 = continuegame, 0 = dont")
  if (continueGame === 0){ // skip dealer turn if client lost
    console.log("skip dealer")
    return 0
  }
  else if (continueGame === 1){
    // show initial cards
    console.log("continue game")
    removeAllChildNodes(dealerImagesContainer)
    dealerImagesContainer.append(imageSelector(dealerCards[0]).cloneNode(true))
    dealerImagesContainer.append(imageSelector(dealerCards[1]).cloneNode(true))
    dealerCountContainer.innerText = checkSum(dealerCards)
    if(checkSum(dealerCards) >= 17){ // if the dealer had 17 initially stop
      console.log("stop")
      return 0
    }
    else{ // get card until reach 17
      while(checkSum(dealerCards) < 17){
        dealerCards.push(generateRandom())
        await sleep(500)
        dealerImagesContainer.append(imageSelector(dealerCards[dealerCards.length - 1]).cloneNode(true))
        dealerCountContainer.innerText = checkSum(dealerCards)
        console.log(checkSum(dealerCards))
      }
      return 0
    }
  }
}
async function endGame(){
  await sleep(3000)
  console.log("end")
  if (checkSum(clientCards) > 21){
    // client lost
    console.log("lost")
  }
  else if(checkSum(clientCards) <= 21 && checkSum(dealerCards) > 21){
    // client won
    console.log("win")
    availableBalance += 2 * betAmount
  }
  else if (checkSum(clientCards) < checkSum(dealerCards)){
    // client lost
    console.log("lost")
  }
  else if (checkSum(clientCards) > checkSum(dealerCards)){
    // client won
    console.log("won")
    availableBalance += 2 * betAmount
  }
  else{
    console.log("Push")
    availableBalance += betAmount
  }
}
function restartGame(){
  console.log("restart")

  // clear card strings
  dealerCards = []
  clientCards = []

  // clear cards images
  removeAllChildNodes(dealerImagesContainer)
  removeAllChildNodes(clientImagesContainer)

  // reset counters
  dealerCountContainer.innerText = 0
  clientCountContainer.innerText = 0

  // show default cards
  dealerImagesContainer.append(hiddenImage.cloneNode(true))
  dealerImagesContainer.append(hiddenImage.cloneNode(true))
  clientImagesContainer.append(hiddenImage.cloneNode(true))
  clientImagesContainer.append(hiddenImage.cloneNode(true))

  showOptions (false, false, false, false)
  timer.classList.add("none")
  startButton.classList.remove("none")

  // Update Balance
  availableBalance = availableBalance.toFixed(2) // round up the 2 first decimals
  availableBalanceContainer.innerText = availableBalance
}
// delay function
function sleep(time){
  return new Promise((resolve) => setTimeout (resolve, time))
}