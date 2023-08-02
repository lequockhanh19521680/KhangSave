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
		d_mainframe.window.navigate("./ewd_main.html" + window.location.search);
	}
	catch( e ){
		window.alert(e.description);
	}
}
