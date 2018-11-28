var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var SdkManager = (function () {
    function SdkManager() {
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
    SdkManager.prototype.paySdk = function (id) {
    };
    SdkManager.prototype.payFail = function () {
        MessageManger.getInstance.showText(LanguageManager.getInstance.getLanguageText("models.sdkManager.payFail"));
    };
    SdkManager.prototype.totalShare = function (shareId, sucCallBack, failCallBack) {
        if (failCallBack === void 0) { failCallBack = null; }
    };
    SdkManager.prototype.getFriendList = function (data, callBack) {
    };
    SdkManager.prototype.createRank = function () {
        var self = this;
        // ScenesManager.getInstance.openView(UIUtil.createPanel(ViewClassName.WXRankView), LayerManager.GAME_UI_LAYER);
    };
    SdkManager.prototype.getSystemInfo = function () {
    };
    /**上报信息 */
    SdkManager.prototype.setUserCloudStorage = function (action) {
    };
    /** 观看广告 */
    SdkManager.prototype.ShowVideoAd = function (adId, callBack) {
    };
    /**生成桌面快捷方式图标 */
    SdkManager.prototype.addShortcut = function (callBack) {
    };
    return SdkManager;
}());
__reflect(SdkManager.prototype, "SdkManager");
//# sourceMappingURL=SdkManager.js.map