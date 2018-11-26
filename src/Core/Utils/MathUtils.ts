class MathUtils {
	public constructor() {
	}

	public static Deg2Rad: number = 0.01745329;
	public static Rad2Deg: number = 57.29578;
	public static Max: number = 9999999;

	public static Clamp(maxValue, minValue, value) {
		return Math.max(minValue, Math.min(value, maxValue));
	}

	public static Approximately(a, b): boolean {
		return Math.abs(a - b) < 0.01;
	}

	public static Range(start: number, end: number): number {
		let max: number = Math.max(start, end);
		let min: number = Math.min(start, end);
		return Math.random() * (max - min) + min;
	}

	public static moveToNextPosition(startPoint: egret.Point, endPoint: egret.Point, speed: number) {
		let angle = MathUtils.getAngle(startPoint, endPoint);
		let resultX = startPoint.x + speed * Math.cos(angle * Math.PI / 180);
		let resultY = startPoint.y - speed * Math.sin(angle * Math.PI / 180);
		startPoint.x = resultX;
		startPoint.y = resultY;
	}

	public static getAngle(point1: egret.Point, point2: egret.Point): number {
		let vx = point2.x - point1.x;
		let vy = point2.y - point1.y;
		let hyp = Math.sqrt(Math.pow(vx, 2) + Math.pow(vy, 2));
		let rad = Math.acos(vx / hyp);
		let deg = 180 / (Math.PI / rad);
		//得到了一个角度“rad”，不过是以弧度为单位的
		//把它转换成角度 
		if (vy < 0) {
			deg = (-deg);
		} else if ((vy == 0) && (vx < 0)) {
			deg = 180;
		}
		return deg;
	}

	public static getNewAngle(point1: egret.Point, point2: egret.Point): number {
		let angle = 180 + Math.atan2(point1.x - point2.x, point1.y - point2.y) * 180 / Math.PI;
		return angle;
	}

	public static randomBool(): boolean {
		return Math.round(Math.random()) == 1;
	}

	public static randomPointFromRect(rect: number[]): egret.Point {
		let self = this;
		let pos: egret.Point = new egret.Point();
		pos.x = Math.random() * rect[2] + rect[0];
		pos.y = Math.random() * rect[3] + rect[1];
		return pos;
	}
}