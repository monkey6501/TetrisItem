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
var BlockItem = (function (_super) {
    __extends(BlockItem, _super);
    function BlockItem() {
        var _this = _super.call(this) || this;
        _this.skinName = SkinName.BlockItemSkin;
        return _this;
    }
    BlockItem.prototype.childrenCreated = function () {
        var self = this;
        _super.prototype.childrenCreated.call(this);
        self.addEvents();
    };
    BlockItem.prototype.setData = function (type, r, c) {
        var self = this;
        self.iconColor = type;
        self.icon.source = "game_json.item" + type;
        self.row = r;
        self.col = c;
    };
    BlockItem.prototype.addEvents = function () {
        var self = this;
    };
    BlockItem.prototype.removeEvents = function () {
        var self = this;
    };
    BlockItem.prototype.dispose = function () {
        var self = this;
        self.removeEvents();
        DisplayUtils.removeFromParent(self);
    };
    return BlockItem;
}(eui.Component));
__reflect(BlockItem.prototype, "BlockItem");
//# sourceMappingURL=BlockItem.js.map