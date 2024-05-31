 const pageAndRequestMapArray = [
{
	pageUrl:"http.*?:\\\/\\\/sellercentral.*?\\.amazon\\.com\\\/", 
	requestUrl: [
		"\\\/orders-api\\\/search\\?limit"
	],
	handler: function (data, doc, win){
		console.log(data, doc);
		alert(JSON.stringify(data));
	}
},
{
	//pageUrl:"http.*?:\\\/\\\/*\\.baidu\\.com\\\/*", 
	pageUrl:"http.*?://.*baidu.com/*", 
	requestUrl: [
		//"https://.*baidu.com/*"
		".*/starmap/api/.*"
	],
	handler: function (data, doc, win){
		// console.log(data, doc,1688);
		//console.log(data);
		console.log('adxdocname=',adxdocname, '@@@url=',data.requestUrl,',response=',data.data);
		//alert(JSON.stringify(data));
		//console.log('window.docname=',window.docname);
		showWeakPrompt('抓到body');
		if(isenable){
			httpRequest('https://api.mints-tech.cn/camera-api/common/health?a=docname','aa');
		}
		
		
		//tips(data.data);
	}
},
{
	//pageUrl:"http.*?:\\\/\\\/*\\.baidu\\.com\\\/*", 
	pageUrl:"http.*?://.*dzmyy.com.cn/*", 
	requestUrl: [
		"http.*?://.*dzmyy.com.cn/*"
	],
	handler: function (data, doc, win){
		// console.log(data, doc,1688);
		//console.log(data);
		console.log('url=',data.requestUrl,',response=',data.data);
		//alert(JSON.stringify(data));
		tips(data.data);
	}
}
];

//构造请求，发给OA
function httpRequest(url,data, callback){
	console.log('get start');
    var xhr = new XMLHttpRequest();
    xhr.open('get',url);
    xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
    //chrome.storage.local.set({"log":"发送数据给OA，OA处理中"});
    xhr.send(data);
	console.log('get end');
}

function showWeakPrompt(message) {
  //console.log('showWeakPrompt', document);

  const weakPrompt = document.createElement('div');
  weakPrompt.id = 'hackxboy';
  weakPrompt.textContent = message;
  weakPrompt.style.position = 'fixed';
  weakPrompt.style.top = '10%';
  weakPrompt.style.left = '50%';
  weakPrompt.style.transform = 'translate(-50%, -50%)';
  weakPrompt.style.backgroundColor = 'rgba(0, 0.5, 0, 0.8)';
  weakPrompt.style.color = 'white';
  weakPrompt.style.padding = '10px';
  weakPrompt.style.borderRadius = '5px';
  weakPrompt.style.zIndex = 100;

  document.body.appendChild(weakPrompt);

  setTimeout(() => {
    document.body.removeChild(weakPrompt);
  }, 3000);
  

}



//export let docname="";
// let casdocname="";
// let casenable=false;
// let adxdocname="";
// let adxenable=false;

function loadcfg2(){
	console.log('-----');
	chrome.storage.local.get("casenable", function(obj) {

		casenable = obj.casenable;
		if(casenable){
			console.log("cas插件已经准备开启 casenable=",casenable);
		}else{
			console.log("cas插件未开启");
		}
	});
	chrome.storage.local.get("casdocname", function(obj) {
		casdocname=obj.casdocname
		console.log('cnt casdocname:',casdocname);
	});

	
	chrome.storage.local.get("adxenable", function(obj) {
	
		adxenable = obj.adxenable;
		if(adxenable){
			console.log("adx插件已经准备开启");
		}else{
			console.log("adx插件未开启");
		}
	});
	chrome.storage.local.get("adxdocname", function(obj) {
		adxdocname=obj.adxdocname
		console.log('cnt adxdocname:',adxdocname);
	});
}
loadcfg2();

chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
	console.log('rcv msg',message);
  if (message.action === 'propt') {
    // 在这里做些事情，然后发送响应
	showWeakPrompt(message.msg);
    sendResponse('已提示');
  }
  if(message.action === 'save'){
	  loadcfg2();
	  sendResponse('已更新');
  }
});

chrome.runtime.onConnect.addListener(function(port) {
  var tab = port.sender.tab;
 console.log('receive msg onConnect');

  // This will get called by the content script we execute in
  // the tab as a result of the user pressing the browser action.
  port.onMessage.addListener(function(info) {
	  console.log('receive msg');
    var max_length = 1024;
    // if (info.selection.length > max_length)
    //   info.selection = info.selection.substring(0, max_length);
    
  });
});

