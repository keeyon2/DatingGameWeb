var gameonging = 0;

$(document).ready(function() {
    $("#submmitbutton").hide();
});

function sayname() {
	if (gameonging === 0) {
    	var values = {};
         $.each($('#myform').serializeArray(), function(i, field) {
            values[field.name] = field.value;
         });
         console.log(values);
         $("#myform input").prop("disabled", true);
         $("#startbutton").html('Stop');
         $("#sel").hide();
         $("#sel2").hide();         
         // $("#sel").css('visibility','hidden');
         // $("#sel2").css('visibility','hidden');
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



function easyclick() {
    $('#col1' ).css('visibility','hidden');
    $('#col2').css('visibility','hidden');
    $('#col3').css('visibility','visible');
}

function mediumclick() {
    $('#col1').css('visibility','hidden');
    $('#col2').css('visibility','visible');
    $('#col3').css('visibility','visible');
}

function hardclick() {
    $('#col1').css('visibility','visible');
    $('#col2').css('visibility','visible');
    $('#col3').css('visibility','visible');
}