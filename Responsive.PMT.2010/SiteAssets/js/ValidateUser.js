/* Validate that the user is authorized to be here */
var _thisUser = {};
function ValidateUser(){
	try{
		var siteCollection = $().SPHelper.GetSiteURL();
		var _spLists = [];
			_spLists.push({name: "PMT_Users", purpose: "Users"});
		var _group = {
			Contributors: "PMTUsers",
			Admins: "PMTAdmins"
		}
		var _UsersMapping = {
			ows_ID: { mappedName: "ID", objectType: "Text" },				
			ows_Title: { mappedName: "Name", objectType: "Text" },
			ows_Role: { mappedName: "Role", objectType: "Text" },			
			ows_Email: { mappedName: "Email", objectType: "Text" },			
			ows_SharePointAcct: { mappedName: "SPAcct", objectType: "Text" },
			ows_AKOUser: { mappedName: "AKOUser", objectType: "Text" },
			ows_AKOEmail: { mappedName: "AKOEmail", objectType: "Text" },
			ows_Active: { mappedName: "Active", objectType: "Text" },	
			ows_Admin: { mappedName: "Admin", objectType: "Text" },
			ows_Organization: { mappedName: "Org", objectType: "Text" },
			ows_Organization_x003a_ID: { mappedName: "OrgID", objectType: "Text" }
		};
		var _Fields = "<ViewFields><FieldRef Name='ID'/><FieldRef Name='Title'/><FieldRef Name='Role'/><FieldRef Name='Email'/><FieldRef Name='SharePointAcct'/><FieldRef Name='AKOUser'/><FieldRef Name='AKOEmail'/><FieldRef Name='Active'/><FieldRef Name='Admin'/><FieldRef Name='Organization'/><FieldRef Name='Organization_x003a_ID'/></ViewFields>";

		if(/PMT/.test(siteCollection)){
			siteCollection = siteCollection.replace("/sites/PMT","");
		}
		
		//Validate User exists and authorized to view the site.
		var thisUser = $().SPGroupsPeople.init({
			listMapping: _UsersMapping,
			listFields: _Fields,
			spLists : _spLists,
			prefix : "PMT",
			DEBUG : true
		});
		
		if((typeof thisUser === 'undefined')||(thisUser == null)){
			//Redirect the page due to unauthorized access
			window.location.replace(siteCollection);
		}else{
			if(!thisUser.active){
			if(!thisUser.admin){
			if(!thisUser.siteAdmin){
				//Redirect the page due to unauthorized access
				window.location.replace(siteCollection);
			}}}
		}
		
		_thisUser = $.extend({}, thisUser);
	}catch(e){
		$().SPHelper.debug("Validate User Failed. Exception: " + e,3);
	}
}
SP.SOD.executeOrDelayUntilScriptLoaded(ValidateUser, "init.js");