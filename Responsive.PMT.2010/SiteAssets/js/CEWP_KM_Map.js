var userID, org, orgs, orgsenum, type, types, total, dhtml = "", ahtml = '';
var map, mapdata, mapenum, mapitem, mapitem2, mapitem3, mapitemhq, mapitems, mapitems2, mapitems3, mapitemshq, chartitems, mapchart;
var currentpopup = null;
var SLASH = "/";
var mw, mh;
var pinned;

(function (H) {
    
    H.Tooltip.prototype.pin = function () {
        this._hide = this.hide;
        this._move = this.move;
        this._refresh = this.refresh;
        this.hide = function () {};
        this.move = function () {};
        this.refresh = function () {};
    };
    H.Tooltip.prototype.unpin = function () {
        this.hide = this._hide;
        this.move = this._move;
        this.refresh = this._refresh;
    };
    
}(Highcharts));

function MapInit(site) {
    SP.SOD.executeOrDelayUntilScriptLoaded(function () {

        RegisterSod('core.js', site + "/_layouts/1033/core.js");
        RegisterSod('proj4.js', site + "/SiteAssets/js/proj4.js");
        RegisterSod('map.js', site + "/SiteAssets/js/map.js");
        RegisterSod('usall.js', site + "/SiteAssets/js/usall.js");
        RegisterSodDep('core.js', 'sp.js');     
        RegisterSodDep('proj4.js', 'core.js');
        RegisterSodDep('map.js', 'proj4.js'); 
        RegisterSodDep('usall.js', 'map.js');
        EnsureScriptFunc("usall.js", null, function () {      
            GetMapData(site);  
        });
    }, "sp.js");
}

function GetMapData(site) {

    userID = _spPageContextInfo.userId;
    var inDesignMode = document.forms[MSOWebPartPageFormName].MSOLayout_InDesignMode.value;

    logit("Design Mode = " + inDesignMode);
    if (inDesignMode === "1") {
        logit("Map will not load in edit mode.");
        $("#map_loading").html("").append("<div style='margin:5px;text-align:center;font-weight:bold;font-size:14px;font-style:italic;'>Query Suspended During Page Edit Mode</div>"); 
    }
    else {

        h1 = $(window).height();
        h2 = (Math.floor(h1 / 10) * 10) - 100;
        h3 = h2 - 150;

        $('#PMTModal').on('shown.bs.modal', function (event) {
            $(".pmtmodal").css({ height: h2 + "px" });
            $("#PMTModal .panel-body").css({ height: h3 + "px" });
        });

        orgs = new Array();
        mapitems = new Array();
        mapitems2 = new Array();
        mapitems3 = new Array();        
        mapitemshq = new Array();
        var monkey = getOrgData();
        jQuery.when.apply(null, monkey).done(function () {
            logit("Map get OrgData monkey complete.");
            var dog = getMapPopupData();
            jQuery.when.apply(null, dog).done(function () {
                logit("Map Data dog complete.");
            	var chimp = getMapPopupData2();
             	jQuery.when.apply(null, chimp).done(function () {           	
                	logit("Map Data chimp complete.");
            		var baby = getMapPopupData3();
             		jQuery.when.apply(null, baby).done(function () {  
                 		logit("Map Data baby complete.");
            			var hq = getMapPopupDatahq();           
             			jQuery.when.apply(null, hq).done(function () {  
                  		    logit("Map Data hq complete.");                 		
               			    var stop = "stop";
                		    drawMap();
            			});                  		
            		});                 		
            	});                		
            });
        }); 
    }
}

