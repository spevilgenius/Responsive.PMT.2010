var CKO = CKO || {};
CKO.SITENAV = CKO.SITENAV || {};

CKO.SITENAV.Nav = function () {

    function Init(site) {
        loadCSS(site + '/SiteAssets/css/webslidemenu.css');
        loadCSS(site + '/SiteAssets/css/font-awesome.min.css');
    }

    return {
        Init: Init
    }
}

CKO.SITENAV.Nav().Init();