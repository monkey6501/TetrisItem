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
var GameMainView = (function (_super) {
    __extends(GameMainView, _super);
    function GameMainView() {
        var _this = _super.call(this, SkinName.GameMainViewSkin) || this;
        _this.shapeList = [];
        return _this;
    }
    GameMainView.prototype.addEvents = function () {
        _super.prototype.addEvents.call(this);
        var self = this;
    };
    GameMainView.prototype.show = function () {
        _super.prototype.show.call(this);
        var self = this;
        var item = new TetrisItem();
        self.addChild(item);
    };
    GameMainView.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
        var self = this;
    };
    return GameMainView;
}(UI.BaseScene));
__reflect(GameMainView.prototype, "GameMainView");
