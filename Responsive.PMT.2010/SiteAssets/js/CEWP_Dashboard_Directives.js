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
    directives: null,
    props: null,
    html: ""
}

CKO.DASHBOARD.Directives = function () {

    var v = CKO.DASHBOARD.VARIABLES;

    function Init(site) {
        var inDesignMode = document.forms[MSOWebPartPageFormName].MSOLayout_InDesignMode.value;
        logit("Design Mode = " + inDesignMode);
        if (inDesignMode === "1") {
            $("#Directives").html("").append("<div style='margin:5px;text-align:center;font-weight:bold;font-size:14px;font-style:italic;'>Query Suspended During Page Edit Mode</div>");
        }
        else {
            loadCSS(site + '/SiteAssets/css/CEWP_Dashboard_Directives.css');
            loadCSS(site + '/SiteAssets/css/responsive.bootstrap.min.css');
            LoadDirectives();
            //loadscript(site + '/SiteAssets/js/jquery.dataTables.min.js', function () {
            //    loadscript(site + '/SiteAssets/js/dataTables.bootstrap.min.js', function () {
            //        LoadDirectives();
            //    });
            //});
        }
    }

    function LoadDirectives() {
        v.directives = new Array();
        v.props = new Array();
        //Load Directives From REST to filter archived ones out
        var urlString = "https://hq.tradoc.army.mil/sites/OCKO/PMT/_vti_bin/listdata.svc/Directives?";
        urlString += "$select=Id,Directive,DirectiveStatusValue,LeadAssessmentValue,SuspenseDate,StaffLead,SupportedOrg,SupportingOrg,TrainedValue,EquippedValue,Expended,PercentExpended,ProjectedManHours";
        urlString += "&$expand=StaffLead";
        urlString += "&$filter=(DirectiveStatusValue eq 'InProgress')";
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
                v.html += "<table id='tblDirectives' class='table table-bordered table-hover' cellspacing='0' cellpadding='0'>"
                v.html += "<thead><tr><td class='squarekpi'>Lead<br/>Assessment</td><td class='titlecolumn'>Directive</td><td class='circlekpi'>Status</td><td>Suspense</td><td>Lead</td><td>Supported Org</td><td>Supporting Org</td><td class='circlekpi'>Resourced</td><td>Expended</td><td>Percent<br/>Expended</td></tr></thead>";
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
                    v.html += "<td><a href='#' class='lnkDirective' data-id='" + j[i]["Id"] + "'>" + j[i]["Directive"] + "</a></td>";
                    var a = moment(j[i]["SuspenseDate"]);
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
                    v.html += "<td></td>";
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
        $('#tblDirectives').dataTable({
            "scrollY": "300px",
            "scrollCollapse": true,
            "paging": false,
            "searching": false
        });
        $(".lnkDirective").on("click", function (e) {
            e.preventDefault();
            var zurl = fixurl('/Lists/Directives/EditForm.aspx?ID=' + $(this).attr("data-id") + '&IsDlg=1');
            CKODialog(zurl, 'Edit Directive', '1000', '800', 'NotificationCallback');
        });
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
                    logit("Actions Data Loaded!");
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