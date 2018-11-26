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
var SocketEventDispatcher = (function (_super) {
    __extends(SocketEventDispatcher, _super);
    function SocketEventDispatcher() {
        return _super.call(this) || this;
    }
    Object.defineProperty(SocketEventDispatcher, "getInstance", {
        get: function () {
            if (SocketEventDispatcher._instance == null) {
                SocketEventDispatcher._instance = new SocketEventDispatcher();
            }
            return SocketEventDispatcher._instance;
        },
        enumerable: true,
        configurable: true
    });
    return SocketEventDispatcher;
}(egret.EventDispatcher));
__reflect(SocketEventDispatcher.prototype, "SocketEventDispatcher");
//# sourceMappingURL=SocketEventDispatcher.js.map