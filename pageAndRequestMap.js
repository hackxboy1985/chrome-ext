 let pageAndRequestMapArray = [
{
	pageUrl:"http.*?:\\\/\\\/sellercentral.*?\\.amazon\\.com\\\/", 
	requestUrl: [
		"\\\/orders-api\\\/search\\?limit"
	],
	type:'amazon',
	docname:'',
	enable:false,
	handler: function (data, doc, win){
		console.log(data, doc);
		alert(JSON.stringify(data));
	}
},
{
	pageUrl:"http.*?://.*/creative/material*", 
 	requestUrl: [
		".*/search"
 	],
	type:'cas-',
	docname:'',
	enable:false,
 	handler: function (data, doc, win){
		console.log('enable=',enable,'cas catch ',data.requestUrl);
		showWeakPrompt('nice');
		if(enable){
			httpRequest('https://api.mints-tech.cn/camera-api/common/health?a=docname','aa');
		}
 	}
},
{
	//pageUrl:"http.*?:\\\/\\\/*\\.baidu\\.com\\\/*", 
	pageUrl:"http.*?://.*baidu.com/*", 
	requestUrl: [
		//"https://.*baidu.com/*"
		".*/starmap/api/.*"
	],
	type:'cas',
	docname:'',
	enable:false,
	handler: function (data, doc, pthis){
		//console.log('pthis=',pthis);
		loadcfgwithtype(pthis.type, function(cfg){
			console.log("load cfg:",cfg);
			if(cfg !== null && cfg.enable !== null && cfg.enable !== undefined 
				){
				if(cfg.enable){
					showWeakPrompt('抓到');
					httpRequest('https://api.mints-tech.cn/camera-api/common/health?a=docname','aa');
				}else{
					console.log("not enable");
					//showWeakPrompt('插件未开启');
				}
			}
		});
			// 向background发送消息
			// chrome.runtime.sendMessage({action: 'catch', type: pthis.type, data:data, msg:'cas'}, function(response) {
			//     console.log('pop 收到回复',response);
			// });
			
			// if(obj.enable){
			// 	httpRequest('https://api.mints-tech.cn/camera-api/common/health?a=docname','aa');
			// }
		// });
		
		//console.log('enable',pthis.enable,'docname=',pthis.docname, '@@@url=',data.requestUrl,',response=',data.data);
		//alert(JSON.stringify(data));
		//console.log('window.docname=',window.docname);
		// showWeakPrompt('抓到body');
		// if(enable){
		// 	httpRequest('https://api.mints-tech.cn/camera-api/common/health?a=docname','aa');
		// }
		
		
		//tips(data.data);
	}
},
{
	//pageUrl:"http.*?:\\\/\\\/*\\.baidu\\.com\\\/*", 
	pageUrl:"http.*?://.*dzmyy.com.cn/*", 
	requestUrl: [
		"http.*?://.*dzmyy.com.cn/*"
	],
	type:'dzmyy',
	docname:'',
	enable:false,
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
function loadcfgwithtype(type,cb){
	//console.log('loadcfgwithtype-----',type);
	chrome.storage.local.get(type, function(obj) {
		//console.log(type,' load cfg: ',obj)
		let enable = obj[type].enable;
		let docname = obj[type].docname;
		let entity = pageAndRequestMapArray.filter(item=>{
		  //console.log('currentLocation=',currentLocation,', item.pageUrl=',item.pageUrl);
		  return item.type!==undefined&&item.type===type;
		});
		entity[0].enable = enable;
		entity[0].docname = docname;
		// console.log('load finish: ',entity);
		// console.log('load finish2: ',pageAndRequestMapArray);
		if(cb !== null && cb !== undefined)
			cb(obj[type]);
	});
}

function loadcfg2(){
	
	// console.log('loadcfg2');
	loadcfgwithtype('cas');
	loadcfgwithtype('adx');
	// chrome.storage.local.get("casenable", function(obj) {

	// 	casenable = obj.casenable;
	// 	if(casenable){
	// 		console.log("cas插件已经准备开启 casenable=",casenable);
	// 	}else{
	// 		console.log("cas插件未开启");
	// 	}
	// });
	// chrome.storage.local.get("casdocname", function(obj) {
	// 	casdocname=obj.casdocname
	// 	console.log('cnt casdocname:',casdocname);
	// });

}


// chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
// 	// console.log('rcv msg',message);
//   if (message.action === 'propt') {
//     // 在这里做些事情，然后发送响应
// 	showWeakPrompt(message.msg);
//     sendResponse('已提示');
//   }
//   if(message.action === 'save'){
// 	  loadcfgwithtype(message.type);
// 	  sendResponse('已更新');
//   }
// });

// chrome.runtime.onConnect.addListener(function(port) {
//   var tab = port.sender.tab;
//  console.log('receive msg onConnect');

//   // This will get called by the content script we execute in
//   // the tab as a result of the user pressing the browser action.
//   port.onMessage.addListener(function(info) {
// 	  console.log('receive msg');
//     var max_length = 1024;
//     // if (info.selection.length > max_length)
//     //   info.selection = info.selection.substring(0, max_length);
    
//   });
// });