function getOrgData() {
// deferreds, mapitems = Organizations supported on site - most
// deferreds3, mapitems3 = Organizations supported by HQ  - fewer
// deferreds2, mapitems2 = Organizations not currently supported - even fewer
// deferredshq, mapitemshq = TRADOC HQ -default
	var deferreds = [];
	var deferreds2 = [];	
	var deferreds3 = [];	
	var deferredshq = [];
	var tmp1, tmp2, tmp3, tmp4; 
	var inc = "Include(";
    var xml = "<View><Method Name='Read List' /><Query><OrderBy><FieldRef Name='ChartOrder' /></OrderBy><Where><IsNotNull><FieldRef Name='Title' /></IsNotNull></Where></Query>";
    var fields = ["Title", "OrganizationType", "Base", "Level", "Latitude", "Longitude", "ChartOrder", "ShowOnKM", "ShowOnChart", "POC", "Modified"];
    xml += "<ViewFields>";
    for (var z = 0; z <= fields.length - 1; z++) {
        xml += "<FieldRef Name='" + fields[z] + "'/>";
        if (z == fields.length - 1) {
            inc += fields[z] + ")";
        }
        else {
            inc += fields[z] + ", ";
        }
    }
    xml += "<FieldRef Name='ID'/>";
    xml += "</ViewFields>";
    xml += "</View>";
	deferreds.push($.when(CKO.CSOM.GetListItems.getitemsfilteredcomplex("current", "Organization", xml, inc)).then(function (items) {
        if (items.get_count() > 0) {
            mapenum = items.getEnumerator();
            while (mapenum.moveNext()) {
            	mapitem = mapenum.get_current();
            	if (mapitem.get_item("ShowOnKM") == true){
	            	tmp1 = mapitem.get_item("OrganizationType");      	
					switch(tmp1){
					
						case "Supported on site":
		            	mapitems.push({ 
		            		"Title": mapitem.get_item("Title"),
		            		"OrganizationType": mapitem.get_item("OrganizationType"),            		
		            		"Base": mapitem.get_item("Base"),	            		
		            		"lat": mapitem.get_item("Latitude"), 
		            		"lon": mapitem.get_item("Longitude"),
		            		"POC": mapitem.get_item("POC"), 
		            		"Level": mapitem.get_item("Level"),
		            		"Modified": mapitem.get_item("Modified"),	
		            		"PopupData": ""	          	
		            	});
	            		break;
	            		
						case "Not currently supported":
		            	mapitems2.push({ 
		            		"Title": mapitem.get_item("Title"),
		            		"OrganizationType": mapitem.get_item("OrganizationType"),            		
		            		"Base": mapitem.get_item("Base"),	            		
		            		"lat": mapitem.get_item("Latitude"), 
		            		"lon": mapitem.get_item("Longitude"),
		            		"POC": mapitem.get_item("POC"), 
		            		"Level": mapitem.get_item("Level"),
		            		"Modified": mapitem.get_item("Modified"),	
		            		"PopupData": ""	          	
		            	});
		           		break;
	            		
						case  "Supported by TRADOC HQ":
		            	mapitems3.push({ 
		            		"Title": mapitem.get_item("Title"),
		            		"OrganizationType": mapitem.get_item("OrganizationType"),            		
		            		"Base": mapitem.get_item("Base"),	            		
		            		"lat": mapitem.get_item("Latitude"), 
		            		"lon": mapitem.get_item("Longitude"),
		            		"POC": mapitem.get_item("POC"), 
		            		"Level": mapitem.get_item("Level"),
		            		"Modified": mapitem.get_item("Modified"),	
		            		"PopupData": ""	          	
		            	});
		           		break;		            	
	            	           	
						case "TRADOC HQ":
		            	mapitemshq.push({ 
		            		"Title": mapitem.get_item("Title"),
		            		"OrganizationType": mapitem.get_item("OrganizationType"),            		
		            		"Base": mapitem.get_item("Base"),	            		
		            		"lat": mapitem.get_item("Latitude"), 
		            		"lon": mapitem.get_item("Longitude"),
		            		"POC": mapitem.get_item("POC"), 
		            		"Level": mapitem.get_item("Level"),
		            		"Modified": mapitem.get_item("Modified"),	
		            		"PopupData": ""
		            	});
	            		break;
	            	}//end switch
            	}// end if show on KM
            }// end while	
        }// end if items	
        },  function (sender, args) {
        	logit("Error getting data from Organization list : " + args.get_message());
    	}));//end promise
    logit("returned deferred monkey ");
    return deferreds;
}

