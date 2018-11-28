var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var TouchPoint = (function () {
    function TouchPoint() {
        this.positions = [];
    }
    return TouchPoint;
}());
__reflect(TouchPoint.prototype, "TouchPoint");
//# sourceMappingURL=TouchPoint.js.map