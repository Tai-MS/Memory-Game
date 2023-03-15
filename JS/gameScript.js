var panelSize;
var classMark;//
var idInterval;//
var difficult;
var number;
var timeInterval;//
var numberOfCards;
var cardItems;
var backItems;
var randomImgSaved = [];
var cardsFlipped = [];
var flippedCards = [];
var score;

/**
 * desc
 * @date 2023-03-03
 * took the index.html user info
 */
function fillUserForm(){
    document.getElementById("nick").value = nick;
    document.getElementById("gameCharacter").src = gameCharacter;
    panelSize = parseInt(number);
}

function getRandomInt(max){
    return Math.floor(Math.random() * max);
}

/**
 * desc
 * @date 2023-03-03
 * with the random function and all the images generate the game table
 * and let a limited time to the player to see the cards
 */
function gameGenerate(){
    document.getElementById("game").style.gridTemplateColumns = "repeat("+number+", 1fr)";
    document.getElementById("game").style.gridTemplateRows = "repeat("+number+", 1fr)";

    let items = "";
    let randomCard = 0;

    numberOfCards = parseInt(number) * parseInt(number);
    
    var randomImg = new Array();
    randomImg[0] = "/PROYECTO FINAL/Images/Cards/Villains/freezer.png";
    randomImg[1] = "/PROYECTO FINAL/Images/Cards/Heroes/krillin.jpg";
    randomImg[2] = "/PROYECTO FINAL/Images/Cards/Villains/cell.jpg";
    randomImg[3] = "/PROYECTO FINAL/Images/Cards/Heroes/piccoro.jpg";
    randomImg[4] = "/PROYECTO FINAL/Images/Cards/Villains/dragonOscuro.png";
    randomImg[5] = "/PROYECTO FINAL/Images/Cards/Heroes/trunks.jpg";
    randomImg[6] = "/PROYECTO FINAL/Images/Cards/Villains/moro.png";
    randomImg[7] = "/PROYECTO FINAL/Images/Cards/Heroes/yamcha.jpg";

    /**
     * the loop goes through the array randomImg (with all the images)
     * then select random indexs of the array an save them into the
     * const imgSrc
     * later create an HTML element with it and save it on the array
     */
    for(let index = 0; index < numberOfCards; index++){
        randomCard = getRandomInt(8);
        const imgSrc = randomImg[randomCard];
        items += `<div class="containerItem"><div><img src="${randomImg[randomCard]}" class="pic" id="algo"></div></div>`;
        randomImgSaved.push(imgSrc);  
    }

    document.getElementById("game").innerHTML = items;

    setTimeout(flip, 3000);
}

/**
 * desc
 * @date 2023-03-03
 * uses to flip the cards after a certain time, it depends on it 
 * difficults
 */
function flip(){
    backItems = "/PROYECTO FINAL/Images/Cards/back.png";
    let cards = document.querySelectorAll(".pic");
    
    for(let index = 0; index < numberOfCards; index++){      
        // if(flippedCards.includes(cards[index].src)){
        //     continue;
        // }
        // else if(flippedCards.length > 0){
        //     for(let flippedCard of flippedCards){
        //         if(cards[index].src === flippedCard){
        //             continue;
        //         }
        //     }
        // }
        
        
        if(flippedCards.length > 0){
            for(let flippedCard of flippedCards){
                flippedCards[flippedCard] = flippedCard;
                console.log(flippedCards[flippedCard]);
            }
        }
        cards[index].src = backItems;
        
    }
}

/**
 * desc
 * @date 2023-03-03
 * @param { * } difficult
 * @param { * } number
 * The functions takes the parameters from the form in index.html
 * with them determine the number of cards and time to play
 */
function difficultTime(difficult, number){
    const time = document.getElementById("time");
    
    const fourCardsTime = 40;
    const sixTeenCardsTime = 120;
    const thirtySixCardsTime = 240;

    if (difficult == "1" && number == "2"){
        time.value = fourCardsTime;
        setInterval(timer, 1000)
    }
    else if(difficult == "1" && number == "4"){
        time.value = sixTeenCardsTime;
        setInterval(timer, 1000)
    }
    else if(difficult == "1" && number == "6"){
        time.value = thirtySixCardsTime;
        setInterval(timer, 1000)
    }
    else if(difficult == "2" && number == "2"){
        time.value = fourCardsTime / 2;
        setInterval(timer, 1000)
    }
    else if(difficult == "2" && number == "4"){
        time.value = sixTeenCardsTime / 2;
        setInterval(timer, 1000)
    }
    else if(difficult == "2" && number == "6"){
        time.value = thirtySixCardsTime / 2;
        setInterval(timer, 1000)
    }
    else if(difficult == "3" && number == "2"){
        time.value = parseInt(fourCardsTime / 3);
        setInterval(timer, 1000)
    }
    else if(difficult == "3" && number == "4"){
        time.value = sixTeenCardsTime / 3;
        setInterval(timer, 1000)
    }
    else{
        time.value = thirtySixCardsTime / 3;
        setInterval(timer, 1000)
    }
}

/**
 * desc
 * control the time left to play
 * @date 2023-03-04
*/
function timer(){
    const time = document.getElementById("time");
    if(time.value > 0){
        time.value -= 1;
    }
    else{
        time.value = 0;
    }
}

/**
 * desc
 * when the player press over a card turns it up as 
 * it was before turning down
 * @date 2023-03-04
 */
function reFlip(){
    cardItems = document.querySelectorAll(".pic");
    let cards = randomImgSaved;

    console.log(cards);
    flipped = 0;
    /**
     * using the array randomImgSaved with the src ,used before the
     * flip function, makes a loop to go through it and all the labels
     * with the ".pic" class, then with the eventListener it knows when
     * and where i "click" and change the src from that image to the 
     * generated in the origin (gameGenerate function)
     */
    for(let i = 0; i < numberOfCards; i++){
        const cardItem = cardItems[i];
        const card = cards[i];
            
        cardItem.addEventListener("click", function() {
            // console.log(card);
            cardItem.src = card;
            cardsFlipped.push(cardItem.getAttribute("src"))
            // console.log(cardsFlipped);
            flipped++;
            // console.log(flipped);
            
            if(flipped == 2 || flipped > 2){
                gameEvents();
            }
            
        })
    }
}

function gameEvents(){
    score = document.getElementById("score");
    console.log(cardsFlipped[flipped - 1]);
    if(cardsFlipped[flipped - 1] == cardsFlipped[flipped - 2]){
        score.value = parseInt(score.value) + 5;
        for(let i of cardsFlipped){
            flippedCards.push(i);  
        }
    }
    else{
        setInterval(flip(), 1500);
        // flipped -= 2;
        // cardsFlipped.splice(-2);
    }
    
}

function notFlip(){

}

/*ALL FUNCTIONS CALL*/ 
getUserData();

if(!dataCheck()){
    location = "index.html";
}

fillUserForm();

gameGenerate();

difficultTime(difficult, number);

reFlip();