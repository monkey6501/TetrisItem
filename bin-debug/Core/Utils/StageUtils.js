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
/**
 * Stage相关工具类
 */
var StageUtils = (function (_super) {
    __extends(StageUtils, _super);
    function StageUtils() {
        return _super.call(this) || this;
    }
    Object.defineProperty(StageUtils, "getInstance", {
        get: function () {
            if (this._instance == null) {
                this._instance = new StageUtils();
            }
            return this._instance;
        },
        enumerable: true,
        configurable: true
    });
    StageUtils.prototype.setup = function (stage) {
        this.stage = stage;
        this.stage.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onStageTab, this);
    };
    StageUtils.prototype.onStageTab = function (evt) {
        // DisplayUtils.traceAllChildren(evt.target);
    };
    StageUtils.getStageScaleX = function () {
        return StageUtils.getInstance.stage.stageWidth / StageUtils.StanderWidth;
    };
    StageUtils.getStageScaleY = function () {
        return StageUtils.getInstance.stage.stageHeight / StageUtils.StanderHeight;
    };
    StageUtils.fillFullStageH = function (display) {
        var w = StageUtils.getInstance.stage.stageWidth;
        var h = StageUtils.getInstance.stage.stageHeight;
        display.width = (h / display.height * display.scaleY) * display.width;
        display.height = h;
    };
    StageUtils.centerDisplayToStage = function (display) {
        var w = StageUtils.getInstance.stage.stageWidth;
        var h = StageUtils.getInstance.stage.stageHeight;
        display.x = (w - display.width) / 2;
        display.y = (h - display.height) / 2;
    };
    /** 设置适配方式 */
    StageUtils.setScaleMode = function (value) {
        StageUtils.getInstance.stage.scaleMode = value;
    };
    /** 设置帧频 */
    StageUtils.setFrameRate = function (value) {
        StageUtils.getInstance.stage.frameRate = value;
    };
    StageUtils.prototype.startFullscreenAdaptation = function (designWidth, designHeight, resizeCallback) {
        this.designWidth = designWidth;
        this.designHeight = designHeight;
        this.resizeCallback = resizeCallback;
        this.stageOnResize();
    };
    StageUtils.prototype.stageOnResize = function () {
        this.getStage().removeEventListener(egret.Event.RESIZE, this.stageOnResize, this);
        var designWidth = this.designWidth;
        var designHeight = this.designHeight;
        var clientWidth = window.innerWidth;
        var clientHeight = window.innerHeight;
        var a = clientWidth / clientHeight;
        var b = designWidth / designHeight;
        var c = a / b;
        if (a > b) {
            var c1 = c;
            var c2 = c;
            designWidth = Math.floor(designWidth * c1);
            designHeight = Math.floor(designHeight * c2);
        }
        this.getStage().setContentSize(designWidth, designHeight);
        this.resizeCallback && this.resizeCallback();
        this.getStage().addEventListener(egret.Event.RESIZE, this.stageOnResize, this);
    };
    /**
     * 获取游戏Stage对象
     * @returns {egret.MainContext}
    */
    StageUtils.prototype.getStage = function () {
        return egret.MainContext.instance.stage;
    };
    StageUtils.StanderWidth = 750;
    StageUtils.StanderHeight = 1334;
    return StageUtils;
}(egret.EventDispatcher));
__reflect(StageUtils.prototype, "StageUtils");
