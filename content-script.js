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
//addEventListener('load', (event) => { injectScript(chrome.runtime.getURL('inject.js'), document.getElementsByTagName("body")[0]); });

/**
 * inject following script to get xhr or fetch response body
 * added "web_accessible_resources": ["interceptXHRorFETCH.js"] to manifest.json
 */
injectScript(chrome.runtime.getURL('pageAndRequestMap.js'), (document.head || document.documentElement));
injectScript(chrome.runtime.getURL('interceptXHRorFETCH.js'), (document.head || document.documentElement));

window.addEventListener('message', function(e) {
	console.log('111 url=',e.currentTarget.location.href)
	/**
     //console.log(e.data);
    let pageUrls = pageAndRequestMapArray.filter(item=>{
      return item.pageUrl!==undefined&&e.currentTarget.location.href.match(item.pageUrl);
    });
	//console.log('pageUrls=',pageUrls);
	console.log('e.data.customEvent=',e.data.customEvent);
    if(!pageUrls.length||!e.data.customEvent) return;
    // return window
    if(e.data.window) {pageUrls[0].handler(e.data, document); return};
    pageUrls[0].requestUrl.map(item=>{
      if(e.data.requestUrl.match(item)) pageUrls[0].handler(e.data, document);
    });
	**/
	
	
	
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

// do sth you want to do with data intercepted
// function save1688DataToNeo4j (data, apiUrl) {

// }

// function dataMapper (data, schema) {
//     schema["listing.sellingProduct.productName.0.text"]             = jsonpath(data.listing.sellingProduct.product)
//     schema["listing.sellingProduct.productName.0.languageTagCode"]  = jsonpath(data.listing.sellingProduct.product)
//     schema["listing.sellingProduct.productName.1.text"]             = jsonpath(data.listing.sellingProduct.product)
//     schema["listing.sellingProduct.productName.1.text"]             = jsonpath(data.listing.sellingProduct.product)
// }





function loadcfg(){
	
	chrome.storage.local.get("isenable", function(obj) {

		let docname="";		
		chrome.storage.local.get("docname", function(obj) {
			docname=obj.docname
		});
		
		console.log('docname:',docname);
		window.docname=docname;
		console.log('window.docname:',window.docname);
		
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
// loadcfg();
//setTimeout(loadcfg,2000);