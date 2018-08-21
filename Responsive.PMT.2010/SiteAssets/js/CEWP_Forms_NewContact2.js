var CKO = CKO || {};
CKO.AJAX = CKO.AJAX || {};
CKO.FORMS = CKO.FORMS || {};
CKO.FORMS.CONTACTS = CKO.FORMS.CONTACTS || {};

CKO.FORMS.CONTACTS.VARIABLES = {
    newform: null,
    site: null,
    loc: String(window.location),
    waitmsg: null,
    errortext: "Please fill out the fields: ",
    title: "",
    selects: null
}

CKO.FORMS.CONTACTS.NewForm = function () {

    var v = CKO.FORMS.CONTACTS.VARIABLES;

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
        v.site = site;
        loadCSS(site + '/SiteAssets/css/CEWP_Forms_Contact.css');

        $("input").addClass("form-control");
        $("select").addClass("form-control");
        $("textarea").addClass("form-control");

        var monkey = LoadDropdowns();
        jQuery.when.apply(null, monkey).done(function () {

            $("#btnSave").on("click", function () {
                SaveContact();
            });

            $("#btnCancel").on("click", function () {
                Cancel();
            });

            $(".ms-cui-group").each(function () {
                switch ($(this).attr("id")) {
                    case "Ribbon.ListForm.Edit.Commit":
                        $(this).css({ "display": "none" });
                        break;

                    case "Ribbon.ListForm.Edit.Actions":
                        $(this).css({ "display": "none" });
                        break;
                }
            });

        });

        v.selects = new Array();
        // First build an array for the select controls for cascading functions

        $("select").each(function () {
            if ($(this).attr("data-function") === "cascadeselect") {
                var fields = null;
                if ($(this).attr("data-ddFields")) {
                    fields = String($(this).attr("data-ddFields"));
                    fields = fields.split(", ");
                }
                v.selects.push({
                    "id": $(this).attr("id"),
                    "cascadeto": $(this).attr("data-cascadeto"),
                    "cascadeval": String($("input[title*='" + $("#" + $(this).attr("data-cascadeto")).attr("data-sourcefield") + "']").val()),
                    "source": $(this).attr("data-sourcefield"),
                    "sourceval": String($("input[title*='" + $(this).attr("data-sourcefield") + "']").val()),
                    "orderby": $(this).attr("data-orderby"), // not currently ordering just the field to display in the dropdown
                    "filter": $(this).attr("data-filterfield"),
                    "list": $(this).attr("data-lookuplist"),
                    "fields": fields,
                    "items": null
                })
            }
        });
    }

    function LoadDropdowns() {
        var deferreds = [];
        deferreds.push($.when(CKO.CSOM.GetLookupData.getvalues("current", "States", "State")).then(function (items) { CKO.CSOM.FillDropdowns(items, "State", ["ddState"]); }, function (sender, args) { logit("GetLookupData Failed 1, " + args.get_message()); }));
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
                        // 
                        if (v.selects[i].fields !== null) {
                            $.when(CKO.CSOM.GetListItems.getitemsfilteredorderedandpassfieldstoelement("current", v.selects[i].list, v.selects[i].filter, v.selects[i].sourceval, v.selects[i].orderby, i, v.selects[i].fields)).then(function (items, i) {
                                if (items.get_count() > 0) {
                                    v.selects[i].items = items;
                                    var opts = "<option selected value='Select...'>Select...</option>";
                                    var enumerator = items.getEnumerator();
                                    var unique = "";
                                    var text;
                                    while (enumerator.moveNext()) {
                                        var current = enumerator.get_current();
                                        for (var z = 0; z < v.selects[i].fields.length; z++) {
                                            if (z === 0) {
                                                text = current.get_item(v.selects[i].fields[z]);
                                            }
                                            else {
                                                text += "-" + current.get_item(v.selects[i].fields[z]);
                                            }
                                        }
                                        opts += "<option value='" + current.get_item(v.selects[i].orderby) + "'>" + text + "</option>";
                                    }
                                    // populate the child select with the options
                                    $("#" + v.selects[i].cascadeto).html("").append(opts);
                                }
                            }, function (sender, args) {
                                logit("Error getting data for child dropdown: " + args.get_message());
                            });
                        }
                        else {
                            $.when(CKO.CSOM.GetListItems.getitemsfilteredorderedandpasstoelement("current", v.selects[i].list, v.selects[i].filter, v.selects[i].sourceval, v.selects[i].orderby, i)).then(function (items, i) {
                                if (items.get_count() > 0) {
                                    v.selects[i].items = items;
                                    var opts = "<option selected value='Select...'>Select...</option>";
                                    var enumerator = items.getEnumerator();
                                    var unique = "";
                                    while (enumerator.moveNext()) {
                                        var current = enumerator.get_current();
                                        if (current.get_item(v.selects[i].orderby) !== unique) {
                                            opts += "<option value='" + current.get_item(v.selects[i].orderby) + "'>" + current.get_item(v.selects[i].orderby) + "</option>";
                                            unique = current.get_item(v.selects[i].orderby);
                                        }
                                    }
                                    // populate the child select with the options
                                    $("#" + v.selects[i].cascadeto).html("").append(opts);
                                }
                            }, function (sender, args) {
                                logit("Error getting data for child dropdown: " + args.get_message());
                            });
                        }
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

    function SaveContact() {
        $("#FormError").remove();
        $("input[title*='Directive']").removeAttr("disabled");
        v.errortext = "Please fill out the fields: ";
        var goon = true;
        
        if ($("input[title='Last Name Required Field']").val() === "") {
            goon = false;
            v.errortext += "Last Name, ";
        }

        if ($("input[title='First Name']").val() === "") {
            goon = false;
            v.errortext += "First Name, ";
        }

        if ($("input[title='Business Phone']").val() === "") {
            goon = false;
            v.errortext += "Work Phone, ";
        }

        if ($("input[title='Company']").val() === "") {
            goon = false;
            v.errortext += "Company, ";
        }

        if ($("input[title='E-Mail']").val() === "") {
            goon = false;
            v.errortext += "Email, ";
        }

        if (goon === true) {
            $(window).on('unload', function () {
                var returndata = [];
                returndata[0] = "AddContact";
                returndata[1] = "Contact Added";
                returndata[2] = v.action;
                SP.UI.ModalDialog.commonModalDialogClose(SP.UI.DialogResult.OK, returndata);
            });
            $("input[id*='SaveItem']").trigger('click');
        }
        else {
            var ehtml = "<li id='FormError' class='ms-cui-group' style='width: 400px; background-color: red;'>";
            ehtml += "<div class='container-fluid' style='padding: 36px; text-align: center; color: black; font-size: 16px;'>";
            var tp1 = v.errortext.substring(0, v.errortext.lastIndexOf(",") - 1);
            ehtml += tp1 + "</div></li>";
            $("ul[id='Ribbon.ListForm.Edit']").append(ehtml);
            v.errortext = "Please fill out the fields: ";
        }
    }

    function Cancel() {
        SP.UI.ModalDialog.commonModalDialogClose(SP.UI.DialogResult.cancel);
    }

    return {
        Init: Init,
        changeme: changeme
    }
}

SP.SOD.notifyScriptLoadedAndExecuteWaitingJobs('CEWP_Forms_NewContact2.js');