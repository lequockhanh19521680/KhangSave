/*
   Copyright (c) 2002 SHINTEC HOZUMI Co.,LTD.
   All Rights Reserved. 
*/


var g_fLoadedGpList = true;
var g_fLoadedPsList = true;


function getLoadedGpListFlag()
{
	return g_fLoadedGpList;
}


function getLoadedPsListFlag()
{
	return g_fLoadedPsList;
}


function setLoadedGpListFlag(flg)
{
	g_fLoadedGpList = flg;
}


function setLoadedPsListFlag(flg)
{
	g_fLoadedPsList = flg;
}


function call_runOnLoadProc()
{
	try{
		var paramTable = makeParamTable(window.location.search);
		

		var mode_old = getURLParam("mode");
		if( mode_old != null && mode_old != "" ){
			paramTable.put("imode", "category");
			paramTable.put("category", mode_old);
		}
		
		d_mainframe.window.navigate("./contents/ewd_main.html" + makeParamString(paramTable));
	}
	catch( e ){
		window.alert(e.description);
	}
}
