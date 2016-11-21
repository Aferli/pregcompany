/**
 * Created by ge on 2016/11/3.
 */
function sendMessage(msg){
    chrome.tabs.query(
        {active: true, currentWindow: true},
        function(tabs) {
            if(tabs&&tabs.length>0){
                // background向content_script发送消息
                chrome.tabs.sendMessage(tabs[0].id, {name:"message",greeting:msg});
            }
        });
}


var flag = false;
var currentTabId;

chrome.browserAction.onClicked.addListener(function (tab) {
   // counter = 40;
    console.log('Turing'+tab.url);
    flag = true;
    currentTabId = tab.url;
    chrome.tabs.getSelected(null,function (tab) {
        sendMsg(tab.id);
    });
});
chrome.webNavigation.onCompleted.addListener(function (tab) {
    console.log("加载完成" + tab.tabId);
    if (flag){
        sendMsg(tab.tabId);
    }
});
chrome.extension.onMessage.addListener(function (request,sender,sendResponse) {
    console.log("^^^^^background.js^^^^^^^^^");
    articleData = request;
    $.ajax({
        //url:"http://localhost/pregcompany/enreinfo.php",
        url:"http://"
        type:'POST',
        dataType:'json',
        data:{
            'pageinfo':request.msg
        },
        success:function (result) {
            console.log(result);
        },
        error:function (error) {
            console.log(error);
        }
    });
    cmd = request.cmd;
    if ('end'==cmd){
        flag = false;
    }
});
/**
 * background send message to content
 * @param tabid
 */
function sendMsg( tabid ){
    console.log(tabid + "--sendMsg()----eventPage.js");
    chrome.tabs.sendMessage(tabid, {greeting: "start"}, function(response) {
    });
}



