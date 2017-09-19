/**
 *  @file SPHelper
 *  @description Using the external libraries of {@link  http://jquery.com/|jQuery} and {@link  http://spservices.codeplex.com/|SPServices}, SPHelper can assist in the rapid development of SharePoint solutions using client-side browser processing.
 *  @author Christopher J Stoll [christopher.j.stoll.ctr@mail.mil]
 *  @version 2015.02
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

/* jshint undef: true */
/* global L_Menu_BaseUrl, _spUserId, _spPageContextInfo */
/**
 * @name SPHelper
 * @namespace SPHelper 
 */
(function ($) {
	"use strict";
	
	/** Local [PRIVATE] Variables */
	/**
	  *	@var {string}
	  * @global
	  */
	var VERSION = "2015.02"; // TODO: Update version
	/**
	  *	@var {string}
	  * @global
	  */
	var SLASH = "/";
	/**
	  *	@var {string}
	  * @global
	  */
	var SPLITLOOKUP = ";#";
	/**
	  *	@type {string}
	  * @global
	  */
	var blnSUCCESS = /success/;
	/**
	  *	@type {string}
	  * @global
	  */
	var blnTRUE = /1/;
	
	/** SharePoint AJAX Stuff */
	var SCHEMASharePoint = "http://schemas.microsoft.com/sharepoint";
	var SOAPEnvelope = {};
	    SOAPEnvelope.header = "<soap:Envelope xmlns:xsi='http://www.w3.org/2001/XMLSchema-instance' xmlns:xsd='http://www.w3.org/2001/XMLSchema' xmlns:soap='http://schemas.xmlsoap.org/soap/envelope/'><soap:Body>";
	    SOAPEnvelope.footer = "</soap:Body></soap:Envelope>";
	    SOAPEnvelope.payload = "";
	var SOAPAction;

	/** 
	 *  @var {object} URL
	 *  @property {string} URL.site
	 *  @property {string} URL.parent
	 *  @property {string} URL.collection
	 *  @property {string} URL.root
	  * @global
	 *  @description URL object holds the URI values for the local site, the parent site, the site collection, and the SharePoint root.
	 */
	var URL = {};
		URL.site;
		URL.parent;
		URL.collection;
		URL.root;
		
	/** 
	 *  @var {object} settings
	 *  @property {string} settings.DEBUG=false
	 *  @property {string} settings.SHOW_XML=false
	 *  @property {string} settings.SITECOLLECTIONS=sites
	 *  @property {string} settings.SITE_URL=null
	  * @global
	 *  @description The 'settings' object has properties that are globally used by SPHelper's functions. The 'settings' object is a protected variable/object and using the global 'defaults' object or init() function should be used to directly set these values.
	 */
    var settings = {};
		settings.DEBUG = false;
		settings.SHOW_XML = false;
		settings.SITECOLLECTIONS = "sites";
		settings.SITE_URL = null;

	/**
	 * @lends SPHelper
	 */
	$.fn.SPHelper = function () {
	}; // End $.fn.SPHelper

	/**
	 *  @var {object} defaults
	 *  @property {string} defaults.DEBUG=false
	 *  @property {string} defaults.SHOW_XML=false
	 *  @property {string} defaults.SITECOLLECTIONS=sites
	 *  @property {string} defaults.SITE_URL=null
	 *  @global
	 *  @description Change the 'settings' object values.  Use the init() function and pass in the appropriate object.<br/>However, the global defaults object is created so they can use it instead and then simply call the init() function without the 'options' object to merge all objects together to configure the 'settings' object.
	 */
	$.fn.SPHelper.defaults = {
		DEBUG: false,
		SHOW_XML: false,
		SITECOLLECTIONS: "sites",
		SITE_URL: null
	}; // End $.fn.SPHelper.defaults

	/** Utility Functions **/

	/**
	 * @method
	 * @name SPHelper#init
	 * @param {Object} options
	 * @see defaults
	 * @see settings
	 * @description User function to be used to pass in an object that sets the 'settings' object defaults
	 * @example 
	 * $().SPHelper.init({
			DEBUG: false,
			SITE_URL: "https://my.site.com/"
		});
	 */
	$.fn.SPHelper.init = function(options) {
	    // Extend defaults with user supplied options and call the merged obj 'settings'
	    settings = $.extend({}, $.fn.SPHelper.defaults, options);
	}; // End $.fn.SPHelper.init
	
	/**
	 * @method
	 * @name SPHelper#debug
	 * @param {boolean} off
	 * @description Debug function - used to enable the IE console outputs
	 * @example 
	 * $().SPHelper.debug();
	 */
	$.fn.SPHelper.debug = function(str,type) {
		settings.DEBUG = true;
		debug(str,type);
	}; // End $.fn.SPHelper.debug
	
	/**
	 * @method
	 * @name SPHelper#debugXML
	 * @param {boolean} off
	 * @description Debug XML - used to enable the IE console output to show XML results of SPServices functions.
	 * @example 
	 * $().SPHelper.debugXML();
	 */
	$.fn.SPHelper.debugXML = function(off) {
		if(off==0 || ((isBoolean(off)==true) && (off==false))){
			//Do nothing if 0 or false is passed
			//Makes it easy for the user to turn off debug mode
			//without having to comment out the debug() function.
			$.fn.SPHelper.init({SHOW_XML: false});
		}else{
			$.fn.SPHelper.init({SHOW_XML: true});
		}
	}; // End $.fn.SPHelper.debug
		
	/**
	 * @method
	 * @name SPHelper#version
	 * @return {string} VERSION
	 * @description Get the plugin's version number
	 * @example 
	 * $().SPHelper.version();
	 */
	$.fn.SPHelper.version = function () {
	    return VERSION;
	};  // End $.fn.SPHelper.Version
	
	/**
	 * @method
	 * @name SPHelper#GetSiteURL
	 * @param {Object} options
	 * @return {string} The URL
	 * @description Get the Site's URL
	 * @example 
	 * // returns the URL string for the current site 
	 * $().SPHelper.GetSiteURL();
	 */
	$.fn.SPHelper.GetSiteURL = function (options) {
		if(isUndefined(URL.site)||(URL.site=="")){ GetURLs(options); }
		return URL.site;
	};  // End $.fn.SPHelper.GetSiteURL
	
	/**
	 * @method
	 * @name SPHelper#GetParentURL
	 * @param {Object} options
	 * @see SPHelper#defaults{} - for valid 'options' parameters
	 * @return {string} The URL
	 * @description Get the Parent URL
	 * @example 
	 * // returns the URL string for the parent site 
	 * $().SPHelper.GetParentURL();
	 */
	$.fn.SPHelper.GetParentURL = function (options) {
		if(isUndefined(URL.parent)||(URL.parent=="")){ GetURLs(options); }
		return URL.parent;
	};  // End $.fn.SPHelper.GetParentURL

	/**
	 * @method
	 * @name SPHelper#GetCollectionURL
	 * @param {Object} options
	 * @see SPHelper#defaults{} - for valid 'options' parameters
	 * @return {string} The URL
	 * @description Get the Site Collection's URL
	 * @example 
	 * // returns the URL string for the site collection
	 * $().SPHelper.GetCollectionURL();
	 */
	$.fn.SPHelper.GetCollectionURL = function (options) {
		if(isUndefined(URL.collection)||(URL.collection=="")){ GetURLs(options); }
		return URL.collection;
	};  // End $.fn.SPHelper.GetCollectionURL

	/**
	 * @method
	 * @name SPHelper#GetRootURL
	 * @param {Object} options
	 * @see SPHelper#defaults{} - for valid 'options' parameters
	 * @return {string} The URL
	 * @description Get the Site's Root URL
	 * @example 
	 * // returns the URL string for the root site 
	 * $().SPHelper.GetRootURL();
	 */
	$.fn.SPHelper.GetRootURL = function (options) {
		if(isUndefined(URL.root)||(URL.root=="")){ GetURLs(options); }
		return URL.root;
	};  // End $.fn.SPHelper.GetRootURL

	/**
	 * @method
	 * @name SPHelper#GetCurrentSite
	 * @param {Object} options
	 * @see SPHelper#defaults{} - for valid 'options' parameters
	 * @return {string} The URL
	 * @description Get the Current Site URL - alternative to using SPServices similar function
	 * @example 
	 * // returns the URL string for the current site 
	 * $().SPHelper.GetCurrentSite();
	 */
	$.fn.SPHelper.GetCurrentSite = function (options) {
		if(isUndefined(URL.site)||(URL.site=="")){ GetURLs(options); }
		return URL.site;
    }; // End $.fn.SPHelper.GetCurrentSite
	
	/**
	 * @method
	 * @name SPHelper#GetListGUID
	 * @param {Object} options
	 * @property {string} options.list - the name or GUID of the list
	 * @property {boolean} options.parentSite - pass 'true' if the list exists at the current site's parent level
	 * @return {string} the GUID of the list
	 * @description Get the GUID of a provided list name
	 * @example 
	 * // returns the GUID string for the given listname
	 * $().SPHelper.GetListGUID({list: "listname", parentSite: false});
	 */
	$.fn.SPHelper.GetListGUID = function(options){
		var lclOptions = {
			list: null,
			parentSite: false,
			webURL: $.fn.SPHelper.GetCurrentSite()
		}
		lclOptions = $.extend({}, lclOptions, options);

		var strGUID = getGUID_byName({list:lclOptions.list,parentSite:lclOptions.parentSite,webURL:lclOptions.webURL});
		return strGUID;
	}; // End $.fn.SPHelper.GetListGUID
	
	/**
	 * @method
	 * @name SPHelper#GetListStatus
	 * @param {Object} options
	 * @property {string} options.list - the name or GUID of the list
	 * @property {boolean} options.parentSite - pass 'true' if the list exists at the current site's parent level
	 * @return {boolean} the hidden status
	 * @description Get the visible/hidden status of a list. Can be used to look at the current and parent site lists - default is current site
	 */
	$.fn.SPHelper.GetListStatus = function(options){
		return getList_HiddenStatus(options);	
	}; // End $.fn.SPHelper.GetListStatus
	
	/**
	 * @method
	 * @name SPHelper#SetListStatus
	 * @param {Object} options
	 * @property {string} options.list - the name or GUID of the list
	 * @property {boolean} options.parentSite - pass 'true' if the list exists at the current site's parent level
	 * @property {string} options.hidden - pass "True" to hide the list - "False" is the default and will make the list visible
	 * @return {boolean} true/false on the success of setting the list status
	 * @description Set the visible/hidden status of a list. Can be used to look at the current and parent site lists - default is current site
	 */
	$.fn.SPHelper.SetListStatus = function(options){
		return changeListStatus(options)
	}; // End $.fn.SPHelper.SetListStatus
	
	/**
	 * @method
	 * @name SPHelper#FixRequired
	 * @description After SharePoint 2010 ??SP3?? ALL Required Fields of a list have the words 'Required Field' as part of the DOM element's title attribute on forms. This poses a nightmare for finding fields by Title to be used with SPServices and other capabilities. This function strips the 'Required Field' from the DOM element's title attribute.
	 *
	 */
	$.fn.SPHelper.FixRequired = function(){
	    $("[title~='Required'][title~='Field']").each(function(){
		    $(this).attr("title",$(this).attr("title").replace(" Required Field",""));
	    });
	}; //End $.fn.SPHelper.FixRequired

	/**
	 * @method
	 * @name SPHelper#ChangeGlobalNav 
	 * @param {Object} options
	 * @property {string} options.root - set to 'true' if needing to start from the 'Un-ordered List (UL)' that is at the root level of the structure
	 * @property {string} options.findText - text to be used in finding the correct Global Navigation object
	 * @property {string} options.setText - text used to change the Global Navigation object's visible text
	 * @description With SharePoint 2010 the current site has a Global Navigation button sitting in the first position. The display text of the button is the same as the Site's Title property set in the Site Settings > Title, Description, and Icon page. If the Site's Title is long then this function can be used to change the text to something shorter like the Site's URL name or a provided value. Additionally, maybe it just needs to hidden.
	 *
	 */
	$.fn.SPHelper.ChangeGlobalNav = function(options){
		var lclOptions = {
			root: false,
			findText: null,
			setText: null
		}
		lclOptions = $.extend({}, lclOptions, options);
		var topNav = $( '.s4-tn' );
		var rootUL = $( 'ul.root.static' );
		var stdSpan = $( 'span.menu-item-text' );
		var stdUL = $( 'ul.static' );
		var stdLI = $( 'li.static' );
		var stdAnchor = $( 'a.static' );
		var objNav = topNav.find(rootUL).find(stdLI).find(stdAnchor).filter(":first");
		objNav.text();
		
		if(lclOptions.root){
			if(lclOptions.setText == null){
				var title = topNav.find(rootUL).find(stdLI).find(stdAnchor).filter(":first").attr("Title");
				topNav.find(rootUL).find(stdLI).find(stdAnchor).find(stdSpan).filter(":first").text(title);
			}else{
				topNav.find(rootUL).find(stdLI).find(stdAnchor).find(stdSpan).filter(":first").text(lclOptions.setText);
			}
		}else{
			if((lclOptions.findText == null)&&(lclOptions.setText == null)){
				var link = $.fn.SPHelper.GetCurrentSite().split("/");
				objNav.text(link[link.length-1].toUpperCase());
			}else{
				var list = topNav.find(rootUL).find(stdLI).find(stdSpan);
				
				$(list.get().reverse()).each(function () {
					if($(this).text() == lclOptions.findText){
						$(this).text(lclOptions.setText);
					}
				});
			}
		}
		options = lclOptions = null;
		//debug(topNav.find(rootUL).find(stdLI).find(stdAnchor).find(stdSpan).first().text());
	};

	/**
	 * @method
	 * @name SPHelper#Add_TopLink
	 * @param {Object} options
	 * @property {string} options.title - text visible to the user
	 * @property {string} options.URL - URL to be used for the link  //TODO - not currently implemented
	 * @property {string} options.img - URL to image file to be used 
	 * @property {string} options.position - Position number used to arrange the link - default: 0
	 * @description Use to add a link to the top row of links (RibbonContainer-TabRowLeft) on the SharePoint site where 'Site Actions, Navigation Up, Browse, etc.' reside.
	 */
	$.fn.SPHelper.Add_TopLink = function(options){
		var lclOptions = {
			title: null,
			URL: null, //TODO - not currently implemented
			img: null,
			position: 0
		}

		lclOptions = $.extend({}, lclOptions, options);

		var ribbonContainerRowLeft = document.getElementById("RibbonContainer-TabRowLeft");
		var link = '<a class="ms-menu-a" style="cursor:pointer;white-space:nowrap;" href="javascript:;" title="'+ lclOptions.title +'" onclick="window.location=\'/\';return false;">';
		if(lclOptions.URL){
			var daLink = "window.location.href='" + lclOptions.URL +"';";
			link = '<a class="ms-menu-a" style="cursor:pointer;white-space:nowrap;" href="javascript:;" title="'+ lclOptions.title +'" onclick="window.location=\'' + lclOptions.URL + '\';return false;">';
		}
		
		if(lclOptions.img){
			link += '<img src="'+ lclOptions.img +'" height="18px"  border="0px"/>';
		}else{
			link += lclOptions.title;
		}
		link += '</a>';

		if( ribbonContainerRowLeft != null ){
			if( ribbonContainerRowLeft.children != null && ribbonContainerRowLeft.children[0] != null ){  
				var newSpan = document.createElement("span");
				newSpan.className = "ms-siteactionsmenu";
				newSpan.style.alignContent = "center";
				newSpan.style.alignItems = "center";
				newSpan.style.textAlign = "center";
				newSpan.style.padding = "0px 0px 0px 8px";
				var linkSpan = document.createElement("span");
				linkSpan.innerHTML = link;
				linkSpan.className = 'ms-siteactionsmenuinner';
				linkSpan.style.alignContent = "center";
				linkSpan.style.alignItems = "center";
				linkSpan.style.textAlign = "center";
				linkSpan.style.padding = "4px 0px 0px 8px";
				linkSpan.onmouseover= function() {  this.className = "ms-siteactionsmenuhover"}; 
				linkSpan.onmouseout= function() {  this.className = "ms-siteactionsmenuinner"}; 
				newSpan.appendChild(linkSpan);
				ribbonContainerRowLeft.insertBefore(newSpan, ribbonContainerRowLeft.children[lclOptions.position]);
			}
		}
		options = lclOptions = null;
	};

	/**
	 * @method
	 * @name SPHelper#GetURLParam
	 * @param {string} name - Name of the URL parameter to retrieve the value
	 * @return {Value} Returns the value of the given parameter
	 * @description Returns the given URL parameter name's value
	 */
	$.fn.SPHelper.GetURLParam = function(name){
	     var results = new RegExp('[\\?&]' + name + '=([^&#]*)').exec(window.location.href);
	     if (results==null){
	        return null;
	     }
	     else{
	        return results[1] || 0;
	     }
	};

	/**
	 * @method
	 * @name SPHelper#GetLookUp
	 * @param {string} str - LookUp value string
	 * @param {integer} el - element number - default: one (1), use zero (0) to get the LookUp's ID
	 * @description With SharePoint, LookUp column fields typically contain the LookUp's String and ID values.  GetLookUp by default returns the string value. If the element (el) value of zero (0) is used then the ID is returned.
	 * @return {string}
	 */
	$.fn.SPHelper.GetLookUp = function(str,el){
		if(isUndefined(str)){
			return false;
		}
		//Make sure a string used - just incase the object is passed.
		if(isObject(str)){ str = str.val();	}
		//If element value is not provided or not a number then use element value 1
		if(isUndefined(el) || !isNumber(el) || el > 1){ el = 1; }
		
		return str.split(SPLITLOOKUP)[el];
	};
	/**
	 * @method
	 * @name SPHelper#setMultiSelectLookup
	 * @description Set the values of a Multiple Select Lookup field on the SharePoint form
	 *
	 */
	$.fn.SPHelper.setMultiSelectLookup = function(el,values){
		//First clear the 'selected' element
		var nameAttr = $("select[title='" + el + " possible values']").prop("name");
		var namePrefix = nameAttr.replace("SelectCandidate","");
		var selectedValues = [];

		var existing = $("select[name='"+ namePrefix +"SelectResult'][title='" + el + " selected values']").html();
		if(!(typeof existing === 'undefined')){
			var split1 = existing.split("</OPTION>");
			$.each(split1, function(){
				selectedValues.push(this.split(">")[1]);
			});
		    $.each(selectedValues, function(){
		        $("select[name='"+ namePrefix +"SelectResult'][title='" + el + " selected values'] option:contains(" + this + ")")
	                .remove()
	                .appendTo($("select[name='"+ namePrefix +"SelectCandidate'][title='" + el + " possible values']"));
		    });
	        $("input[name='"+ namePrefix +"MultiLookupPicker']").val('');
	    }
		
		var inputStr = "";
		if(values!=null){
		    $.each(values, function(){
		    	
		        $("select[name='"+ namePrefix +"SelectCandidate'][title='" + el + " possible values'] option:contains(" + this.split(";#")[1] + ")")
		                .remove()
		                .appendTo($("select[name='"+ namePrefix +"SelectResult'][title='" + el + " selected values']"));
		        inputStr += this + ";#";
	
		    });
		    inputStr = inputStr.substring(0,inputStr.length-2).replace(/;#/g,"|t");
		    $("input[name='"+ namePrefix +"MultiLookupPicker']").val(inputStr);
		}
	    return false;   
	}

	/**
	 * @method
	 * @name SPHelper#PopSelect
	 * @param {Object} options
	 * @property {Object} options.obj - DropDown List Object to be populated and passed in as a jQuery object - e.g. $("select[id*='ddObject']")
	 * @property {string} options.list - List name/GUID used to retrieve the contents for the dropdown's options
	 * @property {boolean} options.parentSite - indicates that the list is to be retrieved from the same site collection or the parent level - default: false
	 * @property {string} options.field - the field name within the list to be retrieved and used for the dropdown option's text attribute - default: 'Title'
	 * @property {string} options.fieldValue - the field name within the list to be retrieved and use for the dropdown option's value attribute - default: 'Title'
	 * @property {string} options.filterField - the name of the field to be used to filter the list results
	 * @property {string} options.filterValue - the value to be applied in order to filter the list results
	 * @property {string} options.selectText - custom text to show on the dropdown to tell the user to pick a value. If not provided (null) then the 'field' name is used.
	 * @property {boolean} options.useRecordID - set to 'true' in order to use the 'ID' field of the list as the fieldValue, alternatively setting the fieldValue to 'ID' will produce the same result
	 * @property {boolean} options.useLookUpIndex - if the field is a LookUp column in the list and the LookUp's ID is to be used for the fieldValue then set to 'true'
	 * @property {string} options.noDataMsg - custom text to be used to indicate to the user that 'No Data' was found.  //TODO
	 * @property {string} options.webURL - URL where the list resides - default: Current Site - (used by SPServices function)
	 * @property {string} options.CAMLQueryOptions - CAML Query options (used by SPServices function)
	 * @property {string} options.CAMLViewFields - CAML View fields (used by SPServices function)
	 * @property {string} options.CAMLQuery - CAML Query (used by SPServices function)
	 * @description Use to populate a dropdown control by querying a SharePoint list.
	 *
	 */
	$.fn.SPHelper.PopSelect = function(options){
		var jsonObj;
		var selArray = {};
		var deferred = new $.Deferred();
		var resultData = {};
		
		var lclOptions = {
			obj: null,
			list: null,
			parentSite: false,
			field: "Title",
			fieldValue: "Title",
			filterField: null,
			filterValue: null,
			filterTwoFields: false,
			selectText: null,
			selectValue: 0,
			markSelected: false,
			markSelectedByValue: true,
			markSelectedValue: null,
			useRecordID: true,
			useLookUpIndex: false,
			useCAMLContains: false,
			noDataMsg: null,  //TODO
			webURL: $.fn.SPHelper.GetCurrentSite(),
			CAMLQueryOptions: "<QueryOptions><ExpandUserField>True</ExpandUserField></QueryOptions>",
			CAMLViewFields: "<ViewFields><FieldRef Name='ID' /><FieldRef Name='Title' /></ViewFields>",
			//CAMLQuery: "<Query><OrderBy><FieldRef Name='Title' Ascending = 'TRUE'/></OrderBy></Query>",
			CAMLQuery: "",
			debug: false		
		}

		lclOptions = $.extend({}, lclOptions, options);
		settings.DEBUG = lclOptions.debug;

	debug("***** PopSelect for: " + lclOptions.selectText + " ******");

		// Make sure we are working with a drop-down box
		if(isObject(lclOptions.obj) && (/SELECT/.test(lclOptions.obj.prop("tagName")))){

			//Change the local options webURL property to the Parent site URL if parentSite property is TRUE
			if(lclOptions.parentSite){ lclOptions.webURL = $.fn.SPHelper.GetParentURL(); }

			//If the list is not a GUID then get the List's GUID
			if(!(isGUID(lclOptions.list))){ lclOptions.list = getGUID_byName({list:lclOptions.list,parentSite:lclOptions.parentSite,webURL:lclOptions.webURL}); }

			if(lclOptions.selectText == null){ lclOptions.selectText = "[Select "+ lclOptions.field +"]"; }
			if(lclOptions.useRecordID){	lclOptions.fieldValue = "ID"; }		
			if (lclOptions.CAMLQuery == "") {
			    if (!(/Title/.test(lclOptions.field))) {
			        lclOptions.CAMLViewFields = "<ViewFields><FieldRef Name='ID' /><FieldRef Name='" + lclOptions.field + "' /></ViewFields>";
			        if (!(/Title/.test(lclOptions.fieldValue))) {
			            if (lclOptions.fieldValue === lclOptions.field) {
			                lclOptions.CAMLViewFields = "<ViewFields><FieldRef Name='ID' /><FieldRef Name='" + lclOptions.field + "' /></ViewFields>";
			            } else {
			                lclOptions.CAMLViewFields = "<ViewFields><FieldRef Name='ID' /><FieldRef Name='" + lclOptions.fieldValue + "' /><FieldRef Name='" + lclOptions.field + "' /></ViewFields>";
			            }
			        }
			        lclOptions.CAMLQuery = "<Query><OrderBy><FieldRef Name='" + lclOptions.field + "' Ascending = 'TRUE'/></OrderBy></Query>";
			    }
			    //Build the <WHERE> clause
			    if ((lclOptions.filterField != null) && (lclOptions.filterValue != null)) {
			        lclOptions.CAMLQuery = "<Query><OrderBy><FieldRef Name='" + lclOptions.field + "' Ascending = 'TRUE'/></OrderBy>";
			        if ((lclOptions.filterValue == "Empty") || (lclOptions.filterValue == "empty")) {
			            lclOptions.CAMLQuery += "<Where><IsNull><FieldRef Name='" + lclOptions.filterField + "'/></IsNull></Where></Query>";
			        } else {
			            if (lclOptions.filterTwoFields && isArray(lclOptions.filterField)) {
			                if (lclOptions.useCAMLContains) {
			                    lclOptions.CAMLQuery += "<Where><And><Contains><FieldRef Name='" + lclOptions.filterField[0] + "'/><Value Type='Text'>" + lclOptions.filterValue[0] + "</Value></Contains><Contains><FieldRef Name='" + lclOptions.filterField[1] + "'/><Value Type='Text'>" + lclOptions.filterValue[1] + "</Value></Contains></And></Where></Query>";
			                } else {
			                    lclOptions.CAMLQuery += "<Where><And><Eq><FieldRef Name='" + lclOptions.filterField[0] + "'/><Value Type='Text'>" + lclOptions.filterValue[0] + "</Value></Eq><Eq><FieldRef Name='" + lclOptions.filterField[1] + "'/><Value Type='Text'>" + lclOptions.filterValue[1] + "</Value></Eq></And></Where></Query>";
			                }
			            } else {
			                if (lclOptions.useCAMLContains) {
			                    lclOptions.CAMLQuery += "<Where><Contains><FieldRef Name='" + lclOptions.filterField + "'/><Value Type='Text'>" + lclOptions.filterValue + "</Value></Contains></Where></Query>";
			                }
			                else {
			                    lclOptions.CAMLQuery += "<Where><Eq><FieldRef Name='" + lclOptions.filterField + "'/><Value Type='Text'>" + lclOptions.filterValue + "</Value></Eq></Where></Query>";
			                }
			            }
			        }
			    }
			}

	debug(lclOptions.CAMLViewFields);
	debug(lclOptions.CAMLQuery);

			//debug(lclOptions);
			jsonObj = $().SPServices.SPGetListItemsJson({
				webURL: lclOptions.webURL,
				operation: "GetListItems",
				async: false, 
				listName: lclOptions.list,
				CAMLViewFields: lclOptions.CAMLViewFields,
				CAMLQueryOptions: lclOptions.CAMLQueryOptions,
				CAMLQuery: lclOptions.CAMLQuery,
				completefunc: function (xData, Status) {
					debug("PopSelect SPServices Query Status: " + Status,1);
					debug(xData,1); 
				}
			}).done(function(){
				resultData = this.data;
				debug("Record Count: " + resultData.length)
			});

			$.when(jsonObj).done(function() {

	debug("When for DD: " + lclOptions.obj.selector);

				//using the function:
				removeOptions(document.getElementById(lclOptions.obj.prop('id')));

				selArray = $.extend([],resultData); // this.data //This is the data (json object) attribute of the object produced by the SPServices function SPGetListItemsJson;
				resultData = null;
				
		debug(selArray);
		
				var optData = [];
				var markSelected = false;
			
				for (var i=0;i<selArray.length;i++){
					if(lclOptions.useLookUpIndex){
						if(isObject(selArray[i][lclOptions.field])){
							if(lclOptions.markSelected){
								if(lclOptions.markSelectedByValue){
									markSelected = (lclOptions.markSelectedValue == selArray[i][lclOptions.field].lookupId);
								}else{
									markSelected = (lclOptions.markSelectedValue == selArray[i][lclOptions.field].lookupValue);
								}
							}
							optData.push({ value: selArray[i][lclOptions.field].lookupId, html: selArray[i][lclOptions.field].lookupValue, selected: markSelected });
							
						}else{
							if(lclOptions.markSelected){
								if(lclOptions.markSelectedByValue){
									markSelected = (lclOptions.markSelectedValue == selArray[i][lclOptions.fieldValue]);
								}else{
									markSelected = (lclOptions.markSelectedValue == selArray[i][lclOptions.field]);
								}
							}
							optData.push({ value: selArray[i][lclOptions.fieldValue], html: selArray[i][lclOptions.field], selected: markSelected });
						}
					}else{
						if(lclOptions.markSelected){
							if(lclOptions.markSelectedByValue){
								markSelected = (lclOptions.markSelectedValue == selArray[i][lclOptions.fieldValue]);
							}else{
								markSelected = (lclOptions.markSelectedValue == selArray[i][lclOptions.field]);
							}
						}
						optData.push({ value: selArray[i][lclOptions.fieldValue], html: selArray[i][lclOptions.field], selected: markSelected });
					}
				}
				
				selArray = null;
				
	debug("optData array is populated:");
	debug(optData);

				//Let's make sure the optData array has unique elements
				var arrPre = {};
				for (var i=0;i<optData.length;i++){
					var item = optData[i];
				    arrPre[ item.value + "|" + item.html ] = item;
				}
				var i = 0;
				var arrPost = [];    
				for(var item in arrPre) {
				    arrPost[i++] = arrPre[item];
				}
				optData = $.extend([],arrPost);
				arrPost = null;
				
	debug("optData array only contains unique choices:");
				
				if(optData.length > 0){
	debug(optData);
					lclOptions.obj.append($("<option>", { value: "0", html: lclOptions.selectText, selected: true }));
					for (var i=0;i<optData.length;i++){
						lclOptions.obj.append($("<option>", $.extend({},optData[i])));
					}
				}else{
	debug("optData has zero (0) records",3);
					lclOptions.obj.append($("<option>", { value: "0", html: "[No data found for "+ lclOptions.field +"]", selected: true }));
				}
				optData = null;			

				debug(lclOptions.obj.selector + " has been populated with the correct options");
				deferred.resolve();
				
				jsonObj = options = lclOptions = null;
			});
		}else{
			debug("This is not an Object or not a SELECT [DropDown] Object.");
			deferred.reject();
			jsonObj = options = lclOptions = null;
		}
		
		return deferred.promise();
	};

	/**
	 * @method
	 * @name SPHelper#CascadeSelects 
	 * @param {Object} options
	 * @property {Object} options.obj - DropDown List Objects to be populated and passed in as a jQuery object - e.g. $("select[id*='ddObject']")
	 * @property {string} options.list - List name/GUID used to retrieve the contents for the dropdown's options
	 * @property {boolean} options.parentSite - indicates that the list is to be retrieved from the same site collection or the parent level - default: false
	 * @property {string} options.field - the field name within the list to be retrieved and used for the dropdown option's text attribute - default: 'Title'
// TODO * @property {string} options.fieldValue - the field name within the list to be retrieved and use for the dropdown option's value attribute - default: 'Title'
	 * @property {string} options.filterField - the name of the field to be used to filter the list results
	 * @property {string} options.filterValue - the value to be applied in order to filter the list results
	 * @property {string} options.selectText - custom text to show on the dropdown to tell the user to pick a value. If not provided (null) then the 'field' name is used.
//TODO * @property {boolean} options.useRecordID - set to 'true' in order to use the 'ID' field of the list as the fieldValue, alternatively setting the fieldValue to 'ID' will produce the same result
	 * @property {boolean} options.useLookUpIndex - if the field is a LookUp column in the list and the LookUp's ID is to be used for the fieldValue then set to 'true'
	 * @property {string} options.noDataMsg - custom text to be used to indicate to the user that 'No Data' was found.  //TODO
	 * @property {string} options.webURL - URL where the list resides - default: Current Site - (used by SPServices function)
	 * @property {string} options.CAMLQueryOptions - CAML Query options (used by SPServices function)
	 * @property {string} options.CAMLViewFields - CAML View fields (used by SPServices function)
	 * @property {string} options.CAMLQuery - CAML Query (used by SPServices function)
	 * @description Use to build and populate a collection of dropdown list controls that cascade in results based on the order of the dropdowns provided.
	 *
	 */
	$.fn.SPHelper.CascadeSelects = function(options){
		var objSelects = [];
		
		var lclOptions = $.extend({},{
			obj: null,
			list: null,
			parentSite: false,
			field: null,
			fieldValue: null,
			filterField: null,
			filterValue: null,
			filterTwoFields: false,
			selectText: null,
			selectValue: 0,
			markSelected: false,
			markSelectedByValue: false,
			markSelectedValue: null,
			useRecordID: false,
			useLookUpIndex: false,
			useCAMLContains: false,
			noDataMsg: null,  //TODO
			webURL: $.fn.SPHelper.GetCurrentSite(),
			CAMLQueryOptions: "<QueryOptions><ExpandUserField>True</ExpandUserField></QueryOptions>",
			CAMLViewFields: "<ViewFields><FieldRef Name='ID' /><FieldRef Name='Title' /></ViewFields>",
			CAMLQuery: "<Query><OrderBy><FieldRef Name='Title' Ascending = 'TRUE'/></OrderBy></Query>",
			debug: false		
		}, options);
		
		var numOptObjs = lclOptions.obj.length;
		settings.DEBUG = lclOptions.debug;

		if(isString(lclOptions.list)){
			var strList = lclOptions.list;
			lclOptions.list = [];
			for(var x=0;x<lclOptions.obj.length;x++){
				lclOptions.list.push(strList);
			}
		}
		
		if(lclOptions.filterField == null){
			lclOptions.filterField = [];
			lclOptions.filterField.push(null);
			for(var x=0;x<lclOptions.obj.length-1;x++){
				lclOptions.filterField.push(lclOptions.field[x]);
			}
		}

		for(var idx=0;idx<numOptObjs;idx++){
			objSelects.push( $(document.getElementById(lclOptions.obj[idx])) );
			objSelects[idx].append("<option>[--TBD--]</option>");
			objSelects[idx].prop("selectIdx",idx);
		}

		var popObj = [];
		var lclList = null;
		var lclSite = null;
		var lclField = null;
		var lclSelectText = null;
		var thisObjID = null;
		var lastDDObj = false;
		for(var idx=0;idx<numOptObjs-1;idx++){
			var ddObj = $("#" + objSelects[idx].prop('id'));
			
			if(isObject(lclOptions.list[idx+1])){
				lclList = lclOptions.list[idx+1][0];
				lclSite = lclOptions.list[idx+1][1];
			}else{
				lclList = lclOptions.list[idx+1];
				lclSite = false;
			}
			if(isObject(lclOptions.field[idx+1])){
				lclField = lclOptions.field[idx+1][0];
				lclSelectText = lclOptions.field[idx+1][1];
			}else{
				lclField = lclOptions.field[idx+1];
				lclSelectText = null;
			}
			
			var markedValue = null;
			if(lclOptions.markSelected){
				markedValue = lclOptions.markSelectedValue[idx+1];
			}
			
			ddObj.data("ddOptions",{
				obj: objSelects[idx+1],
				list: lclList,
				parentSite: lclSite,
				field: lclField,
				selectText: lclSelectText,
				filterField: lclOptions.filterField[idx+1],
				filterValue: null,
				markSelected: lclOptions.markSelected,
				markSelectedByValue: lclOptions.markSelectedByValue,
				markSelectedValue: markedValue,
				useRecordID: false
			});

			ddObj.on('change',function(){
				var thisDD = $(this);
				var ddOptions = thisDD.data("ddOptions");
				ddOptions.filterValue = $('option:selected',this).text();
				$().SPHelper.PopSelect(ddOptions).done(function(){
					ddOptions.obj.change();
				});
			});
		}	

		if(isObject(lclOptions.list[0])){
			lclList = lclOptions.list[0][0];
			lclSite = lclOptions.list[0][1];
		}else{
			lclList = lclOptions.list[0];
			lclSite = false;
		}
		if(isObject(lclOptions.field[0])){
			lclField = lclOptions.field[0][0];
			lclSelectText = lclOptions.field[0][1];
		}else{
			lclField = lclOptions.field[0];
			lclSelectText = null;
		}
		var markedValue = null;
		if(lclOptions.markSelected){
			markedValue = lclOptions.markSelectedValue[0];
		}
		$.fn.SPHelper.PopSelect({
			obj: objSelects[0],
			list: lclList,
			parentSite: lclSite,
			field: lclField,
			fieldValue: lclField,
			selectText: lclSelectText,
			filterField: null,
			filterValue: null,
			markSelected: lclOptions.markSelected,
			markSelectedByValue: lclOptions.markSelectedByValue,
			markSelectedValue: markedValue,
			useRecordID: lclOptions.useRecordID
		}).done(function(){
			if(lclOptions.markSelected){
				objSelects[0].change();
			}	
			options = lclOptions = null;
		});
	};

	/**
	 * @method
	 * @name SPHelper#ListContainsData 
	 * @param {Object} options
	 * @property {string} options.list - List name/GUID used to retrieve the field's value
	 * @property {boolean} options.parentSite - indicates that the list is to be retrieved from the same site collection or the parent level - default: false
	 * @property {string} options.field - the field name within the list that is used to find the desired record - default: 'Title'
	 * @property {string} options.value - the field value used to find the desired record
	 * @property {boolean} options.getCount - set to 'true' if you want the number (count) of records that exist, otherwise; 'true|false' will be returned if records exist - default: false
	 * @property {string} options.webURL - URL where the list resides - default: Current Site - (used by SPServices function)
	 * @property {string} options.CAMLQueryOptions - CAML Query options (used by SPServices function)
	 * @property {string} options.CAMLViewFields - CAML View fields (used by SPServices function)
	 * @property {string} options.CAMLQuery - CAML Query (used by SPServices function)
	 * @description A quick utility function that can be used to query a list to get one fields value based on another field and it's value.
	 * @return {boolean|string} 
	 */
	$.fn.SPHelper.ListContainsData = function(options){

		var listGUID = null;
		var returnValue;

		var lclOptions = {
			list: null,
			parentSite: false,
			field: "Title",
			value: null,
			getCount: false,
			webURL: $.fn.SPHelper.GetCurrentSite(),
			CAMLQueryOptions: "<QueryOptions><ExpandUserField>True</ExpandUserField></QueryOptions>",
			CAMLViewFields: null,
			CAMLQuery: "<Query></Query>",
			debug: false		
		}

		lclOptions = $.extend({}, lclOptions, options);
		settings.DEBUG = lclOptions.debug;
		
		//Change the local options webURL property to the Parent site URL if parentSite property is TRUE
		if(lclOptions.parentSite){ lclOptions.webURL = $.fn.SPHelper.GetParentURL(); }

		//If the list is not a GUID then get the List's GUID
		if(isGUID(lclOptions.list)){ listGUID = lclOptions.list;
		}else{ listGUID = getGUID_byName({list:lclOptions.list,parentSite:lclOptions.parentSite,webURL:lclOptions.webURL}); }

		if(lclOptions.CAMLViewFields == null){
			lclOptions.CAMLViewFields = "<ViewFields><FieldRef Name='"+ lclOptions.field +"' /></ViewFields>";
		}
		if(lclOptions.CAMLQuery == null){
			lclOptions.CAMLQuery = "<Query><Where><Eq><FieldRef Name='"+ lclOptions.field +"'/><Value Type='Text'>"+ lclOptions.value +"</Value></Eq></Where></Query>";
		}

		$().SPServices({
			webURL: lclOptions.webURL,
			operation: "GetListItems",
			async: false, 
			listName: listGUID,
			CAMLViewFields: lclOptions.CAMLViewFields,
			CAMLQueryOptions: lclOptions.CAMLQueryOptions,
			CAMLQuery: lclOptions.CAMLQuery,
			completefunc: function (xData, Status) { 
				debug("ListContainsData - Get List Record Function: " + Status);
				if(settings.SHOW_XML){ 
						debug($().SPServices.SPDebugXMLHttpResult({ node: xData.responseXML })); 
				}
				var records = parseFloat($(xData.responseXML).SPFilterNode("rs:data").attr("ItemCount"));

				if(records>0){
					if(lclOptions.getCount){
						returnValue = records;
					}else{
						returnValue = true;
					}
				}else{
					returnValue = false;
				}
			}
		});	
		
		//If we get here then something failed in the SPServices call.
		if(returnValue == false){ debug("Get List Record Function: Failed"); }
		options = lclOptions = null;

		return returnValue;
	};

	/**
	 * @method
	 * @name SPHelper#GetListRecord 
	 * @param {Object} options
	 * @property {string} options.list - List name/GUID used to retrieve the field's value
	 * @property {boolean} options.parentSite - indicates that the list is to be retrieved from the same site collection or the parent level - default: false
	 * @property {string} options.field - the field name within the list that is used to find the desired record - default: 'Title'
	 * @property {string} options.value - the field value used to find the desired record
	 * @property {string} options.returnField - the field name within the list that is used to return the value of the identify field - default: ID
	 * @property {string} options.webURL - URL where the list resides - default: Current Site - (used by SPServices function)
	 * @property {string} options.CAMLQueryOptions - CAML Query options (used by SPServices function)
	 * @property {string} options.CAMLViewFields - CAML View fields (used by SPServices function)
	 * @property {string} options.CAMLQuery - CAML Query (used by SPServices function)
	 * @description A quick utility function that can be used to query a list to get one fields value based on another field and it's value.
	 */
	$.fn.SPHelper.GetListRecord = function(options){
		var deferred = new $.Deferred();
		var resultData = {};
		var resultObj = {};
		var count=0;

		var listGUID = null;
		var returnValue;
		var lclOptions = {
			list: null,
			parentSite: false,
			field: "Title",
			value: null,
			returnField: "ID",
			webURL: $.fn.SPHelper.GetCurrentSite(),
			CAMLQueryOptions: "<QueryOptions><ExpandUserField>True</ExpandUserField></QueryOptions>",
			CAMLViewFields: null,
			CAMLQuery: null,
			debug: false		
		}

		lclOptions = $.extend({}, lclOptions, options);
		settings.DEBUG = lclOptions.debug;
		
		//Change the local options webURL property to the Parent site URL if parentSite property is TRUE
		if(lclOptions.parentSite){ lclOptions.webURL = $.fn.SPHelper.GetParentURL(); }

		//If the list is not a GUID then get the List's GUID
		if(isGUID(lclOptions.list)){ listGUID = lclOptions.list;
		}else{ listGUID = getGUID_byName({list:lclOptions.list,parentSite:lclOptions.parentSite,webURL:lclOptions.webURL}); }

		if(lclOptions.CAMLViewFields == null){
			lclOptions.CAMLViewFields = "<ViewFields><FieldRef Name='"+ lclOptions.returnField +"' /><FieldRef Name='"+ lclOptions.field +"' /></ViewFields>";
		}
		if(lclOptions.CAMLQuery == null){
			lclOptions.CAMLQuery = "<Query><Where><Eq><FieldRef Name='"+ lclOptions.field +"'/><Value Type='Text'>"+ lclOptions.value +"</Value></Eq></Where></Query>";
		}
		debug(	lclOptions.CAMLViewFields );
		debug(	lclOptions.CAMLQuery );	
		
		$().SPServices({
			webURL: lclOptions.webURL,
			operation: "GetListItems",
			async: false, 
			listName: listGUID,
			CAMLViewFields: lclOptions.CAMLViewFields,
			CAMLQueryOptions: lclOptions.CAMLQueryOptions,
			CAMLQuery: lclOptions.CAMLQuery,
			completefunc: function (xData, Status) { 
				debug("GetListRecord - Get List Record Function: " + Status);
				$(xData.responseXML).SPFilterNode("z:row").each(function() {
					count++;
					if(count === 1){
						returnValue = $(this).attr("ows_"+lclOptions.returnField);
					}
				});

				resultObj = {
					data: returnValue,
					recordCount: count
		        };

				if(count === 1){
					deferred.resolveWith(resultObj);
				}else{
					if(count > 1){
						resultObj.data = null;
						deferred.resolveWith(resultObj);
					}else{
						deferred.reject("No Records");
					}
				}
			}
		});	
		options = lclOptions = null;

		return deferred.promise();
	};
	/**
	 * @method
	 * @name SPHelper#GetListRecord_LookUp
	 * @param {Object} options
	 * @property {string} options.list - List name/GUID used to retrieve the field's value
	 * @property {boolean} options.parentSite - indicates that the list is to be retrieved from the same site collection or the parent level - default: false
	 * @property {string} options.field - the field name within the list that is used to find the desired record - default: 'Title'
	 * @property {string} options.value - the field value used to find the desired record
	 * @property {string} options.returnField - the field name within the list that is used to return the value of the identify field - default: ID
	 * @property {string} options.webURL - URL where the list resides - default: Current Site - (used by SPServices function)
	 * @property {string} options.CAMLQueryOptions - CAML Query options (used by SPServices function)
	 * @property {string} options.CAMLViewFields - CAML View fields (used by SPServices function)
	 * @property {string} options.CAMLQuery - CAML Query (used by SPServices function)
	 * @description A quick utility function that can be used to query a list to get one fields value based on another field and it's value.
	 */
	$.fn.SPHelper.GetListRecord_LookUp = function(options){

		var listGUID = null;
		var returnValue;
		var lclOptions = {
			list: null,
			parentSite: false,
			field: "Title",
			value: null,
			returnField: "ID",
			webURL: $.fn.SPHelper.GetCurrentSite(),
			CAMLQueryOptions: "<QueryOptions><ExpandUserField>True</ExpandUserField></QueryOptions>",
			CAMLViewFields: null,
			CAMLQuery: "<Query></Query>",
			debug: false		
		}

		lclOptions = $.extend({}, lclOptions, options);
		settings.DEBUG = lclOptions.debug;
		
		//Change the local options webURL property to the Parent site URL if parentSite property is TRUE
		if(lclOptions.parentSite){ lclOptions.webURL = $.fn.SPHelper.GetParentURL(); }

		//If the list is not a GUID then get the List's GUID
		if(isGUID(lclOptions.list)){ listGUID = lclOptions.list;
		}else{ listGUID = getGUID_byName({list:lclOptions.list,parentSite:lclOptions.parentSite,webURL:lclOptions.webURL}); }

		if(lclOptions.CAMLViewFields == null){
			lclOptions.CAMLViewFields = "<ViewFields><FieldRef Name='"+ lclOptions.returnField +"' /><FieldRef Name='"+ lclOptions.field +"' /></ViewFields>";
		}
		if(lclOptions.CAMLQuery == null){
			lclOptions.CAMLQuery = "<Query><Where><Eq><FieldRef Name='"+ lclOptions.field +"'/><Value Type='Text'>"+ lclOptions.value +"</Value></Eq></Where></Query>";
		}
		debug(lclOptions.CAMLViewFields);
		debug(lclOptions.CAMLQuery);
		var count=0;
		
		$().SPServices({
			webURL: lclOptions.webURL,
			operation: "GetListItems",
			async: false, 
			listName: listGUID,
			CAMLViewFields: lclOptions.CAMLViewFields,
			CAMLQueryOptions: lclOptions.CAMLQueryOptions,
			CAMLQuery: lclOptions.CAMLQuery,
			completefunc: function (xData, Status) { 
				debug("GetListRecord - Get List Record Function: " + Status);
				if(settings.SHOW_XML){ 
						debug($().SPServices.SPDebugXMLHttpResult({ node: xData.responseXML })); 
				}
				var records = parseFloat($(xData.responseXML).SPFilterNode("rs:data").attr("ItemCount"));
				if(records>0){
					$(xData.responseXML).SPFilterNode("z:row").each(function() {
						count++;
						returnValue = $(this).attr("ows_"+lclOptions.returnField);
						if(count==1){
							return false;
						}
					});
				}else{
					return false;
				}
			}
		});	
		options = lclOptions = null;

		return returnValue;

	};

	/**
	 * @method
	 * @name SPHelper#GetListData
	 * @param {Object} options
	 * @property {string} options.list - List name/GUID used to retrieve the list data (used by SPServices function)
	 * @property {string} options.CAMLQuery - CAML Query (used by SPServices function)
	 * @property {string} options.CAMLViewFields - CAML View fields (used by SPServices function)
	 * @property {string} options.CAMLRowLimit - CAML Row Limit (used by SPServices function)
	 * @property {string} options.CAMLQueryOptions - CAML Query options (used by SPServices function)
	 * @property {string} options.webURL - URL where the list resides - default: Current Site - (used by SPServices function)
	 * @property {boolean} options.parentSite - indicates that the list is to be retrieved from the same site collection or the parent level - default: false
	 * @property {string} options.filterField - the field name within the list used filter the results. Must be used with filterValue. - default: null 
	 * @property {string} options.filterValue - the field value used to filter the results. Can only be used with filterField. - default: null 
	 * @return {Object} - returns a 'Promise' object that contains a 'data' parameter holding the result of the SPServices call.
	 * @description Enhanced method of the SPServices call to "GetListItems".  The method is 'promise' based
	 */

//	 * @property {string} options.returnField - the field name within the list that is used to return the value of the identify field - default: ID

	$.fn.SPHelper.GetListData = function(options){
		var defer = $.Deferred();
		var listGUID = null;
		var returnValue;
		
		var resultObj = {};
		
		var lclOptions = {
			list: null,
			CAMLQuery: "<Query></Query>",
			CAMLViewFields: null,
			CAMLRowLimit: null,
			CAMLQueryOptions: "<QueryOptions><ExpandUserField>True</ExpandUserField></QueryOptions>",
			webURL: $.fn.SPHelper.GetCurrentSite(),
			parentSite: false,
			mapping: null,
			includeAllAttrs: false,
			removeOws: true,
			debug: false
		}

		lclOptions = $.extend({}, lclOptions, options);
		settings.DEBUG = lclOptions.debug;
		
		//Change the local options webURL property to the Parent site URL if parentSite property is TRUE
		if(lclOptions.parentSite){ lclOptions.webURL = $.fn.SPHelper.GetParentURL(); }

		//If the list is not a GUID then get the List's GUID
		if(isGUID(lclOptions.list)){ listGUID = lclOptions.list;
		}else{ listGUID = getGUID_byName({list:lclOptions.list,parentSite:lclOptions.parentSite,webURL:lclOptions.webURL}); }
		
		debug(lclOptions.CAMLViewFields);
		debug(lclOptions.CAMLQuery);

		$().SPServices({
			webURL: lclOptions.webURL,
			operation: "GetListItems",
			async: false, 
			listName: listGUID,
			CAMLViewFields: lclOptions.CAMLViewFields,
			CAMLQueryOptions: lclOptions.CAMLQueryOptions,
			CAMLQuery: lclOptions.CAMLQuery,
			completefunc: function(xData, Status) { 
				var count = parseFloat($(xData.responseXML).SPFilterNode("rs:data").attr("ItemCount"));
				var jsonData;

				if(lclOptions.mapping != null){
					jsonData = $(xData.responseXML).SPFilterNode("z:row").SPXmlToJson({ 
						mapping: lclOptions.mapping,
						includeAllAttrs: lclOptions.includeAllAttrs,
						removeOws: lclOptions.removeOws
					});
				}else{
					jsonData = $(xData.responseXML).SPFilterNode("z:row").SPXmlToJson({ 
						mapping: {},
						includeAllAttrs: lclOptions.includeAllAttrs,
						removeOws: lclOptions.removeOws
					});
				}
				
				resultObj = {
					data: $.extend([],jsonData),
					recordCount: count
		        };
				
				jsonData = null;
				if(count > 0){
					defer.resolveWith(resultObj);
				}else{
					defer.reject("No Records");
				}
			}
		});	
		debug(defer.state());
		
		options = lclOptions = null;

		return defer.promise();
	};
	
	/**
	 * @method
	 * @name SPHelper#UpdateListRecord 
	 * @param {Object} options
	 * @property {string} options.list - List name/GUID used of the list to update
	 * @property {boolean} options.parentSite - indicates that the list is to be retrieved from the same site collection or the parent level - default: false
	 * @property {string} options.recordID - the ID of the record to be updated
	 * @property {string} options.fieldToUpdate - the field name in the list that will be updated - default: Title
	 * @property {string} options.valueToUpdate - the value used to update the identified field
	 * @property {string} options.webURL - URL where the list resides - default: Current Site - (used by SPServices function)
	 * @description A quick function for updating a single field with a value in the specified list
	 */
	$.fn.SPHelper.UpdateListRecord = function(options){
		var defer = $.Deferred();
		var listGUID = null;
		var resultObj = {
			UpdateState: false,
			Message: "Major Error Occurred"
        };
		
		var lclOptions = {
			list: null,
			parentSite: false,
			recordID: null,
			fieldToUpdate: "Title",
			valueToUpdate: null,
			batchCmd: "New",
			webURL: $.fn.SPHelper.GetCurrentSite(),
			debug: false
		}

		lclOptions = $.extend({}, lclOptions, options);
		settings.DEBUG = lclOptions.debug;

		if(isGUID(lclOptions.list)){ listGUID = lclOptions.list;
		}else{ listGUID = getGUID_byName({list:lclOptions.list,parentSite:lclOptions.parentSite,webURL:lclOptions.webURL}); }

		//Change the local options webURL property to the Parent site URL if parentSite property is TRUE
		if(lclOptions.parentSite){ lclOptions.webURL = $.fn.SPHelper.GetParentURL(); }
		if(lclOptions.valueToUpdate == null){
			debug("valueToUpdate is still NULL");
			resultObj.Message = "valueToUpdate is still NULL";
			defer.resolveWith(resultObj);
		}else{
			$().SPServices({
				webURL: lclOptions.webURL,
                operation: "UpdateListItems",
                async: false,
				listName: listGUID,
                batchCmd: lclOptions.batchCmd,
				ID: lclOptions.recordID,
				valuepairs: [[lclOptions.fieldToUpdate, lclOptions.valueToUpdate]],
				completefunc: function (xData, Status) {
					debug("UpdateListRecord - Update List Record Function: " + Status);
	
					if(/success/.test(Status)){
						debug("Record Updated");
						resultObj.UpdateState = true;
						resultObj.Message = "Record Updated";
					}else{
						debug("Update Failed");
						resultObj.UpdateState = false;
						resultObj.Message = "Record Updated";
					}
					defer.resolveWith(resultObj);
				}
			});
		}

		debug(defer.state());
		options = lclOptions = null;
		return defer.promise();

	};
	
	/**
	 * @method
	 * @name SPHelper#ModalDialog 
	 * @param {Object} options
	 * @property {string} options.url - url to open
	 * @property {string} options.toform - true | false - if modal is going to a list form use 'true'
	 * @property {string} options.pagetype - 
	 * @property {string} options.list - List name/GUID used of the list to update
	 * @property {string} options.title - 
	 * @property {string} options.autosize - 
	 * @property {string} options.height - 
	 * @property {string} options.width - 
	 * @property {string} options.callback - callback function
	 * @property {string} options.args - 
	 * @property {string} options.debug - 
	 * @description Opens a SharePoint Modal Dialog box
	 */
	$.fn.SPHelper.ModalDialog = function(options){
		var lclOptions = {
			toform: false,
			pagetype: null,
			list: null,
			title: null,
			url: null,
			site: null,
			html: null,
			top: null,
			left: null,
			width: null,
			height: null,
			allowMaximize: false,
			showMaximized: false,
			showClose: true,
			autosize: true,
			callback: null,
			args: null,
			ID: null,
			debug: false
		}
		
		lclOptions = $.extend({}, lclOptions, options);
		settings.DEBUG = lclOptions.debug

		var modalOptions = SP.UI.$create_DialogOptions();
	
		modalOptions.autoSize = lclOptions.autosize; 
		
		if(!lclOptions.autosize){
			modalOptions.width = lclOptions.width;
			modalOptions.height = lclOptions.height;
		}
		if(lclOptions.top){
			modalOptions.y = lclOptions.top;
		}
		if(lclOptions.left){
			modalOptions.x = lclOptions.left;
		}

		if(lclOptions.args){
			modalOptions.args = lclOptions.args;
		}

		if(lclOptions.toform){
			//If the list is not a GUID then get the List's GUID
			if(!(isGUID(lclOptions.list))){ lclOptions.list = getGUID_byName({list:lclOptions.list}); }

			var pagetype="4";
			if(isNumber(lclOptions.pagetype)){
				pagetype = lclOptions.pagetype;
			}else{
				if(RegExp('display', 'i').test(lclOptions.pagetype)){ pagetype = "4"; }
				if(RegExp('edit', 'i').test(lclOptions.pagetype)){ pagetype = "6"; }
				if(RegExp('new', 'i').test(lclOptions.pagetype)){ pagetype = "8"; }
			}
			if(lclOptions.site){
				modalOptions.url = lclOptions.site + "/_layouts/listform.aspx?PageType=" + pagetype + "&ListId=" + lclOptions.list + "&ContentTypeID=0x0&IsDlg=1";
			}else{
				modalOptions.url = $.fn.SPHelper.GetCurrentSite() + "/_layouts/listform.aspx?PageType=" + pagetype + "&ListId=" + lclOptions.list + "&ContentTypeID=0x0&IsDlg=1";
			}
		}else{
			if(lclOptions.url){
				modalOptions.url = lclOptions.url;
			}else{
				if(lclOptions.html){
					modalOptions.html = lclOptions.html;
				}
			}
		}
		
		modalOptions.allowMaximize = lclOptions.allowMaximize;
		modalOptions.showMaximized = lclOptions.showMaximized;
		modalOptions.showClose = lclOptions.showClose;
		
		if(lclOptions.ID){
			modalOptions.url += "&ID=" + lclOptions.ID;
		}
		
		modalOptions.title = lclOptions.title;
	
		modalOptions.dialogReturnValueCallback = lclOptions.callback;
	
		SP.UI.ModalDialog.showModalDialog(modalOptions);
		//Because the Overlay has the potential to be ON TOP of the Dialog
		//Reposition the Overlay to a new z-index so the ModalDialog is accessible
		//Remove comment below OR add statement to the page calling the $().SPHelper.ModalDialog function
		$('.ms-dlgOverlay').css('z-index','10');

		lclOptions = options = null;
	};

	$.fn.SPHelper.AutosizeDlg = function(){
	    //resize dialog if we are in one
	    var dlg = SP.UI.ModalDialog.get_childDialog();
	    if (dlg != null) {
	        dlg.autoSize();
	    }
	};

	$.fn.SPHelper.UseScript = function(path,file){
		//<script type="text/javascript" src=""></script>
		var header = document.getElementsByTagName('head')[0];
		var script = document.createElement('script'); 
			script.type = 'text/javascript'; 
			script.src = path + file;
			
		header.appendChild(script);
	};
	$.fn.SPHelper.UseCSS = function(path,file){
		//<link rel="stylesheet" type="text/css" href="" />
		var header = document.getElementsByTagName('head')[0];
		var link = document.createElement('link'); 
			link.type = 'text/css'; 
			link.rel ="stylesheet"
			link.href = path + file;

		header.appendChild(link);
	};

	$.fn.SPHelper.showLoading = function(){
		var defer = $.Deferred();
		$("#loadingBox").show();
		var done = setTimeout(function(){ 
			$("#loadingBox").show();
			defer.resolve();
		}, 500);
		return defer.promise();
	}


	/**
	 * @method
	 * @name SPHelper#Build_DataSet
	 * @param {JSON_Data} jsonData
	 * @param {Object} paramObject
	 * @property {string} color: undefined
	 * @property {string} dataLabels: undefined
	 * @property {boolean} includeEvents - default: false
	 * @property {object} events
	 * @property {function} events.click: undefined
	 * @property {function} events.mouseOut: undefined
	 * @property {function} events.mouseOver: undefined
	 * @property {function} events.remove: undefined
	 * @property {function} events.select: undefined
	 * @property {function} events.unselect: undefined
	 * @property {function} events.update: undefined
	 * @property {string} legendIndex: undefined
	 * @property {string} name: undefined
	 * @property {string} sliced: false
	 * @property {string} x: undefined
	 * @property {string} y: undefined
	 * @property {string} returnSumY: undefined
	 * @property {boolean} sortByValue - default: true, set to false to sort by name (label)
	 * @description Used build a data array from JSON data set. Primarily used for building a data series for charting in HighCharts.
	 * @return {Array}
	 */
	$.fn.SPHelper.Build_DataSet = function(jsonData, paramObject){

		var lclParams = {
			color: null,
			dataLabels: null,
			includeEvents: false,
			events: {
				click: null,
				mouseOut: null,
				mouseOver: null,
				remove: null,
				select: null,
				unselect: null,
				update: null
			},
			legendIndex: null,
			name: null,
			sliced: false,
			x: null,
			y: null,
			returnSumY: false,
			sortByValue: true,
			splitName: false,
			debug: false
		}

		lclParams = $.extend({}, lclParams, paramObject);
		settings.DEBUG = lclParams.debug;

		var returnArray = [];
		var tempTitle;
		//Build the data object for the chart's data set
		
		if(lclParams.returnSumY){
			var titleArray=[];
			var sum = 0;
			var title="";
			for(var i=0; i < jsonData.length; i++){
				title = lclParams.splitName ? jsonData[i][lclParams.name].split(";#")[1] : jsonData[i][lclParams.name];
				titleArray.push($.trim(title));
			}
			
			titleArray = $().SPHelper.onlyUnique_Array(titleArray);
	
			for(var i=0; i < titleArray.length; i++){
				sum = 0;

				title = titleArray[i];
				for(var j=0; j < jsonData.length; j++){
					tempTitle = lclParams.splitName ? jsonData[j][lclParams.name].split(";#")[1] : jsonData[j][lclParams.name];
					if(title == $.trim(tempTitle)){
						sum += Math.round(jsonData[j][lclParams.y]);
					}
				}
				var ChartData_Obj = {};
		
				if(lclParams.name){ ChartData_Obj.name = title; }
				if(lclParams.y){ ChartData_Obj.y = sum; }

				returnArray.push(ChartData_Obj);
			}
		}else{
			for(var x=0;x<jsonData.length;x++){
			   var ChartData_Obj = {};			   
			   if(lclParams.name){ ChartData_Obj.name = $.trim(jsonData[x][lclParams.name]); }
			   if(lclParams.y){ ChartData_Obj.y = Math.round(jsonData[x][lclParams.y]); }
			   if(lclParams.color){ ChartData_Obj.color = jsonData[x][lclParams.color]; }
			   returnArray.push(ChartData_Obj);
			}
		}
		if(lclParams.sortByValue){
			returnArray.sort(sort_by('y', true, parseInt));
		}

		jsonData = lclParams = paramObject = null;

		return returnArray;

	};
	
	/**
	 * @method
	 * @name SPHelper#onlyUnique_Array
	 * @param {Array} arrData
	 * @description Used return only unique data elements in the array.
	 * @return {Array}
	 */
	$.fn.SPHelper.onlyUnique_Array = function(arrData){
		var uniqueData = [];
		$.each(arrData, function(i, el){
		    if($.inArray(el, uniqueData) === -1) uniqueData.push(el);
		});	
		arrData = null;
		return uniqueData;
	};	

	/**
	 * @method
	 * @name SPHelper#SortBy
	 * @property {Object} options
	 * @property {string} field
	 * @property {string} reverse
	 * @property {string} primer
	 * @description Used to setup Print and Reset buttons for printing a page from a SharePoint site.
	 */
	$.fn.SPHelper.SortBy = function(obj, field, reverse, primer){
		return obj.sort(sort_by(field,reverse,primer));
	};
	/**
	 * @method
	 * @name SPHelper#PrintMe 
	 * @param {Object} options
	 * @property {JQuery|object} options.printButton - the print button object - e.g. $("#printButton")
	 * @property {JQuery|object} options.resetButton - the reset button object - e.g. $("#resetButton")
	 * @description Used to setup Print and Reset buttons for printing a page from a SharePoint site.
	 */
	$.fn.SPHelper.PrintMe = function(options){
	
		var lclOptions = {
			printButton: null,
			resetButton: null
		}

		lclOptions = $.extend({}, lclOptions, options);

		lclOptions.printButton.on("click",function(e){
			e.preventDefault();
			$("#s4-ribbonrow").hide();
			$("#s4-titlerow").hide();
			$("#navbar").hide();
			$("#optionsTable").hide();
			$("#customPageFooter").hide();
			$(this).hide();
			lclOptions.resetButton.show();
			window.print();
		});
		
		lclOptions.resetButton.on("click",function(e){
			e.preventDefault();
			$("#s4-ribbonrow").show();
			$("#s4-titlerow").show();
			$("#navbar").show();
			$("#optionsTable").show();
			$("#customPageFooter").show();
			lclOptions.printButton.show();
			$(this).hide();
		});
	}
	// No Quick Launch/Links side panel
	$.fn.SPHelper.NoQuickLinks = function() {
		$("#s4-leftpanel").css("display","none");
		$(".s4-ca").css("margin-left","0px");
	}
	$.fn.SPHelper.NoQuickLaunch = function() {
		$("#s4-leftpanel").css("display","none");
		$(".s4-ca").css("margin-left","0px");
	}

	// Generate a random number for sorting arrays randomly
	$.fn.SPHelper.randOrd = function() {
	    return (Math.round(Math.random()) - 0.5);
	}
	
	// If a string is a URL, format it as a link, else return the string as-is
	$.fn.SPHelper.String2Link = function(s) {
	    return ((s.indexOf("http") === 0) || (s.indexOf(SLASH) === 0)) ? "<a href='" + s + "'>" + s + "</a>" : s;
	}
	
	/* Taken from http://dracoblue.net/dev/encodedecode-special-xml-characters-in-javascript/155/ */
	var xml_special_to_escaped_one_map = {
	    '&': '&amp;',
	    '"': '&quot;',
	    '<': '&lt;',
	    '>': '&gt;'
	};
	var escaped_one_to_xml_special_map = {
	    '&amp;': '&',
	    '&quot;': '"',
	    '&lt;': '<',
	    '&gt;': '>'
	};
	
	$.fn.SPHelper.encodeXml = function(string) {
	    return string.replace(/([\&"<>])/g, function (str, item) {
	        return xml_special_to_escaped_one_map[item];
	    });
	}
	
	$.fn.SPHelper.decodeXml = function(string) {
	    return string.replace(/(&quot;|&lt;|&gt;|&amp;)/g,
	        function (str, item) {
	            return escaped_one_to_xml_special_map[item];
	        });
	}
	
	/* Taken from http://dracoblue.net/dev/encodedecode-special-xml-characters-in-javascript/155/ */
	// Escape Url
	$.fn.SPHelper.escapeUrl = function(u) {
	    return u.replace(/&/g, '%26');
	}

	//Some Date Stuff
	$.fn.SPHelper.dateDiffInDays = function(date1,date2){
		var _MS_PER_DAY = 1000 * 60 * 60 * 24;
		// Discard the time and time-zone information.
		var utc1 = Date.UTC(date1.getFullYear(), date1.getMonth(), date1.getDate());
		var utc2 = Date.UTC(date2.getFullYear(), date2.getMonth(), date2.getDate(),23,59,59);
		
		return Math.floor((utc2 - utc1) / _MS_PER_DAY)+1;
	}

	$.fn.SPHelper.CurrentFY = function(pDate){
		pDate = pDate || null;
		if (!Date.prototype.toISOString) {
		  (function() {
		
		    function pad(number) {
		      if (number < 10) {
		        return '0' + number;
		      }
		      return number;
		    }
		
		    Date.prototype.toISOString = function() {
		      return this.getUTCFullYear() +
		        '-' + pad(this.getUTCMonth() + 1) +
		        '-' + pad(this.getUTCDate()) +
		        'T' + pad(this.getUTCHours()) +
		        ':' + pad(this.getUTCMinutes()) +
		        ':' + pad(this.getUTCSeconds()) +
		        '.' + (this.getUTCMilliseconds() / 1000).toFixed(3).slice(2, 5) +
		        'Z';
		    };
		
		  }());
		}

		var today = new Date();
		if(pDate){
			today = pDate;
		}
		var year = today.getFullYear();
		var FY = {
			start: null,	//Start Date as Date
			end: null,		//End Date as Date
			startUTC: null,	//Start Date in ms
			endUTC:	null,	//End Date in ms
			string: null,	//FY String
			days: null,		//Days in the FY
			val: null   	//Year as number
		}
		if((today.getMonth()+1) > 9){
			FY.start = new Date(year,9,1);
			FY.end = new Date((year+1),8,30);
			FY.startUTC = FY.start.toISOString();
			FY.endUTC = FY.end.toISOString();
			FY.string = "FY"+(year+1).toString().substr(2,2);
			FY.days = $().SPHelper.dateDiffInDays(FY.start,FY.end);
			FY.val = parseInt((year+1).toString().substr(2,2),10);
			FY.yy = parseInt((year+1).toString().substr(2,2),10);
			FY.yyyy = parseInt((year+1).toString(),10);
		}else{
			FY.start = new Date((year-1),9,1);
			FY.end = new Date(year,8,30);
			FY.startUTC = FY.start.toISOString();
			FY.endUTC = FY.end.toISOString();
			FY.string = "FY"+(year).toString().substr(2,2);
			FY.days = $().SPHelper.dateDiffInDays(FY.start,FY.end);
			FY.val = parseInt((year).toString().substr(2,2),10);		
			FY.yy = parseInt((year).toString().substr(2,2),10);
			FY.yyyy = parseInt((year).toString(),10);
		}
		today=year=null;
		return FY;
	};
	$.fn.SPHelper.CurrentQuarter = function(pDate){

		pDate = pDate || null;

		var today = new Date();
		if(pDate){
			today = pDate;
		}
		pDate = (today.getMonth()+1);
		switch(pDate){
			case 1: case 2: case 3:
				pDate = "2";
				break;
			case 4:	case 5:	case 6:
				pDate = "3";
				break;
			case 7:	case 8:	case 9:
				pDate = "4";
				break;
			default:
				pDate = "1";
				break;
		}
				
		return pDate;
	}
	$.fn.SPHelper.CurrentMonth = function(pDate){
		pDate = pDate || null;

		var today = new Date();
		if(pDate){
			today = pDate;
		}
		pDate = (today.getMonth()+1);
		if(pDate<10){
			pDate = "0"+pDate;
		}else{
			pDate = ""+pDate;
		}
		
		return pDate;
	}
	$.fn.SPHelper.StartOfWeek = function(pDate){
		pDate = pDate || null;

		var today = new Date();
		if(pDate){
			today = pDate;
		}
		
		pDate = today.getDate() - today.getDay();

		try{
			pDate = dateFormat(new Date(today.setDate(pDate)), "spQuery");
		}catch(e){
			debug("Date Format Failed on value: " + pDate + " | Error: " + e,3 );
		}
	    return pDate ;
	}
	$.fn.SPHelper.EndOfWeek = function(pDate){

		pDate = pDate || null;

		var today = new Date();
		if(pDate){
			today = pDate;
		}
		
		pDate = today.getDate() + ( 7 - today.getDay() );

		try{
			pDate = dateFormat(new Date(today.setDate(pDate)), "spQuery");
		}catch(e){
			debug("Date Format Failed on value: " + pDate + " | Error: " + e,3 );
		}
	    return pDate ;
	}

	
	$.fn.SPHelper.FYfromDate = function(d0){
		var mm = d0.getMonth()+1;
		var yy = parseInt((d0.getFullYear()).toString().substr(2,2),10);
		if(mm > 9){
			return (yy+1);
		}else{
			return yy;
		}
	};
	
	/**
	 * @method
	 * @name SPHelper#Export2Excel
	 * @param {Object} options
	 * @property {JQuery|object} options.tblID - ID of table to export
	 * @property {JQuery|object} options.iframeID - ID of iframe on page to use for creating the export
	 * @property {JQuery|object} options.fileName - fileName to use in the Save As dialog
	 * @description Used to Export a table from a SharePoint page.
	 */
	$.fn.SPHelper.Export2Excel = function(options){
		var lclOptions = {
			tblID: null,
			iframeID: null,
			fileName: "TableExport"		
		}  
		
		lclOptions = $.extend({}, lclOptions, options);
		try{
			var tab_text="<table><tr>";
			var textRange; var j=0;
			var tableObj = document.getElementById(lclOptions.tblID); // id of table
			
			for(j = 0 ; j < tableObj.rows.length ; j++){     
				tab_text=tab_text+tableObj.rows[j].innerHTML+"</tr>";
			}
			
			tab_text=tab_text+"</table>";
			tab_text= tab_text.replace(/<A[^>]*>|<\/A>/g, "");//remove if u want links in your table
			tab_text= tab_text.replace(/<img[^>]*>/gi,""); // remove if u want images in your table
			tab_text= tab_text.replace(/<input[^>]*>|<\/input>/gi, ""); // reomves input params
	
			var iframeObj = document.getElementById(lclOptions.iframeID); //id of iframe
			iframeObj.contentWindow.document.open("txt/html","replace");
			iframeObj.contentWindow.document.write(tab_text);
			iframeObj.contentWindow.document.close();
			iframeObj.contentWindow.focus(); 
			var sa=iframeObj.contentWindow.document.execCommand("SaveAs",true, (lclOptions.fileName+".xls"));
		}catch(e){
			debug(e,3);
		}
	};

	/**
	 * Fancy Notification <br/>
	 * Widget adaptation of the {@link http://boedesign.com/demos/gritter/|'Gritter'} notification code by {@link http://boedesign.com/|Jordan Boesch}<br/>
	 * Object setup under the SPHelper namespace
	 *  @name SPHelper.notify
	 *  @module SPHelper/notify
	 *  @type {object}
	 */
	$.fn.SPHelper.notify = {};
	
	/**
	 *  @var {object} options
	 *  @alias module:SPHelper/notify.options
	 *  @property {string} options.position=''
	 *  @property {string} options.class_name=''
	 *  @property {string} options.fade_in_speed='medium'
	 *  @property {string} options.fade_out_speed=1000
	 *  @property {string} options.time=6000
	 */
	$.fn.SPHelper.notify.options = {
		position: '',
		class_name: '', // could be set to 'notify-light' to use white notifications
		fade_in_speed: 'medium', // how fast notifications fade in
		fade_out_speed: 1000, // how fast the notices fade out
		time: 6000 // hang on the screen for...
	}
	
	/**
	 * @method
	 * @alias module:SPHelper/notify.add
	 * @param {Object} params The object that contains all the options for drawing the notification
	 * @see add
	 * @description Add a notification to the browser (screen).
	 * @return {object}
	 */
	$.fn.SPHelper.notify.add = function(params){
		try {
			return Notify.add(params || {});
		} catch(e) {
			var err = 'Notify Error: ' + e;
			(typeof(console) != 'undefined' && console.error) ? 
				console.error(err, params) : 
				debug(err);
		}
	}
	
	/**
	 * @method
	 * @alias module:SPHelper/notify.remove
	 * @param {number} id Unique notification ID to be removed
	 * @param {Object} params A set of options passed in to determine how to get rid of it
	 * @see removeSpecific
	 * @description Removes a notification from the browser (screen).
	 */
	$.fn.SPHelper.notify.remove = function(id, params){
		Notify.removeSpecific(id, params || {});
	}
	
	/**
	 * @method
	 * @alias module:SPHelper/notify.removeAll
	 * @param {Object} params The object that contains all the options for drawing the notification
	 * @see stop
	 * @description Remove all notifications from the browser (screen).
	 */
	$.fn.SPHelper.notify.removeAll = function(params){
		Notify.stop(params || {});
	}
	
	//Private Object used by the above $.fn.SPHelper.notify calls
	/**
	 * @var {object}
	 * @name Notify
	 */
	var Notify = {
		
		// Public - options to over-ride with $.fn.SPHelper.notify.options in "add"
		position: '',
		fade_in_speed: '',
		fade_out_speed: '',
		time: '',
		
		// Private - no touchy the private parts
		_custom_timer: 0,
		_item_count: 0,
		_is_setup: 0,
		_tpl_close: '<a class="notify-close" href="#" tabindex="1">Close Notification</a>',
		_tpl_title: '<span class="notify-title">[[title]]</span>',
		_tpl_item: '<div id="notify-item-[[number]]" class="notify-item-wrapper [[item_class]]" style="display:none" role="alert"><div class="notify-top"></div><div class="notify-item">[[close]][[image]]<div class="[[class_name]]">[[title]]<p>[[text]]</p></div><div style="clear:both"></div></div><div class="notify-bottom"></div></div>',
		_tpl_wrap: '<div id="notify-notice-wrapper"></div>',
		
		/**
		* @method
		* @name add		
		* @description Add a notification to the screen
		* @param {Object} params The object that contains all the options for drawing the notification
		* @return {Integer} The specific numeric id to that notification
		*/
		add: function(params){
			// Handle straight text
			if(typeof(params) == 'string'){
				params = {text:params};
			}

			// We might have some issues if we don't have a title or text!
			if(params.text === null){
				throw 'You must supply "text" parameter.'; 
			}
			
			// Check the options and set them once
			if(!this._is_setup){
				this._runSetup();
			}
			
			// Basics
			// title - (string | mandatory) the heading of the notification
			// text - (string | mandatory) the text inside the notification
			// image - (string | optional) the image to display on the left
			// sticky - (bool | optional) if you want it to fade out on its own or just sit there
			// item_class - (string | optional) the class name you want to apply to that specific message
			// position -
			// time_alive - (int | optional) the time you want it to be alive for before fading out
			var title = params.title, 
				text = params.text,
				image = params.image || '',
				sticky = params.sticky || true,
				item_class = params.class_name || $.fn.SPHelper.notify.options.class_name,
				position = params.position || $.fn.SPHelper.notify.options.position,
				time_alive = params.time || '';

			this._verifyWrapper();
			
			this._item_count++;
			var number = this._item_count, 
				tmp = this._tpl_item;
			
			// Assign callbacks
			$(['before_open', 'after_open', 'before_close', 'after_close']).each(function(i, val){
				Notify['_' + val + '_' + number] = ($.isFunction(params[val])) ? params[val] : function(){}
			});

			// Reset
			this._custom_timer = 0;
			
			// A custom fade time set
			if(time_alive){
				this._custom_timer = time_alive;
			}
			
			var image_str = (image != '') ? '<img src="' + image + '" class="notify-image" />' : '',
				class_name = (image != '') ? 'notify-with-image' : 'notify-without-image';
			
			// String replacements on the template
			if(title){
				title = this._str_replace('[[title]]',title,this._tpl_title);
			}else{
				title = '';
			}
			
			tmp = this._str_replace(
				['[[title]]', '[[text]]', '[[close]]', '[[image]]', '[[number]]', '[[class_name]]', '[[item_class]]'],
				[title, text, this._tpl_close, image_str, this._item_count, class_name, item_class], tmp
			);

			// If it's false, don't show another message
			if(this['_before_open_' + number]() === false){
				return false;
			}
					
			if(position=='center'){
			//$('#myDiv').css({top:'50%',left:'50%',margin:'-'+($('#myDiv').height() / 2)+'px 0 0 -'+($('#myDiv').width() / 2)+'px'});
				$('#notify-notice-wrapper').css({top:'50%',left:'50%',margin:'-'+($('#notify-notice-wrapper').height() / 2)+'px 0 0 -'+($('#notify-notice-wrapper').width() / 2)+'px'}).append(tmp);
			}else{
				$('#notify-notice-wrapper').addClass(position).append(tmp);
			}
			
			var item = $('#notify-item-' + this._item_count);
			
			item.fadeIn(this.fade_in_speed, function(){
				Notify['_after_open_' + number]($(this));
			});
			
			if(!sticky){
				this._setFadeTimer(item, number);
			}
			
			// Bind the hover/unhover states
			$(item).bind('mouseenter mouseleave', function(event){
				if(event.type == 'mouseenter'){
					if(!sticky){ 
						Notify._restoreItemIfFading($(this), number);
					}
				}
				else {
					if(!sticky){
						Notify._setFadeTimer($(this), number);
					}
				}
				Notify._hoverState($(this), event.type);
			});
			
			// Clicking (X) makes the perdy thing close
			$(item).find('.notify-close').click(function(){
				Notify.removeSpecific(number, {}, null, true);
				return false;
			});
			
			return number;
		
		},
		
		/**
		* If we don't have any more notifications, get rid of the wrapper using this check
		* @private
		* @param {Integer} unique_id The ID of the element that was just deleted, use it for a callback
		* @param {Object} e The jQuery element that we're going to perform the remove() action on
		* @param {Boolean} manual_close Did we close the dialog with the (X) button
		*/
		_countRemoveWrapper: function(unique_id, e, manual_close){
			
			// Remove it then run the callback function
			e.remove();
			this['_after_close_' + unique_id](e, manual_close);
			
			// Check if the wrapper is empty, if it is.. remove the wrapper
			if($('.notify-item-wrapper').length == 0){
				$('#notify-notice-wrapper').remove();
			}
		
		},
		
		/**
		* Fade out an element after it's been on the screen for x amount of time
		* @private
		* @param {Object} e The jQuery element to get rid of
		* @param {Integer} unique_id The id of the element to remove
		* @param {Object} params An optional list of params to set fade speeds etc.
		* @param {Boolean} unbind_events Unbind the mouseenter/mouseleave events if they click (X)
		*/
		_fade: function(e, unique_id, params, unbind_events){

			var params = params || {},
				fade = (typeof(params.fade) != 'undefined') ? params.fade : true,
				fade_out_speed = params.speed || this.fade_out_speed,
				manual_close = unbind_events;

			this['_before_close_' + unique_id](e, manual_close);
			
			// If this is true, then we are coming from clicking the (X)
			if(unbind_events){
				e.unbind('mouseenter mouseleave');
			}
			
			// Fade it out or remove it
			if(fade){
			
				e.animate({
					opacity: 0
				}, fade_out_speed, function(){
					e.animate({ height: 0 }, 300, function(){
						Notify._countRemoveWrapper(unique_id, e, manual_close);
					})
				})
				
			}
			else {
				
				this._countRemoveWrapper(unique_id, e);
				
			}
						
		},
		
		/**
		* Perform actions based on the type of bind (mouseenter, mouseleave) 
		* @private
		* @param {Object} e The jQuery element
		* @param {String} type The type of action we're performing: mouseenter or mouseleave
		*/
		_hoverState: function(e, type){
			
			// Change the border styles and add the (X) close button when you hover
			if(type == 'mouseenter'){
				
				e.addClass('hover');
				
				// Show close button
				e.find('.notify-close').show();
						
			}
			// Remove the border styles and hide (X) close button when you mouse out
			else {
				
				e.removeClass('hover');
				
				// Hide close button
				e.find('.notify-close').hide();
				
			}
			
		},
		
		/**
		* @method
		* @name removeSpecific		
		* @description Remove a specific notification based on an ID
		* @param {Integer} unique_id The ID used to delete a specific notification
		* @param {Object} params A set of options passed in to determine how to get rid of it
		* @param {Object} e The jQuery element that we're "fading" then removing
		* @param {Boolean} unbind_events If we clicked on the (X) we set this to true to unbind mouseenter/mouseleave
		*/
		removeSpecific: function(unique_id, params, e, unbind_events){
			
			if(!e){
				var e = $('#notify-item-' + unique_id);
			}

			// We set the fourth param to let the _fade function know to 
			// unbind the "mouseleave" event.  Once you click (X) there's no going back!
			this._fade(e, unique_id, params || {}, unbind_events);
			
		},
		
		/**
		* If the item is fading out and we hover over it, restore it!
		* @private
		* @param {Object} e The HTML element to remove
		* @param {Integer} unique_id The ID of the element
		*/
		_restoreItemIfFading: function(e, unique_id){
			
			clearTimeout(this['_int_id_' + unique_id]);
			e.stop().css({ opacity: '', height: '' });
			
		},
		
		/**
		* Setup the global options - only once
		* @private
		*/
		_runSetup: function(){
		
			for(var opt in $.fn.SPHelper.notify.options){
				this[opt] = $.fn.SPHelper.notify.options[opt];
			}
			this._is_setup = 1;
			
		},
		
		/**
		* Set the notification to fade out after a certain amount of time
		* @private
		* @param {Object} item The HTML element we're dealing with
		* @param {Integer} unique_id The ID of the element
		*/
		_setFadeTimer: function(e, unique_id){
			
			var timer_str = (this._custom_timer) ? this._custom_timer : this.time;
			this['_int_id_' + unique_id] = setTimeout(function(){ 
				Notify._fade(e, unique_id);
			}, timer_str);
		
		},
		
		/**
		* @method
		* @name stop		
		* @description Bring everything to a halt
		* @param {Object} params A list of callback functions to pass when all notifications are removed
		*/  
		stop: function(params){
			
			// callbacks (if passed)
			var before_close = ($.isFunction(params.before_close)) ? params.before_close : function(){};
			var after_close = ($.isFunction(params.after_close)) ? params.after_close : function(){};
			
			var wrap = $('#notify-notice-wrapper');
			before_close(wrap);
			wrap.fadeOut(function(){
				$(this).remove();
				after_close();
			});
		
		},
		
		/**
		* An extremely handy PHP function ported to JS, works well for templating
		* @private
		* @param {String/Array} search A list of things to search for
		* @param {String/Array} replace A list of things to replace the searches with
		* @return {String} sa The output
		*/  
		_str_replace: function(search, replace, subject, count){
		
			var i = 0, j = 0, temp = '', repl = '', sl = 0, fl = 0,
				f = [].concat(search),
				r = [].concat(replace),
				s = subject,
				ra = r instanceof Array, sa = s instanceof Array;
			s = [].concat(s);
			
			if(count){
				this.window[count] = 0;
			}
		
			for(var i = 0, sl = s.length; i < sl; i++){
				
				if(s[i] === ''){
					continue;
				}
				
				for (j = 0, fl = f.length; j < fl; j++){
					
					temp = s[i] + '';
					repl = ra ? (r[j] !== undefined ? r[j] : '') : r[0];
					s[i] = (temp).split(f[j]).join(repl);
					
					if(count && s[i] !== temp){
						this.window[count] += (temp.length-s[i].length) / f[j].length;
					}
					
				}
			}
			
			return sa ? s : s[0];
			
		},
		
		/**
		* A check to make sure we have something to wrap our notices with
		* @private
		*/  
		_verifyWrapper: function(){
		  
			if($('#notify-notice-wrapper').length == 0){
				$('body').append(this._tpl_wrap);
			}
		
		}
		
	}
/** END - Fancy Notification Widget **/

	/**
	 * DateFormat
	 * Adaptation of the 'Date Format 1.2.3' code by Steven Levithan <stevenlevithan.com>
	 *
	 * Original comment header maintained for proper acknowledgement of original author's code and effort.
	 *
	 * Date Format 1.2.3
	 * (c) 2007-2009 Steven Levithan <stevenlevithan.com>
	 * MIT license
	 *
	 * Includes enhancements by Scott Trenda <scott.trenda.net>
	 * and Kris Kowal <cixar.com/~kris.kowal/>
	 *
	 * Accepts a date, a mask, or a date and a mask.
	 * Returns a formatted version of the given date.
	 * The date defaults to the current date/time.
	 * The mask defaults to dateFormat.masks.default.
	 */
	/**
	 *  DateFormat <br/>
	 *  Adaptation of the {@link http://blog.stevenlevithan.com/archives/date-time-format|'Date Format 1.2.3'} code by {@link http://stevenlevithan.com/|Steven Levithan}<br/>
	 *  @name SPHelper.DateFormat
	 *  @module SPHelper/DateFormat
	 */
	/**
	 *  @method
	 *  @name DateFormat
	 *  @param {DateTime} varDate -
	 *  @param {string} mask -
	 *  @param {boolean} utc -
	 *  @return {datetime} Return the formatted date string
	 */
	$.fn.SPHelper.DateFormat = function(varDate, mask, utc){
		var rtn = null;
		try{
			rtn = dateFormat(varDate, mask, utc);
		}catch(e){
			debug("Date Format Failed on value: " + varDate + " | Error: " + e,3 );
			rtn = varDate;
		}
	    return rtn;
	}
	
	//Also prototyping it to the javascript stack for even easier use.
	Date.prototype.format = function (mask, utc) {
	    return dateFormat(this, mask, utc);
	};
	
	// Add Days
	Date.prototype.addDays = function(days) {
	    this.setDate(this.getDate() + days);
	    return this;
	};
	
	//SharePoint ISODateFormat for uploading to a SharePoint List field
	/*$.fn.SPHelper.ISODateFormat = function(varDate){
	    return dateFormat(varDate, "spISODateTime");
	}*/


	var dateFormat = function () {
	    var token = /d{1,4}|m{1,4}|yy(?:yy)?|([HhMsTt])\1?|[LloSZ]|"[^"]*"|'[^']*'/g,
	        timezone = /\b(?:[PMCEA][SDP]T|(?:Pacific|Mountain|Central|Eastern|Atlantic) (?:Standard|Daylight|Prevailing) Time|(?:GMT|UTC)(?:[-+]\d{4})?)\b/g,
	        timezoneClip = /[^-+\dA-Z]/g,
	        pad = function (val, len) {
	            val = String(val);
	            len = len || 2;
	            while (val.length < len) val = "0" + val;
	            return val;
	        };
	
	    // Regexes and supporting functions are cached through closure
	    return function (date, mask, utc) {
			
	        var dF = dateFormat;
			if(isString(date)){
				date = convertStringToDate(date);
			}	
	        // You can't provide utc if you skip other args (use the "UTC:" mask prefix)
	        if (arguments.length == 1 && Object.prototype.toString.call(date) == "[object String]" && !/\d/.test(date)) {
	            mask = date;
	            date = undefined;
	        }
	
	        // Passing date through Date applies Date.parse, if necessary
	        date = date ? new Date(date) : new Date;
	        if (isNaN(date)) throw SyntaxError("invalid date");
	
	        mask = String(dF.masks[mask] || mask || dF.masks["default"]);
	
	        // Allow setting the utc argument via the mask
	        if (mask.slice(0, 4) == "UTC:") {
	            mask = mask.slice(4);
	            utc = true;
	        }
	
	        var _ = utc ? "getUTC" : "get",
	            d = date[_ + "Date"](),
	            D = date[_ + "Day"](),
	            m = date[_ + "Month"](),
	            y = date[_ + "FullYear"](),
	            H = date[_ + "Hours"](),
	            M = date[_ + "Minutes"](),
	            s = date[_ + "Seconds"](),
	            L = date[_ + "Milliseconds"](),
	            o = utc ? 0 : date.getTimezoneOffset(),
	            flags = {
	                d:    d,
	                dd:   pad(d),
	                ddd:  dF.i18n.dayNames[D],
	                dddd: dF.i18n.dayNames[D + 7],
	                m:    m + 1,
	                mm:   pad(m + 1),
	                mmm:  dF.i18n.monthNames[m],
	                mmmm: dF.i18n.monthNames[m + 12],
	                yy:   String(y).slice(2),
	                yyyy: y,
	                h:    H % 12 || 12,
	                hh:   pad(H % 12 || 12),
	                H:    H,
	                HH:   pad(H),
	                M:    M,
	                MM:   pad(M),
	                s:    s,
	                ss:   pad(s),
	                l:    pad(L, 3),
	                L:    pad(L > 99 ? Math.round(L / 10) : L),
	                t:    H < 12 ? "a"  : "p",
	                tt:   H < 12 ? "am" : "pm",
	                T:    H < 12 ? "A"  : "P",
	                TT:   H < 12 ? "AM" : "PM",
	                Z:    utc ? "UTC" : (String(date).match(timezone) || [""]).pop().replace(timezoneClip, ""),
	                o:    (o > 0 ? "-" : "+") + pad(Math.floor(Math.abs(o) / 60) * 100 + Math.abs(o) % 60, 4),
	                S:    ["th", "st", "nd", "rd"][d % 10 > 3 ? 0 : (d % 100 - d % 10 != 10) * d % 10]
	            };
	
	        return mask.replace(token, function ($0) {
	            return $0 in flags ? flags[$0] : $0.slice(1, $0.length - 1);
	        });
	    };
	}();
	
	// Some common format strings
	dateFormat.masks = {
	    "default":      "ddd mmm dd yyyy HH:MM:ss",
	    shortDate:      "mm/dd/yyyy",
		shortDateDash:	"mm-dd-yyyy",
	    mediumDate:     "mmm d, yyyy",
	    longDate:       "mmmm d, yyyy",
	    fullDate:       "dddd, mmmm d, yyyy",
	    shortTime:      "h:MM TT",
	    mediumTime:     "h:MM:ss TT",
	    longTime:       "h:MM:ss TT Z",
	    isoDate:        "yyyy-mm-dd",
	    isoTime:        "HH:MM:ss",
	    isoDateTime:    "yyyy-mm-dd'T'HH:MM:ss",
	    isoUtcDateTime: "UTC:yyyy-mm-dd'T'HH:MM:ss'Z'",
	    spQuery:		"yyyy-mm-dd",
	    spISODateTime:   "yyyy-mm-dd'T'HH:MM:ssZ",
	    milDate:		"dd-mmm-yy",
	    toISOString:    "yyyy-mm-dd'T'HH:MM:ss.L'Z'",
	    toISOZeroTime:  "yyyy-mm-dd'T'00:00:00"

	};
	
	// Internationalization strings
	dateFormat.i18n = {
	    dayNames: [
	        "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat",
	        "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
	    ],
	    monthNames: [
	        "JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC",
	        "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
	    ]
	};
	
/*** END - Date Format Code ***/

// Everything Below this point is a function that assists in making SPHelper possible
// The functions are intended to be called ONLY Locally within the SPHelper and not externally by the user.
	
	/* Validation Methods */
	function isUndefined(isX) {
		return typeof isX === 'undefined';
	}
	function isFunction(isX) {
		return typeof isX === 'function';
	}
	function isObject(isX) {
		return typeof isX === 'object';
	}
	function isString(isX) {
		return typeof isX === 'string';
	}
	function isBoolean(isX) {
		return typeof isX === 'boolean';
	}
	function isNumber(isX) {
		return typeof isX === 'number';
	}
	function isArray(isX) {
		return Object.prototype.toString.call(isX) === '[object Array]';
	}
	function isEmptyObject(obj) {
	    var name;
	    for (name in obj) {
	        return false;
	    }
	    return true;
	}	
	function isGUID(str){
		if(/^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/.test(str)){
			return true;
		}
		if(/^\{?[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}\}?$/.test(str)){
			return true;
		}
		
		return false;
	}

	function getInteger(str) {
		return parseInt(str, 10);
	}
	
	function selectObject(text,idx){
		this.strText = text;
		this.strVal = idx || text;
	}
	
	/* Conversion Methods */
	function convertStringToNumber(val) {
		if (typeof val === "string") {
			var match = val.match(/[0-9,.]+/g);
			if (null !== match) {
				val = match[0].replace(/,/g, ''); // commas to delimit thousands need to be removed
				val = parseFloat(val);
			}
		}
		return val;
	}
	
	function convertStringToDate(strDate){
		//Format from SharePoint: 2015-03-11 12:57:32
		//Format from ISO: 2015-03-11T12:57:32
		var dateParts;
		var hourParts;

		if(strDate == ""){
			debug("Function: convertStringToDate - Error: strDate is empty or invalid date. - Data passed in: " + strDate, 3);
			return null;
		}
		if(strDate.indexOf("T") > -1){
			dateParts = strDate.split("T")[0].split("-");
			hourParts = strDate.split("T")[1].split(":");
			if(hourParts[2].indexOf("Z") > -1){
				hourParts[2] = hourParts[2].split("Z")[0];
			}
		}else{
			dateParts = strDate.split(" ")[0].split("-");
			hourParts = strDate.split(" ")[1].split(":");
		}
					//new Date(    year,       month,         day,        hours,       minutes,     seconds   )
		var rtnDate = new Date(dateParts[0],dateParts[1]-1,dateParts[2],hourParts[0],hourParts[1],hourParts[2])
		return rtnDate;
	}
	
	/* Dumb Utilities */
	function removeOptions(selectbox){
	    for(var i=selectbox.options.length-1;i>=0;i--){
	        selectbox.remove(i);
	    }
	}
   
	/* Primary Methods */
	function GetURLs(options) {
		$.fn.SPHelper.init(options);
		
		var lclSite;
		var lclParent;
		
		URL.root = window.location.protocol + "//" + window.location.host + "/";
		
		var pathArray = window.location.pathname.split( '/' );

		if(pathArray[1] === settings.SITECOLLECTIONS){
			URL.collection = URL.root + settings.SITECOLLECTIONS +"/" + pathArray[2] + "/";
		}else{
			URL.collection = URL.root + pathArray[1] +"/";
		}

		if(settings.SITE_URL != null){
			URL.site = settings.SITE_URL;
			lclSite = URL.site;
		}else{

			getSiteByAJAX();
					
			lclSite = URL.site;
		}
		
		pathArray = lclSite.split( '/' );
		URL.parent = "";

		for(var i=0; i < (pathArray.length-1); i++){
			URL.parent += pathArray[i] + "/";
		}
		options = null;
	}

	function getSiteByAJAX(){

		var site = null;
        // If we still don't know the current site, we call WebUrlFromPageUrlResult.
        var msg = SOAPEnvelope.header +
            "<WebUrlFromPageUrl xmlns='" + SCHEMASharePoint + "/soap/' ><pageUrl>" +
            ((location.href.indexOf("?") > 0) ? location.href.substr(0, location.href.indexOf("?")) : location.href) +
            "</pageUrl></WebUrlFromPageUrl>" +
            SOAPEnvelope.footer;
        var gotSite = $.ajax({
            async: false, // Need this to be synchronous so we're assured of a valid value
            url: "/_vti_bin/Webs.asmx",
            type: "POST",
            data: msg,
            dataType: "xml",
            contentType: "text/xml;charset=\"utf-8\"",
            complete: function (xData) {
            	if(xData.responseXML.xml){
	                site = $(xData.responseXML.xml).find("WebUrlFromPageUrlResult").text();
	            }else{
	                site = $(xData.responseText).find("WebUrlFromPageUrlResult").text();
	            }
            }
        });
        
        gotSite.done(function () {
			URL.site = site;
		});
		msg = gotSite = null;
	}

	function getGUID_byName(options){
		if(isEmptyObject(URL)){ GetURLs(); }

		var strListGUID = null;
		var lclOptions = {
			list: null,
			parentSite: false,
			webURL: URL.site
		}

		lclOptions = $.extend({}, lclOptions, options);
		if( lclOptions.parentSite ){ lclOptions.webURL = URL.parent; }

		$().SPServices({
			operation: "GetList",
			webURL: lclOptions.webURL,
			listName: lclOptions.list,
			async: false,  
			completefunc: function(xData, Status) {
				strListGUID = $(xData.responseXML).find("List").attr("ID");
			}
		});
		
		options = lclOptions = null;
		return strListGUID;
	}

	function getList_HiddenStatus(options){
		if(isEmptyObject(URL)){ GetURLs(); }
		
		var result = false;
		var lclOptions = {
			list: null,
			parentSite: false,
			webURL: URL.site
		}

		lclOptions = $.extend({}, lclOptions, options);

		if( lclOptions.parentSite ){ lclOptions.webURL = URL.parent; }
		if(!isGUID(lclOptions.list)){ lclOptions.list = getGUID_byName({list:lclOptions.list,parentSite:lclOptions.parentSite,webURL:lclOptions.webURL}); }
		
		$().SPServices({
			operation: "GetList",
			webURL: lclOptions.webURL,
			listName: lclOptions.list,
			async: false,  
			completefunc: function(xData, Status) {
				result = $(xData.responseXML).find("List").attr("Hidden");
				debug("getList_HiddenStatus - Get List Hidden Function: " + Status);
				if(settings.SHOW_XML){ 
					debug($().SPServices.SPDebugXMLHttpResult({ node: xData.responseXML })); 
				}
			}
		});
		
		options = lclOptions = null;
		return result;				
	}

	function changeListStatus(options){
		//Assume we are going to un-Hide the list if hidden is not provided.
		if(isEmptyObject(URL)){ GetURLs(); }
		
		var result = false;
		var lclOptions = {
			list: null,
			parentSite: false,
			webURL: URL.site,
			hidden: "False"
		}

		lclOptions = $.extend({}, lclOptions, options);

		if( lclOptions.parentSite ){ lclOptions.webURL = URL.parent; }
		if(!isGUID(lclOptions.list)){ lclOptions.list = getGUID_byName({list:lclOptions.list,parentSite:lclOptions.parentSite,webURL:lclOptions.webURL}); }
		if( isBoolean(lclOptions.hidden) ){ if(lclOptions.hidden){ lclOptions.hidden = "True"; }else{ lclOptions.hidden = "False"; }}

		$().SPServices({  
			operation: "UpdateList",  
			webURL: lclOptions.webURL,
			listName: lclOptions.list,
			listProperties: "<List Hidden='"+ lclOptions.hidden +"' />",
		    async: false,  
		    completefunc: function(xData, Status){ 
				if(blnSUCCESS.test(Status)){
					result = true;
				}
				debug("changeListStatus - Change List Status Function: " + Status);
				debug("List Status Changed : "+ result +" | List: "+ lclOptions.list );
				if(settings.SHOW_XML){ 
					debug($().SPServices.SPDebugXMLHttpResult({ node: xData.responseXML })); 
				}
		    }
		});
		
		options = lclOptions = null;
		return result;
	}
	
	function onlyUnique(arrData){
		var uniqueData = [];
		var tempData = [];
		var tempIdx = 0;

		$.each(arrData, function(i,el){
			if(isObject(el)){
				$.each(el, function(key,val){
					if($.inArray(val, tempData ) === -1){
						tempData.push(val);
						uniqueData.push(new selectObject(tempData[tempIdx]));		
						tempIdx++;
					}			
				});
			}else{
				if($.inArray(el, uniqueData ) === -1) uniqueData.push(el);
			}
		});	
		arrData = null;
		return uniqueData;
	}


	function sort_by(field, reverse, primer){
	   var key = function (x) {return primer ? primer(x[field]) : x[field]};
	
	   return function (a,b) {
		  var A = key(a), B = key(b);
		  return ( (A < B) ? -1 : ((A > B) ? 1 : 0) ) * [-1,1][+!!reverse];                  
	   }
	}
	
	//Little debug function for writing messages to the browser's (IE) console
	function debug(str,type){
		if(settings.DEBUG){
			if(window.console){
				type = type || 0;
				switch(type){
					case 1:
						console.info(str);
						break;
					case 2:
						console.warn(str);
						break;
					case 3:
						console.error(str);
						break;
					default:
						console.log(str);
						break;
				}
			}
		}
	}

//Format a string in currency
String.prototype.formatCurrency = function(c, d, t){
var n = this, 
    c = isNaN(c = Math.abs(c)) ? 2 : c, 
    d = d == undefined ? "." : d, 
    t = t == undefined ? "," : t, 
    s = n < 0 ? "-" : "", 
    i = parseInt(n = Math.abs(+n || 0).toFixed(c)) + "", 
    j = (j = i.length) > 3 ? j % 3 : 0;
   return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
 };
	
})(jQuery);

