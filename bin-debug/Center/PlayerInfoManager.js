var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var PlayerInfoManager = (function (_super) {
    __extends(PlayerInfoManager, _super);
    function PlayerInfoManager() {
        return _super.call(this) || this;
    }
    Object.defineProperty(PlayerInfoManager, "getInstance", {
        get: function () {
            if (!PlayerInfoManager._instance) {
                PlayerInfoManager._instance = new PlayerInfoManager();
            }
            return PlayerInfoManager._instance;
        },
        enumerable: true,
        configurable: true
    });
    PlayerInfoManager.prototype.setup = function () {
        var self = this;
    };
    return PlayerInfoManager;
}(egret.EventDispatcher));
__reflect(PlayerInfoManager.prototype, "PlayerInfoManager");
