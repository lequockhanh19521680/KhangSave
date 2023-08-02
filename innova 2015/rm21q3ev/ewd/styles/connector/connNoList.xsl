<?xml version="1.0" encoding="utf-8"?> 
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0">
	<xsl:output method="html" encoding="UTF-8" />

	<xsl:template match="/">
		<xsl:apply-templates select="connector_list" /> 
	</xsl:template>

	<xsl:template match="connector_list">
		<xsl:apply-templates select="connector" />
	</xsl:template>

	<xsl:template match="connector">
		<table class="partslist" cellspacing="0" cellpadding="0">
			<tr>
				<td width="10" height="10"><img src="../../icon/b_icon0.png" width="10" height="100%"/></td>
				<td width="100%">
					<div class="menu" onMouseOver="call_runOnMouseOver()" onMouseOut="call_runOnMouseOut()">
						<xsl:variable name="term-num" select="count(terminal)" />
						<xsl:attribute name="id">
							<xsl:value-of select="@partNo"/>
						</xsl:attribute>
						<xsl:choose>
							<xsl:when test="$term-num&gt;0">
								<xsl:attribute name="onClick">
									call_runOnClickPartNo('<xsl:value-of select="@partNo"/>', true)
								</xsl:attribute>
							</xsl:when>
							<xsl:otherwise>
								<xsl:attribute name="onClick">
									call_runOnClickPartNo('<xsl:value-of select="@partNo"/>', false)
								</xsl:attribute>
							</xsl:otherwise>
						</xsl:choose>
						<xsl:value-of select="@partNo"/>
<!--
						<xsl:if test="$term-num&gt;0">
						***
						</xsl:if>
-->
					</div>
				</td>
			</tr>
		</table>
	</xsl:template>
</xsl:stylesheet>
