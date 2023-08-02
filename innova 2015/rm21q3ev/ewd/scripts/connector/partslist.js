/*
   Copyright (c) 2002 SHINTEC HOZUMI Co.,LTD.
   All Rights Reserved. 
*/

var DISP_NAME = "name";
var DISP_CODE = "code";
var DISP_PNO = "pno";

var PARTS_XML_NAME = "parts.xml";
var PARTS_XML_CODE = "partscode.xml";
var PARTS_XML_NO = "connlist.xml";
var PARTS_XSL_NO = "../../styles/connector/connNoList.xsl";

var g_dispMode;

var g_ewdPartsList;

var g_connNoListXml = null;
var g_connNoListXsl = null;



function call_runOnLoadProc()
{

	try{
		var sort = getURLParam("parts_sort");
		var search_key = getURLParam("search_key");
		var search_mode = getURLParam("search_mode");
		

		if( search_key == null ){
			if( sort == "code" )
				self.window.navigate("partslist_code.html" + window.location.search );
			else
				self.window.navigate("partslist_name.html" + window.location.search );
			return;
		}
		

		if( sort == "code" ){
			g_dispMode = DISP_CODE;
			g_ewdPartsList = new EwdPartsList(PARTS_XML_CODE);
		}
		else {
			g_dispMode = DISP_NAME;
			g_ewdPartsList = new EwdPartsList(PARTS_XML_NAME);
		}
		showList(search_key);
		
		

		var ewdItemCode = getURLParam("code");
		var ewdItemType = getURLParam("type");
		if( ewdItemCode != null ){
			ewdItemCode = ewdItemCode.replace(/\x2B/g, ",");
			setSelectedItemStyleByCode(ewdItemCode, ewdItemType);
		}
	}
	catch( e ){
		window.alert(e.description);
	}
}



function call_runOnLoadProcForNameList()
{
	try{
		g_dispMode = DISP_NAME;
		g_ewdPartsList = new EwdPartsList(PARTS_XML_NAME);
		

		var ewdItemCode = getURLParam("code");
		var ewdItemType = getURLParam("type");
		if( ewdItemCode != null ){
			ewdItemCode = ewdItemCode.replace(/\x2B/g, ",");
			setSelectedItemStyleByCode(ewdItemCode, ewdItemType);
		}
	}
	catch( e ){
		window.alert(e.description);
	}
}


function call_runOnLoadProcForCodeList()
{
	try{
		g_dispMode = DISP_CODE;
		g_ewdPartsList = new EwdPartsList(PARTS_XML_CODE);
		

		var ewdItemCode = getURLParam("code");
		var ewdItemType = getURLParam("type");
		if( ewdItemCode != null ){
			ewdItemCode = ewdItemCode.replace(/\x2B/g, ",");
			setSelectedItemStyleByCode(ewdItemCode, ewdItemType);
		}
	}
	catch( e ){
		window.alert(e.description);
	}
}


function call_runOnLoadProcForPartNoList()
{
	try{
		g_dispMode = DISP_PNO;

		if( g_connNoListXml == null )	g_connNoListXml = loadXML(PARTS_XML_NO);
		if( g_connNoListXsl == null )	g_connNoListXsl = loadXML(PARTS_XSL_NO);

		document.body.innerHTML = g_connNoListXml.transformNode(g_connNoListXsl);

	}
	catch( e ){
		window.alert(e.description);
	}
}

function call_runOnMouseOver(){
	try{
		var obj = window.event.srcElement;
		if( obj.className == "menu_active" ) return;
		
		obj.className = "menu_hover";
	}
	catch( e ){
		window.alert(e.description);
	}
}

function call_runOnMouseOut(){
	try{
		var obj = window.event.srcElement;
		if( obj.className == "menu_active" ) return;
		
		obj.className = "menu";
	}
	catch( e ){
		window.alert(e.description);
	}
}

function call_runOnClickItem()
{
	try{

		var obj = window.event.srcElement;
		resetItemStyle();
		setSelectedItemStyle(obj);
		
		var type = getTypeFromID(obj.id);
		var code = getCodeFromID(obj.id);


		if( checkHeavyPartsName( code ) == true )	return;

		parent.d_info.showPartsInfo( type, code, true );
	}
	catch( e ){
		window.alert(e.description);
	}
}


