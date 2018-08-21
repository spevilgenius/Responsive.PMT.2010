var CKO = CKO || {};
CKO.AJAX = CKO.AJAX || {};
CKO.FORMS = CKO.FORMS || {};
CKO.FORMS.TASKERS = CKO.FORMS.TASKERS || {};
CKO.FORMS.TASKERS.VARIABLES = CKO.FORMS.TASKERS.VARIABLES || {};

CKO.FORMS.TASKERS.VARIABLES = {
    taskTable: null,
    waitmsg: null,
    mostRecent: null,
    ockoNumber: null,
    catsNumber: null,
    catsID: $.QueryString["catsID"],
    actiondate: $.QueryString["Date"]
};

CKO.FORMS.TASKERS.NewForm = function () {

    var v = CKO.FORMS.TASKERS.VARIABLES;

    function Init(site) {
        logit("New Form Loaded ID=" + v.catsID);
        $("input[Title*='CATS Link']").val("https://hq.tradoc.army.mil/sites/cats/Lists/Taskers/CATS_DispForm.aspx?ID=" + v.catsID);

        //Get all the new CKO stuff from CATS 

        var urlString = "https://hq.tradoc.army.mil/sites/CATS/_vti_bin/listdata.svc/Taskers?$select=Id,ControlNumber,Orginator,ReceivedDate,SuspenseDate,TaskerName,TaskerLeads,CompletionStatusValue,TaskerAssists,TaskerInfo,Created,Modified&$filter=(Id eq " + v.catsID + ")";
        logit("NewTaskerForm urlString: " + urlString);
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

                v.catsNumber = j[0]["ControlNumber"];
                var catsCreated = moment(j[0]["Created"]).format("YYYY-MM-DD[T]HH:MM:SS");
                var catsModified = moment(j[0]["Modified"]).format("YYYY-MM-DD[T]HH:MM:SS");
                var catsSuspense = moment(j[0]["SuspenseDate"]).add(1, 'days').format("MM/DD/YYYY");
                logit("CATS Suspense: " + j[0]["SuspenseDate"] + ", Formatted: " + catsSuspense);
                var catsName = j[0]["TaskerName"];
                var lead = j[0]["TaskerLeads"];
                var assist = j[0]["TaskerAssists"];
                var info = j[0]["TaskerInfo"];
                var originator = j[0]["Orginator"];
                var requiredAction = j[0]["ActionRequired"];
                var LAItext = "Info";
                switch (true) {
                    case lead !== null && lead.indexOf("CKO") >= 0:
                        LAItext = "Lead";
                        break;

                    case assist !== null && assist.indexOf("CKO") >= 0:
                        LAItext = "Assist";
                        break;

                    case info !== null && info.indexOf("CKO") >= 0:
                        LAItext = "Info";
                        break;
                }

                //if (assist !== null) {
                //    if (assist.indexOf("CKO") > 0) {
                //        LAItext = "Assist";
                //    } else if (lead.indexOf("CKO") > 0) {
                //        LAItext = "Lead";
                //    }
                //}
                $("input[Title*='CATSControlNumber']").val(v.catsNumber);
                $("input[Title*='Subject']").val(catsName);
                $("input[title='CATS Suspense']").val(catsSuspense);
                $("input[Title*='catsID']").val(v.catsID);
                $("input[Title*='catsModified']").val(catsModified);
                $("input[Title*='catsCreated']").val(catsCreated);
                $("input[Title*='Required Action or Deliverable']").val(requiredAction);
                $("input[Title*='Source Originator']").val(originator);
                $("textarea[Title*='Task/Purpose']").text(LAItext);
                $("input[Title*='CATS Issued']").val(catsCreated.split("T")[0]);
                $("select[title*='Role'] option").each(function () {
                    tp1 = new String($(this).html());
                    if (tp1.indexOf(LAItext) >= 0) {
                        $(this).prop('selected', true);
                    }
                });
            }
        });

        //var CATSfields = "<ViewFields><FieldRef Name='Title' /><FieldRef Name='TaskerAssists' /><FieldRef Name='Orginator' /><FieldRef Name='ActionRequired' /><FieldRef Name='ID' /><FieldRef Name='TaskerName' /><FieldRef Name='TaskerInfo' /><FieldRef Name='TaskerLeads' /><FieldRef Name='SuspenseDate' /><FieldRef Name='Modified' /><FieldRef Name='Created' /></ViewFields>"
        //var CATSquery = "<Query><OrderBy><FieldRef Name='Created' /></OrderBy><Where><Eq><FieldRef Name='ID' /><Value Type='Counter'>" + v.catsID + "</Value></Eq></Where></Query>";
        //$().SPServices({
        //    operation: "GetListItems",
        //    async: false,
        //    webURL: "https://hq.tradoc.army.mil/sites/cats",
        //    listName: "Taskers",
        //    CAMLViewFields: CATSfields,
        //    CAMLQuery: CATSquery,
        //    completefunc: function (xData, Status) {
        //        $(xData.responseXML).SPFilterNode("z:row").each(function() {
        //            v.catsNumber = /undefined/.test($(this).attr("ows_Title")) ? "" : $(this).attr("ows_Title");
        //            var catsCreated = moment($(this).attr("ows_Created")).format("YYYY-MM-DD[T]HH:MM:SS");
        //            var catsModified = moment($(this).attr("ows_Modified")).format("YYYY-MM-DD[T]HH:MM:SS");
        //            var catsSuspense = moment($(this).attr("ows_SuspenseDate")).format("MM/DD/YYYY");
        //            var catsName =  /undefined/.test($(this).attr("ows_TaskerName")) ? "" : $(this).attr("ows_TaskerName");
        //            var lead = /undefined/.test($(this).attr("ows_TaskerLeads")) ? "" : $(this).attr("ows_TaskerLeads");
        //            var assist = /undefined/.test($(this).attr("ows_TaskerAssists")) ? "" : $(this).attr("ows_TaskerAssists");
        //            var info = /undefined/.test($(this).attr("ows_TaskerInfo")) ? "" : $(this).attr("ows_TaskerInfo");
        //            var originator = /undefined/.test($(this).attr("ows_Orginator")) ? "" : $(this).attr("ows_Orginator");
        //            var requiredAction = /undefined/.test($(this).attr("ows_ActionRequired")) ? "" : $(this).attr("ows_ActionRequired");
        //            var LAItext = "Info";
        //            if(assist.indexOf("CKO") > 0){
        //                LAItext = "Assist";
        //            }else if(lead.indexOf("CKO") > 0){
        //                LAItext = "Lead"
        //            }
        //            $("input[Title*='CATS Control Number']").val(v.catsNumber);
        //            $("input[Title*='Subject']").val(catsName);
        //            $("input[Title*='CATS Suspense']").val(catsSuspense);
        //            $("input[Title*='catsID']").val(v.catsID);
        //            $("input[Title*='catsModified']").val(catsModified);
        //            $("input[Title*='catsCreated']").val(catsCreated);
        //            $("input[Title*='Required Action or Deliverable']").val(requiredAction);
        //            $("input[Title*='Source Originator']").val(originator);
        //            $("textarea[Title*='Task/Purpose']").text(LAItext);
        //            $("input[Title*='CATS Issued']").val(catsCreated.split("T")[0]);
        //            $("select[title*='Role'] option").each(function () {
        //                tp1 = new String($(this).html());
        //                if (tp1.indexOf(LAItext) >= 0) {
        //                    $(this).prop('selected', true);
        //                }
        //            });
        //        });
        //    }
        //});
    }

    return {
        Init: Init
    };
};

SP.SOD.notifyScriptLoadedAndExecuteWaitingJobs('CEWP_Forms_NewTaskerForm.js');