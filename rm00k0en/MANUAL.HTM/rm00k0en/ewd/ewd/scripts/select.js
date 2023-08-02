


var g_flgPopup = false;


function call_runOnClickTop()
{
	window.open("../../../index2.html", "_top");
	
	hidePopup();
}


function call_runOnClickBack()
{

	parent.winMain.history.back();
	
	hidePopup();
}


function call_runOnClickNew()
{
	window.open("../../../index2.html", "_blank");
	
	hidePopup();
}

function call_runOnClickPrint()
{
	if( parent.winMain.getPrintPath != null ){
		var path = parent.winMain.getPrintPath("./");
		var winPrint = window.open(path, "PrintWindow", "width=600,height=480");
		

	}
	
	hidePopup();
}




function call_runOnClickLocation()
{
	showMenu("location");
	
	hidePopup();
}

function call_runOnClickDiagram()
{
	if( g_flgPopup ){
		hidePopup();
	}
	else{
		showPopupDiagram();
	}
}

function call_runOnClickList()
{
	if( g_flgPopup ){
		hidePopup();
	}
	else{
		showPopupList();
	}
}

function call_runOnClickIntro()
{
	showMenu("intro");
	
	hidePopup();
}

function call_runOnClickPopupItem(code)
{
	switch( code )
	{
		case "diag_system":
			showMenu("system");
			break;
			
		case "diag_ps":
			showPS();
			break;
			
		case "diag_gp":
			showGP();
			break;
			
		case "diag_overall":
			showMenu("overall");
			break;
			
		case "list_conn":
			showListConn();
			break;
			
		case "list_ps":
			showListPS();
			break;
			
	}
	
	hidePopup();
}


function showPopupDiagram()
{
	var objPopup;
	if( isNetscape4() ){
		objPopup = document.layers["d_divPopupDiagram"];
		objPopup.top  = 5;
		objPopup.left = (window.innerWidth / 3) + 50;
		objPopup.visibility = "show";
	}
	else{
		objPopup = document.getElementById("d_divPopupDiagram");
		objPopup.style.visibility = "visible";
	}
	
	g_flgPopup = true;
}

function showPopupList()
{
	var objPopup;
	if( isNetscape4() ){
		objPopup = document.layers["d_divPopupList"];
		objPopup.top  = 5;
		objPopup.left = (window.innerWidth / 3) + 170;
		objPopup.visibility = "show";
	}
	else{
		objPopup = document.getElementById("d_divPopupList");
		objPopup.style.visibility = "visible";
	}
	
	g_flgPopup = true;
}

function hidePopup()
{
	var objPopup;
	if( isNetscape4() ){
		objPopup = document.layers["d_divPopupDiagram"];
		objPopup.visibility = "hidden";
		
		objPopup = document.layers["d_divPopupList"];
		objPopup.visibility = "hidden";
	}
	else{
		objPopup = document.getElementById("d_divPopupDiagram");
		objPopup.style.visibility = "hidden";
		
		objPopup = document.getElementById("d_divPopupList");
		objPopup.style.visibility = "hidden";
	}
	
	g_flgPopup = false;
}





function showMenu( strMenuID )
{
	switch( strMenuID )
	{
		case "location":
			window.open("./menu/location/title/title.html", "winMain");
			break;
		
		case "system":
			window.open("./menu/system/index.html", "winMain");
			break;
		
		case "overall":
			window.open("./menu/overall/index.html", "winMain");
			break;
		
		case "gp":
			window.open("./menu/gp/title/title.html", "winMain");
			break;

		case "ps":
			window.open("./menu/ps/title/title.html", "winMain");
			break;

		case "intro":
			window.open("../intro/top.html", "winMain");
			break;
		
	}
}



function showPS()
{
	var objForm = window.document.forms[0];
	var code = objForm.elements["ps-code"].value;
	if( code != "" ){
		showMap(code, "system");
	}
	else{
		showMenu("ps");
	}
}

function showGP()
{
	var objForm = window.document.forms[0];
	var code = objForm.elements["gp-code"].value;
	
	if( code != "" ){
		showMap(code, "system");
	}
	else{
		showMenu("gp");
	}
}

function showMap( code, map )
{
	var url = "./" + map + "/main/" + code + ".html";
	window.open(url, "winMain");
}

function showListConn()
{
	window.open("./connector/index.html", "winMain");
}

function showListPS()
{
	window.open("./loads/ps_capacity.html", "winMain");
}
