var fighters = [
    { 
    name: "Ken", 
    health: 100,
    attack: 25,
    counter: 25,
    images: ["assets/img/ken.png","assets/img/ken-defeated.png", "assets/img/ken-.png"]     
    },
    { 
    name: "Ryu",
    health: 100,
    attack: 25,
    counter: 25,
    images: ["assets/img/ryu.png","assets/img/ryu-defeated.png", "assets/img/ryu-.png"] 
    },
    {
     name: "Guile",
     health: 100,
     attack: 25,
     counter: 25,   
     images: ["assets/img/guile.png","assets/img/guile-defeated.png", "assets/img/guile-.png"] 
    },     
    {
        name: "Blanka",
        health: 150,
        attack: 25,
        counter: 25,   
        images: ["assets/img/blanka.png","assets/img/blanka-defeated.png", "assets/img/blanka.png"] 
       }     
]

var gameStarted = false;
var opponentNeeded = true;
var userPlayer = " ";
var userHealthReset;
var opponent;
var gameOver = false;

//function send user message
function start (){
    $(".user-message").text("Pick your player");    
}

start();

$(document).ready(function() {
    $(".unchosen-fighter").on("click", function() {
        //user picks player for first time.
        if(gameStarted===false){
            var userThat = this;
            playerSelect(userThat);
        }

    });

    $("#attack").on("click", function (){
        if(gameStarted===true && gameOver === false){
            fight();
        }

    });

});

function playerSelect(that){
    userPlayer = $(that).val();


    for (i=0; i<fighters.length; i++){
        if (fighters[i].name === userPlayer){
            userPlayer = fighters[i];
            userHealthReset = fighters[i].health;
            //changes user player name from string to fighter object
            fighters.splice(i,1);
            //removes user selected player from possible opponents
        }
    }

    //sets selected player icon display property to "none" to hide icon.  
    $(that).attr("class", "hide-icon");
    var selectedIMG = $("<img>");
    $(selectedIMG).attr("src", userPlayer.images[0]);
    $(selectedIMG).attr("class", "icon");
    $(".chosen-player").html(selectedIMG);
    $(".user-message").text("You are " + userPlayer.name);

    //sets opponent
    setOpponent();

    //googles gameStarted to true so that user is never prompted to pick player again.
    gameStarted=true;
}

function setOpponent(){

    //resets users health so that user's health is always max at beginning of fight.
    userPlayer.health = userHealthReset;
    
    //sets opponent to first remaining fighter and hides icon from available fighters.
    opponent= fighters[0];
    $("#" + opponent.name).attr("class", "hide-icon");

    //removes selected opponent from array.
    for (i=0; i<fighters.length; i++){
        if(fighters[i].name === opponent.name){
            fighters.splice(i,1);
        }
    }

    displayHealth();

    //removes opponent from visibility in available fighters.
    removeOpponent();
}

function fight(){
    displayHealth();

    //randomizes hitpoint values.
    opponent.health -= Math.floor(Math.random() *userPlayer.attack);
    
    if(opponent.health <= 0){

        $("#" + opponent.name +"-defeat").attr("class", "unhide-icon");
        if (fighters.length > 0){
            setOpponent();
        }
        else {
            var selectedIMG = $("<img>");
            $(selectedIMG).attr("src", userPlayer.images[0]);
            $(selectedIMG).attr("class", "hidden-icon");

            $(".chosen-opponent").html(selectedIMG);
            $(".user-message").text("You win");

            //ends game so user cannot continue pressing attack.
            gameOver=true;
        }
    }
    else{
        if(opponent.health > 0){

            //randomizes hitpoint values.
            var counterDamage = Math.floor(Math.random() *opponent.counter);
            userPlayer.health -= counterDamage;
            console.log(counterDamage);
        }    
        if(userPlayer.health <=0){
            $(".user-message").text("You lose");
            var selectedIMG = $("<img>");
            $(selectedIMG).attr("src", userPlayer.images[1]);
            $(".chosen-player").html(selectedIMG);

            //ends game so user cannot continue pressing attack.
            gameOver=true;
        }
    }
    displayHealth();
}

function removeOpponent(){
    var selectedIMG = $("<img>");
    $(selectedIMG).attr("src", opponent.images[0]);
    $(selectedIMG).attr("class", "icon");
    $(".chosen-opponent").html(selectedIMG);
}

function displayHealth (){

    //fixed bug that shows user with negative health when losing match.
    if(userPlayer.health < 0){
        $("#player-health").text("0");
    }else {
        $("#player-health").text(userPlayer.health);
    }

    //fixes bug that displays opponent with negative health.
    if(opponent.health < 0){
    $("#opponent-health").text("0");
    }else {
        $("#opponent-health").text(opponent.health);    
    }
}