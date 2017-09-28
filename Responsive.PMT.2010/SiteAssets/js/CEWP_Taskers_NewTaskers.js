var CKO = CKO || {};
CKO.AJAX = CKO.AJAX || {};
CKO.TASKERS = CKO.TASKERS || {};
CKO.TASKERS.VARIABLES = CKO.TASKERS.VARIABLES || {};

CKO.TASKERS.VARIABLES = {
    site: null,
    OCKOquery: "<Query><OrderBy><FieldRef Name='catsCreated' Ascending='False'/></OrderBy><FieldRef Name='Title' /></Query>",
    OCKOfields: "<ViewFields><FieldRef Name='Title' /><FieldRef Name='catsCreated' /></ViewFields>",
    waitmsg: null,
    mostRecent: null,
    ockoNumber: null,
    catsNumber: null,
    catsID: null,
    CKONewFormParams: null,
    html: ""
}

CKO.TASKERS.NewTaskers = function () {

    var v = CKO.TASKERS.VARIABLES;

    function Init(site) {
        var inDesignMode = document.forms[MSOWebPartPageFormName].MSOLayout_InDesignMode.value;
        logit("Design Mode = " + inDesignMode);
        if (inDesignMode === "1") {
            $("#taskTable").html("").append("<tr><td><div style='margin:5px;text-align:center;font-weight:bold;font-size:14px;font-style:italic;'>Query Suspended During Page Edit Mode</div></td></tr>");
        }
        else {
            LoadNewTaskers();
        }
    }

    function LoadNewTaskers() {
        $().SPServices({
            operation: "GetListItems",
            async: false,
            listName: "CATS",
            CAMLViewFields: v.OCKOfields,
            CAMLQuery: v.OCKOquery,
            CAMLRowLimit: 1,
            completefunc: function (xData, Status) {
                $(xData.responseXML).SPFilterNode("z:row").each(function () {
                    v.ockoNumber = /undefined/.test($(this).attr("ows_Title")) ? "" : $(this).attr("ows_Title");
                    v.mostRecent = moment($(this).attr("ows_catsCreated")).format("YYYY-MM-DD[T]HH:MM:SS");
                });
            }
        });

        //Get all the new CKO stuff from CATS 
        var CATSfields = "<ViewFields><FieldRef Name='Title' /><FieldRef Name='TaskerAssists' /><FieldRef Name='ID' /><FieldRef Name='TaskerName' /><FieldRef Name='TaskerInfo' /><FieldRef Name='TaskerLeads' /><FieldRef Name='SuspenseDate' /><FieldRef Name='Modified' /><FieldRef Name='Created' /></ViewFields>"
        var CATSquery = "<Query><OrderBy><FieldRef Name='Created' /></OrderBy><Where><And><And><Gt><FieldRef Name='Created'/><Value Type='DateTime' IncludeTimeValue='True'>" + v.mostRecent + "</Value></Gt><Eq><FieldRef Name='CompletionStatus'/><Value Type='Text'>Open</Value></Eq></And><Or><Or><Contains><FieldRef Name='TaskerLeads'/><Value Type='Text'>CKO</Value></Contains><Contains><FieldRef Name='TaskerAssists'/><Value Type='Text'>CKO</Value></Contains></Or><Contains><FieldRef Name='TaskerInfo'/><Value Type='Text'>CKO</Value></Contains></Or></And></Where></Query>";
        var countMe;

        $().SPServices({
            operation: "GetListItems",
            async: false,
            webURL: "https://hq.tradoc.army.mil/sites/cats",
            listName: "Taskers",
            CAMLViewFields: CATSfields,
            CAMLQuery: CATSquery,
            completefunc: function (xData, Status) {
                countMe = $(xData.responseXML).SPFilterNode("rs:data").attr("ItemCount");
                if (countMe == 0) {
                    taskTable = "<tr><th>No new taskers.</th></tr>"
                    $("#taskTable").html("").append(taskTable);
                } else {
                    $(xData.responseXML).SPFilterNode("z:row").each(function () {
                        catsNumber = /undefined/.test($(this).attr("ows_Title")) ? "" : $(this).attr("ows_Title");
                        catsID = $(this).attr("ows_ID");
                        var catsCreated = /undefined/.test($(this).attr("ows_Created")) ? "" : $(this).attr("ows_Created");
                        var catsModified = /undefined/.test($(this).attr("ows_Modified")) ? "" : $(this).attr("ows_Modified");
                        var catsSuspense = /undefined/.test($(this).attr("ows_SuspenseDate")) ? "No Suspense Given" : moment($(this).attr("ows_SuspenseDate")).format("MM/DD/YYYY");
                        var catsName = /undefined/.test($(this).attr("ows_TaskerName")) ? "" : $(this).attr("ows_TaskerName");
                        var lead = /undefined/.test($(this).attr("ows_TaskerLeads")) ? "" : $(this).attr("ows_TaskerLeads");
                        var assist = /undefined/.test($(this).attr("ows_TaskerAssists")) ? "" : $(this).attr("ows_TaskerAssists");
                        var info = /undefined/.test($(this).attr("ows_TaskerInfo")) ? "" : $(this).attr("ows_TaskerInfo");
                        var LAItext = "Info";
                        if (assist.indexOf("CKO") > 0) {
                            LAItext = "Assist";
                        } else if (lead.indexOf("CKO") > 0) {
                            LAItext = "Lead"
                        }
                        taskTable += "<tr style='height:40px'><td class='AddTaskButton' style='background-color:#656565' title='Click to add to the CKO Task List' catsID-data='" + catsID + "'>Add</td><td>" + catsNumber + "</td><td>" + catsSuspense + "</td><td class='clickToCATS' title='Click to read the tasker' catsID-data='" + catsID + "'>" + catsName + "</td><td>" + LAItext + "</td></tr>";                      
                    });
                    $("#taskTable").html("").append(taskTable);
                }
            }
        });

        //modal to show cats_dispform
        $(".clickToCATS").on('click', function () {
            CKODialog('/sites/cats/Lists/Taskers/CATS_DispForm.aspx?ID=' + $(this).attr("catsID-data"), 'CATS Task', '1100', '800', 'NotificationCallback');
        });

        //modal to cko task list newform
        $(".AddTaskButton").on('click', function () {
            CKODialog('/sites/OCKO/PMT/Lists/CATS/NewTask.aspx?catsID=' + $(this).attr("catsID-data"), 'Add a new task to the CKO task list.', '1100', '800', 'NotificationCallback');
        });
    }

    return {
        Init: Init
    }
}

SP.SOD.notifyScriptLoadedAndExecuteWaitingJobs('CEWP_Taskers_NewTaskers.js');