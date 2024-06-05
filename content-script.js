let parentWindow; 
// console.log(getSiteAndRequestMap())
// inject script to get window object
function injectScript(file_path, node) {
    var script = document.createElement('script');
    script.setAttribute('type', 'text/javascript');
    script.setAttribute('src', file_path);
    node.appendChild(script);
    script.onload = function() {
        this.remove();
    };
}

// run after window is loaded
// addEventListener('load', (event) => { injectScript(chrome.runtime.getURL('inject.js'), document.getElementsByTagName("body")[0]); });

/**
 * inject following script to get xhr or fetch response body
 * added "web_accessible_resources": ["interceptXHRorFETCH.js"] to manifest.json
 */
injectScript(chrome.runtime.getURL('pageAndRequestMap.js'), (document.head || document.documentElement));
injectScript(chrome.runtime.getURL('interceptXHRorFETCH.js'), (document.head || document.documentElement));

window.addEventListener('message', function(e) {
	// console.log('111 url=',e.currentTarget.location.href)
	// /**
	 
	 //console.log(e.data);
	 if(e.data.tag === null || e.data.tag === undefined)return;
	 //console.log('111 url=',e.currentTarget.location.href)
    
    let pageUrls = pageAndRequestMapArray.filter(item=>{
      return item.pageUrl!==undefined&&e.currentTarget.location.href.match(item.pageUrl);
    });
	//console.log('e.data.customEvent=',e.data.customEvent);
    if(!pageUrls.length||!e.data.customEvent) return;
    // return window
    if(e.data.window) {
		// console.log('pageUrls1=',e.data.requestUrl);
		// console.log(e.data);
		pageUrls[0].handler(e.data, document,pageUrls[0]); 
		return
		};
    pageUrls[0].requestUrl.map(item=>{
      if(e.data.requestUrl.match(item)) {
		// console.log('pageUrls2=',e.data.requestUrl);
		// console.log(e.data);
		pageUrls[0].handler(e.data, document,pageUrls[0]);
	  }
    });
	// **/
	
	
	
    //console.log(e.data)
    // parentWindow = e.data.window||null;
    // console.log(e.currentTarget.location.href);
    // switch (e.currentTarget.location.href){
    // case 'https://detail.1688.com':
    //     if(!e.data.customEvent) break;
    //     // console.log(e.data);
    //     JSON.parse(parentWindow.__GLOBAL_DATA.offerDomain).tradeModel.skuMap.map(item=>{
    //         console.log(item.specAttrs)
    //     })
    //     break;
    // case e.currentTarget.location.href.match(/http.*?:\/\/sellercentral.*?\.amazon\.com\//).input:
    //     if(!e.data.customEvent) break;
    //     console.log(e.data);
    //     // console.log(JSON.stringify(parentWindow));
    //     break;
    // default:
    //     console.log("nothing happened");
    // }
})


function autoNext(){
	var pageTimes = 0;
		  
	if (message.page) {
	  pageTimes = parseInt(message.page);
	}
		  
	var count = 0;
	//每间隔5秒点击一次分页
	var timer = setInterval(() => {
	  //抓取第一页数据 不需要翻页
	  if (count > 0 && count < pageTimes + 1) {
	    paginationBtn.click();
	  }
		  
	  setTimeout(() => {
	    // 将页面滚动到底部
	    var element = document.documentElement;
	    element.scrollTop = element.scrollHeight - element.clientHeight;
		  
	    var xpath = message.listXpath;
	    //抓取数据
	    fetchList(xpath, 1);
		  
	    //翻页次数累加
	    count++;
		  
	    if (count >= pageTimes + 1) {
	      //清除点击分页的定时器
	      clearInterval(timer);
	      //添加监听禁用所有元素点击事件
	      addDisableClickEvent();
		  
	      //抓取结束
	      chrome.runtime.sendMessage({
	        action: "fetchEnded",
	      });
	    }
	  }, 3000);
	}, 5000);
}
// do sth you want to do with data intercepted
// function save1688DataToNeo4j (data, apiUrl) {

// }

