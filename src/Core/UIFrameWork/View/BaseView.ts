module UI {
	export class BaseView extends eui.Component {

		protected uiskinPath: string;
		public skin_window: BaseView;
		private _tabIndex: number;
		protected group_bottom: eui.Group;
		protected group_center: eui.Group;
		protected group_scaleX: eui.Group;
		protected _bottom: number = 0;
		protected _centerTop: number = 0;
		protected _centerBottom: number = 0;
		public startY: number = 0;
		public data: any;
		public backName: string;
		public _data: any;
		/** 是否缓存 */
		public isCache: boolean = true;
		protected _needLoadResGroupList: Array<string> = [];
		protected _needLoadResItemList: Array<string> = [];
		public uiName: string = "";
		public type: number = 0;
		public isComplete: boolean = false;
		public fullScreen: boolean = false;

		public constructor(uiskinPath: string) {
			super();
			let self = this;
			self.uiskinPath = uiskinPath;
		}
		/**初始化界面 */
		public init(data?: any, completeCallBack?: Function): void {
			let self = this;
			this.data = data;
			self.loadRes();
		}
		/** 初始化皮肤 */
		protected initSkinView(): void {
			let self = this;
			if (self.isComplete) {
				self.show();
			}
			else {
				this.addEventListener(eui.UIEvent.COMPLETE, this.createCompleteEvent, this);
			}
			this.skinName = this.uiskinPath;
		}
		/**创建成功后 */
		protected createCompleteEvent(event: eui.UIEvent): void {
			let self = this;
			self.isComplete = true;
			self.removeEventListener(eui.UIEvent.COMPLETE, self.createCompleteEvent, this);
			LanguageManager.getInstance.setModuleLanguage(self);
			self.addEvents();
			self.show();
		}

		public set tabIndex(value: number) {
			this._tabIndex = value;
			if (this.skin_window) {
				this.skin_window["tabIndex"] = this._tabIndex;
			}
		}

		public get tabIndex(): number {
			return this._tabIndex;
		}

		public onTabClick(index: number) {
			this._tabIndex = index;
		}

		protected childrenCreated(): void {
			super.childrenCreated();
			this.group_bottom && this.group_bottom.addEventListener(egret.Event.RESIZE, this.onBottomResize, this);
			this.onStageResize();
		}

		protected onStageResize() {
			let self = this;
			self.group_bottom && self.onBottomResize();
			self.group_center && self.onCenterResize();
			self.group_scaleX && self.onGroupScaleX();

		}

		protected onGroupScaleX() {
			let self = this;
			if (!self.group_scaleX) return;
			self.group_scaleX.x = 0;
			self.group_scaleX.y = 0;
			self.group_scaleX.width = StageUtils.getInstance.stage.stageWidth;
			self.group_scaleX.height = StageUtils.getInstance.stage.stageHeight;
		}

		protected onBottomResize() {
			let self = this;
			if (!self.group_bottom) return;
			self._bottom = self.group_bottom.bottom || self._bottom;
			self.group_bottom.bottom = undefined;
			self.group_bottom.y = StageUtils.getInstance.stage.stageHeight - self._bottom - self.group_bottom.height + self.startY;
		}
		protected onCenterResize() {
			let self = this;
			if (!this.group_center) return;
			self._centerTop = self.group_center.top || self._centerTop;
			self.group_center.top = undefined;
			self._centerBottom = self.group_center.bottom || self._centerBottom;
			self.group_center.bottom = undefined;
			self.group_center.y = self._centerTop;
			self.group_center.height = StageUtils.getInstance.stage.stageHeight - self._centerBottom - self._centerTop + self.startY;
		}
		/** 加载组资源 */
		public loadRes(): void {
			let self = this;
			let loadGroup: string[] = self.getNeedResGroup().concat(self.getNeedResItemList());
			if (loadGroup != null && loadGroup.length > 0) {
				ResUtil.getInstance.loadGroupWithPro(loadGroup, self.loadComplete, null, self);
			}
			else {
				self.loadComplete();
			}
		}
		/** 组资源加载完毕，初始化皮肤 */
		protected loadComplete(): void {
			let self = this;
			// BigLoading.getInstance.hideLoading();
			self.initSkinView();
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
		public getNeedResGroup(): Array<string> { return this._needLoadResGroupList; }
		public getNeedResItemList(): Array<string> {
			return this._needLoadResItemList;
		}
		// //返回界面名
		public getName(): any {
			return null;
		}
		//返回上一级界面名
		public getBackName(): any {
			return null;
		}
		//显示界面 
		public show(): void {
			let self = this;
			self.showCreatAccountView();
		}
		//更新
		public update(data?: any): void {
			if (data) this._data = data;
		}
		//显示在舞台
		public showToStage(): void {
			let self = this;
		}
		//显示创建绘制示图
		public showCreatAccountView(): void {
			let self = this;
			self.showToStage();
		}
		/** 添加监听器 */
		public addEvents(): void {

		}
		/** 移除监听器 */
		public removeEvents(): void {

		}

		public close(): void {
			let self = this;
			ScenesManager.getInstance.currView = null;
			self.dispose();
		}
		//不显示界面
		public hide(): void {
			let self = this;
		}
		// 是否需要释放此模块内存
		public isNeedToRelease(): boolean {
			return true;
		}
		//消毁
		public dispose(): void {
			let self = this;
			self.removeEvents();
			self.data = null;
			if (self.isCache == false) self.disposeRes();
			self.group_bottom && self.group_bottom.removeEventListener(egret.Event.RESIZE, self.onBottomResize, self);
			self.hide();
			if (self["skin_window"]) {
				self["skin_window"].dispose();
			}
			if (self.fullScreen) {
				ScenesManager.getInstance.ShowScene();
			}
			ScenesManager.getInstance.views.Remove(self.uiName);
			ScenesManager.getInstance.currView = null;
			DisplayUtils.removeFromParent(self);
		}
		/** 清楚组资源 */
		protected disposeRes(): void {
			let self = this;
			self.isComplete = false;
			while (self._needLoadResGroupList && self._needLoadResGroupList.length > 0) {
				let name: string = self._needLoadResGroupList.pop();
				RES.destroyRes(name);
			}
			while (self._needLoadResItemList && self._needLoadResItemList.length > 0) {
				let itemName: string = self._needLoadResItemList.pop();
				RES.destroyRes(itemName);
			}
		}
	}
}