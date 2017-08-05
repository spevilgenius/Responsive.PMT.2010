var NDU = NDU || {};
NDU.CSOM = NDU.CSOM || {};
var id, tid, ds, dsn, title, cn, ct, ItemURL, status, hst, waitmsg, authorid, logon, LoginName, emailsubject, loc, userID;
var csa = true;
var isAAO = false;
var isSubmitter = false;

function Start(site) {
    $().SPSTools_Notify({ type: 'wait', content: 'Getting Document Set...Please wait while it loads...' });
    userID = _spPageContextInfo.userId;
    loc = String(window.location);
    loadCSS(site + "/SiteAssets/css/docsethomepage.css");
    id = $.QueryString["ID"];
    logit("ID From Querystring: " + id);
    NDU.CSOM.GetUserInfo.isuseringroup("Admin Actions Officer").done(function (result) {
        if (result == true) {
            isAAO = true;
            logit("You are an AAO!");
            GetTemplate(site);
        }
        else {
            GetTemplate(site);
        }
    });
}

function GetTemplate(site) {
    var flds = ['Component', 'Business', 'History', 'ControlNumber', 'RouteStep', 'Status', 'From', 'Date', 'Approvers', 'Description', 'Discussion', 'Purpose', 'Recommendation', 'Author'];
    NDU.CSOM.GetListItemByID.getitemwithcustomfields("StaffActions", id, flds).then(
        function (item, ctype) {
            ds = item;
            authorid = ds.get_item("Author").get_lookupId();
            ct = ctype.get_name();
            logit("ContentType: " + ct);
            IsSubmitter(authorid, ct, site);
        },
        function (sender, args) {
            logit("Get Documentset Failed: " + args.get_message());
        }
    );
}

function IsSubmitter(authid, ct, site) {
    if (authid == userID) {
        isSubmitter = true;
        logit("You are the submitter!");
    }
    LoadTemplate(ct, site);
}

function LoadTemplate(template, site) {
    title = template.toLowerCase();
    cn = ds.get_item("ControlNumber");
    status = ds.get_item("Status");
    ItemURL = ds.get_item("FileRef");
    dsn = ItemURL.substr(ItemURL.lastIndexOf("/") + 1);
    emailsubject = "Your SAP - " + dsn;
    logit("ItemURL: " + ItemURL);
    var stop = "stop";
    jQuery("#docsethomepage").load(site + "/SiteAssets/html/" + title + ".html", function() {
        RenderTemplate(title, site);
    });
}

