<?xml version="1.0" encoding="utf-8"?> 
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0">
	
	<xsl:output method="html" encoding="UTF-8" />
	
	<xsl:template match="/">
		<xsl:apply-templates select="Connect" />
	</xsl:template>
	
	<xsl:template match="Connect">
		<xsl:apply-templates select="ID" />
	</xsl:template>
	
	<xsl:template match="ID">
		<xsl:if test=". != '0'">
			<hr/><br/>
		</xsl:if>
		
		<table border='1' cellspacing='0' cellpadding='0' bordercolor='#FFFFFF'>
			<col width="80"/>
			<tr>
				<td class="gray5" colspan='2'>
					<xsl:attribute name="id">parts_name_<xsl:value-of select="."/></xsl:attribute>
				</td>
			</tr>
			<tr>
				<td class="gray3_dark_left">Part Code</td>
				<td class="gray4_">
					<xsl:attribute name="id">parts_id_<xsl:value-of select="."/></xsl:attribute>
				</td>
			</tr>
			<tr>
				<td class="gray3_dark_left">Part No.</td>
				<td class="gray4_">
					<xsl:attribute name="id">parts_no_<xsl:value-of select="."/></xsl:attribute>
				</td>
			</tr>
			<tr>
				<td class="gray3_dark_left">Color</td>
				<td class="gray4_">
					<xsl:attribute name="id">parts_color_<xsl:value-of select="."/></xsl:attribute>
				</td>
			</tr>
			<tr>
				<td class="gray3_dark_left">Spec</td>
				<td class="gray4_">
					<xsl:attribute name="id">parts_spec_<xsl:value-of select="."/></xsl:attribute>
				</td>
			</tr>
<!--
			<tr>
				<td class="gray3_dark_left">Repair W/H</td>
				<td class="gray4_">
					<xsl:attribute name="id">parts_repair_<xsl:value-of select="."/></xsl:attribute>
				</td>
			</tr>
-->
		</table>
		<!-- added by ykato 2007/02/05 -->
		<div class="text" style="display:none;">
			<xsl:attribute name="id">repair_wh_<xsl:value-of select="."/></xsl:attribute>
			<xsl:attribute name="onClick">call_runOnClickRepairInfo(<xsl:value-of select="."/>, 'en')</xsl:attribute>
			<xsl:attribute name="onMouseOver">call_runOnMouseOver(true)</xsl:attribute>
			<xsl:attribute name="onMouseOut">call_runOnMouseOut()</xsl:attribute>
			Connector Detail</div>

		<input type="hidden">
			<xsl:attribute name="id">parts_type_<xsl:value-of select="."/></xsl:attribute>
		</input>
		<input type="hidden">
			<xsl:attribute name="id">parts_code_<xsl:value-of select="."/></xsl:attribute>
		</input>
		<input type="hidden">
			<xsl:attribute name="id">parts_subcode_<xsl:value-of select="."/></xsl:attribute>
		</input>
		<input type="hidden">
			<xsl:attribute name="id">parts_namecode_<xsl:value-of select="."/></xsl:attribute>
		</input>
		
		
		<div style='margin:10px 3px;'>
			<xsl:attribute name="id">fig_view_<xsl:value-of select="."/></xsl:attribute>
			<embed width="0" height="0" type="image/svg+xml" pluginspage="http://www.adobe.com/svg/viewer/install/"/>
			<input type="hidden">
				<xsl:attribute name="id">pin_info_<xsl:value-of select="."/></xsl:attribute>
			</input>
			<div>
				<xsl:attribute name="id">pin_spec_<xsl:value-of select="."/></xsl:attribute>
			</div>
		</div>
		
		
		<div class="text" style="display:none;">
			<xsl:attribute name="id">single_<xsl:value-of select="."/></xsl:attribute>
			<xsl:attribute name="onClick">call_runOnClickPartCheck(<xsl:value-of select="."/>)</xsl:attribute>
			<xsl:attribute name="onMouseOver">call_runOnMouseOver(true)</xsl:attribute>
			<xsl:attribute name="onMouseOut">call_runOnMouseOut()</xsl:attribute>
			Inspection Procedure</div>
		
		
		<div style='padding:8px 1px;'>
			<xsl:attribute name="id">routing_block_<xsl:value-of select="."/></xsl:attribute>
			<span class="pinfo_link_entry">Location</span>
			<div>
				<xsl:attribute name="id">to_wiringrouting_<xsl:value-of select="."/></xsl:attribute>
			</div>
		</div>
		
	</xsl:template>
</xsl:stylesheet>
