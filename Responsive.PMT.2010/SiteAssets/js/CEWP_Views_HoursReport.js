var CKO = CKO || {};
CKO.VIEWS = CKO.VIEWS || {};
CKO.VIEWS.VARIABLES = CKO.VIEWS.VARIABLES || {};

CKO.VIEWS.VARIABLES = {
    site: null,
    loc: String(window.location),
    waitmsg: null,
    title: null,
    type: "Month", // default
    actions: [],
    events: [],
    defarr: [],
    users: [],
    calstart: null,
    calend: null,
    props: null,
    html: ""
}

CKO.VIEWS.HoursReport = function () {

    var v = CKO.VIEWS.VARIABLES;

    function Init(site) {
        v.site = site;
        //$().SPSTools_Notify({ type: 'wait', content: 'Loading Your Report...Please wait...' });
        loadCSS(site + '/SiteAssets/css/fullcalendar.min.css');
        loadscript(site + '/SiteAssets/js/fullcalendar.min.js', function () {
            SetupUI();
        });
    }

    function SetupUI() {
        //$(".ms-gb").each(function (z) {
        //    v.html = "<td><input type='button' class='btn btn-success btnGetReport' value='Get Report' data-rowid='" + z + "'></button></td>";
        //    $(this).attr("colspan", "1").css({ "padding-top": 0 });
        //    $(this).parent().append(v.html);
        //});



        v.calstart = moment().startOf('month').subtract(7, 'days').format('YYYY-MM-DD');
        v.calend = moment().endOf('month').format('YYYY-MM-DD');

        $(".btnGetReport").on("click", function () {
            $(".ms-listviewtable").addClass("table"); // Add bootstrap table class
            var space, tmp1, tmp2, tmp3, org;
            tmp1 = String($(this).parent().parent().find(".ms-gb").text());
            tmp1 = tmp1.replace(/\s/g, '');
            tmp1 = tmp1.replace(/(\r\n|\n|\r)/gm, "");
            tmp2 = tmp1.split(":");
            tmp3 = tmp2[1].split('(');
            org = tmp3[0].trim();
            if (org.indexOf("HQ") >= 0) {
                org = "HQ TRADOC";
            }
            
            // Now loop through the KnowledgeMap list for this org and get the users that should have data
            v.users = [];




            var urlString = v.site + "/_vti_bin/listdata.svc/KnowledgeMap?";
            urlString += "$select=Id,Organization,SharePointUser,TDAOnhand";
            urlString += "&$expand=SharePointUser";
            urlString += "&$filter=(Organization eq '" + org + "') and (TDAOnhand eq true)";
            logit("urlString: " + urlString);

            jQuery.ajax({
                url: urlString,
                method: "GET",
                headers: { 'accept': 'application/json; odata=verbose' },
                error: function (jqXHR, textStatus, errorThrown) {
                    //to do implement logging to a central list
                    logit("Error Status: " + textStatus + ":: errorThrown: " + errorThrown);
                },
                success: function (data) {
                    var results = data.d.results;
                    var j = jQuery.parseJSON(JSON.stringify(results));
                    var numitems = data.d.results.length;
                    logit("# of users: " + numitems);
                    for (var i = 0; i < numitems; i++) {
                        var usertext = j[i]["SharePointUser"]["Name"];
                        var id = "ID=" + j[i]["SharePointUser"]["Id"];
                        v.users.push({
                            name: usertext,
                            id: j[i]["SharePointUser"]["Id"],
                            actions: []
                        });
                        $(".ms-vb-user").each(function (z) {
                            var thistext = $(this).text();
                            if (thistext === usertext) {
                                v.html = "<tr class=''><td colspan='8'><div class='minical' id='minical_" + j[i]["SharePointUser"]["Id"] + "'>";
                                v.html += "<table style='height:100%;width:100%;'>";
                                v.html += "<tr><td align='center'><img src='/_layouts/images/gears_an.gif' /></td></tr>";
                                v.html += "<tr><td align='center'><div style='margin-top: 10px; font-size: 16px;'>Getting Data...Please wait.</div></td></tr>";
                                v.html += "</table>";
                                v.html += "</div></td></tr>";
                                $(this).closest("tr").addClass("success");
                                $(v.html).insertAfter($(this).closest("tr"));
                            }
                        });
                    }
                    var def = getUserActions();
                    jQuery.when.apply(null, def).done(function () {
                        DataLoaded();
                    });
                }
            });
        });
    }

    function DataLoaded() {
        logit("DataLoaded");
        drawUserCalendars();
        var stop = "";
    }

    function drawUserCalendars() {
        for (var i = 0; i < v.users.length; i++) {
            var cal = "minical_" + v.users[i]["id"];
            var id = v.users[i]["id"];  // Going to use to create unique identifiers for each users totals
            $('#' + cal).html("").fullCalendar({
                height: "parent",
                events: v.users[i].actions,
                visibleRange: {
                    start: v.calstart,
                    end: v.calend
                },
                viewRender: function (view) {
                    if (view.name === 'month') {
                        $('#' + cal + " .fc-day-number").each(function () {
                            var dd = $(this).parent().attr("data-date");
                            var add;
                            if ($(this).parent().hasClass("fc-sat")) {
                                add = "<div style='float:left;margin-right:50px;'>Total: <span data-date='" + id + "_" + dd + "'></span></div><div style='float:left;margin-right:35px;'>Week: <span data-end='" + id + "_" + dd + "'></span></div>&nbsp;";
                            }
                            else {
                                add = "<div style='float:left;margin-right:100px;'>Total: <span data-date='" + id + "_" + dd + "'></span></div>&nbsp;";
                            }
                            $(this).prepend(add);
                        });
                    }
                },
                eventRender: function (event, element) {
                    var start = event.start._i;
                    var hours = event.Hours;
                    var eow = dateformat(event.EndOfWeek, "isoshort");
                    var dd1, dd2;
                    dd1 = id + "_" + start;
                    dd2 = id + "_" + eow;
                    var current = Number($("span[data-date='" + dd1 + "']").text());
                    var total = current + hours;
                    $("span[data-date='" + dd1 + "']").text(total);
                    var wcurrent = Number($("span[data-end='" + dd2 + "']").text());
                    var wtotal = wcurrent + hours;
                    $("span[data-end='" + dd2 + "']").text(wtotal);
                }
            });
        }
    }

    function getUserActions() {
        for (var i = 0; i < v.users.length; i++) {
            v.defarr.push($.when(CKO.REST.GetActionItems.getitemsbyidandpasstoelement(v.site, v.users[i]["id"], i)).then(function (data, element) {
                var results = data.d.results;
                var j = jQuery.parseJSON(JSON.stringify(results));
                var numitems = j.length;
                logit("# of actions: " + numitems);
                for (var i = 0; i < numitems; i++) {
                    var dc = dateformat(j[i]["DateCompleted"], 'isoshort');
                    var idx = element;
                    v.users[idx]["actions"].push({
                        id: j[i]["Id"],
                        title: j[i]["Title"],
                        start: dc,
                        starttext: dc,
                        Hours: j[i]["Expended"],
                        Type: j[i]["EffortTypeValue"],
                        EndOfWeek: j[i]["EndOfWeek"],
                        backgroundColor: "black",
                        textColor: "white"
                    });
                }
            }, function () { logit("Error getting user actions data."); }));
        }
        return v.defarr;
    }

    function getISODate(date) {
        function pad(n) { return n < 10 ? '0' + n : n }
        if (date !== null) {
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

    return {
        Init: Init
    }
}

SP.SOD.notifyScriptLoadedAndExecuteWaitingJobs("CEWP_Views_HoursReport.js");