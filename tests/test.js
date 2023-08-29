// Callback process example--------------------------------------------------------------

// we call a function "callback" when an async process is finished, in this example the async process is a timeout
/*function numberFunction(callback){
    setTimeout(() =>{
        let number = 0
        callback(number)
    }, 2000)
}

function printNumber(number){
    console.log(number)
}

numberFunction(printNumber)
*/

// Promises -------------------------------------------------------------------------

// we call a function that return a promise, once is finished with then, catch and finished methods exucute
// the following functions in a synchronous way
// whatever gets resolved or rejected is send to the next function
/*
function getWeather(){
    return new Promise(function(resolve, reject){
        setTimeout(() => {
            reject("404")
            resolve("Sunny")
        }, 1000);
    })
}
function getTime(){
    return new Promise(function(resolve, reject){
        setTimeout(() => {
            resolve("21:53")
        }, 1000)
    })
}
function onSucces(data){
    console.log(`Succes: ${data}`)
}
function onError(error){
    console.log(`Error: ${error}`)
}

getWeather().then(onSucces).catch(onError).then(getTime).then((time) => console.log(time))

*/
// ASYNC AWAIT-------------------------------------------------------------------
// we can delay a function that returns a promise with async await
/*
function getWeatherPromise(){
    return new Promise(function(resolve, reject){
        setTimeout(() => {
            resolve("Sunny")
            reject("404")
        }, 1000);
    })
}
async function getWeather(){
    const weather = await getWeatherPromise()
    console.log(weather)
}
getWeather()
*/

//-------------------------------------------------------------------------------------------------
// Buttons
/*
const btnContinue = document.getElementById("btn1")
const btnStop = document.getElementById("btn2")

function listenClick(){
    return new Promise(function(resolve, reject){
        btnContinue.onclick = () =>{
            resolve(1)
        }
        btnStop.onclick = () =>{
            resolve(2)
        }
    })
}
async function onButtonClick(option){
    if(option === 1){ // continue
        console.log("continue")
        await listenClick().then(onButtonClick)
        console.log("Exiting option = 1")
    }
    else if(option === 2){ // stop
        console.log("Stop")
        return 0
    }
}
function logStop(){
    console.log("Stoped")
}

listenClick().then(onButtonClick).then(logStop)

*/

//-----------------------------------------INPUT BET--------------------------------//
const submit = document.getElementById("btn2")
const betContainer = document.getElementById("bet-amount")
const balanceContainer = document.getElementById("balance")

let balance
let bet

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

submit.onclick = () =>{
    bet = parseFloat(betContainer.value)
    balance = parseFloat(balanceContainer.innerText)
    console.log(bet)
    console.log(balance)
    console.log(typeof bet)
    console.log(typeof balance)
    console.log(bet <= balance)
    if (bet <= balance &&  0 < bet){ // check bet is possible
        // charge bet
        balance -= bet;
        balanceContainer.innerText = balance;
    }
}


