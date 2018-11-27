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
var EventsManager = (function (_super) {
    __extends(EventsManager, _super);
    function EventsManager() {
        return _super.call(this) || this;
    }
    Object.defineProperty(EventsManager, "getInstance", {
        get: function () {
            if (!EventsManager._instance) {
                EventsManager._instance = new EventsManager();
            }
            return EventsManager._instance;
        },
        enumerable: true,
        configurable: true
    });
    return EventsManager;
}(egret.EventDispatcher));
__reflect(EventsManager.prototype, "EventsManager");
