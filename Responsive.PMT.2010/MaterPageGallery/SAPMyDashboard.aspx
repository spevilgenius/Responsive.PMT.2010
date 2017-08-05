<%@ Page Language="C#" Inherits="Microsoft.SharePoint.Publishing.PublishingLayoutPage,Microsoft.SharePoint.Publishing,Version=14.0.0.0,Culture=neutral,PublicKeyToken=71e9bce111e9429c" %>
<%@ Register TagPrefix="SharePointWebControls" Namespace="Microsoft.SharePoint.WebControls" Assembly="Microsoft.SharePoint, Version=14.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Register TagPrefix="WebPartPages" Namespace="Microsoft.SharePoint.WebPartPages" Assembly="Microsoft.SharePoint, Version=14.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Register TagPrefix="PublishingWebControls" Namespace="Microsoft.SharePoint.Publishing.WebControls" Assembly="Microsoft.SharePoint.Publishing, Version=14.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Register TagPrefix="PublishingNavigation" Namespace="Microsoft.SharePoint.Publishing.Navigation" Assembly="Microsoft.SharePoint.Publishing, Version=14.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
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
            <SharePointWebControls:CssRegistration name="<% $SPUrl:~sitecollection/Style Library/~language/Core Styles/page-layouts-21.css %>" runat="server" />
            <PublishingWebControls:EditModePanel runat="server">
                <!-- Styles for edit mode only-->
                <SharePointWebControls:CssRegistration name="<% $SPUrl:~sitecollection/Style Library/~language/Core Styles/edit-mode-21.css %>" After="<% $SPUrl:~sitecollection/Style Library/~language/Core Styles/page-layouts-21.css %>" runat="server" />
            </PublishingWebControls:EditModePanel>
            <style type="text/css">
                .nomargin {
                    margin: 0 !important;
                }

                .nopadding {
                    padding: 0 !important;
                }
            </style>
        </ContentTemplate>
    </SharePointWebControls:UIVersionedContent>
</asp:Content>
<asp:Content ContentPlaceholderID="PlaceHolderPageTitle" runat="server">
    <SharePointWebControls:UIVersionedContent UIVersion="3" runat="server">
        <ContentTemplate>
            <SharePointWebControls:ListProperty Property="Title" runat="server" /> -
            <SharePointWebControls:ListItemProperty Property="BaseName" MaxLength=40 runat="server" />
        </ContentTemplate>
    </SharePointWebControls:UIVersionedContent>
    <SharePointWebControls:UIVersionedContent UIVersion="4" runat="server">
        <ContentTemplate>
            <SharePointWebControls:ListProperty Property="Title" runat="server" /> -
            <SharePointWebControls:FieldValue FieldName="Title" runat="server" />
        </ContentTemplate>
    </SharePointWebControls:UIVersionedContent>
</asp:Content>
<asp:Content ContentPlaceholderID="PlaceHolderPageTitleInTitleArea" runat="server">
    <SharePointWebControls:VersionedPlaceHolder UIVersion="3" runat="server">
        <ContentTemplate>
            <WebPartPages:WebPartZone runat="server" Title="loc:TitleBar" ID="TitleBar" AllowLayoutChange="false" AllowPersonalization="false">
                <ZoneTemplate></ZoneTemplate>
            </WebPartPages:WebPartZone>
        </ContentTemplate>
    </SharePointWebControls:VersionedPlaceHolder>
    <SharePointWebControls:UIVersionedContent UIVersion="4" runat="server">
        <ContentTemplate>
            <SharePointWebControls:FieldValue FieldName="Title" runat="server" />
        </ContentTemplate>
    </SharePointWebControls:UIVersionedContent>
</asp:Content>
<asp:Content ContentPlaceholderID="PlaceHolderTitleBreadcrumb" runat="server">
    <SharePointWebControls:VersionedPlaceHolder UIVersion="3" runat="server">
        <ContentTemplate>
            <asp:SiteMapPath ID="siteMapPath" runat="server" SiteMapProvider="CurrentNavigation" RenderCurrentNodeAsLink="false" SkipLinkText="" CurrentNodeStyle-CssClass="current" NodeStyle-CssClass="ms-sitemapdirectional" /> </ContentTemplate>
    </SharePointWebControls:VersionedPlaceHolder>
    <SharePointWebControls:UIVersionedContent UIVersion="4" runat="server">
        <ContentTemplate>
            <SharePointWebControls:ListSiteMapPath runat="server" SiteMapProviders="CurrentNavigation" RenderCurrentNodeAsLink="false" PathSeparator="" CssClass="s4-breadcrumb" NodeStyle-CssClass="s4-breadcrumbNode" CurrentNodeStyle-CssClass="s4-breadcrumbCurrentNode"
                RootNodeStyle-CssClass="s4-breadcrumbRootNode" NodeImageOffsetX=0 NodeImageOffsetY=353 NodeImageWidth=16 NodeImageHeight=16 NodeImageUrl="/_layouts/images/fgimg.png" HideInteriorRootNodes="true" SkipLinkText="" /> </ContentTemplate>
    </SharePointWebControls:UIVersionedContent>
