<!-- $Id: _ptxt.xsl,v 1.1 2008/03/27 07:36:05 k-matsumoto Exp $ -->
<!--========================================================================-->
<!-- for Translation                                                        -->
<!-- 要領中の"See Page"文字列の翻訳結果に一致させる必要あり                 -->
<!--  000 See page                                                          -->
<!--  001 See Page                                                          -->
<!--  002 see page                                                          -->
<!--========================================================================-->
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0">
<xsl:output method="html" version="4.0" encoding="UTF-8"/>

<xsl:template match="ptxt">
	<xsl:for-each select="node()">
		<xsl:if test="self::text()">
			<xsl:variable name="txt" select="normalize-space(self::text())"/>
			<xsl:choose>
				<xsl:when test="starts-with(name(following-sibling::node()[position()=1]), 'xref') and substring($txt, string-length($txt)-7)='See page'"><!-- 000 -->
					<xsl:value-of select="substring($txt,0,string-length($txt)-7)"/>
				</xsl:when>
				<xsl:when test="starts-with(name(following-sibling::node()[position()=1]), 'xref') and substring($txt, string-length($txt)-7)='See Page'"><!-- 001 -->
					<xsl:value-of select="substring($txt,0,string-length($txt)-7)"/>
				</xsl:when>
				<xsl:when test="starts-with(name(following-sibling::node()[position()=1]), 'xref') and substring($txt, string-length($txt)-7)='see page'"><!-- 002 -->
					<xsl:value-of select="substring($txt,0,string-length($txt)-7)"/>
				</xsl:when>
				<xsl:otherwise>
					<xsl:apply-templates select="."/>
				</xsl:otherwise>
			</xsl:choose>
		</xsl:if>
		<xsl:apply-templates select="self::sub"/>
		<xsl:apply-templates select="self::sup"/>
		<xsl:if test="parent::node()/parent::node()/parent::node()[not(s-1 or testgrp)]">
			<xsl:apply-templates select="self::xref"/>
			<xsl:apply-templates select="self::xref-nonref"/>
		</xsl:if>
		<xsl:apply-templates select="self::symbol"/>
	</xsl:for-each>
</xsl:template>

</xsl:stylesheet>