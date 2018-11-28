class MapItem extends eui.Component {
	private blank: eui.Image;
	private icon: eui.Image;

	private _state: number = 0;
	public row: number = 0;
	public col: number = 0;
	public color: number;

	public constructor(r: number, c: number) {
		super();
		this.skinName = SkinName.MapItemSkin;
		this.row = r;
		this.col = c;
	}

	public childrenCreated() {
		let self = this;
		super.childrenCreated();
	}

	/**设置icon状态 
	 * 
	 * state -- 0:没被占用不显示  1：被占用显示  2:没被占用显示阴影
	*/
	public setIconType(color: number, state: number): void {
		let self = this;
		self.color = color;
		self.icon.source = "game_json.item" + color;
		self._state = state;
		if (self._state == 0) {
			self.icon.visible = false;
		} else if (self._state == 1) {
			self.icon.visible = true;
			self.icon.alpha = 1;
		} else {
			self.icon.visible = true;
			self.icon.alpha = 0.5;
		}
	}

	public get state(): number {
		let self = this;
		return self._state;
	}

	public dispose(): void {
		let self = this;
		DisplayUtils.removeFromParent(self);
	}
}