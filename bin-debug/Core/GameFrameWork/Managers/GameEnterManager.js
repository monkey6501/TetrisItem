var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var GameEnterManager = (function () {
    function GameEnterManager() {
    }
    GameEnterManager.prototype.setup = function () {
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
    };
    Object.defineProperty(GameEnterManager, "Instance", {
        get: function () {
            if (!this._instance) {
                this._instance = new GameEnterManager();
            }
            return this._instance;
        },
        enumerable: true,
        configurable: true
    });
    return GameEnterManager;
}());
__reflect(GameEnterManager.prototype, "GameEnterManager");
//# sourceMappingURL=GameEnterManager.js.map