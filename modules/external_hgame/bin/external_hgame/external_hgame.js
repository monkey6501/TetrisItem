window["version"] = "2018-0409"
/////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////
// loadServerConfig();
var hGame = require('hgame-sdk-wegame.js');
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
var shareUrl;
var rankUrl;
var isAD = false;
var isServerList = true;

var hgameSdk = new window.hGame({
	"game_key": 'e54e9c90b2ccad16',
});

function loadServerConfig(callback) {
	wx.request({
		url: "https://gs1.weegame.cn/httpsClickHeroes/serverConfig.json?v=" + Math.random(),
		data: {},
		success: function (res) {
			var serverConfigData = res.data;
			var serverInfo = serverConfigData.serverConfig.configs;
			platform = serverConfigData.serverConfig.configs.platform;
			console.log("服务器数据为" + JSON.stringify(serverInfo) + "`````````````````````````````````````````````````````````````````");
			if (serverInfo != null) {
				serverListUrl = serverInfo.serverListUrl;
				gamePre = serverInfo.gamePre;
				resourceUrl = serverInfo.resourceUrl;
				rankUrl = serverInfo.rankUrl;
				isAD = serverInfo.isAD;
				isServerList = serverInfo.isServerList;
			}
			callback();
		},
		fail: function (err) {
			console.log(err)
		}
	});
}

function setCenterUrl(url) {
	centerUrl = url;
}

function initHgameSdk(callback, self) {
	hgameSdk.ready(
		function () {
			hgameSdk.getPlatform(function (result) {
				callback(self, result)
			})
		});
}

function hgameLogin(callback) {
	hgameSdk.login(function (data) {
		console.log("hgameLogin :", JSON.stringify(data))
		shareUrl = data.game_url;
		var str = "loginType=" + data.login_type + "&loginTicket=" + data.ticket;
		var url = "https://gs1.weegame.cn/CenterHeroes/game/104/1";
		// var url = centerUrl + "104/1";
		hgameRequest(url, str, function (data) {
			callback(data)
		});
	})
}

function getPlatformInfo(callback, self) {
	hgameSdk.getPlatform(function (result) {
		callback(self, result)
	})
}

function hgamePay(data) {
	var str = "userName=" + data.userName + "&playerId=" + data.playerId + "&productId=" + data.productId;
	// var url = "https://quanwang.7road.net/ClickHeroes/game/104/2";
	var url = centerUrl + "104/2";
	hgameRequest(url, str, function (data) {
		var pay_data = data;
		hgameSdk.pay(pay_data, "", function (result) {
		});
	});
}

function gameReport(action, baseData, extendData) {
	hgameSdk.gameReport(action, baseData, extendData, function (data) {
	})
}

function hgameShare(shareData, callback) {
	shareData.url = shareUrl;
	hgameSdk.share(shareData, function (data) {
		//这里是回调函数
		console.log("分享回调：");
		console.log(JSON.stringify(data))
		if (data.code == 0) {
			callback(data)
		}
	})
}

function getFriendList(callback) {
	var mydata = null
	wx.getFriendCloudStorage({
		type: "a1",
		success: function (res) {
			mydata = res.data;
			callback(mydata);
		},
		fail: function (res) {
		},
		complete: function (res) {
		}
	});
}

function setUserCloudStorage(data) {
	let actionKey = "a1"
	wx.setUserCloudStorage({
		KVDataList: [{
			key: "score",
			value: 100
		}, {
			key: actionKey,
			value: data
		}],
		success: function (res) {
		},
		fail: function (res) {
		},
		complete: function (res) {
		},
	})
}

function doExtraAction(type, data, callback) {
	var str = "open_id=" + data.open_id;
	// var url = "https://quanwang.7road.net/ClickHeroes/game/104/5";
	var url = centerUrl + "104/5";
	hgameRequest(url, str, function (data) {
		hgameSdk.doExtraAction(type, data, function (result) {
			//这里是回调函数
			callback(result)
		})
	});
}

function hgameRequest(url, data, callback) {
	wx.request({
		url: url,
		method: "POST",
		data: data,
		success: function (res) {
			callback(res.data);
		},
		fail: function (err) {
			console.log(err)
		}
	});
}

