class PlayerInfoManager extends egret.EventDispatcher {

	private static _instance: PlayerInfoManager;
	public static get getInstance(): PlayerInfoManager {
		if (!PlayerInfoManager._instance) {
			PlayerInfoManager._instance = new PlayerInfoManager();
		}
		return PlayerInfoManager._instance;
	}

	public playerInfo: PlayerInfo;

	public constructor() {
		super()
	}

	public setup(): void {
		let self = this;
	}
}