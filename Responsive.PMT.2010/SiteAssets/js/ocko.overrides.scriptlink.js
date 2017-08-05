ExecuteOrDelayUntilScriptLoaded(function () {
    var site = L_Menu_BaseUrl;
    SP.SOD.registerSod('iefixes.js', site + "/SiteAssets/js/iefixes.js");
    SP.SOD.registerSod('ocko.overrides.js', site + "/SiteAssets/js/ocko.overrides.js");
    SP.SOD.executeFunc("ocko.overrides.js", null, function () {
        OCKO.OVERRIDES().initialize();
    });
}, "sp.js");