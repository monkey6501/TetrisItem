class GameMainView extends UI.BaseScene {
	private shapeList: any[] = [];
	private mapGroup: eui.Group;
	private mapItemList: MapItem[][] = [];

	private ranGroup1: eui.Group;
	private ranGroup2: eui.Group;
	private ranGroup3: eui.Group;

	private scoreLabel: eui.Label;

	private moveItem: TetrisItem = new TetrisItem();
	private chooseItem: TetrisItem;

	public constructor() {
		super(SkinName.GameMainViewSkin);
	}

	public addEvents(): void {
		super.addEvents();
		let self = this;
		// self.addEventListener(egret.TouchEvent.TOUCH_TAP, self.clickhandler, self);
		self.ranGroup1.addEventListener(egret.TouchEvent.TOUCH_BEGIN, self.touchBeginHandler, self);
		self.ranGroup2.addEventListener(egret.TouchEvent.TOUCH_BEGIN, self.touchBeginHandler, self);
		self.ranGroup3.addEventListener(egret.TouchEvent.TOUCH_BEGIN, self.touchBeginHandler, self);
		self.addEventListener(egret.TouchEvent.TOUCH_END, self.touchEndHandler, self);
		self.addEventListener(egret.TouchEvent.TOUCH_MOVE, self.touchMoveHandler, self);
		App.TimerManager.doFrame(6, 0, self.enterHandler, self);
	}

	public removeEvents(): void {
		let self = this;
		// self.removeEventListener(egret.TouchEvent.TOUCH_TAP, self.clickhandler, self);
		self.ranGroup1.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, self.touchBeginHandler, self);
		self.ranGroup2.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, self.touchBeginHandler, self);
		self.ranGroup3.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, self.touchBeginHandler, self);
		self.removeEventListener(egret.TouchEvent.TOUCH_END, self.touchEndHandler, self);
		self.addEventListener(egret.TouchEvent.TOUCH_MOVE, self.touchMoveHandler, self);
		App.TimerManager.remove(self.enterHandler, self);
	}

	public show(): void {
		super.show();
		let self = this;
		self.randomTetrisItem();
		self.createMap();
		self.mapGroup.addChild(self.moveItem);
		self.moveItem.visible = false;
	}

	private enterHandler(): void {
		let self = this;
		if (!self.moveItem.visible) return;

		self.updataMap();
	}

	private updataScoreLabel(value: number): void {
		let self = this;
		self.scoreLabel.text = value + "";
	}

	/** 更新地图 */
	private updataMap(): void {
		let self = this;
		for (let i: number = 0; i < LogicManager.MAP_ROW; i++) {
			for (let j: number = 0; j < LogicManager.MAP_COL; j++) {
				let item: MapItem = self.mapItemList[i][j];
				self.checkMapItem(self.moveItem, item);
			}
		}
	}

	/** TOUCH_END 后把阴影的方块固定 */
	private touchEndMapItem(): boolean {
		let self = this;
		let result: boolean = false;
		for (let i: number = 0; i < LogicManager.MAP_ROW; i++) {
			for (let j: number = 0; j < LogicManager.MAP_COL; j++) {
				let item: MapItem = self.mapItemList[i][j];
				if (item.state == 2) {
					LogicManager.getInstance.score++;
					self.updataMapItem(i, j, 1, item.color);
					result = true;
				}
			}
		}
		return result;
	}

	/** 检测地图找出需要消除的占用块 */
	private checkMapBlock(): void {
		let self = this;
		let flagRow: number[] = [];
		for (let i: number = 0; i < LogicManager.MAP_ROW; i++) {
			flagRow.push(i);
			for (let j: number = 0; j < LogicManager.MAP_COL; j++) {
				let item: MapItem = self.mapItemList[i][j];
				if (item.state != 1) {
					flagRow.splice(-1);
					break;
				}
			}
		}

		let flagCol: number[] = [];
		for (let k: number = 0; k < LogicManager.MAP_COL; k++) {
			flagCol.push(k);
			for (let l: number = 0; l < LogicManager.MAP_ROW; l++) {
				let item: MapItem = self.mapItemList[l][k];
				if (item.state != 1) {
					flagCol.splice(-1);
					break;
				}
			}
		}
		if (flagRow.length > 0) {
			self.cleanMapItemList(0, flagRow);
		}
		if (flagCol.length > 0) {
			self.cleanMapItemList(1, flagCol);
		}
	}

	/** 
	 * 清除地图占用条或者列 
	 * type  0:行  1：列
	 * */
	private cleanMapItemList(type: number, indexList: number[]): void {
		let self = this;
		let count: number = type == 0 ? LogicManager.MAP_ROW : LogicManager.MAP_COL;
		for (let j: number = 0; j < indexList.length; j++) {
			for (let i: number = 0; i < count; i++) {
				let row: number = type == 0 ? indexList[j] : i;
				let col: number = type == 0 ? i : indexList[j];
				self.updataMapItem(row, col, 0);
				LogicManager.getInstance.score++;
			}
		}

	}

	/** 清除地图占用块 */
	private cleanMapItem(list: any[]): void {
		let self = this;
		for (let i: number = 0; i < list.length; i++) {
			self.updataMapItem(list[i][0], list[i][1], 0);
		}
	}

	/** 
	 * 设置地图上的 Item 状态
	 * 
	 * 行 -- 列 -- 状态 -- 颜色
	*/
	private updataMapItem(row: number, col: number, state: number, color: number = 1): void {
		let self = this;
		let item: MapItem = self.mapItemList[row][col];
		item.setIconType(color, state);
	}

	/**是否能影射到map上 */
	public checkCanShadow(): boolean {
		let self = this;
		if (LogicManager.getInstance.outOfMap(self.moveItem)) {
			return false;
		}
		if (self.checkOverlap()) {
			return false;
		}
		return true;
	}

	/** 判断 self.moveItem 与地图上非空点是否有重叠 */
	private checkOverlap(): boolean {
		let self = this;
		for (let i: number = 0; i < LogicManager.MAP_ROW; i++) {
			for (let j: number = 0; j < LogicManager.MAP_COL; j++) {
				let item: MapItem = self.mapItemList[i][j];
				if (item.state == 1 && self.checkOverlap2(item)) {
					return true;
				}
			}
		}

		return false;
	}

	/** 判断 一个MapItem 与 self.moveItem 是否有重叠 */
	private checkOverlap2(item: MapItem): boolean {
		let self = this;

		let len: number = self.moveItem.itemList.length;
		for (let i: number = 0; i < len; i++) {
			let len2: number = self.moveItem.itemList[i].length;
			for (let j: number = 0; j < len2; j++) {
				let block: BlockItem = self.moveItem.itemList[i][j];
				if (LogicManager.getInstance.inTouchArea(block.x + self.moveItem.x, block.y + self.moveItem.y, block.width, block.height, item)) {
					return true;
				}
			}
		}

		return false;
	}

	/**
	 * 检测地图小格子与 TetrisItem 中所有的 BlockItem 重叠情况，并更新地图小格子。
	 * 
	 */
	private checkMapItem(tetris: TetrisItem, item: MapItem): void {
		let self = this;
		if (self.checkCanShadow()) {
			let len: number = tetris.itemList.length;
			for (let i: number = 0; i < len; i++) {
				let len2: number = tetris.itemList[i].length;
				for (let j: number = 0; j < len2; j++) {
					let block: BlockItem = tetris.itemList[i][j];
					if (LogicManager.getInstance.inTouchArea(block.x + tetris.x, block.y + tetris.y, block.width, block.height, item)) {
						self.updataMapItem(item.row, item.col, 2, block.iconColor);
						return;
					}
				}
			}
		}

		if (item.state == 2) {
			self.updataMapItem(item.row, item.col, 0);
		}
	}

	private touchBeginHandler(e: egret.TouchEvent): void {
		let self = this;
		self.chooseItem = e.currentTarget.getChildAt(0);
		if (self.chooseItem.state == 1) return;
		e.currentTarget.getChildAt(0).visible = false;
		self.moveItem.creatShape(self.chooseItem.myShape, self.chooseItem.ranColor);
		self.moveItem.x = self.chooseItem.x + e.currentTarget.x - self.mapGroup.x;
		self.moveItem.y = 500;
		self.initOffset(e.stageX, e.stageY);
		self.moveItem.visible = true;
	}

	private touchEndHandler(): void {
		let self = this;
		self.moveItem.visible = false;

		if (self.touchEndMapItem()) {
			self.chooseItem.state = 1;
		}

		for (let i: number = 1; i <= LogicManager.RANDOM_COUNT; i++) {
			let item: TetrisItem = self["ranGroup" + i].getChildAt(0);
			self["ranGroup" + i].getChildAt(0).visible = item.state == 0;
		}
		self.rebuildRanGroup();
		self.checkMapBlock();
		self.updataScoreLabel(LogicManager.getInstance.score);
	}

	/** 判断下方块是否使用完，如使用完新生成 */
	private rebuildRanGroup(): void {
		let self = this;
		for (let i: number = 1; i <= LogicManager.RANDOM_COUNT; i++) {
			let item: TetrisItem = self["ranGroup" + i].getChildAt(0);
			if (item.state == 0) {
				return;
			}
		}
		self.randomTetrisItem();
	}

	private offSetX: number = 0;
	private offSetY: number = 0;
	private initOffset(sx: number, sy: number): void {
		this.offSetX = sx - this.moveItem.x;
		this.offSetY = sy - this.moveItem.y;
	}

	private touchMoveHandler(e: egret.TouchEvent): void {
		let self = this;
		var sX: number = e.stageX;
		var sY: number = e.stageY;
		self.moveItem.x = sX - self.offSetX;
		self.moveItem.y = sY - self.offSetY;
	}

	// private clickhandler(): void {
	// 	let self = this;
	// }

	private createMap(): void {
		let self = this;
		self.mapItemList = [];
		for (let i: number = 0; i < LogicManager.MAP_ROW; i++) {
			let arr: MapItem[] = [];
			for (let j: number = 0; j < LogicManager.MAP_COL; j++) {
				let item: MapItem = new MapItem(i, j);
				item.x = j * item.width;
				item.y = i * item.height;
				self.mapGroup.addChild(item);
				arr.push(item);
			}
			self.mapItemList.push(arr);
		}
	}

	/**随机生成下面的待放入块 */
	private randomTetrisItem(): void {
		let self = this;
		DisplayUtils.removeAllChildren(self.ranGroup1);
		DisplayUtils.removeAllChildren(self.ranGroup2);
		DisplayUtils.removeAllChildren(self.ranGroup3);
		for (let i: number = 1; i <= LogicManager.RANDOM_COUNT; i++) {
			let item: TetrisItem = new TetrisItem();
			item.scaleX = item.scaleY = 0.5;
			self["ranGroup" + i].addChild(item);
		}
	}

	public dispose(): void {
		super.dispose();
		let self = this;
	}
}