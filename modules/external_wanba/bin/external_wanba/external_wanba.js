window["version"] = "2018-0409"
/////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////
// loadServerConfig();
var release;
var httpHead;
var isIos = false;
var centerUrl = null;
var serverListUrl = null;
var iosServerListUrl = null;
var resourceUrl = null;
var gamePre = null;
var playerId = null;
var isSelectHead = false;
var isEditNickName = false;
var isSkipLogoPage = false;
var isLog = false;
var platform = null;
var parameters = null;
var isShowAdv = false;
var rankUrl;
var isAD = false;
var payInfo = 1;
var isServerList = true;

function loadServerConfig(callback) {
	var xhr = new XMLHttpRequest();
	xhr.open('GET', './serverConfig.json?v=' + window["version"], true);
	function loadComplete() {
		xhr.removeEventListener("load", loadComplete);
		var serverConfigData = JSON.parse(xhr.response);
		var serverInfo = serverConfigData.serverConfig.configs;
		platform = serverConfigData.serverConfig.configs.platform;
		if (serverInfo != null) {
			serverListUrl = serverInfo.serverListUrl;
			iosServerListUrl = serverInfo.iosServerListUrl;
			gamePre = serverInfo.gamePre;
			resourceUrl = serverInfo.resourceUrl;
			rankUrl = serverInfo.rankUrl;
			isAD = serverInfo.isAD;
			isServerList = serverInfo.isServerList;
		}
		// hysdk.hysdk_setid(1352);
		console.log("serverConfig数据为" + JSON.stringify(serverInfo) + "`````````````````````````````````````````````````````````````````");
		callback();
	}
	xhr.addEventListener("load", loadComplete);
	xhr.send(null);
}

function startWanBaSdk(callback) {
	window.getOpenKey(function (d) {
		console.log("startWanBaSdk :")
		console.log(d)
		// hysdk.hysdk_report(1);
		appid = window.OPEN_DATA.appid;
		var openid = window.OPEN_DATA.openid;
		var pf = window.OPEN_DATA.pf;
		var openKey = d.data.openkey;
		if (window.OPEN_DATA.platform == 2) {
			isIos = true;
			httpHead = iosServerListUrl;
		}
		else {
			isIos = false;
			httpHead = serverListUrl;
		}
		parameters = {
			openid: openid,
			appid: appid,
			openKey: openKey,
			pf: pf
		};
		console.log("startWanBaSdk parameters:")
		console.log(parameters)
		callback(parameters);
	});
}

function setCenterUrl(url) {
	centerUrl = url;
}

function shareMessage(shareData, callback) {
	console.log("window.OPEN_DATA.shareurl :");
	console.log(window.OPEN_DATA.shareurl);
	mqq.invoke('ui', 'setOnShareHandler', function (type) {
		mqq.invoke('ui', 'shareMessage',
			{
				title: shareData.title,
				desc: shareData.desc,
				share_type: type,
				share_url: window.OPEN_DATA.shareurl + "&shareKey=" + shareData.shareKey,
				image_url: shareData.image_url,
				back: true
			}, function (result) {
				//result
				if (result.retCode == 0) {
					callback(result);
				}
			});
	});
	mqq.invoke('ui', 'showShareMenu', function (result) {
		console.log(JSON.stringify(resu))
	});
}


function exchangeProduct(data, cancelBack) {
	console.log(JSON.stringify(data))
	payCancelBack = cancelBack;
	var str = "?productId=" + data.productId + "&playerId=" + data.playerId;
	var url = centerUrl + "101/1" + str;
	newRequest(url, function (result) {
		console.log(result)
		var info = JSON.parse(result);
		if (info.code == 42) {
			console.log("[钱不够，去充值]");
			wanbaPay(data);
		}
	}, true);
}

function wanbaPay(data) {
	payInfo = data;
	window.popPayTips({
		version: 'v2',
		defaultScore: data.price,
		appid: window.OPEN_DATA.appid
	});
}

window.__paySuccess = function () {
	//支付成功执行
	console.log("[支付成功执行]");
	exchangeProduct(payInfo);
}

window.__payError = function () {
	//支付失败执行
	console.log("[支付失败执行]");
}

