﻿<%@ Page language="C#"   Inherits="Microsoft.SharePoint.Publishing.PublishingLayoutPage,Microsoft.SharePoint.Publishing,Version=14.0.0.0,Culture=neutral,PublicKeyToken=71e9bce111e9429c" %>
<%@ Register Tagprefix="SharePointWebControls" Namespace="Microsoft.SharePoint.WebControls" Assembly="Microsoft.SharePoint, Version=14.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %> <%@ Register Tagprefix="WebPartPages" Namespace="Microsoft.SharePoint.WebPartPages" Assembly="Microsoft.SharePoint, Version=14.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %> <%@ Register Tagprefix="PublishingWebControls" Namespace="Microsoft.SharePoint.Publishing.WebControls" Assembly="Microsoft.SharePoint.Publishing, Version=14.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %> <%@ Register Tagprefix="PublishingNavigation" Namespace="Microsoft.SharePoint.Publishing.Navigation" Assembly="Microsoft.SharePoint.Publishing, Version=14.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<asp:Content ContentPlaceholderID="PlaceHolderAdditionalPageHead" runat="server">
	<SharePointWebControls:UIVersionedContent UIVersion="3" runat="server">
		<ContentTemplate>
			<style type="text/css">
				Div.ms-titleareaframe {
					height: 100%;
				}
				.ms-pagetitleareaframe table {
					background: none;
				}
			</style>
		</ContentTemplate>
	</SharePointWebControls:UIVersionedContent>
	<SharePointWebControls:UIVersionedContent UIVersion="4" runat="server">
		<ContentTemplate>
			<SharePointWebControls:CssRegistration name="<% $SPUrl:~sitecollection/Style Library/~language/Core Styles/page-layouts-21.css %>" runat="server"/>
			<PublishingWebControls:EditModePanel runat="server">
				<!-- Styles for edit mode only-->
				<SharePointWebControls:CssRegistration name="<% $SPUrl:~sitecollection/Style Library/~language/Core Styles/edit-mode-21.css %>"
					After="<% $SPUrl:~sitecollection/Style Library/~language/Core Styles/page-layouts-21.css %>" runat="server"/>
			</PublishingWebControls:EditModePanel>
		</ContentTemplate>
	</SharePointWebControls:UIVersionedContent>
</asp:Content>
<asp:Content ContentPlaceHolderId="PlaceHolderPageTitle" runat="server">
	<SharePointWebControls:UIVersionedContent UIVersion="3" runat="server">
		<ContentTemplate>
			<SharePointWebControls:ListProperty Property="Title" runat="server"/> - <SharePointWebControls:ListItemProperty Property="BaseName" MaxLength=40 runat="server"/>
		</ContentTemplate>
	</SharePointWebControls:UIVersionedContent>
	<SharePointWebControls:UIVersionedContent UIVersion="4" runat="server">
		<ContentTemplate>
			<SharePointWebControls:ListProperty Property="Title" runat="server"/> - <SharePointWebControls:FieldValue FieldName="Title" runat="server"/>
		</ContentTemplate>
	</SharePointWebControls:UIVersionedContent>
</asp:Content>
<asp:Content ContentPlaceHolderId="PlaceHolderPageTitleInTitleArea" runat="server">
	<SharePointWebControls:VersionedPlaceHolder UIVersion="3" runat="server">
		<ContentTemplate>
			<WebPartPages:WebPartZone runat="server" Title="loc:TitleBar" ID="TitleBar" AllowLayoutChange="false" AllowPersonalization="false"><ZoneTemplate></ZoneTemplate></WebPartPages:WebPartZone>
		</ContentTemplate>
	</SharePointWebControls:VersionedPlaceHolder>
	<SharePointWebControls:UIVersionedContent UIVersion="4" runat="server">
		<ContentTemplate>
			<SharePointWebControls:FieldValue FieldName="Title" runat="server" />
		</ContentTemplate>
	</SharePointWebControls:UIVersionedContent>
</asp:Content>
<asp:Content ContentPlaceHolderId="PlaceHolderTitleBreadcrumb" runat="server"> <SharePointWebControls:VersionedPlaceHolder UIVersion="3" runat="server"> <ContentTemplate> <asp:SiteMapPath ID="siteMapPath" runat="server" SiteMapProvider="CurrentNavigation" RenderCurrentNodeAsLink="false" SkipLinkText="" CurrentNodeStyle-CssClass="current" NodeStyle-CssClass="ms-sitemapdirectional"/> </ContentTemplate> </SharePointWebControls:VersionedPlaceHolder> <SharePointWebControls:UIVersionedContent UIVersion="4" runat="server"> <ContentTemplate> <SharePointWebControls:ListSiteMapPath runat="server" SiteMapProviders="CurrentNavigation" RenderCurrentNodeAsLink="false" PathSeparator="" CssClass="s4-breadcrumb" NodeStyle-CssClass="s4-breadcrumbNode" CurrentNodeStyle-CssClass="s4-breadcrumbCurrentNode" RootNodeStyle-CssClass="s4-breadcrumbRootNode" NodeImageOffsetX=0 NodeImageOffsetY=353 NodeImageWidth=16 NodeImageHeight=16 NodeImageUrl="/_layouts/images/fgimg.png" HideInteriorRootNodes="true" SkipLinkText="" /> </ContentTemplate> </SharePointWebControls:UIVersionedContent> </asp:Content>
<asp:Content ContentPlaceHolderId="PlaceHolderPageDescription" runat="server">
	<SharePointWebControls:ProjectProperty Property="Description" runat="server"/>
