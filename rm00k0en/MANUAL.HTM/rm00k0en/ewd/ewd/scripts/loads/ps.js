


function call_runOnClickOrderCapacity()
{
	window.open("ps_capacity.html", "_self");
}

function call_runOnClickOrderName()
{
	window.open("ps_name.html", "_self");
}



function call_runOnClickBlockBtn( code )
{
	if( code.indexOf("C:") == 0 ){
		var tmpArray =  code.split("+");
		var url = "../routing/main/" + tmpArray[1] + ".html";
	}else{
		var url = "../relay/main/" + code + ".html";
	}

	showMap( url );
}



function showMap( url )
{
	window.open(url, "_self");
}




function getPrintPath(relativePath)
{
	var objHdnOrder = document.forms[0].hdnOrder;
	
	var path;
	switch( objHdnOrder.value ){
		case "capacity":
			path = "loads/ps_capacity_print_frame.html";
			break;
		case "name":
			path = "loads/ps_name_print_frame.html";
			break;
	}
	
	return relativePath + path;
}
