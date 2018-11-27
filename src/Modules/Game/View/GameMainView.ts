class GameMainView extends UI.BaseScene {
	private shapeList: any[] = [];

	public constructor() {
		super(SkinName.GameMainViewSkin);
	}

	public addEvents(): void {
		super.addEvents();
		let self = this;
	}

	public show(): void {
		super.show();
		let self = this;
		let item:TetrisItem = new TetrisItem();
		self.addChild(item);
	}

	public dispose(): void {
		super.dispose();
		let self = this;
	}
}