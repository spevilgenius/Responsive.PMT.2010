﻿var CKO = CKO || {};
CKO.AJAX = CKO.AJAX || {};
CKO.DASHBOARD = CKO.DASHBOARD || {};
CKO.DASHBOARD.TASKERS = CKO.DASHBOARD.TASKERS || {};

CKO.DASHBOARD.TASKERS.Taskers = function () {

    function Init(site) {
        var inDesignMode = document.forms[MSOWebPartPageFormName].MSOLayout_InDesignMode.value;
        logit("Design Mode = " + inDesignMode);
        if (inDesignMode === "1") {
            $("#Taskers").html("").append("<div style='margin:5px;text-align:center;font-weight:bold;font-size:14px;font-style:italic;'>Query Suspended During Page Edit Mode</div>");
        }
        else {
            loadCSS(site + '/SiteAssets/css/responsive.bootstrap.min.css');
            LoadTaskers();
        }
    }

    function LoadTaskers() {
        //Load Taskers From REST
        var urlString = "https://hq.tradoc.army.mil/sites/OCKO/PMT/_vti_bin/listdata.svc/CATS?";
        urlString += "$select=Id,Subject,CATSSuspense,OCKOSuspense,ClosedValue,CATSControlNumber,CATSIssued";
        urlString += "&$filter=(ClosedValue eq 'No')";
        urlString += "&$orderby=CATSSuspense";

        jQuery.ajax({
            url: urlString,
            method: "GET",
            headers: { 'accept': 'application/json; odata=verbose' },
            error: function (jqXHR, textStatus, errorThrown) {
                //to do implement logging to a central list
                logit("Error Status: " + textStatus + ":: errorThrown: " + errorThrown);
            },
            success: function (data) {
                var v = {
                    html: ""
                }
                var results = data.d.results;
                var j = jQuery.parseJSON(JSON.stringify(results));
                logit("Taskers Count: " + data.d.results.length);
                v.html += "<table id='tblTaskers' class='table table-bordered table-hover' cellspacing='0' cellpadding='0'>"
                v.html += "<thead><tr><td>CATS Ctrl<br/>Number</td><td>OCKO Suspense</td><td>CATS Suspense</td><td>CATS Issued</td></tr></thead>";
                v.html += "<tbody>";
                for (var i = 0, length = j.length; i < length; i++) {
                    v.html += "<tr>";
                    var a = String(j[i]["OCKOSuspense"]);
                    if (a != "null" && a.indexOf("Date") >= 0) {
                        //logit("1: OCKOSuspense - " + j[i]["OCKOSuspense"]);
                        a = moment(a);
                        var b = moment();
                        var c = a.diff(b, 'days');
                        var d;
                        var pt;
                        switch (true) {
                            case (c <= 0):
                                d = "text-danger powerTip";
                                pt = j[i]["Subject"];
                                break;

                            case (c > 0):
                                d = "powerTip";
                                pt = j[i]["Subject"];
                                break;
                        }
                        v.html += "<td class='" + d + "' data-powertip='" + pt + "'>" + j[i]["CATSControlNumber"] + "</td>";
                        v.html += "<td>" + dateformat(j[i]["OCKOSuspense"], 'isoshort') + "</td>";
                    }
                    else {
                        logit("2: OCKOSuspense - " + j[i]["OCKOSuspense"]);
                        d = "powerTip";
                        pt = j[i]["Subject"];
                        v.html += "<td class='" + d + "' data-powertip='" + pt + "'>" + j[i]["CATSControlNumber"] + "</td>";
                        v.html += "<td></td>";
                    }
                    var e = String(j[i]["CATSSuspense"]);
                    if (e != "null" && e.indexOf("Date") >= 0) { v.html += "<td>" + dateformat(j[i]["CATSSuspense"], 'isoshort') + "</td>"; } else { v.html += "<td></td>"; }
                    v.html += "<td>" + j[i]["CATSIssued"] + "</td>";
                }
                v.html += "</tbody></table>";
                $("#Taskers").html("").append(v.html);
                TaskersLoaded();
            }
        });
    }

    function TaskersLoaded() {
        logit("Taskers Loaded");
        $('#tblTaskers').dataTable({
            "scrollY": "300px",
            "scrollCollapse": true,
            "paging": false,
            "searching": false
        });
        $(".powerTip").powerTip({
            placement: "n"
        });
        // Now sort the table by triggering the click for the date column.

    }

    return {
        Init: Init
    }
}

SP.SOD.notifyScriptLoadedAndExecuteWaitingJobs('CEWP_Dashboard_CatsTaskers.js');