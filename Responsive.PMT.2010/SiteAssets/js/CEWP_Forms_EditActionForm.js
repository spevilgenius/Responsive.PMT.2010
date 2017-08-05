var SLASH = "/";

function FormInit(site) {
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
    userID = _spPageContextInfo.userId;
    console.log("userID = " + userID);
    $("input").addClass("form-control");
    $("select").addClass("form-control");
    $("div[role='textbox']").addClass("form-control");
    // go get all dropdown data
    var monkey = LoadDropdowns();
    jQuery.when.apply(null, monkey).done(function () {
        logit("LoadDropdowns complete.");
        //Load Directives From REST to filter archived ones out
        var urlString = "https://hq.tradoc.army.mil/sites/OCKO/PMT/_vti_bin/listdata.svc/Directives?";
        //urlString += "$select=*";
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

function LoadDropdowns() {
    var deferreds = [];
    deferreds.push($.when(CKO.CSOM.GetLookupData.getvalueswithfields("current", "Standards", "Standard", ["Standard", "SupportParagraph"])).then(function (items) { CKO.CSOM.FillDropdownsMergeFields(items, ["SupportParagraph", "Standard"], "-", ["ddStandard"]); }, function (sender, args) { logit("GetLookupData Failed 1, " + args.get_message()); }));
    deferreds.push($.when(CKO.CSOM.GetLookupData.getvalues("current", "Functions", "Title")).then(function (items) { CKO.CSOM.FillDropdowns(items, "Title", ["ddFunction"]); }, function (sender, args) { logit("GetLookupData Failed 2, " + args.get_message()); }));
    deferreds.push($.when(CKO.CSOM.GetLookupData.getvalues("current", "Enablers", "Title")).then(function (items) { CKO.CSOM.FillDropdowns(items, "Title", ["ddEnabler"]); }, function (sender, args) { logit("GetLookupData Failed 3, " + args.get_message()); }));
    return deferreds;
}

function DataLoaded() {
    logit("Data Loaded");
    $("input[title='Title Required Field']").hide(); // hide for testing
    $("select[title='EffortType']").on("change", function () {
        var type = $("#" + $(this).attr("id") + " option:selected").val();
        switch (type) {
            case "Directive":
                $("#ddDirective").show();
                $("#ddStandard").hide();
                break;

            case "Standard":
                $("#ddDirective").hide();
                $("#ddStandard").show();
                break;
        }
    });
    $("#ddDirective").on("change", function () {
        $("input[title='Title Required Field']").val($("#ddDirective option:selected").val());
    });
    $("#ddStandard").on("change", function () {
        var standard = $("#ddStandard option:selected").val();
        $("input[title='Title Required Field']").val(standard);
        standard = standard.split("-");
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
                    opts += "<option value='" + opt + "'>" + opt + "</option>";
                }
                $("#ddAlignment").html("").append(opts);
                AlignmentsLoaded();
            }
        });
    });
}

function AlignmentsLoaded() {
    logit("Alignments Loaded");
}

SP.SOD.notifyScriptLoadedAndExecuteWaitingJobs('CEWP_Forms_EditActionForm.js');