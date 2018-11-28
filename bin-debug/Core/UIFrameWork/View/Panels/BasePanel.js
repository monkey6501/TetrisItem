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
var UI;
(function (UI) {
    var BasePanel = (function (_super) {
        __extends(BasePanel, _super);
        function BasePanel(uiskinPath) {
            var _this = _super.call(this, uiskinPath) || this;
            var self = _this;
            self.type = UIType.Panel;
            return _this;
        }
        return BasePanel;
    }(UI.BaseView));
    UI.BasePanel = BasePanel;
    __reflect(BasePanel.prototype, "UI.BasePanel");
})(UI || (UI = {}));
//# sourceMappingURL=BasePanel.js.map