/*
   Copyright (c) 2002 SHINTEC HOZUMI Co.,LTD.
   All Rights Reserved. 
*/


var g_objPopup = null;
var g_objSystemList = null;


function call_runOnLoadProc()
{
	try{

		showPrintButton( (getURLParam("print") == "yes") );


		var subPath = chkGPTitleExist("./system/title-gp.xml");
		var pathPS = chkPSTitleExist("./system/title-ps.xml");
		g_objSystemList = new TitleList("./system/title.xml"
										, TITLE_TYPE_SYSTEM
										, subPath
										, pathPS);

		setGPTitleExist();
		setPSTitleExist();
	}
	catch( e ){
		window.alert(e.description);
	}
}



function setGPTitleExist()
{
	var fncSetGpFlg = parent.setLoadedGpListFlag;
	if(typeof fncSetGpFlg == "function"){
		fncSetGpFlg(g_objSystemList.objGpList.loaded);
	}
}



function setPSTitleExist()
{
	var fncSetPsFlg = parent.setLoadedPsListFlag;
	if(typeof fncSetPsFlg == "function"){
		if(g_objSystemList.objPSList != null){
			fncSetPsFlg(g_objSystemList.objPSList.loaded);
		}
		else{
			fncSetPsFlg(false);
		}
	}
}



function chkGPTitleExist(path)
{
	var fncGetFlg = parent.getLoadedGpListFlag;
	if(parent.getURLParam("globalnavi") == "no" || (typeof fncGetFlg == "function" && fncGetFlg() == false)){
		return "";	
	}
	return path;
}



function chkPSTitleExist(path)
{
	var fncGetFlg = parent.getLoadedPsListFlag;
	if(parent.getURLParam("globalnavi") == "no" || (typeof fncGetFlg == "function" && fncGetFlg() == false)){
		return "";	
	}
	return path;
}



function call_runOnClickLocation()
{
	try{
		showMenu("location");
	}
	catch( e ){
		window.alert(e.description);
	}
}

function call_runOnClickDiagram()
{
	try{
		showPopUpObject(window.event.srcElement, document.all("Diagram"));
	}
	catch( e ) {
		window.alert(e.description);
	}
}

function call_runOnClickList()
{
	try{
		showPopUpObject(window.event.srcElement, document.all("List"));
	}
	catch( e ) {
		window.alert(e.description);
	}
}

function call_runOnClickIntro()
{
	try{
		showIntro();
	}
	catch( e ){
		window.alert(e.description);
	}
}


function call_runOnClickPopUpItem(srcObj)
{
	try{
		switch( srcObj.id ){
			case "diag_overall":
				showMenu("overall");
				break;
			
			case "diag_system":
				showMenu("system");
				break;
			
			case "diag_ps":
				showDiagram4PS();
				break;
			
			case "diag_gp":
				showDiagram4GP();
				break;
			
			case "list_ps":
				showPsMatrix();
				break;
			
			case "list_conn":
				showConnList();
				break;
			
			default:
				confirm(srcObj.id);
				break;
		}
		
		hidePopUpObject();
	}
	catch( e ) {
		window.alert(e.description);
	}
}

function call_runOnMouseOver(obj)
{

	obj.className = "popup-item-hover";
}

function call_runOnMouseOut(obj)
{

	obj.className = "popup-item";
}








function call_runOnClickTop()
{
	try{
		var paramTable = makeParamTable();
		appendRequiredParam(paramTable, top);
		

		top.window.navigate("../../index.html" + makeParamString(paramTable));
	}
	catch( e ){
		window.alert(e.description);
	}
}



function call_runOnClickBack()
{
	try{
		var winMain = parent.d_mainframe;
		if(winMain.location.pathname.search(/intro.index.html$/i) != -1){
			if(winMain.d_contents.location.pathname.search(/intro.top.xml$/i) != -1){
				showMenu("system");
			} else {
				showIntro();
			}
		}
		else if(winMain.location.pathname.search(/howto.index.html$/i) != -1){
			showIntro();
		}

		else if(winMain.location.pathname.search(/overall.pdf..+.pdf$/i) != -1){
			showMenu("overall");
		}

		else if(winMain.getURLParam("ewd_type") == "system"){
			showMenu("system");
		}

		else if(winMain.getURLParam("ewd_type") == "routing" ||
				winMain.getURLParam("ewd_type") == "relay"){
			showMenu("location");
		}

		else if(winMain.getURLParam("category") == "location" ||
				winMain.getURLParam("category") == "overall"  ||
				winMain.getURLParam("category") == "ps"  ||
				winMain.getURLParam("category") == "gp"){
			showMenu("system");
		}

		else if(winMain.getURLParam("category") == "system"){
			call_runOnClickTop();
		}


		else{
			var paramTable = makeParamTable();
			appendRequiredParam(paramTable, top);
			top.window.navigate("../index.html" + makeParamString(paramTable));
		}
	}
	catch( e ){
		window.alert(e.description);
	}
}


