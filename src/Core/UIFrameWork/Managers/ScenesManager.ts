class ScenesManager {

	private _views: TSDictionary<string, any>;
	/** 当前的显示界面 */
	private _currView: any;
	private _sceneView: any;
	public get currView(): any {
		let self = this;
		return self._currView;
	}

	public set currView(value: any) {
		let self = this;
		self._currView = value;
	}

	public constructor() {
		let self = this;
		self._views = new TSDictionary<string, any>();
	}
	/** 打开界面 */
	public openView(uiItem: any, layer: number = LayerManager.GAME_MAP_LAYER, uiParam?: any, isPanel: boolean = true, isOverlay: boolean = false, fullScreen: boolean = false): void {
		let self = this;
		if (self._currView != null) {
			if (uiItem.uiName == self._currView.uiName) {
				return LogManager.logFormat("不可以切换同一个界面!" + uiItem.uiName);
			}
		}
		if (uiItem.type == UIType.Scene) {
			// BigLoading.getInstance.showLoading();
			self.hideCurrView();
			self._sceneView = uiItem;
		}
		else if (uiItem.type == UIType.Panel && isPanel) {
			layer = LayerManager.GAME_UI_LAYER;
		}

		self.showView(uiItem, layer, uiParam, isOverlay);
		self._currView.fullScreen = fullScreen;
		if (self._currView.fullScreen) {
			self.hideScene();
		}
	}
	/** 显示界面 */
	public showView(uiItem: any, layer: number, uiParam?: any, isOverlay: boolean = false): void {
		let self = this;
		if (self._views.ContainsKey(uiItem.uiName) && !isOverlay) {
			let current: any = self._views.TryGetValue(uiItem.uiName);
			self._currView = current;
			current.visible = true;
			current.init(uiParam, null);
			LayerManager.getInstance.addToLayer(current, layer);
		}
		else {
			self._currView = uiItem;
			if (self._currView != null) {
				self._views.Add(self._currView.uiName, self._currView);
				self._currView.init(uiParam, null);
				LayerManager.getInstance.addToLayer(self._currView, layer);
			}
		}
	}

	public hideScene(): void {
		let self = this;
		if (self._sceneView != null) {
			self._sceneView.visible = false;
		}
	}

	public ShowScene(): void {
		let self = this;
		if (self._sceneView != null) {
			self._sceneView.visible = true;
		}
	}

	/** 隐藏当前界面 */
	public hideCurrView(): void {
		let self = this;
		if (self._sceneView != null) {
			self._sceneView.visible = false;
			self._sceneView.hide();
			if (!self._sceneView.isCache) {
				self._views.Remove(self._sceneView.uiName);
				self._sceneView.dispose();
				self._sceneView = null;
			}
		}
		self._sceneView = null;
	}

	public hideView(className: any): void {
		let self = this;
		let key: string = className + "";
		if (self._views.ContainsKey(key)) {
			let view: any = self._views.TryGetValue(key);
			view.visible = false;
			self._currView = null;
		}
	}

	public removeView(className: any): void {
		let self = this;
		let key: string = className + "";
		if (self._views.ContainsKey(key)) {
			let view: any = self._views.TryGetValue(key);
			view.close();
			self._views.Remove(key);
		}
	}

	/** 获取当前所有存在的界面 */
	public get views(): TSDictionary<string, any> {
		let self = this;
		return self._views;
	}
	public set views(value: TSDictionary<string, any>) {
		let self = this;
		self._views = value;
	}
	/** 移除所有界面 */
	public removeAllView(): void {
		let self = this;
		let list = self._views.getValues();
		for (let i: number = 0; i < list.length; i++) {
			list[i].dispose();
			DisplayUtils.removeAllChildren(self._views.getValues());
			list[i] = null;
		}
		self._views.clear();
	}

	private static _instance: ScenesManager;
	public static get getInstance(): ScenesManager {
		if (ScenesManager._instance == null) {
			ScenesManager._instance = new ScenesManager();
		}
		return ScenesManager._instance;
	}
}