function getMapPopupData() {
	var deferreds = [];
	for (i = 0; i < mapitems.length; i++) {
		var base = mapitems[i].Base;
		deferreds.push($.when(CKO.CSOM.GetListItems.getitemsfilteredorderedandpasstoelement("current", "Organization", "Base", base , "ChartOrder", i)).then(function (items, i) {
	    	if (items.get_count() > 0) {
	    		var enumerator = items.getEnumerator();
				var cnt = 0;
	    		while (enumerator.moveNext()){
	    			var current = enumerator.get_current();
	    			if(cnt == 0) {
	    				mapitems[i].PopupData =  mapitems[i]["OrganizationType"] + ";" + mapitems[i]["Level"] + ";" + mapitems[i]["Base"] + ";" + mapitems[i]["Title"] + ";" + mapitems[i]["POC"];
	    			}
	    			else {
	    				mapitems[i].PopupData += "|" + mapitems[i]["OrganizationType"] + ";" + mapitems[i]["Level"] + ";" + mapitems[i]["Base"] + ";" + mapitems[i]["Title"] + ";" + mapitems[i]["POC"];	    			
	    			}
	    			cnt += 1;
	    		}
	    	}
	    }, function(sender, args) {
        	logit("Error getting Organizations supported on site from KnowledgeMap list: " + args.get_message());
    	}));
	}
	logit("returned deferred dog");
	return deferreds;
}

function getMapPopupData2() {
	var deferreds2 = [];
	for (i = 0; i < mapitems2.length; i++) {
		var base = mapitems2[i].Base;
		deferreds2.push($.when(CKO.CSOM.GetListItems.getitemsfilteredorderedandpasstoelement("current", "Organization", "Base", base , "ChartOrder", i)).then(function (items, i) {
	    	if (items.get_count() > 0) {
	    		var enumerator = items.getEnumerator();
				var cnt = 0;
	    		while (enumerator.moveNext()){
	    			var current = enumerator.get_current();
	    			if(cnt == 0) {
	    			 	mapitems2[i].PopupData =  mapitems2[i]["OrganizationType"] + ";" + mapitems2[i]["Level"] + ";" + mapitems2[i]["Base"] + ";" + mapitems2[i]["Title"] + ";" + mapitems2[i]["POC"];
	    			}
	    			else {
	    				mapitems2[i].PopupData += "|" + mapitems2[i]["OrganizationType"] + ";" + mapitems2[i]["Level"] + ";" + mapitems2[i]["Base"] + ";" + mapitems2[i]["Title"] + ";" + mapitems2[i]["POC"];	    			
	    			}
	    			cnt += 1;
	    		}
			}
	    }, function (sender, args) {
       	logit("Error getting Organizations not currently supported data from KnowledgeMap list: " + args.get_message());
   		}));
	}
	logit("returned deferred2 chimp");
	return deferreds2;
}

function getMapPopupData3() {
	var deferreds3 = [];
	for (i = 0; i < mapitems3.length; i++) {
		var base = mapitems3[i].Base;
		deferreds3.push($.when(CKO.CSOM.GetListItems.getitemsfilteredorderedandpasstoelement("current", "Organization", "Base", base , "ChartOrder", i)).then(function (items, i) {
	    	if (items.get_count() > 0) {
	    		var enumerator = items.getEnumerator();
				var cnt = 0;
	    		while (enumerator.moveNext()){
	    			var current = enumerator.get_current();
	    			if(cnt == 0) {
	    				mapitems3[i].PopupData =  mapitems3[i]["OrganizationType"] + ";" + mapitems3[i]["Level"] + ";" + mapitems3[i]["Base"] + ";" + mapitems3[i]["Title"] + ";" + mapitems3[i]["POC"];
	    			}
	    			else {
	    				mapitems3[i].PopupData += "|" + mapitems3[i]["OrganizationType"] + ";" + mapitems3[i]["Level"] + ";" + mapitems3[i]["Base"] + ";" + mapitems3[i]["Title"] + ";" + mapitems3[i]["POC"];	    			
	    			}
	    	}
	    	cnt -= 1;
		}
	    }, function (sender, args) {
       	logit("Error getting Organizations supported by HQ Organization data from KnowledgeMap list: " + args.get_message());
   		}));
	}
	logit("returned deferred3 baby");
	return deferreds3;
}

