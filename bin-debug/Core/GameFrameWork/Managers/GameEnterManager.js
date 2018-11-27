var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var GameEnterManager = (function () {
    function GameEnterManager() {
    }
    GameEnterManager.prototype.setup = function () {
        PlayerInfoManager.getInstance.setup();
        BoneManager.Instance.start();
    };
    Object.defineProperty(GameEnterManager, "Instance", {
        get: function () {
            if (!this._instance) {
                this._instance = new GameEnterManager();
            }
            return this._instance;
        },
        enumerable: true,
        configurable: true
    });
    return GameEnterManager;
}());
__reflect(GameEnterManager.prototype, "GameEnterManager");
