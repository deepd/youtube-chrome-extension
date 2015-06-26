var tabid = "";
var globalopt = "";

chrome.runtime.onMessage.addListener(function(a, sender, sendResponse) {
	console.log("sada");
	console.log(a);
 var opt = {
        type: "basic",
        title: "Video Title:",
        message: a["title"],
	iconUrl: ""
      }	;
      globalopt = opt;
      chrome.notifications.create("yt-notify",opt,function(id){console.log(id);});
      chrome.notifications.onClicked.addListener(function(id) {chrome.tabs.update(tabid, {selected: true});})
      //chrome.tabs.getSelected(function(tab){tabid=tab.id; console.log("abcd"+tab.id)});
      sendResponse({"res": "done from background side"});
});


chrome.extension.onRequest.addListener(function(request, sender, sendResponse) 
{   

    if(request.action)
    {

        // Make what you want
//    chrome.tabs.getSelected(function(tab){tabid=tab.id; console.log("tabid:"+tab.id)});
      tabid = sender.tab.id;
      console.log("tabid:"+tabid);
    }
});

chrome.commands.onCommand.addListener(function(command) {
        console.log('Command:', command);
        chrome.notifications.create("yt-notify",globalopt,function(id){console.log(id);});
        chrome.notifications.onClicked.addListener(function(id) {chrome.tabs.update(tabid, {selected: true});})
      });
