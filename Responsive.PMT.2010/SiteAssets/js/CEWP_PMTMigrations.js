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
    url: null,
    goon: false,
    listitems: null,
    user: null,
    userID: null,
    items: [],
    qry: null,
    terms: [],
    actions: [],
    html: ""
};

CKO.MIGRATIONS.Migrate = function () {

    var v = CKO.MIGRATIONS.VARIABLES;

    function Init(site) {
        v.site = site;
        logit("PMT Migrations loaded.");
        var userId = _spPageContextInfo.userId;
        $('#txtFrom').datepicker();
        $('#txtTo').datepicker();
        v.data = [];
        v.json = null;
        logit("_spPageContextInfo.webServerRelativeUrl: " + _spPageContextInfo.webServerRelativeUrl);
        v.url = _spPageContextInfo.webServerRelativeUrl;
        $("#btnTermsetTest").click(function () {
            //$().SPSTools_Notify({ type: 'wait', content: 'Getting Terms...Please wait...' });
            var requestdata = {};
            requestdata.termstoreid = '0f9c5a00-81d6-4d7b-97c4-19319874f189';
            requestdata.termsetid = '9f921997-cab1-47fd-9eb4-cb775840fdf6'; //Skills

            //getChildTermsInTermSetWithPaging(requestdata.termstoreid, requestdata.termsetid).success(getChildTermsInTermSetWithPagingSuccess.bind(requestdata)).error(getChildTermsInTermSetWithPagingFail.bind(requestdata));

            $.fn.SPSTools_TermSetDialog({
                title: 'Select Skill',
                termstoreid: requestdata.termstoreid,
                termsetid: requestdata.termsetid,
                weburl: _spPageContextInfo.webServerRelativeUrl,
                callback: function (result) {
                    $("#txtResults").append("\r\n" + result + " selected.");
                }
            });
        });

        $("#btnCsomTest").click(function () {
            LoadItems();
        });

        $("#btnArchive").click(function () {
            $().SPSTools_Notify({ type: 'wait', content: 'Archiving actions...Please wait...' });
            LoadActions(null);
        });
    }

    function LoadActions(zurl) {
        if (zurl === null) {
            var urlString = v.site + "/_vti_bin/listdata.svc/Actions?";
            urlString += "$select=Id,DateCompleted";
            //urlString += "&$filter=(DateCompleted le datetime'" + moment().subtract(90, 'days').format('YYYY-MM-DD[T]HH:MM:[00Z]') + "')";
            urlString += "&$filter=(DateCompleted ge datetime'" + moment($("#txtFrom").val()).format('YYYY-MM-DD[T]HH:MM:[00Z]') + "') and (DateCompleted le datetime'" + moment($("#txtTo").val()).format('YYYY-MM-DD[T]HH:MM:[00Z]') + "')";
            zurl = urlString;
        }

        jQuery.ajax({
            url: zurl,
            method: "GET",
            headers: { 'accept': 'application/json; odata=verbose' },
            error: function (jqXHR, textStatus, errorThrown) {
                //to do implement logging to a central list
                logit("Migration: Error Status: " + textStatus + ":: errorThrown: " + errorThrown);
            },
            success: function (data) {
                v.data = v.data.concat(data.d.results);
                if (data.d.__next) {
                    LoadActions(data.d.__next);
                }
                else {
                    var results = v.data;
                    v.json = jQuery.parseJSON(JSON.stringify(results));
                    ActionsLoaded();
                }
            }
        });
    }

    function ActionsLoaded() {
        var j = v.json;
        v.total = j.length;
        for (i = 0; i < j.length; i++) {
            v.actions.push({
                id: j[i]["Id"],
            });
        }
        $("#txtResults").append("\r\n" + v.actions.length + " Actions Loaded.");
        UpdateActions();
    }

    function UpdateActions() {
        for (i = 0; i < v.actions.length; i++) {
            var getitemdata = {};
            getitemdata.itemId = v.actions[i]["id"];
            GetActionItemById(v.actions[i]["id"]).success(GetActionItemByIdSuccess.bind(getitemdata));
        }        
    }

    GetActionItemById = function (itemId) {
        var url = "https://hq.tradoc.army.mil/sites/OCKO/PMT/_vti_bin/listdata.svc/Actions(" + itemId + ")";
        return $.ajax({
            url: url,
            method: "GET",
            headers: { "Accept": "application/json; odata=verbose" }
        });
    };

    GetActionItemByIdSuccess = function (data) {
        var getitemdata = this;
        var updateitemdata = {};
        updateitemdata.itemId = getitemdata.itemId;
        updateitemdata.url = data.d.__metadata.uri;
        updateitemdata.etag = data.d.__metadata.etag;
        var itemprops = {
            "Archive": true
        };
        UpdateActionItem(itemprops, updateitemdata.url, updateitemdata.etag).success(UpdateActionItemSuccess.bind(updateitemdata)).fail(UpdateActionItemFail.bind(updateitemdata));
    };

    UpdateActionItem = function (itemProperties, url, tag) {
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

    UpdateActionItemSuccess = function (data) {
        var updateitemdata = this;
        //$("#txtResults").append("\r\nWorkflow Started on Item ID " + updateitemdata.itemId);
        v.count += 1;
        $("#txtResults").append("\r\n" + "Item " + v.count + " -- Action " + updateitemdata.itemId + " updated with Archive flag.");
        if (v.count === v.total) {
            $("#txtResults").append("\r\nActions Archived.");
            $("#SPSTools_Notify").fadeOut("2500", function () {
                $("#SPSTools_Notify").html("");
            });
        }
    }

    UpdateActionItemFail = function (data) {
        var updateitemdata = this;
    }

    function StartWorkflow(params) {

        params.after = params.after || (function () { });
        if (!params.workflowName) { alert("Please provide the workflow name!"); return; }

        $().SPServices({
            operation: "GetTemplatesForItem",
            item: window.location.protocol + "//" + window.location.host + v.url + "/Lists/Actions/" + params.itemID + "_.000",
            async: true,
            completefunc: function (xData, Status) {
                var currentItemURL = this.item;
                $(xData.responseXML).find("WorkflowTemplates > WorkflowTemplate").each(function (i, e) {
                    if ($(this).attr("Name") == params.workflowName) {
                        var guid = $(this).find("WorkflowTemplateIdSet").attr("TemplateId");
                        $("#txtResults").append("\r\nStarting Workflow " + guid + " on Item.");
                        if (guid != null) {
                            workflowGUID = "{" + guid + "}";
                            var workflowParameters = "<root />";
                            $().SPServices({
                                operation: "StartWorkflow",
                                item: currentItemURL,
                                templateId: workflowGUID,
                                workflowParameters: workflowParameters,
                                async: true,
                                completefunc: params.after
                            });
                        }
                    }
                });
            }
        });
    }

    function LoadItems() {

        var inc = "Include(";
        var xml = "<View><Method Name='Read List' /><Query><OrderBy><FieldRef Name='ID' /></OrderBy>";
        //xml += "<Where><And><Gt><FieldRef Name='ID'></FieldRef><Value Type='Number'>0</Value></Gt>";
        //xml += "<Lt><FieldRef Name='ID'></FieldRef><Value Type='Number'>8000</Value></Lt></And></Where>";
        xml += "</Query >";
        var fields = ["Title", "Expended", "DateCompleted", "EffortType", "Function", "Skill"];
        xml += "<ViewFields>";
        for (var z = 0; z <= fields.length - 1; z++) {
            xml += "<FieldRef Name='" + fields[z] + "'/>";
            if (z === fields.length - 1) {
                inc += fields[z] + ")";
            }
            else {
                inc += fields[z] + ", ";
            }
        }
        xml += "<FieldRef Name='ID'/>";
        xml += "</ViewFields>";
        xml += "<RowLimit>2000</RowLimit></View>";

        v.ctx = new SP.ClientContext.get_current();
        v.list = v.ctx.get_web().get_lists().getByTitle("Actions");
        v.qry = new SP.CamlQuery();
        v.qry.set_viewXml(xml);
        v.listitems = v.list.getItems(v.qry);
        v.ctx.load(v.listitems);
        v.ctx.executeQueryAsync(LoadItemsSucceeded, LoadItemsFailed);
    };

    function LoadItemsSucceeded() {
        var enumerator = v.listitems.getEnumerator();
        while (enumerator.moveNext()) {
            var item = enumerator.get_current();
            v.items.push({
                title: item.get_item("Title")//,
                //skill: item.get_item("Skill")
            });
            var skill = item.get_item("Skill");
            if (skill !== null) {
                $("#txtResults").append("\r\nSkill:" + skill.split("|")[0]);
            }
        }
        var position = v.listitems.get_listItemCollectionPosition();
        if (position !== null) {
            v.qry.set_listItemCollectionPosition(position);
            v.listitems = v.list.getItems(v.qry);
            v.ctx.load(v.listitems);
            v.ctx.executeQueryAsync(LoadItemsSucceeded, LoadItemsFailed);
        }
        else {
            AllActionsLoaded();
        }
    }

    function LoadItemsFailed(sender, args) {
        logit("Error getting data from Actions list : " + args.get_message());
    }

    function AllActionsLoaded() {
        $("#txtResults").append("\r\n" + v.items.length + " Actions Loaded.");
        logit("All actions loaded");
    }
    /*
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
    */
    return {
        Init: Init
    };
};

SP.SOD.notifyScriptLoadedAndExecuteWaitingJobs("CEWP_PMTMigrations.js");