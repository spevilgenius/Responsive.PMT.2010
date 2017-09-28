var CKO = CKO || {};
CKO.AJAX = CKO.AJAX || {};
CKO.DASHBOARD = CKO.DASHBOARD || {};
CKO.DASHBOARD.CHARTS = CKO.DASHBOARD.CHARTS || {};
CKO.DASHBOARD.CHARTS.VARIABLES = CKO.DASHBOARD.CHARTS.VARIABLES || {};

CKO.DASHBOARD.CHARTS.VARIABLES.SVD = {
    site: null,
    loc: String(window.location),
    waitmsg: null,
    title: null,
    ctx: null,
    web: null,
    list: null,
    data: null,
    json: null,
    standard: null,
    directive: null,
    listitem: null,
    user: null,
    userID: null,
    site: null,
    qry: null,
    html: ""
}

CKO.DASHBOARD.CHARTS.SVD = function () {

    var v = CKO.DASHBOARD.CHARTS.VARIABLES.SVD;

    function Init(site, qry) {
        var inDesignMode = document.forms[MSOWebPartPageFormName].MSOLayout_InDesignMode.value;
        if (inDesignMode === "1") {
            $("#SVD").html("").append("<div style='margin:5px;text-align:center;font-weight:bold;font-size:14px;font-style:italic;'>Query Suspended During Page Edit Mode</div>");
        }
        else {
            v.standard = 0;
            v.directive = 0;
            v.site = site;
            v.data = [];
            v.json = null;
            v.qry = qry;
            LoadActions(qry, null);
        }
    }

    function LoadActions(qry, zurl) {
        if (zurl == null) {
            //Load Actions From REST and filter based on qry
            var urlString = "https://hq.tradoc.army.mil/sites/OCKO/PMT/_vti_bin/listdata.svc/Actions?";
            urlString += "$select=Id,Expended,DateCompleted,EffortTypeValue,FY,Quarter,StartOfWeek";
            var today = new Date();
            var fy, month, quarter, weekstart, weekend;
            var quarters = { "Jan": 2, "Feb": 2, "Mar": 2, "Apr": 3, "May": 3, "Jun": 3, "Jul": 4, "Aug": 4, "Sep": 4, "Oct": 1, "Nov": 1, "Dec": 1 }
            month = today.format("MMM");
            quarter = quarters[month];
            weekstart = moment(today).startOf('week');
            weekend = moment(today).endOf('week');

            switch (qry) {
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
            zurl = urlString;
        }

        jQuery.ajax({
            url: zurl,
            method: "GET",
            headers: { 'accept': 'application/json; odata=verbose' },
            error: function (jqXHR, textStatus, errorThrown) {
                //to do implement logging to a central list
                logit("Error Status: " + textStatus + ":: errorThrown: " + errorThrown);
            },
            success: function (data) {
                v.data = v.data.concat(data.d.results);
                if (data.d.__next) {
                    zurl = data.d.__next;
                    //logit("More than 1000 items: Next=" + zurl);
                    LoadActions(qry, zurl); // qry really wont matter here, but need to pass the next url.
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
        logit("Data Loaded");
        var numitems = v.json.length;
        // Now loop through the data to get the standards and directives to create the series for the chart
        var j = v.json;
        for (var i = 0, length = j.length; i < length; i++) {
            switch (j[i]["EffortTypeValue"]) {
                case "Directive":
                    v.directive += j[i]["Expended"];
                    break;

                case "Standard":
                    v.standard += j[i]["Expended"];
                    break;
            }
        }
        DrawPieChart();
        $("#SVD").find("text:contains(" + v.qry + ")").parent().find(".highcharts-button-box").addClass("active").attr("fill", "#ff0000");
    }

    function DrawPieChart() {
        Highcharts.chart('SVD', {
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
                            CKO.DASHBOARD.CHARTS.SVD().Init(v.site, 'Y');
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
                            CKO.DASHBOARD.CHARTS.SVD().Init(v.site, 'Q');
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
                            CKO.DASHBOARD.CHARTS.SVD().Init(v.site, 'M');
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
                            CKO.DASHBOARD.CHARTS.SVD().Init(v.site, 'W');
                        }
                    }
                }
            },
            title: {
                text: 'Standards Vs Directives'
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
                data: [{
                    name: 'Directives',
                    y: v.directive
                }, {
                    name: 'Standards',
                    y: v.standard
                }]
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

SP.SOD.notifyScriptLoadedAndExecuteWaitingJobs('CEWP_Dashboard_Charts_SVD.js');