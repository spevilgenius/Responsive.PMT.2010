var CKO = CKO || {};
CKO.SITENAV = CKO.SITENAV || {};

CKO.SITENAV.Nav = function () {

    function Init(site) {
        loadCSS(site + '/SiteAssets/css/webslidemenu.css');
        loadCSS(site + '/SiteAssets/css/font-awesome.min.css');

        $(".report").on("click", function (e) {
            e.preventDefault();
            var url = "https://hq.tradoc.army.mil/sites/OCKO/PMT/_layouts/ReportServer/RSViewerPage.aspx?rv:RelativeReportUrl=";
            url += $(this).attr("data-report");
            url += "&IsDlg=1";
            CKODialog(url, $(this).attr("data-title"), '1000', '800', 'NotificationCallback');
        });
    }

    return {
        Init: Init
    }
}

CKO.SITENAV.Nav().Init();