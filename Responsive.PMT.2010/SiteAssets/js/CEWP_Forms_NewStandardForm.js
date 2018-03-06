var CKO = CKO || {};
CKO.AJAX = CKO.AJAX || {};
CKO.FORMS = CKO.FORMS || {};
CKO.FORMS.STANDARDS = CKO.FORMS.STANDARDS || {};
CKO.FORMS.STANDARDS.VARIABLES = CKO.FORMS.STANDARDS.VARIABLES || {};

CKO.FORMS.STANDARDS.VARIABLES = {
    newform: null,
    site: null,
    loc: String(window.location),
    waitmsg: null,
    title: null,
    ctx: null,
    web: null,
    list: null,
    listitem: null,
    html: "",
    tblinit: 0,
    user: null,
    userID: null,
    Org: null,
    directive: null,
    selects: null,
    alignmentrequired: true,
    actiondate: jQuery.QueryString["Date"]
}

CKO.FORMS.STANDARDS.NewForm = function () {

    var v = CKO.FORMS.STANDARDS.VARIABLES;

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
        resizeModalDialog();
        loadCSS(site + '/SiteAssets/css/CEWP_Forms_StandardForms.css');
        loadCSS(site + '/SiteAssets/css/responsive.bootstrap.min.css');
        loadscript(site + '/SiteAssets/js/jquery.dataTables.min.js', function () {
            loadscript(site + '/SiteAssets/js/dataTables.bootstrap.min.js', function () {
                LoadData();
            });
        });
    }

    function LoadData() {
        resizeModalDialog(); // just to be sure!!
        v.userID = _spPageContextInfo.userId;
        var monkey = LoadDropdowns();
        jQuery.when.apply(null, monkey).done(function () {
            logit("LoadDropdowns complete.");
            $("input").addClass("form-control");
            $("select").addClass("form-control");
            $("div[role='textbox']").addClass("form-control");
            v.selects = new Array();
            // First build an array for the select controls for cascading functions

            $("select").each(function () {
                if ($(this).attr("data-function") === "cascadeselect") {
                    v.selects.push({
                        "id": $(this).attr("id"),
                        "cascadeto": $(this).attr("data-cascadeto"),
                        "cascadeval": String($("input[title*='" + $("#" + $(this).attr("data-cascadeto")).attr("data-sourcefield") + "']").val()),
                        "source": $(this).attr("data-sourcefield"),
                        "sourceval": String($("input[title*='" + $(this).attr("data-sourcefield") + "']").val()),
                        "orderby": $(this).attr("data-orderby"), // not currently ordering just the field to display in the dropdown
                        "filter": $(this).attr("data-filterfield"),
                        "list": $(this).attr("data-lookuplist"),
                        "items": null
                    })
                }
            });

            //var rabbit = Cascade();
            //jQuery.when.apply(null, rabbit).done(function () {
            //    logit("Update Dropdowns complete.");
            //});
        });
    }

    function LoadDropdowns() {
        var deferreds = [];
        deferreds.push($.when(CKO.CSOM.GetLookupData.getvalues("current", "PMTOrgs", "Title")).then(function (items) { CKO.CSOM.FillDropdowns(items, "Title", ["ddSupportingOrg"]); }, function (sender, args) { logit("GetLookupData Failed 1, " + args.get_message()); }));
        deferreds.push($.when(CKO.CSOM.GetLookupData.getvalues("current", "Alignment", "Title")).then(function (items) { CKO.CSOM.FillDropdowns(items, "Title", ["ddSourceAuthority"]); }, function (sender, args) { logit("GetLookupData Failed 2, " + args.get_message()); }));
        deferreds.push($.when(CKO.CSOM.GetLookupData.getvalues("current", "Orgs", "Title")).then(function (items) { CKO.CSOM.FillDropdowns(items, "Title", ["ddSupportedOrg"]); }, function (sender, args) { logit("GetLookupData Failed 3, " + args.get_message()); }));
        deferreds.push($.when(CKO.CSOM.GetLookupData.getvalues("current", "Alignments", "Reference")).then(function (items) { CKO.CSOM.FillDropdowns(items, "Reference", ["ddSupportReference"]); }, function (sender, args) { logit("GetLookupData Failed 4, " + args.get_message()); }));
        deferreds.push($.when(CKO.CSOM.GetLookupData.getvalues("current", "Competencies", "Title")).then(function (items) { CKO.CSOM.FillDropdowns(items, "Title", ["ddCompetency"]); }, function (sender, args) { logit("GetLookupData Failed 5, " + args.get_message()); }));
        return deferreds;
    }

    function Cascade() {
        logit("Cascade Started");
        // All data loaded except need to get the dropdowns filtered and cascaded based on selected items
        var deferreds = [];
        for (var i = 0; i < v.selects.length; i++){
            // If there is a source val then get the items to filter the cascaded select
            if (v.selects[i].sourceval !== "null") {
                $("#" + v.selects[i].id + " option").each(function () {
                    if ($(this).html() === v.selects[i].sourceval) {
                        $(this).prop('selected', true);
                    }
                });
                deferreds.push($.when(CKO.CSOM.GetListItems.getitemsfilteredorderedandpasstoelement("current", v.selects[i].list, v.selects[i].filter, v.selects[i].sourceval, v.selects[i].orderby, i)).then(function (items, i) {
                    if (items.get_count() > 0) {
                        v.selects[i].items = items;
                        var opts = "<option selected value='Select...'>Select...</option>";
                        var enumerator = items.getEnumerator();
                        var unique = "";
                        while (enumerator.moveNext()) {
                            var current = enumerator.get_current();
                            // if there is a selected value set it here
                            if (v.selects[i].cascadeval === current.get_item(v.selects[i].orderby)) {
                                opts += "<option selected value='" + current.get_item(v.selects[i].orderby) + "'>" + current.get_item(v.selects[i].orderby) + "</option>";
                            }
                            else {
                                opts += "<option value='" + current.get_item(v.selects[i].orderby) + "'>" + current.get_item(v.selects[i].orderby) + "</option>";
                            }
                        }
                        // populate the child select with the options
                        $("#" + v.selects[i].cascadeto).html("").append(opts);
                    }
                }, function (sender, args) {
                    logit("Error getting data for child dropdown: " + args.get_message());
                }));
            }
        }
        return deferreds;
    }

    function changeme(obj) {
        var f = $("#" + obj.id).attr("data-function");
        logit("Change called on: " + obj.id + ", function: " + f);
        switch (f) {
            case "cascadeselect":
                // loop through the selects array and then do another query and update of the values. Then update the source value to the changed select value( this is the hidden form field)
                for (var i = 0; i < v.selects.length; i++) {
                    if (v.selects[i].id === obj.id) {
                        // this is the changed select update the source value and get the new items
                        v.selects[i].sourceval = $("#" + obj.id + " option:selected").val();
                        $("input[title*='" + $("#" + obj.id).attr("data-sourcefield") + "']").val(v.selects[i].sourceval);
                        $.when(CKO.CSOM.GetListItems.getitemsfilteredorderedandpasstoelement("current", v.selects[i].list, v.selects[i].filter, v.selects[i].sourceval, v.selects[i].orderby, i)).then(function (items, i) {
                            if (items.get_count() > 0) {
                                v.selects[i].items = items;
                                var opts = "<option selected value='Select...'>Select...</option>";
                                var enumerator = items.getEnumerator();
                                var unique = "";
                                while (enumerator.moveNext()) {
                                    var current = enumerator.get_current();
                                    opts += "<option value='" + current.get_item(v.selects[i].orderby) + "'>" + current.get_item(v.selects[i].orderby) + "</option>";
                                }
                                // populate the child select with the options
                                $("#" + v.selects[i].cascadeto).html("").append(opts);
                            }
                        }, function (sender, args) {
                            logit("Error getting data for child dropdown: " + args.get_message());
                        });
                    }
                }
                break;

            case "updatesource":
                // update the source field with the selected value
                $("input[title*='" + $("#" + obj.id).attr("data-sourcefield") + "']").val($("#" + obj.id + " option:selected").val());
                break;

            case "select":
                // update the source field with the selected value
                $("input[title*='" + $("#" + obj.id).attr("data-sourcefield") + "']").val($("#" + obj.id + " option:selected").val());
                break;
        }
    }

    return {
        Init: Init,
        changeme: changeme
    }
}

SP.SOD.notifyScriptLoadedAndExecuteWaitingJobs('CEWP_Forms_NewStandardForm.js');