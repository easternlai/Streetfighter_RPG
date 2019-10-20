# Streetfighter_RPG

##By Eastern Lai

##Tecnologies Used

1. HTML
2. CSS
3. Github
4. visual studio code
5. Git Bash
6. JQuery
7. JavaScript 


Functions used

```
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

```