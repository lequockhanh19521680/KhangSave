/*
   Copyright (c) 2002 SHINTEC HOZUMI Co.,LTD.
   All Rights Reserved. 
*/



var g_templateXslDoc;
var g_connInfoXsl;

var g_ewdPartsList;
var g_systemTitleList;
var g_routingTitleList;
var g_relayTitleList;

var g_ewdRefs;
var g_sysRefs;




function call_runOnLoadProc()
{
	try{


		if( isPrintDialog() ) {
			document.body.innerHTML = self.dialogArguments[2];
			return;
		}
		


		g_ewdPartsList = new EwdPartsList("parts.xml");
		var subPath = chkGPTitleExist("../system/title-gp.xml");
		g_systemTitleList = new TitleList("../system/title.xml", TITLE_TYPE_SYSTEM, subPath);
		g_routingTitleList = new TitleList("../routing/title.xml", TITLE_TYPE_ROUTING, "../../defs/area.xml");
		g_relayTitleList = new TitleList("../relay/title.xml", TITLE_TYPE_RELAY);
		

		g_ewdRefs = createEwdRefs();
		g_sysRefs = new SysRefs("sysrefs.xml");
		
		

		g_templateXslDoc = loadXML("../../styles/connector/partsRefsHtml.xsl");
		g_connInfoXsl = loadXML("../../styles/connector/connInfo.xsl");
		
		

		var ewdItemCode = getURLParam("code");
		var ewdItemType = getURLParam("type");
		if( ewdItemCode != null ){
			ewdItemCode = ewdItemCode.replace(/\x2B/g, ",");
			showPartsInfo( ewdItemType, ewdItemCode, true );
		}
	}
	catch( e ){
		window.alert(e.description);
	}
}



function chkGPTitleExist(path)
{
	var fncGetFlg = parent.parent.getLoadedGpListFlag;
	if(typeof fncGetFlg == "function"){
		if(fncGetFlg() == false){
			return "";
		}
	}
	return path;
}


function call_runOnMouseOver( fOther ){
	try{
		var obj = window.event.srcElement;
		if( fOther == true )
			obj.className = "text_hover_other";
		else
			obj.className = "text_hover";
	}
	catch( e ){
		window.alert(e.description);
	}
}


function call_runOnMouseOut(){
	try{
		var obj = window.event.srcElement;
		obj.className = "text";
	}
	catch( e ){
		window.alert(e.description);
	}
}



function call_runOnClickLink(mapCode, mapType, partsCode, partsType)
{
	try{


		if( isPrintDialog() ) return;
		
		var paramTable = makeParamTable();
		appendRequiredParam(paramTable);
		paramTable.put("fig_search", "yes");
		paramTable.put("ewd", mapCode);
		paramTable.put("ewd_type", mapType);
		paramTable.put("code", partsCode);
		paramTable.put("type", partsType);
		
		var path = "../common/fig_frame.html";
		
		parent.window.navigate( path + makeParamString(paramTable) );
	}
	catch( e ){
		window.alert(e.description);
	}
}



function call_runOnClickPartCheck(index)
{
	try{


		if( isPrintDialog() ) return;
		
		var paramTable = makeParamTable();
		appendRequiredParam(paramTable);
		paramTable.put("parts", document.all("parts_namecode_" + index).value);
		


		openCompCheck(makeParamString(paramTable));
	}
	catch( e ){
		window.alert(e.description);
	}
}



function call_runOnClickRepairInfo(index, lang)
{
	try{

		if( isPrintDialog() ) return;
		
		var paramTable = makeParamTable();
		appendRequiredParam(paramTable);

		var partNo = document.all("parts_no_" + index).value;
		partNo = partNo.replace(/\x2f/g, "+");
		paramTable.put("parts", partNo);

		openRepairInfo(makeParamString(paramTable), lang);
	}
	catch( e ){
		window.alert(e.description);
	}
}


function call_runOnClickRepairInfoByPartNo(partNo, lang)
{
	try{

		if( isPrintDialog() ) return;
		var paramTable = makeParamTable();
		appendRequiredParam(paramTable);
		
		paramTable.put("parts", partNo);
		openRepairInfo(makeParamString(paramTable), lang);
	}
	catch( e ){
		window.alert(e.description);
	}
}


function call_runOnClickChangeDisplayedLink(index)
{
	try{


		if( isPrintDialog() ) return;
		
		var partsType = document.all("parts_type_" + index).value;
		var partsCode = document.all("parts_code_" + index).value;
		var partsSubcode = document.all("parts_subcode_" + index).value;
		var ewdParts = g_ewdPartsList.getItem( partsType, partsCode, partsSubcode, true );
		if( ewdParts == null ) return;
		
		if (document.all("optAllPin_" + index).checked) {
			showSystemLinkAll(ewdParts, index);
		}
		else if(document.all("optSelectedPin_" + index).checked) {
			showSystemLinkFromSelectedPin(ewdParts, index);
		}
	}
	catch( e ){
		window.alert(e.description);
	}
}



