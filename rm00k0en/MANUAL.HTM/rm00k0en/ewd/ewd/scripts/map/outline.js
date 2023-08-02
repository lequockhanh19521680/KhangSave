


function call_runOnClickOutline()
{
	var path = parent.getOutlinePath("../");
	var winOutline = window.open(path, "OutlineWindow", "width=600,height=480,scrollbars=yes,resizable=yes");
	winOutline.focus();
}
