/*
   Copyright (c) 2002-2007 SHINTEC HOZUMI Co.,LTD.
   All Rights Reserved. 
*/


function call_runOnClickClose()
{
	try{
		parent.window.close();
	}
	catch( e ){
		window.alert(e.description);
	}
}



function call_runOnClickTop()
{
	try{
		parent.d_preview.window.navigate( "../top.html" );
	}
	catch( e ){
		window.alert(e.description);
	}
}

