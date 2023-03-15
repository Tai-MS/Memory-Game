var nick;
var number;
var gameCharacter;
var difficult;


function userData(nick, number, characterContainer, difficult){
    sessionStorage.setItem('nick', nick.value);
    sessionStorage.setItem('number', number.value);
    sessionStorage.setItem('gameCharacter', characterContainer.src);
    sessionStorage.setItem('difficult', difficult.value);
}

function getUserData(){
    nick = sessionStorage.getItem('nick');
    number = sessionStorage.getItem('number');
    gameCharacter = sessionStorage.getItem("gameCharacter");
    difficult = sessionStorage.getItem('difficult')
}

function dataCheck(){
    if(nick == null){
        sessionStorage.setItem('error', "Complete the login");
        return false;
    }
    return true;
}

function userHistory(nick){
    let historicalStorage = localStorage.getItem('historical');
    let historical;
    
    if(historicalStorage == null){
        historical = [];
    }
    else{
        historical = JSON.parse(historicalStorage);
    }
    
    let userRegister = {
        user: nick.value,
        date: Date.now()
    }
    historical.push(userRegister)
    localStorage.setItem('historical', JSON.stringify(historical));
}