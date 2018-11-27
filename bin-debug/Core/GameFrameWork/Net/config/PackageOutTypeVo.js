var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var PackageOutTypeVo = (function () {
    function PackageOutTypeVo() {
    }
    // 登录
    PackageOutTypeVo.LOGIN = 1;
    //心跳
    PackageOutTypeVo.HEARTBEAT = 2;
    /** 手机型号 */
    PackageOutTypeVo.PHONE_MODEL = 3;
    /** 成就进度 */
    PackageOutTypeVo.ACHIEVEMENTS_PRO = 250;
    /** 成就奖励领取 */
    PackageOutTypeVo.ACHIEVEMENTS_GET_REWARD = 251;
    /** 成就全部奖励领取 */
    PackageOutTypeVo.ACHIEVEMENTS_GET_ALL_REWARD = 252;
    /** 英雄升级 */
    PackageOutTypeVo.HERO_LEVELUP = 9;
    /** 英雄技能升级 */
    PackageOutTypeVo.HEROSKILL_LEVELUP = 10;
    /** 英雄技能升级 */
    PackageOutTypeVo.HEROSKILL_LEVELUP_TOTAL = 12;
    /** 获得装备 */
    PackageOutTypeVo.EQUIP_LOTTERY = 350;
    /** 升级装备 */
    PackageOutTypeVo.EQUIP_LEVEL = 351;
    /** 分解装备 */
    PackageOutTypeVo.EQUIP_DECOMPOSE = 352;
    /** 装备穿上 */
    PackageOutTypeVo.EQUIP_WEAR = 353;
    /** 重置神器 */
    PackageOutTypeVo.DEL_ANCIENT = 302;
    /**刷新神器购买列表 */
    PackageOutTypeVo.REFRESH_BUY = 300;
    /**神器召唤 */
    PackageOutTypeVo.BUY_ANCIENT = 301;
    /**神器升级 */
    PackageOutTypeVo.ANCIENT_LEVELUP = 304;
    /** 设置 */
    PackageOutTypeVo.SETUP = 13;
    /** 上/下阵 400 */
    PackageOutTypeVo.MERCENARY_UP_AND_DOWN = 400;
    /** 出任务 401 */
    PackageOutTypeVo.MERCENARY_TASK = 401;
    /** 领取奖励 402 */
    PackageOutTypeVo.MERCENARY_GET_TASK = 402;
    /** 复活 403 */
    PackageOutTypeVo.MERCENARY_RESURRENCTION = 403;
    /** 吞噬 404 */
    PackageOutTypeVo.MERCENARY_DEVOUR = 404;
    /** 佣兵替换 */
    PackageOutTypeVo.MERCENARY_REPLACE = 405;
    /** 商店购买 */
    PackageOutTypeVo.SHOP_BUY = 450;
    /** 购买时间流逝 */
    PackageOutTypeVo.SHOP_BUY_TIME = 451;
    /** 抽装备 */
    PackageOutTypeVo.SHOP_LOTTERY_EQUIP = 452;
    /** 抽佣兵 */
    PackageOutTypeVo.SHOP_LOTTERY_MERCENARY = 453;
    /** 抽皮肤 */
    PackageOutTypeVo.SHOP_LOTTERY_SKIN = 454;
    /** 领取奖励 -- 佣兵任务 */
    PackageOutTypeVo.MERCENARY_REWARD = 402;
    /**游戏结算 */
    PackageOutTypeVo.BATTLE_COMPLETE = 100;
    /**捡金币通知服务器加钱 */
    PackageOutTypeVo.ADD_MONEY_FROM_BATTLE = 101;
    /** 阅读邮件 */
    PackageOutTypeVo.MAIL_READ = 501;
    /** 删除邮件 */
    PackageOutTypeVo.MAIL_DELETE = 503;
    /** 一键领取 */
    PackageOutTypeVo.MAIL_ALL_GET = 502;
    /** 领取附件 */
    PackageOutTypeVo.MAIL_GET_REWARD = 500;
    /** 使用技能 */
    PackageOutTypeVo.USE_SKILL = 11;
    /** 分解单个装备 */
    PackageOutTypeVo.RESOLVE_EQUIP = 354;
    /** 查询购买时间流逝 */
    PackageOutTypeVo.CHECK_TIME = 455;
    /** 转生后商店购买的可获得最高英魂数 */
    PackageOutTypeVo.CYCLE_HEROSOUL = 456;
    /** 刷新佣兵列表 */
    PackageOutTypeVo.MERCENARY_DATA_UPDATE = 406;
    /** 离线奖励 */
    PackageOutTypeVo.OFF_LINE_REWARD = 102;
    /** 领取每日充值奖励 */
    PackageOutTypeVo.GET_DAY_CHARGE_REWARD = 701;
    /** 领取累计充值礼包 */
    PackageOutTypeVo.ACCUMULATED_CHARGE_REWARD = 702;
    /** 模拟充值 */
    PackageOutTypeVo.SIMULATION_CHARGE = 703;
    /** 领取首充奖励 */
    PackageOutTypeVo.GET_FIRST_CHARGE_REWARD = 704;
    /** 领取分享奖励 */
    PackageOutTypeVo.DAY_SHARE_REWARD = 751;
    /** 分享 */
    PackageOutTypeVo.SHARE_MSG = 750;
    /** 累计消费 - 消耗钻石领取奖励 */
    PackageOutTypeVo.GET_CONSUME_GIFT_BAG = 700;
    /** 领取在线奖励 */
    PackageOutTypeVo.GET_REWARD_ONLINE = 651;
    /** 签到 */
    PackageOutTypeVo.SIGN_MSG = 652;
    /** 取消红点状态 */
    PackageOutTypeVo.CANCEL_RED_POINT = 459;
    /** 抽卡状态 */
    PackageOutTypeVo.LOTTERY_STATE = 458;
    /** 抽卡的位置 */
    PackageOutTypeVo.LOTTERY_POS = 460;
    /** 使用道具 */
    PackageOutTypeVo.USE_PROP_ITEM = 900;
    /** 累计抽卡 */
    PackageOutTypeVo.KEEP_LOTTERY = 461;
    /** 领取特权卡每日奖励 */
    PackageOutTypeVo.PRIVILEGE_DAY_REWARD = 705;
    /** 穿上皮肤 */
    PackageOutTypeVo.WEAR_SKIN = 457;
    /** 新手引导完成 */
    PackageOutTypeVo.GUIDE_COMPLETE_STEP = 600;
    /** 领取邀请奖励 */
    PackageOutTypeVo.INVITE_GET_REWARD = 850;
    /** 查询邀请好友状态 */
    PackageOutTypeVo.CHECK_INVITE_FRIENDS = 851;
    /** 邀请好友 */
    PackageOutTypeVo.INVITE_FRIENDS = 852;
    /** 每日限购礼包 */
    PackageOutTypeVo.DAT_PURCHASE = 462;
    /** 领取超越奖励 */
    PackageOutTypeVo.GET_RANK_REWARD = 800;
    /** 随机礼包 */
    PackageOutTypeVo.RANDOM_GIFT = 901;
    /** 活动状态 */
    PackageOutTypeVo.ACTIVITY_STATE = 656;
    /** 请求成就信息 */
    PackageOutTypeVo.ACHIEVEMENT_REQUEST = 253;
    /** 领取金身 */
    PackageOutTypeVo.OPEN_GOLD_BOX = 103;
    /** 显示立绘或者动画状态*/
    PackageOutTypeVo.SHOW_ANIMATION_OR_DRAW = 14;
    /** 看广告拿奖励*/
    PackageOutTypeVo.LOOK_AD = 655;
    /** 查看吉祥物奖励 */
    PackageOutTypeVo.CHECK_MASCOT_REWARD = 658;
    /** 七日活动领取奖励 */
    PackageOutTypeVo.SEVEN_DAY_REWARD = 657;
    /** 跳过抽卡动画 */
    PackageOutTypeVo.SKIP_LOTTERY_ANIM = 463;
    /** 购买清除技能CD */
    PackageOutTypeVo.BUY_SKILL_CD = 15;
    /** 装备锁 */
    PackageOutTypeVo.EQUIP_LOCK = 355;
    /** 聊天 */
    PackageOutTypeVo.CHAT_MSG = 50;
    /**免费转生 */
    PackageOutTypeVo.FREE_REVIVE = 16;
    /** 排行查询列表 */
    PackageOutTypeVo.FRIEND_RANK_LIST = 801;
    /** 直接向服务器请求排行榜列表 */
    PackageOutTypeVo.SERVER_FRIEND_RANK_LIST = 802;
    /** npc开始工作 */
    PackageOutTypeVo.NPC_BEGIN_WORK = 950;
    /** 好友完成工作 */
    PackageOutTypeVo.FRIEND_END_WORK = 951;
    /** 免费自动点击 */
    PackageOutTypeVo.FREE_AUTOCLICK = 602;
    /** 邀请分享礼包 */
    PackageOutTypeVo.INVITE_AWARD = 853;
    /** 领取离线奖励 */
    PackageOutTypeVo.GET_OFF_LINE_REWARD = 104;
    /** 埋点 */
    PackageOutTypeVo.NEWBIE = 601;
    /** 获取开服奖励 */
    PackageOutTypeVo.MOODY_REWARD = 659;
    /** 收藏有礼 */
    PackageOutTypeVo.COLLECTION = 660;
    /** 关注有礼 */
    PackageOutTypeVo.CONCERN = 661;
    /** 收藏成功 */
    PackageOutTypeVo.COLLECTION_COMPLETE = 662;
    /** 任务领奖 */
    PackageOutTypeVo.TASK_FINISH = 1000;
    /** 单个英雄购买所有技能 */
    PackageOutTypeVo.HERO_SKILL_BUY_ALL = 17;
    return PackageOutTypeVo;
}());
__reflect(PackageOutTypeVo.prototype, "PackageOutTypeVo");
