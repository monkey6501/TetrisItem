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
var MapItem = (function (_super) {
    __extends(MapItem, _super);
    function MapItem(r, c) {
        var _this = _super.call(this) || this;
        _this._state = 0;
        _this.row = 0;
        _this.col = 0;
        _this.skinName = SkinName.MapItemSkin;
        _this.row = r;
        _this.col = c;
        return _this;
    }
    MapItem.prototype.childrenCreated = function () {
        var self = this;
        _super.prototype.childrenCreated.call(this);
    };
    /**设置icon状态
     *
     * state -- 0:没被占用不显示  1：被占用显示  2:没被占用显示阴影
    */
    MapItem.prototype.setIconType = function (color, state) {
        var self = this;
        self.color = color;
        self.icon.source = "game_json.item" + color;
        self._state = state;
        if (self._state == 0) {
            self.icon.visible = false;
        }
        else if (self._state == 1) {
            self.icon.visible = true;
            self.icon.alpha = 1;
        }
        else {
            self.icon.visible = true;
            self.icon.alpha = 0.5;
        }
    };
    Object.defineProperty(MapItem.prototype, "state", {
        get: function () {
            var self = this;
            return self._state;
        },
        enumerable: true,
        configurable: true
    });
    MapItem.prototype.dispose = function () {
        var self = this;
        DisplayUtils.removeFromParent(self);
    };
    return MapItem;
}(eui.Component));
__reflect(MapItem.prototype, "MapItem");
//# sourceMappingURL=MapItem.js.map