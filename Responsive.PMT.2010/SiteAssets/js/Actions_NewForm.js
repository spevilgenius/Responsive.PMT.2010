var _select = {};
var _list = {};
	_list["Directive"] =  $().SPHelper.GetListGUID({ list: "Directives" });
	_list["Standard"] = $().SPHelper.GetListGUID({ list: "Standards" });
	_list["Org"] =  $().SPHelper.GetListGUID({ list: "LU_Organizations" });
	_list["SubOrg"] = $().SPHelper.GetListGUID({ list: "LU_SubOrganizations" });
	_list["PMTOrg"] = $().SPHelper.GetListGUID({ list: "PMT_Organizations" });
var _listQuery = {};
//_listQuery["default"] = "<Query><OrderBy><FieldRef Name='Title' Ascending = 'TRUE'/></OrderBy><Where><Or><Or><Or><Eq><FieldRef Name='WB_Status'/><Value Type='Text'>InProgress</Value></Eq><Eq><FieldRef Name='WB_Status'/><Value Type='Text'>Complete</Value></Eq></Or><Eq><FieldRef Name='WB_Status'/><Value Type='Text'>Pending</Value></Eq></Or><Eq><FieldRef Name='WB_Status'/><Value Type='Text'>Ongoing</Value></Eq></Or></Where></Query>";
_listQuery["standards"] = "<Query><OrderBy><FieldRef Name='Title' Ascending = 'TRUE'/></OrderBy><Where><Eq><FieldRef Name='WB_Status'/><Value Type='Text'>Ongoing</Value></Eq></Where></Query>";
_listQuery["default"] = "<Query><OrderBy><FieldRef Name='Title' Ascending = 'TRUE'/></OrderBy><Where><Or><Eq><FieldRef Name='WB_Status'/><Value Type='Text'>InProgress</Value></Eq><Eq><FieldRef Name='WB_Status'/><Value Type='Text'>Complete</Value></Eq></Or></Where></Query>";
var _listViewFields = {};
	_listViewFields["default"] = "<ViewFields><FieldRef Name='ID' /><FieldRef Name='Title' /></ViewFields>";
	_listViewFields["related"] = "<ViewFields><FieldRef Name='ID' /><FieldRef Name='Title' /><FieldRef Name='Task' /><FieldRef Name='LU_Organization' /><FieldRef Name='LU_SubOrganization' /><FieldRef Name='MOEQualitative' /><FieldRef Name='MOEQuantitative' /><FieldRef Name='OBJAlignment' /><FieldRef Name='OBJAlignment_x003a_Authority' /><FieldRef Name='OBJAlignment_x003a_Reference' /><FieldRef Name='SPTAlignment' /><FieldRef Name='SPTAlignment_x003a_ParaLine' /><FieldRef Name='SPTAlignment_x003a_Reference' /><FieldRef Name='SPTAlignmentMulti' /><FieldRef Name='PMTOrganization'/></ViewFields>";

var _listMapping = {};
	_listMapping["default"] = {
		ows_ID: {mappedName: "ID", objectType: "Counter"},			
		ows_Title: {mappedName: "Title", objectType: "Text"}
	};
	_listMapping["related"] = {
		ows_ID: {mappedName: "ID", objectType: "Counter"},			
		ows_Title: {mappedName: "Title", objectType: "Text"},
		ows_Task: {mappedName: "Task", objectType: "Text"},
		ows_MOEQualitative: {mappedName: "MOEQual", objectType: "Text"},
		ows_MOEQuantitative: {mappedName: "MOEQuan", objectType: "Text"},
		ows_OBJAlignment: {mappedName: "OBJAlignment", objectType: "Text"},
		ows_OBJAlignment_x003a_Authority: {mappedName: "OBJAuth", objectType: "Text"},
		ows_OBJAlignment_x003a_Reference: {mappedName: "OBJRef", objectType: "Text"},
		ows_SPTAlignment: {mappedName: "SPTAlignment", objectType: "Text"},
		ows_SPTAlignment_x003a_ParaLine: {mappedName: "SPTParaLine", objectType: "Text"},
		ows_SPTAlignment_x003a_Reference: {mappedName: "SPTRef", objectType: "Text"},
		ows_SPTAlignmentMulti: {mappedName: "SPTMulti", objectType: "Text"},
		ows_LU_Organization: {mappedName: "Org", objectType: "Text"},
		ows_LU_SubOrganization: {mappedName: "SubOrg", objectType: "Text"},
		ows_PMTOrganization: {mappedName: "PMTOrg", objectType: "Lookup"}
	};

