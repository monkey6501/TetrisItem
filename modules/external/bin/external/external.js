window["version"] = "2018-0409"
/////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////
// loadServerConfig();
var release;
var httpHead;
var isIos = false;
var centerUrl = null;
var serverListUrl = null;
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
var isServerList = true;

function loadServerConfig(callback) {
	var xhr = new XMLHttpRequest();
	xhr.open('GET', './serverConfig.json?v=' + window["version"], true);
	function loadComplete() {
		xhr.removeEventListener("load", loadComplete);
		var serverConfigData = JSON.parse(xhr.response);
		var serverInfo = serverConfigData.serverConfig.configs;
		platform = serverConfigData.serverConfig.configs.platform;
		console.log("服务器数据为" + JSON.stringify(serverInfo) + "`````````````````````````````````````````````````````````````````");
		console.log("服务器" + JSON.stringify(serverInfo) + "`````````````````````````````````````````````````````````````````");
		console.log("platform:" + platform);
		if (serverInfo != null) {
			serverListUrl = serverInfo.serverListUrl;
			gamePre = serverInfo.gamePre;
			resourceUrl = serverInfo.resourceUrl;
			rankUrl = serverInfo.rankUrl;
			isAD = serverInfo.isAD;
			isServerList = serverInfo.isServerList;
		}
		callback();
	}
	xhr.addEventListener("load", loadComplete);
	xhr.send(null);
}

function setCenterUrl(url) {
	centerUrl = url;
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
	external.getIsServerList = function () { return isServerList };
	return external;
})();
window.ext = ext;
