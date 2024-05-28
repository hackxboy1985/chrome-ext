let color = '#3aa757';

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({ color });
  console.log('Default background color set to %cgreen', `color: ${color}`);
});

chrome.runtime.onInstalled.addListener(function() {
  chrome.contextMenus.create({
    "id": "customMenuItem",
    "title": "My Custom Option",
    "contexts": ["all"]
  });
  chrome.contextMenus.onClicked.addListener(function(info, tab) {
	  console.log('click: ',info.menuItemId);
    if (info.menuItemId === "customMenuItem") {
  	  navigator.clipboard.readText()
  	   .then(text => {
  	        console.log('剪切板内容:', text);
  	      })
  	   .catch(err => {
  	        console.error('获取剪切板内容出错:', err);
  	      });
      //alert("Custom item clicked!");
    }
  });
});

// document.addEventListener("contextmenu", (e) => {
//   e.preventDefault(); 
//   // 在此处添加显示自定义菜单的代码
// });

