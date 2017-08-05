var exitem, exitems, enumerator, directive, directives;
var ctx, list, waitmsg;
var tblhtml = "";



function DirectivesInit(site) {
    directives = new Array();
    var monkey = getDirectives();
    jQuery.when.apply(null, monkey).done(function () {
        logit("getDirectives complete.");

        $("#directives_loading").hide();
        //var dog = getExpendedHoursByDirective();
        //jQuery.when.apply(null, dog).done(function () {
        //    logit("Actions Data Loaded!");
        //    var stop = "stop";
        //    UpdateExpendedHours();
        //});
    });
}

function getDirectives() {
    var deferreds = [];

    var inc = "Include(";
    var xml = "<View><Method Name='Read List' /><Query><OrderBy><FieldRef Name='Title' /></OrderBy><Where><IsNotNull><FieldRef Name='Title' /></IsNotNull></Where></Query>";
    var fields = ["Title", "Expended", "PercentExpended", "ProjectedManHours", "WB_Status", "LeadAssessment", "AvailableManHours", "Equipped", "Trained", "WB_SuspenseDate", "WB_StaffLead", "LU_SubOrganization", "LU_Organization"];
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
                    "Projected": directive.get_item("ProjectedManHours"),
                    "Expended": directive.get_item("ProjectedManHours"),
                    "PercentExpended": directive.get_item("ProjectedManHours"),
                    "Status": directive.get_item("WB_Status"),
                    "LeadAssessment": directive.get_item("LeadAssessment"),
                    "AvailableManHours": directive.get_item("AvailableManHours"),
                    "Equipped": directive.get_item("Equipped"),
                    "Trained": directive.get_item("Trained"),
                    "SuspenseDate": directive.get_item("WB_SuspenseDate"),
                    "StaffLead": directive.get_item("WB_StaffLead"),
                    "SupportedOrg": directive.get_item("LU_SubOrganization"),
                    "SupportingOrg": directive.get_item("LU_Organization"),
                    "Id": directive.get_id()
                });
            }
        }
    }, function (sender, args) {
        logit("Error getting data from Organization list : " + args.get_message());
    }));
    return deferreds;
}

function drawTable() {
    tblhtml += "";
}

SP.SOD.notifyScriptLoadedAndExecuteWaitingJobs('CEWP_Directives.js');