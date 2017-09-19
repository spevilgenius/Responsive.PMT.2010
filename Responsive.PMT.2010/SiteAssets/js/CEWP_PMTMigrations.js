var exitem, exitems, enumerator, directive, directives;
var ctx, list, waitmsg;
var alignments;

function PMTMigrations(site) {
    logit("PMT Migrations loaded.")
    $("#btnMigrateDirectives").click(function () {
        $().SPSTools_Notify({ type: 'wait', content: 'Migrating Directives...Please wait...' });
        logit("Button clicked");
        GetDirectives();
    });
    $("#btnMigrateStandards").click(function () {
        $().SPSTools_Notify({ type: 'wait', content: 'Migrating Standards...Please wait...' });
        logit("Button clicked");
        GetStandards();
    });
    $("#btnMigrateActions").click(function () {
        logit("Button clicked");
        GetActions();
    });
    $("#btnUpdateActionsSA").click(function () {
        logit("Button clicked");
        UpdateActionsSAs();
    });
    $("#btnUpdateActionsUsers").click(function () {
        logit("Button clicked");
        UpdateActionsUsers();
    });
}

function GetDirectives() {
    var userId = _spPageContextInfo.userId;
    var urlString = "https://hq.tradoc.army.mil/sites/PMT/_vti_bin/listdata.svc/Directives?";
    //urlString += "$select=*";
    urlString += "$select=Id,Objective,Expended,PercentExpended,ProjectedManHours,AvailableManHours,ReportValue,Comments,Description,OtherOrganization,LeadAssessmentValue,EquippedValue,TrainedValue,SuspenseDate,CompletionDate,StartDate,StaffLead,StaffAssist,StatusValue,MOEQualitative,MOEQuantitative,LU_Organization,LU_SubOrganization,PMTOrganization/Title,OBJAlignment,OBJAlignment/Authority,OBJAlignment/Reference,SPTAlignment,SPTAlignment/ParaLine,SPTAlignment/Reference";
    urlString += "&$expand=StaffLead,StaffAssist,PMTOrganization,OBJAlignment,SPTAlignment,LU_Organization,LU_SubOrganization";

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
            jQuery("#txtResults").text(JSON.stringify(results));
            var numitems = data.d.results.length;
            logit("Directives Count: " + numitems);
            // Now we need to loop through the returned Directives and add them to the new Directives list
            var additems = [];
            ctx = SP.ClientContext.get_current();
            list = ctx.get_web().get_lists().getByTitle("Directives"); //Using this until proof it works
            for (var i = 0, length = j.length; i < length; i++) {
                var ici = new SP.ListItemCreationInformation();
                var item = list.addItem(ici);
                item.set_item('Directive', j[i]["Objective"]);
                item.set_item('AvailableManHours', j[i]["AvailableManHours"]);
                item.set_item("StaffLead", SP.FieldUserValue.fromUser(j[i]["StaffLead"]["Account"]));
                var assists = new Array();
                var tmp1 = j[i]["StaffAssist"].results;
                if (tmp1 != null) {
                    for (var k = 0; k < tmp1.length; k++) {
                        assists.push(SP.FieldUserValue.fromUser(tmp1[k]["Account"]));
                    }
                }
                item.set_item("StaffAssist", assists);       
                item.set_item("Expended", j[i]["Expended"]);
                item.set_item("PercentExpended", j[i]["PercentExpended"]);
                item.set_item("ProjectedManHours", j[i]["ProjectedManHours"]);
                item.set_item("DirectiveStatus", j[i]["StatusValue"]);
                item.set_item("LeadAssessment", j[i]["LeadAssessmentValue"]);
                item.set_item("Equipped", j[i]["EquippedValue"]);
                item.set_item("Trained", j[i]["TrainedValue"]);
                if (j[i]["SuspenseDate"] != null) { item.set_item("SuspenseDate", dateformat(j[i]["SuspenseDate"], "isofull")); }
                if (j[i]["CompletionDate"] != null) { item.set_item("DateCompleted", dateformat(j[i]["CompletionDate"], "isofull")); }
                item.set_item("SupportingOrg", j[i]["PMTOrganization"]["Title"]);
                item.set_item("SupportedOrg", j[i]["LU_Organization"]["Title"]);
                if (j[i]["LU_SubOrganization"] != null) { item.set_item("SupportedSubOrg", j[i]["LU_SubOrganization"]["Title"]); }
                if (j[i]["OtherOrganization"] != null) { item.set_item("SupportedOtherOrg", j[i]["OtherOrganization"]); }
                logit("i: " + i + ", Directive: " + j[i]["Objective"]);
                if (j[i]["OBJAlignment"] != null) { item.set_item("SourceAuthority", j[i]["OBJAlignment"]["Authority"]); }
                if (j[i]["OBJAlignment"] != null) { item.set_item("SourceReference", j[i]["OBJAlignment"]["Reference"]); }
                item.set_item("MOEQualitative", j[i]["MOEQualitative"]);
                item.set_item("MOEQuantitative", j[i]["MOEQuantitative"]);
                item.set_item("PercentExpended", j[i]["PercentExpended"]);
                item.set_item("ReportRequired", j[i]["ReportValue"]);
                if (j[i]["SPTAlignment"] != null) { item.set_item("SupportParagraph", j[i]["SPTAlignment"]["ParaLine"]); }
                if (j[i]["SPTAlignment"] != null) { item.set_item("SupportReference", j[i]["SPTAlignment"]["Reference"]); }
                if (j[i]["StartDate"] != null) { item.set_item("StartDate", dateformat(j[i]["StartDate"], "isofull")); }
                item.set_item("LeadComments", j[i]["Comments"]);
                item.set_item("DirectiveDescription", j[i]["Description"]);
                item.update();
                additems[i] = item;
                ctx.load(additems[i]);
            }
            ctx.executeQueryAsync(AddItemsSucceeded, AddItemsFailed);
        }
    });
}

