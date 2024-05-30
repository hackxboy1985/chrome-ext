let color = '#3aa757';

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({ color });
  console.log('Default background color set to %cgreen', `color: ${color}`);
});

chrome.runtime.onInstalled.addListener(function() {
  chrome.contextMenus.create({
    "id": "customMenuItem",
    "title": "My Custom Option",
    "contexts": ["selection","selection"]
  });
  
});

chrome.contextMenus.onClicked.addListener(function(info, tab) {
	console.log('click: ',info.menuItemId);
	// 更新菜单项的示例操作
	//chrome.contextMenus.update("customMenuItem", { title: "更新后的菜单项" });
	// if (info.menuItemId === "getClipboardContent" && info.mediaType === "text") {
	// 	  var clipboardContent = info.srcUrl; // 剪切板文本内容
	// 	  // 处理剪切板内容
	// 	  console.log(clipboardContent);
	// 	}
    if (info.menuItemId === "customMenuItem") {
		// 找到选中的文字，藏在info.selectionText里
		//const selectedText = info.selectionText;
		//console.log(`选中的文本：${selectedText}`);
		if(info.mediaType === "text"){
			var clipboardContent = info.srcUrl; // 剪切板文本内容
			console.log('selectedText= ',clipboardContent);
		}
		if(info.mediaType === "video"){
			var clipboardContent = info.srcUrl; // 视频内容
			console.log('video url= ',clipboardContent);
			if(isenable){
				httpRequest('https://api.mints-tech.cn/camera-api/common/health', 'video='+clipboardContent, function(){
					showWeakPrompt("发送成功");
				});
			}
			
		}
		
		if (navigator.clipboard) {
		   navigator.clipboard.readText()
		   .then(text => {
				console.log('剪切板内容:', text);
			  })
		   .catch(err => {
				console.error('获取剪切板内容出错:', err);
			  });
		  }
      //alert("Custom item clicked!");
    }
  });
  
  //构造请求，发给OA
  function httpRequest(url,data, callback){
  	console.log('get start');
      // var xhr = new XMLHttpRequest();
      // xhr.open('get',url);
      // xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
      // //chrome.storage.local.set({"log":"发送数据给OA，OA处理中"});
      // xhr.send(data);
	  
	  // 模拟发送请求
	  fetch(url)
	   .then(response => response.text())
	   // .then(response => response.json())
	   .then(data => {
		   console.log('请求结果',data)
		   if(callback)
		   		callback();
	   })
	   .catch(error => console.error('出错了:', error));
		
  	console.log('get end');
  }
  
  

let docname="";
let isenable=false;
function loadcfg(){
	console.log('bg');
	chrome.storage.local.get("isenable", function(obj) {

		isenable = obj.isenable;
		if(obj.isenable){
			console.log("bg 插件已经准备开启");
			 //chrome.storage.local.set({"log":"插件已经准备开启!"});
	//        setTimeout(sent_req,2000);
		}else{
			console.log("插件未开启");
		}
	});
	
	chrome.storage.local.get("docname", function(obj) {
		docname=obj.docname
		console.log('bg docname:',docname);
	});
}
loadcfg();


function showWeakPrompt(message) {
  //console.log('showWeakPrompt', document);

	// chrome.runtime.sendMessage({ action: 'propt',msg:message }, function(response) {
	//   console.log(response);
	// });
	
	chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
	  chrome.tabs.sendMessage(tabs[0].id, {action: 'propt',  msg:message}, function(response) {
	    console.log('收到content_scripts回复结果：'+ response);
	  });
	});
}


 
// document.addEventListener("contextmenu", (e) => {
//   e.preventDefault(); 
//   // 在此处添加显示自定义菜单的代码
// });

