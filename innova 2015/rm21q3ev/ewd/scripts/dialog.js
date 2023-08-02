/*
   Copyright (c) 2002-2007 SHINTEC HOZUMI Co.,LTD.
   All Rights Reserved. 
*/

function call_runOnLoadProc()
{
	try{
		switch( self.dialogArguments[1] ){

			case "repair_wire":
				self.d_preview.window.navigate("../connector/repair.html" + self.dialogArguments[2]);
				break;


			case "terminal_info":
				self.d_preview.window.navigate("../connector/terminfo.html" + self.dialogArguments[2]);
				break;
		}
	}
	catch(e){
		window.alert(e.description);
	}

}

function getType()
{
	return self.dialogArguments[1]
}

function getArgs()
{
	return self.dialogArguments[2];
}


