var CKO = CKO || {};
CKO.AJAX = CKO.AJAX || {};
CKO.DASHBOARD = CKO.DASHBOARD || {};
CKO.DASHBOARDS.ALLDASHBOARDS = CKO.DASHBOARDS.ALLDASHBOARDS || {};
CKO.DASHBOARDS.ALLDASHBOARDS.VARIABLES = CKO.DASHBOARDS.ALLDASHBOARDS.VARIABLES || {};

CKO.DASHBOARDS.ALLDASHBOARDS.VARIABLES.Parent2 = {
    site: null,
    loc: String(window.location),
    waitmsg: null,
    title: null,
    url: null,
    data: [],
    actions: [],
    json: null,
    totalhours: 0,
    isdaterange: false,
    startdate: null,
    enddate: null,
    chartdata: [],
    originaltable: null,
    originalhours: 0,
    TotalBox: null,
    TotalText: null,
    subtotalhours: 0,
    isdrilldown: false,
    parents: [{
        "title": "5.1.3.4.2",
        "hours": 0, "subtext": "",
        "text": "KPPM Websites, Portals, WfF, or Online Community support",
        "children": [{ "title": "5.1.3.4.2", "hours": 0, "subtext": "" }, { "title": "5.2.1.1", "hours": 0, "subtext": "" }, { "title": "5.3.1.1", "hours": 0, "subtext": "" }, { "title": "5.4.1.1", "hours": 0, "subtext": "" }, { "title": "5.5.1.1", "hours": 0, "subtext": "" }, { "title": "5.6.1.1", "hours": 0, "subtext": "" }, { "title": "5.7.1.1", "hours": 0, "subtext": "" }, { "title": "5.8.1.1", "hours": 0, "subtext": "" }, { "title": "5.9.1.1", "hours": 0, "subtext": "" }, { "title": "5.10.1.1", "hours": 0, "subtext": "" }, { "title": "5.11.1.1", "hours": 0, "subtext": "" }, { "title": "5.12.1.1", "hours": 0, "subtext": "" }]
    },
    {
        "title": "5.1.3.4.5",
        "hours": 0, "subtext": "",
        "text": "MS SharePoint and Strategic Management System (SMS) support",
        "children": [{ "title": "5.1.3.4.5", "hours": 0, "subtext": "" }, { "title": "5.2.1.2", "hours": 0, "subtext": "" }, { "title": "5.3.1.2", "hours": 0, "subtext": "" }, { "title": "5.4.1.2", "hours": 0, "subtext": "" }, { "title": "5.5.1.2", "hours": 0, "subtext": "" }, { "title": "5.6.1.2", "hours": 0, "subtext": "" }, { "title": "5.7.1.2", "hours": 0, "subtext": "" }, { "title": "5.8.1.2", "hours": 0, "subtext": "" }, { "title": "5.9.1.2", "hours": 0, "subtext": "" }, { "title": "5.10.1.2", "hours": 0, "subtext": "" }, { "title": "5.11.1.2", "hours": 0, "subtext": "" }, { "title": "5.12.1.2", "hours": 0, "subtext": "" }]
    },
    {
        "title": "5.1.1.5",
        "hours": 0, "subtext": "",
        "text": "Program Management Support",
        "children": [{ "title": "5.1.1.5.1", "hours": 0, "subtext": "" }, { "title": "5.1.1.5.2", "hours": 0, "subtext": "" }, { "title": "5.1.1.5.3", "hours": 0, "subtext": "" }, { "title": "5.1.1.5.4", "hours": 0, "subtext": "" }, { "title": "5.1.1.5.5", "hours": 0, "subtext": "" }, { "title": "5.1.1.5.6", "hours": 0, "subtext": "" }, { "title": "5.1.1.5.7", "hours": 0, "subtext": "" }, { "title": "5.1.1.5.8", "hours": 0, "subtext": "" }, { "title": "5.1.1.5.9", "hours": 0, "subtext": "" }, { "title": "5.2.1.3", "hours": 0, "subtext": "" }, { "title": "5.3.1.3", "hours": 0, "subtext": "" }, { "title": "5.4.1.3", "hours": 0, "subtext": "" }, { "title": "5.5.1.3", "hours": 0, "subtext": "" }, { "title": "5.6.1.3", "hours": 0, "subtext": "" }, { "title": "5.7.1.3", "hours": 0, "subtext": "" }, { "title": "5.8.1.3", "hours": 0, "subtext": "" }, { "title": "5.9.1.3", "hours": 0, "subtext": "" }, { "title": "5.10.1.3", "hours": 0, "subtext": "" }, { "title": "5.11.1.3", "hours": 0, "subtext": "" }, { "title": "5.12.1.3", "hours": 0, "subtext": "" }]
    },
    {
        "title": "5.1.1.6",
        "hours": 0, "subtext": "",
        "text": "Program Administrative Support",
        "children": [{ "title": "5.1.1.6.1", "hours": 0, "subtext": "" }, { "title": "5.1.1.6.2", "hours": 0, "subtext": "" }, { "title": "5.1.1.6.3", "hours": 0, "subtext": "" }, { "title": "5.1.1.6.4", "hours": 0, "subtext": "" }, { "title": "5.1.1.6.5", "hours": 0, "subtext": "" }, { "title": "5.1.1.6.6", "hours": 0, "subtext": "" }, { "title": "5.1.1.6.7", "hours": 0, "subtext": "" }, { "title": "5.1.1.6.8", "hours": 0, "subtext": "" }, { "title": "5.1.1.6.9", "hours": 0, "subtext": "" }, { "title": "5.2.1.4", "hours": 0, "subtext": "" }, { "title": "5.3.1.4", "hours": 0, "subtext": "" }, { "title": "5.4.1.4", "hours": 0, "subtext": "" }, { "title": "5.5.1.4", "hours": 0, "subtext": "" }, { "title": "5.6.1.4", "hours": 0, "subtext": "" }, { "title": "5.7.1.4", "hours": 0, "subtext": "" }, { "title": "5.8.1.4", "hours": 0, "subtext": "" }, { "title": "5.9.1.4", "hours": 0, "subtext": "" }, { "title": "5.10.1.4", "hours": 0, "subtext": "" }, { "title": "5.11.1.4", "hours": 0, "subtext": "" }, { "title": "5.12.1.4", "hours": 0, "subtext": "" }]
    },
    {
        "title": "5.1.7.7",
        "hours": 0, "subtext": "",
        "text": "Training, Education, Professional Development and Performance Support",
        "children": [{ "title": "5.1.7.7.1", "hours": 0, "subtext": "" }, { "title": "5.1.7.7.2", "hours": 0, "subtext": "" }, { "title": "5.1.7.7.3", "hours": 0, "subtext": "" }, { "title": "5.1.7.7.4", "hours": 0, "subtext": "" }, { "title": "5.1.7.7.5", "hours": 0, "subtext": "" }, { "title": "5.1.7.7.6", "hours": 0, "subtext": "" }, { "title": "5.1.7.7.7", "hours": 0, "subtext": "" }, { "title": "5.1.7.7.8", "hours": 0, "subtext": "" }, { "title": "5.1.7.7.9", "hours": 0, "subtext": "" }, { "title": "5.1.7.7.10", "hours": 0, "subtext": "" }, { "title": "5.1.7.7.11", "hours": 0, "subtext": "" }, { "title": "5.1.7.7.12", "hours": 0, "subtext": "" }, { "title": "5.2.1.5", "hours": 0, "subtext": "" }, { "title": "5.3.1.5", "hours": 0, "subtext": "" }, { "title": "5.4.1.5", "hours": 0, "subtext": "" }, { "title": "5.5.1.5", "hours": 0, "subtext": "" }, { "title": "5.6.1.5", "hours": 0, "subtext": "" }, { "title": "5.7.1.5", "hours": 0, "subtext": "" }, { "title": "5.8.1.5", "hours": 0, "subtext": "" }, { "title": "5.9.1.5", "hours": 0, "subtext": "" }, { "title": "5.10.1.5", "hours": 0, "subtext": "" }, { "title": "5.11.1.5", "hours": 0, "subtext": "" }, { "title": "5.12.1.5", "hours": 0, "subtext": "" }]
    },
    {
        "title": "5.1.2.4.5",
        "hours": 0, "subtext": "",
        "text": "Measurement, Analysis and Reporting System (MARS) support",
        "children": [{ "title": "5.1.2.4.5", "hours": 0, "subtext": "" }, { "title": "5.2.1.6", "hours": 0, "subtext": "" }, { "title": "5.3.1.6", "hours": 0, "subtext": "" }, { "title": "5.4.1.6", "hours": 0, "subtext": "" }, { "title": "5.5.1.6", "hours": 0, "subtext": "" }, { "title": "5.6.1.6", "hours": 0, "subtext": "" }, { "title": "5.7.1.6", "hours": 0, "subtext": "" }, { "title": "5.8.1.6", "hours": 0, "subtext": "" }, { "title": "5.9.1.6", "hours": 0, "subtext": "" }, { "title": "5.10.1.6", "hours": 0, "subtext": "" }, { "title": "5.11.1.6", "hours": 0, "subtext": "" }, { "title": "5.12.1.6", "hours": 0, "subtext": "" }]
    },
    {
        "title": "5.1.2.4.8a",
        "hours": 0, "subtext": "",
        "text": "Performance Management Tool (PMT) Input and support",
        "children": [{ "title": "5.1.2.4.8", "hours": 0, "subtext": "", "8a": true }, { "title": "5.2.1.7", "hours": 0, "subtext": "" }, { "title": "5.3.1.7", "hours": 0, "subtext": "" }, { "title": "5.4.1.7", "hours": 0, "subtext": "" }, { "title": "5.5.1.7", "hours": 0, "subtext": "" }, { "title": "5.6.1.7", "hours": 0, "subtext": "" }, { "title": "5.7.1.7", "hours": 0, "subtext": "" }, { "title": "5.8.1.7", "hours": 0, "subtext": "" }, { "title": "5.9.1.7", "hours": 0, "subtext": "" }, { "title": "5.10.1.7", "hours": 0, "subtext": "" }, { "title": "5.11.1.7", "hours": 0, "subtext": "" }, { "title": "5.12.1.7", "hours": 0, "subtext": "" }]
    },
    {
        "title": "5.1.2.4.8b",
        "hours": 0, "subtext": "",
        "text": "KPPM Metrics, Key Performance Indicators (KPI) and dashboard support",
        "children": [{ "title": "5.1.2.4.8", "hours": 0, "subtext": "", "8b": true }, { "title": "5.2.1.8", "hours": 0, "subtext": "" }, { "title": "5.3.1.8", "hours": 0, "subtext": "" }, { "title": "5.4.1.8", "hours": 0, "subtext": "" }, { "title": "5.5.1.8", "hours": 0, "subtext": "" }, { "title": "5.6.1.8", "hours": 0, "subtext": "" }, { "title": "5.7.1.8", "hours": 0, "subtext": "" }, { "title": "5.8.1.8", "hours": 0, "subtext": "" }, { "title": "5.9.1.8", "hours": 0, "subtext": "" }, { "title": "5.10.1.8", "hours": 0, "subtext": "" }, { "title": "5.11.1.8", "hours": 0, "subtext": "" }, { "title": "5.12.1.8", "hours": 0, "subtext": "" }]
    }
    ],
    persontypefilter: "All",
    orgfilter: "All",
    timefilter: "M",
    html: null,  //BuildMeATable
    reporttable: null,  //BuildMeATable
    chart: null

};

