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

		g_templateXslDoc = loadXML("../../styles/connector/repairWire.xsl");
		
		

		var partsNo = getURLParam("parts");
		if( partsNo != null ){
			showRepairInfo( partsNo );
		}
	}
	catch( e ){
		window.alert(e.description);
	}
}



function showRepairInfo(partsNo)
{
	var partNo = partsNo.split("+");


	var xmlDoc = createDOM();
	var newNode = xmlDoc.createElement("connector_list");

	for( var i = 0; i < partNo.length; i++ ){
		var connNode = g_repairWireList.getConnectorNodeAndAddInfo(partNo[i]);
		if( connNode == null )	continue;
		newNode.appendChild(connNode);
	}

	xmlDoc.appendChild(newNode);

	document.body.innerHTML = xmlDoc.transformNode(g_templateXslDoc);


}
