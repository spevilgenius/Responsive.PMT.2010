var CKO = CKO || {};
CKO.AJAX = CKO.AJAX || {};
CKO.DIRECTIVES = CKO.DIRECTIVES || {};
CKO.DIRECTIVES.VARIABLES = CKO.DIRECTIVES.VARIABLES || {};

CKO.DIRECTIVES.VARIABLES = {
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
    props: null
}


CKO.DIRECTIVES.ExpendedHours = function () {

    var v = CKO.DIRECTIVES.VARIABLES;

    function Init(site) {
        v.site = site;
        var inDesignMode = document.forms[MSOWebPartPageFormName].MSOLayout_InDesignMode.value;
        if (inDesignMode === "1") {
            $("#Directives").html("").append("<div style='margin:5px;text-align:center;font-weight:bold;font-size:14px;font-style:italic;'>Query Suspended During Page Edit Mode</div>");
        }
        else {
            $("#Directives").html("").append("<div style='margin:5px;text-align:center;font-weight:bold;font-size:14px;font-style:italic;'>Updating Expended Hours.<br/>This will take some time.</div>");
            $.when(CKO.CSOM.GetUserInfo.isuseringroup("PMT Members")).then(function (found) {
                if (found === true) { //user is in group
                    logit("You are a member of the PMT Members group.");
                    v.role = "Member";
                }
                LoadDirectives();
            }, function (sender, args) {
                logit("Error getting user data : " + args.get_message());
            });
        }
    }

    function LoadDirectives() {
        v.directives = new Array();
        v.props = new Array();
        var urlString = v.site + "/_vti_bin/listdata.svc/Directives?";
        urlString += "$select=Id,Directive,Expended,PercentExpended,ProjectedManHours";

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
                for (var i = 0, length = j.length; i < length; i++) {
                    v.directives.push({
                        "Title": j[i]["Directive"],
                        "PMH": j[i]["ProjectedManHours"],
                        "Expended": "",
                        "PercentExpended": "",
                        "Id": j[i]["Id"]
                    });
                    
                }
                UpdateExpended()
            }
        });
    }

    function DataLoaded() {
        logit("Data Loaded");
        
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

    function UpdateExpended() {
        SP.UI.Notify.addNotification("Updating Expended Hours...", false);
        var dog = getExpendedHoursByDirective();
        jQuery.when.apply(null, dog).done(function () {
            var stop = "stop";
            UpdateExpendedHours();
        });
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
                    if (isNaN(v.directives[i].PMH) || total === 0) { pe = 0; }
                    else {
                        var pe = parseFloat((total / v.directives[i].PMH).toFixed(1));
                        v.directives[i].PercentExpended = pe;
                    }
                }
                else {
                    logit("Directive " + v.directives[i].Title + " does not have any expended hours.");
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
            // check if this item should be updated
            logit("Directive: " + v.directives[i].Title + " Expended: " + v.directives[i].Expended + " PE: " + v.directives[i].PercentExpended);
            if (isNaN(v.directives[i].Expended) || isNaN(v.directives[i].PercentExpended)) {
                // do not add items that have invalid values
            }
            else {
                v.listitem = v.list.getItemById(v.directives[i].Id, "Include(EncodedAbsUrl, ContentType)");
                v.listitem.set_item('Expended', v.directives[i].Expended);
                v.listitem.set_item('PercentExpended', v.directives[i].PercentExpended);
                v.listitem.update();
                updates[i] = v.listitem;
                //v.ctx.load(updates[i]);
            }
        }
        //v.ctx.executeQueryAsync(AddItemsSucceeded, AddItemsFailed);
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
        $("#Directives").html("").append("<div style='margin:5px;text-align:center;font-weight:bold;font-size:14px;font-style:italic;'>Hours updated. Operation Complete.</div>");
    }

    function AddItemsFailed(sender, args) {
        logit("AddItemsFailed: " + args.get_message());
        $("#Directives").html("").append("<div style='margin:5px;text-align:center;font-weight:bold;color:#ff0000;font-size:14px;font-style:italic;'>Update Items Error: " + args.get_message() + " </div>");
        return false;
    }

    function UpdatePropFailed(sender, args) {
        logit("UpdatePropFailed: " + args.get_message());
        $("#Directives").html("").append("<div style='margin:5px;text-align:center;font-weight:bold;color:#ff0000;font-size:14px;font-style:italic;'>Update Property Error: " + args.get_message() + " </div>");
        return false;
    }

    return {
        Init: Init,
        UpdateExpended: UpdateExpended
    }
}

SP.SOD.notifyScriptLoadedAndExecuteWaitingJobs('CEWP_Directives_ExpendedHours.js');


