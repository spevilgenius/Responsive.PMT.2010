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
    groups: null,
    LoginName: null,
    userID: null,
    directives: null,
    props: null,
    directives2: null,
    role: "Visitor",
    html: ""
}


CKO.DASHBOARD.Directives = function () {

    var v = CKO.DASHBOARD.VARIABLES;

    function Init(site) {
        v.site = site;
        var inDesignMode = document.forms[MSOWebPartPageFormName].MSOLayout_InDesignMode.value;
        logit("Design Mode = " + inDesignMode);
        if (inDesignMode === "1") {
            $("#Directives").html("").append("<div style='margin:5px;text-align:center;font-weight:bold;font-size:14px;font-style:italic;'>Query Suspended During Page Edit Mode</div>");
        }
        else {
            loadCSS(site + '/SiteAssets/css/CEWP_Dashboard_Directives.css');
            loadCSS(site + '/SiteAssets/css/responsive.bootstrap.min.css');
            $.when(CKO.CSOM.GetUserInfo.isuseringroup("PMT Members")).then(function (found) {
                if (found == true) { //user is in group
                    logit("You are a member of the PMT Members group.");
                    v.role = "Member";
                }
                LoadDirectives();
                //var lemur = LoadDirectives2();
                //jQuery.when.apply(null, lemur).done(function () {
                //    LoadDirectives();
                //});
            }, function (sender, args) {
                logit("Error getting user data : " + args.get_message());
            });
        }
    }

    function LoadDirectives2() {
        v.directives2 = new Array();
        var deferreds = [];

        var inc = "Include(";
        var xml = "<View><Method Name='Read List' /><Query><OrderBy><FieldRef Name='SuspenseDate' /></OrderBy><Where><Eq><FieldRef Name='DirectiveStatus' /><Value Type='Text'>InProgress</Value></Eq></Where></Query>";
        var fields = ["Title", "SuspenseDate", "Directive", "DirectiveStatus"];
        xml += "<ViewFields>";
        for (var z = 0; z <= fields.length - 1; z++) {
            xml += "<FieldRef Name='" + fields[z] + "'/>";
            if (z == fields.length - 1) {
                inc += fields[z] + ")";
            }
            else {
                inc += fields[z] + ", ";
            }
        }
        xml += "<FieldRef Name='ID'/>";
        xml += "</ViewFields>";
        xml += "</View>";

        deferreds.push($.when(CKO.CSOM.GetListItems.getitemsfilteredcomplex("current", "Directives", xml, inc)).then(function (items) {
            if (items.get_count() > 0) { //get map data
                enumerator = items.getEnumerator();
                while (enumerator.moveNext()) {
                    var prop = enumerator.get_current();
                    logit("Directive: " + prop.get_item("Directive") + "-- Returned CSOM Suspense Date: " + prop.get_item("SuspenseDate"));
                    v.directives2.push({
                        "Title": prop.get_item("Title"),
                        "SuspenseDate": prop.get_item("SuspenseDate"),
                        "ListItem": prop
                    });
                }
            }
        }, function (sender, args) {
            logit("Error getting data from SiteProperties list : " + args.get_message());
        }));
        return deferreds;
    }

    function LoadDirectives() {
        v.directives = new Array();
        v.props = new Array();
        //Load Directives From REST to filter archived ones out
        var urlString = v.site + "/_vti_bin/listdata.svc/Directives?";
        urlString += "$select=Id,Directive,DirectiveStatusValue,LeadAssessmentValue,SuspenseDate,StaffLead,SupportedOrg,SupportingOrg,TrainedValue,EquippedValue,Expended,PercentExpended,ProjectedManHours";
        urlString += "&$expand=StaffLead";
        urlString += "&$filter=(DirectiveStatusValue eq 'InProgress')";
        urlString += "&$orderby=SuspenseDate";

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
                var resourced = "";
                v.html += "<table id='tblDirectives' cellspacing='0' cellpadding='0' class='table table-bordered table-hover'>"
                v.html += "<thead><tr><th class='squarekpi'>Lead<br/>Assessment</th><th class='titlecolumn'>Directive</th><th class='circlekpi'>Status</th><th>Suspense</th><th>Lead</th><th>Supported Org</th><th>Supporting Org</th><th class='circlekpi'>Resourced</th><th>Expended</th><th>Percent<br/>Expended</th></tr></thead>";
                v.html += "<tbody>";
                for (var i = 0, length = j.length; i < length; i++) {
                    v.directives.push({
                        "Title": j[i]["Directive"],
                        "PMH": j[i]["ProjectedManHours"],
                        "Expended": "",
                        "PercentExpended": "",
                        "Id": j[i]["Id"]
                    });
                    v.html += "<tr>";
                    la = j[i]["LeadAssessmentValue"];
                    e = j[i]["EquippedValue"];
                    e = e.split(";");
                    t = j[i]["TrainedValue"];
                    t = t.split(";");
                    la = la.split(";");
                    switch (la[0]) {
                        case "Green":
                            v.html += "<td class='greensquare'></td>";
                            break;

                        case "Amber":
                            v.html += "<td class='yellowsquare'></td>";
                            break;

                        case "Red":
                            v.html += "<td class='redsquare'></td>";
                            break;

                        default:
                            v.html += "<td></td>";
                            break;
                    }
                    if (v.role == "Visitor") {
                        v.html += "<td>" + j[i]["Directive"] + "</td>";
                    }
                    else {
                        v.html += "<td><a href='#' class='lnkDirective' data-id='" + j[i]["Id"] + "' data-directive='" + j[i]["Directive"] + "'>" + j[i]["Directive"] + "</a></td>";
                    }
                    var a = moment(j[i]["SuspenseDate"]);
                    a.add(a.utcOffset() * -1, 'm');
                    var b = moment();
                    var c = a.diff(b, 'days');
                    var d;
                    var pt;
                    switch (true) {
                        case (c < 0):
                            d = "redcircle powerTip";
                            pt = Math.abs(c) + " days past due.";
                            break;

                        case (c == 0):
                            d = "yellowcircle powerTip";
                            pt = "due today."
                            break;

                        case (c <= 7):
                            d = "yellowcircle powerTip";
                            pt = c + " days left."
                            break;

                        case (c > 7):
                            d = "greencircle powerTip";
                            pt = c + " days left."
                            break;
                    }
                    v.html += "<td class='" + d + "' data-powertip='" + pt + "'></td>";
                    v.html += "<td>" + a.format("YYYY-MM-DD") + "</td>";
                    var sl = j[i]["StaffLead"]["LastName"];
                    v.html += "<td>" + sl + "</td>";
                    v.html += "<td>" + j[i]["SupportedOrg"] + "</td>";
                    v.html += "<td>" + j[i]["SupportingOrg"] + "</td>";
                    r = Math.round(((Number(la[1]) * 2) + Number(e[1]) + Number(t[1])) / 3);
                    switch (true) {
                        case (r == 1):
                            d = "greencircle powerTip";
                            break;

                        case (r == 2):
                            d = "yellowcircle powerTip";
                            break;

                        case (r == 3):
                            d = "redcircle powerTip";
                            break;
                    }
                    var imga = $("<img style='width:16px;'/>");
                    imga.attr("class", "powerTip");
                    imga.attr("src", "../SiteAssets/images/" + la[0].toLowerCase() + "dot.png");
                    var imgb = $("<img style='width:16px;'/>");
                    imgb.attr("class", "powerTip");
                    imgb.attr("src", "../SiteAssets/images/" + t[0].toLowerCase() + "dot.png");
                    var imgc = $("<img style='width:16px;'/>");
                    imgc.attr("class", "powerTip");
                    imgc.attr("src", "../SiteAssets/images/" + e[0].toLowerCase() + "dot.png");
                    resourced = "" + imga.prop('outerHTML') + "&nbsp;Lead Assessment<br/>" + imgb.prop('outerHTML') + "&nbsp;Trained<br/>" + imgc.prop('outerHTML') + "&nbsp;Equipped";

                    v.html += "<td class='" + d + "' data-powertip='" + resourced + "'></td>";
                    v.html += "<td>" + j[i]["Expended"] + "</td>";
                    v.html += "<td>" + ((j[i]["PercentExpended"]) * 100).toFixed(1) + "%</td>";
                    v.html += "</tr>";
                }
                v.html += "</tbody></table>";
                $("#Directives").html("").append(v.html);
                DataLoaded();
            }
        });
    }

    function DataLoaded() {
        logit("Data Loaded");
        if (v.role == "Visitor") {
            $('#tblDirectives').dataTable({
                "scrollY": "300px",
                "scrollCollapse": true,
                "paging": false,
                "searching": false,
                "ordering": false
            });
        }
        else {
            $('#tblDirectives').dataTable({
                "scrollY": "300px",
                "scrollCollapse": true,
                "paging": false,
                "searching": false
            });
            $(".lnkDirective").on("click", function (e) {
                e.preventDefault();
                var zurl = fixurl('/Lists/Directives/DispForm.aspx?ID=' + $(this).attr("data-id") + '&Directive=' + $(this).attr("data-directive") + '&IsDlg=1');
                CKODialog(zurl, 'View Directive', '1100', '800', 'NotificationCallback');
            });
        }
        $(".powerTip").powerTip({
            placement: "n"
        });
        var monkey = CheckExpendedHours();
        jQuery.when.apply(null, monkey).done(function () {
            // Is the date < today
            var a = moment(v.props[0].Date);
            var b = moment();
            var c = a.diff(b, 'days');
            if (c < 0) {
                var dog = getExpendedHoursByDirective();
                jQuery.when.apply(null, dog).done(function () {
                    var stop = "stop";
                    UpdateExpendedHours();
                });
            }
        });
    }

    function CheckExpendedHours() {
        var deferreds = [];

        var inc = "Include(";
        var xml = "<View><Method Name='Read List' /><Query><OrderBy><FieldRef Name='Title' /></OrderBy><Where><Eq><FieldRef Name='Title' /><Value Type='Text'>ExpendedHoursUpdated</Value></Eq></Where></Query>";
        var fields = ["Title", "DateData"];
        xml += "<ViewFields>";
        for (var z = 0; z <= fields.length - 1; z++) {
            xml += "<FieldRef Name='" + fields[z] + "'/>";
            if (z == fields.length - 1) {
                inc += fields[z] + ")";
            }
            else {
                inc += fields[z] + ", ";
            }
        }
        xml += "<FieldRef Name='ID'/>";
        xml += "</ViewFields>";
        xml += "</View>";

        deferreds.push($.when(CKO.CSOM.GetListItems.getitemsfilteredcomplex("current", "SiteProperties", xml, inc)).then(function (items) {
            if (items.get_count() > 0) { //get map data
                enumerator = items.getEnumerator();
                while (enumerator.moveNext()) {
                    var prop = enumerator.get_current();
                    v.props.push({
                        "Title": prop.get_item("Title"),
                        "Date": prop.get_item("DateData"),
                        "ListItem": prop
                    });
                }
            }
        }, function (sender, args) {
            logit("Error getting data from SiteProperties list : " + args.get_message());
        }));
        return deferreds;
    }

    function getExpendedHoursByDirective() {
        var deferreds = [];
        for (i = 0; i < v.directives.length; i++) {
            deferreds.push($.when(CKO.CSOM.GetListItems.getitemsfilteredandpasstoelement("current", "Actions", "Title", v.directives[i].Title, i)).then(function (items, i) {
                if (items.get_count() > 0) {
                    var enumerator = items.getEnumerator();
                    var total = 0;
                    while (enumerator.moveNext()) {
                        var current = enumerator.get_current();
                        var hours = current.get_item("Expended");
                        if (isNaN(hours)) {
                            logit("Action id: " + current.get_id() + " does not contain a valid hour entry. Entry: " + hours);
                        }
                        else {
                            total += hours;
                        }
                    }
                    v.directives[i].Expended = total;
                    if (v.directives[i].PMH == "" || v.directives[i].PMH == null) { }
                    else {
                        var pe = parseFloat((total / v.directives[i].PMH).toFixed(1));
                        v.directives[i].PercentExpended = pe;
                    }
                }
            }, function (sender, args) {
                logit("Error getting data from Actions list: " + args.get_message());
            }));
        }
        return deferreds;
    }

    function UpdateExpendedHours() {
        // Have they been updated already today?
        // Loop the directives array and check the 'LastUpdated' date and if it is earlier than today, update it
        var updates = [];
        v.ctx = SP.ClientContext.get_current();
        v.list = v.ctx.get_web().get_lists().getByTitle("Directives");
        for (var i = 0; i < v.directives.length; i++) {
            v.listitem = v.list.getItemById(v.directives[i].Id, "Include(EncodedAbsUrl, ContentType)");
            v.listitem.set_item('Expended', v.directives[i].Expended);
            v.listitem.set_item('PercentExpended', v.directives[i].PercentExpended);
            v.listitem.update();
            updates[i] = v.listitem;
            v.ctx.load(updates[i]);
        }
        v.ctx.executeQueryAsync(AddItemsSucceeded, AddItemsFailed);
    }

    function AddItemsSucceeded() {
        // Now update the SiteProperty to todays date
        v.ctx = SP.ClientContext.get_current();
        v.listitem = v.props[0].ListItem;
        v.listitem.set_item('DateData', dateformat(new Date(), "isodefault"));
        v.listitem.update();
        v.ctx.load(v.listitem);
        v.ctx.executeQueryAsync(UpdatePropSucceeded, UpdatePropFailed);
    }

    function UpdatePropSucceeded() {
        logit("Directives Hours Updated");
    }

    function AddItemsFailed(sender, args) {
        logit("AddItemsFailed: " + args.get_message());
        return false;
    }

    function UpdatePropFailed(sender, args) {
        logit("UpdatePropFailed: " + args.get_message());
        return false;
    }

    return {
        Init: Init
    }
}

SP.SOD.notifyScriptLoadedAndExecuteWaitingJobs('CEWP_Dashboard_Directives.js');


