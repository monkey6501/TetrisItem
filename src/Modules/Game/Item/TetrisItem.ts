class TetrisItem extends eui.Component {
	/**
	 *    1   2   3    4    5   6     7   8     9     10    11   12    13   14    15    16    17   18   19   20    21   22   23   24     25  26    27     28    29   30
	 *    *   **  *   ***   *   *     *   **   **     **   ****   *   **     **    *    *     **   **   *     *   ***  ***  *       *  *****  *   ***    ***     *   * 
	 *            *         *   **   **    *   *      **          *    **   **    **    **    *     *   *     *     *  *    ***   ***         *     *    *       *   *
	 *                      *                                     *               *      *    *     *   **   **                               *     *    *     ***   *** 
	 *                                                            *                                                                           *
	 *                                                                                                                                        *
	 */
	private shapeList: any[][] = [[[1]],

	[[1, 1]],
	[[1], [1]],

	[[1, 1, 1]],
	[[1], [1], [1]],
	[[1, 0], [1, 1]],
	[[0, 1], [1, 1]],
	[[1, 1], [0, 1]],
	[[1, 1], [1, 0]],

	[[1, 1], [1, 1]],
	[[1, 1, 1, 1]],
	[[1], [1], [1], [1]],
	[[1, 1, 0], [0, 1, 1]],
	[[0, 1, 1], [1, 1, 0]],
	[[0, 1], [1, 1], [1, 0]],
	[[1, 0], [1, 1], [0, 1]],
	[[1, 1], [1, 0], [1, 0]],
	[[1, 1], [0, 1], [0, 1]],
	[[1, 0], [1, 0], [1, 1]],
	[[0, 1], [0, 1], [1, 1]],
	[[1, 1, 1], [0, 0, 1]],
	[[1, 1, 1], [1, 0, 0]],
	[[1, 0, 0], [1, 1, 1]],
	[[0, 0, 1], [1, 1, 1]],

	[[1, 1, 1, 1, 1]],
	[[1], [1], [1], [1], [1]],
	[[1, 1, 1], [0, 0, 1], [0, 0, 1]],
	[[1, 1, 1], [1, 0, 0], [1, 0, 0]],
	[[0, 0, 1], [0, 0, 1], [1, 1, 1]],
	[[1, 0, 0], [1, 0, 0], [1, 1, 1]]
	];

	private iconGroup: eui.Group;
	private weightList: number[] = [8, 4, 4, 4, 4, 2, 2, 2, 2, 8, 4, 4, 2, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 4, 4, 2, 2, 2, 2];

	private totalWeight: number = 0;
	private shapeLen: number = 0;
	public myShape: any[] = [];
	public ranColor: number;
	/** 0:没有使用  1:已经使用  */
	public state: number = 0;

	public itemList: BlockItem[][] = [];

	public constructor() {
		super();
		this.skinName = SkinName.TetrisItemSkin;
	}

	public childrenCreated() {
		let self = this;
		super.childrenCreated();
		self.initData();
		self.initView();
		self.addEvent();
	}

	private initView(): void {
		let self = this;
		// self.showAllShape();
		self.addChild(self.iconGroup);
		self.ranColor = Math.floor(Math.random() * 6) + 1;
		self.creatShape(self.shapeList[self.getRandomShape()], self.ranColor);
	}

	/**初始化数据 */
	private initData(): void {
		let self = this;
		self.totalWeight = 0;
		self.shapeLen = self.weightList.length;
		for (let i: number = 0; i < self.shapeLen; i++) {
			self.totalWeight += self.weightList[i];
		}
	}

	/**获取随机形状的index */
	private getRandomShape(): number {
		let self = this;
		let randomShape: number = Math.floor(self.totalWeight * Math.random()) + 1;
		for (let i: number = 0; i < self.shapeLen; i++) {
			if (randomShape <= self.weightList[i]) {
				return i;
			}
			randomShape -= self.weightList[i];
		}
		return 0;
	}

	/**创建形状 */
	public creatShape(shape: any[], colorType: number): void {
		let self = this;
		self.myShape = shape.concat();
		let len1: number = self.myShape.length;
		self.itemList = [];
		DisplayUtils.removeAllChildren(self.iconGroup);
		for (let j: number = 0; j < len1; j++) {
			let len2: number = self.myShape[j].length;
			let arr: BlockItem[] = [];
			for (let k: number = 0; k < len2; k++) {
				if (self.myShape[j][k] != 0) {
					let block: BlockItem = new BlockItem();
					block.setData(colorType, j, k);
					block.x = k * block.width;
					block.y = j * block.height;
					self.iconGroup.addChild(block);
					arr.push(block);
				}
			}
			self.itemList.push(arr);
		}
	}

	/**展示所有形状---测试用的 */
	private showAllShape(): void {
		let self = this;
		let ranShape: any[] = self.shapeList[Math.floor(self.shapeLen * Math.random())];
		console.log("self.shapeLen :" + self.shapeLen)
		for (let i: number = 0; i < self.shapeLen; i++) {
			let len1: number = self.shapeList[i].length;
			let tetrisBox: egret.Sprite = new egret.Sprite();
			let ranColor: number = Math.floor(Math.random() * 6) + 1;
			for (let j: number = 0; j < len1; j++) {
				let len2: number = self.shapeList[i][j].length;
				for (let k: number = 0; k < len2; k++) {
					if (self.shapeList[i][j][k] != 0) {
						let block: BlockItem = new BlockItem();
						block.setData(ranColor, j, k);
						block.x = k * block.width;
						block.y = j * block.height;
						tetrisBox.addChild(block);
					}
				}
			}
			tetrisBox.x = i % 4 * 150;
			tetrisBox.y = Math.floor(i / 4) * 150;
			tetrisBox.scaleX = tetrisBox.scaleY = 0.4
			self.addChild(tetrisBox);
		}
	}

	public addEvent(): void {
		let self = this;
		self.addEventListener(egret.TouchEvent.TOUCH_BEGIN, self.touchBeginHandler, self);
		self.addEventListener(egret.Event.REMOVED_FROM_STAGE, self.removeFromStage, self);
	}

	public removeEvent(): void {
		let self = this;
		self.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, self.touchBeginHandler, self);
	}

	private removeFromStage(): void {
		let self = this;
		self.removeEventListener(egret.Event.REMOVED_FROM_STAGE, self.removeFromStage, self);
		self.dispose();
	}

	private touchBeginHandler(): void {
		let self = this;
		// self.setVisible(false);
		EventsManager.getInstance.dispatchEventWith(EventName.ITEM_CLICK, false, { type: self.ranColor, shape: self.myShape });
	}

	public setVisible(value: boolean): void {
		let self = this;
		self.iconGroup.visible = value;
	}

	public dispose(): void {
		let self = this;
		self.removeEvent();
		DisplayUtils.removeFromParent(self);
	}
}