var web, ctx, ucacol, uca, enumerator;
var html = '';

function UserCustomActions(site) {
	console.log("From UCA Code Site = " + site);
	ctx = SP.ClientContext.get_current();
	ucacol = ctx.get_web().get_userCustomActions();
    ctx.load(ucacol);
    ctx.executeQueryAsync(GetActionsSucceeded, GetActionsFailed);
    
    $("#btnInstall").click(function () {
    	console.log("Button Install Clicked");
        var ctx = SP.ClientContext.get_current();
        var uca;
        uca = ctx.get_web().get_userCustomActions();
        ctx.load(uca);
        url = "ocko.meeting.overrides.scriptlink.js";
        sequence = 1010;
        var action = uca.add();
        action.set_location("ScriptLink");
        action.set_title(url);
        action.set_scriptSrc("~site/SiteAssets/js/" + url);
        action.set_sequence(sequence);
        action.update();
        ctx.load(action);
        ctx.executeQueryAsync(InstallActionSucceeded, InstallActionFailed);
    });

    $("#btnRemove").click(function () {
    	console.log("Button Remove Clicked");
		enumerator = ucacol.getEnumerator();
		while (enumerator.moveNext()) {
			var current = enumerator.get_current();
			console.log(current.get_title() + ", " + $("#ddInstalled option:selected").text());
			if (current.get_title() == $("#ddInstalled option:selected").text()){
				current.deleteObject();
				ctx.load(current);
				ctx.executeQueryAsync(DeleteActionSucceeded, DeleteActionFailed);
			}
		}
    });
}

function GetActionsSucceeded() {
	enumerator = ucacol.getEnumerator();
	while (enumerator.moveNext()) {
		var current = enumerator.get_current();
		html += '<option value="' + current.get_title() + '">' + current.get_title() + '</option>';
	}
	$("#ddInstalled").html("").append(html);
}

function GetActionsFailed(sender, args) {
    alert("GetActionsFailed: " + args.get_message());
}

function InstallActionSucceeded() {
	alert("Action Added!");
    window.location = window.location; // refresh page
}

function InstallActionFailed(sender, args) {
    alert("InstallActionFailed: " + args.get_message());
}

function DeleteActionSucceeded() {
	alert("Action Delete!");
    window.location = window.location; // refresh page
}

function DeleteActionFailed(sender, args) {
    alert("DeleteActionFailed: " + args.get_message());
}

SP.SOD.notifyScriptLoadedAndExecuteWaitingJobs("CEWP_UserCustomActions.js");