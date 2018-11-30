var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var LogicManager = (function (_super) {
    __extends(LogicManager, _super);
    function LogicManager() {
        var _this = _super.call(this) || this;
        /**锤子使用次数 */
        _this.hammerTimes = 1;
        _this.score = 0;
        return _this;
    }
    Object.defineProperty(LogicManager, "getInstance", {
        get: function () {
            if (!LogicManager._instance) {
                LogicManager._instance = new LogicManager();
            }
            return LogicManager._instance;
        },
        enumerable: true,
        configurable: true
    });
    LogicManager.prototype.setup = function () {
        var self = this;
        EventsManager.getInstance.addEventListener(EventName.ITEM_CLICK, self.onTetrisItemClick, self);
    };
    LogicManager.prototype.onTetrisItemClick = function (e) {
        var self = this;
        //e.data
    };
    /**map里面的 TetrisItem 是否出了map */
    LogicManager.prototype.outOfMap = function (tetris) {
        var self = this;
        var len = tetris.itemList.length;
        for (var i = 0; i < len; i++) {
            var len2 = tetris.itemList[i].length;
            for (var j = 0; j < len2; j++) {
                var block = tetris.itemList[i][j];
                if (block.x + tetris.x + block.width / 2 < 0 || block.x + tetris.x + block.width / 2 >= block.width * LogicManager.MAP_ROW || block.y + tetris.y + block.height / 2 < 0 || block.y + tetris.y + block.height / 2 >= block.height * LogicManager.MAP_COL) {
                    return true;
                }
            }
        }
        return false;
    };
    /** 一个形状的中心点是否在 item 区域中 */
    LogicManager.prototype.inTouchArea = function (sx, sy, sw, sh, item) {
        if (sx + sw / 2 >= item.x && sx + sw / 2 < item.x + item.width && sy + sh / 2 >= item.y && sy + sh / 2 < item.y + item.height) {
            return true;
        }
        else {
            return false;
        }
    };
    /** value 在 min和max之间 包含min和max */
    LogicManager.prototype.betweenTwoNumber = function (value, min, max) {
        if (value >= min && value <= max) {
            return true;
        }
        else {
            return false;
        }
    };
    /**地图行数量 */
    LogicManager.MAP_ROW = 8;
    /**地图列数量 */
    LogicManager.MAP_COL = 8;
    /**每次随机出现方块的数量 */
    LogicManager.RANDOM_COUNT = 3;
    /**锤子敲碎正方形延伸的范围 */
    LogicManager.HAMMER_AREA = 1;
    return LogicManager;
}(egret.EventDispatcher));
__reflect(LogicManager.prototype, "LogicManager");
//# sourceMappingURL=LogicManager.js.map