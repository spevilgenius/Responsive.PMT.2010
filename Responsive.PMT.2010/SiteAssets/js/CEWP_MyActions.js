var userID, ctx, list, types, ct, ctid, item, items, xml, caml, requestHeaders, requestUri, tabs, grouplist, typelist, group, groups, type, types, dhtml = "";
var SLASH = "/";
var action, actions, standards, directives, type;

function Init(site) {
    $().SPSTools_Notify({ type: 'wait', content: 'Loading Your Actions...Please wait...' });
    loadCSS(site + '/SiteAssets/css/fullcalendar.min.css');
    loadCSS(site + '/SiteAssets/css/myactions.css');
    loadscript(site + '/SiteAssets/js/fullcalendar.min.js', function () {
        LoadMyActions();
    });
}

function LoadMyActions() {
    logit("My Actions Code loaded.");
    standards = [];
    directives = [];
    var startdate = new Date();
    var starttext = (startdate.getMonth() + 1) + "/1/" + startdate.getFullYear();
    startdate = new Date(starttext);
    startdate = moment(startdate).subtract(7, 'days');

    var calstart = moment().startOf('month').subtract(7, 'days').format('YYYY-MM-DD');
    var calend = moment().endOf('month').format('YYYY-MM-DD');

    var userId = _spPageContextInfo.userId;
    logit("userID: " + userId + ", startdate: " + getISODate(startdate) + ", calstart: " + calstart + ", calend: " + calend);

    //var urlString = "https://hq.tradoc.army.mil/sites/OCKO/PMT/_vti_bin/listdata.svc/Actions?";
    var alist = window.prompt("Input list to draw calendar:", "Actions");
    var urlString = "https://hq.tradoc.army.mil/sites/OCKO/PMT/_vti_bin/listdata.svc/";
    urlString += alist;
    urlString += "?";
    urlString += "$select=Id,Title,Expended,PMTUser/Id,ActionComments,Enabler,DateCompleted,EffortTypeValue";
    urlString += "&$expand=PMTUser";
    urlString += "&$filter=((PMTUser/Id eq " + userId + ") and (DateCompleted ge datetime'" + getISODate(startdate) + "'))";
    logit("urlString: " + urlString);

    jQuery.ajax({
        url: urlString,
        method: "GET",
        headers: { 'accept': 'application/json; odata=verbose' },
        error: function (jqXHR, textStatus, errorThrown) {
            //to do implement logging to a central list
            logit("Error Status: " + textStatus + ":: errorThrown: " + errorThrown);
            $("#SPSTools_Notify").fadeOut("2500", function () {
                $("#SPSTools_Notify").html("");
            });
        },
        success: function (data) {
            var results = data.d.results;
            var j = jQuery.parseJSON(JSON.stringify(results));
            var numitems = data.d.results.length;
            logit("# of actions: " + numitems);
            for (var i = 0; i < numitems; i++) {
                var dc = dateformat(j[i]["DateCompleted"], 'isoshort');
                switch(j[i]["EffortTypeValue"]){
                    case "Standard":
                        standards.push({
                            id: j[i]["Id"],
                            title: j[i]["Title"],
                            start: dc,
                            starttext: dc,
                            Hours: j[i]["Expended"],
                            Enabler: j[i]["Enabler"],
                            Type: j[i]["EffortTypeValue"],
                            Comments: j[i]["ActionComments"]
                        });
                        break;

                    case "Directive":
                        directives.push({
                            id: j[i]["Id"],
                            title: j[i]["Title"],
                            start: dc,
                            starttext: dc,
                            Hours: j[i]["Expended"],
                            Enabler: j[i]["Enabler"],
                            Type: j[i]["EffortTypeValue"],
                            Comments: j[i]["ActionComments"]
                        });
                        break;
                } 
            }

            $('#myactions').fullCalendar({
                //fixedWeekCount: false,
                //weekends: false,
                visibleRange: {
                    start: calstart,
                    end: calend
                },
                eventSources: [{ events: directives, color: 'black', textColor: 'yellow' }, { events: standards, color: 'blue', textColor: 'white' }],
                eventClick: function (event) {
                    dhtml = "";
                    dhtml += "<table class='table table-striped table-bordered table-hover'>";
                    logit(event.start);
                    dhtml += "<tr><td>Date</td><td>" + event.starttext + "</td></tr>";
                    dhtml += "<tr><td>Type</td><td>" + event.Type + "</td></tr>";
                    dhtml += "<tr><td>Hours</td><td>" + event.Hours + "</td></tr>";
                    dhtml += "<tr><td>Enabler</td><td>" + event.Enabler + "</td></tr>";
                    dhtml += "<tr><td>Comments</td><td>" + event.Comments + "</td></tr>";
                    dhtml += "<tr><td>Tools</td><td><a href='#' type='button' data-actionid='" + event.id + "' class='btn btn-success btncopy'>Copy Action</a></td></tr>";
                    dhtml += "</table>";
                    $("#PMTModalBody").html('').append(dhtml);
                    $("#PMTModalTitle").html('').append(event.title);
                    tmp2 = $("#PMTModal").modal({
                        "backdrop": true,
                        "keyboard": false,
                        "show": true
                    });
                    $(".btncopy").on("click", function (e) {
                        logit("button clicked");
                        e.preventDefault();
                        alert("You clicked it: " + $(this).attr("data-actionid"));
                    });
                },
                viewRender: function (view) {
                    if (view.name == 'month') {
                        $(".fc-day-number").each(function () {
                            var dd = $(this).parent().attr("data-date");
                            var add = "<a class='btn btn-default btn-xs btnadd' data-date='" + dd + "' href='#'>Add</a>&nbsp;";
                            $(this).prepend(add);
                        });
                        $(".btnadd").on("click", function (e) {
                            e.preventDefault();
                            var zurl = fixurl('/Lists/Actions/NewForm.aspx?Date=' + $(this).attr("data-date") + '&IsDlg=1');
                            CKODialog(zurl, 'Add New Action', '800', '700', 'NotificationCallback');
                        });
                    }
                }
            });

            $(".fc-title").hover(function () {
                $(this).css({ "cursor": "pointer" });
            }, function () {
                $(this).css({ "cursor": "default" });
            });

            $("#SPSTools_Notify").fadeOut("2500", function () {
                $("#SPSTools_Notify").html("");
            });
        }
    });
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

SP.SOD.notifyScriptLoadedAndExecuteWaitingJobs("CEWP_MyActions.js");