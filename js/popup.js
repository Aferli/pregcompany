/**
 * Created by ge on 2016/10/31.
 * 调用background.js的函数
 */
$(function () {
    // 先获取background页面
    var   background = chrome.extension.getBackgroundPage();

    //再在返回的对象上调用background.js 里面的函数
    $("#btn_setService").click(function () {
        background.sendMessage("123123");
    });
});

// $(function () {
//     // 先获取background页面
//     var   background = chrome.extension.getBackgroundPage();
//
//     //再在返回的对象上调用background.js 里面的函数
//     $("#btn_setService").click(function (tab) {
//         counter = 40;
//         console.log('Turing'+tab.url);
//         flag = true;
//         currentTabId = tab.url;
//         chrome.tabs.getSelected(null,function (tab) {
//             background.sendMsg(tab.id);
//         });
//     });
// });