// function dataMapper (data, schema) {
//     schema["listing.sellingProduct.productName.0.text"]             = jsonpath(data.listing.sellingProduct.product)
//     schema["listing.sellingProduct.productName.0.languageTagCode"]  = jsonpath(data.listing.sellingProduct.product)
//     schema["listing.sellingProduct.productName.1.text"]             = jsonpath(data.listing.sellingProduct.product)
//     schema["listing.sellingProduct.productName.1.text"]             = jsonpath(data.listing.sellingProduct.product)
// }



// chrome.extension.onMessage.addListener(function(request, sender, sendResponse) {
//   console.log('我收到消息'+ request.from + request.to);
//   //sendResponse("content_scripts回复处理结果");
//   showWeakPrompt(message.msg);
//   sendResponse('回复');
// });


// function showWeakPrompt(message) {
//   const weakPrompt = document.createElement('div');
//   weakPrompt.id = 'hackxboy';
//   weakPrompt.textContent = message;
//   weakPrompt.style.position = 'fixed';
//   weakPrompt.style.top = '10%';
//   weakPrompt.style.left = '50%';
//   weakPrompt.style.transform = 'translate(-50%, -50%)';
//   weakPrompt.style.backgroundColor = 'rgba(0, 0.5, 0, 0.8)';
//   weakPrompt.style.color = 'white';
//   weakPrompt.style.padding = '10px';
//   weakPrompt.style.borderRadius = '5px';
//   weakPrompt.style.zIndex = 100;

//   document.body.appendChild(weakPrompt);

//   setTimeout(() => {
//     document.body.removeChild(weakPrompt);
//   }, 3000);
// }

// loadcfg();


chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
	console.log('2message:',message);
	if (message.action === "getPaginationXpath") {
		// 获取页面中的所有元素
		var elements = document.getElementsByTagName("*");
		// 遍历所有元素
		for (var i = 0; i < elements.length; i++) {
		  var element = elements[i];
		  // 判断元素是否为分页按钮
		  if (isPaginationButton(element)) {
			//console.log(element);
			element.style.outline = "2px solid #22895e";
			var xpath = getElementXpath(element);
			console.log('2同步下一页按钮位置:',xpath);
			//autoPageSave();
			var p = {
			    "xpath":xpath
			}
			chrome.storage.local.set(p,function(){
			    //showWeakPrompt('save');
				//notify
				chrome.runtime.sendMessage({
				  action: "sendPaginationXpath",
				  xpath,
				});
			});
			
			
			break;
		  }
		}
	  }
})


// 判断元素是否为分页按钮的函数
function isPaginationButton(element) {
  // 判断元素的文本内容是否包含"下一页"、"下页"等关键词
  var keywords = ["下一页", "下页"];
  for (var i = 0; i < keywords.length; i++) {
    if (
      element.children.length == 0 &&
      !["script", "style"].includes(element.tagName.toLowerCase())
    ) {
      if (element.innerHTML.trim().includes(keywords[i])) {
        return true;
      }

      if (element.getAttribute("title")) {
        if (element.getAttribute("title").trim().includes(keywords[i])) {
          return true;
        }
      }
    }
  }

  return false;
}

// 获取选中元素的 XPath
function getElementXpath(element) {
  var xpath = "";
  while (element && element.nodeType === 1) {
    var id = getElementId(element);
    var tagName = element.tagName.toLowerCase();
    var index = getElementIndex(element);
    // xpath = "/" + tagName + "[" + index + "]" + xpath;
    xpath = "/" + (index == 1 ? tagName : tagName + "[" + index + "]") + xpath;
    element = element.parentNode;
  }
  return xpath;
}


function getElementId(element) {
  if (element.id) {
    return element.id;
  }
  var siblings = element.parentNode.children;
  for (var i = 0; i < siblings.length; i++) {
    if (siblings[i] === element) {
      return i + 1;
    }
  }
  return null;
}

// 获取元素在父节点中的索引
function getElementIndex(element) {
  var index = 1;
  var previousSibling = element.previousSibling;
  while (previousSibling) {
    if (
      previousSibling.nodeType === 1 &&
      previousSibling.tagName === element.tagName
    ) {
      index++;
    }
    previousSibling = previousSibling.previousSibling;
  }
  return index;
}