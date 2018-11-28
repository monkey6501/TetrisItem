var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var MathUtils = (function () {
    function MathUtils() {
    }
    MathUtils.Clamp = function (maxValue, minValue, value) {
        return Math.max(minValue, Math.min(value, maxValue));
    };
    MathUtils.Approximately = function (a, b) {
        return Math.abs(a - b) < 0.01;
    };
    MathUtils.Range = function (start, end) {
        var max = Math.max(start, end);
        var min = Math.min(start, end);
        return Math.random() * (max - min) + min;
    };
    MathUtils.moveToNextPosition = function (startPoint, endPoint, speed) {
        var angle = MathUtils.getAngle(startPoint, endPoint);
        var resultX = startPoint.x + speed * Math.cos(angle * Math.PI / 180);
        var resultY = startPoint.y - speed * Math.sin(angle * Math.PI / 180);
        startPoint.x = resultX;
        startPoint.y = resultY;
    };
    MathUtils.getAngle = function (point1, point2) {
        var vx = point2.x - point1.x;
        var vy = point2.y - point1.y;
        var hyp = Math.sqrt(Math.pow(vx, 2) + Math.pow(vy, 2));
        var rad = Math.acos(vx / hyp);
        var deg = 180 / (Math.PI / rad);
        //得到了一个角度“rad”，不过是以弧度为单位的
        //把它转换成角度 
        if (vy < 0) {
            deg = (-deg);
        }
        else if ((vy == 0) && (vx < 0)) {
            deg = 180;
        }
        return deg;
    };
    MathUtils.getNewAngle = function (point1, point2) {
        var angle = 180 + Math.atan2(point1.x - point2.x, point1.y - point2.y) * 180 / Math.PI;
        return angle;
    };
    MathUtils.randomBool = function () {
        return Math.round(Math.random()) == 1;
    };
    MathUtils.randomPointFromRect = function (rect) {
        var self = this;
        var pos = new egret.Point();
        pos.x = Math.random() * rect[2] + rect[0];
        pos.y = Math.random() * rect[3] + rect[1];
        return pos;
    };
    MathUtils.Deg2Rad = 0.01745329;
    MathUtils.Rad2Deg = 57.29578;
    MathUtils.Max = 9999999;
    return MathUtils;
}());
__reflect(MathUtils.prototype, "MathUtils");
//# sourceMappingURL=MathUtils.js.map