window["version"] = "2018-1130";
/////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////
var serverListUrl = null;
var resourceUrl = null;
var platform = "wx";
var gamePre = null;
var rankUrl;
var centerUrl = null;
var isAD = false;
var isServerList = true;

function loadServerConfig(callback) {
	wx.request({
		url: "./serverConfig.json",
		data: {},
		header: {
			'content-type': 'application/json' // 默认值
		},
		success: function (res) {
			var serverConfigData = res.data;
			var serverInfo = serverConfigData.serverConfig.configs;
			if (serverInfo != null) {
				platform = serverInfo.platform;
				resourceUrl = serverInfo.resourceUrl;
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

function sendRequestJson(url, callback, self) {
	wx.request({
		url: url,
		header: {
			'content-type': 'application/json' // 默认值
		},
		success: function (res) {
			callback(res, self)
		},
		fail: function (err) {
		}
	});
}

function login(callback, self) {
	wx.login({
		success: function (res) {
			console.log("微信登陆失败!")
		}
	});
}

function getUserInfo(callback, self) {
	wx.getSetting({
		success: function (res) {
			console.log(res);
			if (res.authSetting['scope.userInfo']) {
				// 已经授权，可以直接调用 getUserInfo 获取头像昵称
				wx.getUserInfo({
					success: function (res) {
						callback(res, self);
						hysdk.hysdk_report(2);
					}
				})
			}
			else {
				wx.authorize({
					scope: 'scope.userInfo',
					success(res) {
						wx.getUserInfo({
							success: function (res) {
								callback(res, self);
								hysdk.hysdk_report(2);
							}
						})
					}
				})
			}
		}
	})
}

function getUnionId(url, unionData, callback, self) {
	wx.request({
		url: url,
		data: {
			session_key: unionData.sessionKey,
			encryptedData: unionData.encryptedData,
			iv: unionData.iv,
		},
		header: {
			'content-type': 'application/json' // 默认值
		},
		success: function (res) {
			console.log(res)
			callback(res, self)
		},
		fail: function (err) {
		}
	});
}

function getLocation(callback, self) {
	wx.getLocation({
		success: function (res) {
			callback(res, self);
		}
	})
}

function newRequest(url, data, callback, id, self) {
	wx.request({
		url: url,
		data: {
			js_code: data.code, gameId: id
		},
		header: {
			'content-type': 'application/json' // 默认值
		},
		success: function (res) {
			callback(res, self);
		},
		fail: function (err) {
			console.log(err)
		}
	});
}

function shareMessage(shareData, callback) {
	wx.shareAppMessage({
		title: shareData.title,
		imageUrl: shareData.imgUrl,
		query: "shareKey=" + shareData.shareKey,
		success: (res) => {
			console.log("shareMessage -- 分享成功");
		},
		fail: (res) => {
			console.log("shareMessage -- 分享失败");
		}
	});
	if (callback) callback();
}

function getFriendList(callback) {
	var mydata = null
	wx.getFriendCloudStorage({
		keyList: ["a1"],
		success: function (res) {
			mydata = res.data;
			callback(Number(mydata));
		},
		fail: function (res) {
		},
		complete: function (res) {
		}
	});
}

function setUserCloudStorage(data) {
	console.log(data);
	wx.setUserCloudStorage({
		KVDataList: [{ key: "score", value: data }],
		success: function (res) {
		},
		fail: function (res) {
		},
		complete: function (res) {
		},
	})
}

function setStorage(value) {
	wx.setStorage({
		key: 'score',
		data: value
	})
}

function getStorage() {
	new Promise((resolve, reject) => {
		wx.getStorage({
			key: 'score',
			success(res) {
				console.log(res.data)
				resolve(res.data);
			}
		})
	})
}

function getSystemInfo(callback) {
	wx.getSystemInfo({
		success: function (res) {
			callback(res);
		}
	});
}

function showShareMenu() {
	wx.showShareMenu({
		withShareTicket: true
	});
}

function onShareAppMessage() {
	wx.onShareAppMessage(function () {
		return {
			title: '小兵快跑OL',
			imageUrl: "https://quanwang.7road.net/httpsClickHeroes/resource/Common/share/share_7.jpg"
		}
	})
}

function sendOpenDataContext(command, type) {
	let openContext = wx.getOpenDataContext();
	openContext.postMessage({
		command: command,
		type: type
	});
}


function showLoading() {
	wx.showLoading({
		title: "小兵快跑",
		success: function (res) {
		}
	})
}

function hideLoading() {
	wx.hideLoading({
		success: function (res) {

		}
	})
}

function setKeepScreenOn() {
	wx.setKeepScreenOn({
		keepScreenOn: true
	})
}

function createRewardedVideoAd(adId, callback, failBack) {
	let rewardedVideoAd = wx.createRewardedVideoAd({ adUnitId: adId })
	rewardedVideoAd.show()
		.catch(err => {
			console.log("createRewardedVideoAd show");
			rewardedVideoAd.load()
				.then(() => rewardedVideoAd.show())
		})
	rewardedVideoAd.onClose(res => {
		console.log("createRewardedVideoAd close");
		// 用户点击了【关闭广告】按钮
		// 小于 2.1.0 的基础库版本，res 是一个 undefined
		if (res && res.isEnded || res === undefined) {
			callback(true);
		}
		else {
			// 播放中途退出，不下发游戏奖励
			callback(false);
		}
	})
	rewardedVideoAd.onError(
		res => {
			console.log("RewardedVideoAd errCode :" + res.errCode);
			failBack();
			callback(true);
		}
	)
}

var ext = (function () {
	var external = {};
	external.getPlatform = function () { return platform };
	external.newRequest = newRequest;
	external.sendRequestJson = sendRequestJson;
	external.getLocation = getLocation;
	external.getUserInfo = getUserInfo;
	external.getUnionId = getUnionId;
	external.getLogin = login;
	external.shareMessage = shareMessage;
	external.loadServerConfig = loadServerConfig;
	external.setCenterUrl = setCenterUrl;
	external.getCenterUrl = function () { return centerUrl };
	external.getFriendList = getFriendList;
	external.setUserCloudStorage = setUserCloudStorage;
	external.getSystemInfo = getSystemInfo;
	external.showShareMenu = showShareMenu;
	external.onShareAppMessage = onShareAppMessage;
	external.sendOpenDataContext = sendOpenDataContext;
	external.showLoading = showLoading;
	external.hideLoading = hideLoading;
	external.setKeepScreenOn = setKeepScreenOn;
	external.createRewardedVideoAd = createRewardedVideoAd;
	external.setStorage = setStorage;
	external.getStorage = getStorage;
	return external;
})();
window.ext = ext;
