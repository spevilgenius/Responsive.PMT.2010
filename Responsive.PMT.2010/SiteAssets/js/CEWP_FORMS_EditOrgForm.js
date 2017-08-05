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
    userID = _spPageContextInfo.userId;
    console.log("userID = " + userID);
}

SP.SOD.notifyScriptLoadedAndExecuteWaitingJobs('CEWP_FORMS_EditOrgForm.js');