function call_runOnClickNew()
{
	try{


		window.open("../../index.html" , "_blank", "width=950, height=620, top=16, left=16, resizable=yes");
	}
	catch( e ){
		window.alert(e.description);
	}
}


function call_runOnClickPrint()
{
	try{
		showPrintWindow();
	}
	catch( e ){
		window.alert(e.description);
	}
}






function createPopUpObject()
{
	g_objPopup = window.createPopup();
	g_objPopup.document.createStyleSheet("../styles/popup.css");
}

function showPopUpObject(objSrc, objDisp)
{
	createPopUpObject();
	
	g_objPopup.document.body.innerHTML = objDisp.innerHTML;
	
	var objTags = g_objPopup.document.all.tags("a");
	

	var width  = document.all("val-popup-width").value;
	var height = document.all("val-popup-height").value * objTags.length;
	
	g_objPopup.show(5, 15, width, height, objSrc);
}

function hidePopUpObject()
{
	g_objPopup.hide();
}

function showIntro()
{
	parent.d_mainframe.window.navigate("../intro/index.html");
}


function showMenu( category )
{
	var paramTable = makeParamTable();
	appendRequiredParam(paramTable, top);
	paramTable.put("category", category);
	if( parent.d_mainframe == null ) return;
	parent.d_mainframe.window.navigate("./menu/category_frame.html" + makeParamString(paramTable) );
}

function showDiagram( titleType, titleCode )
{
	var paramTable = makeParamTable();
	appendRequiredParam(paramTable, top);
	paramTable.put("ewd", titleCode);
	paramTable.put("ewd_type", titleType);
	parent.d_mainframe.window.navigate("./common/fig_frame.html" + makeParamString(paramTable) );
}

function showPsMatrix()
{
	var paramTable = makeParamTable();
	appendRequiredParam(paramTable, top);
	paramTable.put("loads","ps");
	
	parent.d_mainframe.window.navigate( "./loads/matrix.html" + makeParamString(paramTable) );
}


function showConnList()
{
	var strWait = "Please Wait...";
	
	switch(g_objSystemList.getLang()){
		case "de":	strWait = "Bitte warten.";	break;
		case "es":	strWait = "Espere, por favor."; break;
		case "fr":	strWait = "Prière d'attendre."; break;
	}
	
	var strHTML = "<html><head><link rel='stylesheet' type='text/css' href='../styles/contents.css'/></head>";
	strHTML += "<body>";
	strHTML += "<div id='d_msg' name='d_msgWait'>\n<h5 style='margin: 50px 30px;'>\n"+ strWait + "\n</h5>\n</div>\n";
	strHTML += "</body></html>";

	parent.d_mainframe.window.document.write(strHTML);
	window.setTimeout("showConnListMain()", 1);

}

function showConnListMain()
{
	var paramTable = makeParamTable();
	appendRequiredParam(paramTable, top);
	
	parent.d_mainframe.window.navigate( "./connector/parts.html" + makeParamString(paramTable) );
}




function showDiagram4PS()
{

	if( g_objSystemList.objPSList.loaded ){
		showMenu("ps");
	}
	else{
		var PS_FIG = "PS";
		var titleObj = g_objSystemList.getTitleObjByBaseFig(PS_FIG);
		
		showDiagram("system", titleObj.getCode());
	}
}


function showDiagram4GP()
{
	if( g_objSystemList.objGpList.loaded ){
		showMenu("gp");
	}
	else{
		showDiagram("system", "GP");
	}
}





function showPrintButton( flgShow )
{
	if( flgShow ){
		document.all("printBtn").style.visibility = "visible";
	} else {
		document.all("printBtn").style.visibility = "hidden";
	}
}
