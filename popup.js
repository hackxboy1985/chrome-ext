window.onload=function(){
	
	let type = 'cas';
	chrome.storage.local.get(type, function(obj) {
		//console.log(type,' load cfg: ',obj)
		let enable = obj[type].enable;
		let docname = obj[type].docname;
		document.getElementById('casdocname').value=docname
		document.getElementById('casenable').checked=enable
	});
	
	let adxtype = 'adx';
	chrome.storage.local.get(adxtype, function(obj) {
		//console.log(type,' load cfg: ',obj)
		let enable = obj[adxtype].enable;
		let docname = obj[adxtype].docname;
		document.getElementById('adxdocname').value=docname
		document.getElementById('adxenable').checked=enable
	});
	
	// chrome.storage.local.get("casdocname", function(obj) {
	// 	document.getElementById('casdocname').value=obj.casdocname
	// });
	// chrome.storage.local.get("casenable", function(obj) {
	//     document.getElementById('casenable').checked=obj.casenable
	// });
	
	// chrome.storage.local.get("adxdocname", function(obj) {
	//     document.getElementById('adxdocname').value=obj.adxdocname
	// });
	
	// chrome.storage.local.get("adxenable", function(obj) {
	//     document.getElementById('adxenable').checked=obj.adxenable
	// });

}

document.getElementById('casenable').onclick = function(){
	var casenable  = document.getElementById('casenable').checked;
	var casdocname = document.getElementById('casdocname').value;
	
	var p = {
	    "cas":{
			enable:casenable,
			docname:casdocname,
			}
	}
	chrome.storage.local.set(p,function(){
		
		// // 向background发送消息
		// chrome.runtime.sendMessage({action: 'save', type: 'cas', msg:'cas'}, function(response) {
		//     console.log('pop 收到回复',response);
		// });
		
		// //向content.js发送消息
		// chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
		//   chrome.tabs.sendMessage(tabs[0].id, {action: 'save', type: 'cas', msg:'cas'}, function(response) {
		//     console.log('收到handle回复结果：'+ response);
		//   });
		// });
	    showWeakPrompt('设置已保存');
		
	    }
	);
}

document.getElementById('adxenable').onclick = function(){
	var adxenable  = document.getElementById('adxenable').checked;
	var adxdocname = document.getElementById('adxdocname').value;
	
	var p = {
	    "adx":{
			enable:adxenable,
			docname:adxdocname,
			}
	}
	chrome.storage.local.set(p,function(){
	    showWeakPrompt('设置已保存');
	});
	
}

//保存
// document.getElementById('save').onclick = function(){
// 	var casdocname = document.getElementById('casdocname').value;
// 	var casenable = document.getElementById('casenable').checked;
// 	var adxdocname = document.getElementById('adxdocname').value;
// 	var adxenable = document.getElementById('adxenable').checked;
//     var p = {
// 				"casdocname":casdocname,
// 		        "casenable":casenable,
// 				"adxdocname":adxdocname,
// 				"adxenable":adxenable
//     }
//     chrome.storage.local.set(p,function(){
//         showWeakPrompt('设置已保存3');
// 	});
// }


function showWeakPrompt(message) {
  //console.log('showWeakPrompt', document);

  const weakPrompt = document.createElement('div');
  weakPrompt.id = 'hackxboy';
  weakPrompt.textContent = message;
  weakPrompt.style.position = 'fixed';
  weakPrompt.style.top = '20%';
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
  }, 1000);
  

	// chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
	//   chrome.tabs.sendMessage(tabs[0].id, {action: 'save',  msg:'同步popup'}, function(response) {
	//     console.log('收到content_scripts回复结果：'+ response);
	//   });
	// });

	
 //  chrome.runtime.sendMessage({ action: "propt1" }, response => {
	// if (response.success) {
	//   console.log(response.data);
	// } else {
	//   console.error(response.error);
	// }
 //  });
}
