class GameEnterManager {

	public setup(): void {
		HeroesManager.instance.setup();
		PlayerInfoManager.getInstance.setup();
		BagManager.getInstance.setup();
		RedPointManager.getInstance.setup();
		LotteryManager.getInstance.setup();
		AchievementsManager.getInstance.setup();
		BoneManager.Instance.start();
		EquipManager.getInstance.setup();
		ShopManager.getInstance.setup();
		AdventureLogManager.getInstance.setup();
		AncientManager.instance.setup();
		MercenaryManager.getInstance.setup();
		RewardManager.getInstance.setup();
		MailManager.getInstance.setup();
		AdventureManager.getInstance.setup();
		SkillManager.getInstance.setup();
		ActivityManager.getInstance.setup();
		MascotManager.getInstance.setup();
		RechargeManager.getInstance.setup();
		PrivilegeManager.instance.setup();
		SystemOpenManager.getInstance.setup();
		GuideManager.instance.setup();
		StrongerManager.getInstance.setup();
		AutoClickLogic.getInstance.setup();
		FriendHelpManager.instance.setup();
		InviteAwardManager.instance.setup();
		MoodyManager.Instance.setup();
		CollectionManager.getInstance.setup();
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