</asp:Content>
<asp:Content ContentPlaceholderID="PlaceHolderPageDescription" runat="server">
    <SharePointWebControls:ProjectProperty Property="Description" runat="server" />
</asp:Content>
<asp:Content ContentPlaceholderID="PlaceHolderBodyRightMargin" runat="server">
    <div height=100% class="ms-pagemargin">
        <IMG SRC="/_layouts/images/blank.gif" width=10 height=1 alt="">
    </div>
</asp:Content>
<asp:Content ContentPlaceholderID="PlaceHolderMain" runat="server">
    <div class="container-fluid" style="margin-top:20px; margin-bottom:50px;">
        <div class="row">
            <div class="col-sm-12">
                <WebPartPages:WebPartZone runat="server" Title="<%$Resources:cms,WebPartZoneTitle_Header%>" ID="Header">
                    <ZoneTemplate></ZoneTemplate>
                </WebPartPages:WebPartZone>
            </div>
        </div>
        <div class="row">
            <div class="col-sm-6 ColumnTitle">My SAP's</div>
            <div class="col-sm-6 ColumnTitle">My Tasks</div>
        </div>
        <div class="row">
            <div class="col-sm-6">
                <ul class="nav nav-tabs" role="tablist">
                    <li class="active dashboardtab"><a href="#tabDraft" role="tab" data-toggle="tab">Draft</a></li>
                    <li class="dashboardtab"><a href="#tabInitialReview" role="tab" data-toggle="tab">AAO Initial Review</a></li>
                    <li class="dashboardtab"><a href="#tabApproval" role="tab" data-toggle="tab">Stakeholder Approval</a></li>
                    <li class="dashboardtab"><a href="#tabFinalReview" role="tab" data-toggle="tab">AAO Final Review</a></li>
                    <li class="dashboardtab"><a href="#tabApproved" role="tab" data-toggle="tab">Approved</a></li>
                    <li class="dashboardtab"><a href="#tabRejected" role="tab" data-toggle="tab">Rejected</a></li>                                      
                </ul>
                <div class="tab-content">
                    <div role="tabpanel" class="tab-pane active fade in" id="tabDraft">
                        <div class="container-fluid">
                            <div class="row">
                                <WebPartPages:WebPartZone runat="server" Title="Draft" ID="WPZDraft">
                                    <ZoneTemplate></ZoneTemplate>
                                </WebPartPages:WebPartZone>
                            </div>
                        </div>
                    </div>
                    <div role="tabpanel" class="tab-pane" id="tabInitialReview">
                        <div class="container-fluid">
                            <div class="row">
                                <WebPartPages:WebPartZone runat="server" Title="Initial Review" ID="WPZInitalReview">
                                    <ZoneTemplate></ZoneTemplate>
                                </WebPartPages:WebPartZone>
                            </div>
                        </div>
                    </div>
                    <div role="tabpanel" class="tab-pane" id="tabApproval">
                        <div class="container-fluid">
                            <div class="row">
                                <WebPartPages:WebPartZone runat="server" Title="Stakeholder Approval" ID="WPZApproval">
                                    <ZoneTemplate></ZoneTemplate>
                                </WebPartPages:WebPartZone>
                            </div>
                        </div>
                    </div>
                    <div role="tabpanel" class="tab-pane" id="tabFinalReview">
                        <div class="container-fluid">
                            <div class="row">
                                <WebPartPages:WebPartZone runat="server" Title="Final Review" ID="WPZFinalReview">
                                    <ZoneTemplate></ZoneTemplate>
                                </WebPartPages:WebPartZone>
                            </div>
                        </div>
                    </div>
                    <div role="tabpanel" class="tab-pane" id="tabApproved">
                        <div class="container-fluid">
                            <div class="row">
                                <WebPartPages:WebPartZone runat="server" Title="Approved" ID="WPZApproved">
                                    <ZoneTemplate></ZoneTemplate>
                                </WebPartPages:WebPartZone>
                            </div>
                        </div>
                    </div>
                    <div role="tabpanel" class="tab-pane" id="tabRejected">
                        <div class="container-fluid">
                            <div class="row">
                                <WebPartPages:WebPartZone runat="server" Title="Rejected" ID="WPZRejected">
                                    <ZoneTemplate></ZoneTemplate>
                                </WebPartPages:WebPartZone>
                            </div>
                        </div>
                    </div>
                                        
                </div>
            </div>
            <div class="col-sm-6">          
                <div class="container-fluid">
                    <div class="row">
                        <WebPartPages:WebPartZone runat="server" Title="MyTasks" ID="WPZTasks">
                            <ZoneTemplate></ZoneTemplate>
                        </WebPartPages:WebPartZone>
                    </div>
                </div>                   
            </div>
        </div>
    </div>
</asp:Content>
