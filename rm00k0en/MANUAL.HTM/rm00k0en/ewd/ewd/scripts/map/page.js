
function call_onLoadProc()
{
	if( !isNetscape4() ){
		var elm = document.getElementsByTagName("a")[0];
		setSelectedStyle( elm );
	}
}


function call_onClickPageProc( evt, pdfName )
{
	var url = "../pdf/" + pdfName + ".pdf";
	showPDF( url );
	
	if( !isNetscape4() ){
		resetStyle();
		setSelectedStyle( getElementByEvent(evt) );
	}
}



function showPDF( url )
{
	window.open(url, "winPDF");
}


function resetStyle()
{
	var elms = document.getElementsByTagName("a");
	for( var i=0; i < elms.length; i++ ){
		elms[i].className = "fig-page-ctrl-item";
	}
}

function setSelectedStyle( elm )
{
	elm.className = "fig-page-ctrl-item-active";
}
