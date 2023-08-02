<?xml version="1.0" encoding="utf-8"?> 
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0">
	<xsl:output method="html" encoding="UTF-8" />

	<xsl:template match="/">
		<xsl:apply-templates select="connector_list" /> 
	</xsl:template>

	<xsl:template match="connector_list">
		<HTML>
			<HEAD>
				<META http-equiv="Content-Type" content="text/html; charset=UTF-8" />
				<title>Repair Wire Harness Information</title>
				<script type="text/javascript" src="testViewer/scripts/lib/openwin.js"></script>
				<link rel="stylesheet" href="testViewer/styles/repairWire.css" />
			</HEAD>
			<BODY class="bodycolor">
				Repair Wire Harness<br/>
				<TABLE border="1" cellspacing="0" cellpadding="0" bordercolor="#FFFFFF">
					<TR>
						<TH class="gray3_dark_left" rowspan="2">Male<br/>Female</TH>
						<TH class="gray3_dark_left" rowspan="2">Part No. of<br/>Connector</TH>
						<TH class="gray3_dark_left" rowspan="2">Terminal<br/>Type</TH>
						<TH class="gray3_dark_left" rowspan="2">Sealing<br/>Ability</TH>
						<TH class="gray3_dark_left" rowspan="2">Wire<br/>Type</TH>
						<TH class="gray3_dark_left" colspan="2">Part No. of Repair Wire</TH>
						<TH class="gray3_dark_left" rowspan="2">More<br/>info.</TH>
					</TR>
					<TR>
						<TD class="gray3_dark_left">160mm Type</TD>
						<TD class="gray3_dark_left">500mm Type</TD>
					</TR>
					<xsl:apply-templates select="connector" />
					</TABLE>
			</BODY>
		</HTML>
	</xsl:template>

	<xsl:template match="connector">
		<xsl:variable name="wire-num1" select="count(.//terminal/wire[@length='160mm'])" />
		<xsl:variable name="terminal-num1" select="count(terminal)" />
		<TR>
			<TD class="gray4_" align="center">
				<xsl:attribute name="rowspan"><xsl:value-of select="$terminal-num1" /></xsl:attribute>
<!--				<xsl:value-of select="@sex" /> -->
				<xsl:if test="@sex='M'">Male</xsl:if>
				<xsl:if test="@sex='F'">Female</xsl:if>
			</TD>
			<TD class="gray4_">
				<xsl:attribute name="rowspan"><xsl:value-of select="$terminal-num1" /></xsl:attribute>
				<xsl:value-of select="@partNo" />

      </TD>
			<xsl:apply-templates select="terminal[1]" />
		</TR>
		<xsl:apply-templates select="terminal[position() &gt; 1]" mode="over2" />
	</xsl:template>


	<xsl:template match="terminal">
    <xsl:call-template name="terminal-row">
      <xsl:with-param name="isFirst">Y</xsl:with-param>
    </xsl:call-template>
	</xsl:template>

	<xsl:template match="terminal" mode="over2">
		<TR>
      <xsl:call-template name="terminal-row">
        <xsl:with-param name="isFirst">N</xsl:with-param>
      </xsl:call-template>
    </TR>
	</xsl:template>

	<xsl:template name="terminal-row">
    <xsl:param name="isFirst">N</xsl:param>
		<xsl:variable name="wire-num11" select="count(wire[@length='160mm'])" />

		<TD class="gray4_" align="center">
			<xsl:attribute name="rowspan"><xsl:value-of select="$wire-num11" /></xsl:attribute>
			<xsl:value-of select="@type" />
		</TD>

    <xsl:choose>
      <xsl:when test="parent::connector/@combine='0'">
        <TD class="gray4_" align="center">
          <xsl:if test="sealing/@ability='Y'">Sealed</xsl:if>
          <xsl:if test="sealing/@ability='N'">Unsealed</xsl:if>
        </TD>
      </xsl:when>
      <xsl:when test="parent::connector/@combine &gt; 1">
        <xsl:if test="$isFirst = 'Y'">
          <TD class="gray4_" align="center">
            <xsl:attribute name="rowspan">
              <xsl:value-of select="parent::connector/@combine" />
            </xsl:attribute>
            <xsl:if test="sealing/@ability='Y'">Sealed</xsl:if>
            <xsl:if test="sealing/@ability='N'">Unsealed</xsl:if>
          </TD>
        </xsl:if>
      </xsl:when>
      <xsl:otherwise>
        <TD class="gray4_" align="center">
          <xsl:if test="sealing/@ability='Y'">Sealed</xsl:if>
          <xsl:if test="sealing/@ability='N'">Unsealed</xsl:if>
        </TD>
      </xsl:otherwise>
    </xsl:choose>
		<!--<TD class="gray4_" align="center">
			<xsl:if test="sealing/@ability='Y'">Sealed</xsl:if>
			<xsl:if test="sealing/@ability='N'">Unsealed</xsl:if>
		</TD>-->

		<TD class="gray4_" align="center">
			<xsl:if test="@alumi='Y'"><font style = "font-size:9pt;">Aluminum</font></xsl:if>
			<xsl:if test="@alumi='N'"><font style = "font-size:9pt;">Copper</font></xsl:if>
		</TD>

		<TD class="gray4_">
			<xsl:for-each select="wire[@length='160mm']/repair_wire">
				<xsl:call-template name="repair_wire"/>
			</xsl:for-each>

		</TD>

		<TD class="gray4_">
			<xsl:for-each select="wire[@length='500mm']/repair_wire">
				<xsl:call-template name="repair_wire"/>
			</xsl:for-each>
		</TD>
		<TD class="gray4_" align="center">
		<xsl:choose>
			<xsl:when test="@repair_id='-'">
				No info.
			</xsl:when>
			<xsl:when test="@type='-'">
				No info.
			</xsl:when>
			<xsl:when test="@repair_id=''">
				No info.
			</xsl:when>
			<xsl:otherwise>
				<input type="button" value="detail">
					<xsl:attribute name="onClick">openTermInfo("<xsl:value-of select="@repair_id"/>", "<xsl:value-of select="parent::connector/@partNo"/>")</xsl:attribute>
				</input>
			</xsl:otherwise>
		</xsl:choose>
		</TD>

	</xsl:template>

	<xsl:template name="repair_wire">
		<xsl:value-of select="@partNo"/>
		<xsl:if test="@surface-treatment='Au'">(Au)</xsl:if>
		<br/>
	</xsl:template>
</xsl:stylesheet>
