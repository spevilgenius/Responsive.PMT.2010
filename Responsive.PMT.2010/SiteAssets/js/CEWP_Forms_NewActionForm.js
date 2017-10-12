var CKO = CKO || {};
CKO.AJAX = CKO.AJAX || {};
CKO.FORMS = CKO.FORMS || {};
CKO.FORMS.ACTIONS = CKO.FORMS.ACTIONS || {};

CKO.FORMS.ACTIONS.VARIABLES = {
    newform: null,
    site: null,
    loc: String(window.location),
    waitmsg: null,
    ctx: null,
    web: null,
    user: null,
    userID: null,
    directives: null,
    standards: null,
    errortext: "Please fill out the fields: ",
    alignmentrequired: true,
    title: "",
    action: jQuery.QueryString["Action"],
    actiondate: jQuery.QueryString["Date"],
    copyid: jQuery.QueryString["CopyId"]
}

CKO.FORMS.ACTIONS.NewForm = function () {

    var v = CKO.FORMS.ACTIONS.VARIABLES;

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

        $("#btnSave").on("click", function () {
            SaveAction();
        });

        $("#btnCancel").on("click", function () {
            CancelAction();
        });
        
        // get user info step 1
        v.ctx = new SP.ClientContext.get_current();
        v.web = v.ctx.get_web();
        v.user = v.web.get_currentUser();
        v.ctx.load(v.user);
        v.ctx.executeQueryAsync(GetUserDataSucceeded, GetUserDataFailed);
    }

    function GetUserDataSucceeded() {
        // Have user info so now fill out the PMTUser field
        v.directives = new Array();
        v.standards = new Array();
        var thisdiv = $("div[data-field='PMTUser']");
        var thisContents = thisdiv.find("div[name='upLevelDiv']");
        var thisCheckNames = thisdiv.find("img[Title='Check Names']:first");
        thisContents.html(v.user.get_loginName());
        thisCheckNames.click();
        $("input").addClass("form-control");
        $("select").addClass("form-control");
        $("div[role='textbox']").addClass("form-control");
        // go get all dropdown data
        var monkey = LoadDropdowns();
        jQuery.when.apply(null, monkey).done(function () {
            logit("LoadDropdowns complete.");
            $("input[title='Title Required Field']").hide(); // hide for testing
            if (v.actiondate != null) { $("input[title*='Date Completed']").val(moment(v.actiondate).format("MM/DD/YYYY")); }
            $("select[title='EffortType'] option").each(function () {
                $(this).removeAttr("selected");
            });
            var opt = $("select[title='EffortType']").html();
            opt = "<option selected='selected' value='Select...'>Select...</option>" + opt;
            $("select[title='EffortType']").html(opt);
            $("select[title='EffortType']").on("change", function () {
                var type = $("#" + $(this).attr("id") + " option:selected").val();
                switch (type) {
                    case "Directive":
                        GetDirectives();
                        $("#ddDirective").show();
                        $("#ddStandard").hide();
                        $("#ddAlignment").parent().parent().hide();
                        break;

                    case "Standard":
                        GetStandards();
                        $("#ddDirective").hide();
                        $("#ddStandard").show();
                        $("#ddAlignment").parent().parent().show();
                        break;
                }
            });
            DataLoaded();
        });
    }

    function GetStandards() {
        // Load Standards from REST
        var urlString = "https://hq.tradoc.army.mil/sites/OCKO/PMT/_vti_bin/listdata.svc/Standards?";
        urlString += "$select=Id,Standard,Task,StandardStatusValue,SupportParagraph,SupportedOrg,SupportedSubOrg";
        urlString += "&$filter=(StandardStatusValue eq 'Ongoing')";
        urlString += "&$orderby=Standard";

        jQuery.ajax({
            url: urlString,
            method: "GET",
            headers: { 'accept': 'application/json; odata=verbose' },
            error: function (jqXHR, textStatus, errorThrown) {
                // to do implement logging to a central list
                logit("Error Status: " + textStatus + ":: errorThrown: " + errorThrown);
            },
            success: function (data) {
                var results = data.d.results;
                var j = jQuery.parseJSON(JSON.stringify(results));
                var numitems = data.d.results.length;
                logit("Standards Count: " + numitems);
                
                for (var i = 0, length = j.length; i < length; i++) {
                    // Add to standard array so that we can display info based on selected standard
                    v.standards.push({
                        "standard": j[i]["Standard"],
                        "description": j[i]["Task"],
                        "status": j[i]["StandardStatusValue"],
                        "paragraph": j[i]["SupportParagraph"],
                        "org": j[i]["SupportedOrg"],
                        "suborg": j[i]["SupportedSubOrg"]
                    });
                }
                // Now just loop back through the array to create the dropdown and pass the index as the value so we know which standard to get data for.
                var opts;
                if (v.title != "") {
                    opts = "<option value='666'>Select...</option>";
                    for (var i = 0; i < v.standards.length; i++) {
                        // if the title matches the option, select it
                        if (v.standards[i]["standard"] == v.title) {
                            opts += "<option selected value='" + i + "'>" + v.standards[i]["standard"] + "</option>";
                            // also need to set the description field
                            $("#divDescription").html("").append(v.standards[i]["description"]);
                        }
                        else {
                            opts += "<option value='" + i + "'>" + v.standards[i]["standard"] + "</option>";
                        }
                    }
                }
                else {
                    opts = "<option selected value='Select...'>Select...</option>";
                    for (var i = 0; i < v.standards.length; i++) {
                        opts += "<option value='" + i + "'>" + v.standards[i]["standard"] + "</option>";
                    }
                }
                $("#ddStandard").html("").append(opts);
                GetAlignments();
            }
        });
    }

    function GetDirectives() {
        // Load Directives From REST
        var urlString = "https://hq.tradoc.army.mil/sites/OCKO/PMT/_vti_bin/listdata.svc/Directives?";
        urlString += "$select=Id,Directive,DirectiveDescription,DirectiveStatusValue,ProjectedManHours,Expended";
        urlString += "&$filter=(DirectiveStatusValue eq 'InProgress') or (DirectiveStatusValue eq 'Complete')";
        urlString += "&$orderby=Directive";

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
                var opts;
                for (var i = 0, length = j.length; i < length; i++) {
                    // Add to directive array so that we can display info based on selected directive
                    v.directives.push({
                        "directive": j[i]["Directive"],
                        "description": j[i]["DirectiveDescription"],
                        "status": j[i]["DirectiveStatusValue"]
                    });
                }
                // Now just loop back through the array to create the dropdown and pass the index as the value so we know which directive to get data for.
                if (v.title != "") {
                    for (var i = 0; i < v.directives.length; i++) {
                        // if the title matches the option, select it
                        if (v.directives[i]["directive"] == v.title) {
                            opts += "<option selected value='" + i + "'>" + v.directives[i]["directive"] + "</option>";
                            // also need to set the description field
                            $("#divDescription").html("").append(v.directives[i]["description"]);
                        }
                        else {
                            opts += "<option value='" + i + "'>" + v.directives[i]["directive"] + "</option>";
                        }
                    }
                }
                else {
                    opts = "<option selected value='Select...'>Select...</option>";
                    for (var i = 0; i < v.directives.length; i++) {
                        opts += "<option value='" + i + "'>" + v.directives[i]["directive"] + "</option>";
                    }
                }
                $("#ddDirective").html("").append(opts);
            }
        });
    }

    function GetUserDataFailed(sender, args) {
        alert("GetUserDataFailed: " + args.get_message());
        $("#SPSTools_Notify").fadeOut("2500", function () {
            $("#SPSTools_Notify").html("");
        });
    }

    function LoadDropdowns() {
        var deferreds = [];
        deferreds.push($.when(CKO.CSOM.GetLookupData.getvalues("current", "Functions", "Title")).then(function (items) { CKO.CSOM.FillDropdowns(items, "Title", ["ddFunction"]); }, function (sender, args) { logit("GetLookupData Failed 1, " + args.get_message()); }));
        deferreds.push($.when(CKO.CSOM.GetLookupData.getvalues("current", "Enablers", "Title")).then(function (items) { CKO.CSOM.FillDropdowns(items, "Title", ["ddEnabler"]); }, function (sender, args) { logit("GetLookupData Failed 2, " + args.get_message()); }));
        return deferreds;
    }

    function DataLoaded() {
        logit("Data Loaded");
        // Is this a copy action
        switch (v.action) {
            case "Copy":
                // get the action with the id and then update all fields accordingly
                var urlString = "https://hq.tradoc.army.mil/sites/OCKO/PMT/_vti_bin/listdata.svc/Actions?";
                urlString += "$select=Id,Title,Expended,ActionComments,Function,Enabler,OtherEnabler,EffortTypeValue,SupportAlignment";
                urlString += "&$expand=PMTUser";
                urlString += "&$filter=(Id eq " + v.copyid + ")";
                logit("urlString: " + urlString);
                jQuery.ajax({
                    url: urlString,
                    method: "GET",
                    headers: { 'accept': 'application/json; odata=verbose' },
                    error: function (jqXHR, textStatus, errorThrown) {
                        // to do implement logging to a central list
                        logit("Error Status: " + textStatus + ":: errorThrown: " + errorThrown);
                    },
                    success: function (data) {
                        var results = data.d.results;
                        var j = jQuery.parseJSON(JSON.stringify(results));
                        for (var i = 0, length = j.length; i < length; i++) {
                            // there is only supposed to be 1 item here so just update the fields accordingly
                            
                            $("select[title='EffortType'] option").each(function () {
                                if ($(this).html() == j[i]["EffortTypeValue"]) {
                                    $(this).prop('selected', true);
                                    switch (j[i]["EffortTypeValue"]) {
                                        case "Directive":
                                            // Set the Directive accordingly
                                            v.title = j[i]["Title"];
                                            $("input[title^='Title']").val(v.title);
                                            GetDirectives();
                                            $("#ddDirective").show();
                                            $("#ddStandard").hide();
                                            $("#ddAlignment").parent().parent().hide();
                                            break;

                                        case "Standard":
                                            // Set the Standard accordingly
                                            v.title = j[i]["Title"];
                                            $("input[title^='Title']").val(v.title);
                                            GetStandards();
                                            $("#ddDirective").hide();
                                            $("#ddStandard").show();
                                            $("#ddAlignment").parent().parent().show();
                                            break;
                                    }
                                }
                            });

                            $("#ddFunction option").each(function () {
                                if ($(this).html() == j[i]["Function"]) {
                                    $(this).prop('selected', true);
                                    $("input[title^='Function']").val(j[i]["Function"]);
                                }
                            });

                            $("#ddEnabler option").each(function () {
                                if ($(this).html() == j[i]["Enabler"]) {
                                    $(this).prop('selected', true);
                                    $("input[title^='Enabler']").val(j[i]["Enabler"]);
                                }
                            });

                            
                            $("textarea[title*='Comments']").val(j[i]["ActionComments"]);
                        }
                    }
                });

                break;
        }
    }

    function AlignmentsLoaded() {
        logit("Alignments Loaded");
        $("#ddAlignment").on("change", function () {
            var salignment = $("#ddAlignment option:selected").val();
            $("input[title='SupportAlignment']").val(salignment);
        });
    }

    function GetAlignments() {
        var idx = $("#ddStandard option:selected").val();
        var standard = v.standards[idx]["standard"];
        var paragraph = v.standards[idx]["paragraph"];
        logit("GetAlignments: standard-" + standard + ", paragraph-" + paragraph);
        if (v.standards[idx]["paragraph"] != "N/A") {
            // Now get the support alignments from the Alignments table using REST
            var urlString = "https://hq.tradoc.army.mil/sites/OCKO/PMT/_vti_bin/listdata.svc/Alignments?";
            urlString += "$select=Id,Parent,Paragraph,Reference,ShortDescription";
            urlString += "&$filter=(Parent eq '" + paragraph + "')";
            logit("Alignments urlString: " + urlString);

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
                    var alignment = String($("input[title='SupportAlignment']").val());
                    var opts = "";
                    if (alignment != "undefined" && alignment != "null" && alignment != "") {
                        for (var i = 0, length = j.length; i < length; i++) {
                            var opt = j[i]["Paragraph"] + "-" + j[i]["ShortDescription"];
                            if (opt == alignment) {
                                opts += "<option selected value='" + opt + "'>" + j[i]["ShortDescription"] + "</option>";
                            }
                            else {
                                opts += "<option value='" + opt + "'>" + j[i]["ShortDescription"] + "</option>";
                            }
                        }
                    }
                    else {
                        opts += "<option selected value='Select...'>Select...</option>";
                        for (var i = 0, length = j.length; i < length; i++) {
                            var opt = j[i]["Paragraph"] + "-" + j[i]["ShortDescription"];
                            opts += "<option value='" + opt + "'>" + j[i]["ShortDescription"] + "</option>";

                        }
                    }
                    $("#ddAlignment").html("").append(opts);
                    AlignmentsLoaded();
                }
            });
        }
        else {
            // Support alignment would not be required for this standard
            v.alignmentrequired = false;
            $("input[title^='SupportAlignment']").val("N/A").closest(".form-group").hide(); // just set the support alignment to NA
        }
    }

    function changeme(obj) {
        switch (obj.id) {
            case "ddStandard":
                // Set the hidden title field to the selected Standard
                var idx = $("#" + obj.id + " option:selected").val();
                var standard = v.standards[idx]["standard"];
                $("input[title^='Title']").val(standard);
                $("#divDescription").html("").append(v.standards[idx]["description"]);
                GetAlignments();
                break;

            case "ddDirective":
                // Set the hidden title field to the selected Directive and display the description
                var idx = $("#" + obj.id + " option:selected").val();
                $("input[title^='Title']").val(v.directives[idx]["directive"]);
                $("#divDescription").html("").append(v.directives[idx]["description"]);
                break;

            case "ddEnabler":
                $("input[title^='Enabler']").val($("#ddEnabler option:selected").val());
                break;

            case "ddFunction":
                $("input[title^='Function']").val($("#ddFunction option:selected").val());
                break;
        }
    }

    function SaveAction() {
        $("#FormError").remove();
        var goon = true;
        if ($("input[title='SupportAlignment']").val() == "" && $("select[title='EffortType'] option:selected").val() == "Standard") {
            if (v.alignmentrequired == true) {
                goon = false;
                v.errortext += "Support Alignment ";
            }
            else {
                $("input[title='SupportAlignment']").val("N/A").parent().parent().hide(); // just set the support alignment to NA
            }
        }
        if ($("#ddStandard option:selected").val() == "Select..." && $("select[title='EffortType'] option:selected").val() == "Standard") {
            goon = false;
            v.errortext += "Objective ";
        }
        if ($("#ddDirective option:selected").val() == "Select..." && $("select[title='EffortType'] option:selected").val() == "Directive") {
            goon = false;
            v.errortext += "Objective ";
        }
        if ($("input[title='Enabler Required Field']").val() == "Select..." || $("input[title='Enabler Required Field']").val() == "") {
            goon = false;
            v.errortext += "Enabler ";
        }
        if ($("input[title='Function Required Field']").val() == "Select..." || $("input[title='Function Required Field']").val() == "") {
            goon = false;
            v.errortext += "Function ";
        }
        if ($("textarea[title*='Comments']").val().trim().length <= 5) {
            goon = false;
            v.errortext += "Comments ";
        }
        if ($("input[title*='Date Completed']").val() == "") {
            goon = false;
            v.errortext += "Date Completed ";
        }
        if ($("input[title*='Expended']").val() == "") {
            goon = false;
            v.errortext += "Time ";
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
            ehtml += v.errortext + "</div></li>";
            $("ul[id='Ribbon.ListForm.Edit']").append(ehtml);
            v.errortext = "Please fill out the fields: ";
        }
    }

    function CancelAction() {
        SP.UI.ModalDialog.commonModalDialogClose(SP.UI.DialogResult.cancel);
    }

    return {
        Init: Init,
        changeme: changeme
    }
}

SP.SOD.notifyScriptLoadedAndExecuteWaitingJobs('CEWP_Forms_NewActionForm.js');