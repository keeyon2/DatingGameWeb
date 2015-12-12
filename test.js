function sayname() {
	var values = {};
     $.each($('#myform').serializeArray(), function(i, field) {
        values[field.name] = field.value;
     });
    alert(values['playername']);
}
