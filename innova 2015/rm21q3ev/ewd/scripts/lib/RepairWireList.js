/*
   Copyright (c) 2002-2006 SHINTEC HOZUMI Co.,LTD.
   All Rights Reserved. 
*/




function RepairWireList( path )
{

	this.xmlDoc = null;

	this.xmlDoc = loadXML( path );
}


function RepairWireList.prototype.getConnectorNode(partNo)
{
	var connNode = this.xmlDoc.selectSingleNode("/connector_list//connector[@partNo='" + partNo + "']");

	if( connNode == null )	connNode = this.noMatchInfo(partNo);

	return connNode;
}

function RepairWireList.prototype.getTerminalNode(partNo, termId)
{
	var connNode = this.xmlDoc.selectSingleNode("/connector_list//connector[@partNo='" + partNo + "']");

	if( connNode == null )	return null;

	return connNode.selectSingleNode("terminal[@repair_id='" + termId + "']");

}

function RepairWireList.prototype.getConnectorNodeAndAddInfo(partNo)
{
    var connNode = this.getConnectorNode(partNo);
    var nodeList = connNode.getElementsByTagName("terminal");
    var combine = 0;
    if( nodeList != null ){
        if( nodeList.length > 1 ){
            var isSame = true;
            for( var i = 0; i < nodeList.length - 1; i++ ){
                if( nodeList(i).selectSingleNode("sealing").getAttribute("ability")
                    != nodeList(i + 1).selectSingleNode("sealing").getAttribute("ability") ){
                    isSame = false;
                    break;
                }
            }
            if( isSame ){
                combine = nodeList.length;
            }
        }
    }
    
    connNode.setAttribute("combine", combine);
    return connNode;
}


function RepairWireList.prototype.noMatchInfo(partNo)
{
	var node = this.xmlDoc.createElement("connector");

	node.setAttribute("partNo", partNo);
	node.setAttribute("sex", "-");
	node.setAttribute("sealing-ability", "-");


	var termNode = this.xmlDoc.createElement("terminal");
	termNode.setAttribute("type", "-");
	node.appendChild(termNode);


	var wireNode = this.xmlDoc.createElement("wire");
	wireNode.setAttribute("length", "160mm");
	termNode.appendChild(wireNode);

	var repairWireNode = this.xmlDoc.createElement("repair_wire");
	repairWireNode.setAttribute("partNo", "-");
	termNode.appendChild(repairWireNode);


	return node;
}
