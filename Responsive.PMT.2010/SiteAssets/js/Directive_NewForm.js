$(document).ready(function() {
	$().SPHelper.FixRequired();
	PMT.init();
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

	var OBJAlign = $().SPHelper.GetListGUID({ list: "OBJ_Alignment" });	
	var SPTAlign = $().SPHelper.GetListGUID({ list: "SPT_Alignment" });	

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

	
	$().SPHelper.PopSelect({
		obj: $("select[id='OBJAuthority']"),
		list: OBJAlign,
		field: "Title",
		fieldValue: "Title",
		selectText: "[Select Source Authority]",
		useRecordID: false	
	});
	$("select[id='OBJAuthority']").bind("change",function(){
		$().SPHelper.PopSelect({
			obj: $("select[id='OBJReference']"),
			list: OBJAlign,
			field: "Reference",
			fieldValue: "ID",
			filterField: "Title",
			filterValue: $(this).val(),
			selectText: "[Select Source Reference]",
			useRecordID: true
		});
		$("select[id='OBJReference']").bind("change",function(event){
			var objAuth = $("select[id='OBJAuthority']").find(":selected").text();
			$("select[title='OBJAlignment']").val($(this).val());
			$("select[id='OBJAuthority']").val(objAuth);
		});
	});
	
	$("select[id='OBJAlignment']").bind("change",function(e){
		e.preventDefault();
	});

	$().SPHelper.PopSelect({
		obj: $("select[id='SPTSource']"),
		list: SPTAlign,
		field: "Title",
		fieldValue: "Title",
		selectText: "[Select Reference Source]",
		useRecordID: false	
	});
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
		$("select[id='SPTParaLine']").bind("change",function(){
			$("select[title='SPTAlignment']").val($(this).val());
			$("#SPTContext").empty();
			var stuff = [];
			stuff.push("<table border='0' cellpadding='0' cellspacing='3'><tr><td><b>Reference Context:</b></td></tr>");
			stuff.push("<tr><td>"+ mapSPTAlign[$(this).val()] +"</td></tr>");
			stuff.push("</table>");
			$("#SPTContext").append(stuff.join(''));
		});
	});	
	
	
	removeOptions($("select[title='LU_SubOrganization']"));
	
	$("select[title='LU_Organization']").bind( "change", function() { 
		var selText = $("select[title='LU_Organization'] option:selected").text();
		$.fn.SPHelper.PopSelect({
			obj: $("select[title='LU_SubOrganization']"),
			list: "LU_SubOrganizations",
			selectText: "[Select Principal Organization]",
			filterField: "LU_Organization",
			filterValue: selText
		});
	});
	
		
	$.fn.SPHelper.PopSelect({
		obj: $("select[title='PMTOrganization']"),
		list: "PMT_Organizations",
		field: "Title",
		fieldValue: "ID",
		selectText: "[Select Organization]",
		markSelected: true,
		markSelectedByValue: true,
		markSelectedValue: 1,
		useRecordID: true,
		debug: false
	});

});
function removeOptions(selectObj){
	var selectbox = document.getElementById(selectObj.prop('id'));
	for(var i=selectbox.options.length-1;i>=0;i--){
		selectbox.remove(i);
	}
	selectObj.append("<option value='0'>(None)</option>");
}

function PreSaveAction(){
	PMT.setSessionVar("RefreshDirectives","1");
	return true;
}
