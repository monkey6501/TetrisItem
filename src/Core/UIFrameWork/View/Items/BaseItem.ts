module UI {
	export class BaseItem extends eui.ItemRenderer {

		protected _info: any;
		protected _select: boolean = false;

		public constructor(skinName: string) {
			super()
			let self = this;
			self.skinName = skinName;
			self.addEventListener(egret.Event.REMOVED_FROM_STAGE, self.onRemoveFromStage, self, false);
			self.addEventListener(egret.Event.ADDED_TO_STAGE, self.onAddToStage, self, false);
		}

		public childrenCreated() {
			super.childrenCreated();
			let self = this;
			LanguageManager.getInstance.setModuleLanguage(self);
		}

		public update(info: any = null, ...args) {
			if (info) {
				this._info = info;
			}
			this.updateView();
		}

		public updateView(...args): void {
			let self = this;

		}

		public hasData(dataName: string): boolean {
			let self = this;
			let list: string[] = self.getDatas();
			for (let i = 0; i < list.length; i++) {
				if (list[i] == dataName) {
					return true;
				}
			}
			return false;
		}
		public getDatas(): string[] {
			return null;
		}

		public onDataChanged(dataName: string, ...args) {

		}
		protected onAddToStage(evt: egret.Event): void {
			let self = this;
			self.showToStage();
			self.addEvents();
		}
		protected showToStage() {
			let self = this;

		}
		/**移出舞台后调用 */
		protected onRemoveFromStage(evt: egret.Event): void {
			let self = this;
			self.removeEvents();
		}
		protected selectView() {

		}
		public set select(value: boolean) {
			let self = this;
			self._select = value;
			self.selectView();
		}

		public get select(): boolean {
			return this._select;
		}

		protected addEvents(): void {
			let self = this;
		}

		protected removeEvents(): void {
			let self = this;
		}

		public hide(): void {
			let self = this;
			if (self.parent != null) {
				self.parent.removeChild(self);
			}
		}
		/** 点击回调 */
		protected gotoCallBack() { }

		public dispose() {
			let self = this;
			self.hide();
		}
	}
}