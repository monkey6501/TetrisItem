class GameEnterManager {

	public setup(): void {
		PlayerInfoManager.getInstance.setup();
		LogicManager.getInstance.setup();
		// BoneManager.Instance.start();
	}

	private static _instance: GameEnterManager;
	public constructor() { }
	public static get Instance(): GameEnterManager {
		if (!this._instance) {
			this._instance = new GameEnterManager();
		}
		return this._instance;
	}
}