function createEwdRefs()
{
	var objEwdRefs = new EwdRefs(g_ewdPartsList);
	
	var routingCodesListArray = makeCodesListArray( g_routingTitleList );
	objEwdRefs.appendRefsInfoTest( routingCodesListArray );
	
	var relayCodesListArray   = makeCodesListArray( g_relayTitleList );
	objEwdRefs.appendRefsInfo( relayCodesListArray );
	
	return objEwdRefs;
}


function makeCodesListArray( titleList )
{
	var codesListArray = new Array();
	
	var titleArray = titleList.getTitleArray();
	for( var i=0; i < titleArray.length; i++ ){
		var codesListObj = new CodesList( titleArray[i], "../" );
		codesListArray[codesListArray.length] = codesListObj;
	}
	
	return codesListArray;
}




function getTitleObj(mapCode, mapType)
{
	var titleObj;
	switch(mapType) {
		case "system":
		titleObj = g_systemTitleList.getTitleObjByCode(mapCode);		break;
		
		case "routing":
		titleObj = g_routingTitleList.getTitleObjByCode(mapCode);		break;
		
		case "relay":
		titleObj = g_relayTitleList.getTitleObjByCode(mapCode);		break;
	}
	
	return titleObj;
}



function showWaitMessage()
{
	var strWait = "Please Wait...";
	
	switch(g_ewdPartsList.getLang()){
		case "de":	strWait = "Bitte warten.";	break;
		case "es":	strWait = "Espere, por favor."; break;
		case "fr":	strWait = "Prière d'attendre."; break;
	}

	var strMsg = "<div id='d_msg' name='d_msgWait'>\n<h5 style='margin: 50px 30px;'>\n" + strWait + "\n</h5>\n</div>\n";
	document.body.innerHTML = strMsg;

}






function showPartsInfo( partsType, partsCode, flgSub )
{
	showWaitMessage()
	var id = setTimeout("callShowPartsInfo('" + partsType + ";" + partsCode + ";" + flgSub + "')", 1 );
}



function callShowPartsInfo(str)
{
	var args = str.split(";");

 	var f = (args[2] == "true") ? true : false;
	showPartsInfo_w(args[0], args[1], f);
}



function showPartsInfo_w(partsType, partsCode, flgSub)
{


	

	var ewdPartsArray = new Array();
	var codeArray = partsCode.split(",");
	if( flgSub == null ) flgSub = true;
	for( var i=0; i < codeArray.length; i++ ){
		var code = pickCode(codeArray[i], partsType);
		var subcode = pickSubcode(codeArray[i], partsType);
		var tmpArray = g_ewdPartsList.getItemArray( partsType, code, subcode, flgSub );
		ewdPartsArray = ewdPartsArray.concat(tmpArray);
	}
	

	var html = makeBodyHTML( ewdPartsArray.length );
	document.body.innerHTML = html;
	

	var errObjArray = new Array();
	for(var i=0; i < ewdPartsArray.length; i++ ){
		try{
			setPartsInfo( ewdPartsArray[i], i );
		}
		catch(e){
			errObjArray[errObjArray.length] = e;
		}
	}



	for(var i=0; i < errObjArray.length; i++ ){
		window.alert("showPartsInfo Error:\r\n" + errObjArray[i].description);
	}
}




function showConnectorInfo( partNo, bRepair )
{
	if(partNo == null){
		document.body.innerHTML="part no error: "
		return;
	}
	var xmlDoc = createDOM();
	var root = xmlDoc.createElement("connector");
	root.setAttribute("partNo", partNo);

	if( bRepair == true )	root.setAttribute("repairInfo", "Y")
	xmlDoc.appendChild(root);





	var figName = appendPartsInfoByConnector(xmlDoc, root, partNo);
	if( figName == "" )	figName = partNo + ".svgz";

	root.setAttribute("figName", figName);

	document.body.innerHTML=xmlDoc.transformNode(g_connInfoXsl);
}



