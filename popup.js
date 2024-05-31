window.onload=function(){
	
	chrome.storage.local.get("casdocname", function(obj) {
		document.getElementById('casdocname').value=obj.casdocname
	});
	chrome.storage.local.get("casenable", function(obj) {
	    document.getElementById('casenable').checked=obj.casenable
	});
	
	chrome.storage.local.get("adxdocname", function(obj) {
	    document.getElementById('adxdocname').value=obj.adxdocname
	});
	
	chrome.storage.local.get("adxenable", function(obj) {
	    document.getElementById('adxenable').checked=obj.adxenable
	});

}

document.getElementById('casenable').onclick = function(){
	var casenable = document.getElementById('casenable').checked;
	var p = {
	    "casenable":casenable,
	}
	console.log('post');
	chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
	  chrome.tabs.sendMessage(tabs[0].id, {action: 'save',  msg:message}, function(response) {
	    console.log('收到handle回复结果：'+ response);
	  });
	});
	// chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
	// // 取出当前标签页的 tag_id, 发送一个消息出去, 同时带上回调函数
	// 	chrome.tabs.sendMessage(tabs[0].id, { action: "search" }, function (response) {
	// 		// 回调函数，把传回的信息渲染在popup.html上
	//     console.log('收到handle回复结果：'+ response);
	// 	});  
	// }); 
	
	chrome.storage.local.set(p,function(){
	    showWeakPrompt('cas设置已保存1');
	    }
	);
}
//保存
document.getElementById('adxenable').onclick = function(){
	var adxenable = document.getElementById('adxenable').checked;
	var p = {
		"adxenable":adxenable
	}
	chrome.storage.local.set(p,function(){
	    showWeakPrompt('adx设置已保存2');
	    }
	);
}

//保存
document.getElementById('save').onclick = function(){

	var casdocname = document.getElementById('casdocname').value;
	var casenable = document.getElementById('casenable').checked;
	var adxdocname = document.getElementById('adxdocname').value;
	var adxenable = document.getElementById('adxenable').checked;

    var p = {
				"casdocname":casdocname,
		        "casenable":casenable,
				"adxdocname":adxdocname,
				"adxenable":adxenable

    }
    chrome.storage.local.set(p,function(){
        showWeakPrompt('设置已保存3');
	});
	

}


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
  

	chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
	  chrome.tabs.sendMessage(tabs[0].id, {action: 'save',  msg:'同步popup'}, function(response) {
	    console.log('收到content_scripts回复结果：'+ response);
	  });
	});

	
 //  chrome.runtime.sendMessage({ action: "propt1" }, response => {
	// if (response.success) {
	//   console.log(response.data);
	// } else {
	//   console.error(response.error);
	// }
 //  });
}
