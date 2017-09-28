var CKO = CKO || {};
CKO.PAGES = CKO.PAGES || {};
CKO.REST = CKO.REST || {};
CKO.PAGES.MYTASKS = CKO.PAGES.MYTASKS || {};
CKO.PAGES.MYTASKS.VARIABLES = CKO.PAGES.MYTASKS.VARIABLES || {};

CKO.PAGES.MYTASKS.VARIABLES = {
    site: null,
    waitmsg: null,
    taskarrs: [],
    tasks: null,
    userId: null,
    html: ""
}

CKO.PAGES.MYTASKS.AllTasks = function () {

    var v = CKO.PAGES.MYTASKS.VARIABLES;

    function Init(site) {
        var inDesignMode = document.forms[MSOWebPartPageFormName].MSOLayout_InDesignMode.value;
        console.log("Design Mode = " + inDesignMode);
        if (inDesignMode === "1") {
            $("#taskTable").html("").append("<tr><td><div style='margin:5px;text-align:center;font-weight:bold;font-size:14px;font-style:italic;'>Query Suspended During Page Edit Mode</div></td></tr>");
        }
        else {
            LoadAllTasks();
        }
    }

    function LoadAllTasks() {
        v.userId = _spPageContextInfo.userId;
        v.tasks = new Array();
        var monkey = GetTasks();
        jQuery.when.apply(null, monkey).done(function () {
            // draw the tasks
            v.html = "<tr><td>Task</td></tr>"
            for (var i = 0; i < v.tasks.length; i++) {
                v.html += "<tr><td><a href='/sites/cko/lists/" + v.tasks[i]["list"] + "/DispForm.aspx?ID=" + v.tasks[i]["Id"] + "'>" + v.tasks[i]["Title"] + "</a></td></tr>";
            }
            $("#taskTable").html("").append(v.html);
        });
    }

    function GetTasks() {
        v.taskarrs.push(jQuery.when(CKO.REST.GetTaskData("Tasks", v.userId)).then(function (data) {
            var results = data.d.results;
            var j = jQuery.parseJSON(JSON.stringify(results));
            console.log("Tasks Count: " + data.d.results.length);
            for (var i = 0; i < j.length; i++) {
                if (j[i]["AssignedTo"] != null) {
                    console.log("ID: " + j[i]["AssignedTo"]["Id"]);
                    if (j[i]["AssignedTo"]["Id"] == v.userId) {
                        v.tasks.push({
                            "Id": j[i]["Id"],
                            "Title": j[i]["Title"],
                            "list" : "Tasks"
                        });
                    }
                }
            }
        }, function () {
            console.log("Error!!");
        }));

        v.taskarrs.push(jQuery.when(CKO.REST.GetTaskData("Action_Items", v.userId)).then(function (data) {
            var results = data.d.results;
            var j = jQuery.parseJSON(JSON.stringify(results));
            console.log("Actions Count: " + data.d.results.length);
            for (var i = 0; i < j.length; i++) {
                if (j[i]["AssignedTo"] != null) {
                    console.log("ID: " + j[i]["AssignedTo"]["Id"]);
                    if (j[i]["AssignedTo"]["Id"] == v.userId) {
                        v.tasks.push({
                            "Id": j[i]["Id"],
                            "Title": j[i]["Title"],
                            "list": "Action_Items"
                        });
                    }
                }
            }
        }, function () {
            console.log("Error!!");
        }));

        //v.taskarrs.push(jQuery.when(CKO.REST.GetTaskData("Meeting%20Approval%20Tasks", v.userId)).then(function (data) {
        //    var results = data.d.results;
        //    var j = jQuery.parseJSON(JSON.stringify(results));
        //    console.log("Meetings Count: " + data.d.results.length);
        //}, function () {
        //    console.log("Error!!");
        //}));

        return v.taskarrs;
    }

    return {
        Init: Init
    }
}

CKO.REST.GetTaskData = function (list, userid) {
    var v = CKO.PAGES.MYTASKS.VARIABLES;
    var urlString = "https://hq.tradoc.army.mil/sites/cko/_vti_bin/listdata.svc/" + list;
    urlString += "?$select=Id,Title,AssignedTo,StatusValue,Priority,DueDate,Outcome";
    urlString += "&$expand=AssignedTo";
    //urlString += "&$filter=((StatusValue ne 'Completed') and ((AssignedTo/Id eq " + userid + "))";
    urlString += "&$filter=(StatusValue ne 'Completed')";
    //urlString += "&$orderby=DueDate";

    console.log(urlString);

    var ajax = jQuery.ajax({
        url: urlString,
        method: "GET",
        headers: { 'accept': 'application/json; odata=verbose' },
        error: function (jqXHR, textStatus, errorThrown) {
            //to do implement logging to a central list
            return("Error Status: " + textStatus + ":: errorThrown: " + errorThrown);
        },
        success: function (data) {
            return data;
        }
    });

    return ajax.promise();
};

SP.SOD.notifyScriptLoadedAndExecuteWaitingJobs('CEWP_Pages_MyTasks_AllTasks.js');