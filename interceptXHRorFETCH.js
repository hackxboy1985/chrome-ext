// import { pageAndRequestMapArray,getMap } from './pageAndRequestMap.js'
let currentLocation = document.location.href;

const passMessageIfInMap = (requestUrl , data, urlMapArray) => {
    urlMapArray = urlMapArray.filter(item=>{
	  //console.log('currentLocation=',currentLocation,', item.pageUrl=',item.pageUrl);
      return item.pageUrl!==undefined&&currentLocation.match(item.pageUrl);
    });
	
    if(!urlMapArray.length) return;
    urlMapArray[0].requestUrl.map(item=>{
      // only postMessage when requestUrl is in map array
      if(requestUrl.match(item)) {
			console.log('requestUrl=',requestUrl,', match item',item);
		    urlMapArray[0].handler({data, customEvent: true, requestUrl:requestUrl}, document);
			//window.postMessage('message', {data, customEvent: true, requestUrl:requestUrl});
	  }else{
		  //console.log('requestUrl=',requestUrl,',not match item',item);
	  }
    })
}

//下面拦截生效
(async function (){
    let oldXHROpen = window.XMLHttpRequest.prototype.open;
    window.XMLHttpRequest.prototype.open = function(method, url, async, user, password) {
        this.addEventListener('load', function() {
          //siteAndRequestMapArray from siteAndRequestMap.js
		  console.log('url=',url,', this.responseType=',this.responseType);
		  if(this.responseType === 'text' || this.responseType === ''){
			//console.log('url=',url,', responseText=',this.responseText);
			passMessageIfInMap(url, this.responseText, pageAndRequestMapArray); 
		  }
     });
     return oldXHROpen.apply(this, arguments);
    }
}());

//下面并未生效
(function(){
    const { fetch: originalFetch } = window;
    window.fetch = async (...args) => {
      let [resource, config] = args;
      let response = await originalFetch(resource, config);

      // response interceptor
      const json = () =>
        response
          .clone()
          .json()
          .then((data) => {
             console.log("fetch data:",data)
            //siteAndRequestMapArray from siteAndRequestMap.js
            passMessageIfInMap(resource, data, pageAndRequestMapArray);           
            // return { ...data, title: `Intercepted: ${data.title}` }
            return data;
        });

      response.json = json;
      return response;
    };
}());