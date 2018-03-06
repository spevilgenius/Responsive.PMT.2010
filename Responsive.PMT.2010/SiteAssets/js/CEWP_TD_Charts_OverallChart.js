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
    categories: ["Red", "Yellow", "Green"],
    training: [],
    red: null,
    yellow: null,
    green: null,
    urlString: "https://hq.tradoc.army.mil/sites/OCKO/Training/_vti_bin/listdata.svc/Training?$select=Id,Archived,Training,CompleteDate,SuspenseDate,OrgValue&$filter=(Archived eq false)",
    html: ""
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
                v.red = 0;
                v.yellow = 0;
                v.green = 0;
                var monkey = LoadTraining();
                jQuery.when.apply(null, monkey).done(function () {
                    TrainingLoaded();
                });
            }
        }, "sp.js");
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

    function updateUI() {

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
                case (c < 0):
                    category = "red";
                    break;

                case (c >= 0):
                    category = "yellow";
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

        for (var i = 0; i < v.training.length; i++) {
            switch (v.training[i]["category"]) {
                case "red":
                    v.red += 1;
                    break;

                case "yellow":
                    v.yellow += 1;
                    break;

                case "green":
                    v.green += 1;
                    break;
            }
        }
        DrawOverallPieChart();
    }

    function DrawOverallPieChart() {
        Highcharts.chart('OverallChart', {
            colors: ["red", "yellow", "green"],
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
                    y: v.red
                }, {
                    name: 'Incomplete',
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