var userID, org, orgs, orgsenum, type, types, total, dhtml = "", ahtml = '';
var map, mapdata, mapenum, mapitem, mapitems, chartitems, mapchart;
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
        RegisterSod('CEWP_KM_Map.js', site + "/SiteAssets/js/CEWP_KM_Map.js");
        RegisterSodDep('core.js', 'sp.js');
        RegisterSodDep('proj4.js', 'core.js');
        RegisterSodDep('map.js', 'proj4.js');
        RegisterSodDep('usall.js', 'map.js');
        RegisterSodDep('CEWP_KM_Map.js', 'usall.js');
        EnsureScriptFunc("CEWP_KM_Map.js", null, function () {
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
        var monkey = getOrgData();
        jQuery.when.apply(null, monkey).done(function () {
            logit("Map getOrgData complete.");
            var dog = getMapPopupData();
            jQuery.when.apply(null, dog).done(function () {
                logit("Map Data Loaded!");
                var stop = "stop";
                drawMap();
            });
        });
    }
}

function getOrgData() {
	var deferreds = [];
	
	var inc = "Include(";
    var xml = "<View><Method Name='Read List' /><Query><OrderBy><FieldRef Name='ChartOrder' /></OrderBy><Where><IsNotNull><FieldRef Name='Title' /></IsNotNull></Where></Query>";
    var fields = ["Title", "Base", "Level", "Latitude", "Longitude", "ChartOrder", "ShowOnKM", "ShowOnChart", "POC"];
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
        if (items.get_count() > 0) { //get map data
            mapenum = items.getEnumerator();
            while (mapenum.moveNext()) {
            	mapitem = mapenum.get_current();
            	if(mapitem.get_item("ShowOnKM") == true) {
	            	mapitems.push({ 
	            		"Title": mapitem.get_item("Title"),
	            		"Base": mapitem.get_item("Base"), 
	            		"lat": mapitem.get_item("Latitude"), 
	            		"lon": mapitem.get_item("Longitude"),
	            		"POC": mapitem.get_item("POC"), 
	            		"Level": mapitem.get_item("Level"),
	            		"PopupData": ""	            	
	            	});
            	}
            }
        }
    	}, function (sender, args) {
        logit("Error getting data from Organization list : " + args.get_message());
    }));
    return deferreds;
}

function getMapPopupData() {
	var deferreds = [];
	for (i = 0; i < mapitems.length; i++) {
		var base = mapitems[i].Base;
		deferreds.push($.when(CKO.CSOM.GetListItems.getitemsfilteredorderedandpasstoelement("current", "Organization", "Base", base, "ChartOrder", i)).then(function (items, i) {
	    	if (items.get_count() > 0) {
	    		var enumerator = items.getEnumerator();
				var cnt = 0;
	    		while (enumerator.moveNext()){
	    			var current = enumerator.get_current();
	    			if(cnt == 0) {
	    				mapitems[i].PopupData = current.get_item("Level") + ";" + current.get_item("Base") + ";" + current.get_item("Title") + ";" + current.get_item("POC");
	    			}
	    			else {
	    				mapitems[i].PopupData += "|" + current.get_item("Level") + ";" + current.get_item("Base") + ";" + current.get_item("Title") + ";" + current.get_item("POC");	    			
	    			}
	    			cnt += 1;
	    		}
	    	}
	    }, function (sender, args) {
        	logit("Error getting data from KnowledgeMap list: " + args.get_message());
    	}));
	}
	return deferreds;
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
            name: 'TRADOC Organizations',
            data: mapitems,
            stickyTracking: false,
            color: 'red',
            marker: {
            	radius: 5,
            	symbol: 'circle'
            }        
        }]
    });
	
	$('#map_container').bind('mousedown', function () {console.log(35)
	    $('#map_container').highcharts().tooltip[pinned ? 'unpin' : 'pin']();
    	pinned = !pinned;
	});
    
    $("#map_loading").hide();
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
			html += "<div class='popBox' id='popup_" + tmp2[2].replace(/ /g, "_") + "' data-org='" + tmp2[2] + "' onclick='minidashboard(this)'>";
			if (tmp2[0] > 0) {
				html += "<div class='row popRow'>";
				for (var y = 0; y < tmp2[0]; y++){
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
			html += "<div class='row popRow'>" + tmp2[1] + "</div>";
			html += "<div class='row popRow'>" + tmp2[2] + "</div>";
			html += "<div class='row popRow'>" + tmp2[3] + "</div>";
			html += "</div>";
		}
	}
	else {
		// Only one box
		var tmp1, tmp2, tmp3, tmp4;
		tmp1 = data.split(";");
		html += "<div class='popBox' id='popup_" + tmp1[2].replace(/ /g, "_") + "' data-org='" + tmp1[2] + "' onclick='minidashboard(this)'>";
		if (tmp1[0] > 0) {
			html += "<div class='row popRow'>";
			for (var y = 0; y < tmp1[0]; y++){
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
		html += "<div class='row popRow'>" + tmp1[1] + "</div>";
		html += "<div class='row popRow'>" + tmp1[2] + "</div>";
		html += "<div class='row popRow'>" + tmp1[3] + "</div>";
		html += "</div>";
	}
	html += "</div>";
	return html;
}

function minidashboard(obj) {
	var tmp1, tmp2, tmp3;
	tmp1 = $("#" + obj.id).attr('data-org');
	ahtml = '';
	$.when(CKO.CSOM.GetListItems.getitemsfiltered("current", "Organization", "Title", tmp1)).then(function (items) {
        var alertitems = items.getEnumerator();
        while (alertitems.moveNext()) {
        	var alertitem = alertitems.get_current();
        	ahtml += '<div class="row">';
        	ahtml += alertitem.get_item("Achievements") + '</div>';
        	ahtml += '<div class="row">';
			ahtml += alertitem.get_item("Issues") + '</div>';
			ahtml += '<div class="row">';
			ahtml += alertitem.get_item("Events") + '</div>';
			ahtml += '<div class="row">';
			ahtml += alertitem.get_item("Challenges") + '</div>';
		}
		$("#PMTModalBody").html('').append(ahtml);
		$("#PMTModalTitle").html('').append(tmp1 + " Data");
		tmp2 = $("#PMTModal").modal({
            "backdrop": true,
            "keyboard": false,
            "show": true
        });
    }, function (sender, args) { logit("GetAlerts Failed, " + args.get_message()); });
}

SP.SOD.notifyScriptLoadedAndExecuteWaitingJobs('CEWP_KM_Map.js');