function appendPartsInfoByConnector(xmlDoc, parentNode, partNo)
{
    var figName = "";
	var itemArray = g_ewdPartsList.getItemArrayByPartNo(partNo);

	if( itemArray == null )	return;
	if( itemArray.length <= 0 )	return;
	var listNode = xmlDoc.createElement("PartsList");

	for( var i = 0; i < itemArray.length; i++ ){
		var partNode = xmlDoc.createElement("part");
		partNode.setAttribute("type", itemArray[i].getType() );
		partNode.setAttribute("code", itemArray[i].getCode() );
		partNode.setAttribute("subcode", itemArray[i].getSubCode() );
		partNode.setAttribute("name", itemArray[i].getName() );

		listNode.appendChild(partNode);
		

		if(itemArray[i].getType() != "w2w")
			figName = itemArray[i].getFigFileName();
	}

	parentNode.appendChild(listNode);
	
	return figName;

}



function makeBodyHTML( length )
{
	var xmlDoc = createDOM();
	var root = xmlDoc.createElement("PartsRef");
	xmlDoc.appendChild(root);
	for(var i=0; i < length; i++){
		var element = xmlDoc.createElement("ID");
		element.text = i;
		root.appendChild(element);
	}
	
	return xmlDoc.transformNode(g_templateXslDoc);
}




function setPartsInfo( ewdParts, nIndex )
{
	if (ewdParts == null) return;
	
	document.all("parts_name_" + nIndex).innerHTML = ewdParts.getName();
	document.all("parts_id_" + nIndex).innerHTML = ewdParts.getDispCode();
	document.all("parts_no_" + nIndex).innerHTML = ewdParts.getNo();
	document.all("parts_no_" + nIndex).value = ewdParts.getNo();
	document.all("parts_color_" + nIndex).innerHTML = ewdParts.getColor();
	document.all("parts_spec_" + nIndex).innerHTML = ewdParts.getSpec();

	
	document.all("parts_type_" + nIndex).value = ewdParts.getType();
	document.all("parts_code_" + nIndex).value = ewdParts.getCode();
	document.all("parts_subcode_" + nIndex).value = ewdParts.getSubCode();
	document.all("parts_namecode_" + nIndex).value = ewdParts.getNameCode();
	
	
	var figFileName = ewdParts.getFigFileName();
	loadFigData( figFileName , nIndex);
	
	
	

	if (ewdParts.getNameCode() != "" && ewdParts.getNameCode() != null)
		document.all("single_" + nIndex).style.display = "inline";
	else
		document.all("single_" + nIndex).style.display = "none";
	

	try{
		if (ewdParts.hasRepairInfo() == true)
			document.all("repair_wh_" + nIndex).style.display = "inline";
		else
			document.all("repair_wh_" + nIndex).style.display = "none";
	}
	catch(e){
		document.all("repair_wh_" + nIndex).style.display = "none";
	}
	
	document.all("optAllPin_" + nIndex).checked = true;
	
	

	setLinkInfo( nIndex, ewdParts );
}





function setLinkInfo(nIndex, ewdParts)
{
	var type    = ewdParts.getType();
	var code    = ewdParts.getCode();
	var subcode = ewdParts.getSubCode();
	
	var refsParts = g_ewdRefs.makeRefsPartsObj(type, code, subcode);
	

	var systemTitleObjArray = g_sysRefs.makeTitleObjArray( ewdParts, g_systemTitleList );

	var toSystemCircuit = makeHtmlAtLinkToDiagram( systemTitleObjArray, type, code, subcode );
	document.all("to_systemcircuit_" + nIndex).innerHTML = toSystemCircuit;
	
	
	

	var routingTitleObjArray = refsParts.getTitleObjArray( g_routingTitleList );
	

	if( routingTitleObjArray.length ==  0 && type != "jbc" ){
		g_ewdRefs.makeLinkInfoToRouting(type, code, subcode);
		refsParts = g_ewdRefs.makeRefsPartsObj(type, code, subcode);
		routingTitleObjArray = refsParts.getTitleObjArray( g_routingTitleList );
	}

	var toWiringRouting = makeHtmlAtLinkToDiagram( routingTitleObjArray, type, code, subcode );
	
	var relayTitleObjArray = refsParts.getTitleObjArray( g_relayTitleList );
	var toRelayLocation = makeHtmlAtLinkToDiagram( relayTitleObjArray, type, code, subcode );
	
	document.all("to_wiringrouting_" + nIndex).innerHTML = toWiringRouting + toRelayLocation;
}