function getMapPopupDatahq() {
	var deferredshq = [];
	for (i = 0; i < mapitemshq.length; i++) {
		var base = mapitemshq[i].Base;
		deferredshq.push($.when(CKO.CSOM.GetListItems.getitemsfilteredorderedandpasstoelement("current", "Organization", "Base", base , "ChartOrder", i)).then(function (items, i) {
	    	if (items.get_count() > 0) {
	    		var enumerator = items.getEnumerator();
				var cnt = 0;
	    		while (enumerator.moveNext()){
	    			var current = enumerator.get_current();
	    			if(cnt == 0) {
	    				mapitemshq[i].PopupData =  mapitemshq[i]["OrganizationType"] + ";" + mapitemshq[i]["Level"] + ";" + mapitemshq[i]["Base"] + ";" + mapitemshq[i]["Title"] + ";" + mapitemshq[i]["POC"];
	    			}
	    			else {
	    				mapitemshq[i].PopupData += "|" + mapitemshq[i]["OrganizationType"] + ";" + mapitemshq[i]["Level"] + ";" + mapitemshq[i]["Base"] + ";" + mapitemshq[i]["Title"] + ";" + mapitemshq[i]["POC"];	    			
	    			}
	    			cnt += 1;
	    	}
		}
	    }, function (sender, args) {
       	logit("Error getting TRADOC HQ Organization data from KnowledgeMap list: " + args.get_message());
   		}));
	}
	logit("returned deferred hq");
	return deferredshq;
}

function drawMap() {
	logit("Drawing the map...");
	map = Highcharts.maps["countries/us/usall"];
    mapchart = Highcharts.mapChart('map_container', {
    	chart: {
    		animation: false
    	},
		plotOptions: {
            series: {
                stickyTracking: true          
	        }
        },
        title: {
            text: 'TRADOC Knowledge Map'
        },
        tooltip: {
        	followPointer: false,
	        useHTML: true,
	        hideDelay: 5000,
	        formatter: function() {
	        	var tt = drawtooltip(this);
	        	return tt;
	        }
	    },
        series: [{
            name: 'United States',
            mapData: map,
            borderColor: '#606060',
            nullColor: 'rgba(200, 200, 200, 0.2)',
            showInLegend: false
        }, {
            name: 'Separators',
            type: 'mapline',
            data: Highcharts.geojson(map, 'mapline'),
            color: '#101010',
            enableMouseTracking: false,
            showInLegend: false
        }, {
            type: 'mappoint',
            name: 'Supported on site',
            data: mapitems,
            stickyTracking: false,
            color: 'red',
            marker: {
            	radius: 4,
            	symbol: 'circle'
            }	
        }, {
            type: 'mappoint',
            name: 'Not currently supported',
            data: mapitems2,
            stickyTracking: false,
            color: 'blue',
            marker: {
            	radius: 4,
            	symbol: 'diamond'
            }              	
        }, {
            type: 'mappoint',
            name: 'Supported by TRADOC HQ',
            data: mapitems3,
            stickyTracking: false,
            color: 'gold',            
            marker: {
            	radius: 3,
            	symbol: 'square'
		  	}               
        }, {
            type: 'mappoint',
            name: 'TRADOC HQ',
            data: mapitemshq,
            stickyTracking: false,           
            marker: {
		  		symbol: 'url(https://hq.tradoc.army.mil/sites/OCKO/PMT/SiteAssets/images/goldstar2.svg)'
		  	}
        }]
    });
	
	$('#map_container').bind('mousedown', function () {console.log(35)
	    $('#map_container').highcharts().tooltip[pinned ? 'unpin' : 'pin']();
    	pinned = !pinned;
	});
    
    $("#map_loading").hide();
    logit("Drew the map");
}

