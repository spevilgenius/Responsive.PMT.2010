var CKO = CKO || {};
CKO.AJAX = CKO.AJAX || {};
CKO.DASHBOARD = CKO.DASHBOARD || {};

CKO.DASHBOARD.Legend = function () {

    function Init(site) {
        loadCSS(site + '/SiteAssets/css/CEWP_Dashboard_Legend.css');
    }

    return {
        Init: Init
    }
}

SP.SOD.notifyScriptLoadedAndExecuteWaitingJobs('CEWP_Dashboard_Legend.js');