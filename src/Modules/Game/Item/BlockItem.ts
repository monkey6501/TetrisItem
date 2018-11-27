class BlockItem extends eui.Component {
	private icon: eui.Image;
	public constructor() {
		super();
		this.skinName = SkinName.BlockItemSkin;
	}

	public childrenCreated() {
		let self = this;
		super.childrenCreated();
		self.addEvents();
	}

	public setColor(type: number): void {
		let self = this;
		self.icon.source = "game_json.item" + type;
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