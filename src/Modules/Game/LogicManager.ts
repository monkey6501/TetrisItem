class LogicManager extends egret.EventDispatcher {
	public constructor() {
		super();
	}

	private static _instance: LogicManager;
	public static get getInstance(): LogicManager {
		if (!LogicManager._instance) {
			LogicManager._instance = new LogicManager();
		}
		return LogicManager._instance;
	}

	/**地图行数量 */
	public static MAP_ROW: number = 8;
	/**地图列数量 */
	public static MAP_COL: number = 8;
	/**每次随机出现方块的数量 */
	public static RANDOM_COUNT: number = 3;
	/**锤子敲碎正方形延伸的范围 */
	public static HAMMER_AREA: number = 1;

	/**锤子使用次数 */
	public hammerTimes: number = 1;

	public score: number = 0;

	public setup(): void {
		let self = this;
		EventsManager.getInstance.addEventListener(EventName.ITEM_CLICK, self.onTetrisItemClick, self);
	}

	private onTetrisItemClick(e: egret.Event): void {
		let self = this;
		//e.data

	}

	/**map里面的 TetrisItem 是否出了map */
	public outOfMap(tetris: TetrisItem): boolean {
		let self = this;
		let len: number = tetris.itemList.length;
		for (let i: number = 0; i < len; i++) {
			let len2: number = tetris.itemList[i].length;
			for (let j: number = 0; j < len2; j++) {
				let block: BlockItem = tetris.itemList[i][j];
				if (block.x + tetris.x + block.width / 2 < 0 || block.x + tetris.x + block.width / 2 >= block.width * LogicManager.MAP_ROW || block.y + tetris.y + block.height / 2 < 0 || block.y + tetris.y + block.height / 2 >= block.height * LogicManager.MAP_COL) {
					return true;
				}
			}
		}
		return false;
	}

	/** 一个形状的中心点是否在 item 区域中 */
	public inTouchArea(sx: number, sy: number, sw: number, sh: number, item: egret.DisplayObjectContainer): boolean {
		if (sx + sw / 2 >= item.x && sx + sw / 2 < item.x + item.width && sy + sh / 2 >= item.y && sy + sh / 2 < item.y + item.height) {
			return true;
		} else {
			return false;
		}
	}

	/** value 在 min和max之间 包含min和max */
	public betweenTwoNumber(value: number, min: number, max: number): boolean {
		if (value >= min && value <= max) {
			return true;
		} else {
			return false;
		}
	}
}