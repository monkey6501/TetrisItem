class ShakeUtils {
	private static _instance: ShakeUtils;   //单例
	private initX: number;                //初始位置
	private initY: number;
	private target: egret.DisplayObject;  //震动目标
	private maxDis: number;              //震动距离
	private count: number = 0;           //计时器次数
	private rate: number;                //一秒震动次数

	public static get Instance(): ShakeUtils {
		if (this._instance == null) {
			this._instance = new ShakeUtils();
		}
		return this._instance;
	}

    /**
     * 震动显示对象
     * @param        target    震动目标对象
     * @param        time      震动持续时长（秒）
     * @param        rate      震动频率(一秒震动多少次)
     * @param        maxDis    震动最大距离
     */
	public shakeObj(target: egret.DisplayObject, time: number, rate: number, maxDis: number): void {
		this.target = target;
		this.initX = target.x;
		this.initY = target.y;
		this.maxDis = maxDis;
		this.count = time * rate;
		this.rate = rate;
		App.TimerManager.doTimer(1000 / rate, this.count, this.shaking, this, this.shakeComplete, this);
	}

	private shaking(): void {
		egret.Tween.removeTweens(this.target);
		this.target.x = this.initX - this.maxDis + Math.random() * this.maxDis * 2;
		this.target.y = this.initY - this.maxDis + Math.random() * this.maxDis * 2;
		egret.Tween.get(this.target).to({ x: this.initX, y: this.initY }, 999 / this.rate);
	}

	private shakeComplete(): void {
		if (this.target) {
			egret.Tween.removeTweens(this.target);
			this.target.x = this.initX;
			this.target.y = this.initY;
		}
		App.TimerManager.remove(this.shaking, this);
	}

	/**停止震动 */
	public stop() {
		this.shakeComplete();
	}
}