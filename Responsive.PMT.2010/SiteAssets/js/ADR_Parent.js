var CKO = CKO || {};
CKO.AJAX = CKO.AJAX || {};
CKO.DASHBOARD = CKO.DASHBOARD || {};
CKO.DASHBOARDS.ALLDASHBOARDS = CKO.DASHBOARDS.ALLDASHBOARDS || {};
CKO.DASHBOARDS.ALLDASHBOARDS.VARIABLES = CKO.DASHBOARDS.ALLDASHBOARDS.VARIABLES || {};

CKO.DASHBOARDS.ALLDASHBOARDS.VARIABLES.Parent = {
    site: null,
    loc: String(window.location),
    waitmsg: null,
    title: null,
    url: null,
    data: [],
    actions: [],
    json: null,
    totalhours: 0,
    chartdata: null,
    children: [],
    parents: [],
    parent: ["5.1.3.4.2", "5.1.3.4.5", "5.1.1.5", "5.1.1.6", "5.1.7.7", "5.1.2.4.5", "5.1.2.4.8a", "5.1.2.4.8b"],
    phnum0: ["5.1.3.4.2", "5.2.1.1", "5.3.1.1", "5.4.1.1", "5.5.1.1", "5.6.1.1", "5.7.1.1", "5.8.1.1", "5.9.1.1", "5.10.1.1", "5.11.1.1", "5.12.1.1"],
    phnum1: ["5.1.3.4.5", "5.2.1.2", "5.3.1.2", "5.4.1.2", "5.5.1.2", "5.6.1.2", "5.7.1.2", "5.8.1.2", "5.9.1.2", "5.10.1.2", "5.11.1.2", "5.12.1.2"],
    phnum2: ["5.1.1.5.1", "5.1.1.5.2", "5.1.1.5.3", "5.1.1.5.4", "5.1.1.5.5", "5.1.1.5.6", "5.1.1.5.7", "5.1.1.5.8", "5.1.1.5.9", "5.2.1.3", "5.3.1.3", "5.4.1.3", "5.5.1.3", "5.6.1.3", "5.7.1.3", "5.8.1.3", "5.9.1.3", "5.10.1.3", "5.11.1.3", "5.12.1.3"],
    phnum3: ["5.1.1.6.1", "5.1.1.6.2", "5.1.1.6.3", "5.1.1.6.4", "5.1.1.6.5", "5.1.1.6.6", "5.1.1.6.7", "5.1.1.6.8", "5.1.1.6.9", "5.2.1.4", "5.3.1.4", "5.4.1.4", "5.5.1.4", "5.6.1.4", "5.7.1.4", "5.8.1.4", "5.9.1.4", "5.10.1.4", "5.11.1.4", "5.12.1.4"],
    phnum4: ["5.1.7.7.1", "5.1.7.7.2", "5.1.7.7.3", "5.1.7.7.4", "5.1.7.7.5", "5.1.7.7.6", "5.1.7.7.7", "5.1.7.7.8", "5.1.7.7.9", "5.1.7.7.10", "5.1.7.7.11", "5.1.7.7.12", "5.2.1.5", "5.3.1.5", "5.4.1.5", "5.5.1.5", "5.6.1.5", "5.7.1.5", "5.8.1.5", "5.9.1.5", "5.10.1.5", "5.11.1.5", "5.12.1.5"],
    phnum5: ["5.1.2.4.5", "5.2.1.6", "5.3.1.6", "5.4.1.6", "5.5.1.6", "5.6.1.6", "5.7.1.6", "5.8.1.6", "5.9.1.6", "5.10.1.6", "5.11.1.6", "5.12.1.6"],
    phnum6: ["5.1.2.4.8", "5.2.1.7", "5.3.1.7", "5.4.1.7", "5.5.1.7", "5.6.1.7", "5.7.1.7", "5.8.1.7", "5.9.1.7", "5.10.1.7", "5.11.1.7", "5.12.1.7"],
    phnum7: ["5.2.1.8", "5.3.1.8", "5.4.1.8", "5.5.1.8", "5.6.1.8", "5.7.1.8", "5.8.1.8", "5.9.1.8", "5.10.1.8", "5.11.1.8", "5.12.1.8", "5.1.2.4.8"],
    phmap: {},
    persontypefilter: "All",
    orgfilter: "All",
    timefilter: "M",
    html: null,  //BuildMeATable
    reporttable: null,  //BuildMeATable
    chart: null

};