function drawtooltip(obj) {
	var stop = "stop";
	var title = obj.point.Title;
	var data = obj.point.PopupData;
	var html = "<div class='popdata' id='popcontainer_" + title.replace(/ /g, "_") + "'>";
	if(data.indexOf("|") > 0) {
		// Multiple boxes
		var tmp1, tmp2, tmp3, tmp4;
		tmp1 = data.split("|");
		for (var z = 0; z < tmp1.length; z++) {
			tmp2 = tmp1[z].split(";");
			html += "<div class='popBox' id='popup_";
			tmp3 = tmp2[0];
			
			switch(tmp3){
				case "Supported on site":
					html += tmp2[2].replace(/ /g, "_") + "' data-org='" + tmp2[2] + "' onclick='minidashboard(this)'>";
					if (tmp2[1] > 0) {
						html += "<div class='row popRow'>";
						for (var y = 0; y < tmp2[1]; y++){
							html += "<span class='glyphicon glyphicon-star'></span>";
						}
						html += "<span class='glyphicon glyphicon-info-sign info-right'></span>";
						html += "</div>";
						}
					else {
						html += "<div class='row popRow'>";
						html += "<span class='glyphicon glyphicon-info-sign info-right'></span>";
						html += "</div>";
					}
					html += "<div class='row popRow'>" + tmp2[2] + "</div>";
					html += "<div class='row popRow'>" + tmp2[3] + "</div>";
					html += "<div class='row popRow'>" + tmp2[4] + "</div>";
					html += "</div>";				
					break;

				case "Supported by TRADOC HQ":
					html += tmp2[2].replace(/ /g, "_") + "' data-org='" + tmp2[2] + "' onclick='minidashboard(this)'>";
					if (tmp2[1] > 0) {
						html += "<div class='row popRow'>";
						for (var y = 0; y < tmp2[1]; y++){
							html += "<span class='glyphicon glyphicon-star'></span>";
						}
						html += "<span class='glyphicon glyphicon-info-sign info-right'></span>";
						html += "</div>";
						}
					else {
						html += "<div class='row popRow'>";
						html += "<span class='glyphicon glyphicon-info-sign info-right'></span>";
						html += "</div>";
					}
					html += "<div class='row popRow'>" + tmp2[2] + "</div>";
					html += "<div class='row popRow'>" + tmp2[3] + "</div>";
					html += "<div class='row popRow'>" + tmp2[4] + "</div>";
					html += "</div>";			
					break;

				case "TRADOC HQ":
					html += tmp2[2].replace(/ /g, "_") + "' data-org='" + tmp2[2] + "' onclick='minidashboard(this)'>";
					html += "<div class='row popRow'>";
						for (var y = 0; y < tmp2[1]; y++){
							html += "<span class='glyphicon glyphicon-star'></span>";
						}
					html += "<span class='glyphicon glyphicon-info-sign info-right'></span>";
					html += "</div>";
					html += "<div class='row popRow'>" + tmp2[2] + "</div>";
					html += "<div class='row popRow'>" + tmp2[3] + "</div>";
					html += "<div class='row popRow'>" + tmp2[4] + "</div>";
					html += "</div>";
					break;

				case "Not currently supported":
					html += tmp2[3].replace(/ /g, "_") + "' data-org='" + tmp2[3] + "' onclick='minidashboard(this)'>";
					if (tmp2[1] > 0) {
						html += "<div class='row popRow'>";
						for (var y = 0; y < tmp2[1]; y++){
							html += "<span class='glyphicon glyphicon-star'></span>";
						}
						html += "<span class='glyphicon glyphicon-info-sign info-right'></span>";
						html += "</div>";
						}
					else {
						html += "<div class='row popRow'>";
						html += "<span class='glyphicon glyphicon-info-sign info-right'></span>";
						html += "</div>";
					}
					html += "<div class='row popRow'>" + tmp2[2] + "</div>";
					html += "<div class='row popRow'>" + tmp2[3] + "</div>";
					html += "<div class='row popRow'>" + tmp2[4] + "</div>";
					html += "</div>";
					break;			
			}
		}
	}
	else {
		// Only one box, built on semicolon
		var tmp1, tmp2, tmp3, tmp4;
		tmp1 = data.split(";");
		html += "<div class='popBox' id='popup_";
		tmp3 = tmp1[0];
		switch(tmp3){
			case "Supported on site":
				html += tmp1[3].replace(/ /g, "_") + "' data-org='" + tmp1[3] + "' onclick='minidashboard(this)'>";
				if (tmp1[1] > 0) {
					html += "<div class='row popRow'>";
					for (var y = 0; y < tmp1[1]; y++){
						html += "<span class='glyphicon glyphicon-star'></span>";
					}
					html += "<span class='glyphicon glyphicon-info-sign info-right'></span>";
					html += "</div>";
					}
				else {
					html += "<div class='row popRow'>";
					html += "<span class='glyphicon glyphicon-info-sign info-right'></span>";
					html += "</div>";
				}
				html += "<div class='row popRow'>" + tmp1[2] + "</div>";
				html += "<div class='row popRow'>" + tmp1[3] + "</div>";
				html += "<div class='row popRow'>" + tmp1[4] + "</div>";
				html += "</div>";				
				break;		
				
			case "Supported by TRADOC HQ":
				html += tmp1[2].replace(/ /g, "_") + "' data-org='" + tmp1[2] + "' onclick='minidashboard(this)'>";
				if (tmp1[1] > 0) {
					html += "<div class='row popRow'>";
					for (var y = 0; y < tmp1[1]; y++){
						html += "<span class='glyphicon glyphicon-star'></span>";
					}
					html += "<span class='glyphicon glyphicon-info-sign info-right'></span>";
					html += "</div>";
					}
				else {
					html += "<div class='row popRow'>";
					html += "<span class='glyphicon glyphicon-info-sign info-right'></span>";
					html += "</div>";
				}
				html += "<div class='row popRow'>" + tmp1[2] + "</div>";
				html += "<div class='row popRow'>" + tmp1[3] + "</div>";
				html += "<div class='row popRow'>" + tmp1[4] + "</div>";
				html += "</div>";				
				break;

			case "TRADOC HQ":
				html += tmp1[2].replace(/ /g, "_") + "' data-org='" + tmp1[2] + "' onclick='minidashboard(this)'>";
				html += "<div class='row popRow'>";
				html += "<span class='glyphicon glyphicon-info-sign info-right'></span>";
				html += "</div>";
				html += "<div class='row popRow'>" + tmp1[2] + "</div>";
				html += "<div class='row popRow'>" + tmp1[3] + "</div>";
				html += "<div class='row popRow'>" + tmp1[4] + "</div>";
				html += "</div>";				
				break;
				
			case "Not currently supported":
				html += tmp1[2].replace(/ /g, "_") + "' data-org='" + tmp1[2] + "' onclick='minidashboard(this)'>";
				html += "<div class='row popRow'>";
				html += "<span class='glyphicon glyphicon-info-sign info-right'></span>";
				html += "</div>";
				html += "<div class='row popRow'>" + tmp1[2] + "</div>";					
				html += "<div class='row popRow'>" + tmp1[3] + "</div>";
				html += "<div class='row popRow'>" + tmp1[4] + "</div>";
				html += "</div>";	
				break;
		}
	}
	html += "</div>";
	return html;
}

