var CKO = CKO || {};
CKO.AJAX = CKO.AJAX || {};
CKO.DASHBOARD = CKO.DASHBOARD || {};
CKO.DASHBOARD.TASKERS = CKO.DASHBOARD.TASKERS || {};
CKO.DASHBOARD.TASKERS.VARIABLES = CKO.DASHBOARD.TASKERS.VARIABLES || {};

CKO.DASHBOARD.TASKERS.VARIABLES = {
    site: null,
    loc: String(window.location),
    OCKOquery: "<Query><OrderBy><FieldRef Name='Created' Ascending='False'/></OrderBy><FieldRef Name='Title' /></Query>",
    OCKOfields: "<ViewFields><FieldRef Name='Title' /><FieldRef Name='Created' /></ViewFields>",
    waitmsg: null,
    mostRecent: null,
    ockoNumber: null,
    catsNumber: null,
    catsID: null,
    CKONewFormParams: null,
    html: ""
}

CKO.DASHBOARD.TASKERS.NewTaskers = function () {

    var v = CKO.DASHBOARD.TASKERS.VARIABLES;

    function Init(site) {
        var inDesignMode = document.forms[MSOWebPartPageFormName].MSOLayout_InDesignMode.value;
        logit("Design Mode = " + inDesignMode);
        if (inDesignMode === "1") {
            $("#NewTaskers").html("").append("<div style='margin:5px;text-align:center;font-weight:bold;font-size:14px;font-style:italic;'>Query Suspended During Page Edit Mode</div>");
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
                    v.mostRecent = moment($(this).attr("ows_Created")).format("YYYY-MM-DD[T]HH:MM:SS");
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
                    taskTable += "<tr><th><a href='/sites/OCKO/PMT/Pages/Taskers.aspx' id='taskerlink'>" + countMe + " tasker(s) awaiting action.</a></th></tr>";
                    $("#taskTable").html("").append(taskTable);
                }
            }
        });
    }

    return {
        Init: Init
    }
}

SP.SOD.notifyScriptLoadedAndExecuteWaitingJobs('CEWP_Dashboard_NewCatsTaskers.js');