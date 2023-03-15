//VARIABLES
//Cards that are need to be printed
var printedCards;
//number of cards flipped
var flipped;
var gameEnded = false;

var turns;
var time;
//ARRAYS
//Saves the images randomly selected
var randomImgSaved = [];

//save just the selected elements por a time in the arrays,
//then put them into the next group of arrays and pop it
var selectedCardsSrc = [];
var selectedCardsId = [];
var selectedCardsClass = [];

//save all the different parts of an html element in arrays
var allSelectedCardsSrc = [];
var allCardsId = [];
var allCardsClass = [];

/**
 * desc
 * the function takes the info introduced in the index.html
 * and put it where it belongs
 * @date 2023-03-06
 */
function userInfo() {
  document.getElementById("nick").value = nick;
  document.getElementById("gameCharacter").src = gameCharacter;
  panelSize = parseInt(number);
}

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

/****************************************************************************************************************/
/****************************************************************************************************************/
/****************************************************************************************************************/
/**
 * desc
 * the function generate the game table
 * ORIGINAL CODE
 * @date 2023-03-06
 */
// function gameGenerate() {
//   //generate the grid template
//   document.getElementById("game").style.gridTemplateColumns =
//     "repeat(" + number + ", 1fr)";
//   document.getElementById("game").style.gridTemplateRows =
//     "repeat(" + number + ", 1fr)";

//   var items = "";
//   printedCards = parseInt(number ** 2);

//   var randomImg = new Array();
//   randomImg[0] = "/PROYECTO FINAL/Images/Cards/Villains/freezer.png";
//   randomImg[1] = "/PROYECTO FINAL/Images/Cards/Heroes/krillin.jpg";
//   randomImg[2] = "/PROYECTO FINAL/Images/Cards/Villains/cell.jpg";
//   randomImg[3] = "/PROYECTO FINAL/Images/Cards/Heroes/piccoro.jpg";
//   randomImg[4] = "/PROYECTO FINAL/Images/Cards/Villains/dragonOscuro.png";
//   randomImg[5] = "/PROYECTO FINAL/Images/Cards/Heroes/trunks.jpg";
//   randomImg[6] = "/PROYECTO FINAL/Images/Cards/Villains/moro.png";
//   randomImg[7] = "/PROYECTO FINAL/Images/Cards/Heroes/yamcha.jpg";

//   /**
//    * the loop choose the number of cards selected from an array with 8 elements
//    * then save them into an array and create the html label with
//    * the image and class
//    * this happens from 4 to 36 times, depends on the chose of the user
//    */
//   for(let index = 0; index < printedCards / 2; index++){
//     randomCard = getRandomInt(8);
//     const imgSrc = randomImg[randomCard];

//     items +=
//         `<div class="containerItem">
//             <div>
//                 <img src="${randomImg[randomCard]}" class="pic" id="${index}">
//             </div>
//         </div>`;
//         items +=
//         `<div class="containerItem">
//             <div>
//                 <img src="${randomImg[randomCard]}" class="pic" id="${index}">
//             </div>
//         </div>`;
//     randomImgSaved.push(imgSrc);
//   }

//   //print the images
//   document.getElementById("game").innerHTML = items;
//   //depends on it´s difficult to set the timeout and flip the card
//   if (number == "2") {
//     setTimeout(flip, 2000);
//   } else if (number == "4") {
//     setTimeout(flip, 3000);
//   } else if (number == "6") {
//     setTimeout(flip, 6000);
//   }
// }
/****************************************************************************************************************/
/****************************************************************************************************************/
/****************************************************************************************************************/

/**
 * desc
 * GENERATED WITH HELP OF CHAT-GPT AND USING THE PREVIOUS CODE
 * Is the function that generate the game table with the correspondent
 * cards and saving them into his own arrays to use later
 * @date 2023-03-13
 */
