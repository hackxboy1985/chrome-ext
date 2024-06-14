 let pageAndRequestMapArray = [
{
	pageUrl:"http.*?://.*/search/material*", 
 	requestUrl: [
		".*/material"
 	],
	type:'adx',
	docname:'',
	enable:false,
 	handler: function (data, doc, pthis){
		loadcfgwithtype(pthis.type, function(cfg){
			//console.log("load cfg:",cfg);
			if(cfg !== null && cfg.enable !== null && cfg.enable !== undefined 
				){
				if(cfg.enable){
					showWeakPrompt('上传['+cfg.docname+']目录');
					//httpRequest('https://api.mints-tech.cn/camera-api/common/health?a=docname','aa');
					let dt = {
						"body":data,
						"name":cfg.docname
					};
					sendPostRequest('http://test2.mints-id.com/api/material/ryun2',dt)
				}else{
					console.log("adx not enable");
				}
			}else{
				//未配置
			}
		});
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
		// ".*/starmap/api/.*"
		".*/pcsearch"
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
		
		//console.log('enable',pthis.enable,'docname=',pthis.docname, '@@@url=',data.requestUrl,',response=',data.data);
		//alert(JSON.stringify(data));
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

//构造请求，发给OA
function sendPostRequest(url, data) {
  const xhr = new XMLHttpRequest();
  xhr.open('POST', url);
  xhr.setRequestHeader('Content-Type', 'application/json');

  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4 && xhr.status === 200) {
      console.log('请求成功，响应数据:', xhr.responseText);
    }
  };

  xhr.send(JSON.stringify(data));
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
	   if(obj[type] !== undefined){
			let enable = obj[type].enable;
			let docname = obj[type].docname;
			// let entity = pageAndRequestMapArray.filter(item=>{
			//   //console.log('currentLocation=',currentLocation,', item.pageUrl=',item.pageUrl);
			//   return item.type!==undefined&&item.type===type;
			// });
			// entity[0].enable = enable;
			// entity[0].docname = docname;
			// console.log('load finish: ',entity);
			// console.log('load finish2: ',pageAndRequestMapArray);
			if(cb !== null && cb !== undefined)
				cb(obj[type]);
		}
	});
}

function loadcfg2(){
	
	// console.log('loadcfg2');
	loadcfgwithtype('cas');
	loadcfgwithtype('adx');


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