var URLDate = null;
var Effort = null;
var EffortType = "";
var EffortID = "0";
var Testing = "0";
	
$(document).ready(function(){
	$().SPHelper.FixRequired();
	$().SPHelper.debug(_thisUser);
	
	//Variables for Auto Populating the Date
	//Format of passed value: 2015-01-01
	//--- NEW Form ONLY ---	
	var qVals = $().SPServices.SPGetQueryString();
	URLDate = qVals.CompleteDate;
	Effort = qVals.Effort;
	Testing = qVals.Testing;
	

	_select["Directive"] =  $("select[title='Directive']");
	_select["Standard"] = $("select[title='Standard']");
	


	try{
		if(!(/undefined/.test(window.frameElement.dialogArgs.Testing))){
			if(window.frameElement.dialogArgs.Testing == "1"){
				$("#trTesting").show();
			}else{
				$("#trTesting").hide();
			}
		}else{
			if(!(/undefined/.test(Testing))){
				if(Testing == "1"){
					$("#trTesting").show();
				}else{
					$("#trTesting").hide();
				}
			}else{
				throw "No data provided in URL";
			}
		}	
	}catch(e){
		$().SPHelper.debug(e,3);	
		testDebug(e);
	}
	
	try{
	
		if(!(/undefined/.test(window.frameElement.dialogArgs.CompleteDate))){
			URLDate = window.frameElement.dialogArgs.CompleteDate;
			$("input[title*='Completed Date']").val($().SPHelper.DateFormat((URLDate + " 00:00:00"),"shortDate"));
		}else{
			if(!(/undefined/.test(URLDate))){
				$("input[title*='Completed Date']").val($().SPHelper.DateFormat((URLDate + " 00:00:00"),"shortDate"));
			}else{
				throw "No data provided in URL";
			}
		}
		testDebug(URLDate);
	
	}catch(e){
		$().SPHelper.debug(e,3);	
		testDebug(e);
	}


	try{
		if(!(/undefined/.test(window.frameElement.dialogArgs.Effort))){
			Effort = window.frameElement.dialogArgs.Effort;
			EffortType = Effort.substring(0,1);
			EffortID = Effort.substring(1);
		}else{
			if(!(/undefined/.test(Effort))){
				EffortType = Effort.substring(0,1);
				EffortID = Effort.substring(1);
			}else{
				throw "No data provided in URL";
			}
		}
		testDebug(EffortType);
		testDebug(EffortID);

	}catch(e){
		$().SPHelper.debug(e,3);	
		testDebug(e);
	}

	$("select[title='EffortType']").bind('change', function(){
		$("#tblRelatedInfo").empty();
		removeOptions(_select["Directive"]);
		removeOptions(_select["Standard"]);
	
		var selValue = $(this).find("option:selected").text();
		
		if(RegExp("(None)").test(selValue)){
			$(this).focus();
			$("#trDirective").hide();
			$("#trStandard").hide();
			$("#trOrgAlignment").hide();
		}else{
			if(selValue == "Standard"){
				goStandards();
			}
			if(selValue == "Directive"){
				goDirectives();
			}
		}
	});
	$("input[title='Hours']").focusout(function(){
		if(!($(this).val() % 0.5 == 0)){
			$(this).css('border',"2px dashed #f00");
			$(this).css('background-color',"ffe6e6");
			$(this).focus();
		}else{
			$(this).css('border',"1px solid #d1d1d1");
			$(this).css('background-color',"#fff");
		}
	});

	$.when($().SPHelper.showLoading()).then(function(){
		popPowerTips();
	}).then(function(){
		if(!(/undefined/.test(Effort))){
			if(EffortType === 'D'){ $("select[title='EffortType']").val("2"); }
			if(EffortType === 'S'){ $("select[title='EffortType']").val("1"); }
			$("select[title='EffortType']").trigger('change');
		}
	}).then(function(){
		//Required Fields set to starting values since SharePoint always sets drop-downs to the first value of the list
		$("select[title='Function']").append($("<option>", { value: "0", html: "(Required)", selected: true }));
		$("select[title='Enabler']").append($("<option>", { value: "0", html: "(Required)", selected: true }));

	}).done(function(){
		$("#loadingBox").hide();
	});

}); //End Doc Ready

