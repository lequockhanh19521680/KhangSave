/*
   Copyright (c) 2002-2007 SHINTEC HOZUMI Co.,LTD.
   All Rights Reserved. 
*/

var type = 1;

function call_runOnLoadProc()
{
	try{
		switch( self.dialogArguments[1] ){

			case "repair_wire":
				type = 1;
				break;


			case "terminal_info":
				type = 2;
				break;
		}
	}
	catch(e){
		window.alert(e.description);
	}

}

function call_runOnClickClose()
{
	try{
		parent.window.close();
	}
	catch( e ){
		window.alert(e.description);
	}
}


function call_runOnClickPrint()
{
	try{
		parent.d_preview.window.focus();

		parent.d_preview.window.print();
	}
	catch( e ){
		window.alert(e.description);
	}
}


function call_runOnClickHowTo()
{

	var top = 0;
	if( type == 1 )	top = 280;

	var path = "../../intro-wh/intro/index.html"
	var style = "dialogWidth:900px; dialogHeight:400px; dialogTop:" + top + "px; resizable=yes; help=no;";
	window.showModalDialog( path, null, style );

}
