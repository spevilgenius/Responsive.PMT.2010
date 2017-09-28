$(document).ready(function(){

	var CATSTitle = $('#CATSTitle').html();
	var CATSLink = $('#CATSLink').html();
	
	var CATSSuspense = $('#CATSSuspense').html();
	var OCKOSuspense = $('#OCKOSuspense').html();

	$('#CATSTitle').html("<a href='"+ CATSLink +"' target='_blank'>" + CATSTitle + "</a>");
	$('#CATSSuspense').html(CATSSuspense.split("T")[0] );
	$('#OCKOSuspense').html(OCKOSuspense.split("T")[0] );

}); //End Doc Ready

		
//Little debug function for writing messages to the browser's (IE) console
function debug(str){
	if(window.console){
		console.log(str);
	}
}