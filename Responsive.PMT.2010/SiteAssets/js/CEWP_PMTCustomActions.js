var exitem, exitems, enumerator, directive, directives;
var ctx, list, waitmsg;

function PMTCustomActions(site) {
    logit("PMT Actions loaded.")
    $("#btnExpended").click(function () {
        waitmsg = SP.UI.Notify.addNotification("Performing Action...Please Wait.", true);
        logit("Button clicked");
        directives = new Array();
        var monkey = getDirectives();
        jQuery.when.apply(null, monkey).done(function () {
            logit("getDirectives complete.");
            var dog = getExpendedHoursByDirective();
            jQuery.when.apply(null, dog).done(function () {
                logit("Actions Data Loaded!");
                var stop = "stop";
                UpdateExpendedHours();
            });
            
        });
    });
}

function getDirectives() {
    var deferreds = [];

    var inc = "Include(";
    var xml = "<View><Method Name='Read List' /><Query><OrderBy><FieldRef Name='Title' /></OrderBy><Where><IsNotNull><FieldRef Name='Title' /></IsNotNull></Where></Query>";
    var fields = ["Title", "Expended", "ProjectedManHours"];
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

    deferreds.push($.when(CKO.CSOM.GetListItems.getitemsfilteredcomplex("parent", "Directives", xml, inc)).then(function (items) {
        if (items.get_count() > 0) { //get map data
            enumerator = items.getEnumerator();
            while (enumerator.moveNext()) {
                directive = enumerator.get_current();
                directives.push({
                    "Title": directive.get_item("Title"),
                    "PMH": directive.get_item("ProjectedManHours"),
                    "Expended": "",
                    "PercentExpended": "",
                    "Id": directive.get_id(),
                    "ListItem": directive
                });
            }
        }
    }, function (sender, args) {
        logit("Error getting data from Organization list : " + args.get_message());
    }));
    return deferreds;
}

function getExpendedHoursByDirective() {
    var deferreds = [];
    for (i = 0; i < directives.length; i++) {
        deferreds.push($.when(CKO.CSOM.GetListItems.getitemsfilteredandpasstoelement("parent", "Actions", "Directive", directives[i].Title, i)).then(function (items, i) {
            if (items.get_count() > 0) {
                var enumerator = items.getEnumerator();
                var total = 0;
                while (enumerator.moveNext()) { 
                    var current = enumerator.get_current();
                    var hours = current.get_item("Hours");
                    //logit("Action id: " + current.get_id() + ", hours: " + hours + ", type: " + typeof hours);
                    if (isNaN(hours)) {
                        logit("Action id: " + current.get_id() + " does not contain a valid hour entry. Entry: " + hours);
                    }
                    else {
                        total += hours;
                    }
                }
                directives[i].Expended = total;
                //directives[i].PercentExpended = ((total / directives[i].PMH) * 100).toFixed(1);
                if (directives[i].PMH == "" || directives[i].PMH == null) { }
                else {
                    var pe = parseFloat((total / directives[i].PMH).toFixed(1));
                    directives[i].PercentExpended = pe;
                }
            }
        }, function (sender, args) {
            logit("Error getting data from KnowledgeMap list: " + args.get_message());
        }));
    }
    return deferreds;
}

function UpdateExpendedHours() {
    var updates = [];
    ctx = SP.ClientContext.get_current();
    //ctx = SP.ClientContext("/sites/PMT");
    for (i = 0; i < directives.length; i++) {
        logit("Updating Directive: " + directives[i].Title + ", Hours: " + directives[i].Expended);
        // Now add the Expended hours to the Directives list.
        var item = directives[i].ListItem;
        item.set_item('Expended', directives[i].Expended);
        item.set_item('PercentExpended', directives[i].PercentExpended);
        item.update();
        updates[i] = item;
        ctx.load(updates[i]);
    }
    ctx.executeQueryAsync(AddItemsSucceeded, AddItemsFailed);
}

function AddItemsSucceeded() {
    SP.UI.Notify.removeNotification(waitmsg);
    SP.UI.Notify.addNotification("Finished.", false);
}

function AddItemsFailed(sender, args) {
    logit("AddItemsFailed: " + args.get_message());
    return false;
}

SP.SOD.notifyScriptLoadedAndExecuteWaitingJobs("CEWP_PMTCustomActions.js");