var userID, org, orgs, orgsenum, type, types, total, dhtml = "", ahtml = '';
var totalchart, totalchartdata, totalchartenum, totalchartitem, totalchartitems;
var currentpopup = null;
var totalpositions = 0, totalstaffed = 0;
var SLASH = "/";
var tcw, tch;

function DrawTotalChart(site) {
    SP.SOD.executeOrDelayUntilScriptLoaded(function () {
        userID = _spPageContextInfo.userId;
        var inDesignMode = document.forms[MSOWebPartPageFormName].MSOLayout_InDesignMode.value;
        logit("Design Mode = " + inDesignMode);
        if (inDesignMode === "1") {
            logit("Map will not load in edit mode.");
            $("#totalchart_loading").html("").append("<div style='margin:5px;text-align:center;font-weight:bold;font-size:14px;font-style:italic;'>Query Suspended During Page Edit Mode</div>");
        }
        else {
            orgs = new Array();
            totalchartitems = new Array();
            var unicorn = getTCOrgData();
            jQuery.when.apply(null, unicorn).done(function () {
                logit("TC getTCOrgData complete.");
                var duck = getTotalChartData();
                jQuery.when.apply(null, duck).done(function () {
                    logit("All TC Data Loaded!");
                    var stop = "stop";
                    drawTotalChart();
                });
            });
        }
    }, "sp.js");
}

function getTCOrgData() {
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
        if (items.get_count() > 0) {
            totalchartenum = items.getEnumerator();
            while (totalchartenum.moveNext()) {
            	totalchartitem = totalchartenum.get_current();
            	if(totalchartitem.get_item("ShowOnChart") == true) {
	            	totalchartitems.push({ // get chart data
	            		"Title": totalchartitem.get_item("Title"),
	            		"Base": totalchartitem.get_item("Base"), 
	            		"Order": totalchartitem.get_item("ChartOrder"),
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

function getTotalChartData() {
	var deferreds = [];
	for (i = 0; i < totalchartitems.length; i++) {
    	var title = totalchartitems[i].Title
    	deferreds.push($.when(CKO.CSOM.GetListItems.getitemsfilteredandpasstoelement("current", "Knowledge Map", "Organization", title, i)).then(function (items, i) {
	    	if (items.get_count() > 0) {
	    		var enumerator = items.getEnumerator();
	    		var con = 0, mil = 0, civ = 0,cnt = 0;
	    		while (enumerator.moveNext()){
	    			var current = enumerator.get_current();
	    			var type = current.get_item("PersonType");
	    			switch(type){
	    				case "Contractor":
				    		if(current.get_item("Onhand")) { totalstaffed += 1;}			    			
			    			totalpositions += 1;
	    					break;
	    					
	    				case "Civilian":
				    		if(current.get_item("Onhand")) { totalstaffed += 1;}    			
			    			totalpositions += 1;
	    					break;
	    					
	    				case "Military":
				    		if(current.get_item("Onhand")) { totalstaffed += 1;}
			    			totalpositions += 1;
	    					break;
	    			}
	    		}
	    	}    	
    	}, function (sender, args) {
        	logit("Error getting data from KnowledgeMap list: " + args.get_message());
    	}));
    }
    return deferreds;
}

function drawTotalChart() {		
	totalchart = Highcharts.chart('totalchart', {
	    chart: {
	        type: 'column',
	        animation: false
	    },
	    title: {
	        text: 'KPPM Manpower Total',
	        color: '#000000'
	    },
	    xAxis: {
	        categories: ["Total"]	    
	    },
	    yAxis: {
	        min: 0,
	        title: {
	            text: 'Manpower'
	        }	    
	    },
	    legend: {
	        align: 'right',
	        x: -30,
	        verticalAlign: 'top',
	        y: 25,
	        floating: true,
	        backgroundColor: (Highcharts.theme && Highcharts.theme.background2) || 'white',
	        borderColor: '#CCC',
	        borderWidth: 1,
	        shadow: false
	    },
	    plotOptions: {
	        column: {
	        	grouping: false,
	            dataLabels: {
	                enabled: true,
	                formatter: function(){
	                	if(this.y > 0) { return this.y; }
	                },
	                color: (Highcharts.theme && Highcharts.theme.dataLabelsColor) || 'black'
	            }
	        },
	        series: {
	        	pointWidth: 20
	        }
	    },
	    series: [{
	    	type: 'column',
	    	name: 'Total',
	        stacking: null,
	        pointWidth: 30,
	        pointPadding: 1,
	        data: [totalpositions],
	        tooltip: {
        		headerFormat: '<b>{point.x}</b><br/>',
        		pointFormat: '{series.name}: {point.y}'
    		}
	    },
	    {
	        name: 'Staffed',
	        stacking: 'normal',
	        color: '#0033cc',
	        dataLabels: {
	        	color: '#ffffff'
	        },
	        data: [totalstaffed]
	    }]
	});
	
	$("#totalchart_loading").hide();
}

SP.SOD.notifyScriptLoadedAndExecuteWaitingJobs('CEWP_KM_TotalChart.js');