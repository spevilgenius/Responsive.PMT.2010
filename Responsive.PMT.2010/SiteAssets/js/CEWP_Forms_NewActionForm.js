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
    list: null,
    listitem: null,
    user: null,
    userID: null,
    Org: null,
    customer: null,
    directives: null,
    standards: null,
    alignmentrequired: true,
    actiondate: jQuery.QueryString["Date"]
}

CKO.FORMS.ACTIONS.NewForm = function () {

    var v = CKO.FORMS.ACTIONS.VARIABLES;

    function Init(site) {
        SP.SOD.executeOrDelayUntilScriptLoaded(function () {
            $().SPSTools_Notify({ type: 'wait', content: 'Loading Form...Please wait...' });
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
                var opts = "<option selected value='Select...'>Select...</option>";
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
                for (var i = 0; i < v.standards.length; i++) {
                    opts += "<option value='" + i + "'>" + v.standards[i]["standard"] + "</option>";
                }
                $("#ddStandard").html("").append(opts);
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
                var opts = "<option selected value='Select...'>Select...</option>";
                for (var i = 0, length = j.length; i < length; i++) {
                    // Add to directive array so that we can display info based on selected directive
                    v.directives.push({
                        "directive": j[i]["Directive"],
                        "description": j[i]["DirectiveDescription"],
                        "status": j[i]["DirectiveStatusValue"]
                    });
                }
                // Now just loop back through the array to create the dropdown and pass the index as the value so we know which directive to get data for.
                for (var i = 0; i < v.directives.length; i++) {
                    opts += "<option value='" + i + "'>" + v.directives[i]["directive"] + "</option>";
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
        $("#SPSTools_Notify").fadeOut("2500", function () {
            $("#SPSTools_Notify").html("");
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

    function changeme(obj) {
        switch (obj.id) {
            case "ddStandard":
                // Set the hidden title field to the selected Standard
                var idx = $("#" + obj.id + " option:selected").val();
                var standard = v.standards[idx]["standard"];
                $("input[title='Title Required Field']").val(standard);
                $("#divDescription").html("").append(v.standards[idx]["description"]);
                if (standard != "N/A") {
                    // Now get the support alignments from the Alignments table using REST
                    var urlString = "https://hq.tradoc.army.mil/sites/OCKO/PMT/_vti_bin/listdata.svc/Alignments?";
                    urlString += "$select=Id,Parent,Paragraph,Reference,ShortDescription";
                    urlString += "&$filter=(Parent eq '" + v.standards[idx]["paragraph"] + "')";
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
                break;

            case "ddDirective":
                // Set the hidden title field to the selected Directive and display the description
                var idx = $("#" + obj.id + " option:selected").val();
                $("input[title='Title Required Field']").val(v.directives[idx]["directive"]);
                $("#divDescription").html("").append(v.directives[idx]["description"]);
                break;

            case "ddEnabler":
                $("input[title='Enabler']").val($("#ddEnabler option:selected").val());
                break;

            case "ddFunction":
                $("input[title='Function']").val($("#ddFunction option:selected").val());
                break;
        }
    }

    return {
        Init: Init,
        changeme: changeme
    }
}

SP.SOD.notifyScriptLoadedAndExecuteWaitingJobs('CEWP_Forms_NewActionForm.js');