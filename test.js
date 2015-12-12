function sayname() {
	var values = {};
     $.each($('#myform').serializeArray(), function(i, field) {
        values[field.name] = field.value;
     });
     console.log(values);
     if (values['playername'] != null && values['playername'] === ""){
         values['playername'] = "Player 1";
     }
    alert(values['playername']);
}
