/*
   Copyright (c) 2002-2006 SHINTEC HOZUMI Co.,LTD.
   All Rights Reserved. 
*/



var g_templateXslDoc;

var g_repairWireList;




function call_runOnLoadProc()
{
	try{
		

		g_repairWireList = new RepairWireList("connlist.xml");

		g_templateXslDoc = loadXML("../../styles/connector/termInfo.xsl");
		
		
		var termId = getURLParam("terminalId");
		var connNo = getURLParam("connNo");
		if( termId != null ){
			showTerminalInfo( termId, connNo );
		}
	}
	catch( e ){
		window.alert(e.description);
	}
}



function showTerminalInfo(termId, connNo)
{
	var xmlDoc = createDOM();
	var newNode = xmlDoc.createElement("connector_list");

	var connNode = g_repairWireList.getConnectorNode(connNo);

	var newConnNode = connNode.cloneNode(false);
	newNode.appendChild(newConnNode);

	if( connNode.selectSingleNode("terminal").getAttribute("type") != "-" ){
		var termNode = g_repairWireList.getTerminalNode(connNo, termId);
		if( termNode != null ){
			newConnNode.appendChild(termNode);
		}
	}

	xmlDoc.appendChild(newNode);


	document.body.innerHTML = xmlDoc.transformNode(g_templateXslDoc);
}
