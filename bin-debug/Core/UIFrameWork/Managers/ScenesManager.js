var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var ScenesManager = (function () {
    function ScenesManager() {
        var self = this;
        self._views = new TSDictionary();
    }
    Object.defineProperty(ScenesManager.prototype, "currView", {
        get: function () {
            var self = this;
            return self._currView;
        },
        set: function (value) {
            var self = this;
            self._currView = value;
        },
        enumerable: true,
        configurable: true
    });
    /** 打开界面 */
    ScenesManager.prototype.openView = function (uiItem, layer, uiParam, isPanel, isOverlay, fullScreen) {
        if (layer === void 0) { layer = LayerManager.GAME_MAP_LAYER; }
        if (isPanel === void 0) { isPanel = true; }
        if (isOverlay === void 0) { isOverlay = false; }
        if (fullScreen === void 0) { fullScreen = false; }
        var self = this;
        if (self._currView != null) {
            if (uiItem.uiName == self._currView.uiName) {
                return LogManager.logFormat("不可以切换同一个界面!" + uiItem.uiName);
            }
        }
        if (uiItem.type == UIType.Scene) {
            // BigLoading.getInstance.showLoading();
            self.hideCurrView();
            self._sceneView = uiItem;
        }
        else if (uiItem.type == UIType.Panel && isPanel) {
            layer = LayerManager.GAME_UI_LAYER;
        }
        self.showView(uiItem, layer, uiParam, isOverlay);
        self._currView.fullScreen = fullScreen;
        if (self._currView.fullScreen) {
            self.hideScene();
        }
    };
    /** 显示界面 */
    ScenesManager.prototype.showView = function (uiItem, layer, uiParam, isOverlay) {
        if (isOverlay === void 0) { isOverlay = false; }
        var self = this;
        if (self._views.ContainsKey(uiItem.uiName) && !isOverlay) {
            var current = self._views.TryGetValue(uiItem.uiName);
            self._currView = current;
            current.visible = true;
            current.init(uiParam, null);
            LayerManager.getInstance.addToLayer(current, layer);
        }
        else {
            self._currView = uiItem;
            if (self._currView != null) {
                self._views.Add(self._currView.uiName, self._currView);
                self._currView.init(uiParam, null);
                LayerManager.getInstance.addToLayer(self._currView, layer);
            }
        }
    };
    ScenesManager.prototype.hideScene = function () {
        var self = this;
        if (self._sceneView != null) {
            self._sceneView.visible = false;
        }
    };
    ScenesManager.prototype.ShowScene = function () {
        var self = this;
        if (self._sceneView != null) {
            self._sceneView.visible = true;
        }
    };
    /** 隐藏当前界面 */
    ScenesManager.prototype.hideCurrView = function () {
        var self = this;
        if (self._sceneView != null) {
            self._sceneView.visible = false;
            self._sceneView.hide();
            if (!self._sceneView.isCache) {
                self._views.Remove(self._sceneView.uiName);
                self._sceneView.dispose();
                self._sceneView = null;
            }
        }
        self._sceneView = null;
    };
    ScenesManager.prototype.hideView = function (className) {
        var self = this;
        var key = className + "";
        if (self._views.ContainsKey(key)) {
            var view = self._views.TryGetValue(key);
            view.visible = false;
            self._currView = null;
        }
    };
    ScenesManager.prototype.removeView = function (className) {
        var self = this;
        var key = className + "";
        if (self._views.ContainsKey(key)) {
            var view = self._views.TryGetValue(key);
            view.close();
            self._views.Remove(key);
        }
    };
    Object.defineProperty(ScenesManager.prototype, "views", {
        /** 获取当前所有存在的界面 */
        get: function () {
            var self = this;
            return self._views;
        },
        set: function (value) {
            var self = this;
            self._views = value;
        },
        enumerable: true,
        configurable: true
    });
    /** 移除所有界面 */
    ScenesManager.prototype.removeAllView = function () {
        var self = this;
        var list = self._views.getValues();
        for (var i = 0; i < list.length; i++) {
            list[i].dispose();
            DisplayUtils.removeAllChildren(self._views.getValues());
            list[i] = null;
        }
        self._views.clear();
    };
    Object.defineProperty(ScenesManager, "getInstance", {
        get: function () {
            if (ScenesManager._instance == null) {
                ScenesManager._instance = new ScenesManager();
            }
            return ScenesManager._instance;
        },
        enumerable: true,
        configurable: true
    });
    return ScenesManager;
}());
__reflect(ScenesManager.prototype, "ScenesManager");
//# sourceMappingURL=ScenesManager.js.map