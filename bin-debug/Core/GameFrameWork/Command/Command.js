var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Command = (function () {
    function Command() {
    }
    Command.prototype.Command = function () {
        this._isFinished = false;
    };
    Command.prototype.connect = function (action) {
        return false;
    };
    Command.prototype.canReplace = function (action) {
        return false;
    };
    Object.defineProperty(Command.prototype, "isFinished", {
        get: function () {
            return this._isFinished;
        },
        enumerable: true,
        configurable: true
    });
    Command.prototype.prepare = function () {
        if (this._isPrepare)
            return;
        this._isPrepare = true;
    };
    Command.prototype.execute = function () {
        this.executeAtOnce();
        this._isFinished = true;
    };
    Command.prototype.executeAtOnce = function () {
        this.prepare();
        this._isFinished = true;
    };
    Command.prototype.cancel = function () {
    };
    return Command;
}());
__reflect(Command.prototype, "Command");
//# sourceMappingURL=Command.js.map