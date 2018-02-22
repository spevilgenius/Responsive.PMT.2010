var CKO = CKO || {};
CKO.REPORTS = CKO.REPORTS || {};
CKO.REPORTS.MISSINGHOURS = CKO.REPORTS.MISSINGHOURS || {};

CKO.REPORTS.MISSINGHOURS.VARIABLES = {
    site: null,
    loc: String(window.location),
    title: null,
    defarr: [],
    users: [],
    orgs: [],
    org: null,
    totalboxes: 0,
    calstart: null,
    calend: null,
    html: ""
}

CKO.REPORTS.MISSINGHOURS.Report = function () {

    var v = CKO.REPORTS.MISSINGHOURS.VARIABLES;

    function Init(site) {
        v.site = site;
        $().SPSTools_Notify({ type: 'wait', content: 'Loading Your Report...Please wait...' });
        loadCSS(site + '/SiteAssets/css/fullcalendar.min.css');
        loadscript(site + '/SiteAssets/js/fullcalendar.min.js', function () {
            GetOrgs();
        });
    }

    function GetOrgs() {
        v.calend = moment().format('YYYY-MM-DD');
        v.calstart = moment(v.calend).subtract(30, 'days').format('YYYY-MM-DD');
        v.totalboxes = 31;
        v.orgs = [];
        // Get all of the orgs from the Organization list excluding those not supported
        var urlString = v.site + "/_vti_bin/listdata.svc/Organization?";
        urlString += "$select=Id,Title,OrganizationTypeValue";
        urlString += "&$orderby=Title";
        urlString += "&$filter=(OrganizationTypeValue ne 'Not currently supported')";

        jQuery.ajax({
            url: urlString,
            method: "GET",
            headers: { 'accept': 'application/json; odata=verbose' },
            error: function (jqXHR, textStatus, errorThrown) {
                logit("Error Status: " + textStatus + ":: errorThrown: " + errorThrown);
            },
            success: function (data) {
                var results = data.d.results;
                var j = jQuery.parseJSON(JSON.stringify(results));
                var numitems = data.d.results.length;
                for (var i = 0; i < numitems; i++) {
                    v.orgs.push({
                        org: j[i]["Title"]
                    });
                }
                drawBaseUI();
            }
        });
    }

    function drawBaseUI() {
        v.html = "";
        for (var i = 0; i < v.orgs.length; i++) {
            var org = v.orgs[i].org;// trim the org!!
            org = org.replace(/\s/g, '');
            org = org.replace(/(\r\n|\n|\r)/gm, "");
            org = org.trim();
            v.html += "<div class='panel panel-success'>";
            v.html += "<div class='panel-heading'>";
            v.html += "<h4 class='panel-title'><a data-toggle='collapse' data-parent='#HoursReport' href='#collapse_" + org + "'>" + org + "</a></h4>";
            v.html += "</div>";
            v.html += "<div id='collapse_" + org + "' class='panel-collapse collapse' data-drawn='false' data-index='" + i + "'>";
            v.html += "<div class='panel-body' id='" + org + "_panel'></div></div></div>";
        }
        $("#MissingHoursReport").html("").append(v.html);
        drawBaseGantts();
    }

    function drawBaseGantts() {
        var dow = ["S", "M", "T", "W", "T", "F", "S"];
        for (var i = 0; i < v.orgs.length; i++) {
            v.html = "";
            var org = v.orgs[i].org;// trim the org!!
            org = org.replace(/\s/g, '');
            org = org.replace(/(\r\n|\n|\r)/gm, "");
            org = org.trim();
            v.html += "<table class='table table-bordered'>";
            v.html += "<thead class='table-heading'><tr><th colspan='";
            v.html += v.totalboxes;
            v.html += "'>Past 30 Days</th></tr>";
            v.html += "<tr><th rowspan='2'>User</th>";
            for (var k = 0; k < v.totalboxes - 1; k++) {
                var cd = moment(v.calstart).add('days', k);
                var weekday = moment(cd).day();
                v.html += "<th>" + dow[weekday] + "</th>";
            }
            v.html += "</tr><tr>";
            for (var k = 0; k < v.totalboxes - 1; k++) {
                var cd = moment(v.calstart).add('days', k);
                var cdn = moment(cd).date();
                v.html += "<th>" + cdn + "</th>";
            }
            v.html += "</tr></thead>";
            v.html += "<tbody id='" + org + "_tbody'></tbody>";
            v.html += "</table>";
            $("#" + org + "_panel").append(v.html);
            $("#collapse_" + org).on('shown.bs.collapse', function () {
                logit("Org Expanded!");
                if ($(this).attr("data-drawn") == 'false') {
                    $().SPSTools_Notify({ type: 'wait', content: 'Loading Organization Report...Please wait...' });
                    var id = $(this).attr("id");
                    var idx = $(this).attr("data-index");
                    id = id.split("_");
                    $(this).attr("data-drawn", "true");
                    GetUsersFromOrg(id[1]);
                }
            });
        }
        $("#SPSTools_Notify").fadeOut("2500", function () {
            $("#SPSTools_Notify").html("");
        });
    }

    function GetUsersFromOrg(org) {
        v.org = org;
        if (v.org == "HQTRADOC") { v.org = "HQ TRADOC"; }
        v.users = [];  // reset user array
        var urlString = v.site + "/_vti_bin/listdata.svc/KnowledgeMap?";
        urlString += "$select=Id,Organization,SharePointUser,TDAOnhand";
        urlString += "&$expand=SharePointUser";
        urlString += "&$filter=(TDAOnhand eq true)";

        jQuery.ajax({
            url: urlString,
            method: "GET",
            headers: { 'accept': 'application/json; odata=verbose' },
            error: function (jqXHR, textStatus, errorThrown) {
                logit("Error Status: " + textStatus + ":: errorThrown: " + errorThrown);
            },
            success: function (data) {
                var results = data.d.results;
                var j = jQuery.parseJSON(JSON.stringify(results));
                var numitems = data.d.results.length;
                for (var i = 0; i < numitems; i++) {
                    var usertext = "";
                    var oc = j[i]["Organization"];
                    if (oc == v.org) {
                        if (j[i]["SharePointUser"] !== null) {
                            usertext = j[i]["SharePointUser"]["Name"];
                            var org = j[i]["Organization"];
                            if (org.indexOf("HQ") >= 0) {
                                org = "HQTRADOC";
                            }
                            v.users.push({
                                name: usertext,
                                id: j[i]["SharePointUser"]["Id"],
                                org: org,
                                actions: []
                            });
                        }
                    }
                }
                var def = getUserActions();
                jQuery.when.apply(null, def).done(function () {
                    AddUsersToUI();
                });
            }
        });
    }

    function AddUsersToUI() {
        for(var i = 0; i < v.users.length; i++) {
            v.html = "";
            var org = v.users[i].org;
            var id = v.users[i].id;
            // draw boxes for this user
            v.html += "<tr><td>" + v.users[i].name + "</td>";
            for (var k = 0; k < v.totalboxes - 1; k++) {
                var cd = moment(v.calstart).add('days', k);
                var cdn = moment(cd).date();
                var weekday = moment(cd).day();
                if (weekday == 0 || weekday == 6) {
                    v.html += "<td class='daycell weekend' id='day_" + id + "_" + cdn + "' data-date='" + cdn + "'>0</td>";
                }
                else {
                    v.html += "<td class='daycell warning' id='day_" + id + "_" + cdn + "' data-date='" + cdn + "'>0</td>";
                }
            }
            v.html += "</tr>";
            $("#" + org + "_tbody").append(v.html);
            // add user info to boxes
            for (var q = 0; q < v.users[i].actions.length; q++) {
                var gid = v.users[i].actions[q].gid;
                var current =  Number($("#" + gid).text());
                var total = current + v.users[i].actions[q].Hours;
                $("#" + gid).text(total).removeClass("warning").addClass("success");
            }
        }
        DataLoaded();
    }

    function DataLoaded() {
        logit("DataLoaded");
        $("#SPSTools_Notify").fadeOut("2500", function () {
            $("#SPSTools_Notify").html("");
        });
    }

    function getUserActions() {
        var start = moment().subtract(31, 'days').format('YYYY-MM-DD[T]HH:MM:SS[Z]');
        for (var i = 0; i < v.users.length; i++) {
            v.defarr.push($.when(CKO.CSOM.GetActionItems.getitemsbyuseridandpasstoelement("current", "Actions", v.users[i]["id"], start, i)).then(function (items, element) {
                if (items.get_count() > 0) { //get map data
                    enumerator = items.getEnumerator();
                    while (enumerator.moveNext()) {
                        var prop = enumerator.get_current();
                        var dc = prop.get_item("DateCompleted");
                        var m = moment(dc).date();
                        var idx = element;
                        var gid = "day_" + v.users[idx].id + "_" + m;
                        v.users[idx]["actions"].push({
                            id: prop.get_id(),
                            gid: gid,
                            title: prop.get_item("Title"),
                            start: dc,
                            starttext: dc,
                            Hours: prop.get_item("Expended"),
                            backgroundColor: "black",
                            textColor: "white"
                        });
                    }
                }
            }, function (sender, args) {
                logit("Error getting user actions data.");
                $("#SPSTools_Notify").html("");
                $().SPSTools_Notify({ type: 'okalert', content: args.get_message() + '<br/>Error Getting Data. Please refresh the page and try again.' });
            }));
        }
        return v.defarr;
    }

    return {
        Init: Init
    }
}

SP.SOD.notifyScriptLoadedAndExecuteWaitingJobs("CEWP_MissingHoursReport.js");