function minidashboard(obj) {
	var tmp1, tmp2, tmp3;
	tmp1 = $("#" + obj.id).attr('data-org');
	ahtml = '';
	$.when(CKO.CSOM.GetListItems.getitemsfiltered("current", "Organization",  "Title", tmp1)).then(function (items) {
        var alertitems = items.getEnumerator();
        while (alertitems.moveNext()) {
        	var alertitem = alertitems.get_current();
			ahtml += '<div class="row">';
			ahtml += "Last Modified: "
			ahtml += alertitem.get_item("Modified") + '</div>';
        	ahtml += '<div class="row">';
			ahtml += "Major Achievements: "      	
        	ahtml += alertitem.get_item("Achievements") + '</div>';
        	ahtml += '<div class="row">';
 			ahtml += "Issues: "        	
			ahtml += alertitem.get_item("Issues") + '</div>';
			ahtml += '<div class="row">';
 			ahtml += "Events: " 			
			ahtml += alertitem.get_item("Events") + '</div>';
			ahtml += '<div class="row">';
 			ahtml += "Future Challenges: " 				
			ahtml += alertitem.get_item("Challenges") + '</div>';
		}
		$("#PMTModalBody").html('').append(ahtml);
		$("#PMTModalTitle").html('').append(tmp1 + " Data");
		tmp2 = $("#PMTModal").modal({
            "backdrop": true,
            "keyboard": false,
            "show": true
        });
    }, function (sender, args) {logit("GetAlerts Failed, " + args.get_message()); });
}

SP.SOD.notifyScriptLoadedAndExecuteWaitingJobs('CEWP_KM_Map.js');