var CKO = CKO || {};
CKO.AJAX = CKO.AJAX || {};
CKO.DASHBOARD = CKO.DASHBOARD || {};
CKO.DASHBOARD.CHARTS = CKO.DASHBOARD.CHARTS || {};
CKO.DASHBOARD.CHARTS.VARIABLES = CKO.DASHBOARD.CHARTS.VARIABLES || {};

CKO.DASHBOARD.CHARTS.VARIABLES.Functions = {
    site: null,
    loc: String(window.location),
    waitmsg: null,
    title: null,
    qry: null,
    url: null,
    data: null,
    json: null,
    chartdata: null,
    qry: null,
    functions: null
}

CKO.DASHBOARD.CHARTS.Functions = function () {

    var v = CKO.DASHBOARD.CHARTS.VARIABLES.Functions;

    function Init(site, qry) {
        var inDesignMode = document.forms[MSOWebPartPageFormName].MSOLayout_InDesignMode.value;
        if (inDesignMode === "1") {
            $("#Functions").html("").append("<div style='margin:5px;text-align:center;font-weight:bold;font-size:14px;font-style:italic;'>Query Suspended During Page Edit Mode</div>");
        }
        else {
            v.functions = new Array();
            v.site = site;
            v.qry = qry;
            v.data = [];
            v.json = null;
            v.url = null;
            v.qry = qry;
            var zebra = LoadFunctions();
            jQuery.when.apply(null, zebra).done(function () {
                FunctionsLoaded();
            });
        }
    }

    function LoadFunctions() {
        var deferreds = [];
        // Just get the functions and build the initial array.
        var urlString = "https://hq.tradoc.army.mil/sites/OCKO/PMT/_vti_bin/listdata.svc/Functions?";
        urlString += "$select=Id,Title,Abbreviation";

        deferreds.push($.when(CKO.REST.GetListItems.getitems(urlString)).then(function (data) {
            var results = data.d.results;
            var j = jQuery.parseJSON(JSON.stringify(results));
            for (var i = 0, length = j.length; i < length; i++) {
                v.functions.push({
                    "title": j[i]["Title"],
                    "abbr": j[i]["Abbreviation"],
                    "hours": 0
                })
            }
        }, function (data) { logit(data); }));
        return deferreds;
    }

    function FunctionsLoaded() {
        if (v.url == null) {
            var urlString = "https://hq.tradoc.army.mil/sites/OCKO/PMT/_vti_bin/listdata.svc/Actions?";
            urlString += "$select=Id,Expended,DateCompleted,EffortTypeValue,FY,Quarter,StartOfWeek,Function";
            var today = new Date();
            var fy, month, quarter, weekstart, weekend;
            var quarters = { "Jan": 2, "Feb": 2, "Mar": 2, "Apr": 3, "May": 3, "Jun": 3, "Jul": 4, "Aug": 4, "Sep": 4, "Oct": 1, "Nov": 1, "Dec": 1 }
            month = today.format("MMM");
            quarter = quarters[month];
            weekstart = moment(today).startOf('week');
            weekend = moment(today).endOf('week');

            switch (v.qry) {
                case "Y":
                    fy = moment(today).format("YYYY");
                    urlString += "&$filter=(FY eq '" + fy + "')";
                    break;

                case "Q":
                    fy = moment(today).format("YYYY");
                    urlString += "&$filter=(FY eq '" + fy + "') and (Quarter eq '" + quarter + "')";
                    break;

                case "M":
                    fy = moment(today).format("YYYY");
                    urlString += "&$filter=(substringof('" + month + "', ReportMonth)) and (FY eq '" + fy + "')";
                    break;

                case "W":
                    fy = moment(today).format("YYYY");
                    urlString += "&$filter=((StartOfWeek eq datetime'" + getISODate(weekstart) + "') and (FY eq '" + fy + "'))";
                    break;
            }
            v.url = urlString;
        }

        jQuery.ajax({
            url: v.url,
            method: "GET",
            headers: { 'accept': 'application/json; odata=verbose' },
            error: function (jqXHR, textStatus, errorThrown) {
                //to do implement logging to a central list
                logit("Error Status: " + textStatus + ":: errorThrown: " + errorThrown);
            },
            success: function (data) {
                v.data = v.data.concat(data.d.results);
                if (data.d.__next) {
                    v.url = data.d.__next;
                    FunctionsLoaded();
                }
                else {
                    var results = v.data;
                    v.json = jQuery.parseJSON(JSON.stringify(results));
                    DataLoaded();
                }
            }
        });
    }

    function DataLoaded() {
        logit("All Data Loaded");
        var numitems = v.json.length;
        // Now loop through the data to get the different functions based on the action
        var j = v.json;
        for (var i = 0, length = j.length; i < length; i++) {
            // This is all of the actions from the qry so now update the hours for each Function by adding the hours to that array
            for (var k = 0; k < v.functions.length; k++) {
                if (v.functions[k].title == j[i]["Function"]) {
                    v.functions[k].hours += j[i]["Expended"];
                }
            }
        }
        // Create data for the series using the abbreviations
        v.chartdata = [];
        for (var k = 0; k < v.functions.length; k++) {
            v.chartdata.push({
                "name": v.functions[k]["abbr"],
                "y": v.functions[k]["hours"]
            })
        }
        DrawPieChart();
        $("#Functions").find("text:contains(" + v.qry + ")").parent().find(".highcharts-button-box").attr("fill", "#ff0000");
    }

    function DrawPieChart() {
        Highcharts.chart('Functions', {
            chart: {
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false,
                type: 'pie'
            },
            exporting: {
                buttons: {
                    contextButton: {
                        enabled: true
                    },
                    yearButton: {
                        text: 'Y',
                        theme: {
                            'stroke-width': 1,
                            stroke: 'black',
                            fill: '#cccccc',
                            r: 1,
                            states: {
                                hover: {
                                    fill: '#ff0000'
                                },
                                select: {
                                    fill: '#ff0000'
                                }
                            }
                        },
                        onclick: function () {
                            CKO.DASHBOARD.CHARTS.Functions().Init(v.site, 'Y');
                        }
                    },
                    quarterButton: {
                        text: 'Q',
                        theme: {
                            'stroke-width': 1,
                            stroke: 'black',
                            fill: '#cccccc',
                            r: 1,
                            states: {
                                hover: {
                                    fill: '#ff0000'
                                },
                                select: {
                                    fill: '#ff0000'
                                }
                            }
                        },
                        onclick: function () {
                            CKO.DASHBOARD.CHARTS.Functions().Init(v.site, 'Q');
                        }
                    },
                    monthButton: {
                        text: 'M',
                        theme: {
                            'stroke-width': 1,
                            stroke: 'black',
                            fill: '#cccccc',
                            r: 1,
                            states: {
                                hover: {
                                    fill: '#ff0000'
                                },
                                select: {
                                    fill: '#ff0000'
                                }
                            }
                        },
                        onclick: function () {
                            CKO.DASHBOARD.CHARTS.Functions().Init(v.site, 'M');
                        }
                    },
                    weekButton: {
                        text: 'W',
                        theme: {
                            'stroke-width': 1,
                            stroke: 'black',
                            fill: '#cccccc',
                            r: 1,
                            states: {
                                hover: {
                                    fill: '#ff0000'
                                },
                                select: {
                                    fill: '#ff0000'
                                }
                            }
                        },
                        onclick: function () {
                            CKO.DASHBOARD.CHARTS.Functions().Init(v.site, 'W');
                        }
                    }
                }
            },
            title: {
                text: 'Functions'
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
                name: 'Hours',
                colorByPoint: true,
                data: v.chartdata
            }]
        });
    }

    return {
        Init: Init
    }
}

function getISODate(date) {
    function pad(n) { return n < 10 ? '0' + n : n }
    if (date != null) {
        d = new Date(date);
    }
    else {
        d = new Date();
    }
    var s = "";
    s += d.getFullYear() + "-";
    s += pad(d.getMonth() + 1) + "-";
    s += pad(d.getDate());
    s += "T" + pad(d.getHours()) + ":";
    s += pad(d.getMinutes()) + ":";
    s += pad(d.getSeconds()) + "Z";
    return s;
}

SP.SOD.notifyScriptLoadedAndExecuteWaitingJobs('CEWP_Dashboard_Charts_Functions.js');