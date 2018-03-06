﻿var CKO = CKO || {};
CKO.AJAX = CKO.AJAX || {};
CKO.FORMS = CKO.FORMS || {};
CKO.FORMS.DIRECTIVES = CKO.FORMS.DIRECTIVES || {};
CKO.FORMS.DIRECTIVES.VARIABLES = CKO.FORMS.DIRECTIVES.VARIABLES || {};

CKO.FORMS.DIRECTIVES.VARIABLES = {
    newform: null,
    site: null,
    loc: String(window.location),
    waitmsg: null,
    title: null,
    ctx: null,
    web: null,
    list: null,
    listitem: null,
    html: "",
    tblinit: 0,
    user: null,
    userID: null,
    Org: null,
    directive: null
};

CKO.FORMS.DIRECTIVES.ViewForm = function () {

    var v = CKO.FORMS.DIRECTIVES.VARIABLES;

    function Init(site) {
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
        v.site = site;
        resizeModalDialog();
        loadCSS(site + '/SiteAssets/css/CEWP_Forms_DirectiveForms.css');
        loadCSS(site + '/SiteAssets/css/responsive.bootstrap.min.css');
        loadscript(site + '/SiteAssets/js/jquery.dataTables.min.js', function () {
            loadscript(site + '/SiteAssets/js/dataTables.bootstrap.min.js', function () {
                LoadData();
            });
        });
    }

    function LoadData() {
        resizeModalDialog(); // just to be sure!!
        $(".datafield").each(function (z) {
            var txt = $(this).text();
            txt = txt.replace(/\t/g, '');
            if ($(this).attr("data-field") === "Directive") {
                //org = org.replace(/\s/g, '');
                txt = txt.replace(/(\r\n|\n|\r)/gm, "");
                txt = txt.trim();
                v.directive = txt;
                logit("Directive: " + v.directive);
            }
            var field = $(this).attr("data-field");
            switch (field) {
                case "DirectiveDescription":
                    html = "<textarea rows='6' id='txt_" + z + "'></textarea>";
                    $(this).html("").append(html);
                    $("#txt_" + z).val(txt);
                    break;

                case "LeadComments":
                    html = "<textarea rows='6' id='txt_" + z + "'></textarea>";
                    $(this).html("").append(html);
                    $("#txt_" + z).val(txt);
                    break;

                default:
                    html = "<input type='text' id='txt_" + z + "' />";
                    $(this).html("").append(html);
                    $("#txt_" + z).val(txt);
                    break;
            }
        });

        $("input").addClass("form-control");
        $("select").addClass("form-control");
        $("textarea").addClass("form-control");

        v.userID = _spPageContextInfo.userId;

        // Load the Actions for this Directive on the Actions tab in a table
        var urlString = v.site + "/_vti_bin/listdata.svc/Actions?";
        urlString += "$select=Id,Title,EffortTypeValue,DateCompleted,PMTUser,Expended,ActionComments";
        urlString += "&$expand=PMTUser";
        urlString += "&$orderby=DateCompleted desc";
        urlString += "&$filter=(substringof('" + v.directive + "', Title)) and (EffortTypeValue eq 'Directive')";
        logit("urlString: " + urlString);

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
                logit("Actions Count: " + numitems);
                if (numitems > 0) {
                    // Build out the table to show the actions for this directive.
                    v.html += "<table id='tblActions' class='table table-bordered table-hover' cellspacing='0' cellpadding='0'>";
                    v.html += "<thead><tr><td class='thUser'>User</td><td class='thDate'>Date</td><td class='thHours'>Hours</td><td class='thComment'>Comment</td></tr></thead>";
                    v.html += "<tbody>";
                    for (var i = 0, length = j.length; i < length; i++) {
                        v.html += "<tr>";
                        v.html += "<td class='tdUser'>" + j[i]["PMTUser"]["Name"] + "</td>";
                        var a = moment(j[i]["DateCompleted"]);
                        v.html += "<td class='tdDate'>" + a.format("DD-MMM-YY") + "</td>";
                        v.html += "<td class='tdHours'>" + j[i]["Expended"] + "</td>";
                        v.html += "<td class='tdComment'>" + j[i]["ActionComments"] + "</td>";
                        v.html += "</tr>";
                    }
                    v.html += "</tbody></table>";
                    $("#tabActions").html("").append(v.html);
                }

                $(".ms-descriptiontext").hide();

                logit("Update Dropdowns complete.");
                var table = $("#tblActions").dataTable({
                    "scrollY": "500px",
                    "scrollCollapse": true,
                    "paging": false,
                    "searching": false,
                    "ordering": false
                });

                GetSkills();

                setTimeout(function () {
                    //table.columns.adjust().draw();
                    $(".thDate").click();
                    //$(".thUser").click();
                }, 4000);
            }
        });
    }

    function GetSkills() {
        logit("GetSkills Called");
        v.html = "";
        // v.directive = String($("input[title='Directive Required Field']").val());
        // Load the Skills for this Directive on the Skills tab in a table

        var inc = "Include(";
        var xml = "<View><Method Name='Read List' /><Query><OrderBy><FieldRef Name='Hours' /></OrderBy><Where><Eq><FieldRef Name='Directive' /><Value Type='Text'>" + v.directive + "</Value></Eq></Where></Query>";
        var fields = ["Directive", "Skill", "Hours"];
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
        xml += "</View>";

        $.when(CKO.CSOM.GetListItems.getitemsfilteredcomplex("current", "DirectiveSkills", xml, inc)).then(function (items) {
            if (items.get_count() > 0) { //get map data
                enumerator = items.getEnumerator();
                while (enumerator.moveNext()) {
                    var prop = enumerator.get_current();
                    var hours = parseInt(prop.get_item("Hours"));
                    var skill = prop.get_item("Skill");
                    skill = skill.split("|");
                    v.html += "<tr>";
                    v.html += "<td>" + skill[0] + "</td>";
                    v.html += "<td class='tdHours'>" + prop.get_item("Hours") + "</td>";
                    v.hours += hours;
                    v.html += "</tr>";
                }
                $("#tblSkillsBody").html("").append(v.html);
                $("#skilltotal").html("").append(v.hours);
            }
        }, function (sender, args) {
            logit("Error getting data from DirectiveSkills list : " + args.get_message());
        });
    }

    return {
        Init: Init
    };
};

SP.SOD.notifyScriptLoadedAndExecuteWaitingJobs('CEWP_Forms_ViewDirectiveForm.js');