function testDebug(str){
	$("#testConsole").append(str + "</br>");
}


function goStandards(){
	selValue = "Standard";
	var markSelect = false;
	$("#selOrgAlignment").empty();
	$("#trOrgAlignment").hide();
	
	if(!(EffortID == '0')){
		markSelect = true;
	}
	$().SPHelper.PopSelect({
		obj: _select[selValue],
		selectText: "(Select " + selValue + " objective.)",
		list: _list[selValue],
		useRecordID: true,
		CAMLQuery: _listQuery["standards"],
		markSelected: markSelect,
		markSelectedByValue: true,
		markSelectedValue: EffortID,
		useLookUpIndex: true,
		noDataMsg: "[No objectives found for " + selValue + "]",
		debug: true
	}).then(function(){
		_select[selValue].bind('change', function(){
			popRecordInfo($("option:selected", this).val());
		});
	}).then(function(){
		$("#trStandard").show();
		$("#trDirective").hide();
	}).done(function(){
		if(markSelect){
			popRecordInfo(EffortID);
		}
	});
}

function goDirectives(){
	selValue = "Directive";
	var markSelect = false;
	
	if(!(EffortID == '0')){
		markSelect = true;
	}

	var userOrgID = _thisUser.orgID || 1;
	$("#trOrgAlignment").show();

	if(markSelect){
		$().SPHelper.PopSelect({
			obj: $("#selOrgAlignment"),
			selectText: "(Select supporting organization.)",
			list: _list["PMTOrg"],
			useRecordID: true,
			noDataMsg: "[No Organizations Found]",
			debug: true
		});

		$().SPHelper.PopSelect({
			obj: _select[selValue],
			selectText: "(Select " + selValue + " objective.)",
			list: _list[selValue],
			useRecordID: true,
			CAMLQuery: "<Query><OrderBy><FieldRef Name='Title' Ascending = 'TRUE'/></OrderBy><Where><Or><Eq><FieldRef Name='WB_Status'/><Value Type='Text'>InProgress</Value></Eq><Eq><FieldRef Name='WB_Status'/><Value Type='Text'>Complete</Value></Eq></Or></Where></Query>",    //_listQuery["default"],
			markSelected: markSelect,
			markSelectedByValue: true,
			markSelectedValue: EffortID,
			useLookUpIndex: true,
			noDataMsg: "[No objectives found for " + selValue + "]",
			debug: true
		}).then(function(){
			_select[selValue].bind('change', function(){
				popRecordInfo($("option:selected", this).val());
			});
		}).then(function(){
			$("#trDirective").show();
			$("#trStandard").hide();
		}).done(function(){
			if(markSelect){
				popRecordInfo(EffortID);
			}
		});
		$("#selOrgAlignment").bind('change', function(){
			var orgSel = $("option:selected", this).val();
			$().SPHelper.PopSelect({
				obj: _select[selValue],
				selectText: "(Select Directive objective.)",
				list: _list[selValue],
				useRecordID: true,
				CAMLQuery: _listQuery["default"],
				filterField: "PMTOrganization",
				filterValue: orgSel,
				useLookUpIndex: true,
				noDataMsg: "[No objectives found for selected organization]",
				debug: true
			}).then(function(){
				_select[selValue].bind('change', function(){
					popRecordInfo($("option:selected", this).val());
				});
			}).then(function(){
				$("#trDirective").show();
				$("#trStandard").hide();
			}).done(function(){
				if(markSelect){
					popRecordInfo(EffortID);
				}
			});
		});
	}else{
		$().SPHelper.PopSelect({
			obj: $("#selOrgAlignment"),
			selectText: "(Select supporting organization.)",
			list: _list["PMTOrg"],
			useRecordID: true,
			markSelected: true,
			markSelectedByValue: true,
			markSelectedValue: userOrgID,
			useLookUpIndex: true,
			noDataMsg: "[No Organizations Found]",
			debug: true
		}).then(function(){
			$("#selOrgAlignment").bind('change', function(){
				var orgSel = $("option:selected", this).val();
				$().SPHelper.PopSelect({
					obj: _select[selValue],
					selectText: "(Select Directive objective.)",
					list: _list[selValue],
					useRecordID: true,
					CAMLQuery: _listQuery["default"],
					filterField: "PMTOrganization",
					filterValue: orgSel,
					useLookUpIndex: true,
					noDataMsg: "[No objectives found for selected organization]",
					debug: true
				}).then(function(){
					_select[selValue].bind('change', function(){
						popRecordInfo($("option:selected", this).val());
					});
				}).then(function(){
					$("#trDirective").show();
					$("#trStandard").hide();
				}).done(function(){
					if(markSelect){
						popRecordInfo(EffortID);
					}
				});
			});
		}).then(function(){
			$("#selOrgAlignment").trigger('change');
		});	
	}
}

