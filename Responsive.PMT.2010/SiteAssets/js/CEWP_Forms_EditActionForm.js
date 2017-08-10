var CKO = CKO || {};
CKO.AJAX = CKO.AJAX || {};
CKO.FORMS = CKO.FORMS || {};
CKO.FORMS.VARIABLES = CKO.FORMS.VARIABLES || {};

CKO.FORMS.VARIABLES = {
    newform: null,
    site: null,
    loc: String(window.location),
    waitmsg: null,
    title: null,
    ctx: null,
    web: null,
    list: null,
    listitem: null,
    user: null,
    userID: null,
    FirstName: null,        // used to support determination of current user being a moderator or other role
    LastName: null,         // used to support determination of current user being a moderator or other role
    Org: null,
    customer: null,
    alignmentrequired: true,
    actiondate: jQuery.QueryString["Date"]
}

CKO.FORMS.EditForm = function () {

    var v = CKO.FORMS.VARIABLES;

    function Init(site) {
        SP.SOD.executeOrDelayUntilScriptLoaded(function () {
            RegisterSod('core.js', site + "/_layouts/1033/core.js");
            RegisterSod('cko.forms.overrides.js', site + "/SiteAssets/js/cko.forms.overrides.js");
            RegisterSodDep('core.js', 'sp.js');
            RegisterSodDep('cko.forms.overrides.js', 'core.js');
            EnsureScriptFunc("cko.forms.overrides.js", null, function () {
                CKO.FORMS.OVERRIDES().Init();
                FormLoaded(site);
            });
        }, "sp.js");
    }

    function FormLoaded(site) {
        loadCSS(site + '/SiteAssets/css/CEWP_Forms_ActionForms.css');
        qsdate = jQuery.QueryString["Date"];
        v.userID = _spPageContextInfo.userId;
        console.log("userID = " + v.UserID);

        // get user info step 1
        v.ctx = new SP.ClientContext.get_current();
        v.web = v.ctx.get_web();
        v.user = v.web.get_currentUser();
        v.ctx.load(v.user);
        v.ctx.executeQueryAsync(GetUserDataSucceeded, GetUserDataFailed);
    }

    function GetUserDataSucceeded() {
        // Have user info so now fill out the PMTUser field
        //var thisdiv = $("div[data-field='PMTUser']");
        //var thisContents = thisdiv.find("div[name='upLevelDiv']");
        //var thisCheckNames = thisdiv.find("img[Title='Check Names']:first");
        //thisContents.html(v.user.get_loginName());
        //thisCheckNames.click();
        $("input").addClass("form-control");
        $("select").addClass("form-control");
        $("div[role='textbox']").addClass("form-control");
        // go get all dropdown data
        var monkey = LoadDropdowns();
        jQuery.when.apply(null, monkey).done(function () {
            logit("LoadDropdowns complete.");
            //Load Directives From REST to filter archived ones out
            var urlString = "https://hq.tradoc.army.mil/sites/OCKO/PMT/_vti_bin/listdata.svc/Directives?";
            urlString += "$select=Id,Directive,DirectiveStatusValue";
            urlString += "&$filter=(DirectiveStatusValue ne 'Archived')";

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
                    logit("Directives Count: " + numitems);
                    var opts = "<option selected value='Select...'>Select...</option>";
                    for (var i = 0, length = j.length; i < length; i++) {
                        opts += "<option value='" + j[i]["Directive"] + "'>" + j[i]["Directive"] + "</option>";
                    }
                    $("#ddDirective").html("").append(opts);
                    DataLoaded();
                }
            });
        });
    }

    function GetUserDataFailed(sender, args) {
        alert("GetUserDataFailed: " + args.get_message());
    }

    function LoadDropdowns() {
        var deferreds = [];
        deferreds.push($.when(CKO.CSOM.GetLookupData.getvalueswithfields("current", "Standards", "Standard", ["Standard", "SupportParagraph"])).then(function (items) { CKO.CSOM.FillDropdownsMergeFields(items, ["SupportParagraph", "Standard"], "-", "Standard", true, ["ddStandard"]); }, function (sender, args) { logit("GetLookupData Failed 1, " + args.get_message()); }));
        deferreds.push($.when(CKO.CSOM.GetLookupData.getvalueswithfields("current", "Standards", "Standard", ["Standard", "SupportedOrg", "SupportedSubOrg"])).then(function (items) { CKO.CSOM.FillDropdownsMergeFields(items, ["Standard", "SupportedOrg", "SupportedSubOrg"], "-", "Standard", false, ["ddCustomer"]); }, function (sender, args) { logit("GetLookupData Failed 2, " + args.get_message()); }));
        deferreds.push($.when(CKO.CSOM.GetLookupData.getvalues("current", "Functions", "Title")).then(function (items) { CKO.CSOM.FillDropdowns(items, "Title", ["ddFunction"]); }, function (sender, args) { logit("GetLookupData Failed 3, " + args.get_message()); }));
        deferreds.push($.when(CKO.CSOM.GetLookupData.getvalues("current", "Enablers", "Title")).then(function (items) { CKO.CSOM.FillDropdowns(items, "Title", ["ddEnabler"]); }, function (sender, args) { logit("GetLookupData Failed 4, " + args.get_message()); }));
        return deferreds;
    }

    function DataLoaded() {
        logit("Data Loaded");
        $("input[title='Title Required Field']").hide(); // hide for testing
        if (v.actiondate != null) { $("input[title*='Date Completed']").val(moment(v.actiondate).format("MM/DD/YYYY")); }
        // Force EffortType to be selected to Standard
        //$("select[title='EffortType'] option").each(function () {
        //    tp1 = new String($(this).html());
        //    if (tp1 == "Standard") {
        //        $(this).prop('selected', true);
        //    }
        //});

        // Fill out the selected dropdowns based on the text in the fields
        // Was it a standard or directive
        switch ($("select[title='EffortType'] option:selected").val()) {
            case "Standard":
                $("#ddStandard option").each(function () {
                    tp1 = new String($(this).val());
                    if (tp1 == $("input[title='Title Required Field']").val()) {
                        $(this).prop('selected', true);
                    }
                });
                $("#ddDirective").hide();
                $("#ddStandard").show();
                // Have to get the Alignments loaded here so that we can select the proper one
                var parent = $("input[title='Title Required Field']").val();
                v.title = $("input[title='Title Required Field']").val();
                parent = parent.split("-");
                var urlString = "https://hq.tradoc.army.mil/sites/OCKO/PMT/_vti_bin/listdata.svc/Alignments?";
                urlString += "$select=Id,Parent,Paragraph,Reference,ShortDescription";
                urlString += "&$filter=(Parent eq '" + parent[0] + "')";
                logit("urlString: " + urlString);
                $("#ddAlignment").parent().parent().hide();
                if (parent[0] != "N/A") {
                    $("#ddAlignment").parent().parent().show();
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
                            logit("Alignments Count: " + numitems);
                            var opts = "<option value='Select...'>Select...</option>";
                            var sa = $("input[title='SupportAlignment']").val();
                            for (var i = 0, length = j.length; i < length; i++) {
                                var opt = j[i]["Paragraph"] + "-" + j[i]["ShortDescription"];
                                opt = opt.trim();
                                if (opt == sa) {
                                    opts += "<option selected value='" + opt + "'>" + j[i]["ShortDescription"] + "</option>";
                                }
                                else {
                                    opts += "<option value='" + opt + "'>" + j[i]["ShortDescription"] + "</option>";
                                }
                            }
                            $("#ddAlignment").html("").append(opts);
                            AlignmentsLoaded();
                        }
                    });
                }
                break;

            case "Directive":
                $("#ddDirective option").each(function () {
                    tp1 = new String($(this).val());
                    if (tp1 == $("input[title='Title Required Field']").val()) {
                        $(this).prop('selected', true);
                    }
                });
                $("#ddDirective").show();
                $("#ddStandard").hide();
                $("#ddAlignment").parent().parent().hide();
                break;
        }
        // Functions and Enablers
        $("#ddFunction option").each(function () {
            tp1 = new String($(this).html());
            if (tp1 == $("input[title='Function Required Field']").val()) {
                $(this).prop('selected', true);
            }
        });
        $("#ddEnabler option").each(function () {
            tp1 = new String($(this).html());
            if (tp1 == $("input[title='Enabler Required Field']").val()) {
                $(this).prop('selected', true);
            }
        });

        $("select[title='EffortType']").on("change", function () {
            var type = $("#" + $(this).attr("id") + " option:selected").val();
            switch (type) {
                case "Directive":
                    $("#ddDirective").show();
                    $("#ddStandard").hide();
                    $("#ddAlignment").parent().parent().hide();
                    break;

                case "Standard":
                    $("#ddDirective").hide();
                    $("#ddStandard").show();
                    $("#ddAlignment").parent().parent().show();
                    break;
            }
        });
        $("#ddDirective").on("change", function () {
            $("input[title='Title Required Field']").val($("#ddDirective option:selected").val());
        });
        $("#ddEnabler").on("change", function () {
            $("input[title='Enabler Required Field']").val($("#ddEnabler option:selected").val());
        });
        $("#ddFunction").on("change", function () {
            $("input[title='Function Required Field']").val($("#ddFunction option:selected").val());
        });
        $("#ddStandard").on("change", function () {
            var standard = $("#ddStandard option:selected").val();
            $("input[title='Title Required Field']").val(standard);
            standard = standard.split("-");
            // Now select the customer using the Standard. TODO: Should this even be stored in the Actions table at all? The Standard contains this data so should a user ever be able to add/change customer value.
            $("#ddCustomer option").each(function () {
                tp1 = new String($(this).html());
                if (tp1 == standard[1]) {
                    $(this).prop('selected', true);
                    $("input[title*='Customer']").val($(this).val());
                }
            });
            if (standard[0] != "N/A") {
                // Now get the support alignments from the Alignments table using REST
                var urlString = "https://hq.tradoc.army.mil/sites/OCKO/PMT/_vti_bin/listdata.svc/Alignments?";
                urlString += "$select=Id,Parent,Paragraph,Reference,ShortDescription";
                urlString += "&$filter=(Parent eq '" + standard[0] + "')";
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
                        logit("Alignments Count: " + numitems);
                        var opts = "<option selected value='Select...'>Select...</option>";
                        for (var i = 0, length = j.length; i < length; i++) {
                            var opt = j[i]["Paragraph"] + "-" + j[i]["ShortDescription"];
                            opts += "<option value='" + opt + "'>" + j[i]["ShortDescription"] + "</option>";
                        }
                        $("#ddAlignment").html("").append(opts);
                        AlignmentsLoaded();
                    }
                });
            }
            else {
                // Support alignment would not be required for this standard
                v.alignmentrequired = false;
            }
        });
        $("#btnSave").click(function () {
            $("#FormError").remove();
            var goon = true;
            if ($("input[title='SupportAlignment']").val() == "" && $("select[title='EffortType'] option:selected").val() == "Standard") {
                if (v.alignmentrequired == true) {
                    goon = false;
                }
                else {
                    $("input[title='SupportAlignment']").val("N/A").parent().parent().hide(); // just set the support alignment to NA
                }
            }
            if ($("#ddStandard option:selected").val() == "Select..." && $("select[title='EffortType'] option:selected").val() == "Standard") {
                goon = false;
            }
            if ($("#ddDirective option:selected").val() == "Select..." && $("select[title='EffortType'] option:selected").val() == "Directive") {
                goon = false;
            }
            if ($("#ddEnabler option:selected").val() == "Select...") {
                goon = false;
            }
            if ($("#ddFunction option:selected").val() == "Select...") {
                goon = false;
            }
            if ($("input[title='Enabler Required Field']").val() == "Select..." || $("input[title='Enabler Required Field']").val() == "") {
                goon = false;
            }
            if ($("input[title='Function Required Field']").val() == "Select..." || $("input[title='Function Required Field']").val() == "") {
                goon = false;
            }
            if ($("div[role='textbox']").html() == "<p>​</p>") {
                goon = false;
            }
            if ($("input[title*='Date Completed']").val() == "") {
                goon = false;
            }
            if ($("input[title*='Expended']").val() == "") {
                goon = false;
            }
            if (goon == true) {
                $(window).on('unload', function () {
                    var returndata = [];
                    returndata[0] = "Refresh";
                    returndata[1] = "Action Added";
                    SP.UI.ModalDialog.commonModalDialogClose(SP.UI.DialogResult.OK, returndata);
                });
                $("input[id*='SaveItem']").trigger('click');
            }
            else {
                var ehtml = "<li id='FormError' class='ms-cui-group' style='width: 400px; background-color: red;'>";
                ehtml += "<div class='container-fluid' style='padding: 36px; text-align: center; color: black; font-size: 16px;'>";
                ehtml += "Not all required fields have been filled out.</div></li>";
                $("ul[id='Ribbon.ListForm.Edit']").append(ehtml);
            }
        });
        $("#btnCancel").click(function () { // Cancel and Close the popup
            SP.UI.ModalDialog.commonModalDialogClose(SP.UI.DialogResult.cancel);
        });
    }

    function AlignmentsLoaded() {
        logit("Alignments Loaded");
        $("#ddAlignment").on("change", function () {
            var salignment = $("#ddAlignment option:selected").val();
            $("input[title='SupportAlignment']").val(salignment);
        });
    }

    return {
        Init: Init
    }
}

SP.SOD.notifyScriptLoadedAndExecuteWaitingJobs('CEWP_Forms_EditActionForm.js');