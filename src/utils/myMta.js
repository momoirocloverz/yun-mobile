const mtaUrl = '接口地址'
const appId = '__UNI__B5BE617';
//  埋点通用接口
// triggerType: 必传 类型 entryStr(进入) || leaveStr(离开) || String:自定义事件描述
// pageUrl：非必传，页面路径，不穿默认获取当前路径
async function myMta(triggerType = "", pageUrl = '') {    
    let entryTime, leaveTime,stayTime,sceneType,params;
    // entryTime 进入页面时间
    // leaveTime 离开页面时间
    // stayTime  停留时长
    // sceneType 渠道类型   1 线上渠道用户数    2 线下渠道用户数   3 非扫描二维码用户数    
    if (!triggerType) return
    if (triggerType == 'entryStr') {
        entryTime = new Date().getTime();
        leaveTime = null;
        uni.setStorageSync('entryTime',entryTime)
    } else {
        entryTime = uni.getStorageSync('entryTime');
        leaveTime = new Date().getTime();
        stayTime = leaveTime-entryTime;
    }    
    // 获取页面路径及参数
    const urlArgs = getCurrentPageUrlWithArgs();
	console.log('urlArgs',urlArgs);
    if (!pageUrl) {
        leaveTime = new Date().getTime();
        if (urlArgs.indexOf("?") != -1) {
            let url, result, reqDataString;
            pageUrl = urlArgs.split("?")[0];
            url = urlArgs.split("?")[1];
            result = url.replace(/&/g, '","').replace(/=/g, '":"');
            reqDataString = '{"' + result + '"}';
            params = JSON.parse(reqDataString);
        } else {
            pageUrl = urlArgs;
        }
    }    
    wx.getNetworkType({
        success: function(res) {
			console.log(res);
            let networkType = res.networkType;
            let token,openid;
			token = uni.getStorageSync("token") || "暂无:token";
            try {
                let scene = JSON.parse(wx.getStorageSync("name"));
                token = uni.getStorageSync("token") || "暂无:token";
                if (!scene) {
                    sceneType = 3
                } else {
                    sceneType = (scene !== '02be37d9cfbf45f9aa1013180c80bfe0') ? 1 : 2;
                }
            } catch (e) {}
            var data = {
                token: token,
                openid: token,
                scene: sceneType,
                triggerType: triggerType,
                networkType: networkType,
                pageInfo: {
                    pageUrl: pageUrl,
                    url: urlArgs,
                    ...params,
                },
                entryTime: toDateDetail(entryTime),
                leaveTime: toDateDetail(leaveTime),
                stayTime: stayTime,
                sysTemInfo: wx.getStorageSync("sysTemInfo"),
            }
			console.log(data);
            wx.request({
                url: mtaUrl,
                data: data, 
                method: "POST",
                header: {
                    "content-type": "application/json",
                    "appId": appId,
                    // "appId": "const_wywplus",
                    "appToken": "mkgame?" + chars(), 
                },
                success(res) {
                    if (res.data.code == 200) {} else {
                        console.error('请求失败')
                    }
                },
                fail: (ret) => {
                    console.error(ret);
                } 
            }) 
        }
    })
}
 
 
// 获取当前页面链接和参数

function getCurrentPageUrlWithArgs() {
    const pages = getCurrentPages();
    	const currentPage = pages[pages.length - 1]; //当前页面的全部信息
		console.log(currentPage);
    	const route = currentPage.route; //当前路由的路径 pages/login/login
		console.log(route);
    	const options = currentPage.options; //url里面的参数json类型
    let urlWithArgs = `/${url}?`;	
    for (let key in options) {
        const value = options[key];
        urlWithArgs += `${key}=${value}&`;
    }
    urlWithArgs = urlWithArgs.substring(0, urlWithArgs.length - 1);
    return urlWithArgs;
}
 
function chars() {
    let chars = "0123456789";
    /****默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1****/
    let maxPos = chars.length;
    let code = "";
    for (let i = 0; i < 6; i++) {
        code += chars.charAt(Math.floor(Math.random() * maxPos));
    }
    return code;
}
function toDateDetail(number) {
    if(!number)return '';
    // var n = number * 1000
    var date = new Date(number);
    var Y = date.getFullYear() + "-";
    var M =
        (date.getMonth() + 1 < 10 ?
            "0" + (date.getMonth() + 1) :
            date.getMonth() + 1) + "-";
    var D = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
    var h = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
    var mm = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
    var s = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
    return Y + "" + M + "" + D + " " + h + ":" + mm + ":" + s;
}
 
/**
 *   appId            ->      小程序ID             类型:String
 *   appToken         ->      自定义               类型:String
 *   token            ->      当前用户token        类型:String
 *   openid           ->      当前用户openid       类型:String
 *   triggerType      ->      事件类型             类型:String
 *   pageInfo {       ->      当前页面信息         类型:Object
 *     pageUrl:       ->      不带参数             类型:String
 *     url:           ->      带参数               类型:String
 *     ...params      ->      当前页面所有参数       类型:Object
 *   }
 *   entryTime        ->      进入页面时间          类型:Numbe
 *   leaveTime        ->      离开当前页面时间      类型:Numbe
 *   stayTime         ->      停留时长             类型:Number   单位:ms
 *   sysTemInfo       ->      设备信息             类型:Object
 */
 
export default {
    myMta
};