function gameGenerate() {
  //generate the grid template
  document.getElementById("game").style.gridTemplateColumns =
    "repeat(" + number + ", 1fr)";
  document.getElementById("game").style.gridTemplateRows =
    "repeat(" + number + ", 1fr)";

  var items = [];
  printedCards = parseInt(number ** 2);

  var randomImg = new Array();
  randomImg[0] = "./Images/Cards/Villains/freezer.png";
  randomImg[1] = "./Images/Cards/Heroes/krillin.jpg";
  randomImg[2] = "./Images/Cards/Villains/cell.jpg";
  randomImg[3] = "./Images/Cards/Heroes/piccoro.jpg";
  randomImg[4] = "./Images/Cards/Villains/dragonOscuro.png";
  randomImg[5] = "./Images/Cards/Heroes/trunks.jpg";
  randomImg[6] = "./Images/Cards/Villains/moro.png";
  randomImg[7] = "./Images/Cards/Heroes/yamcha.jpg";

  /**
   * the loop choose the number of cards selected from an array with 8 elements
   * then create the divs and img labels required 2 times, then save those labels
   * into the "items" array
   */
  for (let index = 0; index < printedCards / 2; index++) {
    randomCard = getRandomInt(8);

    items.push(
      `<div class="containerItem">
            <div>
                <img src="${randomImg[randomCard]}" class="pic" id="${index}">
            </div>
            </div>`
    );
    items.push(
      `<div class="containerItem">
            <div>
                <img src="${randomImg[randomCard]}" class="pic" id="${index}">
            </div>
            </div>`
    );
  }

  // shuffle the items array using the Fisher-Yates shuffle algorithm
  for (let i = items.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i - 1));
    console.log(j);
    [items[i], items[j]] = [items[j], items[i]];
  }

  // join the items array into a string and insert it into the game element
  document.getElementById("game").innerHTML = items.join("");

  //Access to all the elements with the clas "pic" and go through them
  //with for loop, then get they "src" and save it into the
  //"randomImgSaved" array to use it when i call the play() function
  var imgElements = document.querySelectorAll(".pic");
  for (let i = 0; i < imgElements.length; i++) {
    console.log(imgElements[i].getAttribute("src"));
    randomImgSaved.push(imgElements[i].getAttribute("src"));
  }

  //Depending on the difficcult chosen it takes more time to the cards
  //to flip
  if (number == "2") {
    setTimeout(flip, 2000);
  } else if (number == "4") {
    setTimeout(flip, 3000);
  } else if (number == "6") {
    setTimeout(flip, 6000);
  }
}

/**
 * desc once generated the game table, this function
 * flip all the cards after a determined time, but doesn´t
 * flip the cards with the class "paired"
 * @date 2023-03-06
 */
function flip() {
  let backImg = "./Images/Cards/back.png";
  frontCards = document.querySelectorAll(".pic");

  for (let i = 0; i < printedCards; i++) {
    if (frontCards[i].classList.contains("paired")) {
      continue;
    } else {
      // console.log(frontCards[i])
      frontCards[i].src = backImg;
    }
  }
}

/**
 * desc
 * with the function cronometer controls the time left to
 * play the game
 * @date 2023-03-06
 * @param { * } difficult
 * @param { * } number
 */
function timer(difficult, number) {
  time = document.getElementById("time");

  const cards4 = 40; 
  const cards16 = 90;
  const cards36 = 180;
  // console.log(time.value);
  if (difficult == "1" && number == "2") {
    time.value = cards4;
    setInterval(cronometer, 1000);
  } else if (difficult == "1" && number == "4") {
    time.value = cards16;
    setInterval(cronometer, 1000);
  } else if (difficult == "1" && number == "6") {
    time.value = cards36;
    setInterval(cronometer, 1000);
  } else if (difficult == "2" && number == "2") {
    time.value = cards4 / 2;
    setInterval(cronometer, 1000);
  } else if (difficult == "2" && number == "4") {
    time.value = cards16 / 2;
    setInterval(cronometer, 1000);
  } else if (difficult == "2" && number == "6") {
    time.value = cards36 / 2;
    setInterval(cronometer, 1000);
  } else if (difficult == "3" && number == "2") {
    time.value = parseInt(cards4 / 3);
    setInterval(cronometer, 1000);
  } else if (difficult == "3" && number == "4") {
    time.value = cards16 / 3;
    setInterval(cronometer, 1000);
  } else if (difficult == "3" && number == "6") {
    time.value = cards36 / 3;
    setInterval(cronometer, 1000);
  }
}
function cronometer() {
  // time = document.getElementById("time");
  if (time.value > 0) {
    time.value -= 1;
  } else {
    time.value = 0;
  }
}

/**
 * desc
 * the main work of this function to listen the "click" event
 * and save info from the elements clicked into arrays
 * then call the gameEvents() function
 * @date 2023-03-08
 */
function play() {
  var allCardsImg = document.querySelectorAll(".pic");
  let cardsItem = randomImgSaved;

  flipped = 0;

  for (let i = 0; i < printedCards; i++) {
    const cardImg = allCardsImg[i];
    const cardItem = cardsItem[i];
    function reFlip() {
      cardImg.src = cardItem;
      selectedCardsSrc.push(cardImg.getAttribute("src"));
      selectedCardsId.push(cardImg.getAttribute("id"));
      selectedCardsClass.push(cardImg);

      flipped++;
      if (flipped >= 2) {
        gameEvents();
      }
    }
    if (time.value > 0) {
      cardImg.addEventListener("click", reFlip);
    }
    setInterval(() => {
      if (
        time.value == 0 ||
        allSelectedCardsSrc.length == randomImgSaved.length
      ) {
        cardImg.removeEventListener("click", reFlip);
      }
    }, 500);
  }
}