function RenderTemplate(title, site) {
    loadCSS(site + "/SiteAssets/css/" + title + ".css");
    
    $(".field").each(function() {
        var type = $(this).attr("data-type");
        switch (type) {
            case "text":
                logit("Name: " + $(this).attr("data-field") + ", Value: " + ds.get_item($(this).attr("data-field")));
                $(this).val(ds.get_item($(this).attr("data-field")));
                break;

            case "date":
                if (ds.get_item($(this).attr("data-field")) != null) {
                    $(this).val(dateformat(ds.get_item($(this).attr("data-field")), "short"));
                }
                else {
                    if ($(this).attr("data-field") == "SuspenseDate") {
                        csa = false;
                    }
                }
                break;

            case "user": // Single user so get lookupValue
                var user = ds.get_item($(this).attr("data-field"));
                $(this).val(user.get_lookupValue()); // may fail
                break;

            case "Approvers": // Potential for multiple users and groups so go through each
                var list = "";
                var tmp1 = ds.get_item("Approvers");
                if (tmp1 != null) {
                    for (var i = 0; i < tmp1.length; i++) {
                        tmp2 = tmp1[i].get_lookupId();
                        tmp3 = tmp1[i].get_lookupValue();
                        if (i == 0) {
                            list = tmp3;
                        }
                        else {
                            list += "; " + tmp3;
                        }
                    }
                }
                else {
                    csa = false;
                }
                $(this).val(list);
                break;

            case "file": // Get the name from the ItemURL
                $(this).val(ItemURL.substr(ItemURL.lastIndexOf("/") + 1));
                break;
        }
    });

    if (isAAO == true) {    // Hide or show buttons based on status of SAP and permissions
        switch (status) {
            case "Draft":
                $("#btnReject").hide();
                if (!isSubmitter) { $("#btnSubmit").hide(); }
                $("#btnUpdate").hide();
                if (!isSubmitter) { $("#btnUpload").hide(); }
                break;

            case "AAO Initial Review":
                if (csa == false) {
                    $("#btnSubmit").text("Start Approval Workflow").css({ "width": "250px" });
                    $("#btnSubmit").addClass('btndisabled');
                    $("#btnSubmit").attr("title", "Need to update Suspense Date and Approvers before submitting.");
                }
                else {
                    $("#btnSubmit").text("Start Approval Workflow").css({ "width": "250px" });
                    $("#btnSubmit").attr("title", "Open and Approve Task To Start Workflow");
                }
                break;

            case "Approval Workflow":
                // This would not be normal but can happen in testing if a user is in the AAO group and is a stakeholder
                $("#btnReject").hide();
                $("#btnUpdate").hide();
                $("#btnSubmit").text("Approve SAP").css({ "width": "250px" });
                $("#btnSubmit").attr("title", "Open and Approve Task To Approve SAP");
                break;

            case "AAO Final Review":
                $("#btnReject").hide();
                $("#btnUpdate").hide();
                $("#btnSubmit").text("Start Final Approval").css({ "width": "250px" });
                $("#btnSubmit").attr("title", "Open and Approve Task To Approve SAP");
                break;

            case "Approved":
                $("#btnReject").hide();
                $("#btnUpdate").hide();
                $("#btnSubmit").text("Closeout").css({ "width": "200px" });
                $("#btnSubmit").attr("title", "Close Document Set and Notify Submitter");
                break;

            default: //Approved or Rejected
                $("#btnUpdate").hide();
                $("#btnUpload").hide();
                $("#btnSubmit").hide();
                $("#btnReject").hide();
                break;
        }
        $("#btnEmail").hide();
    }
    else {
        switch (status) {
            case "Draft":
                $("#btnReject").hide();
                $("#btnEmail").hide();
                break;

            case "AAO Initial Review":
                $("#btnSubmit").hide();
                $("#btnEmail").hide();
                break;

            case "Stakeholder Approval":
                $("#btnSubmit").text("Approve As Stakeholder").css({ "width": "250px" });
                $("#btnSubmit").attr("title", "Open and Approve Task To Approve SAP as Stakeholder");
                break;

            default:
                $("#btnSubmit").hide();
                $("#btnEmail").hide();
                $("#btnUpload").hide();
                $("#btnReject").hide();
                break;
        }
        $("#btnUpdate").hide();
        $("#divStakeholders").hide();
    }

    $("#btnSubmit").click(function () {
        switch (status) {
            case "Draft":
                var type = "StaffAction";
                logit("Type: " + type);
                var workflowParams = "<Data><Approvers></Approvers><NotificationMessage></NotificationMessage><DurationforSerialTasks></DurationforSerialTasks><DurationUnits></DurationUnits>";
                workflowParams += "<CC></CC><CancelonRejection></CancelonRejection><CancelonChange></CancelonChange><EnableContentApproval></EnableContentApproval></Data>";
                $().SPSTools_Notify({ type: 'wait', content: 'Starting Workflow. This may take some time...' });
                $().SPServices({
                    operation: "GetTemplatesForItem",
                    item: "https://" + window.location.host + ItemURL,
                    async: true,
                    completefunc: function (xData, Status) {
                        var currentItemURL = this.item;
                        $(xData.responseXML).find("WorkflowTemplates > WorkflowTemplate").each(function (i, e) {
                            logit("Name: " + $(this).attr("Name"));
                            if ($(this).attr("Name") == type) {
                                var guid = $(this).find("WorkflowTemplateIdSet").attr("TemplateId");
                                if (guid != null) {
                                    workflowGUID = "{" + guid + "}";
                                    logit("workflowGUID - " + workflowGUID);
                                    $().SPServices({
                                        operation: "StartWorkflow",
                                        item: currentItemURL,
                                        templateId: workflowGUID,
                                        workflowParameters: workflowParams,
                                        async: true,
                                        completefunc: function () {
                                            $("#SPSTools_Notify").fadeOut("2500", function () {
                                                $("#SPSTools_Notify").html("");
                                            });
                                            window.location.reload();
                                        }
                                    });
                                }
                            }
                        });
                    }
                });
                break;

            case "AAO Initial Review": // This will popup the workflow task for the AAO to comment and/or Approve
                if (csa == true) {
                    hst = String($("#taHistory").val());
                    hst = hst.split(";");
                    tid = hst[0].split(":")[1];
                    var SOURCE = "https%3A%2F%2Fportal%2Endu%2Eedu%2Fcoo%2FAdminActions%2FStaffActions%2FForms%2FStaffAction%2Fdocsethomepage%2Easpx";
                    var SEARCH = encodeURIComponent(window.location.search);
                    SOURCE = SOURCE + SEARCH;
                    var zurl = 'https://portal.ndu.edu/coo/AdminActions/_layouts/WrkTaskIP.aspx?List=08c780ce%2D6bbe%2D4dfa%2Daefe%2D040aede4f408&ID=' + tid + '&Source=' + SOURCE + '&IsDlg=1';
                    NDUDialog(zurl, 'Approve and Start Stakeholder Approval', '800', '500', 'NotificationCallback');
                }
                else {
                    $().SPSTools_Notify({ type: 'okalert', content: 'Need to update Suspense Date and Stakeholders before submitting.' });
                }
                break;

            case "Stakeholder Approval":
                var inc = "Include(";
                var xml = '<View><Method Name="ReadList"/><Query><Where><And><And><Or><And><Eq><FieldRef Name="AssignedTo"/><Value Type="Integer"><UserID/></Value></Eq>';
                xml += '<IsNull><FieldRef Name="WorkflowOutcome"/></IsNull></And><And><Membership Type="CurrentUserGroups"><FieldRef Name="AssignedTo"/></Membership>';
                xml += '<IsNull><FieldRef Name="WorkflowOutcome"/></IsNull></And></Or><Eq><FieldRef Name="ControlNumber"/><Value Type="Text">';
                xml += cn;
                xml += '</Value></Eq></And><Eq><FieldRef Name="StaffActionTaskType"/><Value Type="Text">Stakeholder Approval</Value></Eq></And></Where></Query>';
                var fields = ["StaffActionTaskType", "Status", "ControlNumber", "AssignedTo", "Id"];
                xml += "<ViewFields>";
                for (var z = 0; z <= fields.length - 1; z++) {
                    xml += "<FieldRef Name='" + fields[z] + "'/>";
                    if (z == fields.length - 1) {
                        inc += fields[z] + ")";
                    }
                    else {
                        inc += fields[z] + ", ";
                    }
                }
                xml += "</ViewFields>";
                xml += "</View>";
                jQuery.when(NDU.CSOM.GetListItems.getitemsfilteredcomplex("current", "Tasks", xml, inc)).then(function (items) {
                    var enumerator = items.getEnumerator();
                    var cnt = items.get_count(); // This returns the number of items from the query. There should only be 0 or 1
                    logit("Getting Tasks Count: " + cnt);
                    if (cnt >= 1) {
                        while (enumerator.moveNext()) {
                            var task = enumerator.get_current();
                            logit("TASK FOUND");
                            tid = task.get_id();
                            var SOURCE = "https%3A%2F%2Fportal%2Endu%2Eedu%2Fcoo%2FAdminActions%2FStaffActions%2FForms%2FStaffAction%2Fdocsethomepage%2Easpx";
                            var SEARCH = encodeURIComponent(window.location.search);
                            SOURCE = SOURCE + SEARCH;
                            var zurl = 'https://portal.ndu.edu/coo/AdminActions/_layouts/WrkTaskIP.aspx?List=08c780ce%2D6bbe%2D4dfa%2Daefe%2D040aede4f408&ID=' + tid + '&Source=' + SOURCE + '&IsDlg=1';
                            logit("ZURL:" + zurl);
                            NDUDialog(zurl, 'Approve As Stakeholder', '800', '500', 'NotificationCallback');
                        }
                    }
                }, function (sender, args) {
                    logit("ERROR Getting Task: " + args.get_message());
                }
                );
                break;

            case "AAO Final Review":
                var inc = "Include(";
                var xml = '<View><Method Name="ReadList"/><Query><Where><And><And><Or><And><Eq><FieldRef Name="AssignedTo"/><Value Type="Integer"><UserID/></Value></Eq>';
                xml += '<IsNull><FieldRef Name="WorkflowOutcome"/></IsNull></And><And><Membership Type="CurrentUserGroups"><FieldRef Name="AssignedTo"/></Membership>';
                xml += '<IsNull><FieldRef Name="WorkflowOutcome"/></IsNull></And></Or><Eq><FieldRef Name="ControlNumber"/><Value Type="Text">';
                xml += cn;
                xml += '</Value></Eq></And><Eq><FieldRef Name="StaffActionTaskType"/><Value Type="Text">AAO Final Review</Value></Eq></And></Where></Query>';
                var fields = ["StaffActionTaskType", "Status", "ControlNumber", "AssignedTo", "Id"];
                xml += "<ViewFields>";
                for (var z = 0; z <= fields.length - 1; z++) {
                    xml += "<FieldRef Name='" + fields[z] + "'/>";
                    if (z == fields.length - 1) {
                        inc += fields[z] + ")";
                    }
                    else {
                        inc += fields[z] + ", ";
                    }
                }
                xml += "</ViewFields>";
                xml += "</View>";
                jQuery.when(NDU.CSOM.GetListItems.getitemsfilteredcomplex("current", "Tasks", xml, inc)).then(function (items) {
                    var enumerator = items.getEnumerator();
                    var cnt = items.get_count(); // This returns the number of items from the query. There should only be 0 or 1
                    logit("Getting Tasks Count: " + cnt);
                    if (cnt >= 1) {
                        while (enumerator.moveNext()) {
                            var task = enumerator.get_current();
                            logit("TASK FOUND");
                            tid = task.get_id();
                            var SOURCE = "https%3A%2F%2Fportal%2Endu%2Eedu%2Fcoo%2FAdminActions%2FStaffActions%2FForms%2FStaffAction%2Fdocsethomepage%2Easpx";
                            var SEARCH = encodeURIComponent(window.location.search);
                            SOURCE = SOURCE + SEARCH;
                            var zurl = 'https://portal.ndu.edu/coo/AdminActions/_layouts/WrkTaskIP.aspx?List=08c780ce%2D6bbe%2D4dfa%2Daefe%2D040aede4f408&ID=' + tid + '&Source=' + SOURCE + '&IsDlg=1';
                            logit("ZURL:" + zurl);
                            NDUDialog(zurl, 'Approve SAP', '800', '500', 'NotificationCallback');
                        }
                    }
                }, function (sender, args) {
                    logit("ERROR Getting Task: " + args.get_message());
                }
                );
                break;

        }
    });

    $("#btnUpload").click(function (event) {
        event.preventDefault();
        var ROOTFOLDER = String($.QueryString["RootFolder"]);
        ROOTFOLDER = ROOTFOLDER.substr(ROOTFOLDER.lastIndexOf("/") + 1);
        var BASE = '%7B03E8E4FA%2D2390%2D46F6%2DA016%2DEC59A2E32924%7D&RootFolder=%2Fcoo%2FAdminActions%2FStaffActions%2F' + encodeURIComponent(ROOTFOLDER);
        var SOURCE = "https%3A%2F%2Fportal%2Endu%2Eedu%2Fcoo%2FAdminActions%2FStaffActions%2FForms%2FStaffAction%2Fdocsethomepage%2Easpx";
        var SEARCH = encodeURIComponent(window.location.search);
        SOURCE = SOURCE + SEARCH;
        var zurl = fixurl('/_layouts/Upload.aspx?NewDocument=1&List=' + BASE + '&Source=' + SOURCE);
        logit("zurl: " + zurl);
        NDUDialog(zurl, 'Upload Document', '800', '500', 'NotificationCallback');
    });

    $("#btnUpdate").click(function (event) {
        event.preventDefault();
        var SOURCE = "https%3A%2F%2Fportal%2Endu%2Eedu%2Fcoo%2FAdminActions%2FStaffActions%2FForms%2FStaffAction%2Fdocsethomepage%2Easpx";
        var SEARCH = encodeURIComponent(window.location.search);
        SOURCE = SOURCE + SEARCH;
        var zurl = fixurl('/StaffActions/Forms/EditForm.aspx?ID=' + id + '&Source=' + SOURCE + '&IsDlg=1');
        logit("zurl: " + zurl);
        NDUDialog(zurl, 'Update SAP', '800', '700', 'NotificationCallback');
    });

    $("#btnReject").click(function (event) {    // This will popup the workflow task for the AAO to Reject. All other buttons will be hidden on the popup
        hst = String($("#taHistory").val());
        hst = hst.split(";");
        id = hst[0].split(":")[1];
        var SOURCE = "https%3A%2F%2Fportal%2Endu%2Eedu%2Fcoo%2FAdminActions%2FStaffActions%2FForms%2FStaffAction%2Fdocsethomepage%2Easpx";
        var SEARCH = encodeURIComponent(window.location.search);
        SOURCE = SOURCE + SEARCH;
        var zurl = 'https://portal.ndu.edu/coo/AdminActions/_layouts/WrkTaskIP.aspx?List=08c780ce%2D6bbe%2D4dfa%2Daefe%2D040aede4f408&ID=' + id + '&Source=' + SOURCE + '&IsDlg=1&Reject=1';
        logit("ZURL:" + zurl);
        NDUDialog(zurl, 'Reject To Submitter', '800', '500', 'NotificationCallback');
    });

    logit("Template " + title + " has been rendered.");
    $("#SPSTools_Notify").fadeOut("2500", function () {
        $("#SPSTools_Notify").html("");
    });
    $('[data-toggle="tooltip"]').tooltip();
    GetAuthorInfo(authorid);
}

function GetAuthorInfo(authid) {
    logit("GetAuthorInfo: " + authid);

    $.when(NDU.CSOM.GetUserInfo.getUserInfoById("current", authid, 0, "2010")).then(function (ui, i, version) {
        switch (version) {
            case "2010":    // ui = items in this case from the userinformation list. Should just be one but it will still be a collection
                var item = ui.itemAt(0);
                Email = item.get_item("EMail");
                LoginName = item.get_item("Name");
                logit("NDU.CSOM.GetUserInfo.getUserInfoById: LoginName: " + LoginName)
                $("#btnEmail").attr("href", "mailto:" + Email + "?subject=" + emailsubject + "&body=" +  encodeURIComponent(loc));
                break;

            default:
                LoginName = ui.get_loginName();
                logit("NDU.CSOM.GetUserInfo.getUserInfoById: LoginName: " + LoginName)
                $("#btnEmail").attr("href", "mailto:" + Email + "?subject=" + emailsubject + "&body=" + encodeURIComponent(loc));
                break;
        }
        
    }, function () {
        logit("Error getting Author Info.");
    });
}

SP.SOD.notifyScriptLoadedAndExecuteWaitingJobs("CEWP_DocSetHomePage.js");