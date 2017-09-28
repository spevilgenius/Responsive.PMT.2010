var CKO = CKO || {};
CKO.AJAX = CKO.AJAX || {};
CKO.DASHBOARD = CKO.DASHBOARD || {};
CKO.DASHBOARD.CHARTS = CKO.DASHBOARD.CHARTS || {};
CKO.DASHBOARD.CHARTS.VARIABLES = CKO.DASHBOARD.CHARTS.VARIABLES || {};

CKO.DASHBOARD.CHARTS.VARIABLES.Authority = {
    site: null,
    loc: String(window.location),
    waitmsg: null,
    title: null,
    qry: null,
    url: null,
    data: null,
    json: null,
    chartdata: null,
    authorities: null,
    standards: null,
    qry: null,
    directives: null
}

CKO.DASHBOARD.CHARTS.Authority = function () {

    var v = CKO.DASHBOARD.CHARTS.VARIABLES.Authority;

    function Init(site, qry) {
        var inDesignMode = document.forms[MSOWebPartPageFormName].MSOLayout_InDesignMode.value;
        if (inDesignMode === "1") {
            $("#Authority").html("").append("<div style='margin:5px;text-align:center;font-weight:bold;font-size:14px;font-style:italic;'>Query Suspended During Page Edit Mode</div>");
        }
        else {
            v.authorities = new Array();
            v.standards = new Array();
            v.directives = new Array();
            v.site = site;
            v.qry = qry;
            v.data = [];
            v.json = null;
            v.url = null;
            v.qry = qry;
            var monkey = LoadLists();
            jQuery.when.apply(null, monkey).done(function () {
                ListsLoaded();
            });
        }
    }

    function LoadLists() {
        var deferreds = [];
        // Just get the functions and build the initial array.
        var urlString = "https://hq.tradoc.army.mil/sites/OCKO/PMT/_vti_bin/listdata.svc/Alignment?";
        urlString += "$select=Id,Authority,Reference";
        urlString += "&$orderby=Authority";

        deferreds.push($.when(CKO.REST.GetListItems.getitems(urlString)).then(function (data) {
            var results = data.d.results;
            var j = jQuery.parseJSON(JSON.stringify(results));
            var unique = '';
            for (var i = 0, length = j.length; i < length; i++) {
                if (j[i]["Authority"] != unique) {
                    v.authorities.push({
                        "auth": j[i]["Authority"],
                        "ref": j[i]["Reference"],
                        "hours": 0
                    });
                    unique = j[i]["Authority"];
                }
            }
        }, function (data) { logit(data); }));

        urlString = "https://hq.tradoc.army.mil/sites/OCKO/PMT/_vti_bin/listdata.svc/Standards?";
        urlString += "$select=Id,Title,SourceAuthority,SourceReference,Standard";

        deferreds.push($.when(CKO.REST.GetListItems.getitems(urlString)).then(function (data) {
            var results = data.d.results;
            var j = jQuery.parseJSON(JSON.stringify(results));
            for (var i = 0, length = j.length; i < length; i++) {
                v.standards.push({
                    "title": j[i]["Standard"],
                    "auth": j[i]["SourceAuthority"],
                    "ref": j[i]["SourceReference"]
                })
            }
        }, function (data) { logit(data); }));

        urlString = "https://hq.tradoc.army.mil/sites/OCKO/PMT/_vti_bin/listdata.svc/Directives?";
        urlString += "$select=Id,Title,SourceAuthority,SourceReference,Directive";

        deferreds.push($.when(CKO.REST.GetListItems.getitems(urlString)).then(function (data) {
            var results = data.d.results;
            var j = jQuery.parseJSON(JSON.stringify(results));
            for (var i = 0, length = j.length; i < length; i++) {
                v.directives.push({
                    "title": j[i]["Directive"],
                    "auth": j[i]["SourceAuthority"],
                    "ref": j[i]["SourceReference"]
                })
            }
        }, function (data) { logit(data); }));

        return deferreds;
    }

    function ListsLoaded() {
        // Get Actions based on qry
        GetActions();
    }

    function GetActions() {
        if (v.url == null) {
            var urlString = "https://hq.tradoc.army.mil/sites/OCKO/PMT/_vti_bin/listdata.svc/Actions?";
            urlString += "$select=Id,Title,Expended,DateCompleted,EffortTypeValue,FY,Quarter,StartOfWeek,Function";
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
                    GetActions();
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
        // Now loop through the data to get the different Authority based on the action
        var j = v.json;
        for (var i = 0, length = j.length; i < length; i++) {
            // This is all of the actions from the qry so now update the hours for each Function by adding the hours to that array
            switch(j[i]["EffortTypeValue"]) {
                case "Standard":
                    for (var k = 0; k < v.standards.length; k++) {
                        if (j[i]["Title"] == v.standards[k].title) {
                            var aut = v.standards[k].auth
                            for (var m = 0; m < v.authorities.length; m++) {
                                if (v.authorities[m].auth == aut) {
                                    v.authorities[m].hours += j[i]["Expended"];
                                }
                            }
                        }
                    }
                    break;

                case "Directive":
                    for (var k = 0; k < v.directives.length; k++) {
                        if (j[i]["Title"] == v.directives[k].title) {
                            var aut = v.directives[k].auth
                            for (var m = 0; m < v.authorities.length; m++) {
                                if (v.authorities[m].auth == aut) {
                                    v.authorities[m].hours += j[i]["Expended"];
                                }
                            }
                        }
                    }
                    break;
            }
        }
        // Create data for the series using the abbreviations
        v.chartdata = [];
        for (var n = 0; n < v.authorities.length; n++) {
            v.chartdata.push({
                "name": v.authorities[n].auth,
                "y": v.authorities[n].hours
            })
        }
        DrawPieChart();
        $("#Authority").find("text:contains(" + v.qry + ")").parent().find(".highcharts-button-box").attr("fill", "#ff0000");
    }

    function DrawPieChart() {
        Highcharts.chart('Authority', {
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
                            CKO.DASHBOARD.CHARTS.Authority().Init(v.site, 'Y');
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
                            CKO.DASHBOARD.CHARTS.Authority().Init(v.site, 'Q');
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
                            CKO.DASHBOARD.CHARTS.Authority().Init(v.site, 'M');
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
                            CKO.DASHBOARD.CHARTS.Authority().Init(v.site, 'W');
                        }
                    }
                }
            },
            title: {
                text: 'Authority'
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

SP.SOD.notifyScriptLoadedAndExecuteWaitingJobs('CEWP_Dashboard_Charts_Authority.js');