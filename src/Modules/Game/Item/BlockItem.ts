class BlockItem extends eui.Component {
	private icon: eui.Image;

	public row: number;
	public col: number;
	public iconColor: number;
	public constructor() {
		super();
		this.skinName = SkinName.BlockItemSkin;
	}

	public childrenCreated() {
		let self = this;
		super.childrenCreated();
		self.addEvents();
	}

	public setData(type: number, r: number, c: number): void {
		let self = this;
		self.iconColor = type;
		self.icon.source = "game_json.item" + type;
		self.row = r;
		self.col = c;
	}

	public addEvents(): void {
		let self = this;
	}

	public removeEvents(): void {
		let self = this;
	}

	public dispose(): void {
		let self = this;
		self.removeEvents();
		DisplayUtils.removeFromParent(self);
	}
}