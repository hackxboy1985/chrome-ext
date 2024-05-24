window.onload=function(){
	
    chrome.storage.local.get("docname", function(obj) {
        document.getElementById('docname').value=obj.docname
    });
	
	chrome.storage.local.get("isenable", function(obj) {
	    document.getElementById('isenable').checked=obj.isenable
	});

}

//保存
document.getElementById('save').onclick = function(){

	var docname = document.getElementById('docname').value;
    var isenable = document.getElementById('isenable').checked;
    var p = {
		"docname":docname,
        "isenable":isenable
    }
    chrome.storage.local.set(p,function(){
        alert('设置已保存');
        }
    );
	
 //  chrome.runtime.sendMessage({ action: "doSomething" }, response => {
	// if (response.success) {
	//   console.log(response.data);
	// } else {
	//   console.error(response.error);
	// }
 //  });
}