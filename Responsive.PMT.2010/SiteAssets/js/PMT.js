/**
 *  @file PMT
 *  @description PMT specific capabilities
 *  @author Christopher J Stoll [christopher.j.stoll.ctr@mail.mil]
 *  @version 2016.01
 */
/**
 *  @external jQuery
 *  @see {@link  http://jquery.com/|jQuery}
 *  @description Required Minimum Version v1.11.0 <p>jQuery is a fast, small, and feature-rich JavaScript library. It makes things like HTML document traversal and manipulation, event handling, animation, and Ajax much simpler with an easy-to-use API that works across a multitude of browsers.</p>
 */
/**
 *  @external SPServices
 *  @see {@link  http://spservices.codeplex.com/|SPServices}
 *  @description Required Minimum Version 2014.01 <p>SPServices is a jQuery library which abstracts SharePoint's Web Services and makes them easier to use. It also includes functions which use the various Web Service operations to provide more useful (and cool) capabilities. It works entirely client side and requires no server install.</p>
 */
/**
 *  @external SPHelper
 *  @description Required
 */
/**
 *  @external moment
 *  @see {@link  http://|moment}
 *  @description Required
 */

/* jshint undef: true */
/* global L_Menu_BaseUrl, _spUserId, _spPageContextInfo */
/**
 * @name PMT
 * @namespace PMT
 */
