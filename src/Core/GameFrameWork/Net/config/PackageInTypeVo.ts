class PackageInTypeVo {

	/** 异地登陆 */
	public static LANDFALL: number = 6;
	/** 登录完成 */
	public static LOGIN_SUCCESS: number = 17;
	/** 心跳 */
	public static HEARTBEAT: number = 11;
	/** 玩家信息 */
	public static PLAYER_MESSAGE: number = 30;
	/** 成就相当于任务 */
	public static ACHIEVEMENTS_INIT: number = 200;
	/** 服务器通知有新的成就可以领取奖励 */
	public static ACHIEVEMENTS_UPDATE: number = 201;
	/** 物品列表 250   =====>服务器推送 */
	public static BAG_INIT: number = 250;
	/** 物品更新251   =====>服务器推送 */
	public static BAG_UPDATE: number = 251;
	/** 英雄列表*/
	public static HEROES_LIST_MSG: number = 37;
	/** 升级所有技能*/
	public static HEROES_SKILL_LIST_MSG: number = 118;
	/** 单个英雄*/
	public static HERO_MSG: number = 38;
	/** 装备列表 : 42 ====>服务器推送 */
	public static EQUIP_ALL: number = 42;
	/** 装备 : 41 ====>服务器推送 */
	public static EQUIP_ITEM: number = 41;
	/** 神器列表 ====>服务器推送 */
	public static ANCIENT_LIST_MSG: number = 39;
	/** 单个神器 ====>服务器推送 */
	public static ANCIENT_MSG: number = 43;
	/** 回收神器 ====>服务器推送 */
	public static ANCIENT_RECOVER: number = 46;
	/** 刷新购买列表 ====>服务器推送 */
	public static REFRESH_BUY: number = 40;
	/** 冒险数据 106 ====>服务器推送 */
	public static RISKDATAMSG: number = 106;
	/** 转生数据 107 ====> 服务器推送 */
	public static REBIRTHDATA_LIST: number = 107;
	/** 上阵雇佣兵列表 300 */
	public static MERCENARY_ON_LIST: number = 300;
	/** 下阵雇佣兵列表 300 */
	public static MERCENARY_OUT_LIST: number = 305;
	/** 获得新的雇佣兵 303 */
	public static MERCENARY_DATA_LIST_NEW: number = 303;
	/** 单个雇佣兵更新  301 */
	public static MERCENARY_DATA_MSG: number = 301;
	/** 被吞噬的雇佣兵 302 */
	public static MERCENARY_DEVOUR: number = 302;
	/** 奖励展示列表 */
	public static REWARD_LIST: number = 15;
	/** 可以分享和看广告奖励的展示列表 */
	public static DOUBLE_REWARD_LIST: number = 49;
	/** 英雄奖励提示 */
	public static HEROS_REWARD: number = 108;
	/** 错误码 */
	public static ERROR_CODE: number = 14;
	/** 邮件列表 */
	public static MAIL_LIST: number = 8;
	/** 单条邮件信息 */
	public static MAIL_INFO: number = 9;
	/** 删除邮件 */
	public static MAIL_DELETE: number = 16;
	/** 技能列表 */
	public static SKILL_LIST: number = 44;
	/** 单个技能使用 */
	public static SKILL_INFO: number = 45;
	/** 清楚单个技能 */
	public static SKILL_SINGLE_CLEAR: number = 50;
	/** 时光流逝同步最新关卡 */
	public static MISSIONID_NEW: number = 47;
	/** 所有技能CD清空 */
	public static SKILL_CD_CLEAR: number = 48;
	/** 查询时间流逝 */
	public static QUERY_TIMELAPSE_LIST: number = 600;
	/** 转生重置关卡 */
	public static REVIVE: number = 109;
	/** 转生完成 */
	public static REVIVE_COMPLETE: number = 117;
	/** 转生后商店购买的可获得最高英魂数 */
	public static CYCLE_HEROSOUL: number = 601;
	/** 皮肤列表 */
	public static HERO_Skin_LIST: number = 110;
	/** 英雄金身等级列表  -- 为了转生后没有英雄但是有金身的时候用*/
	public static HERO_GOLD_LIST: number = 112;
	/** 离线奖励 */
	public static OFF_LINE_REWARD: number = 111;
	/** 更新单个服装信息 */
	public static UPDATA_SINGLE_SKIN: number = 113;
	/** 每日充值 */
	public static DAY_CHARGE: number = 650;
	/** 分档奖励状态 */
	public static ACTIVITY_REWARD_STATE: number = 651;
	/** 每日分享 */
	public static DAY_SHARE: number = 751;
	/** 累计消费 */
	public static CONSUME_GIFT_BAG: number = 655;
	/** 已领取的宝箱id */
	public static CONSUME_BOX_LIST: number = 656;
	/** 吉祥物出现时间 */
	public static MASCOT: number = 702;
	/** 查看吉祥物奖励 */
	public static CHECK_MASCOT_REWARD: number = 704;
	/** 签到 */
	public static SIGN_MSG: number = 701;
	/** 玩家首冲产品id */
	public static FIRST_RECHARGE: number = 652;
	/** 抽卡奖励列表 */
	public static LOTTERY_REWARDS: number = 753;
	/** 免费抽卡状态 */
	public static LOTTERY_STATE_MSG: number = 752;
	/** 活动开放时间列表 */
	public static ACTIVITY_OPEN_LIST: number = 750;
	/** 累计抽卡列表 */
	public static KEEP_LOTTERY_LIST: number = 755;
	/**月卡信息 */
	public static PRIVILEGE_CARD_INFO: number = 653;
	/** 穿上皮肤返回成功 */
	public static WEAR_SKIN: number = 116;
	/** 新手引导完成的步骤 */
	public static GUIDE_COMPLETE_STEP: number = 22;
	/** 邀请好友 */
	public static ACTIVITY_INVITE: number = 114;
	/** 每日限购礼包 */
	public static DAY_PURCHASE: number = 756;
	/** 玩家排行榜信息800 */
	public static RANK_LIST: number = 800;
	/** 排行榜奖励 */
	public static RANK_GET_REWARD: number = 801;
	/** 活动状态 */
	public static ACTIVITY_STATE: number = 757;

	public static LOTTERY_RANDOM_COUNT: number = 758;
	/** 金身奖励列表 */
	public static GOLD_BODY_REWARD_LIST: number = 115;
	/** 七日登陆领取奖励次数 */
	public static SEVEN_REWARD_INFO: number = 759;
	/** 累积获得的食材数量 */
	public static ACCUMULATE_HEROSOUL: number = 119;
	/** 手动转生次数 */
	public static REVIVE_BY_SKILL: number = 120;
	/** 主动技能被激活 */
	public static ACTIVE_SKILL: number = 121;
	/** 排行查询列表 */
	public static FRIEND_RANK_LIST: number = 802;
	/** 好友帮助列表 */
	public static FRIEND_HELP_LIST: number = 850;
	/** 单个好友帮助信息 */
	public static FRIEND_HELP_SINGLE: number = 851;
	/** 好友帮助tip */
	public static FRIEND_HELP_MSG: number = 852;
	/** 跑马灯 */
	public static NOTABLE: number = 55;
	/** 必得次数 */
	public static LOTTERY_COUNT: number = 602;
	/** 邀请分享礼包 */
	public static INVITE_AWARD: number = 122;
	/** 查询开服冲冲冲数据 */
	public static CHECK_MOODY: number = 760;
	/** 收藏有礼 */
	public static COLLECTION: number = 761;
	/** 登陆失败 */
	public static LOGIN_ERROR: number = 25;
	/** 任务信息 */
	public static TASK_INFO: number = 900;
}