CKO.DASHBOARDS.ALLDASHBOARDS.Parent = function () {

    var v = CKO.DASHBOARDS.ALLDASHBOARDS.VARIABLES.Parent;

    function Init(site, id, persontypefilter, orgfilter, timefilter) {
        v.site = site;
        v.chart = id;
        v.persontypefilter = persontypefilter;
        v.orgfilter = orgfilter;
        v.timefilter = timefilter;

        if (persontypefilter !== "All" || orgfilter !== "All" || timefilter !== "M") {
            logit("doing filtered  " + id + " variables");
            totalhours = 0;
            //v.parents = [];
            v.parents = parents;
            v.data = [];
            v.actions = [];
            v.json = null;
            v.url = null;
            v.reporttable = null;
            v.chartdata = null;

            $().SPSTools_Notify({ type: 'wait', content: 'Loading Your Filtered Content... Please wait...' });

        } else {

            logit("doing default " + id + " variables");
            totalhours = 0;
            //v.parents = [];
            v.parents = parents;
            v.data = [];
            v.actions = [];
            v.json = null;
            v.url = null;
            v.reporttable = null;
            v.chartdata = null;

            $().SPSTools_Notify({ type: 'wait', content: 'Loading Your Default Content... Please wait...' });

        }

        var monkey = LoadLists(); //LoadChartListname
        //alert("monkey loaded lists");
        jQuery.when.apply(null, monkey).done(function () {
            alert("monkey going for actions");
            GetActions();  //ListsLoaded() ActionsLoaded
            alert("monkey got actions");

        });
    }

    // build the initial Alignments array
    function LoadLists() {
        var deferreds = [];
        var urlString = v.site + "/_vti_bin/listdata.svc/Alignments?";
        urlString += "$select=Id,Parent,Reference,Paragraph";
        urlString += "&$orderby=Paragraph";
        logit("Alignments: " + urlString);

        deferreds.push($.when(CKO.REST.GetListItems.getitems(urlString)).then(function (data) {
            alert("deferreds.pushing");
            var results = data.d.results;
            var j = jQuery.parseJSON(JSON.stringify(results));
            logit(j);
            var pn = 0;
            var data = [null, 0]
            //if the value of paragraph  === a member of alignments, then get the values and push into v.parents
            for (var i = 0, length = j.length; i < length; i++) {
                //make an item for all the values of parent[] and each pnhum[]

                if (pn < parent.length && j[i]["Parent"] === parent[pn]) {       // pn - parentnumber, phan - phnum array number
                    //for (var phan = 0; phi < "v.phnum" + pn + ".length"; phan++) {

                        //logit("v.phnum: parentnumber: [" + pn + "] and  array: " + "v.phnum" + pn);

                        v.parents.push({
                            //'parent': Parent[pn],
                            "category": j[i]["Paragraph"],
                            "drilldown": j[i]["Parent"],
                            //'ref': j[i]["Reference"],
                            'hours': 0,
                            'name': j[i]['Parent'],
                            'id': j[i]['Parent'],
                            //'data': [j[i]["Paragraph"], 0]
                            'data': data
                        });
                       
                    //}
                }
                
            }
            pn++;
        }, function (data) { logit(data); }));

        alert(" returning deferreds");
        //DumpParagraphs("DumpParagraphs: " + v.parents);
        return deferreds;
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
            }

            //var ptf = pfe.options[pfe.selectedIndex].value;
            if (v.persontypefilter !== "All") {
                urlString += " and (PersonTypeValue eq '" + v.persontypefilter + "')";
            }

            //var otf= ofe.options[ofe.selectedIndex].value;
            if (v.orgfilter !== "All") {
                urlString += " and (OrganizationValue eq '" + v.orgfilter + "')";
            }

            //urlString += " and (EffortTypeValue ne Directive)"  // this breaks the data call

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

    function DataLoaded() {
        logit("Parent Chart: All Data Loaded");
        v.totalhours = 0;
            //var numitems = v.json.length;
            // Now loop through the data to get the different parents based on the action
        var j = v.json;
        var nullkeys = 0;
            // Loop over the data for the parent times
        logit("Total number of actions items = " + j.length);
        for (var i = 0, length = j.length; i < length; i++) {
            // console.log('Action ' + i + ' = ' + JSON.stringify(j[i]));  // Logs too much data!
            var pridx = null;
            // Get the next key from the SupportAlignment group; if it's null add it to the "N/A" list.
            var jkey = j[i]["SupportAlignment"];
            if (jkey === null) {
                console.log("Null jkey #" + i);
                nullkeys += 1;
                pridx = 0;

                if (jkey === "N/A") {
                    logit(jkey + "'is  N/A");
                    pridx = 0;
                }

            } else {
                    // If the SupportAlignment starts with a 5 we have a paragraph number; else
                    // we have something we cannot classify.
                var kk = jkey.charAt(0);
                if (kk === "5") {
                    jkey = jkey.replace("-", " ");  // make sure "6.0-stuff" becomes "6.0 stuff"
                    jkey = jkey.split(" ", 1)[0];    // take just the numeric part off jkey
                    //var ss = jkey.split(".");       // split the paragraph levels out
                    var ph = jkey.substr(0, jkey.indexOf('')); // take only the numbers
                    pridx = v.phmap[jkey];       // get the paragraph index for this level
                    if (pridx === null) {
                        logit("Did not find ph map item '" + jkey + "'");
                        pridx = 0;
                    } else { 
                        for (var mm = 0; mm < v.parents.length; mm++) {
                            if (pridx === v.parents[kk]["category"]) {
                                    // Add the rollup hours for this paragraph and update the overall total number of hours
                                v.parents[pridx]["hours"] += j[i]["Expended"];
                                //v.parents[pridx]["index"] = pridx;
                                v.parents[pridx]["data"] = [j[i]["Paragraph"], j[i]["Expended"]];
                                v.totalhours += j[i]["Expended"];

                            }
                        }
                    }
                }
                //}
                // Can't happen but did a couple of times...
                //if (pridx === null) {
                //    logit("Holy undefined batman! Pridx is null!!");
                //    pridx = 0;
                //}
            }
        }

        logit("Total null keys = " + nullkeys);

        //DumpParagraphs(v.parents);

            // Create data for the series using the parents
        v.chartdata = [];
        for (var cd = 0; cd < v.parents.length; cd++) {
            v.chartdata.push({
                "name": v.parents[cd]["category"],
                "y": 100.0 * v.parents[cd]["hours"] / v.totalhours,
                "drilldown": v.parents[cd]["category"],
                "id": v.parents[cd]["category"],
                "data": v.parents[cd]["data"]

            });
        }

        console.log(JSON.stringify(v.chartdata));

        DrawBarChart();

        $("#Parent_panel").find(".highcharts-root").attr("id", "ParentSVG");
        var xmlns = "http://www.w3.org/2000/svg";
        var TotalBox = document.createElementNS(xmlns, "text");

        TotalBox.setAttributeNS(null, "x", 80);
        TotalBox.setAttributeNS(null, "y", 24);
        TotalBox.setAttributeNS(null, "text-anchor", "middle");
        TotalBox.setAttributeNS(null, "style", "font-size: 16px; fill: #333333;");
        var TotalText = document.createTextNode("Total Hours: " + v.totalhours);
        TotalBox.appendChild(TotalText);
        document.getElementById("ParentSVG").appendChild(TotalBox);

        v.reporttable = BuildMeATable(v.parents);
        //v.reporttable = BuildMeATable(v.chartdata);
        $("#tblLegend_Parent").html("").append(v.reporttable);

        $("#SPSTools_Notify").fadeOut("2500", function () {
            $("#SPSTools_Notify").html("");
        });
    }

        // Utility function to log the parent variable
    function DumpParagraphs(pp) {
        for (var ii = 0; ii < pp.length; ++ii) { console.log("Content[" + ii + "] =" + JSON.stringify(pp[ii])); }
    }

    function DrawBarChart() {
        console.log(JSON.stringify(v.chartdata));
        Highcharts.chart('Paragraph_panel', {
            chart: {
                //plotBackgroundColor: null,
                //plotBorderWidth: null,
                //plotShadow: false,
                type: 'column'
            },
            exporting: {
                buttons: {
                    contextButton: {
                        enabled: true
                    }
                }
            },
            title: {
                text: 'Parent'
            },
            subtitle: { //new
                text: 'Click the columns to view details.'
            },
            xAxis: {
                type: 'category'
            },
            yAxis: {
                title: {
                    text: 'Total percent of hours'
                }

            },
            legend: {
                enabled: false
            },
            tooltip: {
                headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
                pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}%</b> of total<br/>'
            },
            plotOptions: {
                series: {
                    borderWidth: 0,
                    dataLabels: {
                        enabled: true,
                        format: '{point.y:.1f}%'
                    }
                }
            },
            series: [{
                name: 'Parent',
                colorByPoint: true,
                data: v.chartdata
            }],
            "drilldown": {
                "series": [{
                    "name": v.chartdata.name,
                    "id": v.chartdata.id,
                    "data": v.chartdata.data
                }]
            }
        });
    }

    // function BuildMeATable(rows, keyses) {
    function BuildMeATable(rows) {
        var newtbl = "<br /><br /><table class='table table-bordered' align = 'CENTER' width = '600' >";
        // Write a header row with the key names as the headings
        //for (j = 0; j < keyses.length; j++) {} --could use this if there were more than two columns
        newtbl += "<tr>";
        newtbl += "<th class='table-heading'>";
        newtbl += "Parent";
        newtbl += "</th>";
        newtbl += "<th class='table-heading'><span class = 'floatright'>";
        newtbl += "Hours";
        newtbl += "</span>";
        newtbl += "</th>";
        newtbl += "</tr>";
        newtbl += "<tbody>";

        // Write one row for each row                  
        for (var r = 0; r < rows.length; r++) {
            newtbl += "<td>";
            newtbl += rows[r].category;
            newtbl += "</td>";
            newtbl += "<td><span class = 'floatright'>";
            newtbl += rows[r].hours;
            newtbl += "</span></td>";
            newtbl += "</tr>";
        }

        newtbl += "<tr>";
        newtbl += "<td><strong>Total Hours</strong></td><td><span class = 'floatright'><strong>" + v.totalhours;
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