function makeHtmlAtLinkToDiagram( titleObjArray, type, code, subcode )
{
	var retHTML = "";
	
	titleObjArray = titleObjArray.sort(compareTitleObj);
	code = combineCode(code, subcode);
	
	for(var i=0; i < titleObjArray.length; i++ ){
		if( titleObjArray[i].isInTerm(getURLParam("term")) == false ) continue;
		var mapCode   = titleObjArray[i].getCode();
		var mapType = titleObjArray[i].getType();
		var mapName = titleObjArray[i].getName();


		if(mapType == TITLE_TYPE_ROUTING){
			if( type == "w2w" ){
				if( titleObjArray[i].getRoutingNote() != null && titleObjArray[i].getRoutingNote() != type )	continue;
			}
		}

		
		retHTML += "<div class='text-link'><span id='" + mapType + "_" + i + "'";
		retHTML += " class='text'";
		retHTML += " onMouseOver='call_runOnMouseOver(false)'";
		retHTML += " onMouseOut='call_runOnMouseOut()'";
		retHTML += " onClick=\"call_runOnClickLink('" + mapCode + "','" + mapType + "','" + code + "','" + type + "')\">";
		retHTML += mapName + "</span></div>\r\n";
	}
	
	return retHTML;
}




function loadFigData( figFileName, nIndex )
{
	var embedNode = document.embeds[nIndex];
	if( figFileName != null && figFileName != ""){
		embedNode.setAttribute("width", "150");
		embedNode.setAttribute("height", "150");
		embedNode.setAttribute("src", "fig/" + figFileName);
	}
	else {
		document.all("tblFig_" + nIndex).style.display = "none";
	}
}



function showSystemLinkAll( ewdParts, nIndex )
{
	titleObjArray = g_sysRefs.makeTitleObjArray( ewdParts, g_systemTitleList );
	
	var toSystemCircuit = makeHtmlAtLinkToDiagram( titleObjArray, ewdParts.getType(), ewdParts.getCode(), ewdParts.getSubCode() );
	document.all("to_systemcircuit_" + nIndex).innerHTML = toSystemCircuit;
}



function showSystemLinkFromSelectedPin( ewdParts, nIndex )
{
	var svgDoc = document.embeds[nIndex].getSVGDocument();
	var pinNoArray = getSelectedPinNoArray(svgDoc);
	
	titleObjArray = g_sysRefs.makeTitleObjArrayByPinNoArray( ewdParts, pinNoArray, g_systemTitleList );
	
	var toSystemCircuit = makeHtmlAtLinkToDiagram( titleObjArray, ewdParts.getType(), ewdParts.getCode(), ewdParts.getSubCode() );
	document.all("to_systemcircuit_" + nIndex).innerHTML = toSystemCircuit;
}




function getEmbedIndexBySvgDoc( svgDoc )
{
	var retIndex = -1;
	

	for (var i=0; i < document.embeds.length; i++){
		if( document.embeds[i] == null ) continue;
		if( svgDoc == document.embeds[i].getSVGDocument() ){
			retIndex = i;
			break;
		}
	}
	
	return retIndex;
}



function zoomFig( svgDoc )
{


	var index = getEmbedIndexBySvgDoc(svgDoc);
	if(index == -1)return;
	var embedNode = document.embeds[index];
	
	var scale = svgDoc.rootElement.currentScale;
	

	embedNode.width  = embedNode.width  * scale;
	embedNode.height = embedNode.height * scale;

	svgDoc.rootElement.currentScale = 1;

	svgDoc.rootElement.getCurrentTranslate().setX(0);
	svgDoc.rootElement.getCurrentTranslate().setY(0);
}




function sendOnloadMsg(svgFig)
{
	var svgDoc = svgFig.svgRootNode.getOwnerDocument();
	var embedIndex = getEmbedIndexBySvgDoc( svgDoc );
	if( embedIndex == -1 ) return;
	

	var embedNode = document.embeds[embedIndex];
	var inputNode = embedNode.parentElement.all.tags("input")[0];
	if( inputNode.value.length == 0 ) return;
	selectPinNoByPinNoArray( svgDoc, inputNode.value.split(",") );
}




function setHighlightPinInfo()
{
	for (var i=0; i < document.embeds.length; i++) {
		var svgDoc = document.embeds[i].getSVGDocument();
		var pinNoArray = getSelectedPinNoArray( svgDoc );
		
		var embedIndex = getEmbedIndexBySvgDoc( svgDoc );
		var embedNode = document.embeds[embedIndex];
		var inputNode = embedNode.parentElement.all.tags("input")[0];
		
		inputNode.value = pinNoArray.join(",");
	}
}


function isPrintDialog()
{
	if( self.dialogArguments != null ) {
		if( self.dialogArguments[0] == "print" )
			return true;
		else
			return false;
	}
}


function call_showPartsInfoByCode( type, code, subcode)
{
	if( isPrintDialog() )	return;


	var fullCode = code;
	if( subcode != "" )	fullCode = code + "-" + subcode;


	var term = getURLParam("term");
	var destURL = "./parts.html?type=" + type + "&amp;code=" + fullCode + "&amp;parts_sort=code";
	if( term != null )	destURL += "&amp;term=" + term;
	parent.location.href = destURL
}
