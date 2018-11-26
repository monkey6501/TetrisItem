var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var AchievementsVO = (function () {
    function AchievementsVO() {
        /** 是否领取奖励 */
        this.isComplete = false;
        /** 当前进度，0为进度完成，可以领取奖励 */
        this.process = "-1";
    }
    return AchievementsVO;
}());
__reflect(AchievementsVO.prototype, "AchievementsVO");
//# sourceMappingURL=AchievementsVO.js.map