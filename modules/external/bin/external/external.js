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
		console.log("serverConfig数据：" + JSON.stringify(serverInfo) + "`````````````````````````````````````````````````````````````````");
		if (serverInfo != null) {
			platform = serverInfo.platform;
			resourceUrl = serverInfo.resourceUrl;
		}
		callback();
	}
	xhr.addEventListener("load", loadComplete);
	xhr.send(null);
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
	external.getPlatform = function () { return platform };
	external.getCenterUrl = function () { return centerUrl };
	external.getServerListUrl = function () { return serverListUrl };
	external.getResourceUrl = function () { return resourceUrl };
	external.getGamePre = function () { return gamePre };
	external.getPlayerId = function () { return playerId };
	external.getRankUrl = function () { return rankUrl };
	external.getIsAD = function () { return isAD };
	external.getIsDebug = function () { return isDebug };
	external.newRequest = newRequest;
	external.loadServerConfig = loadServerConfig;
	return external;
})();
window.ext = ext;
