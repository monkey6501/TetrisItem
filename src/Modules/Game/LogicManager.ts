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
				if (block.x + tetris.x < 0 || block.x + tetris.x >= block.width * LogicManager.MAP_ROW || block.y + tetris.y < 0 || block.y + tetris.y >= block.height * LogicManager.MAP_COL) {
					return true;
				}
			}
		}
		return false;
	}

	/** (sx,sy)这个点是否在这个MapItem中 */
	public inTouchArea(sx: number, sy: number, item: MapItem): boolean {
		if (sx >= item.x && sx < item.x + item.width && sy >= item.y && sy < item.y + item.height) {
			return true;
		} else {
			return false;
		}
	}
}