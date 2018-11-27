class LoginView extends UI.BaseScene {

	private beginBtn: eui.Button;

	public constructor() {
		super(SkinName.LoginViewSkin);
	}

	public addEvents(): void {
		super.addEvents();
		let self = this;
		self.beginBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, self.beginBtnHandler, self);
	}

	public show(): void {
		super.show();
		let self = this;
	}

	private beginBtnHandler(): void {
		let self = this;
		// ScenesManager.getInstance.removeView(ViewClassName.LoginView);  //后面检查一下，这个self.close()有没有删除ScenesManager里面的self._views存的值
		self.close();
		ScenesManager.getInstance.openView(UIUtil.createScene(ViewClassName.GameMainView), LayerManager.GAME_UI_LAYER, true);
	}

	public dispose(): void {
		super.dispose();
		let self = this;
	}
}