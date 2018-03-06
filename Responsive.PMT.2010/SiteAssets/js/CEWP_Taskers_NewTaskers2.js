var CKO = CKO || {};
CKO.AJAX = CKO.AJAX || {};
CKO.TASKERS = CKO.TASKERS || {};
CKO.TASKERS.VARIABLES = CKO.TASKERS.VARIABLES || {};

CKO.TASKERS.VARIABLES = {
    site: null,
    CATSurlString: "https://hq.tradoc.army.mil/sites/CATS/_vti_bin/listdata.svc/Taskers?$select=Id,ControlNumber,ReceivedDate,SuspenseDate,TaskerName,TaskerLeads,CompletionStatusValue,TaskerAssists,TaskerInfo,Created&$filter=((CompletionStatusValue eq 'Open') and ((substringof('CKO', TaskerLeads)) or (substringof('CKO', TaskerAssists)) or (substringof('CKO', TaskerInfo))))",
    PMTurlString: "https://hq.tradoc.army.mil/sites/OCKO/PMT/_vti_bin/listdata.svc/CATS?$select=Id,Subject,CATSSuspense,OCKOSuspense,ClosedValue,CATSControlNumber,Issued",
    waitmsg: null,
    mostRecent: null,
    ockoNumber: null,
    catsNumber: null,
    catsID: null,
    CKONewFormParams: null,
    newtaskers: [],
    taskers: [],
    html: ""
};

CKO.TASKERS.NewTaskers = function () {

    var v = CKO.TASKERS.VARIABLES;

    function Init(site) {
        var inDesignMode = document.forms[MSOWebPartPageFormName].MSOLayout_InDesignMode.value;
        logit("Design Mode = " + inDesignMode);
        if (inDesignMode === "1") {
            $("#taskTable").html("").append("<tr><td><div style='margin:5px;text-align:center;font-weight:bold;font-size:14px;font-style:italic;'>Query Suspended During Page Edit Mode</div></td></tr>");
        }
        else {
            var zebra = LoadCATSTaskers();
            jQuery.when.apply(null, zebra).done(function () {
                var mule = LoadPMTTaskers();
                jQuery.when.apply(null, mule).done(function () {
                    AllTaskersLoaded();
                });
            });
        }
    }

    function LoadCATSTaskers() {
        var deferreds = [];
        v.newtaskers = [],
        deferreds.push($.when(CKO.REST.GetListItems.getitems(v.CATSurlString)).then(function (data) {
            var results = data.d.results;
            var j = jQuery.parseJSON(JSON.stringify(results));
            for (var i = 0, length = j.length; i < length; i++) {
                v.newtaskers.push({
                    ID: j[i]["Id"],
                    ControlNumber: j[i]["ControlNumber"],
                    ReceivedDate: j[i]["ReceivedDate"],
                    SuspenseDate: moment(j[i]["SuspenseDate"]).add(1, 'days').format("MM/DD/YYYY"), //;j[i]["SuspenseDate"],
                    TaskerName: j[i]["TaskerName"],
                    TaskerLeads: j[i]["TaskerLeads"],
                    TaskerAssists: j[i]["TaskerAssists"],
                    TaskerInfo: j[i]["TaskerInfo"],
                    Created: j[i]["Created"],
                    InPMT: false
                });
            }
        }, function (data) { logit(data); }));
        return deferreds;
    }

    function LoadPMTTaskers() {
        var deferreds = [];
        v.taskers = [];
        deferreds.push($.when(CKO.REST.GetListItems.getitems(v.PMTurlString)).then(function (data) {
            var results = data.d.results;
            var j = jQuery.parseJSON(JSON.stringify(results));
            for (var i = 0, length = j.length; i < length; i++) {
                var cn = String(j[i]["CATSControlNumber"]);
                cn = cn.trim();
                v.taskers.push({
                    ControlNumber: cn,
                    Subject: j[i]["Subject"],
                    CATSSuspense: j[i]["CATSSuspense"],
                    OCKOSuspense: j[i]["OCKOSuspense"],
                    ClosedValue: j[i]["ClosedValue"]
                });
            }
        }, function (data) { logit(data); }));
        return deferreds;
    }

    function AllTaskersLoaded() {
        v.html = "<tr><th>No new taskers.</th></tr>";
        $("#taskTable").html("").append(v.html);
        v.html = "";

        for (var i = 0; i < v.newtaskers.length; i++) {
            var cn1, cn2;
            cn1 = v.newtaskers[i].ControlNumber;
            for (var k = 0; k < v.taskers.length; k++) {
                cn2 = v.taskers[k].ControlNumber;
                if (cn1 === cn2) {
                    // already in PMT CATS
                    v.newtaskers[i].InPMT = true;
                }
            }
        }

        for (i = 0; i < v.newtaskers.length; i++) {
            if (v.newtaskers[i].InPMT === false) {        
                // add to html
                var LAItext = "Info";
                var assist = String(v.newtaskers[i].TaskerAssists);
                var lead = String(v.newtaskers[i].TaskerLeads);
                if (lead.indexOf('CKO') >= 0) {
                    LAItext = "Lead";
                }
                else {
                    if (assist.indexOf('CKO') >= 0) {
                        LAItext = "Assist";
                    }
                }
                logit("CN: " + cn2 + " LAItext: " + LAItext);
                v.html += "<tr style='height:40px'><td class='AddTaskButton' style='background-color:#656565' title='Click to add to the CKO Task List' catsID-data='" + v.newtaskers[i].ID + "'>Add</td><td>" + v.newtaskers[i].ControlNumber + "</td><td>" + v.newtaskers[i].SuspenseDate + "</td><td class='clickToCATS' title='Click to read the tasker' catsID-data='" + v.newtaskers[i].ID + "'>" + v.newtaskers[i].TaskerName + "</td><td>" + LAItext + "</td></tr>";
            }
            
        }

        $("#taskTable").html("").append(v.html);

        $(".clickToCATS").on('click', function () {
            CKODialog('/sites/cats/Lists/Taskers/CATS_DispForm.aspx?ID=' + $(this).attr("catsID-data"), 'CATS Task', '1100', '800', 'NotificationCallback');
        });

        $(".AddTaskButton").on('click', function () {
            CKODialog('/sites/OCKO/PMT/Lists/CATS/NewTask.aspx?catsID=' + $(this).attr("catsID-data"), 'Add a new task to the CKO task list.', '1100', '800', 'NotificationCallback');
        });
    }

    return {
        Init: Init
    };
};

SP.SOD.notifyScriptLoadedAndExecuteWaitingJobs('CEWP_Taskers_NewTaskers2.js');