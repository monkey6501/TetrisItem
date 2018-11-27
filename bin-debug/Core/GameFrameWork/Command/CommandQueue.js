var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var CommandQueue = (function () {
    function CommandQueue() {
        this._queue = new Array();
    }
    CommandQueue.prototype.add = function (command) {
        for (var i = 0; i < this._queue.length; i++) {
            var c = this._queue[i];
            if (c.connect(command)) {
                return;
            }
            else if (c.canReplace(command)) {
                command.prepare();
                this._queue[i] = command;
                return;
            }
        }
        this._queue.push(command);
        if (this._queue.length == 1) {
            command.prepare();
        }
    };
    CommandQueue.prototype.execute = function () {
        if (this._queue.length > 0) {
            var c = this._queue[0];
            if (!c.isFinished) {
                c.execute();
            }
            else {
                this._queue.shift();
                if (this._queue.length > 0)
                    this._queue[0].prepare();
            }
        }
    };
    CommandQueue.prototype.traceAllRemainAction = function () {
        for (var i = 0; i < this._queue.length; i++) {
            var actionClassName = egret.getQualifiedClassName(this._queue[i]);
            LogManager.logFormat("【Command】" + actionClassName);
        }
    };
    Object.defineProperty(CommandQueue.prototype, "actionCount", {
        get: function () {
            return this._queue.length;
        },
        enumerable: true,
        configurable: true
    });
    CommandQueue.prototype.executeAtOnce = function () {
        for (var i = 0; i < this._queue.length; i++) {
            this._queue[i].executeAtOnce();
        }
    };
    CommandQueue.prototype.clear = function () {
        for (var i = 0; i < this._queue.length; i++) {
            this._queue[i].cancel();
        }
        this._queue = [];
    };
    return CommandQueue;
}());
__reflect(CommandQueue.prototype, "CommandQueue");
