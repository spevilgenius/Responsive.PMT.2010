/**
 *  @file HCHelper
 *  @description HCHelper specific capabilities
 *  @author Christopher J Stoll [christopher.j.stoll.ctr@mail.mil]
 *  @version 2016.01
 */
/**
 *  @external HighCharts
 *  @description Required
 */

/* jshint undef: true */
/* global L_Menu_BaseUrl, _spUserId, _spPageContextInfo */
/**
 * @name HCHelper
 * @namespace HCHelper
 */
(function(HCHelper,$,undefined){

	"use strict";
	
	/** Local [PRIVATE] Variables */
	/**
	  *	@var {string}
	  * @global
	  */
	var VERSION = "2016.01"; // TODO: Update version

	var fontStyle = { fontSize: '10px', fontFamily: 'Arial, sans-serif' };
	var bgColor = 'rgba(0,0,0,0)';
	var color = 'rgba(255,255,255,255)';
	
	var palette = {};
		palette["Competency"] = {};
		palette["Competency"]["DCM"] = { name: 'NavajoWhite' , rgba: 'rgba(255,222,173,255)' , hex: '#FFDEAD'};
		palette["Competency"]["GOV"] = { name: 'DarkBlue' , rgba: 'rgba(0,0,139,255)' , hex: '#00008B'};
		palette["Competency"]["PM&A"] = { name: 'LightBlue' , rgba: 'rgba(173,216,230,255)' , hex: '#ADD8E6'};
		palette["Competency"]["BIT"] = { name: 'Gold' , rgba: 'rgba(255,215,0,255)' , hex: '#FFD700'};
		palette["Competency"]["PfM"] = { name: 'Coral' , rgba: 'rgba(255,127,80,255)' , hex: '#FF7F50'};
		palette["Competency"]["TE/PD"] = { name: 'Yellow' , rgba: 'rgba(255,255,0,255)' , hex: '#FFFF00'};
		palette["Competency"]["CPI"] = { name: 'Violet' , rgba: 'rgba(238,130,238,255)' , hex: '#EE82EE'};
		palette["Competency"]["KM"] = { name: 'YellowGreen' , rgba: 'rgba(154,205,50,255)' , hex: '#9ACD32'};
	
    var settings = {};
        settings.chart = {
			backgroundColor: bgColor, //'#fff',//#f6f6f6
			borderColor: '#000',//#bdbdbd
			borderWidth: 0,
			// Edit chart spacing
			spacingBottom: 1,
			spacingTop: 1,
			spacingLeft: 1,
			spacingRight: 1,
			// Explicitly tell the width and height of a chart
			width: null,
			height: null,
			// Font
			style: fontStyle
	    };
        settings.title = { text: null }
        settings.xAxis = {};
        settings.yAxis = { min: 0, title: { text: null }, labels: { enabled: false } };
        settings.legend = { enabled: false };
        settings.credits = { enabled: false };
        settings.tooltip = { enabled: false };
        settings.series = [];
        settings.plotOptions = {};
        settings.exporting = {
            buttons: {
                contextButton: {
                    enabled: true
                },
                yearButton: {
                    text: 'Y',
                    onclick: function () {
                        this.userOptions.chartRefresh('Y');
                    }
                },
                quarterButton: {
                    text: 'Q',
                    onclick: function () {
                        this.userOptions.chartRefresh('Q');
                    }
                },
                monthButton: {
                    text: 'M',
                    onclick: function () {
                        this.userOptions.chartRefresh('M');
                    }
                },
                weekButton: {
                    text: 'W',
                    onclick: function () {
                        this.userOptions.chartRefresh('W');
                    }
                }
            }
        };
        settings.chartRefresh = function(param){
        	$().SPHelper.debug("This should be overriden");
        };

	var pointFormat = {};
		pointFormat["y"] = '{point.y}';
		pointFormat["0f"] = '{point.percentage:.0f}%';
		pointFormat["1f"] = '{point.percentage:.1f}%';
		pointFormat["2f"] = '{point.percentage:.2f}%';
		pointFormat["ny"] = '{point.name} - {point.y}';
		pointFormat["n0f"] = '{point.name} - {point.y:.0f}%';
		pointFormat["n1f"] = '{point.name} - {point.y:.1f}%';
		pointFormat["n2f"] = '{point.name} - {point.y:.2f}%';
        
    var dataLabels = {};
    	dataLabels["series"] = { enabled: true, format: pointFormat["2f"] };
    	dataLabels["bar"] = { enabled: true, format: pointFormat["n1f"], overflow: 'justify', align: 'left', x: 0, y:-15, inside: true, style: fontStyle };
    	dataLabels["pie"] = { enabled: true, format: pointFormat["0f"] };
    	dataLabels["funnel"] = { enabled: true, format: '<b>{point.name}</b><br>('+pointFormat["0f"]+')', color:'black', distance: 15, connectorWidth: 1, softConnector: false };
	
	
	var plotOptions = {};
        plotOptions["series"] = { borderWidth: 0, dataLabels: dataLabels["series"] };
        plotOptions["bar"] = { dataLabels: dataLabels["bar"] };
        plotOptions["pie"] = { allowPointSelect: true, cursor: 'pointer', dataLabels : dataLabels["pie"],	showInLegend: true };
        plotOptions["spline"] = { tooltip: { borderWidth: 0, shadow: true, useHTML: true, pointFormat: '<b>'+pointFormat["0f"]+'</b>', style: { padding: '0px' } } };
        plotOptions["column"] = { pointPadding: 0.5, pointPlacement: 0.0, pointWidth: 25, borderWidth: 0, groupPadding: 0, shadow: true };
        plotOptions["funnel"] = { dataLabels: dataLabels["funnel"], neckWidth: '40%', neckHeight: '35%', width: '70%' };
        
	var legendOptions = { 
	    	enabled: true,
	        style: {
	            fontWeight: 'bold',
	            color: 'black',
	            textShadow: '0px 1px 2px black'
	        }
	    };

	/** Utility Functions **/

	/**
	 * @method
	 * @name HCHelper#init
	 * @param {Object} options
	 * @see settings
	 * @description 
	 * @example 
	 * HCHelper.init({});
	 */
	HCHelper.init = function(options) {
		var defer = $.Deferred();
		
		try{
		    // Extend settings with user supplied options and call the merged obj 'settings'
		    settings = $.extend({}, settings, options);
		    defer.resolve();
		}catch(e){
			$.fn.SPHelper.debug(e,3);
			defer.reject();
		}

		return defer.promise();

	}; // End HCHelper.init
	
	
//Begin - Chart Functions
	HCHelper.makeBar = function(pageContainer,seriesData,seriesName){
		var barSeries = [];
		
		if(seriesData.length > 0){
			barSeries = seriesData;
		}else{
			barSeries.push({ name: seriesName,
               colorByPoint: true,
               data: seriesData
            });
		}
		
		var chartOptions = {
		    chart: {
		    	renderTo: pageContainer,
		        type: 'column'
		    },
            xAxis: { type: 'category' },
            plotOptions: { series: plotOptions["series"] },
            series: barSeries
		};
		
		chartOptions = $.extend({}, chartOptions, settings);
		
		try{
			var chartBar = new Highcharts.Chart(chartOptions);
			chartBar.redraw();
		}catch(e){
			$().SPHelper.debug("HighCharts ERR",3);
			$().SPHelper.debug(e,3);
		}
	}
	
	HCHelper.makeVerticalBar = function(passed){
	
		var options = {
			pageContainer: null,
			widget: null,
			chartRefresh: null,
			seriesData: null,
			seriesName: null,
			xAxis: null,
			yAxis: null,
			disableExport: false,
			showTitle: false,
			paletteChoice: null,
			labelsEnabled: true,
			legendEnabled: true,
			legend: null,
			hasLink: false,
			hasShorty: false,
			tooltipOpts: { pointFormat: '<b>'+pointFormat["0f"]+'</b>' },
			pointFormat: '<b>'+pointFormat["y"]+'</b>',
			colorTheme: []
		}
		
		options = $.extend({},options,passed);
		
		var dataLabels_Opts = $.extend({},dataLabels["pie"]);
		dataLabels_Opts.enabled = options.labelsEnabled;
		dataLabels_Opts.distance = 5;
		dataLabels_Opts.shadow = false;		

		var legend_Opts = $.extend({},legendOptions);
		legend_Opts.enabled = options.legendEnabled;
		
		if(options.hasShorty){
			legend_Opts.labelFormat = '{shorty}';
	    }else{
		    if(options.labelsEnabled && !(options.legendEnabled)){
		        dataLabels_Opts.format = '{point.name} - {point.percentage:.1f}%';
		    }
	    }

		var chartOptions = $.extend({}, settings);
		chartOptions.exporting.buttons.contextButton.enabled = !(options.disableExport);

		chartOptions.chart.renderTo = options.pageContainer;
		chartOptions.chart.type = 'bar';

		chartOptions.widget = options.widget;
		if(typeof options.chartRefresh == 'function'){
			chartOptions.chartRefresh = options.chartRefresh;
		}
		if(options.showTitle){
			chartOptions.title.text = options.seriesName;
		}

		chartOptions.tooltip = options.tooltipOpts;
		chartOptions.legend = legend_Opts;
		
		chartOptions.plotOptions.bar = plotOptions["bar"];
		chartOptions.plotOptions.bar.dataLabels.enabled = options.labelsEnabled;

		if(options.xAxis){
			chartOptions.xAxis = { type: 'category',
								   categories: options.xAxis,
								   title: {text: null},
								   labels: { enabled: true } 
								 };
		}
		
		if(options.yAxis){
			chartOptions.yAxis = options.yAxis;
		}
		if(options.legend){
			chartOptions.legend = options.legend;
		}
		
		if(options.hasLink){
			chartOptions.plotOptions.pie.point = {
				events: {
					click: function () {
						//Something goes here for the click
					}
				}
			}
		}
		
		if(options.seriesData.length > 0){
			chartOptions.series = options.seriesData;
			if(options.paletteChoice){
				if(!(typeof palette[options.paletteChoice] === 'undefined')){
				if(options.hasShorty){
					$.each(options.seriesData[0].data,function(idx,el){
						options.colorTheme.push(palette[options.paletteChoice][el.shorty].hex);
					});		
				}else{
					$.each(options.seriesData[0].data,function(idx,el){
						options.colorTheme.push(palette[options.paletteChoice][el.name].hex);
					});		
				}
				}
			}
		}else{
			chartOptions.series = [{
	            name: options.seriesName,
	            colorByPoint: true,
	            data: options.seriesData
	        }];
			if(options.paletteChoice){
				if(!(typeof palette[options.paletteChoice] === 'undefined')){
				if(options.hasShorty){
					$.each(options.seriesData,function(idx,el){
						options.colorTheme.push(palette[options.paletteChoice][el.shorty].hex);
					});		
				}else{
					$.each(options.seriesData,function(idx,el){
						options.colorTheme.push(palette[options.paletteChoice][el.name].hex);
					});		
				}
				}
			}
		}
		
		if(options.colorTheme.length > 0){
			chartOptions.colors = $.extend([],options.colorTheme);
		}


		try{
			var chartVertBar = new Highcharts.Chart(chartOptions);
			chartVertBar.redraw();
		}catch(e){
			$().SPHelper.debug("HighCharts ERR",3);
			$().SPHelper.debug(e,3);
		}
	}
	
	HCHelper.makeBar4OrgStats = function(pageContainer,seriesData,seriesName,graphOptions){
		var plotOptions = {
			bar: {
				stacking: 'normal',
				dataLabels: {
					enabled: true,
	                format: graphOptions.labelFormat,
	                overflow: 'justify',
					align: 'right',
			        x: 0,
			        y: 15,
			        style: {
			            fontSize: '11px',
			            fontFamily: 'sans-serif'
			        }
				}
			}
		};
		var chartOptions = {
		    chart: {
		    	renderTo: pageContainer,
		        type: 'bar'
		    },
            xAxis: {
                type: 'category',
                categories: ['Staffing'],
                labels: { enabled: false }
            },
            yAxis: {
				title: { text: '' },
                labels: graphOptions.labels,
                max: graphOptions.maxValue,
                tickInterval: graphOptions.tickInterval,
                showFirstLabel: graphOptions.showFirstLabel                
            },
            plotOptions: { series: plotOptions },
            series: graphOptions.series
		};
		
		chartOptions = $.extend({}, chartOptions, settings);
		
		try{
			var chartBar = new Highcharts.Chart(chartOptions);
			chartBar.redraw();
		}catch(e){
			$().SPHelper.debug("HighCharts ERR",3);
			$().SPHelper.debug(e,3);
		}
	}

	HCHelper.makePie = function(passed){
	
		var options = {
			pageContainer: null,
			widget: null,
			chartRefresh: null,
			seriesData: null,
			seriesName: null,
			showTitle: false,
			disableExport: false,
			paletteChoice: null,
			labelsEnabled: true,
			legendEnabled: true,
			hasLink: false,
			hasShorty: false,
			tooltipOpts: { pointFormat: '<b>'+pointFormat["0f"]+'</b>' },
			pointFormat: '<b>'+pointFormat["y"]+'</b>',
			colorTheme: []
		}
		
		options = $.extend({},options,passed);
		
		if(options.paletteChoice){
			if(!(typeof palette[options.paletteChoice] === 'undefined')){
			if(options.hasShorty){
				$.each(options.seriesData,function(idx,el){
					options.colorTheme.push(palette[options.paletteChoice][el.shorty].hex);
				});		
			}else{
				$.each(options.seriesData,function(idx,el){
					options.colorTheme.push(palette[options.paletteChoice][el.name].hex);
				});		
			}
			}
		}
		
		var dataLabels_Opts = $.extend({},dataLabels["pie"]);
		dataLabels_Opts.enabled = options.labelsEnabled;
		dataLabels_Opts.distance = 5;
		dataLabels_Opts.shadow = false;		

		var legend_Opts = $.extend({},legendOptions);
		legend_Opts.enabled = options.legendEnabled;
		
		if(options.hasShorty){
			legend_Opts.labelFormat = '{shorty}';
	    }else{
		    if(options.labelsEnabled && !(options.legendEnabled)){
		        dataLabels_Opts.format = '{point.percentage:.1f}%';
		    }
	    }
		
		var chartOptions = $.extend({}, settings);
		chartOptions.exporting.buttons.contextButton.enabled = !(options.disableExport);

		chartOptions.chart.renderTo = options.pageContainer;
		
		chartOptions.widget = options.widget;
		if(typeof options.chartRefresh == 'function'){
			chartOptions.chartRefresh = options.chartRefresh;
		}
		chartOptions.chart.type = 'pie';
		if(options.showTitle){
			chartOptions.title.text = options.seriesName;
		}
		chartOptions.tooltip = options.tooltipOpts;
		chartOptions.legend = legend_Opts;
		chartOptions.plotOptions.pie = plotOptions["pie"];
		chartOptions.plotOptions.pie.dataLabels = dataLabels_Opts;
		chartOptions.yAxis.labels.enabled = options.labelsEnabled;
		
		if(options.colorTheme.length > 0){
			chartOptions.colors = $.extend([],options.colorTheme);
		}
		
		if(options.hasLink){
			chartOptions.plotOptions.pie.point = {
				events: {
					click: function () {
						//Something goes here for the click
					}
				}
			}
		}

		chartOptions.series = [{
            name: options.seriesName,
            colorByPoint: true,
            data: options.seriesData
        }];

		
		try{
			var chartPie = new Highcharts.Chart(chartOptions);
			chartPie.redraw();
		}catch(e){
			$().SPHelper.debug("HighCharts ERR",3);
			$().SPHelper.debug(e,3);
		}

	}
/*
	HCHelper.makeSpline_WTop = function(pageContainer,seriesData,seriesName,xCategories,xCategoriesTop){
	try{
		var chartSpline = new Highcharts.Chart({
			chart: {
		    	renderTo: pageContainer,
		        type: 'spline',
				backgroundColor: 'rgba(0,0,0,0)', //'#fff',//#f6f6f6
				borderColor: '#000',//#bdbdbd
				borderWidth: 0
		    },
		    title: {
		        text: ''
		    },
			credits:{
		        enabled: false
		    },
		 	xAxis: [{
		    	categories: xCategories,
		    	type: 'datetime',
		    	startOnTick: false,
		    	endOnTick: false,
		        labels: {
		        	enabled: true,
		            format: '{value:%m-%d}',
		            rotation: 0,
		        	align: 'right'
		        },		        
		        offset: -1,
		        startOfWeek: 0,
		        tickLength: 10
        	},{
            	categories: xCategoriesTop,
		    	startOnTick: false,
		    	endOnTick: false,
		    	 labels: {
		        	overflow: 'justify',
		            format: '{value:.0f} Hrs'
	    		},
		        offset: -1,
		        startOfWeek: 0,
		        tickLength: 10,
		        opposite:true
        	}],
        	 yAxis: {
		    	gridLineDashStyle: 'longdash',
		    	endOnTick: true,
		        title: {
		            text: null,
		            align: 'high'
		        },
		        labels: {
		        	overflow: 'justify',
		            format: '{value:.0f}%'
	    		},
	    		min: 20,
	    		max: 100
		    },
		    legend: {
		        enabled: true,
		        align: 'right',
		        verticalAlign: 'top',
		        x: 0,
		        y: 20
		    },
			tooltip: {
			    headerFormat: '<b>{series.name}</b><br>',
			    pointFormat: '{(point.y*100):.0f}%'
			},
			plotOptions: {				    	
				series: {
		            dataLabels: {
		            	align: 'left',
		                enabled: true,
		                format: '{point.y:.0f}%'
		            },
					tooltip: {
			            borderWidth: 0,
			            shadow: true,
			            useHTML: true,
						pointFormat: '<b>Time: {point.y:.0f}%</b>',
			            style: {
			                padding: '0px'
			            }
		            }
		        },
		        spline: {
					tooltip: {
			            borderWidth: 0,
			            shadow: true,
			            useHTML: true,
						pointFormat: '<b> {point.y:.0f}%</b>',
			            style: {
			                padding: '0px'
			            }
		            }
		        },
		        column: {
				    pointPadding: 0.5,
				    pointPlacement: 0.0,
				    pointWidth: 25,
				    borderWidth: 0,
				    groupPadding: 0,
				    shadow: true
				}
		    },
		    series: seriesData
		    }, function(chart) {
	        	var extremes = chart.xAxis[0].getExtremes();
	        	chart.xAxis[1].setExtremes(extremes.min-0.5,extremes.max+0.5);
        });
		chartSpline.redraw();
		consoleTime("End Spline - ");
	}catch(e){
		$().SPHelper.debug("HighCharts ERR",3);
		$().SPHelper.debug(e,3);
	}
}
	HCHelper.makeFunnel = function(pageContainer,seriesData,seriesName,xCategories,xCategoriesTop,maxWidth){
	try{
		var chartFunnel = new Highcharts.Chart({
			chart: {
		    	renderTo: pageContainer,
		        type: 'funnel',
				backgroundColor: 'rgba(0,0,0,0)', //'#fff',//#f6f6f6
				borderColor: '#000',//#bdbdbd
				borderWidth: 0
		    },
		    title: {
		        text: ''
		    },
	        plotOptions: {
	            funnel: {
	                dataLabels: {
	                    enabled: true,
	                    format: '<b>{point.name}</b><br>({point.y:,.0f})',
	                    color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black',
	                    distance: 15,
	                    connectorWidth: 1,
	                    softConnector: false
	                },
	                neckWidth: '40%',
	                neckHeight: '35%',
	                width: '70%'
	            }
	        },
			credits:{
		        enabled: false
		    },
		    legend: {
		        enabled: false,
		        align: 'left',
		        verticalAlign: 'top',
		        x: 0,
		        y: 20
		    },
			tooltip: {
			    headerFormat: '',
			    pointFormat: '<b>{point.name}</b>: {point.y:,.0f}'
			},
	        series: [{
	        	name: seriesName,
	        	data: seriesData
	        }]
	    });
		chartFunnel.redraw();
		consoleTime("End Funnel - ");
	}catch(e){
		$().SPHelper.debug("HighCharts ERR",3);
		$().SPHelper.debug(e,3);
	}
}
*/
//End - Chart Functions
	

}( window.HCHelper = window.HCHelper || {}, jQuery ));

