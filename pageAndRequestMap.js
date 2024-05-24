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
		console.log('url=',data.requestUrl,',response=',data.data);
		//alert(JSON.stringify(data));
		tips(data.data);
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