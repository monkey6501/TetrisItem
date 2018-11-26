var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var GameSocketOut = (function () {
    function GameSocketOut(socket) {
        var self = this;
        self._socketMgr = socket;
    }
    return GameSocketOut;
}());
__reflect(GameSocketOut.prototype, "GameSocketOut");
//# sourceMappingURL=GameSocketOut.js.map