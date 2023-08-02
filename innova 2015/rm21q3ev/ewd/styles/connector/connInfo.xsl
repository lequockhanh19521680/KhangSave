<?xml version="1.0" encoding="utf-8"?> 
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0">
	<xsl:output method="html" encoding="UTF-8" />

	<xsl:template match="/">
		<xsl:apply-templates select="connector" /> 
	</xsl:template>

	<xsl:template match="connector">
		<!-- part no -->
		<table class="p_table">
			<col width="150"/>
			<tr>
				<td class="gray3_dark_left">Part Number</td>
				<td class="gray4_">
					<xsl:value-of select="@partNo"/>
				</td>
			</tr>
		</table>

		<!-- wire harness repair link -->
		<xsl:if test="@repairInfo='Y'">
			<div class="text" style="display:inline">
				<xsl:attribute name="onClick">call_runOnClickRepairInfoByPartNo('<xsl:value-of select="@partNo"/>', 'en')</xsl:attribute>
				<xsl:attribute name="onMouseOver">call_runOnMouseOver(true)</xsl:attribute>
				<xsl:attribute name="onMouseOut">call_runOnMouseOut()</xsl:attribute>
				Connector Detail</div>
		</xsl:if>

		<!-- connector fig -->
		<table style="margin: 5px;">
			<tr>
				<td align="center" style="padding: 5px, 70px;background:#ECF0F2;" >
					<div>
						<xsl:attribute name="id">fig_view_0</xsl:attribute>
						<embed type="image/svg+xml"
							pluginspage="http://www.adobe.com/svg/viewer/install/"
							width="150" height="150">

							<xsl:attribute name="src">fig/<xsl:value-of select="@figName" /></xsl:attribute>
						</embed>
						<input type="hidden">
							<xsl:attribute name="id">pin_info_0</xsl:attribute>
						</input>
					</div>
				</td>
			</tr>
		</table>

		<!-- related parts -->
		<xsl:apply-templates select="PartsList" />

	</xsl:template>

	<xsl:template match="PartsList">
		<div>
			<br/><br/>
			Related parts:<br/>
			<table>
				<tr>
					<th class="gray3_dark_left">Type</th>
					<th class="gray3_dark_left">Code</th>
					<th class="gray3_dark_left">Name</th>
				</tr>
				<xsl:apply-templates select="part" />
			</table>
		</div>
	</xsl:template>

	<xsl:template match="part">
		<tr>
			<td class="gray4_">
				<xsl:choose>
					<xsl:when test="@type='conn'">Parts</xsl:when>
					<xsl:when test="@type='jbc'">J/B</xsl:when>
					<xsl:when test="@type='w2w'">W&amp;W</xsl:when>
					<xsl:otherwise>?</xsl:otherwise>
				</xsl:choose>
			</td>
			<td class="gray4_">
				<div class="text2">
					<xsl:attribute name="onClick">
						call_showPartsInfoByCode('<xsl:value-of select="@type" />', '<xsl:value-of select="@code" />', '<xsl:value-of select="@subcode" />')
					</xsl:attribute>

					<xsl:value-of select="@code" />
					<xsl:if test="@subcode!=''">
						(<xsl:value-of select="@subcode" />)
					</xsl:if>
				</div>
			</td>
			<td class="gray4_"><xsl:value-of select="@name" /></td>
		</tr>
	</xsl:template>

</xsl:stylesheet>
