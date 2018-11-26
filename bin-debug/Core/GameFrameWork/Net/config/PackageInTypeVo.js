var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var PackageInTypeVo = (function () {
    function PackageInTypeVo() {
    }
    /** 异地登陆 */
    PackageInTypeVo.LANDFALL = 6;
    /** 登录完成 */
    PackageInTypeVo.LOGIN_SUCCESS = 17;
    /** 心跳 */
    PackageInTypeVo.HEARTBEAT = 11;
    /** 玩家信息 */
    PackageInTypeVo.PLAYER_MESSAGE = 30;
    /** 成就相当于任务 */
    PackageInTypeVo.ACHIEVEMENTS_INIT = 200;
    /** 服务器通知有新的成就可以领取奖励 */
    PackageInTypeVo.ACHIEVEMENTS_UPDATE = 201;
    /** 物品列表 250   =====>服务器推送 */
    PackageInTypeVo.BAG_INIT = 250;
    /** 物品更新251   =====>服务器推送 */
    PackageInTypeVo.BAG_UPDATE = 251;
    /** 英雄列表*/
    PackageInTypeVo.HEROES_LIST_MSG = 37;
    /** 升级所有技能*/
    PackageInTypeVo.HEROES_SKILL_LIST_MSG = 118;
    /** 单个英雄*/
    PackageInTypeVo.HERO_MSG = 38;
    /** 装备列表 : 42 ====>服务器推送 */
    PackageInTypeVo.EQUIP_ALL = 42;
    /** 装备 : 41 ====>服务器推送 */
    PackageInTypeVo.EQUIP_ITEM = 41;
    /** 神器列表 ====>服务器推送 */
    PackageInTypeVo.ANCIENT_LIST_MSG = 39;
    /** 单个神器 ====>服务器推送 */
    PackageInTypeVo.ANCIENT_MSG = 43;
    /** 回收神器 ====>服务器推送 */
    PackageInTypeVo.ANCIENT_RECOVER = 46;
    /** 刷新购买列表 ====>服务器推送 */
    PackageInTypeVo.REFRESH_BUY = 40;
    /** 冒险数据 106 ====>服务器推送 */
    PackageInTypeVo.RISKDATAMSG = 106;
    /** 转生数据 107 ====> 服务器推送 */
    PackageInTypeVo.REBIRTHDATA_LIST = 107;
    /** 上阵雇佣兵列表 300 */
    PackageInTypeVo.MERCENARY_ON_LIST = 300;
    /** 下阵雇佣兵列表 300 */
    PackageInTypeVo.MERCENARY_OUT_LIST = 305;
    /** 获得新的雇佣兵 303 */
    PackageInTypeVo.MERCENARY_DATA_LIST_NEW = 303;
    /** 单个雇佣兵更新  301 */
    PackageInTypeVo.MERCENARY_DATA_MSG = 301;
    /** 被吞噬的雇佣兵 302 */
    PackageInTypeVo.MERCENARY_DEVOUR = 302;
    /** 奖励展示列表 */
    PackageInTypeVo.REWARD_LIST = 15;
    /** 可以分享和看广告奖励的展示列表 */
    PackageInTypeVo.DOUBLE_REWARD_LIST = 49;
    /** 英雄奖励提示 */
    PackageInTypeVo.HEROS_REWARD = 108;
    /** 错误码 */
    PackageInTypeVo.ERROR_CODE = 14;
    /** 邮件列表 */
    PackageInTypeVo.MAIL_LIST = 8;
    /** 单条邮件信息 */
    PackageInTypeVo.MAIL_INFO = 9;
    /** 删除邮件 */
    PackageInTypeVo.MAIL_DELETE = 16;
    /** 技能列表 */
    PackageInTypeVo.SKILL_LIST = 44;
    /** 单个技能使用 */
    PackageInTypeVo.SKILL_INFO = 45;
    /** 清楚单个技能 */
    PackageInTypeVo.SKILL_SINGLE_CLEAR = 50;
    /** 时光流逝同步最新关卡 */
    PackageInTypeVo.MISSIONID_NEW = 47;
    /** 所有技能CD清空 */
    PackageInTypeVo.SKILL_CD_CLEAR = 48;
    /** 查询时间流逝 */
    PackageInTypeVo.QUERY_TIMELAPSE_LIST = 600;
    /** 转生重置关卡 */
    PackageInTypeVo.REVIVE = 109;
    /** 转生完成 */
    PackageInTypeVo.REVIVE_COMPLETE = 117;
    /** 转生后商店购买的可获得最高英魂数 */
    PackageInTypeVo.CYCLE_HEROSOUL = 601;
    /** 皮肤列表 */
    PackageInTypeVo.HERO_Skin_LIST = 110;
    /** 英雄金身等级列表  -- 为了转生后没有英雄但是有金身的时候用*/
    PackageInTypeVo.HERO_GOLD_LIST = 112;
    /** 离线奖励 */
    PackageInTypeVo.OFF_LINE_REWARD = 111;
    /** 更新单个服装信息 */
    PackageInTypeVo.UPDATA_SINGLE_SKIN = 113;
    /** 每日充值 */
    PackageInTypeVo.DAY_CHARGE = 650;
    /** 分档奖励状态 */
    PackageInTypeVo.ACTIVITY_REWARD_STATE = 651;
    /** 每日分享 */
    PackageInTypeVo.DAY_SHARE = 751;
    /** 累计消费 */
    PackageInTypeVo.CONSUME_GIFT_BAG = 655;
    /** 已领取的宝箱id */
    PackageInTypeVo.CONSUME_BOX_LIST = 656;
    /** 吉祥物出现时间 */
    PackageInTypeVo.MASCOT = 702;
    /** 查看吉祥物奖励 */
    PackageInTypeVo.CHECK_MASCOT_REWARD = 704;
    /** 签到 */
    PackageInTypeVo.SIGN_MSG = 701;
    /** 玩家首冲产品id */
    PackageInTypeVo.FIRST_RECHARGE = 652;
    /** 抽卡奖励列表 */
    PackageInTypeVo.LOTTERY_REWARDS = 753;
    /** 免费抽卡状态 */
    PackageInTypeVo.LOTTERY_STATE_MSG = 752;
    /** 活动开放时间列表 */
    PackageInTypeVo.ACTIVITY_OPEN_LIST = 750;
    /** 累计抽卡列表 */
    PackageInTypeVo.KEEP_LOTTERY_LIST = 755;
    /**月卡信息 */
    PackageInTypeVo.PRIVILEGE_CARD_INFO = 653;
    /** 穿上皮肤返回成功 */
    PackageInTypeVo.WEAR_SKIN = 116;
    /** 新手引导完成的步骤 */
    PackageInTypeVo.GUIDE_COMPLETE_STEP = 22;
    /** 邀请好友 */
    PackageInTypeVo.ACTIVITY_INVITE = 114;
    /** 每日限购礼包 */
    PackageInTypeVo.DAY_PURCHASE = 756;
    /** 玩家排行榜信息800 */
    PackageInTypeVo.RANK_LIST = 800;
    /** 排行榜奖励 */
    PackageInTypeVo.RANK_GET_REWARD = 801;
    /** 活动状态 */
    PackageInTypeVo.ACTIVITY_STATE = 757;
    PackageInTypeVo.LOTTERY_RANDOM_COUNT = 758;
    /** 金身奖励列表 */
    PackageInTypeVo.GOLD_BODY_REWARD_LIST = 115;
    /** 七日登陆领取奖励次数 */
    PackageInTypeVo.SEVEN_REWARD_INFO = 759;
    /** 累积获得的食材数量 */
    PackageInTypeVo.ACCUMULATE_HEROSOUL = 119;
    /** 手动转生次数 */
    PackageInTypeVo.REVIVE_BY_SKILL = 120;
    /** 主动技能被激活 */
    PackageInTypeVo.ACTIVE_SKILL = 121;
    /** 排行查询列表 */
    PackageInTypeVo.FRIEND_RANK_LIST = 802;
    /** 好友帮助列表 */
    PackageInTypeVo.FRIEND_HELP_LIST = 850;
    /** 单个好友帮助信息 */
    PackageInTypeVo.FRIEND_HELP_SINGLE = 851;
    /** 好友帮助tip */
    PackageInTypeVo.FRIEND_HELP_MSG = 852;
    /** 跑马灯 */
    PackageInTypeVo.NOTABLE = 55;
    /** 必得次数 */
    PackageInTypeVo.LOTTERY_COUNT = 602;
    /** 邀请分享礼包 */
    PackageInTypeVo.INVITE_AWARD = 122;
    /** 查询开服冲冲冲数据 */
    PackageInTypeVo.CHECK_MOODY = 760;
    /** 收藏有礼 */
    PackageInTypeVo.COLLECTION = 761;
    /** 登陆失败 */
    PackageInTypeVo.LOGIN_ERROR = 25;
    /** 任务信息 */
    PackageInTypeVo.TASK_INFO = 900;
    return PackageInTypeVo;
}());
__reflect(PackageInTypeVo.prototype, "PackageInTypeVo");
//# sourceMappingURL=PackageInTypeVo.js.map