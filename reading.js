var gameonging = 0;
var levelsel = 3;

$(document).ready(function() {
    $("#submmitbutton").hide();
});

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
         values['attributes'] = parseInt(values['attributes']);
         console.log(values);
         $("#myform input").prop("disabled", true);
         $("#startbutton").html('Stop');
         $("#sel").hide();
         $("#sel2").hide();         
         $("#submmitbutton").show();

         gameonging = 1;
     } else {
     	gameonging = 0;
     	 $("#myform input").prop("disabled", false);
         $("#startbutton").html('Start!');
         $("#submmitbutton").hide();
         $("#sel").show();
         $("#sel2").show();
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
    console.log(scores);
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