class SdkManager {
	public constructor() {
	}

	private static _instance: SdkManager;
	public static get getInstance(): SdkManager {
		if (!SdkManager._instance) {
			SdkManager._instance = new SdkManager();
		}
		return SdkManager._instance;
	}



	public paySdk(id: number): void {
	}

	private payFail(): void {
		MessageManger.getInstance.showText(LanguageManager.getInstance.getLanguageText("models.sdkManager.payFail"));
	}


	public totalShare(shareId, sucCallBack, failCallBack = null) {
	}

	public getFriendList(data: any, callBack): void {
	}

	private createRank(): void {
		let self = this;
		// ScenesManager.getInstance.openView(UIUtil.createPanel(ViewClassName.WXRankView), LayerManager.GAME_UI_LAYER);
	}

	public getSystemInfo(): void {
	}

	/**上报信息 */
	public setUserCloudStorage(action: string): void {
	}

	/** 观看广告 */
	public ShowVideoAd(adId: string, callBack: Function): void {
	}

	/**生成桌面快捷方式图标 */
	public addShortcut(callBack): void {
	}
}