var CKO = CKO || {};
CKO.TRAININGDASHBOARD = CKO.TRAININGDASHBOARD || {};
CKO.TRAININGDASHBOARD.CHARTS = CKO.TRAININGDASHBOARD.CHARTS || {};
CKO.TRAININGDASHBOARD.CHARTS.VARIABLES = CKO.TRAININGDASHBOARD.CHARTS.VARIABLES || {};

CKO.TRAININGDASHBOARD.CHARTS.VARIABLES.OverallChart = {
    site: null,
    loc: String(window.location),
    waitmsg: null,
    title: null,
    ctx: null,
    web: null,
    id: null,
    qry: null,
    categories: ["Black", "Red", "Yellow", "Green"],
    users: [],
    training: [],
    black: 0,
    red: 0,
    yellow: 0,
    green: 0,
    urlString: "https://hq.tradoc.army.mil/sites/OCKO/Training/_vti_bin/listdata.svc/Training?$select=Id,Archived,Training,CompleteDate,SuspenseDate,OrgValue&$filter=(Archived eq false)",
    html: "",
    chart: null
}

CKO.TRAININGDASHBOARD.CHARTS.OverallChart = function () {

    var v = CKO.TRAININGDASHBOARD.CHARTS.VARIABLES.OverallChart;

    function Init(site) {
        SP.SOD.executeOrDelayUntilScriptLoaded(function () {
            v.site = site;
            var inDesignMode = document.forms[MSOWebPartPageFormName].MSOLayout_InDesignMode.value;
            logit("Design Mode = " + inDesignMode);
            if (inDesignMode === "1") {
                $("#OverallChart").html("").append("<div style='margin:5px;text-align:center;font-weight:bold;font-size:14px;font-style:italic;'>Query Suspended During Page Edit Mode</div>");
            }
            else {
                v.black = 0;
                v.red = 0;
                v.yellow = 0;
                v.green = 0;
                //var monkey = LoadTraining();
                //jQuery.when.apply(null, monkey).done(function () {
                //    TrainingLoaded();
                //});
                var monkey = GetTrainingForOrg("HQTRADOC"); //LoadTraining();
                jQuery.when.apply(null, monkey).done(function () {
                    var gorilla = GetUsersForOrg();
                    jQuery.when.apply(null, gorilla).done(function () {
                        TrainingLoaded();
                    });
                });
            }
        }, "sp.js");
    }

    function GetTrainingForOrg(org) {
        // reset some stuff
        v.training = [];
        v.org = org;
        if (v.org === "HQTRADOC") { v.org = "HQ TRADOC"; }
        var deferreds = [];
        var urlString = "https://hq.tradoc.army.mil/sites/OCKO/Training/_vti_bin/listdata.svc/Training?";
        urlString += "$select=Id,Training,Archived,OrgValue,SuspenseDate,CompleteDate,AssignedTo";
        urlString += "&$expand=AssignedTo";
        urlString += "&$filter=(Archived eq false) and (OrgValue eq '" + v.org + "')";
        deferreds.push($.when(CKO.REST.GetListItems.getitems(urlString)).then(function (data) {
            var results = data.d.results;
            var j = jQuery.parseJSON(JSON.stringify(results));
            for (var i = 0, length = j.length; i < length; i++) {
                v.training.push({
                    "title": j[i]["Title"],
                    "user": j[i]["AssignedTo"]["Name"],
                    "suspense": j[i]["SuspenseDate"],
                    "complete": j[i]["CompleteDate"],
                    "type": j[i]["PersonTypes"],
                    "me": j[i]["Category"],
                    "category": Categorize(j[i]["CompleteDate"], j[i]["SuspenseDate"])
                })
            }
        }, function (data) { logit(data); }));
        return deferreds;
    }

    function GetUsersForOrg() {
        v.users = [];  // reset user array
        var deferreds = [];
        var urlString = "https://hq.tradoc.army.mil/sites/OCKO/PMT/_vti_bin/listdata.svc/KnowledgeMap?";
        urlString += "$select=Id,Organization,SharePointUser,TDAOnhand";
        urlString += "&$expand=SharePointUser";
        urlString += "&$filter=(Organization eq '" + v.org + "') and (TDAOnhand eq true)";
        urlString += "&$orderby=SharePointUser/Name";
        logit("urlString: " + urlString);

        deferreds.push($.when(CKO.REST.GetListItems.getitems(urlString)).then(function (data) {
            var results = data.d.results;
            var j = jQuery.parseJSON(JSON.stringify(results));
            for (var i = 0, length = j.length; i < length; i++) {
                v.users.push({
                    name: j[i]["SharePointUser"]["Name"],
                    category: []
                });
            }
        }, function (data) { logit(data); }));
        return deferreds;
    }

    function GetOrgs() {
        // Get all of the orgs from the Organization list excluding those not supported
        var urlString = "https://hq.tradoc.army.mil/sites/OCKO/PMT/_vti_bin/listdata.svc/Organization?";
        urlString += "$select=Id,Title,OrganizationTypeValue";
        urlString += "&$orderby=Title";
        urlString += "&$filter=(OrganizationTypeValue ne 'Not currently supported')";

        jQuery.ajax({
            url: urlString,
            method: "GET",
            headers: { 'accept': 'application/json; odata=verbose' },
            error: function (jqXHR, textStatus, errorThrown) {
                logit("Error Status: " + textStatus + ":: errorThrown: " + errorThrown);
                $("#SPSTools_Notify").fadeOut("2500", function () {
                    $("#SPSTools_Notify").html("");
                });
            },
            success: function (data) {
                var results = data.d.results;
                var j = jQuery.parseJSON(JSON.stringify(results));
                var numitems = data.d.results.length;
                for (var i = 0; i < numitems; i++) {
                    v.orgs.push({
                        org: j[i]["Title"]
                    });
                }
                updateUI();
            }
        });
    }

    function LoadTraining() {
        var deferreds = [];

        deferreds.push($.when(CKO.REST.GetListItems.getitems(v.urlString)).then(function (data) {
            var results = data.d.results;
            var j = jQuery.parseJSON(JSON.stringify(results));
            for (var i = 0, length = j.length; i < length; i++) {
                v.training.push({
                    "title": j[i]["Training"],
                    "org": j[i]["OrgValue"],
                    "suspense": j[i]["SuspenseDate"],
                    "complete": j[i]["CompleteDate"],
                    "category": Categorize(j[i]["CompleteDate"], j[i]["SuspenseDate"])
                })
            }
        }, function (data) { logit(data); }));
        
        return deferreds;
    }

    function Categorize(complete, suspense) {
        var c, today = moment(), category;
        if (complete === null || complete === undefined) {
            suspense = moment(suspense);
            c = suspense.diff(today, 'days');
            switch (true) {
                case c <= 0:
                    category = "black";
                    break;

                case c < 30:
                    category = "red";
                    break;

                case c <= 90:
                    category = "yellow";
                    break;

                case c > 90:
                    category = "green";
                    break;
            }
        }
        else {
            category = "green";
        }
        return category;
    }

    function TrainingLoaded() {
        var stop = "stop";

        //for (var i = 0; i < v.training.length; i++) {
        //    switch (v.training[i]["category"]) {
        //        case "black":
        //            v.black += 1;
        //            break;

        //        case "red":
        //            v.red += 1;
        //            break;

        //        case "yellow":
        //            v.yellow += 1;
        //            break;

        //        case "green":
        //            v.green += 1;
        //            break;
        //    }
        //}

        for (i = 0; i < v.users.length; i++) {
            for (k = 0; k < v.training.length; k++) {
                if (v.users[i]["name"] === v.training[k]["user"]) {
                    v.users[i]["category"].push(v.training[k]["category"]);
                }
            }
        }
        for (i = 0; i < v.users.length; i++) {
            switch (true) {
                case v.users[i].category.indexOf("black") >= 0:
                    v.black += 1;
                    break;

                case v.users[i].category.indexOf("red") >= 0:
                    v.red += 1;
                    break;

                case v.users[i].category.indexOf("yellow") >= 0:
                    v.yellow += 1;
                    break;

                case v.users[i].category.indexOf("green") >= 0:
                    v.green += 1;
                    break;
            }
        }

        DrawOverallPieChart();
    }

    function DrawOverallPieChart() {
        Highcharts.chart('OverallChart', {
            colors: ["black", "red", "yellow", "green"],
            chart: {
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false,
                type: 'pie'
            },
            
            title: {
                text: 'Overall'
            },
            tooltip: {
                pointFormat: '{series.name}: <b>{point.y}</b>'
            },
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    dataLabels: {
                        enabled: true,
                        format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                        style: {
                            color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                        }
                    }
                }
            },
            series: [{
                name: 'Training',
                //colorByPoint: true,
                data: [{
                    name: 'Overdue',
                    y: v.black
                }, {
                    name: 'At Risk',
                    y: v.red
                }, {
                    name: 'In Progress',
                    y: v.yellow
                }, {
                    name: 'Complete',
                    y: v.green
                }]
            }]
        });
    }

    return {
        Init: Init
    }
}

SP.SOD.notifyScriptLoadedAndExecuteWaitingJobs('CEWP_TD_Charts_OverallChart.js');