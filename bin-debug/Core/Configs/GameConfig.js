var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var GameConfig = (function () {
    function GameConfig() {
    }
    //获得浏览器类型 pc android ios -- 可扩展为其他 如 微信、qqzone、qq、微博、校内、facebook
    GameConfig.systemType = function () {
        var ua = window.navigator.userAgent.toLowerCase();
        var microStr = "" + ua.match(/MicroMessenger/i);
        if (("" + ua.match(/windows nt/i)) == "windows nt") {
            return "windows";
        }
        else if (("" + ua.match(/iphone/i)) == "iphone") {
            return "ios";
        }
        else if (("" + ua.match(/android/i)) == "android") {
            return "android";
        }
        else if (("" + ua.match(/ipad/i)) == "ipad") {
            return "ipad";
        }
        else if (("" + ua.match(/linux/i)) == "linux") {
            return "linux";
        }
        else if (("" + ua.match(/mac/i)) == "mac") {
            return "mac";
        }
        else if (("" + ua.match(/ucbrower/i)) == "ucbrower") {
            return "ucbrower";
        }
        else {
            LogManager.logFormat("未知系统类型");
        }
    };
    //获得平台类型 如 微信、qqzone、qq、微博、校内、facebook
    GameConfig.platformType = function () {
        var ua = window.navigator.userAgent.toLowerCase();
        if (("" + ua.match(/micromessenger/i)) == "micromessenger") {
            return "micromessenger";
        }
        else if (("" + ua.match(/qzone/i)) == "qzone") {
            return "qzone";
        }
        else if (("" + ua.match(/weibo/i)) == "weibo") {
            return "weibo";
        }
        else if (("" + ua.match(/qq/i)) == "qq") {
            return "qq";
        }
        else if (("" + ua.match(/renren/i)) == "renren") {
            return "renren";
        }
        else if (("" + ua.match(/txmicroblog/i)) == "txmicroblog") {
            return "txmicroblog";
        }
        else if (("" + ua.match(/douban/i)) == "douban") {
            return "douban";
        }
        else {
            return "other";
        }
    };
    GameConfig.IsIos = function () {
        return ext.getPlatform() == "wx" && String(GameConfig.systemInfo.model).indexOf("iPhone") != -1;
    };
    GameConfig.IsIphoneX = function () {
        return ext.getPlatform() == "wx" && (String(GameConfig.systemInfo.model).indexOf("iPhone X") != -1
            || String(GameConfig.systemInfo.model).indexOf("LLD-AL20") != -1
            || String(GameConfig.systemInfo.model).indexOf("iPhone11") != -1);
    };
    GameConfig.IsWX = function () {
        return ext.getPlatform() == "wx";
    };
    /** 版本语言 */
    GameConfig.Language = "CN";
    /** 版本号 */
    GameConfig.Version = "20180414";
    GameConfig.IsOnLine = navigator.onLine;
    /** 是否测试 */
    GameConfig.IsDebug = false;
    return GameConfig;
}());
__reflect(GameConfig.prototype, "GameConfig");
//# sourceMappingURL=GameConfig.js.map