function GetStandards() {
    var userId = _spPageContextInfo.userId;
    var urlString = "https://hq.tradoc.army.mil/sites/PMT/_vti_bin/listdata.svc/Standards?";
    //urlString += "$select=*";
    urlString += "$select=Id,Competency,AvailableManHours,FrequencyValue,TaskAction,LastValidated,Objective,ProjectedManHours,ReportValue,LeadComments,OtherOrganization,LeadAssessmentValue,EquippedValue,TrainedValue,StandardDate,StaffLead,StaffAssist,StatusValue,MOEQualitative,MOEQuantitative,LU_Organization,LU_SubOrganization,OBJAlignment,OBJAlignment/Authority,OBJAlignment/Reference,SPTAlignment,SPTAlignment/ParaLine,SPTAlignment/Reference";
    urlString += "&$expand=Competency,StaffLead,StaffAssist,OBJAlignment,SPTAlignment,LU_Organization,LU_SubOrganization";

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
            jQuery("#txtResults").text(JSON.stringify(results));
            var numitems = data.d.results.length;
            logit("Standards Count: " + numitems);
            // Now we need to loop through the returned Standards and add them to the new Standards list
            var additems = [];
            ctx = SP.ClientContext.get_current();
            list = ctx.get_web().get_lists().getByTitle("Standards");
            for (var i = 0, length = j.length; i < length; i++) {
                var ici = new SP.ListItemCreationInformation();
                var item = list.addItem(ici);
                item.set_item('Standard', j[i]["Objective"]);
                item.set_item('AvailableManHours', j[i]["AvailableManHours"]);
                item.set_item("StaffLead", SP.FieldUserValue.fromUser(j[i]["StaffLead"]["Account"]));
                var assists = new Array();
                var tmp1 = j[i]["StaffAssist"].results;
                if (tmp1 != null) {
                    for (var k = 0; k < tmp1.length; k++) {
                        assists.push(SP.FieldUserValue.fromUser(tmp1[k]["Account"]));
                    }
                }
                item.set_item("StaffAssist", assists);
                item.set_item("ProjectedManHours", j[i]["ProjectedManHours"]);
                item.set_item("StandardStatus", j[i]["StatusValue"]);
                item.set_item("Equipped", j[i]["EquippedValue"]);
                item.set_item("Trained", j[i]["TrainedValue"]);
                item.set_item("Frequency", j[i]["FrequencyValue"]);
                item.set_item("Task", j[i]["TaskAction"]);
                if (j[i]["StandardDate"] != null) { item.set_item("StartDate", dateformat(j[i]["StandardDate"], "isofull")); }
                if (j[i]["Competency"] != null) { item.set_item("Competency", j[i]["Competency"]["Title"]); }
                item.set_item("SupportedOrg", j[i]["LU_Organization"]["Title"]);
                if (j[i]["LU_SubOrganization"] != null) { item.set_item("SupportedSubOrg", j[i]["LU_SubOrganization"]["Title"]); }
                if (j[i]["OtherOrganization"] != null) { item.set_item("SupportedOtherOrg", j[i]["OtherOrganization"]); }
                logit("i: " + i + ", Directive: " + j[i]["Objective"]);
                if (j[i]["OBJAlignment"] != null) { item.set_item("SourceAuthority", j[i]["OBJAlignment"]["Authority"]); }
                if (j[i]["OBJAlignment"] != null) { item.set_item("SourceReference", j[i]["OBJAlignment"]["Reference"]); }
                item.set_item("MOEQualitative", j[i]["MOEQualitative"]);
                item.set_item("MOEQuantitative", j[i]["MOEQuantitative"]);
                item.set_item("PercentExpended", j[i]["PercentExpended"]);
                item.set_item("ReportRequired", j[i]["ReportValue"]);
                item.set_item("SupportParagraph", j[i]["SPTAlignment"]["ParaLine"]);
                item.set_item("SupportReference", j[i]["SPTAlignment"]["Reference"]);
                if (j[i]["LastValidated"] != null) { item.set_item("LastValidated", dateformat(j[i]["LastValidated"], "isofull")); }
                item.set_item("LeadComments", j[i]["Comments"]);
                item.update();
                additems[i] = item;
                ctx.load(additems[i]);
            }
            ctx.executeQueryAsync(AddItemsSucceeded, AddItemsFailed);
        }
    });
}

