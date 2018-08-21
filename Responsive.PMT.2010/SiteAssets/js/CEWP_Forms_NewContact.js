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
    action: jQuery.QueryString["Action"],
    directive: jQuery.QueryString["Directive"]
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
        Init: Init
    }
}

SP.SOD.notifyScriptLoadedAndExecuteWaitingJobs('CEWP_Forms_NewContact.js');