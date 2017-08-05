var OCKO = OCKO || {};

var ctx, web, list, user;
var isEditForm = false;

OCKO.OVERRIDES = function() {

    function initialize() {
        var test = window.location;
        logit("window.location = " + test);
    }
    
    return {
        initialize: initialize
    }
}

SP.SOD.notifyScriptLoadedAndExecuteWaitingJobs("ocko.meeting.overrides.js");