var data_loader = function(name,handler) {
  window.addEventListener('message',(event) => {
    if(event.data.from && event.data.from == "extension" && event.data.type=="load" && event.data.dict_name==name) {
      console.log(event.data.data);
      console.log('reached here')
      handler(event.data.data);
    }
  },false);
  window.postMessage({
    "type":"load",
    "from":"web",
    "dict_name":name
  });
}

var data_saver = function(data,name,handler) {
	window.postMessage({
	    "type":"save",
	    "from":"web",
	    "data":data,
	    "dict_name":name
	});

}