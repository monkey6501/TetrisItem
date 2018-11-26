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
    var BaseItem = (function (_super) {
        __extends(BaseItem, _super);
        function BaseItem(skinName) {
            var _this = _super.call(this) || this;
            _this._select = false;
            var self = _this;
            self.skinName = skinName;
            self.addEventListener(egret.Event.REMOVED_FROM_STAGE, self.onRemoveFromStage, self, false);
            self.addEventListener(egret.Event.ADDED_TO_STAGE, self.onAddToStage, self, false);
            return _this;
        }
        BaseItem.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
            var self = this;
            LanguageManager.getInstance.setModuleLanguage(self);
        };
        BaseItem.prototype.update = function (info) {
            if (info === void 0) { info = null; }
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
            }
            if (info) {
                this._info = info;
            }
            this.updateView();
        };
        BaseItem.prototype.updateView = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            var self = this;
        };
        BaseItem.prototype.hasData = function (dataName) {
            var self = this;
            var list = self.getDatas();
            for (var i = 0; i < list.length; i++) {
                if (list[i] == dataName) {
                    return true;
                }
            }
            return false;
        };
        BaseItem.prototype.getDatas = function () {
            return null;
        };
        BaseItem.prototype.onDataChanged = function (dataName) {
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
            }
        };
        BaseItem.prototype.onAddToStage = function (evt) {
            var self = this;
            self.showToStage();
            self.addEvents();
        };
        BaseItem.prototype.showToStage = function () {
            var self = this;
        };
        /**移出舞台后调用 */
        BaseItem.prototype.onRemoveFromStage = function (evt) {
            var self = this;
            self.removeEvents();
        };
        BaseItem.prototype.selectView = function () {
        };
        Object.defineProperty(BaseItem.prototype, "select", {
            get: function () {
                return this._select;
            },
            set: function (value) {
                var self = this;
                self._select = value;
                self.selectView();
            },
            enumerable: true,
            configurable: true
        });
        BaseItem.prototype.addEvents = function () {
            var self = this;
        };
        BaseItem.prototype.removeEvents = function () {
            var self = this;
        };
        BaseItem.prototype.hide = function () {
            var self = this;
            if (self.parent != null) {
                self.parent.removeChild(self);
            }
        };
        /** 点击回调 */
        BaseItem.prototype.gotoCallBack = function () { };
        BaseItem.prototype.dispose = function () {
            var self = this;
            self.hide();
        };
        return BaseItem;
    }(eui.ItemRenderer));
    UI.BaseItem = BaseItem;
    __reflect(BaseItem.prototype, "UI.BaseItem");
})(UI || (UI = {}));
//# sourceMappingURL=BaseItem.js.map