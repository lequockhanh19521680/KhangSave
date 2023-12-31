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
<!--
				<link rel="stylesheet" href="../repairWire.css" />
-->
			</HEAD>
			<!-- body -->
			<BODY bgcolor="#e9eeea">
				<xsl:apply-templates select="connector" />
			</BODY>
			<!-- -->

		</HTML>
	</xsl:template>

	<xsl:template match="connector">
		<TABLE border="1" cellpadding="5">
			<TR>
				<TD bgcolor="#F0F0F0">Wire Type</TD>
				<TD bgcolor="#F0F0F0" align="center"><B>
					<FONT size="+1" color="#000000">
						<xsl:if test="terminal/@alumi='Y'">Aluminum</xsl:if>
						<xsl:if test="terminal/@alumi='N'">Copper</xsl:if>
					</FONT></B>
				</TD>
			</TR>
			<TR>
				<TD bgcolor="#F0F0F0">Terminal Type</TD>
				<TD bgcolor="#F0F0F0" align="center"><B>
					<FONT size="+1" color="#000000">
						<xsl:value-of select="terminal/@type"/> 
						<xsl:if test="terminal/sealing/@ability='Y'"> (Waterproof Type)</xsl:if>
						<xsl:if test="terminal/sealing/@ability='N'"> (Non-waterproof Type)</xsl:if>
					</FONT></B>
				</TD>
			</TR>
			<TR>
				<TD bgcolor="#EEEEEE">Male / Female</TD>
				<TD bgcolor="#EEEEEE" align="center"><B>
					<xsl:if test="@sex='F'">Female</xsl:if>
					<xsl:if test="@sex='M'">Male</xsl:if>
				</B></TD>
			</TR>
			<TR>
				<TD colspan="2" bgcolor="#BBBBBB" valign="top" nowrap="nowrap">
					<xsl:choose>
						<xsl:when test="terminal/@repair_id='-'">
							No information for this terminal
						</xsl:when>
						<xsl:when test="terminal/@repair_id=''">
							No information for this terminal
						</xsl:when>
						<xsl:otherwise>
						<!--
							<TABLE border="0" cellpadding="1">
								<TR>
									<TD valign="top" nowrap="nowrap">
										<xsl:apply-templates select="terminal" />
										<xsl:apply-templates select="terminal/housing_list" />
									</TD>
								</TR>
							</TABLE>
						-->
						<div style="float:left; margin-right=5px; margin-bottom=5px">
										<xsl:apply-templates select="terminal" />
						</div>
						<div style="float:left">
										<xsl:apply-templates select="terminal/housing_list" />
						</div>
						</xsl:otherwise>
					</xsl:choose>
				</TD>
			</TR>
		</TABLE>
	</xsl:template>

	<xsl:template match="terminal">
		<xsl:variable name="sleeve-num" select="count(.//sleeve)" />
		<TABLE border="1" cellspacing="0" cellpadding="0" bordercolor="#FFFFFF">
			<TR>
				<TH class="gray3_dark_left">Repair Wire</TH>
				<xsl:if test="sealing/@ability='Y'">
					<TH class="gray3_dark_left">Sealing</TH>
				</xsl:if>
				<TH class="gray3_dark_left">Sleeve</TH>
			</TR>
			<TR>
				<TD class="gray4_" valign="top">
				<xsl:attribute name="rowspan"><xsl:value-of select="$sleeve-num" /></xsl:attribute>
					<IMG>
					<xsl:attribute name="src">
						./figrepair/<xsl:value-of select="@repair_id"/>.png
					</xsl:attribute>
					</IMG>
					<br/>
					<xsl:apply-templates select="wire[1]" />
				</TD>
				<xsl:if test="sealing/@ability='Y'">
					<TD class="gray4_" valign="top">
					<xsl:attribute name="rowspan"><xsl:value-of select="$sleeve-num" /></xsl:attribute>
						<xsl:apply-templates select="sealing" />
					</TD>
				</xsl:if>
				<TD class="gray4_" valign="top">
					<xsl:apply-templates select="sleeve[1]" />
				</TD>
			</TR>
			<xsl:if test="$sleeve-num&gt;1">
				<TR>
				<TD class="gray4_" valign="top">
					<xsl:apply-templates select="sleeve[2]" />
				</TD>
				</TR>
			</xsl:if>
			<xsl:if test="$sleeve-num&gt;2">
				<TR>
				<TD class="gray4_" valign="top">
					<xsl:apply-templates select="sleeve[3]" />
				</TD>
				</TR>
			</xsl:if>
			<xsl:if test="$sleeve-num&gt;3">
				<TR>
				<TD class="gray4_" valign="top">
					<xsl:apply-templates select="sleeve[4]" />
				</TD>
				</TR>
			</xsl:if>
			<xsl:if test="$sleeve-num&gt;4">
				<TR>
				<TD class="gray4_" valign="top">
					<xsl:apply-templates select="sleeve[5]" />
				</TD>
				</TR>
			</xsl:if>
		</TABLE>
	</xsl:template>


	<xsl:template match="wire">
		<TABLE border="1" width="100%" cellspacing="0" cellpadding="3">
			<TR>
				<TD rowspan="2" class="gray4_nopad">P/N:</TD>
				<TD class="gray4_nopad">160mm</TD>
				<TD class="gray4_nopad">
					<xsl:if test="count(parent::terminal/wire[@length='160mm']/repair_wire)='0'"><BR/></xsl:if>
					<xsl:for-each select="parent::terminal/wire[@length='160mm']/repair_wire">
						<xsl:call-template name="repair_wire"/>
					</xsl:for-each>
				</TD>
			</TR>
			<TR>
				<TD class="gray4_nopad">500mm</TD>
				<TD class="gray4_nopad">
					<xsl:if test="count(parent::terminal/wire[@length='500mm']/repair_wire)='0'"><BR/></xsl:if>
					<xsl:for-each select="parent::terminal/wire[@length='500mm']/repair_wire">
						<xsl:call-template name="repair_wire"/>
					</xsl:for-each>
				</TD>
			</TR>
		</TABLE>
	</xsl:template>

	<xsl:template match="sealing">
		<xsl:apply-templates select="plug" />
		<br/><br/>
		<xsl:apply-templates select="packing" />
	</xsl:template>


	<xsl:template match="plug">
		<TABLE border="0" width="100%">
			<TR>
				<TD class="gray4_nopad">Hole Plug</TD>
			</TR>
			<TR>
				<TD class="gray4_nopad">
					<IMG>
						<xsl:attribute name="src">
							./figrepair/<xsl:value-of select="@fig" />.png
						</xsl:attribute>
					</IMG>
				</TD>
			</TR>
			<TR>
				<TD class="gray4_nopad">
					P/N: <xsl:value-of select="@partNo"/>
				</TD>
			</TR>
		</TABLE>
	</xsl:template>

	<xsl:template match="packing">
		<TABLE border="0" width="100%">
			<TR>
				<TD class="gray4_nopad">Terminal Packing</TD>
			</TR>
			<TR>
				<TD class="gray4_nopad">
					<IMG>
						<xsl:attribute name="src">
							./figrepair/<xsl:value-of select="@fig" />.png
						</xsl:attribute>
					</IMG>
				</TD>
			</TR>
			<TR>
				<TD class="gray4_nopad">
					P/N: <xsl:value-of select="@partNo"/>
				</TD>
			</TR>
		</TABLE>
	</xsl:template>



	<xsl:template name="repair_wire">
		<xsl:value-of select="@partNo"/>
		<xsl:if test="@surface-treatment='Au'">(Au)</xsl:if>
		<br/>
	</xsl:template>


	<xsl:template match="sleeve">
		<TABLE border="0">
			<TR>
				<TD>
					<xsl:if test="@size='S'">Small</xsl:if>
					<xsl:if test="@size='M'">Medium</xsl:if>
					<xsl:if test="@size='L'">Large</xsl:if>

					<xsl:if test="@color='R'"> (Red)</xsl:if>
					<xsl:if test="@color='L'"> (Blue)</xsl:if>
					<xsl:if test="@color='Y'"> (Yellow)</xsl:if>
					<xsl:if test="@color='S1'"> (Silver)</xsl:if>
					<xsl:if test="@color='S2'"> (Silver)</xsl:if>
				</TD>
			</TR>
			<TR>
				<TD>
					<IMG>
						<xsl:attribute name="src">
							./figrepair/<xsl:value-of select="@fig"/>.png
						</xsl:attribute>
					</IMG>
				</TD>
			</TR>
			<TR>
				<TD>
					P/N: <xsl:value-of select="@partNo"/>
				</TD>
			</TR>
		</TABLE>
	</xsl:template>

	<xsl:template match="terminal/housing_list">
		<xsl:variable name="sleeve-num" select="count(.//sleeve)" />
		<TABLE border="1" cellspacing="0" cellpadding="0" bordercolor="#FFFFFF">
			<TR>
				<TH class="gray3_dark_left">Housing Cross Section</TH>
			</TR>
			<xsl:for-each select="housing">
				<TR>
					<TD class="gray4_">
						<TABLE border="0">
							<TR><TD align="center">
								<IMG>
									<xsl:attribute name="src">
										./figrepair/<xsl:value-of select="@fig"/>.png
									</xsl:attribute>
								</IMG>
							</TD></TR>
							<TR><TD align="center">
								<xsl:if test="@lockType='D'">(Double Lock Type)<BR/></xsl:if>
								<xsl:if test="@lanceType='T'">[Terminal Lance]</xsl:if>
								<xsl:if test="@lanceType='H'">[Housing Lance]</xsl:if>
							</TD></TR>
						</TABLE>
					</TD>
				</TR>
			</xsl:for-each>
		</TABLE>
	</xsl:template>

</xsl:stylesheet>
