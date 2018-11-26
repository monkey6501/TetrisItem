var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var SdkManager = (function () {
    function SdkManager() {
        this.reportMissison = 0;
        this.reportRebirthNum = 0;
    }
    Object.defineProperty(SdkManager, "getInstance", {
        get: function () {
            if (!SdkManager._instance) {
                SdkManager._instance = new SdkManager();
            }
            return SdkManager._instance;
        },
        enumerable: true,
        configurable: true
    });
    SdkManager.prototype.hGameReport = function (action) {
        var baseData = {
            "game_key": 'e54e9c90b2ccad16',
            "open_id": PlayerInfoManager.getInstance.info.hgameInfo.open_id,
            "role": PlayerInfoManager.getInstance.playerMsg.playerId.toString(),
            "nickname": PlayerInfoManager.getInstance.playerMsg.nickName,
            "area": 'HOODINN',
            "group": '1' //游戏服务器标志
        };
        var extendData;
        switch (action) {
            case "enterGame":
                extendData = {
                    "level": PlayerInfoManager.getInstance.playerMsg.missionId,
                    "vipLevel": 0,
                    "score": 0,
                    "isNew": LoginManager.getInstance.isNew,
                };
                break;
            case "levelUpgrade":
                extendData = {
                    "level": PlayerInfoManager.getInstance.playerMsg.HighestMissionId
                };
                break;
            case "startGame":
                extendData = {
                    "level": PlayerInfoManager.getInstance.playerMsg.missionId
                };
                break;
        }
        ext.gameReport(action, baseData, extendData);
    };
    SdkManager.prototype.paySdk = function (id) {
        if (GameConfig.IsIos()) {
            return MessageManger.getInstance.showText(LanguageManager.getInstance.getLanguageText("mondes.ioscharge.text"));
        }
        var vo = GlobleData.getData(GlobleData.ChargeVO, id);
        switch (ext.getPlatform()) {
            case "hgame":
                var data = {
                    "userName": PlayerInfoManager.getInstance.info.hgameInfo.open_id,
                    "playerId": PlayerInfoManager.getInstance.playerMsg.playerId,
                    "productId": id
                };
                ext.hgamePay(data);
                break;
            case "wx":
                var url = LoginManager.getInstance.getRequestUrl(LoginManager.getInstance.showServer.ssl, LoginManager.getInstance.showServer.host, LoginManager.getInstance.showServer.httpPort, "100/6");
                ext.payment(vo.price * 10, vo.productId, PlayerInfoManager.getInstance.userName, PlayerInfoManager.getInstance.sessionKey, PlayerInfoManager.getInstance.playerId, url);
                break;
            case "wanba":
                var exchangeData = {
                    playerId: PlayerInfoManager.getInstance.playerId,
                    price: vo.price * 10
                };
                if (ext.getIsIos()) {
                    exchangeData.productId = vo.iosItemId;
                }
                else {
                    exchangeData.productId = vo.androidItemId;
                }
                ext.exchangeProduct(exchangeData, this.payFail);
                break;
            default:
                SocketManager.getInstance.out.sendSimulationCharge(Number(id));
                break;
        }
    };
    SdkManager.prototype.payFail = function () {
        MessageManger.getInstance.showText(LanguageManager.getInstance.getLanguageText("models.sdkManager.payFail"));
    };
    /**不用这个，用下面那个通用的分享接口 */
    SdkManager.prototype.hGameShare = function (shareId, callBack, extendData) {
        if (extendData === void 0) { extendData = null; }
        var shareVo = ActivityManager.getInstance.getShareTypeList(shareId)[0];
        switch (ext.getPlatform()) {
            case "hgame":
                var shareData = {
                    open_id: PlayerInfoManager.getInstance.info.hgameInfo.open_id,
                    game_key: "e54e9c90b2ccad16",
                    timestamp: new Date().valueOf(),
                    title: "进击的战神",
                    message: shareVo.desc,
                    shareKey: PlayerInfoManager.getInstance.playerId + "," + shareId,
                    imgUrl: "https://quanwang.7road.net/httpsClickHeroes/resource/Common/share/" + shareVo.icon + ".jpg",
                    extend: extendData //option, 这里是额外的参数，接入各平台不同
                };
                ext.hgameShare(shareData, callBack);
                break;
        }
    };
    SdkManager.prototype.totalShare = function (shareId, sucCallBack, failCallBack) {
        if (failCallBack === void 0) { failCallBack = null; }
        var shareVo = ActivityManager.getInstance.getShareTypeList(shareId)[0];
        var str;
        if (shareId == 101) {
            str = LanguageManager.getInstance.languageReplace(shareVo.desc, [PlayerInfoManager.getInstance.playerMsg.HighestMissionId]);
        }
        else {
            str = shareVo.desc;
        }
        switch (ext.getPlatform()) {
            case "hgame":
                var shareData = {
                    open_id: PlayerInfoManager.getInstance.info.hgameInfo.open_id,
                    game_key: "e54e9c90b2ccad16",
                    timestamp: new Date().valueOf(),
                    title: "进击的战神",
                    message: str,
                    shareKey: PlayerInfoManager.getInstance.playerId + "," + shareId,
                    imgUrl: "https://quanwang.7road.net/httpsClickHeroes/resource/Common/share/" + shareVo.icon + ".jpg",
                    extend: {} //option, 这里是额外的参数，接入各平台不同
                };
                ext.hgameShare(shareData, sucCallBack);
                break;
            case "wx":
                var shareWXData = {
                    title: shareVo != null ? str : "分享",
                    shareKey: PlayerInfoManager.getInstance.playerId + "," + shareId,
                    imgUrl: PathManager.Instance.Share.replace("{0}", shareVo.icon),
                };
                SdkManager.getInstance.wxHysdkReport(4);
                ext.shareMessage(shareWXData, sucCallBack);
                break;
            case "wanba":
                var shareWanbaData = {
                    title: "小兵快跑",
                    desc: str,
                    shareKey: PlayerInfoManager.getInstance.playerId + "," + shareId,
                    image_url: PathManager.Instance.Share.replace("{0}", shareVo.icon)
                };
                ext.shareMessage(shareWanbaData, sucCallBack);
                // SdkManager.getInstance.wxHysdkReport(4);
                break;
            case "dev":
                sucCallBack();
                break;
            default:
                break;
        }
    };
    SdkManager.prototype.getFriendList = function (data, callBack) {
        switch (ext.getPlatform()) {
            case "hgame":
                ext.getFriendList(callBack);
                break;
            case "wx":
                ext.sendOpenDataContext("open", "friend");
                // let friendDataList: any;
                // if (openContext["canvas"]["userDataList"]) {
                // 	friendDataList = JSON.parse(openContext["canvas"]["userDataList"]);
                // }
                // callBack(friendDataList);
                this.createRank();
                break;
            case "dev":
                var list = [];
                SocketManager.getInstance.out.sendFriendList(list, 2);
                break;
            case "wanba":
                SocketManager.getInstance.out.sendRequestFriendList();
                break;
            default:
                break;
        }
    };
    SdkManager.prototype.createRank = function () {
        var self = this;
        ScenesManager.getInstance.openView(UIUtil.createPanel(ViewClassName.WXRankView), LayerManager.GAME_UI_LAYER);
    };
    SdkManager.prototype.getSystemInfo = function () {
        var self = this;
        switch (ext.getPlatform()) {
            case "wanba":
                ext.getSystemInfo(function (result) {
                    SocketManager.getInstance.out.sendPhoneModel(result);
                });
                break;
            case "wx":
                ext.getSystemInfo(function (result) {
                    GameConfig.systemInfo = result;
                    SocketManager.getInstance.out.sendPhoneModel(result ? result.model : "test");
                });
                break;
        }
    };
    /**上报信息 */
    SdkManager.prototype.setUserCloudStorage = function (action) {
        var self = this;
        var sendData = 0;
        switch (ext.getPlatform()) {
            case "hgame":
            case "wx":
                // switch (action) {
                // 	case "missionMaxNum":
                // 		self.reportMissison = PlayerInfoManager.getInstance.playerMsg.HighestMissionId;
                // 		break;
                // 	case "rebirthNum":
                // 		self.reportRebirthNum = PlayerInfoManager.getInstance.info.reviveBySkillCount;
                // 		break;
                // }
                self.reportMissison = PlayerInfoManager.getInstance.playerMsg.HighestMissionId;
                self.reportRebirthNum = PlayerInfoManager.getInstance.info.reviveBySkillCount;
                sendData = self.reportMissison * 1000 + self.reportRebirthNum;
                ext.setUserCloudStorage(sendData);
                break;
            case "wanba":
                break;
            case "dev":
                break;
            default:
                break;
        }
    };
    /** 观看广告 */
    SdkManager.prototype.ShowVideoAd = function (adId, callBack) {
        switch (ext.getPlatform()) {
            case "hgame":
                ext.hgameShowVideoAd().then(function (res) {
                    if (res.isEnd) {
                        callBack();
                    }
                    else {
                        MessageManger.getInstance.showText(LanguageManager.getInstance.getLanguageText("models.adv.txt"));
                    }
                }).catch(function () {
                    callBack();
                });
                // (res) => {
                // 	console.log("aaaaaaaaaa :" + adId)
                // 	if (res.isEnd) {
                // 		callBack()
                // 	}
                // }
                break;
            case "wx":
                ext.createRewardedVideoAd(adId, callBack, function () { MessageManger.getInstance.showText(LanguageManager.getInstance.getLanguageText("models.adv.fail")); });
                break;
            case "wanba":
                ext.ShowVideoAd(callBack);
                break;
            case "dev":
                break;
            default:
                break;
        }
    };
    /**生成桌面快捷方式图标 */
    SdkManager.prototype.addShortcut = function (callBack) {
        switch (ext.getPlatform()) {
            case "hgame":
                break;
            case "wx":
                break;
            case "wanba":
                ext.addShortcut(callBack);
                break;
            case "dev":
                break;
            default:
                break;
        }
    };
    /** 辉耀SDK上报接口 */
    SdkManager.prototype.wxHysdkReport = function (type) {
        ext.hysdkReport(type);
    };
    return SdkManager;
}());
__reflect(SdkManager.prototype, "SdkManager");
//# sourceMappingURL=SdkManager.js.map