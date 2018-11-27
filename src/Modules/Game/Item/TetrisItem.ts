class TetrisItem extends eui.Component {
	private iconGroup: eui.Group;

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

	private weightList: number[] = [8, 4, 4, 4, 4, 2, 2, 2, 2, 8, 4, 4, 2, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 4, 4, 2, 2, 2, 2];

	private myShape: any[] = [];
	private shapeBox: egret.Sprite = new egret.Sprite();
	private totalWeight: number = 0;
	private shapeLen: number = 0;

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
		self.addChild(self.shapeBox);
		self.creatShape(self.shapeList[self.getRandomShape()]);
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
	private creatShape(shape: any[]): void {
		let self = this;
		self.myShape = shape.concat();
		let ranColor: number = Math.floor(Math.random() * 6) + 1;
		let len1: number = self.myShape.length;
		DisplayUtils.removeAllChildren(self.shapeBox);
		for (let j: number = 0; j < len1; j++) {
			let len2: number = self.myShape[j].length;
			for (let k: number = 0; k < len2; k++) {
				if (self.myShape[j][k] != 0) {
					let block: BlockItem = new BlockItem();
					block.setColor(ranColor);
					block.x = k * block.width;
					block.y = j * block.height;
					self.shapeBox.addChild(block);
				}
			}
		}
	}

	/**展示所有形状 */
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
						block.setColor(ranColor);
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
		self.addEventListener(egret.TouchEvent.TOUCH_TAP, self.clickhandler, self);
	}

	public removeEvent(): void {
		let self = this;
		self.removeEventListener(egret.TouchEvent.TOUCH_TAP, self.clickhandler, self);\
	}

	private clickhandler(): void {
		let self = this;
		self.creatShape(self.shapeList[self.getRandomShape()]);
	}

	public dispose(): void {
		let self = this;
		self.removeEvent();
		DisplayUtils.removeFromParent(self);
	}
}