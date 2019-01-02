class GameMainView extends UI.BaseScene {
	private shapeList: any[] = [];
	private mapGroup: eui.Group;
	private mapItemList: MapItem[][] = [];

	private ranGroup1: eui.Group;
	private ranGroup2: eui.Group;
	private ranGroup3: eui.Group;

	private scoreLabel: eui.Label;
	private hammerLabel: eui.Label;
	private refreshLabel: eui.Label;

	private moveItem: TetrisItem = new TetrisItem();
	private chooseItem: TetrisItem;

	private destroyBtn: eui.Button;
	private restartBtn: eui.Button;
	private refreshBtn: eui.Button;

	private hammer: eui.Image = new eui.Image();
	private destroyPos: any = {};

	public constructor() {
		super(SkinName.GameMainViewSkin);
	}

	public addEvents(): void {
		super.addEvents();
		let self = this;
		self.destroyBtn.addEventListener(egret.TouchEvent.TOUCH_BEGIN, self.destroyBtnHandler, self);
		self.restartBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, self.restartHandler, self);
		self.refreshBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, self.refreshBtnHandler, self);
		self.ranGroup1.addEventListener(egret.TouchEvent.TOUCH_BEGIN, self.touchBeginHandler, self);
		self.ranGroup2.addEventListener(egret.TouchEvent.TOUCH_BEGIN, self.touchBeginHandler, self);
		self.ranGroup3.addEventListener(egret.TouchEvent.TOUCH_BEGIN, self.touchBeginHandler, self);
		self.addEventListener(egret.TouchEvent.TOUCH_END, self.touchEndHandler, self);
		self.addEventListener(egret.TouchEvent.TOUCH_MOVE, self.touchMoveHandler, self);
	}

	public removeEvents(): void {
		let self = this;
		self.destroyBtn.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, self.destroyBtnHandler, self);
		self.restartBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, self.restartHandler, self);
		self.refreshBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, self.refreshBtnHandler, self);
		self.ranGroup1.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, self.touchBeginHandler, self);
		self.ranGroup2.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, self.touchBeginHandler, self);
		self.ranGroup3.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, self.touchBeginHandler, self);
		self.removeEventListener(egret.TouchEvent.TOUCH_END, self.touchEndHandler, self);
		self.removeEventListener(egret.TouchEvent.TOUCH_MOVE, self.touchMoveHandler, self);
	}

	public show(): void {
		super.show();
		let self = this;
		self.randomTetrisItem();
		self.createMap();
		self.mapGroup.addChild(self.moveItem);
		self.mapGroup.addChild(self.hammer);
		self.hammer.source = "game_json.icon1";
		self.hammer.visible = false;
		self.moveItem.visible = false;
		self.hammerLabel.text = LogicManager.HAMMER_TIMES + "";
		self.refreshLabel.text = LogicManager.REFRESH_TIMES + "";
	}

	/** 出现移动块，更新地图 */
	private updataMap(): void {
		let self = this;
		for (let i: number = 0; i < LogicManager.MAP_ROW; i++) {
			for (let j: number = 0; j < LogicManager.MAP_COL; j++) {
				let item: MapItem = self.mapItemList[i][j];
				self.checkMapItem(self.moveItem, item);
			}
		}
	}

	/**
	 * 检测地图小格子与移动的 TetrisItem 中所有的 BlockItem 重叠情况，并更新地图小格子。
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

	/**通过中心坐标找到对应的 MapItem */
	private findItemByCenterPos(posx: number, posy: number): MapItem {
		let self = this;
		let item: MapItem = self.mapItemList[1][1];//这个item 的x就是item的宽度，y就是item的高度
		let r: number = Math.floor(posy / item.y);
		let c: number = Math.floor(posx / item.x);
		if (LogicManager.getInstance.betweenTwoNumber(r, 0, LogicManager.MAP_ROW - 1) && LogicManager.getInstance.betweenTwoNumber(c, 0, LogicManager.MAP_COL - 1)) {
			return self.mapItemList[r][c];
		} else {
			return null;
		}
	}

	/** 根据锤子位置检测地图，并更新地图小格子。 */
	private checkHammerMapItem(item: MapItem): void {
		let self = this;
		self.destroyPos = item ? { row: item.row, col: item.col } : null;
		self.showDestroyArea(item);
	}

	/** 展示销毁面积 */
	private showDestroyArea(item: MapItem): void {
		let self = this;
		for (let i: number = 0; i < LogicManager.MAP_ROW; i++) {
			for (let j: number = 0; j < LogicManager.MAP_COL; j++) {
				let mapItem: MapItem = self.mapItemList[i][j];
				if (item && LogicManager.getInstance.betweenTwoNumber(i, item.row - LogicManager.HAMMER_AREA, item.row + LogicManager.HAMMER_AREA) &&
					LogicManager.getInstance.betweenTwoNumber(j, item.col - LogicManager.HAMMER_AREA, item.col + LogicManager.HAMMER_AREA)
				) {
					mapItem.showDestroyShadow(1);
				} else {
					mapItem.showDestroyShadow(0);
				}
			}
		}
	}

	/**检测锤子是否在地图上 */
	private checkHammerInMap(): boolean {
		let self = this;
		return LogicManager.getInstance.inTouchArea(self.hammer.x + self.mapGroup.x, self.hammer.y + self.mapGroup.y, self.hammer.width, self.hammer.height, self.mapGroup)
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
					SdkManager.getInstance.setUserCloudStorage();
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
				SdkManager.getInstance.setUserCloudStorage();
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

	

	private touchBeginHandler(e: egret.TouchEvent): void {
		let self = this;
		self.chooseItem = e.currentTarget.getChildAt(0);
		if (self.chooseItem.state == 1 || !self.chooseItem.canUse) return;
		e.currentTarget.getChildAt(0).visible = false;
		self.moveItem.creatShape(self.chooseItem.myShape, self.chooseItem.ranColor);
		self.moveItem.x = self.chooseItem.x + e.currentTarget.x - self.mapGroup.x;
		self.moveItem.y = 500;
		self.initOffset(e.stageX, e.stageY);
		self.moveItem.visible = true;
	}

	private offSetX: number = 0;
	private offSetY: number = 0;
	private initOffset(sx: number, sy: number): void {
		this.offSetX = sx - this.moveItem.x;
		this.offSetY = sy - this.moveItem.y;
	}

	private offSetX1: number = 0;
	private offSetY1: number = 0;
	private initHarmmerOffset(sx: number, sy: number): void {
		this.offSetX1 = sx - this.hammer.x;
		this.offSetY1 = sy - this.hammer.y;
	}

	private touchMoveHandler(e: egret.TouchEvent): void {
		let self = this;
		var sX: number = e.stageX;
		var sY: number = e.stageY;
		if (self.moveItem.visible) {
			self.moveItem.x = sX - self.offSetX;
			self.moveItem.y = sY - self.offSetY;
			self.updataMap();
		}
		if (self.hammer.visible) {
			self.hammer.x = sX - self.offSetX1;
			self.hammer.y = sY - self.offSetY1;
			self.checkHammerMapItem(self.findItemByCenterPos(self.hammer.x + self.hammer.width / 2, self.hammer.y + self.hammer.height / 2));
		}
	}

	private touchEndHandler(): void {
		let self = this;
		if (self.hammer.visible) {
			self.hammerRelease();
			self.hammer.visible = false;
			self.updataTetrisFilter();
			return;
		}
		if (!self.moveItem.visible) {
			return;
		}
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
		self.scoreLabel.text = LogicManager.getInstance.score + "";
		if (!self.canContinue()) {
			MessageManger.getInstance.showText("没有可以放入的");
		}
		self.updataTetrisFilter();
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
		self.updataTetrisFilter();
	}

	/** 判断是否能继续加块 */
	private canContinue(): boolean {
		let self = this;
		let result: boolean = false;
		for (let i: number = 1; i <= LogicManager.RANDOM_COUNT; i++) {
			let item: TetrisItem = self["ranGroup" + i].getChildAt(0);
			if (item.state == 0 && self.checkItemAddMap(item)) {
				return true;
			}
		}
		return result;
	}

	/** 检测 TetrisItem 能不能放到 Map 中 */
	private checkItemAddMap(item: TetrisItem): boolean {
		let self = this;
		for (let i: number = 0; i < LogicManager.MAP_ROW; i++) {
			if (i > LogicManager.MAP_ROW - item.myShape.length) {
				return false;
			}
			for (let j: number = 0; j < LogicManager.MAP_COL; j++) {
				if (j > LogicManager.MAP_COL - item.myShape[0].length) {
					break;
				}
				if (self.checkMatchShape(i, j, item)) {
					return true;
				}
			}
		}
		return false;
	}

	/**更新下面块的filter */
	private updataTetrisFilter(): void {
		let self = this;
		for (let i: number = 1; i <= LogicManager.RANDOM_COUNT; i++) {
			let item: TetrisItem = self["ranGroup" + i].getChildAt(0);
			item.canUse = item.state == 0 && self.checkItemAddMap(item);
		}
	}

	/** 从地图的一个点出发往右下延伸一块 TetrisItem 矩形区域，这个区域是否存在与给的 TetrisItem 相匹配的形状 */
	private checkMatchShape(r: number, c: number, item: TetrisItem): boolean {
		let self = this;
		let result: boolean = true;
		for (let i: number = 0; i < item.myShape.length; i++) {
			for (let j: number = 0; j < item.myShape[i].length; j++) {
				let mapItem: MapItem = self.mapItemList[i + r][j + c];
				if (item.myShape[i][j] == 1 && mapItem.state == 1) {
					return false;
				}
			}
		}
		return result;
	}

	/** 重新开始游戏 */
	private restartHandler(): void {
		let self = this;
		self.clearMap();
		self.randomTetrisItem();
		LogicManager.getInstance.score = 0;
		LogicManager.getInstance.hammerTimes = LogicManager.HAMMER_TIMES;
		LogicManager.getInstance.refreshTimes = LogicManager.REFRESH_TIMES;
		self.hammerLabel.text = LogicManager.getInstance.hammerTimes + "";
		self.scoreLabel.text = LogicManager.getInstance.score + "";
		self.refreshLabel.text = LogicManager.getInstance.refreshTimes + "";
	}

	/** 销毁地图格子 */
	private destroyBtnHandler(e: egret.TouchEvent): void {
		let self = this;
		if (LogicManager.getInstance.hammerTimes > 0) {
			self.hammer.visible = true;
			self.hammer.x = e.stageX - self.mapGroup.x;
			self.hammer.y = 600;
			self.initHarmmerOffset(e.stageX, e.stageY);
		} else {
			MessageManger.getInstance.showText("锤子已经使用完")
		}
	}

	/** 刷新待放入块 */
	private refreshBtnHandler(): void {
		let self = this;
		if (LogicManager.getInstance.refreshTimes > 0) {
			LogicManager.getInstance.refreshTimes--;
			self.refreshLabel.text = LogicManager.getInstance.refreshTimes + "";
			self.randomTetrisItem();
			self.updataTetrisFilter();
		} else {
			MessageManger.getInstance.showText("刷新已经使用完")
		}
	}

	/**释放锤子 */
	private hammerRelease(): void {
		let self = this;
		if (!self.destroyPos) return;
		let destroyCount: number = 0;
		for (let i: number = self.destroyPos.row - LogicManager.HAMMER_AREA; i <= self.destroyPos.row + LogicManager.HAMMER_AREA; i++) {
			for (let j: number = self.destroyPos.col - LogicManager.HAMMER_AREA; j <= self.destroyPos.col + LogicManager.HAMMER_AREA; j++) {
				if (LogicManager.getInstance.betweenTwoNumber(i, 0, LogicManager.MAP_ROW - 1) && LogicManager.getInstance.betweenTwoNumber(j, 0, LogicManager.MAP_COL - 1)) {
					let item: MapItem = self.mapItemList[i][j];
					if (item.state == 1) {
						destroyCount++;
					}
					self.updataMapItem(i, j, 0);
				}
			}
		}
		if (destroyCount > 0) {
			LogicManager.getInstance.hammerTimes--;
			self.hammerLabel.text = LogicManager.getInstance.hammerTimes + "";
		}
	}

	/**清空地图 */
	private clearMap(): void {
		let self = this;
		for (let i: number = 0; i < LogicManager.MAP_ROW; i++) {
			for (let j: number = 0; j < LogicManager.MAP_COL; j++) {
				let item: MapItem = self.mapItemList[i][j];
				item.setIconType(1, 0);
			}
		}
	}

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