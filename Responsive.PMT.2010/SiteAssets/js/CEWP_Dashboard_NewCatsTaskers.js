var CKO = CKO || {};
CKO.AJAX = CKO.AJAX || {};
CKO.DASHBOARD = CKO.DASHBOARD || {};
CKO.DASHBOARD.TASKERS = CKO.DASHBOARD.TASKERS || {};
CKO.DASHBOARD.TASKERS.VARIABLES = CKO.DASHBOARD.TASKERS.VARIABLES || {};

CKO.DASHBOARD.TASKERS.VARIABLES = {
    site: null,
    loc: String(window.location),
    waitmsg: null,
    newtaskers: null,
    currenttaskers: null,
    taskercount: 0,
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
        v.newtaskers = new Array();
        v.currenttaskers = new Array();
        // Load Taskers From REST from the CATS site. Get all taskers that are still open and pass them into the array.
        // The taskers will be checked against the current list and will be updated if they exist and added if they do not.
        var urlString = "https://hq.tradoc.army.mil/sites/CATS/_vti_bin/listdata.svc/Taskers?";
        urlString += "$select=Id,ControlNumber,ReceivedDate,SuspenseDate,TaskerName,TaskerLeads,CompletionStatusValue,TaskerAssists,TaskerInfo,Created";
        urlString += "&$filter=((CompletionStatusValue eq 'Open') and ((substringof('CKO', TaskerLeads)) or (substringof('CKO', TaskerAssists)) or (substringof('CKO', TaskerInfo))))";

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
                logit("Taskers Count: " + numitems);
                // Now we need to add these taskers to an array for potential update and comparison to the current taskers in our tasker list.
                for (var i = 0, length = j.length; i < length; i++) {
                    v.newtaskers.push({
                        "cn": String(j[i]["ControlNumber"]).trim(),
                        "new": true
                    });
                }
                LoadCurrentTaskers();
            }
        });
    }

    function LoadCurrentTaskers() {
        
        //Load Taskers From REST
        var urlString = "https://hq.tradoc.army.mil/sites/OCKO/PMT/_vti_bin/listdata.svc/CATS?";
        urlString += "$select=Id,ClosedValue,CATSControlNumber";
        urlString += "&$filter=(ClosedValue eq 'No')";

        jQuery.ajax({
            url: urlString,
            method: "GET",
            headers: { 'accept': 'application/json; odata=verbose' },
            error: function (jqXHR, textStatus, errorThrown) {
                //to do implement logging to a central list
                logit("Error Status: " + textStatus + ":: errorThrown: " + errorThrown);
            },
            success: function (data) {
                var tmp1, tmp2, tmp3;
                var results = data.d.results;
                var j = jQuery.parseJSON(JSON.stringify(results));
                for (var i = 0, length = j.length; i < length; i++) {
                    v.currenttaskers.push({
                        "cn": String(j[i]["CATSControlNumber"]).trim()
                    });
                }
                // loop through the new ones and compare with the old ones to see if they are already added
                for (var x = 0; x < v.newtaskers.length; x++) {
                    tmp1 = v.newtaskers[x]["cn"];
                    tmp3 = true;
                    //logit("Control Number: " + tmp1);
                    for (var y = 0; y < v.currenttaskers.length; y++) {
                        tmp2 = v.currenttaskers[y]["cn"];
                        if (tmp2 == tmp1) {
                            logit("Control Number: " + tmp1 + " exists.");
                            v.newtaskers[y]["new"] = false;
                            tmp3 = false;
                        }
                    }
                    if (tmp3 == true) { v.taskercount += 1; }
                }
                logit("New Tasker Count: " + v.taskercount);
                // Add the count to the table to let the user know how many tasks are present (TODO: do we need to add them to the list??)
                switch (true) {
                    case (v.taskercount == 0):
                        $("#NewTaskers").html("").append("No new taskers added.");
                        break;

                    case (v.taskercount == 1):
                        $("#NewTaskers").html("").append("1 new tasker added.");
                        break;

                    case (v.taskercount > 1):
                        $("#NewTaskers").html("").append(v.taskercount + " new taskers added.");
                        break;
                }
            }
        });
    } 

    return {
        Init: Init
    }
}

SP.SOD.notifyScriptLoadedAndExecuteWaitingJobs('CEWP_Dashboard_NewCatsTaskers.js');