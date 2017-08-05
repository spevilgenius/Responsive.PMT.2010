var NDU = NDU || {};
NDU.SAP = NDU.SAP || {};
NDU.GLOBAL = NDU.GLOBAL || {};
NDU.GLOBAL.VARIABLES = NDU.GLOBAL.VARIABLES || {};

var ctx, web, list, user, li, types, type, thisuser, ctid, ctname, dsname, cn, cnid, zuser, uservals, rf, sat, filename, timer, source, rowstohide, ahtml = "";
var isEditForm = false;
var isAAO = false;

NDU.SAP.OVERRIDES = function() {

    function initialize() {
        var test = new String(window.location);
        if (test.indexOf("Upload.aspx") > 0) {
            $("tr[id*='VersionComment']").hide();
            $("a[id*='UploadMultipleLink']").hide();
        }
        if (test.indexOf("WrkTaskIP") > 0) {
            source = $.QueryString["Source"];
            reject = $.QueryString["Reject"];
            $(window).on('unload', function () {
                var returndata = [];
                returndata[0] = "Refresh";
                returndata[1] = source;
                SP.UI.ModalDialog.commonModalDialogClose(SP.UI.DialogResult.OK, returndata);
            });
            if (reject == "1" || reject == 1) {
                $("input[value*='Approve']").hide();
                $("input[value*='Cancel']").hide();
            }
            $("input[value*='Reassign']").hide();
        }
        if (test.indexOf("StaffActions/Forms/EditForm.aspx") > 0) {
            $().SPSTools_Notify({ type: 'wait', content: 'Getting Document Set...Please wait while it loads...' });
            logit("ON EDIT FORM");
            isEditForm = true;
            NDU.CSOM.GetUserInfo.isuseringroup("Admin Actions Officer").done(function (result) {
                if (result == true) {
                    isAAO = true;
                    timer = setInterval(setattachvalues, 500); // Wait half a second before running the code
                }
                else {
                    timer = setInterval(setattachvalues, 500); // Wait half a second before running the code
                }
            });
        }
        if (test.indexOf("NewDocSet") > 0) {
            $().SPSTools_Notify({ type: 'wait', content: 'Getting Document Set...Please wait while it loads...' });
            ctname = jQuery.QueryString["ContentTypeName"];
            ctid = jQuery.QueryString["ContentTypeId"];
            type = jQuery.QueryString["StaffActionType"];
            // Build "NOPII" dialog markup
            //ahtml += '<a class="btn btn-danger btn-lg" id="btnNOPII" style="display:none;" href="#" data-toggle="modal" data-target="#NOPII"></a>';
            //ahtml += '<div id="NOPII" class="modal"><div class="modal-vertical-alignment-helper"><div class="modal-dialog modal-vertical-align-center"><div class="modal-content modal-content-inherit"><div class="panel panel-danger">';
            //ahtml += '<div class="panel-heading"><button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>';
            //ahtml += '<h3 class="panel-title">NOTICE</h3></div>';
            //ahtml += '<div class="panel-body" style="margin: 0 auto;"><div class="nopii"></div></div>';
            //ahtml += '<div class="panel-footer" style="display: flex; justify-content: center;"><a class="btn btn-danger btn-large" data-dismiss="modal">OK</a></div>';
            //ahtml += '</div></div></div></div></div>';

            //$("#s4-workspace").css({ height: '700px' }).append(ahtml); // Add "NOPII" dialog markup to the page and set height of s4-workspace.
            //// Update the CSS for nopii class to setup the image
            //$(".nopii").css({ "background-color": "rgb(252, 229, 198)", "background-position": "center center", "background-repeat": "no-repeat", "background-image": "url('https://portal.ndu.edu/coo/AdminActions/SiteAssets/images/NOPII.png')", "height": "480px" });
            //// Activate the bootstrap modal by "clicking" the button. The modal has the components to close it.
            //$("#btnNOPII").click();

            // Hide components that we do not need. We are replacing the OOB OK and Cancel buttons with bootstrap buttons we control. 
            rowstohide = ['Name', 'History', 'ControlNumber', 'Description', 'Signers', 'Suspense Date', 'ApprovalType', 'StaffActionsType', 'Status', 'Stakeholders']; // 
            HideFormRows(rowstohide);
            $("input[title*='Component']").hide();  // Hide section of component field to add own items
            $("span[title*='Component']").hide();   // Hide section of component field to add own items
            $("textarea").attr("cols", "25").attr("rows", "4"); // Update all textareas to 4 rows. TODO: Does this really do anything? Should it be removed.
            $("input[id*='BtnCancel']").hide(); // Hide the OOB Cancel button because we want to override how the dialog gets closed.
            var html = "<a class='btn btn-default' href='#' id='btnSubmit'>OK</a><a class='btn btn-default' href='#' id='btnCancel'>Cancel</a>";
            $("input[id*='btnOK']").before(html).hide(); // Add the custom OK and Cancel buttons and hide the OOB OK button because we are overriding what the button does and how the dialog gets closed.

            $("#btnSubmit").click(function() {
                // Get and build the next control number.
                $().SPSTools_Notify({ type: 'wait', content: 'Creating Document Set. Please Wait...' });
                //dsname = $("input[title='Name Required Field']").val();
                
                NDU.CSOM.GetListItems.getitemsfiltered("current", "ControlNumber", "Title", "StaffAction").then(function (items) {
                    var enumerator = items.getEnumerator();
                    var cnt = 0; 
                    while (enumerator.moveNext()) {
                        if (cnt == 0) { // just gaming the system as there should only be one item returned but if there is more, it will only use the first one.
                            var cnitem = enumerator.get_current();
                            cnid = cnitem.get_id();

                            ctx = new SP.ClientContext.get_current();
                            NDU.CSOM.GetListItemByID.getitem("ControlNumber", cnid).then(function (item) {
                                var d = new Date();
                                ni = item;
                                nn = parseInt(ni.get_item("NextNumber"));
                                cn = d.getFullYear() + "-" + (d.getMonth() + 1) + "_" + nn;
                                nn += 1;
                                ni.set_item("NextNumber", nn);
                                ni.update();
                                ctx.load(ni);
                                ctx.executeQueryAsync(GetControlNumberSucceeded, GetControlNumberFailed);
                            },
                                function (sender, args) { logit("Get Control Number Failed 1: " + args.get_message()); }
                            );
                            cnt += 1;
                        }
                    }
                }, function (sender, args) {
                    logit("No items in this tab? MSG: " + args.get_message());
                });
            });

            $("#btnCancel").click(function() { // Cancel and Close the popup
                SP.UI.ModalDialog.commonModalDialogClose(SP.UI.DialogResult.cancel);
            });

            ExecuteOrDelayUntilScriptLoaded(GetUserData, "SP.js");
        }
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////
    /// <summary> Code that runs when on the Editform.aspx page </summary>
    ///
    /// <remarks>   Daniel R Walker Ctr, 3/16/2017. </remarks>
    ///
    /// <returns>   . </returns>
    ////////////////////////////////////////////////////////////////////////////////////////////////////

    function setattachvalues() {
        if ($("input[title='Name Required Field']").length > 0) {
            clearInterval(timer);
            source = $.QueryString["Source"];
            $(window).on('unload', function () {
                var returndata = [];
                returndata[0] = "Refresh";
                returndata[1] = source;
                SP.UI.ModalDialog.commonModalDialogClose(SP.UI.DialogResult.OK, returndata);
            });
            var newdoc = $.QueryString["NewDocument"];
            logit("New Document: " + newdoc);
            if (newdoc == "1" || newdoc == 1) { // This will be true when uploading a document from the docsethomepage using the "Upload Document" button
                rowstohide = ['Component', 'Business Phone', 'Date', 'History', 'ControlNumber', 'Status', 'From', 'Date', 'Stakeholders', 'Description', 'Discussion', 'Purpose', 'Recommendation', 'Signers', 'StaffActionsType', 'ApprovalType', 'SuspenseDate'];
                HideFormRows(rowstohide);
                $("select[title*='Content Type'] option").each(function () {
                    tp1 = new String($(this).html());
                    if (tp1.indexOf("Document") >= 0) {
                        $(this).prop('selected', true);
                    }
                });
                resizeModalDialog();
                rf = String($.QueryString["RootFolder"]);
                rf = rf.substr(rf.lastIndexOf("/") + 1);
                logit("Root Folder: " + rf);
                filename = $("input[title='Name Required Field']").val();
                filename = rf + " - " + filename;
                $("input[title='Name Required Field']").val(filename);
                $("input[id*='SaveItem']").click();
            }
            else {
                if (isAAO == true) {
                    rowstohide = ['Title', 'Name', 'Component', 'Business Phone', 'History', 'Date', 'Discussion', 'ControlNumber', 'Status', 'From', 'Description', 'Signers', 'StaffActionsType', 'Content Type'];
                    if (isEditForm == false) {
                        
                    }
                }
                else {
                    rowstohide = ['Title', 'Name', 'Component', 'Business Phone', 'History', 'ControlNumber', 'Status', 'From', 'Description', 'ApprovalType', 'Suspense Date', 'Signers', 'StaffActionsType', 'Content Type', 'Stakeholders']; //
                }
                HideFormRows(rowstohide);            
                resizeModalDialog();
                $("#SPSTools_Notify").fadeOut("2500", function () {
                    $("#SPSTools_Notify").html("");
                });
            }
        }
    }

    function GetUserData() {
        // Get the current user using the javascript object model (jsom)
        ctx = new SP.ClientContext.get_current();
        web = ctx.get_web();
        user = web.get_currentUser();
        ctx.load(user);
        ctx.executeQueryAsync(GetUserDataSucceeded, GetUserDataFailed);
    }

    function GetUserDataSucceeded(sender, args) {
        // Use the current user data to fill out required fields
        zuser = user.get_loginName();
        logit("GetUserDataSucceeded");
        uservals = $().SPServices.SPGetCurrentUser({
            fieldNames: ["ID", "Name", "EMail", "WorkPhone", "Department"],
            debug: true
        });

        $("input[title*='Business']").val(uservals.WorkPhone);

        $("select[title*='Component'] option").each(function() {
            tp1 = new String($(this).html());
            if (tp1.indexOf(uservals.Department) >= 0) {
                $(this).prop('selected', true);
            }
        });

        $("input[title*='StaffActionsType']").val(type);

        $().SPServices.SPFindPeoplePicker({
            peoplePickerDisplayName: "From",
            valueToSet: zuser,
            checkNames: true
        });

        // Set default Stakeholders group to Stakeholders field unless it's the Edit Form
        if (isEditForm == false) {
            // Get default stakeholders from StaffActionTypes list based on the type
            
            var inc = "Include(";
            var xml = "<View><Method Name='Read List' /><Query><Where><Eq><FieldRef Name='Title' /><Value Type='Text'>" + type + "</Value></Eq></Where></Query>";
            var fields = ["Title", "DefaultStakeholders"];
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
            xml += "<FieldRef Name='ID'/>";
            xml += "</ViewFields>";
            xml += "</View>";
            $.when(NDU.CSOM.GetListItems.getitemsfilteredcomplex("current", "StaffActionTypes", xml, inc)).then(function (items) {
                var enumerator = items.getEnumerator(); // Only expect one but its still a collection so must do it this way
                while (enumerator.moveNext()) {
                    var item = enumerator.get_current();
                    var users = item.get_item("DefaultStakeholders");
                    var userstring = ""
                    if (users != undefined || users != null) {
                        for (var z = 0; z < users.length; z++) {
                            if (z == 0) {
                                var u = users[z];
                                tp1 = "stop";
                                userstring = users[z].get_lookupValue();
                            }
                            else {
                                var u = users[z];
                                tp1 = "stop";
                                userstring += "; " + users[z].get_lookupValue();
                            }
                        }

                        $().SPServices.SPFindPeoplePicker({
                            peoplePickerDisplayName: "Stakeholders",
                            valueToSet: userstring, // "Admin Actions Stakeholders Approval Group",
                            checkNames: true
                        });
                    }
                }
            }, function (sender, args) {
                logit("Error getting stakeholders: " + args.get_message());
            });
        }
        $("#SPSTools_Notify").fadeOut("2500", function () {
            $("#SPSTools_Notify").html("");
        });
    }

    function GetUserDataFailed(sender, args) {
        logit("GetUserDataFailed: " + args.get_message());
        $("#SPSTools_Notify").fadeOut("2500", function () {
            $("#SPSTools_Notify").html("");
        });
        // TODO: Implement logging to a central list. Need to let the user know?
    }

    function GetControlNumberSucceeded() {
        // Use the newly created Control Number to fill out the Control Number field and then "click" the hidden real OK button
        $("#SPSTools_Notify").fadeOut("1500", function () {
            $("#SPSTools_Notify").html("");
        });
        $(window).on('unload', function () {
            var returndata = [];
            returndata[0] = "CopyFiles";
            returndata[1] = "DocSet";
            returndata[2] = type;
            returndata[3] = dsname;
            returndata[4] = cn;
            SP.UI.ModalDialog.commonModalDialogClose(SP.UI.DialogResult.OK, returndata);
        });
        $("input[title*='ControlNumber']").val(cn);
        $("input[title='Name Required Field']").val(cn);
        dsname = cn;
        $("input[id*='btnOK']").click();
    }

    function GetControlNumberFailed(sender, args) {
        logit("Get Control Number Failed 2: " + args.get_message());
        // TODO: Implement logging to a central list. Need to let the user know?
    }

    function updateSource(val) {
        if (history.pushState) {
            var newurl = window.location.protocol + "//" + window.location.host + window.location.pathname + '?Source=' + encodeURI(val);
            window.history.pushState({ path: newurl }, '', newurl);
        }
    }

    function updateQueryString(val) {
        if (history.pushState) {
            var newurl = window.location.protocol + "//" + window.location.host + window.location.pathname + "?" + window.location.search + encodeURI(val);
            logit("NEWURL: " + newurl);
            window.history.pushState({ path: newurl }, '', newurl);
        }
    }

    return {
        initialize: initialize
    }
}

SP.SOD.notifyScriptLoadedAndExecuteWaitingJobs("ndu.sap.overrides.js");