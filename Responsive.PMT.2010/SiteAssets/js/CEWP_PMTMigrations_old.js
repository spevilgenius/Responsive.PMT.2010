var CKO = CKO || {};
CKO.AJAX = CKO.AJAX || {};
CKO.MIGRATIONS = CKO.MIGRATIONS || {};
CKO.MIGRATIONS.VARIABLES = CKO.MIGRATIONS.VARIABLES || {};

CKO.MIGRATIONS.VARIABLES = {
    site: null,
    loc: String(window.location),
    waitmsg: null,
    title: null,
    ctx: null,
    total: 0,
    count: 0,
    web: null,
    list: null,
    data: null,
    json: null,
    standards: [],
    directives: [],
    actions: [],
    goon: false,
    listitem: null,
    user: null,
    userID: null,
    qry: null,
    ThisFY: null,
    html: ""
};

CKO.MIGRATIONS.Migrate = function () {

    var v = CKO.MIGRATIONS.VARIABLES;

    function Init(site) {
        logit("PMT Migrations loaded.");
        var userId = _spPageContextInfo.userId;
        //$('#txtFrom').datepicker();
        //$('#txtTo').datepicker();
        v.data = [];
        v.json = null;
        //logit("_spPageContextInfo.webServerRelativeUrl: " + _spPageContextInfo.webServerRelativeUrl);
        $("#btnUpdateDirectives").click(function () {
            $().SPSTools_Notify({ type: 'wait', content: 'Updating Directives...Please wait...' });
            logit("Button clicked");
            UpdateDirectives();
        });
        $("#btnUpdateStandards").click(function () {
            $().SPSTools_Notify({ type: 'wait', content: 'Updatating Standards...Please wait...' });
            logit("Button clicked");
            UpdateStandards();
        });
        $("#btnUpdateActions").click(function () {
            $().SPSTools_Notify({ type: 'wait', content: 'Updating Actions...Please wait...' });
            UpdateActions();
        });
        $("#btnTermsetTest").click(function () {
            $().SPSTools_Notify({ type: 'wait', content: 'Getting Terms...Please wait...' });
            var requestdata = {};
            requestdata.termstoreid = '0f9c5a00-81d6-4d7b-97c4-19319874f189';
            requestdata.termsetid = 'f328c390-ef0c-4084-9b50-2b43b411a6f5';

            getChildTermsInTermSetWithPaging('0f9c5a00-81d6-4d7b-97c4-19319874f189', '5a1e4490-d530-4ae1-85e7-b41cf145f345').success(getChildTermsInTermSetWithPagingSuccess.bind(requestdata)).error(getChildTermsInTermSetWithPagingFail.bind(requestdata));
        });
        //CKO.CSOM.TERMSETS.TermSetDialog(v.site, 'Skill', 'f328c390-ef0c-4084-9b50-2b43b411a6f5', '0f9c5a00-81d6-4d7b-97c4-19319874f189', 'SkillDiv1', 'SkillDiv2', 'Skill', 'fb4c596c-1a92-4c03-bff8-a2d987e2a044');
    }

    function UpdateDirectives() {
        var userId = _spPageContextInfo.userId;
        var urlString = "https://hq.tradoc.army.mil/sites/OCKO/PMT/_vti_bin/listdata.svc/Directives?";
        urlString += "$select=Id,Directive";

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
                var numitems = data.d.results.length;
                logit("Directives Count: " + numitems);
                var updateitems = [];
                ctx = SP.ClientContext.get_current();
                list = ctx.get_web().get_lists().getByTitle("Directives"); //Using this until proof it works
                for (var i = 0, length = j.length; i < length; i++) {
                    var id = j[i]["Id"];
                    var item = list.getItemById(id);
                    item.set_item('ParentID', "DIR" + id);
                    item.update();
                    updateitems[i] = item;
                    ctx.load(updateitems[i]);
                }
                ctx.executeQueryAsync(UpdateDirectivesSucceeded, UpdateDirectivesFailed);
            }
        });
    }

    function GetAllDirectives() {
        v.directives = [];
        var urlString = "https://hq.tradoc.army.mil/sites/OCKO/PMT/_vti_bin/listdata.svc/Directives?$select=Id,Directive,ParentID";

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
                logit("Directives Count: " + j.length);

                for (var i = 0; i < j.length; i++) {
                    v.directives.push({
                        "id": j[i]["Id"],
                        "directive": j[i]["Directive"],
                        "ParentID": j[i]["ParentID"]
                    });
                }
                GetAllStandards();
            }
        });
    }

    function UpdateStandards() {
        var userId = _spPageContextInfo.userId;
        var urlString = "https://hq.tradoc.army.mil/sites/OCKO/PMT/_vti_bin/listdata.svc/Standards?";
        urlString += "$select=Id,Standard";

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
                var numitems = data.d.results.length;
                logit("Standard Count: " + numitems);
                var updateitems = [];
                ctx = SP.ClientContext.get_current();
                list = ctx.get_web().get_lists().getByTitle("Standards");
                for (var i = 0; i < j.length; i++) {
                    var id = j[i]["Id"];
                    var item = list.getItemById(id);
                    item.set_item('ParentID', "STD" + id);
                    item.update();
                    updateitems[i] = item;
                    ctx.load(updateitems[i]);
                }
                ctx.executeQueryAsync(UpdateStandardsSucceeded, UpdateStandardsFailed);
            }
        });
    }

    function GetAllStandards() {
        v.standards = [];
        var urlString = "https://hq.tradoc.army.mil/sites/OCKO/PMT/_vti_bin/listdata.svc/Standards?$select=Id,Standard,ParentID";

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
                logit("Standards Count: " + j.length);

                for (var i = 0; i < j.length; i++) {
                    v.standards.push({
                        "id": j[i]["Id"],
                        "standard": j[i]["Standard"],
                        "ParentID": j[i]["ParentID"]
                    });
                }
                v.goon = true;
                GetAllActions(null);
            }
        });
    }

    function UpdateActions() {
        if (v.goon === false) {
            GetAllDirectives();
        }
    }

    function GetAllActions(zurl) {
        if (zurl === null) {
            var urlString = "https://hq.tradoc.army.mil/sites/OCKO/PMT/_vti_bin/listdata.svc/Actions?";
            urlString += "$select=Id,Title,DateCompleted,ParentID";
            urlString += "&$filter=";
            urlString += "(DateCompleted ge datetime'" + moment($("#txtFrom").val()).format('YYYY-MM-DD[T]HH:MM:[00Z]') + "') and (DateCompleted le datetime'" + moment($("#txtTo").val()).format('YYYY-MM-DD[T]HH:MM:[00Z]') + "')";
            zurl = urlString;
        }
        logit("URL: " + zurl);

        jQuery.ajax({
            url: zurl,
            method: "GET",
            headers: { 'accept': 'application/json; odata=verbose' },
            error: function (jqXHR, textStatus, errorThrown) {
                //to do implement logging to a central list
                logit("Error Status: " + textStatus + ":: errorThrown: " + errorThrown);
            },
            success: function (data) {
                v.data = v.data.concat(data.d.results);
                if (data.d.__next) {
                    zurl = data.d.__next;
                    GetAllActions(zurl);
                }
                else {
                    var results = v.data;
                    v.json = jQuery.parseJSON(JSON.stringify(results));
                    AllActionsLoaded();
                }
            }
        });
    }

    function AllActionsLoaded() {
        var j = v.json;
        
        for (var i = 0; i < j.length; i++) {
            var pid = null;
            for (k = 0; k < v.standards.length; k++) {
                if (v.standards[k]["standard"] === j[i]["Title"]) {
                    pid = v.standards[k]["ParentID"];
                }
            }
            for (k = 0; k < v.directives.length; k++) {
                if (v.directives[k]["directive"] === j[i]["Title"]) {
                    pid = v.directives[k]["ParentID"];
                }
            }
            if (pid === null) {
                $("#txtResults").append("\r\n" + "Action ID:" + j[i]["Id"] + " -- Does not have a direct standard/directive match. ");
            }
            else {
                if (j[i]["ParentID"] === undefined || j[i]["ParentID"] === null) {
                    v.actions.push({
                        "id": j[i]["Id"],
                        "ParentID": pid
                    });
                }
            }
        }
        logit(v.actions.length + " actions added to actions array.");
        $("#txtResults").append("\r\n" + v.actions.length + " actions added to actions array.");
        v.total = v.actions.length;

        // Now need to update all the actions to include their ParentID

        for (i = 0; i < v.actions.length; i++) {
            var getitemdata = {};
            getitemdata.itemId = v.actions[i]["id"];
            getitemdata.ParentID = v.actions[i]["ParentID"];
            getActionItemById("https://hq.tradoc.army.mil/sites/OCKO/PMT", "Actions", v.actions[i]["id"]).success(getActionItemByIdSuccess.bind(getitemdata));
        }

        $("#SPSTools_Notify").fadeOut("2500", function () {
            $("#SPSTools_Notify").html("");
        });
    }

    function getChildTermsInTermSetWithPaging(termstoreid, termsetid) {
        var qry = {
            lcid: 1033,
            sspId: termstoreid,
            guid: termsetid,
            includeDeprecated: false,
            pageLimit: 1000,
            pagingForward: false,
            includeCurrentChild: false,
            currentChildId: "00000000-0000-0000-0000-000000000000",
            webId: "00000000-0000-0000-0000-000000000000",
            listId: "00000000-0000-0000-0000-000000000000"
        }

        return $.ajax({
            url: fixurl2("/_vti_bin/TaxonomyInternalService.json/GetChildTermsInTermSetWithPaging"),
            type: "POST",
            processData: false,
            data: JSON.stringify(qry),
            headers: {
                "Accept": "application/json;odata=verbose",
                "content-type": "application/json;odata=verbose"
            }
        });
    }

    function getChildTermsInTermSetWithPagingSuccess(data) {
        $("#txtResults").append("\r\n" + data);
        $("#SPSTools_Notify").fadeOut("2500", function () {
            $("#SPSTools_Notify").html("");
        });
    }

    function getChildTermsInTermSetWithPagingFail(jqXHR, textStatus, errorThrown) {
        $("#txtResults").append("Getting Data Failed.\r\n" + textStatus + "\r\n" + errorThrown);
        $("#SPSTools_Notify").fadeOut("2500", function () {
            $("#SPSTools_Notify").html("");
        });
    }

    function getActionItemById(webUrl, listName, itemId) {
        var url = webUrl + "/_vti_bin/listdata.svc/" + listName + "(" + itemId + ")";

        return $.ajax({
            url: url,
            method: "GET",
            headers: { "Accept": "application/json; odata=verbose" }
        });
    }

    function getActionItemByIdSuccess(data) {
        var getitemdata = this;
        var updateitemdata = {};
        updateitemdata.itemId = getitemdata.itemId;
        updateitemdata.ParentID = getitemdata.ParentID;
        updateitemdata.url = data.d.__metadata.uri;
        updateitemdata.etag = data.d.__metadata.etag;
        var itemprops = {
            "ParentID": updateitemdata.ParentID
        };
        // now we can update the item with the parent id
        updateActionItem("https://hq.tradoc.army.mil/sites/OCKO/PMT", "Actions", updateitemdata.itemId, itemprops, updateitemdata.url, updateitemdata.etag).success(updateActionItemSuccess.bind(updateitemdata));
    }

    function updateActionItem(webUrl, listName, itemId, itemProperties, url, tag) {
        var itemprops = JSON.stringify(itemProperties);
        return $.ajax({
            type: 'POST',
            url: url,
            contentType: 'application/json',
            processData: false,
            headers: {
                "Accept": "application/json;odata=verbose",
                "X-HTTP-Method": "MERGE",
                "If-Match": tag
            },
            data: JSON.stringify(itemProperties)
        });
    }

    function updateActionItemSuccess(data) {
        var updateitemdata = this;
        v.count += 1;
        $("#txtResults").append("\r\n" + "Item " + v.count + " -- Action " + updateitemdata.itemId + " updated with ParentID " + updateitemdata.ParentID);
    }

    function UpdateDirectivesSucceeded() {
        $("#SPSTools_Notify").fadeOut("2500", function () {
            $("#SPSTools_Notify").html("");
        });
    }

    function UpdateDirectivesFailed(sender, args) {
        $("#SPSTools_Notify").fadeOut("2500", function () {
            $("#SPSTools_Notify").html("");
        });
        logit("Update Directives Failed: " + args.get_message());
        return false;
    }

    function UpdateStandardsSucceeded() {
        $("#SPSTools_Notify").fadeOut("2500", function () {
            $("#SPSTools_Notify").html("");
        });
    }

    function UpdateStandardsFailed(sender, args) {
        $("#SPSTools_Notify").fadeOut("2500", function () {
            $("#SPSTools_Notify").html("");
        });
        logit("Update Standards Failed: " + args.get_message());
        return false;
    }

    return {
        Init: Init
    };
};

SP.SOD.notifyScriptLoadedAndExecuteWaitingJobs("CEWP_PMTMigrations.js");