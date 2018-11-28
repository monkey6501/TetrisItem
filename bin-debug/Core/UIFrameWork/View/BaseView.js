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
    var BaseView = (function (_super) {
        __extends(BaseView, _super);
        function BaseView(uiskinPath) {
            var _this = _super.call(this) || this;
            _this._bottom = 0;
            _this._centerTop = 0;
            _this._centerBottom = 0;
            _this.startY = 0;
            /** 是否缓存 */
            _this.isCache = true;
            _this._needLoadResGroupList = [];
            _this._needLoadResItemList = [];
            _this.uiName = "";
            _this.type = 0;
            _this.isComplete = false;
            _this.fullScreen = false;
            var self = _this;
            self.uiskinPath = uiskinPath;
            return _this;
        }
        /**初始化界面 */
        BaseView.prototype.init = function (data, completeCallBack) {
            var self = this;
            this.data = data;
            self.loadRes();
        };
        /** 初始化皮肤 */
        BaseView.prototype.initSkinView = function () {
            var self = this;
            if (self.isComplete) {
                self.show();
            }
            else {
                this.addEventListener(eui.UIEvent.COMPLETE, this.createCompleteEvent, this);
            }
            this.skinName = this.uiskinPath;
        };
        /**创建成功后 */
        BaseView.prototype.createCompleteEvent = function (event) {
            var self = this;
            self.isComplete = true;
            self.removeEventListener(eui.UIEvent.COMPLETE, self.createCompleteEvent, this);
            LanguageManager.getInstance.setModuleLanguage(self);
            self.addEvents();
            self.show();
        };
        Object.defineProperty(BaseView.prototype, "tabIndex", {
            get: function () {
                return this._tabIndex;
            },
            set: function (value) {
                this._tabIndex = value;
                if (this.skin_window) {
                    this.skin_window["tabIndex"] = this._tabIndex;
                }
            },
            enumerable: true,
            configurable: true
        });
        BaseView.prototype.onTabClick = function (index) {
            this._tabIndex = index;
        };
        BaseView.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
            this.group_bottom && this.group_bottom.addEventListener(egret.Event.RESIZE, this.onBottomResize, this);
            this.onStageResize();
        };
        BaseView.prototype.onStageResize = function () {
            var self = this;
            self.group_bottom && self.onBottomResize();
            self.group_center && self.onCenterResize();
            self.group_scaleX && self.onGroupScaleX();
        };
        BaseView.prototype.onGroupScaleX = function () {
            var self = this;
            if (!self.group_scaleX)
                return;
            self.group_scaleX.x = 0;
            self.group_scaleX.y = 0;
            self.group_scaleX.width = StageUtils.getInstance.stage.stageWidth;
            self.group_scaleX.height = StageUtils.getInstance.stage.stageHeight;
        };
        BaseView.prototype.onBottomResize = function () {
            var self = this;
            if (!self.group_bottom)
                return;
            self._bottom = self.group_bottom.bottom || self._bottom;
            self.group_bottom.bottom = undefined;
            self.group_bottom.y = StageUtils.getInstance.stage.stageHeight - self._bottom - self.group_bottom.height + self.startY;
        };
        BaseView.prototype.onCenterResize = function () {
            var self = this;
            if (!this.group_center)
                return;
            self._centerTop = self.group_center.top || self._centerTop;
            self.group_center.top = undefined;
            self._centerBottom = self.group_center.bottom || self._centerBottom;
            self.group_center.bottom = undefined;
            self.group_center.y = self._centerTop;
            self.group_center.height = StageUtils.getInstance.stage.stageHeight - self._centerBottom - self._centerTop + self.startY;
        };
        /** 加载组资源 */
        BaseView.prototype.loadRes = function () {
            var self = this;
            var loadGroup = self.getNeedResGroup().concat(self.getNeedResItemList());
            if (loadGroup != null && loadGroup.length > 0) {
                ResUtil.getInstance.loadGroupWithPro(loadGroup, self.loadComplete, null, self);
            }
            else {
                self.loadComplete();
            }
        };
        /** 组资源加载完毕，初始化皮肤 */
        BaseView.prototype.loadComplete = function () {
            var self = this;
            // BigLoading.getInstance.hideLoading();
            self.initSkinView();
        };
        BaseView.prototype.hasData = function (dataName) {
            var self = this;
            var list = self.getDatas();
            for (var i = 0; i < list.length; i++) {
                if (list[i] == dataName) {
                    return true;
                }
            }
            return false;
        };
        BaseView.prototype.getDatas = function () {
            return null;
        };
        BaseView.prototype.onDataChanged = function (dataName) {
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
            }
        };
        BaseView.prototype.getNeedResGroup = function () { return this._needLoadResGroupList; };
        BaseView.prototype.getNeedResItemList = function () {
            return this._needLoadResItemList;
        };
        // //返回界面名
        BaseView.prototype.getName = function () {
            return null;
        };
        //返回上一级界面名
        BaseView.prototype.getBackName = function () {
            return null;
        };
        //显示界面 
        BaseView.prototype.show = function () {
            var self = this;
            self.showCreatAccountView();
        };
        //更新
        BaseView.prototype.update = function (data) {
            if (data)
                this._data = data;
        };
        //显示在舞台
        BaseView.prototype.showToStage = function () {
            var self = this;
        };
        //显示创建绘制示图
        BaseView.prototype.showCreatAccountView = function () {
            var self = this;
            self.showToStage();
        };
        /** 添加监听器 */
        BaseView.prototype.addEvents = function () {
        };
        /** 移除监听器 */
        BaseView.prototype.removeEvents = function () {
        };
        BaseView.prototype.close = function () {
            var self = this;
            ScenesManager.getInstance.currView = null;
            self.dispose();
        };
        //不显示界面
        BaseView.prototype.hide = function () {
            var self = this;
        };
        // 是否需要释放此模块内存
        BaseView.prototype.isNeedToRelease = function () {
            return true;
        };
        //消毁
        BaseView.prototype.dispose = function () {
            var self = this;
            self.removeEvents();
            self.data = null;
            if (self.isCache == false)
                self.disposeRes();
            self.group_bottom && self.group_bottom.removeEventListener(egret.Event.RESIZE, self.onBottomResize, self);
            self.hide();
            if (self["skin_window"]) {
                self["skin_window"].dispose();
            }
            if (self.fullScreen) {
                ScenesManager.getInstance.ShowScene();
            }
            ScenesManager.getInstance.views.Remove(self.uiName);
            ScenesManager.getInstance.currView = null;
            DisplayUtils.removeFromParent(self);
        };
        /** 清楚组资源 */
        BaseView.prototype.disposeRes = function () {
            var self = this;
            self.isComplete = false;
            while (self._needLoadResGroupList && self._needLoadResGroupList.length > 0) {
                var name_1 = self._needLoadResGroupList.pop();
                RES.destroyRes(name_1);
            }
            while (self._needLoadResItemList && self._needLoadResItemList.length > 0) {
                var itemName = self._needLoadResItemList.pop();
                RES.destroyRes(itemName);
            }
        };
        return BaseView;
    }(eui.Component));
    UI.BaseView = BaseView;
    __reflect(BaseView.prototype, "UI.BaseView");
})(UI || (UI = {}));
//# sourceMappingURL=BaseView.js.map