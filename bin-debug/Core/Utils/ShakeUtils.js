var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var ShakeUtils = (function () {
    function ShakeUtils() {
        this.count = 0; //计时器次数
    }
    Object.defineProperty(ShakeUtils, "Instance", {
        get: function () {
            if (this._instance == null) {
                this._instance = new ShakeUtils();
            }
            return this._instance;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * 震动显示对象
     * @param        target    震动目标对象
     * @param        time      震动持续时长（秒）
     * @param        rate      震动频率(一秒震动多少次)
     * @param        maxDis    震动最大距离
     */
    ShakeUtils.prototype.shakeObj = function (target, time, rate, maxDis) {
        this.target = target;
        this.initX = target.x;
        this.initY = target.y;
        this.maxDis = maxDis;
        this.count = time * rate;
        this.rate = rate;
        App.TimerManager.doTimer(1000 / rate, this.count, this.shaking, this, this.shakeComplete, this);
    };
    ShakeUtils.prototype.shaking = function () {
        egret.Tween.removeTweens(this.target);
        this.target.x = this.initX - this.maxDis + Math.random() * this.maxDis * 2;
        this.target.y = this.initY - this.maxDis + Math.random() * this.maxDis * 2;
        egret.Tween.get(this.target).to({ x: this.initX, y: this.initY }, 999 / this.rate);
    };
    ShakeUtils.prototype.shakeComplete = function () {
        if (this.target) {
            egret.Tween.removeTweens(this.target);
            this.target.x = this.initX;
            this.target.y = this.initY;
        }
        App.TimerManager.remove(this.shaking, this);
    };
    /**停止震动 */
    ShakeUtils.prototype.stop = function () {
        this.shakeComplete();
    };
    return ShakeUtils;
}());
__reflect(ShakeUtils.prototype, "ShakeUtils");
//# sourceMappingURL=ShakeUtils.js.map