var payCancelBack = null;
window.__payClose = function () {
	//关闭对话框执行,IOS下无效
	payCancelBack();
	console.log("[关闭对话框执行,IOS下无效]");
}

function addShortcut(callback) {
	mqq.ui.addShortcut({
		action: 'web',
		title: '小兵快跑',
		icon: window.OPEN_DATA.appicon,
		url: window.OPEN_DATA.jumpurl,
		callback: callback(ret)
	});
}

function getSystemInfo(callback) {
	mqq.invoke("device", "getDeviceInfo",
		function (result) {
			console.log(JSON.stringify(result));
			callback(result.data.modelVersion);
			/**
				 result.data
				String systemName    //系统名，如”iPhone OS”
				String systemVersion    //系统版本，如”6.0”
				String model        //机器系列，如”iPhone”, “iPod touch”             http://theiphonewiki.com/wiki/Models model参见链接里的indetifier
				String modelVersion    //机型，如”iPhone 6”
				String identifier [4.7+]    //设备唯一标识
			*/
		}
	);
}

function setKeepScreenOn() {
	mqq.invoke("device", "setScreenStatus", { status: true });
}

function ShowVideoAd(callback) {
	let myData = {
		appid: window.OPEN_DATA.appid,
		openid: window.OPEN_DATA.openid,
		screen: 0,
		factoryId: 3392307238
	}
	mqq.invoke('Qzone', 'OpenGDTVideoPage', myData, function (result) { console.log(JSON.stringify(result)) });
}

function reportInfo(type, data) {
	switch (type) {
		case "register":
			window.reportRegister();
			break;
		case "login":
			window.reportLogin();
			break;
	}
}

function getLaunchOptionsSync() {

}

function hysdkReport(type) {
	hysdk.hysdk_report(type);
}

function newRequest(url, callback, cache) {
	var r = Date.now() + "" + (Math.floor(Math.random() * 100000));
	var xhrReq = new XMLHttpRequest();
	if (cache) {
		xhrReq.open("GET", url, true);
	} else {
		xhrReq.open("GET", url + "&vr=" + r, true);
	}
	xhrReq.addEventListener("load", function (oEvent) {
		callback(xhrReq.response);
	});
	xhrReq.send(null);
}

var ext = (function () {
	var external = {};
	external.getIsIos = function () { return isIos };
	external.getPlatform = function () { return platform };
	external.getIsShowAdv = function () { return isShowAdv };
	external.getIsSelectHead = function () { return isSelectHead };
	external.getIsEditNickName = function () { return isEditNickName };
	external.getIsSkipLogoPage = function () { return isSkipLogoPage };
	external.getIsLog = function () { return isLog };
	external.getIsServerList = function () { return isServerList };
	external.getCenterUrl = function () { return centerUrl };
	external.getServerListUrl = function () { return serverListUrl };
	external.getResourceUrl = function () { return resourceUrl };
	external.getGamePre = function () { return gamePre };
	external.getPlayerId = function () { return playerId };
	external.getRelease = function () { return release };
	external.getHttpHead = function () { return httpHead };
	external.getrankUrl = function () { return rankUrl };
	external.getIsAD = function () { return isAD };
	external.getParameters = function () { return null };
	external.beginFBGameSence = function () { };
	external.showFacebookAd = function (type, placementId, fromId, missioinId, param) { };
	external.preloadingFBAdv = function (placementId) { };
	external.JsFBGetFriends = function () { };
	external.jsPopPayTips = function (score) { };
	external.setCenterUrl = setCenterUrl
	external.newRequest = newRequest;
	external.loadServerConfig = loadServerConfig;
	external.startWanBaSdk = startWanBaSdk;
	external.shareMessage = shareMessage;
	external.wanbaPay = wanbaPay;
	external.exchangeProduct = exchangeProduct;
	external.ShowVideoAd = ShowVideoAd;
	external.setKeepScreenOn = setKeepScreenOn;
	external.getSystemInfo = getSystemInfo;
	external.getLaunchOptionsSync = getLaunchOptionsSync;
	external.hysdkReport = hysdkReport;
	external.addShortcut = addShortcut;
	return external;
})();
window.ext = ext;