function popRecordInfo(selValue){
	var list = $("select[title='EffortType']").find("option:selected").text();
	
	$("input[title='Title']").val($("option:selected", this).text());
					
	var ds = {};
	var mapSPTAlign = {};
	var dsMap = [];
	
	var getSPTMap = $().SPHelper.GetListData({
		list: $().SPHelper.GetListGUID({ list: "SPT_Alignment" }),		
		CAMLQuery: "<Query></Query>",
		CAMLViewFields: "<ViewFields><FieldRef Name='ID' /><FieldRef Name='ParaLine' /><FieldRef Name='Context' /><FieldRef Name='Title' /></ViewFields>",		
		mapping: {
			ows_ID: { mappedName: "ID", objectType: "Counter" },
			ows_Title: {mappedName: "Reference", objectType: "Text"},				
			ows_ParaLine: {mappedName: "ParaLine", objectType: "Text"},
			ows_Context: {mappedName: "Context", objectType: "Text"}
		},
		debug: true
	}).then(function(){
		dsMap = $.extend({},this.data);
	}).done(function(){
		$.each(dsMap, function(i,el){
			mapSPTAlign[el.ID] = { id: el.ID , Reference: el.Reference, ParaLine: el.ParaLine , Context: el.Context };
		});
	});

	var getItem = $().SPHelper.GetListData({
		list: _list[list],
		CAMLQuery: "<Query><Where><Eq><FieldRef Name='ID'></FieldRef><Value Type='Text'>"+selValue+"</Value></Eq></Where></Query>",
		CAMLViewFields: _listViewFields["related"],
		mapping: _listMapping["related"]
	}).done(function(){
		ds = $.extend({},this.data);
	})
	
	$.when(getSPTMap, getItem).then(function(){
		var tblInfo = [];
		tblInfo.push("<tr><td valign='top' width='1%' class='ms-formlabel'><H3 class='ms-standardheader'><nobr>Intent, End State, and <br>Outcome Description</nobr></H3></td>");
		tblInfo.push("<td valign='top' class='ms-formbody' style='font-weight:normal;'>"+ ds[0].Task +"</td></tr>");
		tblInfo.push("<tr><td valign='top' width='1%' class='ms-formlabel'><H3 class='ms-standardheader'><nobr>Objective Alignment</nobr></H3></td>");
		tblInfo.push("<td valign='top' class='ms-formbody' style='font-weight:normal;'>");
		tblInfo.push(ds[0].OBJAuth.split(";#")[1]+" - "+ds[0].OBJRef.split(";#")[1]+"<br/>");
		tblInfo.push("<tr><td valign='top' width='1%' class='ms-formlabel'><H3 class='ms-standardheader'><nobr>Support Alignment</nobr></H3></td>");
		tblInfo.push("<td valign='top' class='ms-formbody flat' style='font-weight:normal;'>");
		if(ds[0].SPTMulti.length > 0){
				var sptIDs = ds[0].SPTMulti.split("|");
				tblInfo.push("<span><select id='selSPTAlign' title='selSPTAlign'><option val='0' selected>[Select Appropriate Support Reference]</option>");
				for(var i=0;i<(sptIDs.length-1);i++){
					tblInfo.push("<option value='"+sptIDs[i]+"'>"+mapSPTAlign[sptIDs[i]].ParaLine+" "+mapSPTAlign[sptIDs[i]].Reference+"</option>");
				}
				tblInfo.push("</select></span>");
				tblInfo.push("<span id='ptselSPTAlign' title='select' style='display:none;'>Select the appropriate supporting organization for the outcome(s) produced and/or the action(s) performed for this Standard.</span>");
		}else{
			if(typeof ds[0].SPTParaLine.split(";#")[1] !== 'undefined'){
				tblInfo.push(ds[0].SPTParaLine.split(";#")[1]+"&nbsp;"+ds[0].SPTRef.split(";#")[1]+"<br/>");
				$("input[title='SPTAlignmentID']").val( findID(mapSPTAlign, ds[0].SPTParaLine.split(";#")[1],'ParaLine') );
			}else{
				tblInfo.push("<i>Not Defined</i>");
			}
		}
		tblInfo.push("</td></tr>");
		tblInfo.push("<tr><td valign='top' width='1%' class='ms-formlabel'><H3 class='ms-standardheader'><nobr>Measurements of Effect (MOE)</nobr></H3></td>");
		tblInfo.push("<td valign='top' class='ms-formbody' style='font-weight:normal;'>");
		tblInfo.push("<b>Qualitative:</b>&nbsp;"+ds[0].MOEQual+"<br/><b>Quantitative:</b>&nbsp;"+ds[0].MOEQuan);
		tblInfo.push("</td></tr>");
		$("#tblRelatedInfo").empty().append(tblInfo.join(''));
	}).then(function(){
		if(ds[0].PMTOrg){
			$().SPHelper.PopSelect({
				obj: $("#selOrgAlignment"),
				selectText: "(Select supporting organization.)",
				list: _list["PMTOrg"],
				useRecordID: true,
				markSelected: true,
				markSelectedByValue: true,
				markSelectedValue: ds[0].PMTOrg.lookupId,
				useLookUpIndex: true,
				noDataMsg: "[No Organizations Found]",
				debug: true
			});
		}
	}).then(function(){
		//Customer Drop-downs
		$("select[id='ddOrg']").prop('disabled',false);
		$("select[id='ddSubOrg']").prop('disabled',false);

		var markCustomer = {};
			markCustomer.OrgGrp = (!(/undefined/.test(ds[0].Org))&&(ds[0].Org.length>0));
			markCustomer.Principal = (!(/undefined/.test(ds[0].SubOrg))&&(ds[0].SubOrg.length>0));
			markCustomer.Other = false;
			
		var customer = [];
		
		if(markCustomer.OrgGrp){
			customer[0] = ds[0].Org.split(";#")[1];
			if(markCustomer.Principal){
				customer[1] = ds[0].SubOrg.split(";#")[1];
			}
		}
				
		$().SPHelper.PopSelect({
			obj: $("select[id='ddOrg']"),
			selectText: "(Select Organization Group.)",
			list: _list["Org"],
			useRecordID: true,
			markSelected: markCustomer.OrgGrp,
			markSelectedByValue: false,
			markSelectedValue: customer[0],
			CAMLQuery: "<Query><OrderBy><FieldRef Name='Title' Ascending = 'TRUE'/></OrderBy></Query>",
			noDataMsg: "[No Organization Groups found.]"
		});
		if(markCustomer.OrgGrp){
			$("select[id='ddOrg']").prop('disabled',true);
			$().SPHelper.PopSelect({
				obj: $("select[id='ddSubOrg']"),
				selectText: "(Select Principal Organization.)",
				list: _list["SubOrg"],
				filterField: "LU_Organization",
				filterValue: customer[0],
				markSelected: markCustomer.Principal,
				markSelectedByValue: false,
				markSelectedValue: customer[1],
				CAMLQuery: "<Query><OrderBy><FieldRef Name='Title' Ascending = 'TRUE'/></OrderBy></Query>",
				noDataMsg: "[No Organization Groups found.]"
			});
			if(markCustomer.Principal){
				$("select[id='ddSubOrg']").prop('disabled',true);
			}
		}
		$("select[id='ddOrg']").bind('change', function(){
			$().SPHelper.PopSelect({
				obj: $("select[id='ddSubOrg']"),
				selectText: "(Select Principal Organization.)",
				list: _list["SubOrg"],
				filterField: "LU_Organization",
				filterValue: $(this).find("option:selected").text(),
				CAMLQuery: "<Query><OrderBy><FieldRef Name='Title' Ascending = 'TRUE'/></OrderBy></Query>",
				noDataMsg: "[No Organization Groups found.]"
			});
		});
	}).done(function(){
		$("#trRelatedInfo").show();
		$("#trCustomer").show();
		popPowerTips();
	});
	$("#selSPTAlign").on("change", function(e){
		$("input[title='SPTAlignmentID']").val($(this).find("option:selected").val());
	});

}

