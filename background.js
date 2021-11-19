
var APP_PAGE="https://www.applient.ninja:3000/";
var search_list = [ 
  RegExp('^https://www.google.com/search.*htivrt=jobs.*$'),
  RegExp('^https://www.linkedin.com/jobs/.*$'),
  RegExp('^https://www.indeed.com/.*$')
]

function fill(info, tab, file_name,frames=true) {
  chrome.scripting.executeScript({target: {tabId: tab.id, allFrames: frames}, files: ["jquery-3.1.1.min.js"], }, function () {
      chrome.scripting.executeScript({target: {tabId: tab.id, allFrames: frames}, files: [file_name], }, function () {
      });
  });
}

var is_new_page = function() {


}
var is_search = function(url) {
  for(var i = 0; i < search_list.length; i++) {
    if(url.match(search_list[i])){
      return true;
    }
  }
  return false;
}
chrome.action.onClicked.addListener(
  function(tab) {


      if(is_search(tab.url)) {
        fill(null, tab, "./Search/js/searchInject.js",true);
      } else {
        fill(null, tab, "run.js",true);
      }
    chrome.storage.sync.get(["time_active"], function (result) {
      var time_active = new Date(JSON.parse(result['time_active']));
      var time_now = new Date();
      console.log(time_now-time_active);
      if((time_now - time_active)/1000 > 100000){
        chrome.tabs.create({ url: APP_PAGE });
        return true;
      }
    });
      
  }
);

chrome.runtime.onMessage.addListener(function(message, sender, senderResponse){
  if(message.msg === "get-values"){
      var url = "http://ec2-3-136-166-252.us-east-2.compute.amazonaws.com:4000/?identifier=";
      url = url + "123456";
      fetch(url, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'omit', // include, *same-origin, omit
        headers: {
          'Content-Type': 'text/plain'
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        // redirect: 'follow', // manual, *follow, error
        // referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify(message.data) // body data type must match "Content-Type" header
      }).then((response)=>{response.json().then((data)=>{senderResponse(data);});}).catch(error => console.log("erroring", error));
      return true;  // Will respond asynchronously.
  }
});
