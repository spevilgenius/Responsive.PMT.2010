var userID, ctx, list, ct, ctid, item, items, xml, caml, requestHeaders, requestUri, grouplist, typelist, group, groups, type, types, total, dhtml = "";
var SLASH = "/";
ct = "StaffAction";
ctid = "0x0120D5200013B8FD71893B2B40AF2F065AF090125200775ABC2AD0C5FA49957D1982D983EEA7";

function UpdateHomePage(site) {
    $().SPSTools_Notify({ type: 'wait', content: 'Getting Data...Please wait while it loads...' });
    loadCSS(site + '/SiteAssets/css/homepage.css');
    userID = _spPageContextInfo.userId;
    requestUri = "https://portal.ndu.edu/coo/AdminActions/_vti_bin/ListData.svc/StaffActions?$filter=((CreatedById eq " + userID + ") and startswith(ContentTypeID, '0x0120')) and ApprovalStatus eq 'Pending'";
    requestHeaders = { "accept": "application/json;odata=verbose" };

    $.ajax({
        url: requestUri,
        contentType: "application/json;odata=verbose",
        headers: requestHeaders,
        success: function(data) {
            if (data.d.results.length > 0) {
                $('#noOfRequests').css('display', 'inline');
                $('#noOfRequests').text(data.d.results.length);
            }
        },
        error: OnFailure("Could not get user SAP count.")
    });

    requestUri = "https://portal.ndu.edu/coo/AdminActions/_vti_bin/ListData.svc/StaffActions?$filter=ApprovalStatus eq 'Pending'";

    $.ajax({
        url: requestUri,
        contentType: "application/json;odata=verbose",
        headers: requestHeaders,
        success: function (data) {
            if (data.d.results.length > 0) {
                $('#noOfSAPs').css('display', 'inline');
                $('#noOfSAPs').text(data.d.results.length);
            }
        },
        error: OnFailure("Could not get SAP count.")
    });

    // A different way to get the total active items
    //requestUri = "https://portal.ndu.edu/coo/AdminActions/_vti_bin/ListData.svc/StaffActions?$filter=startswith(ContentTypeID, '0x0120')";

    //$.ajax({
    //    url: requestUri,
    //    contentType: "application/json;odata=verbose",
    //    headers: requestHeaders,
    //    success: function (data) {
    //        if (data.d.results.length > 0) {
    //            total = data.d.results.length;
    //            requestUri = "https://portal.ndu.edu/coo/AdminActions/_vti_bin/ListData.svc/StaffActions?$filter=((StatusValue eq 'Approved') or (StatusValue eq 'Rejected')) and startswith(ContentTypeID, '0x0120')";
    //            $.ajax({
    //                url: requestUri,
    //                contentType: "application/json;odata=verbose",
    //                headers: requestHeaders,
    //                success: function (data) {
    //                    if (data.d.results.length > 0) {
    //                        total = total - data.d.results.length;                        
    //                        $('#noOfSAPs').css('display', 'inline');
    //                        $('#noOfSAPs').text(total);
    //                    }
    //                },
    //                error: OnFailure("Could not get SAP count.")
    //            });
    //        }
    //    },
    //    error: OnFailure("Could not get SAP count.")
    //});

    jQuery("#btnSubmit").prop('disabled', true);
    jQuery("#btnSubmit").addClass('btndisabled');

    jQuery('#btnMyDashboard').click(function(event) {
        event.preventDefault();
        window.location = site + '/Pages/MyDashboard.aspx';
    });

    jQuery('#btnDashboard').click(function(event) {
        event.preventDefault();
        window.location = site + '/Pages/Dashboard.aspx';
    });

    $.when(NDU.CSOM.GetListItems.getitems("current", "StaffActionTypeGroups").then(function (items) {
        if (items.get_count() > 0) {
            groups = items.getEnumerator();
            var groupid = "";
            var groupcnt = 0;
            while (groups.moveNext()) {
                groupcnt += 1;
                group = groups.get_current();
                var grouptitle = group.get_item("Title");
                dhtml += "<li class='dropdown-submenu'><a class='saplinkgroup' tabindex='-1' href='#'>";
                dhtml += grouptitle;
                groupid = "group_" + groupcnt;
                dhtml += " <span class='glyphicon glyphicon-chevron-right'></span></a><ul class='dropdown-menu hideme' id='" + groupid + "'>";
                $.when(NDU.CSOM.GetListItems.getitemsfilteredandpasstoelement("current", "StaffActionTypes", "Group", grouptitle, groupid).then(function (items, element) {
                    if (items.get_count() > 0) {
                        types = items.getEnumerator();
                        while (types.moveNext()) {
                            type = types.get_current();
                            var typetitle = type.get_item("Title");
                            var lihtml = "<li class='saplink' onclick='javascript: clickme(this);'><a tabindex='-1' href='#'>";
                            lihtml += typetitle;
                            lihtml += "</a></li>";
                            $("#" + element).append(lihtml);
                        }
                    }
                }, function (sender, args) {
                    logit("Error getting Staff Action Type: " + args.get_message());
                }));
                dhtml += "</ul></li>"
            }
            $("#ulSAPs").html(dhtml);

            jQuery("#btnSubmit").prop('disabled', false);
            jQuery("#btnSubmit").removeClass('btndisabled');

            $('.dropdown-submenu a.saplinkgroup').on("click", function (e) {
                $(".hideme").hide();
                $(this).next('ul').toggle();
                e.stopPropagation();
                e.preventDefault();
            });

            $("#SPSTools_Notify").fadeOut("2500", function () {
                $("#SPSTools_Notify").html("");
            });
        }
    }, function (sender, args) {
        logit("Error getting Staff Action Type Groups: " + args.get_message());
    }));
}

function OnFailure(msg) { 
    logit(msg);
}

function clickme(obj) {
    var zurl = fixurl('/_layouts/NewDocSet.aspx?List=03e8e4fa%2D2390%2D46f6%2Da016%2Dec59a2e32924&RootFolder=%2Fcoo%2FAdminActions%2FStaffActions&ContentTypeId=' + ctid + '&ContentTypeName=' + ct + '&StaffActionType=' + $(obj).find("a").text());
    NDUDialog(zurl, 'New ' + $(obj).find("a").text(), '750', '710', 'NotificationCallback');
}

SP.SOD.notifyScriptLoadedAndExecuteWaitingJobs('CEWP_HomePage.js');