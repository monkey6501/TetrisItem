class PackageOutTypeVo {
	// 登录
	public static LOGIN: number = 1;
	//心跳
	public static HEARTBEAT: number = 2;
	/** 手机型号 */
	public static PHONE_MODEL: number = 3;
	/** 成就进度 */
	public static ACHIEVEMENTS_PRO: number = 250;
	/** 成就奖励领取 */
	public static ACHIEVEMENTS_GET_REWARD: number = 251;
	/** 成就全部奖励领取 */
	public static ACHIEVEMENTS_GET_ALL_REWARD: number = 252;
	/** 英雄升级 */
	public static HERO_LEVELUP: number = 9;
	/** 英雄技能升级 */
	public static HEROSKILL_LEVELUP: number = 10;
	/** 英雄技能升级 */
	public static HEROSKILL_LEVELUP_TOTAL: number = 12;
	/** 获得装备 */
	public static EQUIP_LOTTERY: number = 350;
	/** 升级装备 */
	public static EQUIP_LEVEL: number = 351;
	/** 分解装备 */
	public static EQUIP_DECOMPOSE: number = 352;
	/** 装备穿上 */
	public static EQUIP_WEAR: number = 353;
	/** 重置神器 */
	public static DEL_ANCIENT: number = 302;
	/**刷新神器购买列表 */
	public static REFRESH_BUY: number = 300;
	/**神器召唤 */
	public static BUY_ANCIENT: number = 301;
	/**神器升级 */
	public static ANCIENT_LEVELUP: number = 304;
	/** 设置 */
	public static SETUP: number = 13;
	/** 上/下阵 400 */
	public static MERCENARY_UP_AND_DOWN: number = 400;
	/** 出任务 401 */
	public static MERCENARY_TASK: number = 401;
	/** 领取奖励 402 */
	public static MERCENARY_GET_TASK: number = 402;
	/** 复活 403 */
	public static MERCENARY_RESURRENCTION: number = 403;
	/** 吞噬 404 */
	public static MERCENARY_DEVOUR: number = 404;
	/** 佣兵替换 */
	public static MERCENARY_REPLACE: number = 405;
	/** 商店购买 */
	public static SHOP_BUY: number = 450;
	/** 购买时间流逝 */
	public static SHOP_BUY_TIME: number = 451;
	/** 抽装备 */
	public static SHOP_LOTTERY_EQUIP: number = 452;
	/** 抽佣兵 */
	public static SHOP_LOTTERY_MERCENARY: number = 453;
	/** 抽皮肤 */
	public static SHOP_LOTTERY_SKIN: number = 454;
	/** 领取奖励 -- 佣兵任务 */
	public static MERCENARY_REWARD: number = 402;
	/**游戏结算 */
	public static BATTLE_COMPLETE: number = 100;
	/**捡金币通知服务器加钱 */
	public static ADD_MONEY_FROM_BATTLE: number = 101;
	/** 阅读邮件 */
	public static MAIL_READ: number = 501;
	/** 删除邮件 */
	public static MAIL_DELETE: number = 503;
	/** 一键领取 */
	public static MAIL_ALL_GET: number = 502;
	/** 领取附件 */
	public static MAIL_GET_REWARD: number = 500;
	/** 使用技能 */
	public static USE_SKILL: number = 11;
	/** 分解单个装备 */
	public static RESOLVE_EQUIP: number = 354;
	/** 查询购买时间流逝 */
	public static CHECK_TIME: number = 455;
	/** 转生后商店购买的可获得最高英魂数 */
	public static CYCLE_HEROSOUL: number = 456;
	/** 刷新佣兵列表 */
	public static MERCENARY_DATA_UPDATE: number = 406;
	/** 离线奖励 */
	public static OFF_LINE_REWARD: number = 102;
	/** 领取每日充值奖励 */
	public static GET_DAY_CHARGE_REWARD: number = 701;
	/** 领取累计充值礼包 */
	public static ACCUMULATED_CHARGE_REWARD: number = 702;
	/** 模拟充值 */
	public static SIMULATION_CHARGE: number = 703;
	/** 领取首充奖励 */
	public static GET_FIRST_CHARGE_REWARD: number = 704;
	/** 领取分享奖励 */
	public static DAY_SHARE_REWARD: number = 751;
	/** 分享 */
	public static SHARE_MSG: number = 750;
	/** 累计消费 - 消耗钻石领取奖励 */
	public static GET_CONSUME_GIFT_BAG: number = 700;
	/** 领取在线奖励 */
	public static GET_REWARD_ONLINE: number = 651;
	/** 签到 */
	public static SIGN_MSG: number = 652;
	/** 取消红点状态 */
	public static CANCEL_RED_POINT: number = 459;
	/** 抽卡状态 */
	public static LOTTERY_STATE: number = 458;
	/** 抽卡的位置 */
	public static LOTTERY_POS: number = 460;
	/** 使用道具 */
	public static USE_PROP_ITEM: number = 900;
	/** 累计抽卡 */
	public static KEEP_LOTTERY: number = 461;
	/** 领取特权卡每日奖励 */
	public static PRIVILEGE_DAY_REWARD: number = 705;
	/** 穿上皮肤 */
	public static WEAR_SKIN: number = 457;
	/** 新手引导完成 */
	public static GUIDE_COMPLETE_STEP: number = 600;
	/** 领取邀请奖励 */
	public static INVITE_GET_REWARD: number = 850;
	/** 查询邀请好友状态 */
	public static CHECK_INVITE_FRIENDS: number = 851;
	/** 邀请好友 */
	public static INVITE_FRIENDS: number = 852;
	/** 每日限购礼包 */
	public static DAT_PURCHASE: number = 462;
	/** 领取超越奖励 */
	public static GET_RANK_REWARD: number = 800;
	/** 随机礼包 */
	public static RANDOM_GIFT: number = 901;
	/** 活动状态 */
	public static ACTIVITY_STATE: number = 656;
	/** 请求成就信息 */
	public static ACHIEVEMENT_REQUEST: number = 253;
	/** 领取金身 */
	public static OPEN_GOLD_BOX: number = 103;
	/** 显示立绘或者动画状态*/
	public static SHOW_ANIMATION_OR_DRAW: number = 14;
	/** 看广告拿奖励*/
	public static LOOK_AD: number = 655;
	/** 查看吉祥物奖励 */
	public static CHECK_MASCOT_REWARD: number = 658;
	/** 七日活动领取奖励 */
	public static SEVEN_DAY_REWARD: number = 657;
	/** 跳过抽卡动画 */
	public static SKIP_LOTTERY_ANIM: number = 463;
	/** 购买清除技能CD */
	public static BUY_SKILL_CD: number = 15;
	/** 装备锁 */
	public static EQUIP_LOCK: number = 355;
	/** 聊天 */
	public static CHAT_MSG: number = 50;
	/**免费转生 */
	public static FREE_REVIVE: number = 16;
	/** 排行查询列表 */
	public static FRIEND_RANK_LIST: number = 801;
	/** 直接向服务器请求排行榜列表 */
	public static SERVER_FRIEND_RANK_LIST: number = 802;
	/** npc开始工作 */
	public static NPC_BEGIN_WORK: number = 950;
	/** 好友完成工作 */
	public static FRIEND_END_WORK: number = 951;
	/** 免费自动点击 */
	public static FREE_AUTOCLICK: number = 602;
	/** 邀请分享礼包 */
	public static INVITE_AWARD: number = 853;
	/** 领取离线奖励 */
	public static GET_OFF_LINE_REWARD: number = 104;
	/** 埋点 */
	public static NEWBIE: number = 601;
	/** 获取开服奖励 */
	public static MOODY_REWARD: number = 659;
	/** 收藏有礼 */
	public static COLLECTION: number = 660;
	/** 关注有礼 */
	public static CONCERN: number = 661;
	/** 收藏成功 */
	public static COLLECTION_COMPLETE: number = 662;
	/** 任务领奖 */
	public static TASK_FINISH: number = 1000;
	/** 单个英雄购买所有技能 */
	public static HERO_SKILL_BUY_ALL: number = 17;
}