function GetActions() {
    logit("Migrating Actions...Please wait...");
    var userId = _spPageContextInfo.userId;
    var urlString = "https://hq.tradoc.army.mil/sites/PMT/_vti_bin/listdata.svc/Actions?";
    //urlString += "$select=*";
    urlString += "$select=Id,Title,Hours,CreatedBy,Comments,OtherEnabler,Customer,CompletedDate,EffortType,EffortType/Title,Enabler,Enabler/Title,Function,Function/Title,SPTAlignmentID";
    urlString += "&$expand=CreatedBy,EffortType,Enabler,Function";
    urlString += "&$filter=((Id ge " + jQuery("#txtFrom").val() + ") and (Id lt " + jQuery("#txtTo").val() + "))";
    //urlString += "&$filter=((PMTUser/Id eq " + userId + ") and (DateCompleted ge datetime'" + getISODate(startdate) + "'))";
    //urlString += "&$filter=((CompletedDate ge datetime'" + getISODate(jQuery("#txtFrom").val()) + "') and (CompletedDate lt datetime'" + getISODate(jQuery("#txtTo").val()) + "'))";

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
            jQuery("#txtResults").text(JSON.stringify(results));
            var numitems = data.d.results.length;
            logit("Actions Count: " + numitems);
            // Now we need to loop through the returned Directives and add them to the new Directives list
            var additems = [];
            ctx = SP.ClientContext.get_current();
            list = ctx.get_web().get_lists().getByTitle(jQuery("#txtList").val()); 
            for (var i = 0, length = j.length; i < length; i++) {
                var d = new Date(parseInt(j[i]["CompletedDate"].substr(6)));
                var os = (d.getTimezoneOffset() / 60); // timezone offset in hours
                // SharePoint dates are in UTC format and stored as ticks. There is a double conversion for the time due to this so we must add it back
                d = moment(d).add(os * 2, 'h').format();
                var tp1, tp2, tp3;
                var ici = new SP.ListItemCreationInformation();
                var item = list.addItem(ici);
                logit("Adding item ID: " + j[i]["Id"]);
                item.set_item("Title", j[i]["Title"]);
                item.set_item("Expended", j[i]["Hours"]);
                if (j[i]["CreatedBy"] != null) {
                    item.set_item("PMTUserName", j[i]["CreatedBy"]["Account"]);  // Will just need to update this later with another function to get real user account if needed
                }
                else {
                    item.set_item("PMTUserName", "Old Account For Action ID: " + j[i]["Id"]); // some users had old accounts!!
                }
                item.set_item("Customer", j[i]["Customer"]);
                if (j[i]["EffortType"] != null) { item.set_item("EffortType", j[i]["EffortType"]["Title"]); }
                if (j[i]["Enabler"] != null) { item.set_item("Enabler", j[i]["Enabler"]["Title"]); }
                if (j[i]["Function"] != null) { item.set_item("Function", j[i]["Function"]["Title"]); }
                item.set_item("ActionComments", j[i]["Comments"]);
                item.set_item("OtherEnabler", j[i]["OtherEnabler"]);
                item.set_item("DateCompleted", d);
                item.set_item("SupportAlignment", j[i]["SPTAlignmentID"]); // Will just need to update this later with another function
                item.update();
                additems[i] = item;
                ctx.load(additems[i]);
            }
            ctx.executeQueryAsync(AddItemsSucceeded, AddItemsFailed);
        }
    });
}

