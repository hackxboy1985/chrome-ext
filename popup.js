// 获取当前选项卡
chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
  // 向当前页注入脚本
  chrome.tabs.executeScript(
    tabs[0].id,
    { file: "/assets/js/jquery.js" },
    function () {
      console.log("jquery注入成功");
    }
  );
});

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
	
	let autonexttype = 'autonext';
	chrome.storage.local.get(autonexttype, function(obj) {
		//console.log(type,' load cfg: ',obj)
		let enable = obj[autonexttype].autonextenable;
		let xpath = obj[autonexttype].xpath;
		let next_times = obj[autonexttype].next_times;
		//showWeakPrompt('读取次数:'+next_times);
		
		document.getElementById('autonext').checked=enable;
		document.getElementById('xpath-pagination').value=xpath;
		document.getElementById('pagination-times').value=next_times;
	});

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

//自动翻页
document.getElementById('autonext').onclick = function(){
	var autonext  = document.getElementById('autonext').checked;
	if(autonext){
		//post msg
		chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
		  chrome.tabs.sendMessage(tabs[0].id, {action: 'getPaginationXpath',  msg:'nextBtn'}, function(response) {
			  //autoPageSave();
		  });
		});
	}else{
		autoPageSave();
	}
}

//次数
document.getElementById('pagination-times').oninput = function(){
	
	autoPageSave();
}

function autoPageSave(){
	if(document.getElementById('pagination-times').value === undefined)
		document.getElementById('pagination-times').value = 2;
	
	var autonextenable  = document.getElementById('autonext').checked;
	var xpath  = document.getElementById('xpath-pagination').value;
	var next_times  = document.getElementById('pagination-times').value;
	var p = {
		"autonext":{
			"autonextenable":autonextenable,
			"xpath":xpath,
			"next_times":next_times,
		}
	};
	
	chrome.storage.local.set(p,function(){
	    showWeakPrompt('设置已保存:'+p);
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



//给输入框中的指针图标添加点击事件
// $("#pane .ready-choose").each(function () {
//   $(this).click(function () {
//     if ($(this).hasClass("active")) {
//       $(this).removeClass("active");
//     } else {
//       $("#pane .ready-choose").each(function () {
// 		//showWeakPrompt('remove:',$(this).id);
//         $(this).removeClass("active");
//       });
// 	  showWeakPrompt('点击:',$(this).id);
//       $(this).addClass("active");
	  
// 	  //post msg
// 	  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
// 	    chrome.tabs.sendMessage(tabs[0].id, {action: 'getPaginationXpath',  msg:'nextBtn'}, function(response) {
// 	      console.log('收到content_scripts回复结果：'+ response);
// 	    });
// 	  });
	  
//     }
//   });
// });


// 监听消息
chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  showWeakPrompt('rcv:'+message.action);
  //接收content.js获取到的xpath
  if (message.action === "sendPaginationXpath") {

	  chrome.storage.local.get("xpath", function(obj) {
	  	let xpath = obj.xpath;
		$("#xpath-pagination").val(xpath);
		autoPageSave();
	  });
		
	  
	  // $("#xpath-pagination").val(message.xpath);
	  // $("#xpath-pagination").attr("title", message.xpath);
	  // $("#pagination-times").val(0);
  }
 });
