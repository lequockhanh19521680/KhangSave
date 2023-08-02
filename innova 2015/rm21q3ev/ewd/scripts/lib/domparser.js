/*
   Copyright (c) 2002 SHINTEC HOZUMI Co.,LTD.
   All Rights Reserved. 
*/




function loadXML( path )
{
	var xmlDoc = createDOM();
	
	if( xmlDoc.load(path) == false ){
		var err = new Error(0, "\r\n" + 
							"File: " + path + "\r\n" + 
							"Line: " + xmlDoc.parseError.line + "\r\n" + 
							"Reason: " + xmlDoc.parseError.reason);
		throw err;
	}
	
	return xmlDoc;
}



function createDOM()
{
	try{


		var dom = new ActiveXObject("MSXML2.DOMDocument.3.0");

		
		dom.async = false;


		dom.setProperty("ForcedResync", false);
	
		return dom;
	}

	catch( e ){
	    var dom = new ActiveXObject("MSXML2.DOMDocument");
	    dom.async = false;
	    return dom;
	}
}