var rewardVideoAd;
function hgameShowVideoAd(callback) {
	let callHandler = callback;
	if (!rewardVideoAd) {
		console.log("hgame reward video 创建")
		rewardVideoAd = hgameSdk.createRewardedVideoAd({ adUnitId: "adunit-3ddcd57313161f71" });
		rewardVideoAd.onClose((resp) => {
			console.log("hgame reward video ad close:", JSON.stringify(resp))
			let isEnd = 0;
			if (resp && resp.isEnded || resp === undefined) {
				console.log("hgame reward video ad close ok")
				isEnd = 1;
				callHandler();
			} else {
				console.log("hgame reward video ad close early")
				// callback(false);
				//视频没看完
			}
		})
	}


	if (rewardVideoAd) {
		rewardVideoAd.show().then(() => {

		}).catch(() => {
			rewardVideoAd.load().then(() => {
				rewardVideoAd.show().then(() => {
				});
			}).catch(() => { });
		})
	}


	// console.log("hgame reward video 开始")
	// if (!rewardVideoAd) {
	// 	console.log("hgame reward video 有效")
	// 	rewardVideoAd.show().then(() => {

	// 	}).catch(() => {
	// 		rewardVideoAd.load().then(() => {
	// 			rewardVideoAd.show().then(() => {
	// 			});
	// 		}).catch(() => { });
	// 	})

	// 	rewardVideoAd.onClose((resp) => {
	// 		console.log("hgame reward video ad close:", JSON.stringify(resp))
	// 		let isEnd = 0;
	// 		if (resp && resp.isEnded || resp === undefined) {
	// 			console.log("hgame reward video ad close ok")
	// 			isEnd = 1;
	// 			callback();
	// 		} else {
	// 			console.log("hgame reward video ad close early")
	// 			//视频没看完
	// 		}
	// 	})
	// } 

}

function reConnect() {
	var desGameId = 3321;
	BK.QQ.skipGame(desGameId, "");
}

function loadingHide() {
	if (!window["Logo_Fading_Complete"]) return;
	var div = document.getElementById("loadingMain");
	if (div && div.parentNode) {
		div.parentNode.removeChild(div);
		div.style.display = "none";
	}

	var loadDiv = document.getElementById("loadLogo");
	if (loadDiv && loadDiv.parentNode) {
		loadDiv.parentNode.removeChild(loadDiv);
		loadDiv.style.display = "none";
	}

	var troyLogoDiv = document.getElementById("troyLogo");
	if (troyLogoDiv && troyLogoDiv.parentNode) {
		troyLogoDiv.parentNode.removeChild(troyLogoDiv);
		troyLogoDiv.style.display = "none";
	}

	var tipsLogoDiv = document.getElementById("tipsLogo");
	if (tipsLogoDiv && tipsLogoDiv.parentNode) {
		tipsLogoDiv.parentNode.removeChild(tipsLogoDiv);
		tipsLogoDiv.style.display = "none";
	}
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
	external.getIsServerList = function () { return isServerList };
	external.getResourceUrl = function () { return resourceUrl };
	external.getIsAD = function () { return isAD };
	external.getrankUrl = function () { return rankUrl };
	external.getGamePre = function () { return gamePre };
	external.getPlayerId = function () { return playerId };
	external.getRelease = function () { return release };
	external.getHttpHead = function () { return httpHead };
	external.getParameters = function () { return null };
	external.beginFBGameSence = function () { };
	external.showFacebookAd = function (type, placementId, fromId, missioinId, param) { };
	external.preloadingFBAdv = function (placementId) { };
	external.JsFBGetFriends = function () { };
	external.jsPopPayTips = function (score) { };
	external.loadingHide = loadingHide;
	external.newRequest = newRequest;
	external.setCenterUrl = setCenterUrl

	external.initHgameSdk = initHgameSdk
	external.getPlatformInfo = getPlatformInfo
	external.hgameLogin = hgameLogin
	external.hgamePay = hgamePay
	external.gameReport = gameReport
	external.hgameShare = hgameShare
	external.hgameShowVideoAd = hgameShowVideoAd;
	external.loadServerConfig = loadServerConfig;
	external.doExtraAction = doExtraAction;
	external.getFriendList = getFriendList;
	external.setUserCloudStorage = setUserCloudStorage;
	external.reConnect = reConnect;
	return external;
})();
window.ext = ext;
