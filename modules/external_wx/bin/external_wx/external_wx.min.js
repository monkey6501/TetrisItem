window["version"] = "2018-0409";
window["lang"] = "CN";
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
		url: "https://gs1.hyhygame.com/httpsClickHeroes/serverConfig.json?v=" + window["version"],
		data: {},
		header: {
			'content-type': 'application/json' // 默认值
		},
		success: function (res) {
			var serverConfigData = res.data;
			var serverInfo = serverConfigData.serverConfig.configs;
			platform = serverConfigData.serverConfig.configs.platform;
			if (serverInfo != null) {
				serverListUrl = serverInfo.serverListUrl;
				gamePre = serverInfo.gamePre;
				resourceUrl = serverInfo.resourceUrl;
				rankUrl = serverInfo.rankUrl;
				isAD = serverInfo.isAD;
				isServerList = serverInfo.isServerList;
			}
			hysdk.hysdk_setid(1352);
			callback();
		},
		fail: function (err) {
			console.log(err)
		}
	});
}

function setCenterUrl(url) {
	console.log("20180927_2", url)
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
			hysdk.hysdk_report(1);
			wx.request({
				url: "https://gs1.hyhygame.com/CenterHeroes/game/100/1",
				data: {
					js_code: res.code
				},
				header: {
					'content-type': 'application/json' // 默认值
				},
				success: function (res) {
					callback(res, self)
				},
				fail: function (err) {
					console.log("微信登陆失败!")
				}
			});
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

function connectSocket(url, callback, self) {
	wx.connectSocket({
		url: url,
		success: (res) => {
			callback(res, self)
		}
	})
}

function onSocketOpen(callback) {
	wx.onSocketOpen(function (res) {
		callback(res, self)
	})
}

function onSocketMessage(callback) {
	wx.onSocketMessage(function (res) {
		callback(res, self)
	})
}

function sendSocketMessage(msg) {
	wx.sendSocketMessage({
		data: msg,
		success: (res) => {
			console.log(res)
		},
		fail: (res) => {
			console.log(res)
		}
	})
}

function getLaunchOptionsSync() {
	return wx.getLaunchOptionsSync();
}

function onNavigateBackMiniProgram() {
	wx.navigateBackMiniProgram();
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
	console.log("setUserCloudStorage 上报数据");
	wx.setUserCloudStorage({
		KVDataList: [{ key: "a1", value: data + "" }],
		success: function (res) {
		},
		fail: function (res) {
		},
		complete: function (res) {
		},
	})
}

//米大师支付接口
function payment(buyQuantity, productId, userName, sessionKey, playerId, url) {
	wx.requestMidasPayment(
		{
			mode: 'game',//支付的类型，不同的支付类型有各自额外要传的附加参数
			env: '0',//环境配置 0 米大师正式环境   1 米大师沙箱环境
			offerId: '1450017881',//在米大师侧申请的应用 id
			currencyType: 'CNY',//人民币币种
			platform: "android",
			buyQuantity: buyQuantity,//购买数量
			zoneId: "1",
			success: function (res) {
				wx.request({
					url: url,
					data: {
						userName: userName,
						sessionKey: sessionKey,
						playerId: playerId,
						productId: productId,
					},
					header: {
						'content-type': 'application/json' // 默认值
					},
					success: function (res) {

					},
					fail: function (err) {
						console.log("米大师支付接口失败!")
					}
				});
			},
			fail: function (res) {
				console("支付失败");
				console(res);
			}
		})
}


function getSystemInfo(callback) {
	wx.getSystemInfo({
		success: function (res) {
			callback(res);
		}
	});
}

function exitMiniProgram() {
	wx.exitMiniProgram({
		success: function (res) {
		}
	});
}

function hysdkReport(type) {
	hysdk.hysdk_report(type);
}

function onShow(callback) {
	wx.onShow(callback);
}

function onHide(callback) {
	wx.onHide(callback);
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

function getOpenDataContext() {
	return wx.getOpenDataContext();
}

function setClipboardData(value, callback) {
	wx.setClipboardData({
		data: value,
		success: function (res) {
			if (callback) callback();
		}
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

function triggerGC() {
	wx.triggerGC();
}

function setKeepScreenOn() {
	wx.setKeepScreenOn({
		keepScreenOn: true
	})
}

function clearStorage(callback) {
	wx.clearStorage({
		complete: function (res) {
			callback();
		}
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
	external.getServerListUrl = function () { return serverListUrl };
	external.getResourceUrl = function () { return resourceUrl };
	external.getrankUrl = function () { return rankUrl };
	external.getIsAD = function () { return isAD };
	external.getIsServerList = function () { return isServerList };
	external.getGamePre = function () { return gamePre };
	external.jsPopPayTips = function (score) { };
	external.newRequest = newRequest;
	external.sendRequestJson = sendRequestJson;
	external.getLocation = getLocation;
	external.getUserInfo = getUserInfo;
	external.getUnionId = getUnionId;
	external.connectSocket = connectSocket;
	external.onSocketOpen = onSocketOpen;
	external.onSocketMessage = onSocketMessage;
	external.sendSocketMessage = sendSocketMessage;
	external.onNavigateBackMiniProgram = onNavigateBackMiniProgram;
	external.getLogin = login;
	external.shareMessage = shareMessage;
	external.payment = payment;
	external.loadServerConfig = loadServerConfig;
	external.setCenterUrl = setCenterUrl;
	external.getCenterUrl = function () { return centerUrl };
	external.getLaunchOptionsSync = getLaunchOptionsSync;
	external.getFriendList = getFriendList;
	external.setUserCloudStorage = setUserCloudStorage;
	external.getSystemInfo = getSystemInfo;
	external.exitMiniProgram = exitMiniProgram;
	external.hysdkReport = hysdkReport;
	external.onShow = onShow;
	external.onHide = onHide;
	external.showShareMenu = showShareMenu;
	external.onShareAppMessage = onShareAppMessage;
	external.getOpenDataContext = getOpenDataContext;
	external.sendOpenDataContext = sendOpenDataContext;
	external.setClipboardData = setClipboardData;
	external.showLoading = showLoading;
	external.hideLoading = hideLoading;
	external.triggerGC = triggerGC;
	external.setKeepScreenOn = setKeepScreenOn;
	external.clearStorage = clearStorage;
	external.createRewardedVideoAd = createRewardedVideoAd;
	return external;
})();
window.ext = ext;