function checkHeavyPartsName(partsCode)
{
	
	var codeList = partsCode.split(",");

	if( codeList.length > 9 ){
		var strMsg = "The process may take some time to complete.\nDo you wish to continue?";

		switch(g_ewdPartsList.getLang()){
			case "de":	strMsg = "Der Vorgang kann bis zur Beendigung einige Zeit in Anspruch nehmen.\nMöchten Sie fortfahren?";	break;
			case "es":	strMsg = "Es posible que el proceso tarde un poco en completarse.\n¿Desea continuar?"; break;
			case "fr":	strMsg = "Le processus peut prendre un certain temps pour s'accomplir.\nVoulez-vous continuer ?"; break;
		}
		
		
		if( confirm(strMsg) == false )	return true;
	}
	return false;
}


function call_runOnClickPartNo(partNo, bRepair)
{
	try{
		parent.d_info.showConnectorInfo(partNo, bRepair);
	}
	catch(e){
		window.alert(e.description);
	}


}



function showList(key)
{


	if( g_dispMode == DISP_PNO ){
		showPartNoList(key);
		return;
	}

	var partsList = new PartsList();
	if( g_dispMode == DISP_NAME ){
		partsList.makePartsArrayForName(g_ewdPartsList.ewdPartsArray, key);
	} else {
		partsList.makePartsArrayForCode(g_ewdPartsList.ewdPartsArray, key);
	}
	
	
	if( partsList.partsArray.length == 0 ){
		document.body.innerHTML = parent.d_search.getNotFoundWord();
		return;
	}
	
	


	var xslPath = "../../styles/connector/list.xsl";
	document.body.innerHTML = partsList.makeHTML(xslPath);

}


function showPartNoList(key)
{
	var num = 0;

	var xmlDoc = createDOM();
	var root = xmlDoc.createElement("connector_list");

	if(g_connNoListXml == null || g_connNoListXsl == null){
		document.body.innerHTML = "Internal error: connector no list";
		return;
	}

	var connNodeList = g_connNoListXml.getElementsByTagName("connector");

	for( var i = 0; i < connNodeList.length; i++ ){
		if( connNodeList(i).getAttribute("partNo").indexOf(key) == -1 )	continue;
		num++;
		root.appendChild(connNodeList(i).cloneNode(true))
	}
	xmlDoc.appendChild(root);
	if( num == 0 ){
		document.body.innerHTML = parent.d_search.getNotFoundWord();
		return;
	}

	document.body.innerHTML = xmlDoc.transformNode(g_connNoListXsl);

}






function getListObj( code, ewdItemType )
{
	var tmpCode = code.split(",")[0];
	var ewdItemCode = pickCode(tmpCode, ewdItemType);
	var subCode  = pickSubcode(tmpCode, ewdItemType);
	ewdItemType = adjustType(ewdItemType)
	
	var objs = document.all.tags("div");
	for( var i=0; i < objs.length; i++ ){
		var tmpType = adjustType( getTypeFromID(objs(i).id) );
		if( tmpType != ewdItemType ) continue;
		
		var tmpCodeArray = getCodeFromID(objs(i).id).split(",");
		for( var j=0; j < tmpCodeArray.length; j++ ){
			if( ewdItemCode == pickCode(tmpCodeArray[j], tmpType) ){
				if( subCode == "" )		return objs(i);
				if( subCode == pickSubcode(tmpCodeArray[j], tmpType) )	return objs(i);
			}
		}
	}
	
	return null;
}


function setSelectedItemStyleByCode( ewdItemCode, ewdItemType )
{
	var destObj = getListObj( ewdItemCode, ewdItemType );
	if( destObj == null ) return;
	
	setSelectedItemStyle( destObj );
	destObj.scrollIntoView();
}


function setSelectedItemStyle( destObj )
{
	if( destObj != null )
		destObj.className = "menu_active";
}



function resetItemStyle()
{
	var obj = document.all.tags("div");
	
	for(var i=0; i < obj.length; i++ ){
		if( obj(i).className != "menu" )
			obj(i).className = "menu";
	}
}
