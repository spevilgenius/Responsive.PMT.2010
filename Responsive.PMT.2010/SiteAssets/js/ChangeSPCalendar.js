<style>

.ms-acal-apanel-item span {
     display:none;
}
 .ms-listMenu-editLink {
display: none;
}
    table.ms-acal-month > tbody > tr > th:nth-of-type(1) {  
        display: none !important;  
    }       
    table.ms-acal-month > tbody > tr > th:nth-of-type(8) {  
        background-color: #ccc;  
    }       
    table.ms-acal-month > tbody > tr > th:nth-of-type(2) {  
     background-color: #ccc;  
    }        
    table.ms-acal-month > tbody > tr > td:nth-of-type(7) {  
     background-color: #ccc;  
    }        
    table.ms-acal-month > tbody > tr > td:nth-of-type(1) {  
     background-color: #ccc;  
    }  
.ms-core-deltaSuiteLinks {display: none;}
ms-core-deltaSuiteLinks {display: none;}
.ms-cui-topBar1 {display: none;}
#suiteBarLeft {background-color:#303235;}
#suiteBarLeft {color:#fec325;}
</style>
<script type="text/javascript">
    // Replace default page title with document.title, which is based on view name
    document.getElementById("DeltaPlaceHolderPageTitleInTitleArea").innerHTML = document.title;  
</script> 
<script type="text/javascript" src="https://army.deps.mil/army/cmds/CASCOM_KAPPS/SrLdrCalendarV2/SiteAssets/js/jquery.min.js"></script>
<script type="text/javascript">
$(".ms-acal-apanel-item").text(document.title.split('-')[1]);

$(".ms-acal-apanel-item").css("color","white");
var shouldcolortext = true;

LoadSodByKey("SP.UI.ApplicationPages.Calendar.js", function () {
window.setTimeout(ColorCalendar, 1000);
});

var SEPARATOR = "|||";

function ColorCalendar() {
var container = jQuery('#s4-bodyContainer');
var query = 'a:contains(\'' + SEPARATOR + '\')';

if(container.find(query).length > 0)
{
container.find(query).each(function (i) {
var box = jQuery(this).parents('div[title]');
var colors = GetColorCodeFromCategory(GetCategory(this.innerHTML));
var anchor = jQuery(this);
anchor.text(GetActualText(anchor.text()))
box.attr("title", GetActualText(box.attr("title")));
box.css('background-color', colors[0]);
if(colors[0] == '#ff6600' | colors[0] == '#759534') {
box.css('border-left', '2px solid #05afea');
box.css('border-right', '2px solid #05afea');
};
box.css('display', 'block');
if(shouldcolortext )
{
box.find('div, a').css("cssText", "color: " + colors[1] + " !important;");
}
});

}
window.setTimeout(ColorCalendar, 2000);
}

function GetActualText(originalText) {
var parts = originalText.split(SEPARATOR);
return parts[0] + parts[2];
}

function GetCategory(originalText) {
var parts = originalText.split(SEPARATOR);
return parts[1];
}

function GetColorCodeFromCategory(category) {
var bgcolor = null;
var fgcolor = null;
switch (category.trim()) {
case 'FLVA':
bgcolor = '#cdd29c';
fgcolor = 'black';
break;
case 'TRAVEL':
bgcolor = '#05afea';
fgcolor = 'black';
break;
case 'Holiday/Pass/Leave':
bgcolor = '#7d8588';
fgcolor = 'white';
break;
case 'TDY(OCONUS)':
bgcolor = '#759534';
fgcolor = 'white';
break;
case 'TDY(CONUS)':
bgcolor = '#ff6600';
fgcolor = 'WHITE';
break;
case 'TRADOC/HWDA/AMC':
bgcolor = '#ff0013';
fgcolor = 'white';
break;
case 'GO/SES/Meeting':
bgcolor = '#00b44d';
fgcolor = 'white';
break;
case 'Sig Events (Local)':
bgcolor = '#732ea3';
fgcolor = 'white';
break;
case 'Social(w/wo Spouse)':
bgcolor = '#212652';
fgcolor = 'white';
break;
case 'FYSA':
bgcolor = '#df9395';
fgcolor = 'black';
break;
case 'Sig Events (TELE/VTC)':
bgcolor = '#f8ff01';
fgcolor = 'black';
break;


}
return [bgcolor, fgcolor];
}
</script>

