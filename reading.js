var gameonging = 0;
var levelsel = 3;
var cnt;
var currentbest = -1;
var buffer 


$(document).ready(function() {
    $("#submmitbutton").hide();
});

function guiFunctionEndGame(max_score) {
    alert("Game Over!!!" + "Max Score is: " + max_score);
    sayname();
}

function guiFunctionScoreMessage(score) {
    currentbest = Math.max(score, currentbest);
    cnt -= 1;
    $("#statsbest").html('<h3> ' + currentbest + '</h3>');
    $("#statscnt").html('<h3> ' + cnt + '</h3>');
    var N = buffer.length;
    //for (var i = 0; i <= N - 1; i++) $('#res').append(" " + buffer[i] + " ");
    //$('#res').append(" " + score + " ");
    //$('#res').append('<br>');
    //
    
    // Logic to add Values and score on GUI
    var gameDiv = document.getElementById("gameArea");
    var tableRow = document.createElement("tr");
    tableRow.style.cssText = "border-spacing: 10px;boarder-collapse: seperate";
    for (var i = 0; i < N; i++) {
        var tableTD = document.createElement("td");
        var elementValue = document.createTextNode(buffer[i]);
        tableTD.appendChild(elementValue);
        var backgroundColor = "#748ea9";
        var bMessage = "padding: 10px; background-color: " + backgroundColor;
        tableTD.style.cssText =  bMessage;
        tableRow.appendChild(tableTD);
    }
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
         gameonging = 1;
         startGameMessage(values);

     } else {
     	gameonging = 0;
     	 $("#myform input").prop("disabled", false);
         $("#startbutton").html('Start!');
         $("#submmitbutton").hide();
         $("#sel").show();
         $("#sel2").show();

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
