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
    CATSurlString: "https://hq.tradoc.army.mil/sites/CATS/_vti_bin/listdata.svc/Taskers?$select=Id,ControlNumber,ReceivedDate,SuspenseDate,TaskerName,TaskerLeads,CompletionStatusValue,TaskerAssists,TaskerInfo,Created&$filter=((CompletionStatusValue eq 'Open') and ((substringof('CKO', TaskerLeads)) or (substringof('CKO', TaskerAssists)) or (substringof('CKO', TaskerInfo))))",
    PMTurlString: "https://hq.tradoc.army.mil/sites/OCKO/PMT/_vti_bin/listdata.svc/CATS?$select=Id,Subject,CATSSuspense,OCKOSuspense,ClosedValue,CATSControlNumber,Issued",
    waitmsg: null,
    count: 0,
    catsID: null,
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
            //LoadNewTaskers();
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
                    ControlNumber: cn
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
                v.count += 1;
            }
        }

        if (v.count > 0) {
            v.html = "<tr><th><a href='/sites/OCKO/PMT/Pages/Taskers.aspx' id='taskerlink'>" + v.count + " tasker(s) awaiting action.</a></th></tr>";
        }
        
        $("#taskTable").html("").append(v.html);
    }

    return {
        Init: Init
    }
}

SP.SOD.notifyScriptLoadedAndExecuteWaitingJobs('CEWP_Dashboard_NewCatsTaskers.js');