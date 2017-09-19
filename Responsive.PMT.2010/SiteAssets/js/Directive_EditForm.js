
$(document).ready(function() {
	$().SPHelper.FixRequired();
	PMT.init();
	
	var OBJAlign = $().SPHelper.GetListGUID({ list: "OBJ_Alignment" });	
	var SPTAlign = $().SPHelper.GetListGUID({ list: "SPT_Alignment" });	
	
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


	var OBJAlignVal = $("select[title='OBJAlignment'] option:selected").val();
	var OBJAlignTxt = "";
	
	var markOBJAlign = false;
	if(OBJAlignVal > 0 ){
		$().SPHelper.GetListRecord({
			list: OBJAlign,
			field: "ID",
			value: OBJAlignVal,
			returnField: "Title",
			debug: true		
		}).done(function(){
			OBJAlignTxt = this.data;
		}).fail(function(){
			 $().SPHelper.debug(this.data);
		});

		markOBJAlign = true;
	
		$().SPHelper.PopSelect({
			obj: $("select[id='OBJAuthority']"),
			list: OBJAlign,
			field: "Title",
			fieldValue: "Title",
			markSelected: markOBJAlign,
			markSelectedByValue: false,
			markSelectedValue: OBJAlignTxt,
			selectText: "[Select Source Authority]",
			useRecordID: false	
		});
		$().SPHelper.PopSelect({
			obj: $("select[id='OBJReference']"),
			list: OBJAlign,
			field: "Reference",
			fieldValue: "ID",
			filterField: "Title",
			filterValue: OBJAlignTxt,
			markSelected: markOBJAlign,
			markSelectedByValue: true,
			markSelectedValue: OBJAlignVal,
			selectText: "[Select Source Reference]",
			useRecordID: false
		});
	}else{
		$().SPHelper.PopSelect({
			obj: $("select[id='OBJAuthority']"),
			list: OBJAlign,
			field: "Title",
			fieldValue: "Title",
			selectText: "[Select Source Authority]",
			useRecordID: false	
		});
	}
	$("select[id='OBJAuthority']").bind("change",function(){
		$().SPHelper.PopSelect({
			obj: $("select[id='OBJReference']"),
			list: OBJAlign,
			field: "Reference",
			fieldValue: "ID",
			filterField: "Title",
			filterValue: $(this).find(":selected").text(),
			selectText: "[Select Source Reference]",
			useRecordID: true
		});
	});
	$("select[id='OBJReference']").bind("change",function(event){
		var objAuth = $("select[id='OBJAuthority']").find(":selected").text();
		$("select[title='OBJAlignment']").val($(this).val());
		$("select[id='OBJAuthority']").val(objAuth);
	});
	

	var mapSPTAlign = {};
	var ds = [];
	$().SPHelper.GetListData({
		list: SPTAlign,		
		CAMLQuery: "<Query></Query>",
		CAMLViewFields: "<ViewFields><FieldRef Name='ID' /><FieldRef Name='ParaLine' /><FieldRef Name='Context' /></ViewFields>",		
		mapping: {
			ows_ID: { mappedName: "ID", objectType: "Counter" },				
			ows_ParaLine: {mappedName: "ParaLine", objectType: "Text"},
			ows_Context: {mappedName: "Context", objectType: "Text"}
		},
		debug: true
	}).then(function(){
		ds = $.extend({},this.data);
	}).then(function(){
		$.each(ds, function(i,el){
			mapSPTAlign[el.ID] = el.Context;
		});
	});

	var SPTAlignVal = $("select[title='SPTAlignment'] option:selected").val();
	var SPTAlignTxt = "";
	
	var markSPTAlign = false;
	if(SPTAlignVal > 0 ){
		$().SPHelper.GetListRecord({
			list: SPTAlign,
			field: "ID",
			value: SPTAlignVal,
			returnField: "Title",
			debug: true		
		}).done(function(){
			SPTAlignTxt = this.data;
		}).fail(function(){
			 $().SPHelper.debug(this.data);
		});

		markSPTAlign = true;
		
		$().SPHelper.PopSelect({
			obj: $("select[id='SPTSource']"),
			list: SPTAlign,
			field: "Title",
			fieldValue: "Title",
			markSelected: markSPTAlign,
			markSelectedByValue: false,
			markSelectedValue: SPTAlignTxt,
			selectText: "[Select Reference Source]",
			useRecordID: false	
		});
		$().SPHelper.PopSelect({
			obj: $("select[id='SPTParaLine']"),
			list: SPTAlign,
			field: "ParaLine",
			fieldValue: "ID",
			filterField: "Title",
			filterValue: SPTAlignTxt,
			markSelected: markSPTAlign,
			markSelectedByValue: true,
			markSelectedValue: SPTAlignVal,
			selectText: "[Select Sub-Reference]",
			useRecordID: true
		});
	}else{
		$().SPHelper.PopSelect({
			obj: $("select[id='SPTSource']"),
			list: SPTAlign,
			field: "Title",
			fieldValue: "Title",
			selectText: "[Select Reference Source]",
			useRecordID: false	
		});
	}
	$("select[id='SPTSource']").bind("change",function(){
		$().SPHelper.PopSelect({
			obj: $("select[id='SPTParaLine']"),
			list: SPTAlign,
			field: "ParaLine",
			fieldValue: "ID",
			filterField: "Title",
			filterValue: $(this).val(),
			selectText: "[Select Sub-Reference]",
			useRecordID: true
		});
	});
	$("select[id='SPTParaLine']").bind("change",function(){
		$("select[title='SPTAlignment']").val($(this).val());
		$("#SPTContext").empty();
		var stuff = [];
		stuff.push("<table border='0' cellpadding='0' cellspacing='3'><tr><td><b>Reference Context:</b></td></tr>");
		stuff.push("<tr><td>"+ mapSPTAlign[$(this).val()] +"</td></tr>");
		stuff.push("</table>");
		$("#SPTContext").append(stuff.join(''));
	});


	var selText = $("select[title='LU_Organization'] option:selected").text();
	var selPrinc = $("select[title='LU_SubOrganization'] option:selected").text();
	removeOptions($("select[title='LU_SubOrganization']"));
	$.fn.SPHelper.PopSelect({
		obj: $("select[title='LU_SubOrganization']"),
		list: "LU_SubOrganizations",
		selectText: "[Select Principal Organization]",
		filterField: "LU_Organization",
		filterValue: selText,
		markSelected: true,
		markSelectedByValue: false,
		markSelectedValue: selPrinc,
		debug: false
	});	
	$("select[title='LU_Organization']").bind( "change", function() { 
		var selText = $("select[title='LU_Organization'] option:selected").text();
		removeOptions($("select[title='LU_SubOrganization']"));
		$.fn.SPHelper.PopSelect({
			obj: $("select[title='LU_SubOrganization']"),
			list: "LU_SubOrganizations",
			selectText: "[Select Principal Organization]",
			filterField: "LU_Organization",
			filterValue: selText,
			debug: false
		});
	});


	var selPMTOrgVal = $("select[title='PMTOrganization'] option:selected").val();

	$.fn.SPHelper.PopSelect({
		obj: $("select[title='PMTOrganization']"),
		list: "PMT_Organizations",
		field: "Title",
		fieldValue: "ID",
		selectText: "[Select Organization]",
		markSelected: true,
		markSelectedByValue: true,
		markSelectedValue: selPMTOrgVal,
		useRecordID: true,
		debug: false
	});	

	$("input[title='Completion Date']").focusout(function(){
		var selStatus = $("select[title='Status'] option:selected").text();
		var compDate = $(this).val();
		
		if((selStatus == "Complete") && (!compDate)){
			$(this).css('border',"2px dashed #f00");
			$(this).css('background-color',"ffe6e6");
			$(this).focus();
		}else{
			$(this).css('border',"1px solid #d1d1d1");
			$(this).css('background-color',"#fff");
		}
	});

	PMT.setSessionVar("RefreshDirectives","1");
});

function removeOptions(selectObj){
	var selectbox = document.getElementById(selectObj.prop('id'));
	for(var i=selectbox.options.length-1;i>=0;i--){
		selectbox.remove(i);
	}
	selectObj.append("<option value='0'>(None)</option>");
}

function PreSaveAction(){
	var rtn = false;
	var selStatus = $("select[title='Status'] option:selected").text();
	var compDate = $("input[title='Completion Date']").val();
	
	if((selStatus == "Complete") && (!compDate)){
		$("input[title='Completion Date']").css('border',"2px dashed #f00");
		$("input[title='Completion Date']").css('background-color',"ffe6e6");
		$("input[title='Completion Date']").focus();
	}else{
		rtn = true;
	}
	return rtn;
}