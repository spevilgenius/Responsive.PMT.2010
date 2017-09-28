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
}

CKO.FORMS.TASKERS.NewForm = function () {

    var v = CKO.FORMS.TASKERS.VARIABLES;

    function Init(site) {
        logit("New Form Loaded ID=" + v.catsID);
        $("input[Title*='CATS Link']").val("https://hq.tradoc.army.mil/sites/cats/Lists/Taskers/CATS_DispForm.aspx?ID=" + v.catsID);
		
        //Get all the new CKO stuff from CATS 
        var CATSfields = "<ViewFields><FieldRef Name='Title' /><FieldRef Name='TaskerAssists' /><FieldRef Name='Orginator' /><FieldRef Name='ActionRequired' /><FieldRef Name='ID' /><FieldRef Name='TaskerName' /><FieldRef Name='TaskerInfo' /><FieldRef Name='TaskerLeads' /><FieldRef Name='SuspenseDate' /><FieldRef Name='Modified' /><FieldRef Name='Created' /></ViewFields>"
        var CATSquery = "<Query><OrderBy><FieldRef Name='Created' /></OrderBy><Where><Eq><FieldRef Name='ID' /><Value Type='Counter'>" + v.catsID + "</Value></Eq></Where></Query>";
        $().SPServices({
            operation: "GetListItems",
            async: false,
            webURL: "https://hq.tradoc.army.mil/sites/cats",
            listName: "Taskers",
            CAMLViewFields: CATSfields,
            CAMLQuery: CATSquery,
            completefunc: function (xData, Status) {
                $(xData.responseXML).SPFilterNode("z:row").each(function() {
                    v.catsNumber = /undefined/.test($(this).attr("ows_Title")) ? "" : $(this).attr("ows_Title");
                    //var catsCreated = $().SPHelper.DateFormat($(this).attr("ows_Created"), "isoDateTime");
                    var catsCreated = moment($(this).attr("ows_Created")).format("YYYY-MM-DD[T]HH:MM:SS");
                    //var catsModified = $().SPHelper.DateFormat($(this).attr("ows_Modified"), "isoDateTime");
                    var catsModified = moment($(this).attr("ows_Modified")).format("YYYY-MM-DD[T]HH:MM:SS");
                    //var catsSuspense = $().SPHelper.DateFormat($(this).attr("ows_SuspenseDate"), "shortDate");
                    var catsSuspense = moment($(this).attr("ows_Modified")).format("MM/DD/YYYY");
                    var catsName =  /undefined/.test($(this).attr("ows_TaskerName")) ? "" : $(this).attr("ows_TaskerName");
                    var lead = /undefined/.test($(this).attr("ows_TaskerLeads")) ? "" : $(this).attr("ows_TaskerLeads");
                    var assist = /undefined/.test($(this).attr("ows_TaskerAssists")) ? "" : $(this).attr("ows_TaskerAssists");
                    var info = /undefined/.test($(this).attr("ows_TaskerInfo")) ? "" : $(this).attr("ows_TaskerInfo");
                    var originator = /undefined/.test($(this).attr("ows_Orginator")) ? "" : $(this).attr("ows_Orginator");
                    var requiredAction = /undefined/.test($(this).attr("ows_ActionRequired")) ? "" : $(this).attr("ows_ActionRequired");
                    var LAItext = "Info";
                    if(assist.indexOf("CKO") > 0){
                        LAItext = "Assist";
                    }else if(lead.indexOf("CKO") > 0){
                        LAItext = "Lead"
                    }
                    $("input[Title*='CATS Control Number']").val(v.catsNumber)
                    $("input[Title*='Subject']").val(catsName)
                    $("input[Title*='CATS Suspense']").val(catsSuspense)
                    $("input[Title*='catsID']").val(v.catsID)
                    $("input[Title*='catsModified']").val(catsModified)
                    $("input[Title*='catsCreated']").val(catsCreated)
                    $("input[Title*='Required Action or Deliverable']").val(requiredAction)
                    $("input[Title*='Source Originator']").val(originator)
                    $("textarea[Title*='Task/Purpose']").text(LAItext)
                    $("input[Title*='CATS Issued']").val(catsCreated.split("T")[0])
                });
            }
        });
    }

    return {
        Init: Init
    }
}

SP.SOD.notifyScriptLoadedAndExecuteWaitingJobs('CEWP_Forms_NewTaskerForm.js');