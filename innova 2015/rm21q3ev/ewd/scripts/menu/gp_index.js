/*
   Copyright (c) 2002 SHINTEC HOZUMI Co.,LTD.
   All Rights Reserved. 
*/



function call_runOnLoadProc()
{
	try{
		showGpTitleList();
	}
	catch( e ){
		window.alert(e.description);
	}
}



function call_runOnClickTitle( code, type )
{
	try{
		var paramTable = makeParamTable();
		appendRequiredParam(paramTable);
		paramTable.put("ewd", code);
		paramTable.put("ewd_type", type);
		
		parent.window.navigate("../common/fig_frame.html" + makeParamString(paramTable) );
	}
	catch( e ){
		window.alert(e.description);
	}
}




function call_runOnMouseOver()
{
	try{
		window.event.srcElement.className = "titlelist_hover";
	}
	catch(e){
		window.alert(e.description);
	}
}




function call_runOnMouseOut()
{
	try{
		window.event.srcElement.className = "titlelist";
	}
	catch(e){
		window.alert(e.description);
	}
}




function showGpTitleList()
{

	var xmlDoc = createListXML();

	var xslDoc = loadXML("../../styles/menu/gp_index.xsl");
	document.body.innerHTML = xmlDoc.transformNode(xslDoc);

}



function createListXML()
{
	var xmlDoc = createDOM();
	

	var root = xmlDoc.createElement("List");
	xmlDoc.appendChild(root);
	

	var elList = xmlDoc.createElement("TitleList");
	root.appendChild(elList);
	

	var gpArray = getGpArray();
	for(var i=0; i < gpArray.length; i++ ){
		var elTitle = xmlDoc.createElement("Title");
		elTitle.setAttribute("code", gpArray[i].getCode());
		elTitle.text = gpArray[i].getName();
		elList.appendChild(elTitle);
	}
	
	return xmlDoc;
}


function getGpArray()
{
	var subPath = chkGPTitleExist("../system/title-gp.xml");
	var titleList = new TitleList("../system/title.xml", TITLE_TYPE_SYSTEM, subPath);
	titleList.filteringGpByTerm(getURLParam("term"));
	
	var gpTitleArray = titleList.objGpList.titleArray;
	
	return gpTitleArray;
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