function removeOptions(selectObj){
	var selectbox = document.getElementById(selectObj.prop('id'));
	for(var i=selectbox.options.length-1;i>=0;i--){
		selectbox.remove(i);
	}
	selectObj.append("<option value='0'>(None)</option>");
};
function popPowerTips(){
	$("span[id*='pt']").each(function(){
		if(!(this.innerText=='')){
			var el = this.id.replace('pt','');
			var ctrl = this.title;
			$(ctrl+'[title*="'+el+'"]').data('powertip', this.innerText);
			$(ctrl+'[title*="'+el+'"]').powerTip({
				placement: 'e',
				smartPlacement: true
			});
		}
	});
};
function modalHowTo(){
	$().SPHelper.ModalDialog({ url: "https://hq.tradoc.army.mil/sites/PMT/Documents/UserEntryInThePMT.pdf", title: "User Entry in the PMT", autosize: false, height: 600, width: 1000 });
	return false;
};
function findID(obj, searchFor, property) {
    var rtn = "";
    $.each(obj, function(idx,el){
    	if(el[property] === searchFor){
    		rtn = el.id;
    	}
    });
    return rtn;
};
function PreSaveAction() {   
	var rtn = false;
	$("select[id='trStandard']").prop('disabled',false);
	$("select[id='trDirective']").prop('disabled',false);
	$("#trRelatedInfo").show();
	$("#trCustomer").show();

	var EffortType = $("select[title='EffortType']").find("option:selected").text();
	if(EffortType == "Standard"){
		$("select[id='trStandard']").show();
		$("select[id='trDirective']").hide();
		if(($("input[title='SPTAlignmentID']").val() == "0")||($("input[title='SPTAlignmentID']").val() === "")){
			//Should not happend
			$().SPHelper.debug("SPTAlignment not set");
			rtn = true;
		}else{
			rtn = true;
		}
	}
	if(EffortType == "Directive"){
		$("select[id='trDirective']").show();
		$("select[id='trStandard']").hide();
		if(($("input[title='SPTAlignmentID']").val() == "0")||($("input[title='SPTAlignmentID']").val() === "")){
			//Should not happend
			$("select[id='trDirective']").focus();
		}else{
			rtn = true;
		}
	}
		
	if(rtn){
		rtn = false;	
		if(!($("input[title='Hours']").val() % 0.5 == 0)){
			$("input[title='Hours']").focus();
		}else{
			if($("select[title='"+EffortType+"']").find("option:selected").val() == 0){
				$("select[title='"+EffortType+"']").focus();
			}else{
				$("input[title='Title']").val($("select[title='"+EffortType+"']").find("option:selected").text());
				$("select[id='ddOrg']").prop('disabled',false);
				$("select[id='ddSubOrg']").prop('disabled',false);
				$("input[title*='Customer']").val("")
				var orgTxt = "";
				if($("select[id='ddOrg'] option:selected").val()==0){
					orgTxt = "(None)";
				}else{
					orgTxt = $("select[id='ddOrg'] option:selected").text() + "|";
					if($("select[id='ddSubOrg'] option:selected").val()==0){
						orgTxt += "(None)";
					}else{
						orgTxt += $("select[id='ddSubOrg'] option:selected").text() + "|" + $("input[title*='Customer']").val();
					}
				}
				$("input[title*='Customer']").val(orgTxt);
			
				rtn = true;
			}
		}
	}
	return rtn;
};
















