var fighters = [
    { 
    name: "Ken", 
    health: 100,
    attack: 25,
    counter: 10,
    images: ["assets/img/ken.png","assets/img/ken-defeated.png"]     
    },
    { 
    name: "Ryu",
    health: 120,
    attack: 25,
    counter: 10,
    images: ["assets/img/ryu.png","assets/img/ryu-defeated.png"] 
    },
    {
     name: "Guile",
     health: 100,
     attack: 25,
     counter: 10,   
     images: ["assets/img/guile.png","assets/img/guile-defeated.png"] 
    }     
]

var gameStarted = false;
var opponentNeeded = true;

var playerHealth = 0;
var opponentHealth = 0;
var userPlayer = " ";
var opponent;

function start (){
    $(".user-message").text("Pick your player");    
}

start();

$(document).ready(function() {
    $(".unchosen-fighter").on("click", function() {

        if(gameStarted===false){
            var userThat = this;
            playerSelect(userThat);
        }
        else if(opponentNeeded===true){
            var oppThat = this;
            setOpponent(oppThat);
        }
       
    

    });
});

function playerSelect(that){
    userPlayer = $(that).val();
    $(that).attr("class", "hide-icon");
    var selectedIMG = $("<img>");
    $(selectedIMG).attr("src", "assets/img/" + userPlayer + ".png");
    $(".chosen-player").append(selectedIMG);

    for (i=0; i<fighters.length; i++){
        if (fighters[i].name === userPlayer){
            userPlayer = fighters[i];
            //changes user player name from string to fighter object
            fighters.splice(i,1);
            //removes user selected player from possible opponents
        }
    }
    gameStarted=true;
}

function setOpponent(that){
    opponent = $(that).val(); 
    $(that).attr("class", "hide-icon");
    var selectedIMG = $("<img>");
    $(selectedIMG).attr("src", "assets/img/" + opponent + ".png");
    $(".chosen-opponent").append(selectedIMG);

    for (i=0; i<fighters.length; i++){
        if(fighters[i].name === opponent){
            opponent = fighters[i];
            fighters.splice(i,1);
        }
    }
    opponentNeeded = false;    
}

