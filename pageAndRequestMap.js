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
		console.log('@@@url=',data.requestUrl,',response=',data.data);
		//alert(JSON.stringify(data));
		console.log('window.docname=',window.docname);
		showWeakPrompt('抓到body');
		//httpRequest('https://api.mints-tech.cn/camera-api/common/health','aa');
		
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
  console.log('showWeakPrompt', document);

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
  
  //init();
}

function init(){
	document.addEventListener('contextmenu', function (e) {
      e.preventDefault();

      const customMenuItem = document.createElement('div');
      customMenuItem.textContent = '清除';
      customMenuItem.style.backgroundColor = 'lightgray';
      customMenuItem.style.padding = '5px';

      customMenuItem.addEventListener('click', function () {
        // 在这里添加清除操作的代码
        alert('执行清除操作！');
      });

      document.body.appendChild(customMenuItem);

      setTimeout(() => {
        document.body.removeChild(customMenuItem);
      }, 3000);
    });
}


function tips(str){
	// 检查浏览器是否支持Notification API
	if ('Notification' in window) {
	   console.log('tip1');
	  // 检查用户是否已经允许通知
	  if (Notification.permission === "granted") {
		console.log('tip1 granted');  
		// 如果已经允许，则直接创建通知
		var notification = new Notification('标题', {
		  body: str,
		  icon: 'https://himg.bdimg.com/sys/portraitn/item/public.1.4740939e.jB25tZF2t_Ql0YneVjFRRQ' // 通知的图标
		});
		console.log("will show notification")
		
		 // 可以添加事件，来触发交互
		  notification.onclick=function () {
		    console.log("click notification")
		  }
	  } else {
		  console.log('tip1 request permission');  
		// 如果尚未允许，请求用户授权
		Notification.requestPermission()
		  .then((permission) => {
			if (permission === "granted") {
			  var notification = new Notification('标题', {
				body: str,
				icon: 'notif-icon.png'
			  });
			}
		  });
	  }
	} else {
		console.log('tip2 你的浏览器不支持通知');
	  //alert('你的浏览器不支持通知');
	}
}


//export let docname="";
function loadcfg(){
	console.log('-----');
	chrome.storage.local.get("isenable", function(obj) {
		
		let docname='';
		chrome.storage.local.get("docname", function(obj) {
			docname=obj.docname
		});
		window.docname=docname;
		console.log('doc name:',window.docname);

		if(obj.isenable){
			console.log("插件已经准备开启");
			 //chrome.storage.local.set({"log":"插件已经准备开启!"});
	//        setTimeout(sent_req,2000);
		}else{
			console.log("插件未开启");
		}
	});
}

//程序入口
//setTimeout(loadcfg,2000);