function UpdateActionsSAs() {
    // The SA's are only identified by lookupID and therefore not going to be correct so we need to update each one in the list so it is correct
    // There are about 150 SA's so just loop this way and then update all the items that have this SA
    // Get the SupportAlignment items...
    alignments = new Array();
    var inc = "Include(";
    var xml = "<View><Method Name='Read List' />";
    var fields = ["Id", "Title", "ParaLine"];
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

    $.when(CKO.CSOM.GetListItems.getitemsfilteredcomplex("current", "SupportAlignment", xml, inc)).then(function (items) {
        if (items.get_count() > 0) { //get data
            var enumerator = items.getEnumerator();
            while (enumerator.moveNext()) {
                var item = enumerator.get_current();
                var sa = item.get_item("ParaLine") + " " + item.get_item("Title");
                var id = item.get_id();
                logit("SupportAlignment: ID: " + id + ", Text: " + sa);
                alignments[id] = sa;
            }
            var monkey = UPSAs();
            jQuery.when.apply(null, monkey).done(function () {
                logit("Update SAs complete.");
            });
        }
    }, function (sender, args) {
        logit("Error getting data from Organization list : " + args.get_message());
    });
}

function UPSAs() {
    var deferreds = [];
    var f = parseInt(jQuery("#txtFrom").val());
    var t = parseInt(jQuery("#txtTo").val());
    logit(f + ", " + t);
    for (var i = f; i <= t; i++) {
        logit("SA Loop i: " + i + ", alignment: " + alignments[i]);
        deferreds.push($.when(CKO.CSOM.GetListItems.getitemsfilteredandpasstoelement("current", jQuery("#txtList").val(), "SupportAlignment", i, i)).then(function (items, el) {
            if (items.get_count() > 0) { //get data
                logit(el + " SAs to update: " + items.get_count());
                var enumerator = items.getEnumerator();
                while (enumerator.moveNext()) {
                    var item = enumerator.get_current();
                    var id = item.get_item("ID");
                    var ctx = new SP.ClientContext.get_current();
                    var list = ctx.get_web().get_lists().getByTitle(jQuery("#txtList").val());
                    var uitem = list.getItemById(id);
                    uitem.set_item("SupportAlignment", alignments[el]);
                    uitem.update();
                    ctx.executeQueryAsync(
                        Function.createDelegate(this, function () { logit("Item updated."); }),
                        Function.createDelegate(this, function (sender, args) { logit("Error updating action : " + args.get_message()); })
                    );
                }
            }
        }, function (sender, args) {
            logit("Error getting data from Actions list : " + args.get_message());
        }));
    }
    return deferreds;
}

