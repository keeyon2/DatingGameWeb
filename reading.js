var gameonging = 0;
var levelsel = 3;
var cnt;
var currentbest = -1;
var buffer 


$(document).ready(function() {
    $("#submmitbutton").hide();
});

function removeRes() {
    $('.scoreTable').remove();
}

function guiFunctionEndGame(max_score) {
    alert("Game Over!!!" + "Max Score is: " + max_score);
    removeRes();
    sayname();
}

function guiFunctionScoreMessage(score) {
    currentbest = Math.max(score, currentbest);
    cnt -= 1;
    $("#statsbest").html('<h3> ' + currentbest + '</h3>');
    $("#statscnt").html('<h3> ' + cnt + '</h3>');
    var N = buffer.length;
    
    // Logic to add Values and score on GUI
    var gameDiv = document.getElementById("gameArea");
    var tableRow = document.createElement("tr");
    tableRow.className = "scoreTable";
    tableRow.style.cssText = "border-spacing: 10px;boarder-collapse: seperate";
    for (var i = 0; i < N; i++) {
        var tableTD = document.createElement("td");
        var elementValue = document.createTextNode(buffer[i]);
        tableTD.appendChild(elementValue);
        var RGBValue = calculateColorValue(buffer[i]);
        var backgroundColor = "rgb(" + RGBValue + "," + RGBValue +
            "," + RGBValue + ")";
        var bMessage = "padding: 10px; background-color: " + backgroundColor;
        console.log("The css style string is:");
        console.log(bMessage);
        tableTD.style.cssText =  bMessage;
        tableRow.appendChild(tableTD);
    }
    
    var tableTD = document.createElement("td");
    var elementValue = document.createTextNode(score);
    tableTD.appendChild(elementValue);
    var RGBValue = calculateColorValue(Math.abs(score));
    var backgroundColor = "rgb(" + RGBValue + "," + RGBValue +
        "," + RGBValue + ")";

    if (score > 0) {
        backgroundColor = "rgb(0," + RGBValue + ",0)";
    }
    else {
        backgroundColor = "rgb(" + RGBValue + ",0,0)";
    }
    var bMessage = "padding: 10px; background-color: " + backgroundColor;
    tableTD.style.cssText =  bMessage;
    tableRow.appendChild(tableTD);
    gameDiv.appendChild(tableRow);
}

function sayname() {
	if (gameonging === 0) {
    	var values = {};
         $.each($('#myform').serializeArray(), function(i, field) {
            values[field.name] = field.value;
         });
         if (values['playername'] === undefined || values['playername'] === "") {
            values['playername'] = "Player1"
         }
         if (values['level'] === undefined) {
            values['level'] = 3;
         }
         values['level'] =  parseInt(values['level'])
         values['turns'] = parseInt(values['turns']);
         //console.log(values);
         $("#myform input").prop("disabled", true);
         $("#startbutton").html('Stop');
         $("#sel").hide();
         $("#sel2").hide();         
         $("#submmitbutton").show();
         $('#stats').css('visibility','visible');
         cnt = values['turns'];
         currentbest = -1;
          $("#statsbest").html('<h3> ' + -1 + '</h3>');
          $("#statscnt").html('<h3> ' + cnt + '</h3>'); 
         $("#statsplayername").html('<h3>' + values['playername'] + '</h3>');
         if (values['level'] === 1)
             $("#statslevel").html('<h3> Easy </h3>');
        if (values['level'] === 2)
             $("#statslevel").html('<h3> Medium </h3>');
        if (values['level'] === 3)
             $("#statslevel").html('<h3> Hard </h3>');

        $('#res').css('visibility','visible');
        var gameDiv = document.getElementById("gameArea");
        var tableRow = document.createElement("tr");
        tableRow.className = "scoreTable";
        tableRow.style.cssText = "border-spacing: 10px;boarder-collapse: seperate";
        var N = values['level'] * 5;
        for (var i = 0; i <= N; i++) {
            var tableTD = document.createElement("td");
            var elementValue;
            if (i < N)
                elementValue = document.createTextNode(i + 1);
            else 
                elementValue = document.createTextNode("Score");
            tableTD.appendChild(elementValue);
            var RGBValue = calculateColorValue(0.5);
            var backgroundColor = "rgb(" + RGBValue + "," + RGBValue +
            "," + RGBValue + ")";
            var bMessage = "padding: 10px; background-color: " + backgroundColor;
            console.log("The css style string is:");
            console.log(bMessage);
            tableTD.style.cssText =  bMessage;
            tableRow.appendChild(tableTD);
        }     
         tableRow.appendChild(tableTD);
         gameDiv.appendChild(tableRow);
         gameonging = 1;
         startGameMessage(values);

     } else {
     	gameonging = 0;
         $('#stats').css('visibility','hidden');
     	 $("#myform input").prop("disabled", false);
         $("#startbutton").html('Start!');
         $("#submmitbutton").hide();
         $("#sel").show();
         $("#sel2").show();
         removeRes();
       // gameoverMessage();
     }
}

function submity() {
    var scorestmp = {};
    $.each($('#coreform').serializeArray(), function(i, field) {
            scorestmp[field.name] = field.value;
    });    
    var scores = {};
    scores['values'] = [];
    for (var i = 1; i <= 5; i += 1) {
        var tmpstr = "attr" + i;
        scores['values'].push(parseFloat(scorestmp[tmpstr]));
    }
    if (levelsel >= 2) {
        for (var i = 6; i <= 10; i += 1) {
            var tmpstr = "attr" + i;
            scores['values'].push(parseFloat(scorestmp[tmpstr]));
        }
    }
    if (levelsel >= 3) {
        for (var i = 11; i <= 15; i += 1) {
            var tmpstr = "attr" + i;
            scores['values'].push(parseFloat(scorestmp[tmpstr]));
        }
    }
    buffer = scores['values'];
    $('#submmitbutton').blur();
    //console.log(scores);
    turnMessage(scores);
}

function calculateColorValue(value) {
    var inverseValue = 1 - value;
    console.log("Inverse value: " + inverseValue);
    var finalV = Math.floor(inverseValue * 120);
    console.log("Value after Floor: " + finalV);

    return Math.floor(finalV + 112);
}

function easyclick() {
    levelsel = 1;
    $('#col1' ).css('visibility','hidden');
    $('#col2').css('visibility','hidden');
    $('#col3').css('visibility','visible');
}

function mediumclick() {
    levelsel = 2;
    $('#col1').css('visibility','hidden');
    $('#col2').css('visibility','visible');
    $('#col3').css('visibility','visible');
}

function hardclick() {
    levelsel = 3;
    $('#col1').css('visibility','visible');
    $('#col2').css('visibility','visible');
    $('#col3').css('visibility','visible');
}
