var previous_url = ""
function lets_run_it() {
console.log("in lets_run_it")
var current_url = window.location.href;
var url = "https://www.youtube.com/oembed?url="+current_url+"&format=json";
if (previous_url != current_url) {
var xmlhttp = new XMLHttpRequest();
   xmlhttp.open("GET", url,true);
   xmlhttp.onreadystatechange=function() {
     if (xmlhttp.readyState==4) {
      data=(xmlhttp.responseText);
      data = JSON.parse(data);
      show_notification(data);      
      }
     }

   xmlhttp.send();
   previous_url = current_url;
  }
}

setInterval(lets_run_it,1000);
chrome.extension.sendRequest({ action: "WhatYouWant"});

function show_notification(data) {
console.log(data);
console.log(data.title);
//chrome.tabs.getCurrent(function(tab){console.log("abcd"+tab)});
chrome.runtime.sendMessage({title: data.title}, function(a){console.log(a.res)})
}