function UpdateActionsUsers() {
    datestart = getISODate(new Date(jQuery("#txtFrom").val()));
    dateend = getISODate(new Date(jQuery("#txtTo").val()));

    var inc = "Include(";
    var xml = "<View><Method Name='Read List' /><Query><Where><And><Geq><FieldRef Name='DateCompleted' /><Value Type='DateTime'>" + datestart.toString("yyyy-MM-ddTHH:mm:ssZ") + "</Value></Geq><Lt><FieldRef Name='DateCompleted' /><Value Type='DateTime'>" + dateend.toString("yyyy-MM-ddTHH:mm:ssZ") + "</Value></Lt></And></Where></Query>";
    var fields = ["Id", "PMTUserName", "PMTUser", "DateCompleted"];
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

    $.when(CKO.CSOM.GetListItems.getitemsfilteredcomplex("current", jQuery("#txtList").val(), xml, inc)).then(function (items) {
        if (items.get_count() > 0) { //get data
            var enumerator = items.getEnumerator();
            while (enumerator.moveNext()) {
                var item = enumerator.get_current();
                var id = item.get_item("ID");
                var un = item.get_item("PMTUserName");
                var ctx = new SP.ClientContext.get_current();
                var list = ctx.get_web().get_lists().getByTitle(jQuery("#txtList").val());
                var uitem = list.getItemById(id);
                uitem.set_item("PMTUser", SP.FieldUserValue.fromUser(un));
                uitem.update();
                ctx.executeQueryAsync(
                    Function.createDelegate(this, function () { logit("Item updated."); }),
                    Function.createDelegate(item, function (sender, args) { logit("Error updating action : " + args.get_message() + ", User: " + this.get_item("PMTUserName")); })
                );
            }
        }
    }, function (sender, args) {
        logit("Error getting data from Organization list : " + args.get_message());
    });
}

function getISODate(date) {
    function pad(n) { return n < 10 ? '0' + n : n }
    if (date != null) {
        d = new Date(date);
    }
    else {
        d = new Date();
    }
    var s = "";
    s += d.getFullYear() + "-";
    s += pad(d.getMonth() + 1) + "-";
    s += pad(d.getDate());
    s += "T" + pad(d.getHours()) + ":";
    s += pad(d.getMinutes()) + ":";
    s += pad(d.getSeconds()) + "Z";
    return s;
}

function formatme(dtf, type) {
    var marr = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    var sarr = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    var dtr = "";
    switch (type) {
        case "shortdate":
            var d = new Date(dtf);
            dtr = (d.getMonth() + 1) + "/" + d.getDate() + "/" + d.getFullYear();
            break;

        case "shortdate1":
            var d = new Date(parseInt(dtf.substr(6)));
            dtr = (d.getMonth() + 1) + "/" + d.getDate() + "/" + d.getFullYear();
            break;

        case "modified":
            var d = new Date(dtf);
            dtr = marr[d.getMonth()] + " " + d.getDate() + ", " + GetPrettyTime(d);
            break;

        case "modifiedoffset":
            var d = new Date(dtf);
            dtr = marr[d.getMonth()] + " " + d.getDate() + ", " + GetPrettyTimeOffset(d);
            break;

    }
    return dtr;
}

function AddItemsSucceeded() {
    logit("Finished Migrating...");
    SP.UI.Notify.removeNotification(waitmsg);
    //SP.UI.Notify.addNotification("Finished.", false);
    $("#SPSTools_Notify").fadeOut("2500", function () {
        $("#SPSTools_Notify").html("");
    });
}

function AddItemsFailed(sender, args) {
    $("#SPSTools_Notify").fadeOut("2500", function () {
        $("#SPSTools_Notify").html("");
    });
    logit("AddItemsFailed: " + args.get_message());
    return false;
}

SP.SOD.notifyScriptLoadedAndExecuteWaitingJobs("CEWP_PMTMigrations.js");