/**
 * desc
 * it´s work is to flip the cards to the front
 * and determine if are the same or not
 * if they are same increase the score and maintain them in that way
 * otherway the are flip again to show the back
 * @date 2023-03-08
 */
function gameEvents() {
  var score = document.getElementById("score");

  if (
    selectedCardsSrc[flipped - 1] == selectedCardsSrc[flipped - 2] &&
    selectedCardsSrc.length > 1
  ) {
    score.value = parseInt(score.value) + 5;
    for (let i = 0; i < selectedCardsSrc.length; i++) {
      allSelectedCardsSrc.push(selectedCardsSrc[i]);
      allCardsId.push(selectedCardsId[i]);
      allCardsClass.push(selectedCardsClass[i]);
      selectedCardsClass[i].classList.add("paired");
      // console.log(allCardsClass[i]);
      // console.log(selectedCardsClass[i]);
      // console.log(selectedCardsId);
      if (selectedCardsSrc.length > 2) {
        while (selectedCardsSrc.length > 0) {
          selectedCardsSrc.pop();
          selectedCardsId.pop();
          selectedCardsClass.pop();
        }
      }
    }
  } else if (flipped > 1) {
    turnsCounter();
    setTimeout(flip, 400);
    while (selectedCardsSrc.length > 0) {
      selectedCardsSrc.pop();
      selectedCardsId.pop();
      selectedCardsClass.pop();
    }
    flipped -= flipped;
  }
}

/**
 * desc
 * manage the number of turns that the user have left
 * @date 2023-03-14
 */
function turnsCounter() {
  turns = document.getElementById("turns");

  if (selectedCardsSrc[0] != selectedCardsSrc[1]) {
    turns.value -= 1;
    console.log("hola");
  }
}

/**
 * desc
 * depending on the difficult and number of cards the user will
 * have more or less turns
 * @date 2023-03-14
 */
function numberOfTurns() {
  turns = document.getElementById("turns");

  if (difficult == "1" && number == "2") {
    console.log("hola");
    turns.value = 4;
  } else if (difficult == "1" && number == "4") {
    turns.value = 16;
  } else if (difficult == "1" && number == "6") {
    turns.value = 36;
  } else if (difficult == "2" && number == "2") {
    turns.value = 3;
  } else if (difficult == "2" && number == "4") {
    turns.value = 12;
  } else if (difficult == "2" && number == "6") {
    turns.value = 28;
  } else if (difficult == "3" && number == "2") {
    turns.value = 2;
  } else if (difficult == "3" && number == "4") {
    turns.value = 8;
  } else if (difficult == "3" && number == "6") {
    turns.value = 18;
  }
}

/**
 * desc
 * finish the game if one of the cases happen
 * @date 2023-03-14
 */
function endGame() {
  if (time.value == 0 && !gameEnded) {
    document.getElementById("endGame").style.zIndex = "2";
    document.getElementById("finished").innerHTML = "YOU LOOSE :("
    document.getElementById("gameContainer").style.zIndex = "1";
    document.getElementById("newGame").addEventListener("click", (e) => location.reload());
    gameEnded = true;
  } else if (
    allSelectedCardsSrc.length == randomImgSaved.length &&
    !gameEnded
  ) {
    document.getElementById("endGame").style.zIndex = "2";
    document.getElementById("finished").innerHTML = "YOU WIN!";
    document.getElementById("gameContainer").style.zIndex = "1";
    document.getElementById("newGame").addEventListener("click", (e) => location.reload());
    gameEnded = true;
  }
  else if(turns.value == 0 && !gameEnded){
    document.getElementById("endGame").style.zIndex = "2";
    document.getElementById("finished").innerHTML = "YOU LOOSE :("
    document.getElementById("gameContainer").style.zIndex = "1";
    document.getElementById("newGame").addEventListener("click", (e) => location.reload());
    gameEnded = true;
  }
}

/*FUNCTIONS CALL*/
getUserData();

if (!dataCheck()) {
  location = "index.html";
}

userInfo();

gameGenerate();

numberOfTurns();

timer(difficult, number);
play();
// gameEvents();
setInterval(endGame, 200);