CKO.DASHBOARDS.ALLDASHBOARDS.Parent2 = function () {

    var v = CKO.DASHBOARDS.ALLDASHBOARDS.VARIABLES.Parent2;

    function Init(site, id, persontypefilter, orgfilter, timefilter, isdaterange, start, end) {
        loadCSS('https://hq.tradoc.army.mil/sites/ocko/SiteAssets/css/AllDashboardReports2.css');
        v.site = site;
        v.chart = id;
        v.persontypefilter = persontypefilter;
        v.orgfilter = orgfilter;
        v.timefilter = timefilter;
        if (isdaterange) {
            v.startdate = start;
            v.enddate = end;
            v.isdaterange = true;
        }

        if (persontypefilter !== "All" || orgfilter !== "All" || timefilter !== "M") {
            logit("doing filtered  " + id + " variables");
            v.totalhours = 0;
            v.data = [];
            v.actions = [];
            v.json = null;
            v.url = null;
            v.reporttable = null;
            v.chartdata = [];

            $().SPSTools_Notify({ type: 'wait', content: 'Loading Your Filtered Content... Please wait...' });

        } else {

            logit("doing default " + id + " variables");
            v.totalhours = 0;
            v.data = [];
            v.actions = [];
            v.json = null;
            v.url = null;
            v.reporttable = null;
            v.chartdata = [];

            $().SPSTools_Notify({ type: 'wait', content: 'Loading Your Default Content... Please wait...' });

        }

        GetActions();
    }

    //Get Support Alignment data from PMT Actions table
    function GetActions() {

        if (v.url === null) {
            var urlString = v.site + "/_vti_bin/listdata.svc/Actions?";
            urlString += "$select=Id,Title,Expended,DateCompleted,SupportAlignment,EffortTypeValue,PersonTypeValue,OrganizationValue";
            urlString += "&$filter=";

            logit("ACTIONS:  " + urlString);
            switch (v.timefilter) {
                case "Y":
                    urlString += "(DateCompleted ge datetime'" + moment().subtract(1, 'years').format('YYYY-MM-DD[T]HH:MM:[00Z]') + "')";
                    break;

                case "Q":
                    urlString += "(DateCompleted ge datetime'" + moment().subtract(90, 'days').format('YYYY-MM-DD[T]HH:MM:[00Z]') + "')";
                    break;

                case "M":
                    urlString += "(DateCompleted ge datetime'" + moment().subtract(30, 'days').format('YYYY-MM-DD[T]HH:MM:[00Z]') + "')";
                    break;

                case "W":
                    urlString += "(DateCompleted ge datetime'" + moment().subtract(7, 'days').format('YYYY-MM-DD[T]HH:MM:[00Z]') + "')";
                    break;

                case "R":
                    urlString += "(DateCompleted ge datetime'" + moment(v.startdate).format('YYYY-MM-DD[T]HH:MM:[00Z]') + "') and (DateCompleted le datetime'" + moment(v.enddate).format('YYYY-MM-DD[T]HH:MM:[00Z]') + "')";
                    break;
            }

            if (v.persontypefilter !== "All") {
                urlString += " and (PersonTypeValue eq '" + v.persontypefilter + "')";
            }

            if (v.orgfilter !== "All") {
                urlString += " and (OrganizationValue eq '" + v.orgfilter + "')";
            }

            urlString += " and (startswith(SupportAlignment, '5'))";
            v.url = urlString;
            logit("Parent Chart Query urlString: " + v.url);
        }

        jQuery.ajax({
            url: v.url,
            method: "GET",
            headers: { 'accept': 'application/json; odata=verbose' },
            error: function (jqXHR, textStatus, errorThrown) {
                //to do implement logging to a central list
                logit("Parent Chart: Error Status: " + textStatus + ":: errorThrown: " + errorThrown);
                $("#SPSTools_Notify").fadeOut("2500", function () {
                    $("#SPSTools_Notify").html("");
                });
            },
            success: function (data) {
                v.data = v.data.concat(data.d.results);
                if (data.d.__next) { // loads the next URL until there is no next URL .__ is part of the URL
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

    function findIndexInData(data, property, value) {
        for (var i = 0, l = data.length; i < l; i++) {
            if (data[i][property] === value) {
                return i;
            }
        }
        return -1;
    }

    function DataLoaded() {
        logit("Parent Chart: All Data Loaded");
        v.totalhours = 0;
        var j = v.json;
        // in this scenario we have the 'children' in the actions and we need to add their hours to their respective parents
        // for 5.1.2.4.8 if the alignment contains (PMT) it belongs to the 8a parent and if contains (KPI) it belongs to the 8b parent 
        var tp1, tp2, tp3, tp4, tp5, tp6, idx, cidx, title, compare, child;

        for (var s = 0; s < j.length; s++) {
            tp1 = j[s]["SupportAlignment"];
            tp2 = tp1.split(" ");
            tp3 = tp2[0];
            tp4 = tp1.substr(tp1.indexOf(" ") + 1); // This is to get the non numeric portion of the alignment
            tp5 = tp4.indexOf("PMT");
            tp6 = tp4.indexOf("KPI");
            if (tp3 === "5.1.2.4.8") {
                switch (true) {
                    case tp5 > 0:
                        idx = findIndexInData(v.parents, "title", "5.1.2.4.8a");
                        v.parents[idx].hours += j[s]["Expended"]; // add hours to this parent
                        v.parents[idx].children[0].hours += j[s]["Expended"]; // add hours to this child
                        v.totalhours += j[s]["Expended"]; // add hours to the total
                        // if the child does not have the subtext add it here
                        v.parents[idx].children[0].subtext = tp4;
                        break;

                    case tp6 > 0:
                        idx = findIndexInData(v.parents, "title", "5.1.2.4.8b");
                        v.parents[idx].hours += j[s]["Expended"]; // add hours to this parent
                        v.parents[idx].children[0].hours += j[s]["Expended"]; // add hours to this child
                        v.totalhours += j[s]["Expended"]; // add hours to the total
                        // if the child does not have the subtext add it here
                        v.parents[idx].children[0].subtext = tp4;
                        break;
                }
                tp5 = 0;
                tp6 = 0;
            }
            else {
                for (var r = 0; r < v.parents.length; r++) {
                    idx = findIndexInData(v.parents[r].children, "title", tp3);
                    if (idx !== -1) {
                        // this item belongs to this parent so add it to the parent hours and the child hours
                        v.parents[r].hours += j[s]["Expended"]; // add hours to this parent
                        v.parents[r].children[idx].hours += j[s]["Expended"]; // add hours to this child
                        v.totalhours += j[s]["Expended"]; // add hours to the total
                        // if the child does not have the subtext add it here
                        v.parents[r].children[idx].subtext = tp4;
                    }
                }
            }
        }

        var stop = "stop";

        BuildChart();

        $(".highcharts-xaxis-labels").find("span").each(function () {
            $(this).css({ 'font-weight': 350 }, { 'font-size': '10px !important' }, { 'overflow': 'auto' });
        });

        $("#Parent_panel").find(".highcharts-root").attr("id", "ParentSVG");
        var xmlns = "http://www.w3.org/2000/svg";
        v.TotalBox = document.createElementNS(xmlns, "text");

        v.TotalBox.setAttributeNS(null, "x", 100);
        v.TotalBox.setAttributeNS(null, "y", 24);
        v.TotalBox.setAttributeNS(null, "text-anchor", "middle");
        v.TotalBox.setAttributeNS(null, "style", "font-size: 16px; fill: #333333;");
        v.TotalText = document.createTextNode("Total Hours: " + v.totalhours);
        v.originalhours = v.totalhours;
        v.TotalBox.appendChild(v.TotalText);
        document.getElementById("ParentSVG").appendChild(v.TotalBox);

        v.reporttable = BuildMeATable(v.parents, v.totalhours);
        v.originaltable = v.reporttable;
        $("#tblLegend_Parent").html("").append(v.reporttable);

        $("#SPSTools_Notify").fadeOut("2500", function () {
            $("#SPSTools_Notify").html("");
        });
    }

    function getChildData(point, type) {
        var idx = findIndexInData(v.parents, "title", point);
        var data = [];
        if (idx !== -1) {
            if (type === "table") {
                for (var i = 0; i < v.parents[idx].children.length; i++) {
                    data.push({
                        "title": v.parents[idx].children[i].title,
                        "hours": v.parents[idx].children[i].hours,
                        "text": v.parents[idx].text,
                        "subtext": v.parents[idx].children[i].subtext
                    });
                }
            }
            else {
                v.subtotalhours = 0;
                for (var i = 0; i < v.parents[idx].children.length; i++) {
                    v.subtotalhours += v.parents[idx].children[i].hours;
                    data.push({
                        "name": v.parents[idx].children[i].title,
                        "y": v.parents[idx].children[i].hours,
                        "text": v.parents[idx].text,
                        "subtext": v.parents[idx].children[i].subtext
                    });
                }
            }
        }
        return data;
    }

    function drawlabel(obj) {
        var label, flabel;
        label = obj.value;
        if (v.isdrilldown) {
            label = label.split(".")
            flabel = label[0] + "." + label[1];
            var stop = "stop";
            var html;
            switch (flabel) {
                case "5.1":
                    html = "<span class='parent_xaxis_label'>" + obj.value + "</span>";
                    break;

                case "5.2":
                    html = "<span class='parent_xaxis_label'>" + obj.value + "</span>";
                    break;

                case "5.3":
                    html = "<span class='parent_xaxis_label'>" + obj.value + "</span>";
                    break;

                case "5.4":
                    html = "<span class='parent_xaxis_label'>" + obj.value + "</span>";
                    break;

                case "5.5":
                    html = "<span class='parent_xaxis_label'>" + obj.value + "</span>";
                    break;

                case "5.6":
                    html = "<span class='parent_xaxis_label'>" + obj.value + "</span>";
                    break;

                case "5.7":
                    html = "<span class='parent_xaxis_label'>" + obj.value + "</span>";
                    break;

                case "5.8":
                    html = "<span class='parent_xaxis_label'>" + obj.value + "</span>";
                    break;

                case "5.9":
                    html = "<span class='parent_xaxis_label'>" + obj.value + "</span>";
                    break;

                case "5.10":
                    html = "<span class='parent_xaxis_label'>" + obj.value + "</span>";
                    break;

                case "5.11":
                    html = "<span class='parent_xaxis_label'>" + obj.value + "</span>";
                    break;

                case "5.12":
                    html = "<span class='parent_xaxis_label'>" + obj.value + "</span>";
                    break;
            }
            return html;
        }
        else {
            return label;
        }
    }

    function drawcharttip(obj) {
        var stop = "stop";
        var html = "<div style='width: 100%'>";
        html += "<div style='text-align: center;'>" + obj.point.y + " Hours </div>";
        html += "<div style='text-align: center;'>" + obj.point.text + "</div></div>";
        if (v.isdrilldown) {
            html += "<div style='text-align: center;'>" + obj.point.subtext + "</div></div>";
        }
        return html;
    }

    function BuildChart() {
        // create chart data from v.parents
        for (var i = 0; i < v.parents.length; i++) {
            v.chartdata.push({
                name: v.parents[i].title,
                y: v.parents[i].hours,
                text: v.parents[i].text,
                drilldown: true
            });
        }

        Highcharts.chart('Parent_panel', {
            chart: {
                type: 'column',
                events: {
                    drilldown: function (e) {
                        v.isdrilldown = true;
                        if (!e.seriesOptions) {
                            logit("Drilldown: " + e.point.name);
                            var ddata = getChildData(e.point.name, "chart");
                            var tdata = getChildData(e.point.name, "table");
                            var chart = this,
                                drilldowns = {
                                    'Hours': {
                                        name: e.point.name,
                                        data: ddata    //getChildData(e.point.name, "chart")
                                    }
                                },
                                series = drilldowns['Hours'];

                            // Show the loading label
                            chart.showLoading('Getting Drilldown Data...');

                            // Now build the table for the drill down data and replace the total hours area with the total for the drill down

                            v.reporttable = BuildMeATable(tdata, v.subtotalhours);
                            $("#tblLegend_Parent").html("").append(v.reporttable);

                            document.getElementById("ParentSVG").removeChild(v.TotalBox);
                            v.TotalBox.removeChild(v.TotalText);
                            v.TotalText = document.createTextNode("Total Hours: " + v.subtotalhours);
                            v.TotalBox.appendChild(v.TotalText);
                            document.getElementById("ParentSVG").appendChild(v.TotalBox);

                            setTimeout(function () {
                                chart.hideLoading();
                                chart.addSeriesAsDrilldown(e.point, series);
                            }, 1000);
                        }
                        $(".highcharts-xaxis-labels").find("span").each(function () {
                            $(this).css({ 'font-weight': 350 }, { 'font-size': '10px !important' }, { 'overflow': 'auto' });
                        });
                    },
                    drillup: function () {
                        v.isdrilldown = false;
                        // replace the table with the original one
                        $("#tblLegend_Parent").html("").append(v.originaltable);
                        document.getElementById("ParentSVG").removeChild(v.TotalBox);
                        v.TotalBox.removeChild(v.TotalText);
                        v.TotalText = document.createTextNode("Total Hours: " + v.originalhours);
                        v.TotalBox.appendChild(v.TotalText);
                        document.getElementById("ParentSVG").appendChild(v.TotalBox);
                        $(".highcharts-xaxis-labels").find("span").each(function () {
                            $(this).css({ 'font-weight': 350 }, { 'font-size': '10px !important' }, { 'overflow': 'auto' });
                        });
                    }
                }
            },
            title: {
                text: 'PWS Parent'
            },
            xAxis: {
                type: 'category',
                labels: {
                    useHTML: true,
                    formatter: function () {
                        var xl = drawlabel(this);
                        return xl;
                    }
                }
            },
            legend: {
                enabled: false
            },
            tooltip: {
                useHTML: true,
                formatter: function () {
                    var tt = drawcharttip(this);
                    return tt;
                }
            },
            plotOptions: {
                series: {
                    borderWidth: 0,
                    dataLabels: {
                        enabled: true
                    }
                }
            },
            series: [{
                name: 'Hours',
                colorByPoint: true,
                data: v.chartdata
            }],
            drilldown: {
                series: []
            }
        });
    }

    function BuildMeATable(rows, total) {
        var newtbl = "<br /><br /><table class='table table-bordered' align = 'CENTER' width = '600' >";
        // Write a header row with the key names as the headings
        newtbl += "<tr>";
        newtbl += "<th class='table-heading'>";
        if (v.isdrilldown) {
            newtbl += rows[0].text;
        }
        else {
            newtbl += "Title";
        }
        newtbl += "</th>";
        newtbl += "<th class='table-heading'><span class = 'floatright'>";
        newtbl += "Hours";
        newtbl += "</span>";
        newtbl += "</th>";
        newtbl += "</tr>";
        newtbl += "<tbody>";

        // Write one row for each row                  
        for (var r = 0; r < rows.length; r++) {
            newtbl += "<tr><td>";
            if (v.isdrilldown) {
                newtbl += rows[r].title + " - " + rows[r].subtext;
            }
            else {
                newtbl += rows[r].title + " - " + rows[r].text;
            }
            newtbl += "</td>";
            newtbl += "<td><span class = 'floatright'>";
            newtbl += rows[r].hours;
            newtbl += "</span></td>";
            newtbl += "</tr>";
        }

        newtbl += "<tr>";
        newtbl += "<td><strong>Total Hours</strong></td><td><span class = 'floatright'><strong>" + total;
        newtbl += "</strong></td>";
        newtbl += "</tr>";
        newtbl += "</tbody>";
        newtbl += "</table>";
        return newtbl;
    }

    return {
        Init: Init
    };

};