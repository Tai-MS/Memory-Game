var nickInput;
var select;
var difficult;
var login;
var error;
var characterItem;
var itemImg;
var characterContainer;

function checkForm(event){
    if(nickInput.value.match(/(?<!\S)[0-9]/)){
        nickInput.focus();
        event.preventDefault();
        error.innerText = "The name must begin with a letter";
        return false;
    }
    else if(select.value == "0"){
        select.focus();
        event.preventDefault();
        error.innerText = "Select the number of cards";
    }
    
    userData(nickInput, select, characterContainer, difficult);
    userHistory(nickInput);
    return true;
}

function movingImg(event){
    itemImg = event.target;
    console.log(itemImg.src);
    console.log(difficult.value);
}

function changeImg(event){
    characterContainer.src = itemImg.src;
}


function loadedDom(){
    nickInput = document.getElementById("nick");
    select = document.getElementById("number");
    difficult = document.getElementById("difficult");
    login = document.getElementById("login");
    error = document.getElementById("error");

    if(sessionStorage.getItem('error') != null){
        error.innerText = sessionStorage.getItem('error');
        sessionStorage.removeItem('error');
    }

    login.addEventListener("submit", checkForm);

    characterItem = document.getElementsByClassName("characterImgItem");
    for(let item of characterItem){
        item.addEventListener("dragstart", movingImg);
    }

    characterContainer = document.getElementById("characterImg");
    characterContainer.addEventListener("dragover", e => {
        e.preventDefault();
    })
    characterContainer.addEventListener("drop", changeImg);
}

document.addEventListener("DOMContentLoaded", loadedDom);