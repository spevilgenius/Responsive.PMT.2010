var CKO = CKO || {};
CKO.SITENAV = CKO.SITENAV || {};

CKO.SITENAV.Nav = function () {

    function Init() {
        var SLASH = "/";
        var tp1 = new String(window.location.protocol);
        var tp2 = new String(window.location.host);
        var tp3 = L_Menu_BaseUrl;
        var site = tp1 + SLASH + SLASH + tp2 + tp3;

        $(".report").on("click", function (e) {
            e.preventDefault();
            var url = site + "/_layouts/ReportServer/RSViewerPage.aspx?rv:RelativeReportUrl=";
            url += $(this).attr("data-report");
            window.open(url, "_blank", "menubar=yes,toolbar=yes,width=1000,height=800,resizable=yes", false);
            //url += "&IsDlg=1";
            //CKODialog(url, $(this).attr("data-title"), '1000', '800', 'NotificationCallback');
        });
    }

    return {
        Init: Init
    }
}

CKO.SITENAV.Nav().Init();