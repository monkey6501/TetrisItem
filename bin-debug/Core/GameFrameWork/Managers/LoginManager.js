var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 登陆管理类
 * @author weiqiang.huang
 */
var LoginManager = (function () {
    function LoginManager() {
        this.isInHall = false;
        /**1是新玩家，  0是老玩家 */
        this.isNew = 0;
    }
    LoginManager.prototype.setup = function () {
        var self = this;
        SocketManager.getInstance.addEventListener(SocketEvents.SOCKET_CONNECT, self.onSendServerLogin, self);
        SocketManager.getInstance.addEventListener(SocketEvents.format(PackageInTypeVo.LOGIN_SUCCESS), self.onLoginSuccess, self);
        SocketManager.getInstance.addEventListener(SocketEvents.format(PackageInTypeVo.LANDFALL), self.onLandFall, self);
    };
    LoginManager.prototype.getServerInfo = function () {
        var self = this;
        // https://quanwang.7road.net:3009/Center/oss/mixServerList/ClickHeroes/dd
        self._serverRequest = new egret.HttpRequest();
        self._serverRequest.withCredentials = false;
        self._serverRequest.responseType = egret.HttpResponseType.TEXT;
        self._serverRequest.addEventListener(egret.Event.COMPLETE, self.onServerListComplete, self);
        self._serverRequest.addEventListener(egret.IOErrorEvent.IO_ERROR, self.onGetIoError, self);
        self._serverRequest.addEventListener(egret.ProgressEvent.PROGRESS, self.onGetProgress, self);
        var url = "";
        switch (ext.getPlatform()) {
            case "hgame":
                url = ext.getServerListUrl() + PlayerInfoManager.getInstance.info.hgameInfo.open_id;
                self._serverRequest.open(url, egret.HttpMethod.GET);
                self._serverRequest.send();
                break;
            case "dev":
                url = ext.getServerListUrl() + PlayerInfoManager.getInstance.userName;
                self._serverRequest.open(url, egret.HttpMethod.GET);
                self._serverRequest.send();
                break;
            case "wanba":
                url = ext.getHttpHead() + PlayerInfoManager.getInstance.userName;
                self._serverRequest.open(url, egret.HttpMethod.GET);
                self._serverRequest.send();
                break;
            default:
                url = ext.getServerListUrl() + PlayerInfoManager.getInstance.userName;
                self._serverRequest.open(url, egret.HttpMethod.GET);
                self._serverRequest.send();
                break;
        }
    };
    LoginManager.prototype.onServerListComplete = function (evt) {
        var self = this;
        var request = evt.currentTarget;
        self.serverList = JSON.parse(request.response);
        self.setShowServer();
        if (!ext.getIsServerList() && !self._myLatelyServer) {
            // ResUtil.getInstance.loadGroup(["heroRes"], () => {
            GlobleData.getInstance.setup(function () {
                FSMManager.Instance.setup();
                self.loginGame();
            });
            // }, self);
            return;
        }
        if (ext.getPlatform() == "dev") {
            EventsManager.getInstance.dispatchEventWith(LoginManager.SERVERLIST_MSG);
        }
        else {
            ScenesManager.getInstance.openView(UIUtil.createScene(ViewClassName.Login), LayerManager.GAME_MAP_LAYER);
        }
    };
    LoginManager.prototype.setShowServer = function () {
        var self = this;
        self.initServerInfo();
        if (self._myLatelyServer) {
            self.showServer = self._myLatelyServer;
        }
        else if (self._newServer) {
            self.showServer = self._newServer;
        }
        else {
            self.showServer = self.serverList[0];
        }
    };
    LoginManager.prototype.initServerInfo = function () {
        var self = this;
        self._myserverList = [];
        var max = 0;
        var maxServerId = 0;
        self.serverList.sort(function (a, b) { return b.serverId - a.serverId; });
        for (var i = 0; i < self.serverList.length; i++) {
            if (self.serverList[i].loginTime) {
                self._myserverList.push(self.serverList[i]);
                if (self.serverList[i].loginTime > max) {
                    max = self.serverList[i].loginTime;
                    self._myLatelyServer = self.serverList[i];
                }
            }
            if (self.serverList[i].serverId > maxServerId) {
                maxServerId = self.serverList[i].serverId;
                self._newServer = self.serverList[i];
            }
        }
        self._myserverList.sort(function (a, b) { return b.loginTime - a.loginTime; });
    };
    Object.defineProperty(LoginManager.prototype, "myServerList", {
        get: function () {
            var self = this;
            return self._myserverList;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LoginManager.prototype, "myLatelyServer", {
        get: function () {
            var self = this;
            return self._myLatelyServer;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LoginManager.prototype, "newServer", {
        get: function () {
            var self = this;
            return self._newServer;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LoginManager.prototype, "allServerList", {
        get: function () {
            var self = this;
            var result = [];
            return self.serverList;
        },
        enumerable: true,
        configurable: true
    });
    LoginManager.prototype.getWanbaUserInfo = function () {
        var self = this;
        self.wanbaRequest = new egret.HttpRequest();
        self.wanbaRequest.withCredentials = false;
        self.wanbaRequest.responseType = egret.HttpResponseType.TEXT;
        var url = "";
        var data = "";
        url = self.getRequestUrl(self.showServer.ssl, self.showServer.host, self.showServer.httpPort, "101/4")
            + "?openid=" + PlayerInfoManager.getInstance.info.wanbaInfo.openid
            + "&appid=" + PlayerInfoManager.getInstance.info.wanbaInfo.appid
            + "&openkey=" + PlayerInfoManager.getInstance.info.wanbaInfo.openKey
            + "&pf=" + PlayerInfoManager.getInstance.info.wanbaInfo.pf;
        self.wanbaRequest.open(url, egret.HttpMethod.GET);
        self.wanbaRequest.send();
        self.wanbaRequest.addEventListener(egret.Event.COMPLETE, self.onWanbaRequestComplete, self);
        self.wanbaRequest.addEventListener(egret.IOErrorEvent.IO_ERROR, self.onGetIoError, self);
        self.wanbaRequest.addEventListener(egret.ProgressEvent.PROGRESS, self.onGetProgress, self);
    };
    /** HTTP加载完成 */
    LoginManager.prototype.onWanbaRequestComplete = function (evt) {
        var self = this;
        var request = evt.currentTarget;
        var data = JSON.parse(request.response);
        PlayerInfoManager.getInstance.headPic = data.content.headPic;
        PlayerInfoManager.getInstance.nickName = data.content.nickName;
        console.log("101/4 :" + request.response);
        self.loginGame();
    };
    /** 登陆游戏获取玩家信息 */
    LoginManager.prototype.loginGame = function () {
        var self = this;
        self._request = new egret.HttpRequest();
        self._request.withCredentials = false;
        self._request.responseType = egret.HttpResponseType.TEXT;
        var url = "";
        var data = "";
        var ip = egret.getOption("ip");
        var port = egret.getOption("port");
        ext.setCenterUrl(self.getRequestUrl(self.showServer.ssl, self.showServer.host, self.showServer.httpPort, ""));
        if (ip && ip != "" && port && port != "") {
            url = "http://" + ip + ":" + port + "/ClickHeroes/game/1/1?json={'userName':'" + PlayerInfoManager.getInstance.nickName + "'}";
            self._request.open(url, egret.HttpMethod.GET);
            self._request.send();
        }
        else {
            switch (ext.getPlatform()) {
                case "hgame":
                    url = self.getRequestUrl(self.showServer.ssl, self.showServer.host, self.showServer.httpPort, "1/1");
                    data = "json={'userName':'" + PlayerInfoManager.getInstance.info.hgameInfo.open_id + "'}";
                    console.log("open_id" + PlayerInfoManager.getInstance.info.hgameInfo.open_id);
                    self._request.open(url, egret.HttpMethod.POST);
                    self._request.send(data);
                    break;
                case "wx":
                    url = self.getRequestUrl(self.showServer.ssl, self.showServer.host, self.showServer.httpPort, "1/1") + "?json={'userName':'" + PlayerInfoManager.getInstance.userName + "'}";
                    self._request.open(url, egret.HttpMethod.GET);
                    self._request.send();
                    break;
                case "dev":
                    url = self.getRequestUrl(self.showServer.ssl, self.showServer.host, self.showServer.httpPort, "1/1") + "?json={'userName':'" + PlayerInfoManager.getInstance.userName + "'}";
                    self._request.open(url, egret.HttpMethod.GET);
                    self._request.send();
                    break;
                case "wanba":
                    url = self.getRequestUrl(self.showServer.ssl, self.showServer.host, self.showServer.httpPort, "1/1") + "?json={'userName':'" + PlayerInfoManager.getInstance.userName + "'}";
                    self._request.open(url, egret.HttpMethod.GET);
                    self._request.send();
                    break;
                default:
                    // url = "http://quanwang.7road.net:6006/ClickHeroes/game/1/1?json={'userName':'" + PlayerInfoManager.getInstance.userName + "'}";
                    url = "https://quanwang.7road.net:443/ClickHeroes/game/1/1?json={'userName':'" + PlayerInfoManager.getInstance.userName + "'}";
                    // url = "https://gs002.puzzleandheroes.com:8001/ClickHeroes/game/1/1?json={'userName':'" + PlayerInfoManager.getInstance.userName + "'}";
                    // url = "http://192.168.31.164:6001/ClickHeroes/game/1/1?json={'userName':'" + PlayerInfoManager.getInstance.userName + "'}";
                    // url = "http://192.168.31.118:6001/ClickHeroes/game/1/1?json={'userName':'" + PlayerInfoManager.getInstance.userName + "'}";
                    self._request.open(url, egret.HttpMethod.GET);
                    self._request.send();
                    break;
            }
        }
        self._request.addEventListener(egret.Event.COMPLETE, self.onGetComplete, self);
        self._request.addEventListener(egret.IOErrorEvent.IO_ERROR, self.onGetIoError, self);
        self._request.addEventListener(egret.ProgressEvent.PROGRESS, self.onGetProgress, self);
        LogManager.logFormat('startLogin : ' + url);
    };
    /** HTTP加载完成 */
    LoginManager.prototype.onGetComplete = function (evt) {
        var self = this;
        var request = evt.currentTarget;
        var data = JSON.parse(request.response);
        PlayerInfoManager.getInstance.playerId = data.content.playerId;
        SocketConfig.HOST = data.content.host;
        if (data.content.ssl) {
            SocketConfig.IP = "wss://" + data.content.host;
        }
        else {
            SocketConfig.IP = "ws://" + data.content.host;
        }
        SocketConfig.PORT = data.content.port;
        self.isNew = data.content.newPlayer ? 1 : 0;
        SocketManager.getInstance.setup(SocketConfig.IP, SocketConfig.PORT);
    };
    /** Socket连接成功后给服务器发送登陆协议 */
    LoginManager.prototype.onSendServerLogin = function () {
        var self = this;
        var headPic = "";
        switch (ext.getPlatform()) {
            case "wx":
                headPic = PlayerInfoManager.getInstance.info.wxUserInfo.avatarUrl;
                break;
        }
        if (self.isNew == 1) {
            if (!ext.getIsServerList() && !self._myLatelyServer) {
                var shareData = PlayerInfoManager.getInstance.info.shareData + "," + self.isNew;
                SocketManager.getInstance.out.sendServerLogin(headPic, PlayerInfoManager.getInstance.nickName, shareData);
            }
            else {
                EventsManager.getInstance.dispatchEventWith(LoginManager.NEWPLAYER_LOGIN);
            }
        }
        else {
            var shareData = PlayerInfoManager.getInstance.info.shareData + ",0";
            SocketManager.getInstance.out.sendServerLogin(headPic, PlayerInfoManager.getInstance.nickName, shareData);
        }
        SdkManager.getInstance.getSystemInfo();
    };
    /** HTTP错误信息 */
    LoginManager.prototype.onGetIoError = function (evt) {
        var self = this;
        LogManager.logFormat('onGetIoError : ' + evt);
    };
    /** HTTP加载进度 */
    LoginManager.prototype.onGetProgress = function (evt) {
        var self = this;
    };
    /** 登陆成功 */
    LoginManager.prototype.onLoginSuccess = function (evt) {
        var self = this;
        //显示主场景
        var msg = protocol.ActivityItemStateMsg.decode(evt.data);
        if (msg.activityId <= 0) {
            self.showHallView();
        }
        else {
            self.isInHall = false;
            ScenesManager.getInstance.hideCurrView();
            //抽卡断线重连
            if (msg.activityId == ACTIVITY_TYPE.LOTTERY_EQUIP || msg.activityId == ACTIVITY_TYPE.LOTTERY_GOLD_BODY || msg.activityId == ACTIVITY_TYPE.LOTTERY_MERCENARY) {
                var rewardList = msg.receiveState.split(",");
                var info = new LotteryInfo();
                info.activityId = msg.activityId;
                info.totalCount = rewardList.length;
                info.dataDic = new TSDictionary();
                for (var i = 0; i < rewardList.length; i++) {
                    var arr = rewardList[i].split("#");
                    console.log("抽卡：" + arr[0]);
                    var itemVo = LotteryManager.getInstance.getItemDataVO(info.activityId, Number(arr[0]));
                    var posArr = arr[2].split("|");
                    var pos = new egret.Point(Number(posArr[0]), Number(posArr[1]));
                    var data = { activityId: info.activityId, pos: pos, quality: itemVo.quality, itemId: Number(arr[0]), isGet: Number(arr[1]), type: 6 };
                    info.dataDic.Add(i, data);
                }
                ScenesManager.getInstance.openView(UIUtil.createPanel(ViewClassName.LotteryRewardView), LayerManager.GAME_UI_LAYER, info);
            }
        }
        switch (ext.getPlatform()) {
            case "hgame":
                SdkManager.getInstance.hGameReport("enterGame");
                SdkManager.getInstance.hGameReport("startGame");
                break;
            case "wx":
                break;
        }
        SdkManager.getInstance.setUserCloudStorage("missionMaxNum");
    };
    LoginManager.prototype.getRequestUrl = function (ssl, url, port, param) {
        var result;
        if (ssl) {
            result = "https://" + url + ":" + port + ext.getGamePre() + param;
        }
        else {
            result = "http://" + url + ":" + port + ext.getGamePre() + param;
        }
        return result;
    };
    LoginManager.prototype.showHallView = function () {
        var self = this;
        switch (ext.getPlatform()) {
            case "wx":
                if (!ext.getIsServerList() && !self._myLatelyServer) {
                    ext.hideLoading();
                }
                break;
        }
        self.isInHall = true;
        ScenesManager.getInstance.openView(UIUtil.createScene(ViewClassName.Hall));
        SocketManager.getInstance.out.sendBattleCompleteInfo(this.getBattleInfo());
    };
    /** 异地登陆 */
    LoginManager.prototype.onLandFall = function (evt) {
        var self = this;
        var data = {
            des: LanguageManager.getInstance.getLanguageText("refreshLabel"), backcall: function () {
                if (GameConfig.IsWX()) {
                    ext.exitMiniProgram();
                }
                else {
                    location.reload();
                }
            }
        };
        ScenesManager.getInstance.openView(UIUtil.createAlert(ViewClassName.PromptAlert), LayerManager.GAME_POP_LAYER, data);
    };
    LoginManager.prototype.getBattleInfo = function () {
        var info = new protocol.GameOverReqMsg();
        info.missionId = 0;
        info.process = 0;
        info.dps = PlayerInfoManager.getInstance.synTotalDps().toString();
        info.clickHurt = PlayerInfoManager.getInstance.getTotalClickDamage().toString();
        info.gold = "0";
        info.monsterHp = "0";
        info.heroSouls = "0";
        info.clickNum = "0";
        info.criticalClickNum = "0";
        info.secondClickNum = 0;
        info.secondCriticalClickNum = 0;
        info.monsterNum = 0;
        info.bossNum = 0;
        info.boxMonsterNum = 0;
        return info;
    };
    Object.defineProperty(LoginManager, "getInstance", {
        get: function () {
            if (LoginManager._instance == null) {
                LoginManager._instance = new LoginManager();
            }
            return LoginManager._instance;
        },
        enumerable: true,
        configurable: true
    });
    LoginManager.SERVERLIST_MSG = "SERVERLIST_MSG";
    LoginManager.NEWPLAYER_LOGIN = "NEWPLAYER_LOGIN";
    LoginManager.SELECT_SERVER = "SELECT_SERVER";
    return LoginManager;
}());
__reflect(LoginManager.prototype, "LoginManager");
//# sourceMappingURL=LoginManager.js.map