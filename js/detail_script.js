/**
 * Created by ge on 2016/11/17.
 */
var page = 0;

chrome.extension.onMessage.addListener(
    function(request, sender, sendResponse) {
        if (request && request.name){
            if ( request.name == 'message'){
                console.log("totalpage----------" + 512);
                getEntreinfo(sendResponse);
            }
        }

    });
function getEntreinfo(sendResponse) {
    var flag = false;
    entrInfo = [];//企业名称
    var lineone = $('div[class=search-list-bg]') . find('a');
    var linetwo = $('div[class=search-list-bg]') . find('div[class=search-result-company-info]');
    var linethree = $('div[class=search-list-bg]') . find('div[class=search-result-company-history]');
    var linefour = $('div[class=search-list-bg]') . find('div[class=company-state-type]');
    var linefive = $('div[class=search-list-bg]') . find('div[data-score]').children('canvas');
    var alen = lineone.length;
    for (var i=0;i<alen;i++){
        var info = {
            title : lineone.eq(i).text(),
            href : lineone.eq(i).attr('href'),
            legal:linetwo.eq(i).children("span").eq(0).text(),
            starttime:linetwo.eq(i).children("span").eq(1).text(),
            capital:linetwo.eq(i).children("span").eq(2).text(),
            addr:linethree.eq(i).children("span").eq(1).text(),
            status:linefour.eq(i).text(),
            score:linefive.eq(i).attr('data-score')
        }
        //var info = lineone.text()+ lineone.attr('href')+linetwo.children("span")[0]+linetwo.children("span")[1]+linetwo.children("span")[2]+linethree.children("span")[1];
        entrInfo.push(info);
    }
    console.log(entrInfo);
    page = parseInt($('div[id=search_pager]').attr('data-pager-current-page'));
    pageinfo = {
        'entrInfo':entrInfo,
        'page':page
    };
    if (page<512){
        console.log("curentpage:" + page + "--------next-----------");
        sendMsg(pageinfo,"next");
        $('span[class=oni-pager-next]').click();
    }else {
        sendMsg(pageinfo,"end");
    }
}
/**
 * content向background发送消息
 * @param msg
 * @param cmd
 */
function sendMsg(msg,cmd) {
    chrome.extension.sendMessage({"msg":msg, "cmd":cmd},function (response) {
    });
}