</asp:Content>
<asp:Content ContentPlaceHolderId="PlaceHolderBodyRightMargin" runat="server">
	<div height=100% class="ms-pagemargin"><IMG SRC="/_layouts/images/blank.gif" width=10 height=1 alt=""></div>
</asp:Content>
<asp:Content ContentPlaceHolderId="PlaceHolderMain" runat="server">
	<SharePointWebControls:UIVersionedContent UIVersion="4" runat="server">
		<ContentTemplate>
			<div class="welcome blank-wp">
				<PublishingWebControls:EditModePanel runat="server" CssClass="edit-mode-panel">
					<SharePointWebControls:TextField runat="server" FieldName="Title"/>
				</PublishingWebControls:EditModePanel>
				<div class="welcome-content">
					<PublishingWebControls:RichHtmlField FieldName="PublishingPageContent" HasInitialFocus="True" MinimumEditHeight="400px" runat="server"/>
				</div>
		</ContentTemplate>
	</SharePointWebControls:UIVersionedContent>
	<table cellpadding="4" cellspacing="0" border="0" width="100%">
		<SharePointWebControls:UIVersionedContent UIVersion="3" runat="server">
			<ContentTemplate>
				<tr>
					<td valign="top" style="padding:0" colspan="3" width="100%">
						<PublishingWebControls:RichHtmlField id="PageContent" FieldName="PublishingPageContent" runat="server"/>
					</td>
				</tr>
			</ContentTemplate>
		</SharePointWebControls:UIVersionedContent>
		<tr>
			<td valign="top" style="padding:0">
				<table cellpadding="4" cellspacing="0" border="0" width="100%" height="100%">
					<tr>
						<td id="_invisibleIfEmpty" name="_invisibleIfEmpty" colspan="3" valign="top"> <WebPartPages:WebPartZone runat="server" Title="<%$Resources:cms,WebPartZoneTitle_Header%>" ID="Header"/> </td>
					</tr>
					<tr>
						<td width="100%" colspan="3" valign="top" style="padding:0">
							<table cellpadding="4" cellspacing="0" width="100%" height="100%">
								<tr>
									<td id="_invisibleIfEmpty" name="_invisibleIfEmpty" valign="top"> <WebPartPages:WebPartZone runat="server" Title="<%$Resources:cms,WebPartZoneTitle_TopLeft%>" ID="TopLeftRow" /> </td>
																	<td id="_invisibleIfEmpty" name="_invisibleIfEmpty" valign="top"> <WebPartPages:WebPartZone runat="server" Title="<%$Resources:cms,WebPartZoneTitle_TopRight%>" ID="TopRightRow" /> </td>
								</tr>
							</table>
						</td>
					</tr>							<tr>
						<td id="_invisibleIfEmpty" name="_invisibleIfEmpty" valign="top" height="100%"> <WebPartPages:WebPartZone runat="server" Title="<%$Resources:cms,WebPartZoneTitle_CenterLeft%>" ID="CenterLeftColumn" /> </td>
						<td id="_invisibleIfEmpty" name="_invisibleIfEmpty" valign="top" height="100%"> <WebPartPages:WebPartZone runat="server" Title="<%$Resources:cms,WebPartZoneTitle_Center%>" ID="CenterColumn"  /> </td>
						<td id="_invisibleIfEmpty" name="_invisibleIfEmpty" valign="top" height="100%"> <WebPartPages:WebPartZone runat="server" Title="<%$Resources:cms,WebPartZoneTitle_CenterRight%>" ID="CenterRightColumn" /> </td>
					</tr>
					<tr>
						<td id="_invisibleIfEmpty" name="_invisibleIfEmpty" colspan="3" valign="top"> <WebPartPages:WebPartZone runat="server" Title="<%$Resources:cms,WebPartZoneTitle_Footer%>" ID="Footer"/> </td>
					</tr>
				</table>
			</td>
			<td id="_invisibleIfEmpty" name="_invisibleIfEmpty" valign="top" height="100%"> <WebPartPages:WebPartZone runat="server" Title="<%$Resources:cms,WebPartZoneTitle_Right%>" ID="RightColumn" Orientation="Vertical"/> </td>
		</tr>
		<script language="javascript">if(typeof(MSOLayout_MakeInvisibleIfEmpty) == "function") {MSOLayout_MakeInvisibleIfEmpty();}</script>
	</table>
	<SharePointWebControls:UIVersionedContent UIVersion="4" runat="server">
		<ContentTemplate>
			</div>
		</ContentTemplate>
	</SharePointWebControls:UIVersionedContent>
</asp:Content>
