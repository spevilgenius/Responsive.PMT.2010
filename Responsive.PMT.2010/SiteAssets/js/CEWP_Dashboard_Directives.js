var CKO = CKO || {};
CKO.AJAX = CKO.AJAX || {};
CKO.DASHBOARD = CKO.DASHBOARD || {};
CKO.DASHBOARD.VARIABLES = CKO.DASHBOARD.VARIABLES || {};

CKO.DASHBOARD.VARIABLES = {
    site: null,
    loc: String(window.location),
    waitmsg: null,
    title: null,
    ctx: null,
    web: null,
    list: null,
    listitem: null,
    user: null,
    userID: null,
    html: ""
}

CKO.DASHBOARD.Directives = function () {

    var v = CKO.DASHBOARD.VARIABLES;

    function Init(site) {
        loadCSS(site + '/SiteAssets/css/CEWP_Dashboard_Directives.css');
        v.userID = _spPageContextInfo.userId;
        v.ctx = new SP.ClientContext.get_current();
        v.web = v.ctx.get_web();
        v.user = v.web.get_currentUser();
        v.ctx.load(v.user);
        v.ctx.executeQueryAsync(GetUserDataSucceeded, GetUserDataFailed);
    }

    function GetUserDataSucceeded() {
        LoadDirectives();
    }

    function GetUserDataFailed(sender, args) {
        alert("GetUserDataFailed: " + args.get_message());
    }

    function LoadDirectives() {
        //Load Directives From REST to filter archived ones out
        var urlString = "https://hq.tradoc.army.mil/sites/OCKO/PMT/_vti_bin/listdata.svc/Directives?";
        urlString += "$select=Id,Directive,DirectiveStatusValue,LeadAssessmentValue,SuspenseDate,StaffLead,SupportedOrg,SupportingOrg,TrainedValue,EquippedValue,Expended";
        urlString += "&$filter=(DirectiveStatusValue ne 'Archived')";
        urlString += "&$orderby=SuspenseDate";

        jQuery.ajax({
            url: urlString,
            method: "GET",
            headers: { 'accept': 'application/json; odata=verbose' },
            error: function (jqXHR, textStatus, errorThrown) {
                //to do implement logging to a central list
                logit("Error Status: " + textStatus + ":: errorThrown: " + errorThrown);
            },
            success: function (data) {
                var results = data.d.results;
                var j = jQuery.parseJSON(JSON.stringify(results));
                var numitems = data.d.results.length;
                logit("Directives Count: " + numitems);
                v.html += "<table id='tblDirectives' class='table table-bordered table-hover'>"
                v.html += "<tr><td class='squarekpi'>Lead<br/>Assessment</td><td class='titlecolumn'>Directive</td><td class='circlekpi'>Status</td><td>Suspense</td><td>Lead</td><td>Supported Org</td><td>Supporting Org</td><td class='circlekpi'>Resourced</td><td>Expended</td></tr>";
                for (var i = 0, length = j.length; i < length; i++) {
                    v.html += "<tr>";
                    la = j[i]["LeadAssessmentValue"];
                    la = la.split(";");
                    switch (la[0]) {
                        case "Green":
                            v.html += "<td class='greencircle'></td>";
                            break;

                        case "Amber":
                            v.html += "<td class='yellowcircle'></td>";
                            break;

                        case "Red":
                            v.html += "<td class='redcircle'></td>";
                            break;

                        default:
                            v.html += "<td></td>";
                            break;
                    }
                    
                    v.html += "<td></td>";
                    v.html += "<td></td>";
                    v.html += "<td></td>";
                    v.html += "<td></td>";
                    v.html += "<td></td>";
                    v.html += "<td></td>";
                    v.html += "<td></td>";
                    v.html += "<td></td>";
                    v.html += "</tr>";
                }
                v.html += "</table>";
                $("#Directives").html("").append(v.html);
                DataLoaded();
            }
        });
    }

    function DataLoaded() {
        logit("Data Loaded");

    }

    return {
        Init: Init
    }
}

SP.SOD.notifyScriptLoadedAndExecuteWaitingJobs('CEWP_Dashboard_Directives.js');