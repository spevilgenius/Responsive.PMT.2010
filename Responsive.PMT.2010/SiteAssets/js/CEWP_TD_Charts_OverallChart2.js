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
    users: [],
    training: [],
    black: 0,
    red: 0,
    yellow: 0,
    green: 0,
    prcntred: 0,
    prcntyellow: 0,
    prcntgreen: 0,
    prcntblack: 0,
    oh: 0,
    ow: 0,
    html: "",
    ChartType: $.QueryString["ChartType"],
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
                $("#chart_loading").html("").append("<div style='margin:5px;text-align:center;font-weight:bold;font-size:14px;font-style:italic;'>Query Suspended During Page Edit Mode</div>");
            }
            else {
                loadCSS(site + '/SiteAssets/css/jquery.qtip.css');
                loadscript(site + '/SiteAssets/js/jquery.qtip.min.js', function () {
                    v.black = 0;
                    v.red = 0;
                    v.yellow = 0;
                    v.green = 0;
                    var monkey = GetTrainingForOrg("HQTRADOC"); //LoadTraining();
                    jQuery.when.apply(null, monkey).done(function () {
                        var gorilla = GetUsersForOrg();
                        jQuery.when.apply(null, gorilla).done(function () {
                            TrainingLoaded();
                        });
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

    function LoadTraining() {
        var deferreds = [];
        // Since PersonTypes is multichoice, need to use CSOM as REST doesn't support it

        var inc = "Include(";
        var xml = "<View><Method Name='Read List' /><Query><Where><Eq><FieldRef Name='Archived' /><Value Type='Integer'>0</Value></Eq></Where></Query>";
        var fields = ["Title", "Archived", "CompleteDate", "SuspenseDate", "PersonTypes", "Org", "Category", "AssignedTo"];
        xml += "<ViewFields>";
        for (var z = 0; z <= fields.length - 1; z++) {
            xml += "<FieldRef Name='" + fields[z] + "'/>";
            if (z === fields.length - 1) {
                inc += fields[z] + ")";
            }
            else {
                inc += fields[z] + ", ";
            }
        }
        xml += "<FieldRef Name='ID'/>";
        xml += "</ViewFields>";
        xml += "</View>";

        deferreds.push($.when(CKO.CSOM.GetListItems.getitemsfilteredcomplex("current", "Training", xml, inc)).then(function (items) {
            if (items.get_count() > 0) {
                enumerator = items.getEnumerator();
                while (enumerator.moveNext()) {
                    var prop = enumerator.get_current();
                    v.training.push({
                        "title": prop.get_item("Title"),
                        "org": prop.get_item("Org"),
                        "complete": prop.get_item("CompleteDate"),
                        "suspense": prop.get_item("SuspenseDate"),
                        "type": prop.get_item("PersonTypes"),
                        "me": prop.get_item("Category"),
                        "category": Categorize(prop.get_item("CompleteDate"), prop.get_item("SuspenseDate"))
                    });
                }
            }
        }, function (sender, args) {
            logit("Error getting data from Training list : " + args.get_message());
        }));

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
        v.prcntblack = ((v.black / v.users.length) * 100).toFixed(0);
        v.prcntred = ((v.red / v.users.length) * 100).toFixed(0);
        v.prcntyellow = ((v.yellow / v.users.length) * 100).toFixed(0);
        v.prcntgreen = ((v.green / v.users.length) * 100).toFixed(0);

        $("#OverallChart").css({ 'background-color': '#000000' });
        $("#OverallChart").parent().css({ 'margin-left': '-1px', 'margin-right': 0 });
        
        DrawActivityChart("OverallChart", v.prcntblack, v.prcntred, v.prcntyellow, v.prcntgreen, "Mandatory Training Chart");
    }

    function DrawActivityChart(div, black, red, yellow, green, title) {
        if (!Highcharts.theme) {
            Highcharts.setOptions({
                acolors: ['#00ff00', '#ffff00', '#ff0000', '#000000', '#ffffff']
            });
        }

        v.chart = Highcharts.chart(div, {
            chart: {
                type: 'solidgauge',
                backgroundColor: 'black'
            },
            exporting: {
                buttons: {
                    contextButton: {
                        enabled: true
                    }
                }
            },
            title: {
                text: title,
                style: {
                    fontSize: '14px',
                    color: '#ffffff'
                }
            },
            tooltip: {
                borderWidth: 0,
                backgroundColor: 'none',
                shadow: false,
                style: {
                    fontSize: '12px'
                },
                //pointFormat: '{series.name}<br><span style="font-size:2em; color: {point.color}; font-weight: bold">{point.y}%</span>',
                pointFormat: '<span style="color: #ffffff;">{series.name}</span><br><span style="font-size:1.5em; color: #ffffff; font-weight: bold">{point.y}%</span>',
                positioner: function (labelWidth) {
                    return {
                        x: (this.chart.chartWidth - labelWidth) / 2,
                        y: (this.chart.plotHeight / 2) + 15
                    };
                }
            },
            pane: {
                startAngle: 0,
                endAngle: 360,
                background: [{ // Track for
                    outerRadius: '113%',
                    innerRadius: '95%',
                    backgroundColor: Highcharts.Color(Highcharts.getOptions().acolors[0])
                        .setOpacity(0.3)
                        .get(),
                    borderWidth: 0
                }, { // Track for
                    outerRadius: '94%',
                    innerRadius: '76%',
                    backgroundColor: Highcharts.Color(Highcharts.getOptions().acolors[1])
                        .setOpacity(0.3)
                        .get(),
                    borderWidth: 0
                }, { // Track for
                    outerRadius: '75%',
                    innerRadius: '57%',
                    backgroundColor: Highcharts.Color(Highcharts.getOptions().acolors[2])
                        .setOpacity(0.3)
                        .get(),
                    borderWidth: 0
                }, { // Track for
                    outerRadius: '56%',
                    innerRadius: '38%',
                    backgroundColor: Highcharts.Color(Highcharts.getOptions().acolors[4])
                        .setOpacity(0.3)
                        .get(),
                    borderWidth: 0
                }, { // Inner circle for data hover
                    outerRadius: '37%',
                    innerRadius: '0%',
                    backgroundColor: Highcharts.Color(Highcharts.getOptions().acolors[3])
                        .get(),
                    borderWidth: 0
                }]
            },

            yAxis: {
                min: 0,
                max: 100,
                lineWidth: 0,
                tickPositions: []
            },

            plotOptions: {
                solidgauge: {
                    dataLabels: {
                        enabled: false
                    },
                    linecap: 'round',
                    stickyTracking: false,
                    rounded: true
                }
            },

            series: [{
                name: 'Complete',
                data: [{
                    color: Highcharts.getOptions().acolors[0],
                    radius: '113%',
                    innerRadius: '95%',
                    y: Number(green)
                }]
            }, {
                name: 'In Progress',
                data: [{
                    color: Highcharts.getOptions().acolors[1],
                    radius: '94%',
                    innerRadius: '76%',
                    y: Number(yellow)
                }]
            }, {
                name: 'At Risk',
                data: [{
                    color: Highcharts.getOptions().acolors[2],
                    radius: '75%',
                    innerRadius: '57%',
                    y: Number(red)
                }]
            }, {
                name: 'Overdue',
                data: [{
                    color: Highcharts.getOptions().acolors[3],
                    radius: '56%',
                    innerRadius: '38%',
                    y: Number(black)
                }]
            }]
        }, function (chart) {
            $('.highcharts-series-group').children('g').children('path').each(function () {
                logit($(this).attr('fill'));
            });

        });
    }

    return {
        Init: Init
    }
}

SP.SOD.notifyScriptLoadedAndExecuteWaitingJobs('CEWP_TD_Charts_OverallChart2.js');