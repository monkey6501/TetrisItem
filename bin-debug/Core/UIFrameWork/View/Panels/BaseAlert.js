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
    var BaseAlert = (function (_super) {
        __extends(BaseAlert, _super);
        function BaseAlert(uiskinPath) {
            var _this = _super.call(this, uiskinPath) || this;
            _this.offsetX = 0;
            _this.offsetY = 0;
            _this.offsetW = 0;
            _this.offsetH = 0;
            _this.isDispose = false;
            _this.isMaskTouch = true;
            var self = _this;
            self.type = UIType.Alert;
            self.isCache = false;
            return _this;
        }
        BaseAlert.prototype.show = function () {
            _super.prototype.show.call(this);
            var self = this;
            self.isDispose = false;
            self.onDisplayResizeHandler();
            // if (!self.maskRect) {
            // 	self.maskRect = self.getMask(0.7);
            // }
            if (!self.maskImg) {
                self.getImgMask(0.7);
            }
            self.anchorOffsetY = StageUtils.getInstance.stage.stageHeight;
            // LayerManager.getInstance.addToLayer(self.maskRect, LayerManager.GAME_UI_LAYER);
            LayerManager.getInstance.addToLayer(self.maskImg, LayerManager.GAME_UI_LAYER);
            this.x = (StageUtils.getInstance.stage.stageWidth - this.width) >> 1;
            this.y = (StageUtils.getInstance.stage.stageHeight - this.height) >> 1;
            LayerManager.getInstance.addToLayer(self, LayerManager.GAME_POP_LAYER);
            egret.Tween.get(self).to({ anchorOffsetY: 0 }, 300).call(function () {
                egret.Tween.removeTweens(self);
            });
            self.isMaskTouch && self.maskImg && self.maskImg.addEventListener(egret.TouchEvent.TOUCH_TAP, self.onMaskHandler, self);
            self.btn_close && self.btn_close.addEventListener(egret.TouchEvent.TOUCH_TAP, self.closePanel, self);
        };
        BaseAlert.prototype.showToStage = function () {
            _super.prototype.showToStage.call(this);
            var self = this;
        };
        BaseAlert.prototype.addEvents = function () {
            _super.prototype.addEvents.call(this);
            var self = this;
            self.addEventListener(egret.Event.RESIZE, self.onDisplayResizeHandler, self);
        };
        BaseAlert.prototype.removeEvents = function () {
            _super.prototype.removeEvents.call(this);
            var self = this;
            self.btn_close && self.btn_close.removeEventListener(egret.TouchEvent.TOUCH_TAP, self.closePanel, self);
            self.isMaskTouch && self.maskImg && self.maskImg.removeEventListener(egret.TouchEvent.TOUCH_TAP, self.onMaskHandler, self);
            self.removeEventListener(egret.Event.RESIZE, self.onDisplayResizeHandler, self);
        };
        BaseAlert.prototype.onMaskHandler = function () {
            var self = this;
            self.closePanel();
        };
        BaseAlert.prototype.onDisplayResizeHandler = function () {
            var self = this;
            self.x = ((StageUtils.getInstance.stage.stageWidth - (self.width - self.offsetW)) >> 1) + self.offsetX;
            self.y = ((StageUtils.getInstance.stage.stageHeight - (self.height - self.offsetH)) >> 1) + self.offsetY;
        };
        /** 创建遮罩 */
        BaseAlert.prototype.getMask = function (maskAlpha) {
            var rect = new eui.Rect();
            rect.touchEnabled = true;
            rect.percentWidth = 100;
            rect.percentHeight = 100;
            rect.fillColor = 0x0;
            rect.fillAlpha = maskAlpha;
            return rect;
        };
        /** 创建图片遮罩 */
        BaseAlert.prototype.getImgMask = function (maskAlpha) {
            var self = this;
            self.maskImg = new eui.Image();
            self.maskImg.source = "com_json.frame_alpha_1";
            self.maskImg.alpha = maskAlpha;
            self.maskImg.scale9Grid = new egret.Rectangle(12, 12, 76, 76);
            self.maskImg.bottom = 0;
            self.maskImg.top = 0;
            self.maskImg.right = 0;
            self.maskImg.left = 0;
        };
        BaseAlert.prototype.closePanel = function () {
            var self = this;
            if (self.getBackName() != null) {
                ScenesManager.getInstance.openView(UIUtil.createAlert(self.getBackName()));
                return;
            }
            self.dispose();
        };
        //不显示且移除界面
        BaseAlert.prototype.hide = function () {
            _super.prototype.hide.call(this);
            var self = this;
            DisplayUtils.removeFromParent(self.maskImg);
            self.maskImg = null;
            // DisplayUtils.removeFromParent(self.maskRect);
            // self.maskRect = null;
        };
        return BaseAlert;
    }(UI.BaseView));
    UI.BaseAlert = BaseAlert;
    __reflect(BaseAlert.prototype, "UI.BaseAlert");
})(UI || (UI = {}));
