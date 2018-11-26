/**
 * Stage相关工具类
 */
class StageUtils extends egret.EventDispatcher {

    public constructor() {
        super();
    }
    private static _instance: StageUtils;
    public static get getInstance(): StageUtils {
        if (this._instance == null) {
            this._instance = new StageUtils();
        }
        return this._instance;
    }


    public stage: egret.Stage;
    public setup(stage: egret.Stage) {
        this.stage = stage;
        this.stage.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onStageTab, this);
    }

    private onStageTab(evt: egret.TouchEvent): void {
        // DisplayUtils.traceAllChildren(evt.target);
    }

    public static StanderWidth: number = 750;
    public static StanderHeight: number = 1334;
    public static getStageScaleX(): number {
        return StageUtils.getInstance.stage.stageWidth / StageUtils.StanderWidth;
    }

    public static getStageScaleY(): number {
        return StageUtils.getInstance.stage.stageHeight / StageUtils.StanderHeight;
    }

    public static fillFullStageH(display: egret.DisplayObject): void {
        let w: number = StageUtils.getInstance.stage.stageWidth;
        let h: number = StageUtils.getInstance.stage.stageHeight;
        display.width = (h / display.height * display.scaleY) * display.width;
        display.height = h;
    }

    public static centerDisplayToStage(display: egret.DisplayObject): void {
        let w: number = StageUtils.getInstance.stage.stageWidth;
        let h: number = StageUtils.getInstance.stage.stageHeight;
        display.x = (w - display.width) / 2;
        display.y = (h - display.height) / 2;
    }
    /** 设置适配方式 */
    public static setScaleMode(value: any): void {
        StageUtils.getInstance.stage.scaleMode = value;
    }
    /** 设置帧频 */
    public static setFrameRate(value: number): void {
        StageUtils.getInstance.stage.frameRate = value;
    }

    /**
     * 开启全屏适配方案
     */
    private designWidth: number;
    private designHeight: number;
    private resizeCallback: Function;

    public startFullscreenAdaptation(designWidth: number, designHeight: number, resizeCallback: Function): void {
        this.designWidth = designWidth;
        this.designHeight = designHeight;
        this.resizeCallback = resizeCallback;
        this.stageOnResize();
    }

    private stageOnResize(): void {
        this.getStage().removeEventListener(egret.Event.RESIZE, this.stageOnResize, this);

        var designWidth: number = this.designWidth;
        var designHeight: number = this.designHeight;
        var clientWidth: number = window.innerWidth;
        var clientHeight: number = window.innerHeight;
        var a: number = clientWidth / clientHeight;
        var b: number = designWidth / designHeight;
        var c: number = a / b;
        if (a > b) {
            var c1 = c;
            var c2 = c;
            designWidth = Math.floor(designWidth * c1);
            designHeight = Math.floor(designHeight * c2);
        }
        this.getStage().setContentSize(designWidth, designHeight);

        this.resizeCallback && this.resizeCallback();

        this.getStage().addEventListener(egret.Event.RESIZE, this.stageOnResize, this);
    }

    /**
     * 获取游戏Stage对象
     * @returns {egret.MainContext}
    */
    public getStage(): egret.Stage {
        return egret.MainContext.instance.stage;
    }
}