(function(PMT,$,undefined){

	"use strict";
	
	/** Local [PRIVATE] Variables */
	/**
	  *	@var {string}
	  * @global
	  */
	var VERSION = "2016.01"; // TODO: Update version

    var settings = {};


	var _list = {};
		_list["Standards"] = $.fn.SPHelper.GetListGUID({ list: "Standards" });
		_list["Directives"] = $.fn.SPHelper.GetListGUID({ list: "Directives" });
		_list["Actions"] = $.fn.SPHelper.GetListGUID({ list: "Actions" });		
		_list["EffortTypes"] = $.fn.SPHelper.GetListGUID({ list: "LU_EffortTypes" });		
		_list["Competency"] = $.fn.SPHelper.GetListGUID({ list: "LU_Competency" });		
		_list["Functions"] = $.fn.SPHelper.GetListGUID({ list: "LU_Functions" });		
		_list["Enablers"] = $.fn.SPHelper.GetListGUID({ list: "LU_Enablers" });		
		_list["Organizations"] = $.fn.SPHelper.GetListGUID({ list: "LU_Organizations" });		
		_list["SubOrganizations"] = $.fn.SPHelper.GetListGUID({ list: "LU_SubOrganizations" });		
		
	var _listQuery = {};				
		_listQuery["default"] = "<Query><OrderBy><FieldRef Name='ID' /></OrderBy></Query>";		
		_listQuery["Standards"] = "<Query><OrderBy><FieldRef Name='Title' /><FieldRef Name='ID' /></OrderBy></Query>";		
		_listQuery["Directives"] = "<Query><OrderBy><FieldRef Name='WB_SuspenseDate' Ascending = 'FALSE' /><FieldRef Name='ID' /></OrderBy></Query>";		
		_listQuery["SubOrganizations"] = "<Query><OrderBy><FieldRef Name='ID' /></OrderBy></Query>";
		_listQuery["Actions"] = "<Query><OrderBy><FieldRef Name='ID' /></OrderBy></Query>"; //"<Query><Where><Contains><FieldRef Name='EffortType' /><Value Type='Text'>Directive</Value></Contains></Where></Query>";
		_listQuery["DirectivesActions"] = "<Query><Where><Contains><FieldRef Name='EffortType' /><Value Type='Text'>Directive</Value></Contains></Where></Query>";
		_listQuery["StandardsActions"] = "<Query><Where><Contains><FieldRef Name='EffortType' /><Value Type='Text'>Standard</Value></Contains></Where></Query>";
		_listQuery["Competency"] = "<Query><OrderBy><FieldRef Name='Order0' /></OrderBy></Query>";		
		
	var _listViewFields = {};
		_listViewFields["default"] = "<ViewFields><FieldRef Name='ID' /><FieldRef Name='Title' /></ViewFields>";
		_listViewFields["Standards"] = "<ViewFields><FieldRef Name='ID' /><FieldRef Name='Title' /><FieldRef Name='Competency' /><FieldRef Name='WB_Status' /><FieldRef Name='LeadAssessment' /><FieldRef Name='ProjectedManHours' /><FieldRef Name='AvailableManHours' /><FieldRef Name='Equipped' /><FieldRef Name='Trained' /><FieldRef Name='WB_Frequency' /><FieldRef Name='WB_StaffLead' /><FieldRef Name='WB_StaffAssist' /><FieldRef Name='LU_SubOrganization' /><FieldRef Name='LU_Organization' /><FieldRef Name='OBJAlignment_x003a_Authority' /></ViewFields>";		
		_listViewFields["Directives"] = "<ViewFields><FieldRef Name='ID' /><FieldRef Name='Title' /><FieldRef Name='WB_Status' /><FieldRef Name='LeadAssessment' /><FieldRef Name='ProjectedManHours' /><FieldRef Name='AvailableManHours' /><FieldRef Name='Equipped' /><FieldRef Name='Trained' /><FieldRef Name='WB_SuspenseDate' /><FieldRef Name='WB_CompletionDate' /><FieldRef Name='WB_StaffLead' /><FieldRef Name='WB_StaffAssist' /><FieldRef Name='PMTOrganization_x003a_Title' /><FieldRef Name='LU_SubOrganization' /><FieldRef Name='LU_Organization' /><FieldRef Name='OBJAlignment_x003a_Authority' /></ViewFields>";
		_listViewFields["SubOrganizations"] = "<ViewFields><FieldRef Name='ID' /><FieldRef Name='ABBRV' /><FieldRef Name='Title' /><FieldRef Name='LU_Organization' /></ViewFields>";
		_listViewFields["Actions"] = "<ViewFields><FieldRef Name='ID' /><FieldRef Name='EffortType' /><FieldRef Name='Directive' /><FieldRef Name='Standard' /><FieldRef Name='Function' /><FieldRef Name='CompleteDate' /><FieldRef Name='ReportMonth' /><FieldRef Name='ReportYear' /><FieldRef Name='StartWeek' /><FieldRef Name='EndOfWeek' /><FieldRef Name='Author' /><FieldRef Name='Hours' /></ViewFields>";
		_listViewFields["DirectivesActions"] = "<ViewFields><FieldRef Name='ID' /><FieldRef Name='EffortType' /><FieldRef Name='Directive' /><FieldRef Name='Hours' /></ViewFields>";
		_listViewFields["StandardsActions"] = "<ViewFields><FieldRef Name='ID' /><FieldRef Name='EffortType' /><FieldRef Name='Standard' /><FieldRef Name='Hours' /></ViewFields>";
		_listViewFields["Competency"] = "<ViewFields><FieldRef Name='ID' /><FieldRef Name='Title' /><FieldRef Name='ABBRV' /><FieldRef Name='Order0' /><FieldRef Name='Competency' /></ViewFields>";
		_listViewFields["Functions"] = "<ViewFields><FieldRef Name='ID' /><FieldRef Name='Title' /><FieldRef Name='Competency_Lookup' /></ViewFields>";
		
	var _listMapping = {};		
		_listMapping["default"] = {
			ows_ID: { mappedName: "ID", objectType: "Text" },				
			ows_Title: { mappedName: "Title", objectType: "Text" }
		};
		_listMapping["Standards"] = {
			ows_ID: { mappedName: "ID", objectType: "Counter" },				
			ows_Title: { mappedName: "Title", objectType: "Text" },
			ows_WB_Status: { mappedName: "Status", objectType: "Choice" },
			ows_LeadAssessment: { mappedName: "LeadAssessment", objectType: "Choice" },
			ows_ProjectedManHours: { mappedName: "Projected", objectType: "Number" },
			ows_AvailableManHours: { mappedName: "Available", objectType: "Number" },
			ows_Equipped: { mappedName: "Equipped", objectType: "Choice" },
			ows_Trained: { mappedName: "Trained", objectType: "Choice" },			
			ows_WB_Frequency: { mappedName: "Frequency", objectType: "Choice" },
			ows_WB_StaffLead: { mappedName: "Lead", objectType: "User" },
			ows_WB_StaffAssist: { mappedName: "Assist", objectType: "UserMulti" },
			ows_LU_SubOrganization: { mappedName: "Org", objectType: "Lookup" },
			ows_LU_Organization: { mappedName: "OrgGrp", objectType: "Lookup" },
			ows_OBJAlignment_x003a_Authority: { mappedName: "Authority", objectType: "Lookup" }
		};
		_listMapping["Directives"] = {
			ows_ID: { mappedName: "ID", objectType: "Counter" },				
			ows_Title: { mappedName: "Title", objectType: "Text" },
			ows_WB_Status: { mappedName: "Status", objectType: "Choice" },
			ows_LeadAssessment: { mappedName: "LeadAssessment", objectType: "Choice" },
			ows_ProjectedManHours: { mappedName: "Projected", objectType: "Number" },
			ows_AvailableManHours: { mappedName: "Available", objectType: "Number" },
			ows_Equipped: { mappedName: "Equipped", objectType: "Choice" },
			ows_Trained: { mappedName: "Trained", objectType: "Choice" },			
			ows_WB_SuspenseDate: { mappedName: "SuspenseDate", objectType: "DateTime" },
			ows_WB_CompletionDate: { mappedName: "CompleteDate", objectType: "DateTime" },
			ows_WB_StaffLead: { mappedName: "Lead", objectType: "User" },
			ows_WB_StaffAssist: { mappedName: "Assist", objectType: "UserMulti" },
			ows_LU_SubOrganization: { mappedName: "Org", objectType: "Lookup" },
			ows_LU_Organization: { mappedName: "OrgGrp", objectType: "Lookup" },
			ows_PMTOrganization_x003a_Title: { mappedName: "PMTOrg", objectType: "Lookup" },
			ows_OBJAlignment_x003a_Authority: { mappedName: "Authority", objectType: "Lookup" }
		};
		_listMapping["SubOrganizations"] = {
			ows_ID: { mappedName: "ID", objectType: "Text" },				
			ows_ABBRV : { mappedName: "Org", objectType: "Text" },
			ows_Title : { mappedName: "Title", objectType: "Text" },
			ows_LU_Organization : { mappedName: "ParentOrg", objectType: "Text" }
		};
		_listMapping["Actions"] = {	
			ows_ID: { mappedName: "ID", objectType: "Counter" },				
			ows_Title: { mappedName: "Title", objectType: "Text" },
			ows_EffortType: { mappedName: "EffortType", objectType: "Text" },				
			ows_Directive: { mappedName: "Directive", objectType: "Lookup" },
			ows_Standard: { mappedName: "Standard", objectType: "Lookup" },
			ows_Function: { mappedName: "Func", objectType: "Lookup" },
			ows_CompleteDate: { mappedName: "CompleteDate", objectType: "DateTime" },
			ows_ReportMonth: { mappedName: "RptMon", objectType: "Calculated" },
			ows_ReportYear: { mappedName: "RptYr", objectType: "Calculated" },
			ows_StartWeek: { mappedName: "SOW", objectType: "Calculated" },
			ows_EndOfWeek: { mappedName: "EOW", objectType: "Calculated" },
			ows_Author: { mappedName: "Author", objectType: "Text" },
			ows_Hours: { mappedName: "Hours", objectType: "Text" }
		}
		_listMapping["Competency"] = {	
			ows_ID: { mappedName: "ID", objectType: "Counter" },				
			ows_Title: { mappedName: "Title", objectType: "Text" },				
			ows_ABBRV: { mappedName: "ABBRV", objectType: "Text" },				
			ows_Order0: { mappedName: "Order", objectType: "Number" },				
			ows_Competency: { mappedName: "IsCompetency", objectType: "Boolean" }			
		}
		_listMapping["Functions"] = {	
			ows_ID: { mappedName: "ID", objectType: "Counter" },
			ows_Title: { mappedName: "Title", objectType: "Text" },
			ows_Competency_Lookup: { mappedName: "Competency", objectType: "Lookup" }
		}


	/** Utility Functions **/

	/**
	 * @method
	 * @name PMT#init
	 * @param {Object} options
	 * @see settings
	 * @description User function to be used to pass in an object that sets the 'settings' object defaults
	 * @example 
	 * PMT.init({});
	 */
	PMT.init = function(options) {
		$().SPHelper.debug("PMT.init:" + moment.utc(Date.now()).local().format("HH:mm:ss.SSS"),1);

		var defer = $.Deferred();
		try{
		    // Extend settings with user supplied options and call the merged obj 'settings'
		    settings = $.extend({}, options);
		    defer.resolve();
		}catch(e){
			$.fn.SPHelper.debug(e);
			defer.reject();
		}

		return defer.promise();

	}; // End PMT.init
	
	PMT.getLists = function(){
		return $.extend([],_list);
	}
	PMT.getListParams = function(name){
		var params = {
			list: _list[name],
			query: _listQuery[name],
			viewfields: _listViewFields[name],
			mapping: _listMapping[name]
		
		}
		
		return $.extend({},params);
	}
	
	PMT.getCompetency = function(options) {
		$().SPHelper.debug("PMT.getCompentency - start:" + moment.utc(Date.now()).local().format("HH:mm:ss.SSS"),1);

		var defer = $.Deferred();
		var rtnObj = { data: null, count: 0 };
		var listData = [];
		var map = {};
		
		var lclOptions = {
			list: _list["Competency"],
			CAMLQuery: _listQuery["Competency"],
			CAMLViewFields: _listViewFields["Competency"] ,
			CAMLRowLimit: null,
			mapping: _listMapping["Competency"],
			webURL: $.fn.SPHelper.GetCurrentSite(),
			parentSite: false,
			includeAllAttrs: false,
			removeOws: true,
			debug: false
		}
		
		lclOptions = $.extend({}, lclOptions, options);
				
		$.fn.SPHelper.GetListData(lclOptions).then(function(){
			listData = $.extend([],this.data); 
		}).then(function(){
			$.each(listData, function(idx,el){
				map[el.ID] = { ID: el.ID, Title: el.Title, ABBRV: el.ABBRV, Order: el.Order, IsCompetency: el.IsCompetency };
			});
			
			rtnObj = {
				data: $.extend([],map),
				count: map.length
			}
		}).fail(function(){
			defer.resolveWith(rtnObj);
		}).done(function(){
			storage.setItem('compMap',map); 
			defer.resolveWith(rtnObj);
			$().SPHelper.debug("PMT.getCompentency - end:" + moment.utc(Date.now()).local().format("HH:mm:ss.SSS"),1);
		});	

		return defer.promise();
	};

	PMT.getFunctions = function(options) {
		$().SPHelper.debug("PMT.getFunctions - start:" + moment.utc(Date.now()).local().format("HH:mm:ss.SSS"),1);
		var defer = $.Deferred();
		var rtnObj = { data: null, count: 0 };
		var listData = [];
		var map = {};
		var mapCompetency = {};
		
		var lclOptions = {
			list: _list["Functions"],
			CAMLQuery: _listQuery["default"],
			CAMLViewFields: _listViewFields["Functions"] ,
			CAMLRowLimit: null,
			mapping: _listMapping["Functions"],
			webURL: $.fn.SPHelper.GetCurrentSite(),
			parentSite: false,
			includeAllAttrs: false,
			removeOws: true,
			debug: false
		}
		
		lclOptions = $.extend({}, lclOptions, options);

		var wait = $.Deferred();
		if(storage.getItem("compMap")==null){
			wait = PMT.getCompetency();
		}else{
			wait.resolve();
		}
		$.when(wait).then(function(){
			mapCompetency = storage.getItem("compMap"); // $.extend([],this.data);
		}).then(function(){
			$.fn.SPHelper.GetListData(lclOptions).then(function(){
				listData = $.extend([],this.data); 
			}).then(function(){
				$.each(listData, function(idx,el){
					map[el.ID] = { ID: el.ID, 
								   Title: el.Title, 
								   Competency: el.Competency.lookupValue, 
								   CompetencyID: el.Competency.lookupId, 
								   IsCompetency: mapCompetency[el.Competency.lookupId].IsCompetency, 
								   CompetencyABBRV: mapCompetency[el.Competency.lookupId].ABBRV,
								   Order: mapCompetency[el.Competency.lookupId].Order };
				});
				
				rtnObj = {
					data: $.extend([],map),
					count: map.length
				}
			}).fail(function(){
				defer.resolveWith(rtnObj);
			}).done(function(){
				storage.setItem('funcMap',map); 
				defer.resolveWith(rtnObj);
				$().SPHelper.debug("PMT.getFunctions - start:" + moment.utc(Date.now()).local().format("HH:mm:ss.SSS"),1);
			});	
		}).fail(function(){
			$.fn.SPHelper.debug("getFunctions - getCompetency failed");
		});
		return defer.promise();
	};

	
	PMT.getDirectives = function(options) {
		var defer = $.Deferred();
		var rtnObj = { data: null, count: 0 };

		var lclOptions = {
			list: _list["Directives"],
			CAMLQuery: _listQuery["Directives"],
			CAMLViewFields: _listViewFields["Directives"] ,
			CAMLRowLimit: null,
			mapping: _listMapping["Directives"],
			webURL: $.fn.SPHelper.GetCurrentSite(),
			parentSite: false,
			includeAllAttrs: false,
			removeOws: true,
			debug: false
		}
		
		lclOptions = $.extend({}, lclOptions, options);

//		if((storage.getItem("RefreshDirectives")=="1") || (storage.getItem("Directives")==null)){
		if(storage.getItem("Directives")==null){
		$().SPHelper.debug("Directives Refreshing");
			$.fn.SPHelper.GetListData(lclOptions).then(function(){
				rtnObj = {
					data: $.extend([],this.data),
					count: this.recordCount
				}
			}).fail(function(){
				defer.resolveWith(rtnObj);
			}).done(function(){
				storage.setItem("Directives",rtnObj.data);
				storage.getItem("RefreshDirectives","0");
				defer.resolveWith(rtnObj);
			});	
		}else{
			var data = storage.getItem("Directives");
			rtnObj = {
				data: $.extend([],data),
				count: data.length
			}
			defer.resolveWith(rtnObj);
		}


		return defer.promise();
	};
	
	PMT.getStandards = function(options) {
		var defer = $.Deferred();
		var rtnObj = { data: null, count: 0 };

		var lclOptions = {
			list: _list["Standards"],
			CAMLQuery: _listQuery["Standards"],
			CAMLViewFields: _listViewFields["Standards"] ,
			CAMLRowLimit: null,
			mapping: _listMapping["Standards"],
			webURL: $.fn.SPHelper.GetCurrentSite(),
			parentSite: false,
			includeAllAttrs: false,
			removeOws: true,
			debug: false
		}
		
		lclOptions = $.extend({}, lclOptions, options);
		
		$.fn.SPHelper.GetListData(lclOptions).then(function(){
			rtnObj = {
				data: $.extend([],this.data),
				count: this.recordCount
			}
		}).fail(function(){
			defer.resolveWith(rtnObj);
		}).done(function(){
			defer.resolveWith(rtnObj);
		});	

		return defer.promise();
	};

	PMT.getActions = function(options) {
		$().SPHelper.debug("PMT.getActions - start:" + moment.utc(Date.now()).local().format("HH:mm:ss.SSS"),1);
		var defer = $.Deferred();
		var rtnObj = { data: null, count: 0 };
		var mapFunc = {};
		
		var lclOptions = {
			list: _list["Actions"],
			CAMLQuery: _listQuery["Actions"],
			CAMLViewFields: _listViewFields["Actions"],
			CAMLRowLimit: null,
			mapping: _listMapping["Actions"],
			webURL: $.fn.SPHelper.GetCurrentSite(),
			parentSite: false,
			includeAllAttrs: false,
			removeOws: true,
			debug: false
		}
		
		lclOptions = $.extend({}, lclOptions, options);

		var dsData = {};
		var actions = {
			ttlHrs: parseFloat("0.0"),
			entry: []
		};
		
		//PMT.getFunctions().then(function(){


		var wait = $.Deferred();
		if(storage.getItem("funcMap")==null){
			wait = PMT.getFunctions();
		}else{
			wait.resolve();
		}
		$.when(wait).then(function(){
			mapFunc = storage.getItem("funcMap"); //$.extend([],this.data);
		}).then(function(){
			$.fn.SPHelper.GetListData(lclOptions).then(function(){
				dsData = $.extend([],this.data)
			}).then(function(){
				$.each(dsData, function(idx, el){
					actions.entry[el.ID] = { 
						ID: el.ID, 
						Title: el.Title,
						Function: mapFunc[el.Func.lookupId].Title,
						Competency: { ID: mapFunc[el.Func.lookupId].CompetencyID,
									  Title: mapFunc[el.Func.lookupId].Competency,
									  ABBRV: mapFunc[el.Func.lookupId].CompetencyABBRV,
									  IsCompetency: mapFunc[el.Func.lookupId].IsCompetency,
									  Order: mapFunc[el.Func.lookupId].Order
									},
						EffortType:  el.EffortType.split(";#")[1],
						Directive:  { ID: el.Directive.lookupId , Title: el.Directive.lookupValue },
						Standard:  { ID: el.Standard.lookupId , Title: el.Standard.lookupValue },
						CompleteDate:  $.fn.SPHelper.DateFormat(el.CompleteDate,"shortDate"), 
						ReportMonth:  el.RptMon,
						ReportYear:  el.RptYr,
						StartOfWeek:  $.fn.SPHelper.DateFormat(el.SOW,"shortDate"),
						EndOfWeek:  $.fn.SPHelper.DateFormat(el.EOW,"shortDate"),
						Author:  el.Author,
						Hours: parseFloat(el.Hours) 
					};
				});
			}).then(function(){
				rtnObj = {
					data: $.extend([],actions),
					count: this.recordCount
				}
			}).fail(function(){
				rtnObj = {
					data: $.extend([],actions),
					count: this.recordCount
				}

				defer.resolveWith(rtnObj);
			}).done(function(){
				defer.resolveWith(rtnObj);
				$().SPHelper.debug("PMT.getActions - end:" + moment.utc(Date.now()).local().format("HH:mm:ss.SSS"),1);
			});	
		});
		return defer.promise();
	};

	PMT.getDirectiveActions = function(options) {
		var defer = $.Deferred();
		var rtnObj = { data: null, count: 0 };

		var lclOptions = {
			list: _list["Actions"],
			CAMLQuery: _listQuery["DirectivesActions"],
			CAMLViewFields: _listViewFields["DirectivesActions"],
			CAMLRowLimit: null,
			mapping: _listMapping["Actions"],
			webURL: $.fn.SPHelper.GetCurrentSite(),
			parentSite: false,
			includeAllAttrs: false,
			removeOws: true,
			debug: false
		}
		
		lclOptions = $.extend({}, lclOptions, options);

		var dsData = {};
		var actions = {
			ttlHrs: parseFloat("0.0"),
			entry: []
		};
		
		$.fn.SPHelper.GetListData(lclOptions).then(function(){
			dsData = $.extend([],this.data)
		}).then(function(){
			var tempArr = [];
			$.each(dsData, function(idx, el){
				var ID = el.Directive.lookupId;
				actions.ttlHrs += parseFloat(el.Hours);
				if($.inArray(ID,tempArr) == -1 ){
					tempArr.push(ID);
					actions.entry[ID] = { ID: ID, Hours: parseFloat(el.Hours) };
				}else{
					actions.entry[ID].Hours += parseFloat(el.Hours) ;
				}
			});
		}).then(function(){
			rtnObj = {
				data: $.extend(true,[],actions),
				count: this.recordCount
			}
		}).fail(function(){
			defer.resolveWith(rtnObj);
		}).done(function(){
			defer.resolveWith(rtnObj);
		});	

		return defer.promise();
	};
	
	PMT.getPrimaryOrganizations = function(options) {
		var defer = $.Deferred();
		var rtnObj = { data: null, count: 0 };

		var lclOptions = {
			list: _list["SubOrganizations"],
			CAMLQuery: _listQuery["SubOrganizations"],
			CAMLViewFields: _listViewFields["SubOrganizations"],
			CAMLRowLimit: null,
			mapping: _listMapping["SubOrganizations"],
			webURL: $.fn.SPHelper.GetCurrentSite(),
			parentSite: false,
			includeAllAttrs: false,
			removeOws: true,
			debug: false
		}
		
		lclOptions = $.extend({}, lclOptions, options);

		var jsonData=[];
		var tagMap = {};

		//if(storage.getItem("PrimOrgs")==null){
			$.fn.SPHelper.GetListData(lclOptions).then(function(){
				jsonData = $.extend([],this.data);
			}).then(function(){
				for (i = 0; jsonData.length > i; i += 1) {    
					tagMap[jsonData[i].ID] = jsonData[i];
				};
			}).then(function(){
				rtnObj = {
					data: $.extend({},tagMap),
					count: tagMap.length
				}
			}).fail(function(){
				defer.resolveWith(rtnObj);
			}).done(function(){
				//storage.setItem("PrimOrgs",rtnObj.data)
				defer.resolveWith(rtnObj);
			});	
		/*}else{
			var data = storage.getItem("PrimOrgs");
			rtnObj = {
				data: $.extend([],data),
				count: data.length
			}
			defer.resolveWith(rtnObj);
		}*/

		return defer.promise();
	};

	
	PMT.getSuspense = function(vDate,status,completeDate){
		var img = $("<img style='width:16px;'/>");
		var val = 0;
		//if date is greater than 30 then green, 30 to 10 then yellow, 10 or less then red, else 'white'
		var sDate = moment(vDate);
		var now = moment();
		var daysDiff = (sDate.diff(now, 'days')+1);
	
		if(status == 'Complete'){
			img.attr("class","powerTip");
			img.attr("src","SiteAssets/images/green_svg.png");
			if((completeDate == "") || (completeDate == null)){
				img.attr('data-powertip', 'Completed: - No Date Entered -');
			}else{
				img.attr('data-powertip', 'Completed: ' + $.fn.SPHelper.DateFormat(completeDate,"shortDate"));
			}
		}else{
			switch(true){
				case (daysDiff > 10):
					img.attr("class","powerTip");
					img.attr("src","SiteAssets/images/greendot.png");
					img.attr('data-powertip', daysDiff +' days until suspense');
					break;
				case (daysDiff > 1):
					img.attr("class","powerTip");
					img.attr("src","SiteAssets/images/yellowdot.png");
					img.attr('data-powertip', daysDiff +' day(s) remain');
					break;
				case (daysDiff >= 0):
					img.attr("class","powerTip");
					img.attr("src","SiteAssets/images/reddot.png");
					img.attr('data-powertip', daysDiff +' day(s) remain');
					break;
				case (daysDiff < 0):
					img.attr("class","powerTip");
					img.attr("src","SiteAssets/images/reddot.png");
					img.attr('data-powertip', 'OverDue '+ -1*(daysDiff) +' days');
					break;
				default:			
					img.attr("class","powerTip");
					//img.attr("src","SiteAssets/images/white_svg.png");
					img.attr("src","SiteAssets/images/reddot.png");
					img.attr('data-powertip', 'Missing / No Data');
					break;
			}
		}
	
		return img.prop('outerHTML');
	}	

	PMT.getResourced = function(equipped,trained,MH){
		var img = $("<img style='width:16px;'/>");
		img.attr("class","powerTip");
		img.attr('data-powertip', '' + PMT.getMHStatus(MH) + '&nbsp;Man Hours (MH)<br/>' + PMT.getDot(equipped) + '&nbsp;Equipped<br/>' + PMT.getDot(trained)+'&nbsp;Trained');
		var val = 0;	
		if(typeof equipped === 'string'){
			equipped = parseInt(equipped.split(";")[1]);
		}
		if(typeof trained === 'string'){
			trained = parseInt(trained.split(";")[1]);
		}
		
		switch(true){
			case isNaN(MH):
				val = 0;
				break;
			case (MH <= 0):
				val = 0;
				break;
			case (MH < 10):
				val = 1;
				break;
			case (MH < 20):
				val = 2;
				break;
			case (MH >= 20):
				val = 3;
				break;
			default:
				val = 0;
				break;
		}

		switch(true){
			case (equipped == 1):
				val += 3;
				break;
			case (equipped == 2):
				val += 2;
				break;
			case (equipped == 3):
				val += 1;
				break;
			default:
				val += 0;
				break;
		}

		switch(true){
			case (trained == 1):
				val += 3;
				break;
			case (trained == 2):
				val += 2;
				break;
			case (trained == 3):
				val += 1;
				break;
			default:
				val += 0;
				break;
		}

		switch(true){
			case isNaN(val):
				img.attr("src","SiteAssets/images/reddot.png");
				break;
			case (val <= 0):
				img.attr("src","SiteAssets/images/reddot.png");
				break;
			case (val <= 5 ):
				img.attr("src","SiteAssets/images/reddot.png");
				break;
			case (val <= 7 ):
				img.attr("src","SiteAssets/images/yellowdot.png");
				break;
			case (val <= 9):
				img.attr("src","SiteAssets/images/greendot.png");
				break;
			default:
				img.attr("src","SiteAssets/images/reddot.png");
				break;
		}
	
		return img.prop('outerHTML');
	}

	PMT.getMHStatus = function(val){
		var img = $("<img style='width:16px;'/>");
	
		switch(true){
			case isNaN(val):
				img.attr("class","powerTip");
				img.attr("src","SiteAssets/images/reddot.png");
				img.attr('data-powertip', 'Missing / No Data');
				break;
			case (val < 10):
				img.attr("class","powerTip");
				img.attr("src","SiteAssets/images/reddot.png");
				img.attr('data-powertip', val+'% Remains');
				break;
			case (val < 20):
				img.attr("class","powerTip");
				img.attr("src","SiteAssets/images/yellowdot.png");
				img.attr('data-powertip', val+'% Remains');
				break;
			case (val >= 20):
				img.attr("class","powerTip");
				img.attr("src","SiteAssets/images/greendot.png");
				img.attr('data-powertip', val+'% Remains');
				break;
			default:
				img.attr("class","powerTip");
				img.attr("src","SiteAssets/images/reddot.png");
				img.attr('data-powertip', 'Missing / No Data');
				break;
		}
		return img.prop('outerHTML');
	}	

	PMT.getSquare = function(num){
		var img = $("<img style='width:14px;'/>");
	
		var val = 0;
		if(isNaN(num)){ 
			if(typeof num === 'string'){
				val = parseInt(num.split(";")[1]);
			}else{
				val = "";
			}
		}else{ 
			val = num; 
		}
		switch(true){
			case (val==""):
				img.attr("class","powerTip");
				img.attr("src","SiteAssets/images/red_svg.png");
				img.attr('data-powertip', 'Missing / No Data');
				break;
			case (val<=0):
				img.attr("class","powerTip");
				img.attr("src","SiteAssets/images/red_svg.png");
				img.attr('data-powertip', 'Missing / No Data');
				break;
			case (val<=1):
				img.attr("class","powerTip");
				img.attr("src","SiteAssets/images/green_svg.png");
				img.attr('data-powertip', 'On Track');
				break;
			case (val<=2):
				img.attr("src","SiteAssets/images/yellow_svg.png");
				break;
			case (val<=3):
				img.attr("src","SiteAssets/images/red_svg.png");
				break;
			default:			
				img.attr("class","powerTip");
				img.attr("src","SiteAssets/images/red_svg.png");
				img.attr('data-powertip', 'Missing / No Data');
				break;
		}
	
		return img.prop('outerHTML');
	}

	PMT.getDot = function(num){
		var img = $("<img style='width:16px;'/>");
		
		var val = 0;
		if(isNaN(num)){ 
			if(typeof num === 'string'){
				val = parseInt(num.split(";")[1]);
			}else{
				val = "";
			}
		}else{ 
			val = num; 
		}
		switch(true){
			case (val==""):
				img.attr("class","powerTip");
				img.attr("src","SiteAssets/images/reddot.png");
				img.attr('data-powertip', 'Missing / No Data');
				break;
			case (val<=1):
				img.attr("src","SiteAssets/images/greendot.png");
				break;
			case (val<=2):
				img.attr("src","SiteAssets/images/yellowdot.png");
				break;
			case (val<=3):
				img.attr("src","SiteAssets/images/reddot.png");
				break;
			default:			
				img.attr("class","powerTip");
				img.attr("src","SiteAssets/images/reddot.png");
				img.attr('data-powertip', 'Missing / No Data');
				break;
		}
	
		return img.prop('outerHTML');
	}	
	
	PMT.setSessionVar = function(key,value){
		storage.setItem(key,value);
	}
	
	PMT.getSessionVar = function(key){
		return storage.getItem(key)
	}
	
	var storage = {
	  storageAdaptor: sessionStorage,
	
	  // Thanks Angus! - http://goo.gl/GtvsU
	  toType: function(obj) {
	    return ({}).toString.call(obj).match(/\s([a-z|A-Z]+)/)[1].toLowerCase();
	  },
	
	  getItem: function(key) {
	    var item = this.storageAdaptor.getItem(key);
	
	    try {
	      item = JSON.parse(item);
	    } catch (e) {}
	
	    return item;
	  },
	
	  setItem: function(key, value) {
	    var type = this.toType(value);
	
	    if (/object|array/.test(type)) {
	      value = JSON.stringify(value);
	    }
	
	    this.storageAdaptor.setItem(key, value);
	  },
	
	  removeItem: function(key) {
	    this.storageAdaptor.removeItem(key);
	  }
	};
	//Sort an array of objects
	function sort_by(field, reverse, primer){
	   var key = function (x) {return primer ? primer(x[field]) : x[field]};
	
	   return function (a,b) {
		  var A = key(a), B = key(b);
		  return ( (A < B) ? -1 : ((A > B) ? 1 : 0) ) * [-1,1][+!!reverse];                  
	   }
	}

}( window.PMT = window.PMT || {}, jQuery ));

