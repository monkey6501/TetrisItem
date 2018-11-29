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
var GameMainView = (function (_super) {
    __extends(GameMainView, _super);
    function GameMainView() {
        var _this = _super.call(this, SkinName.GameMainViewSkin) || this;
        _this.shapeList = [];
        _this.mapItemList = [];
        _this.moveItem = new TetrisItem();
        _this.offSetX = 0;
        _this.offSetY = 0;
        return _this;
    }
    GameMainView.prototype.addEvents = function () {
        _super.prototype.addEvents.call(this);
        var self = this;
        self.addEventListener(egret.TouchEvent.TOUCH_TAP, self.clickhandler, self);
        self.ranGroup1.addEventListener(egret.TouchEvent.TOUCH_BEGIN, self.touchBeginHandler, self);
        self.ranGroup2.addEventListener(egret.TouchEvent.TOUCH_BEGIN, self.touchBeginHandler, self);
        self.ranGroup3.addEventListener(egret.TouchEvent.TOUCH_BEGIN, self.touchBeginHandler, self);
        self.addEventListener(egret.TouchEvent.TOUCH_END, self.touchEndHandler, self);
        self.addEventListener(egret.TouchEvent.TOUCH_MOVE, self.touchMoveHandler, self);
        App.TimerManager.doFrame(6, 0, self.enterHandler, self);
    };
    GameMainView.prototype.removeEvents = function () {
        var self = this;
        self.removeEventListener(egret.TouchEvent.TOUCH_TAP, self.clickhandler, self);
        self.ranGroup1.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, self.touchBeginHandler, self);
        self.ranGroup2.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, self.touchBeginHandler, self);
        self.ranGroup3.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, self.touchBeginHandler, self);
        self.removeEventListener(egret.TouchEvent.TOUCH_END, self.touchEndHandler, self);
        self.addEventListener(egret.TouchEvent.TOUCH_MOVE, self.touchMoveHandler, self);
        App.TimerManager.remove(self.enterHandler, self);
    };
    GameMainView.prototype.show = function () {
        _super.prototype.show.call(this);
        var self = this;
        self.randomTetrisItem();
        self.createMap();
        self.mapGroup.addChild(self.moveItem);
        self.moveItem.visible = false;
    };
    GameMainView.prototype.enterHandler = function () {
        var self = this;
        if (!self.moveItem.visible)
            return;
        self.updataMap();
    };
    /** 更新地图 */
    GameMainView.prototype.updataMap = function () {
        var self = this;
        for (var i = 0; i < LogicManager.MAP_ROW; i++) {
            for (var j = 0; j < LogicManager.MAP_COL; j++) {
                var item = self.mapItemList[i][j];
                self.checkMapItem(self.moveItem, item);
            }
        }
    };
    /** TOUCH_END 后把阴影的方块固定 */
    GameMainView.prototype.touchEndMapItem = function () {
        var self = this;
        var result = false;
        for (var i = 0; i < LogicManager.MAP_ROW; i++) {
            for (var j = 0; j < LogicManager.MAP_COL; j++) {
                var item = self.mapItemList[i][j];
                if (item.state == 2) {
                    self.updataMapItem(i, j, 1, item.color);
                    result = true;
                }
            }
        }
        return result;
    };
    /** 检测地图找出需要消除的占用块 */
    GameMainView.prototype.checkMapBlock = function () {
        var self = this;
        var flagRow = [];
        for (var i = 0; i < LogicManager.MAP_ROW; i++) {
            flagRow.push(i);
            for (var j = 0; j < LogicManager.MAP_COL; j++) {
                var item = self.mapItemList[i][j];
                if (item.state != 1) {
                    flagRow.splice(-1);
                    break;
                }
            }
        }
        var flagCol = [];
        for (var k = 0; k < LogicManager.MAP_COL; k++) {
            flagCol.push(k);
            for (var l = 0; l < LogicManager.MAP_ROW; l++) {
                var item = self.mapItemList[l][k];
                if (item.state != 1) {
                    flagCol.splice(-1);
                    break;
                }
            }
        }
        if (flagRow.length > 0) {
            self.cleanMapItemList(0, flagRow);
        }
        if (flagCol.length > 0) {
            self.cleanMapItemList(1, flagCol);
        }
    };
    /**
     * 清除地图占用条或者列
     * type  0:行  1：列
     * */
    GameMainView.prototype.cleanMapItemList = function (type, indexList) {
        var self = this;
        var count = type == 0 ? LogicManager.MAP_ROW : LogicManager.MAP_COL;
        for (var j = 0; j < indexList.length; j++) {
            for (var i = 0; i < count; i++) {
                var row = type == 0 ? indexList[j] : i;
                var col = type == 0 ? i : indexList[j];
                self.updataMapItem(row, col, 0);
            }
        }
    };
    /** 清除地图占用块 */
    GameMainView.prototype.cleanMapItem = function (list) {
        var self = this;
        for (var i = 0; i < list.length; i++) {
            self.updataMapItem(list[i][0], list[i][1], 0);
        }
    };
    /**
     * 设置地图上的 Item 状态
     *
     * 行 -- 列 -- 状态 -- 颜色
    */
    GameMainView.prototype.updataMapItem = function (row, col, state, color) {
        if (color === void 0) { color = 1; }
        var self = this;
        var item = self.mapItemList[row][col];
        item.setIconType(color, state);
    };
    /**是否能影射到map上 */
    GameMainView.prototype.checkCanShadow = function () {
        var self = this;
        if (LogicManager.getInstance.outOfMap(self.moveItem)) {
            return false;
        }
        if (self.checkOverlap()) {
            return false;
        }
        return true;
    };
    /** 判断 TetrisItem 与地图上非空点是否有重叠 */
    GameMainView.prototype.checkOverlap = function () {
        var self = this;
        for (var i = 0; i < LogicManager.MAP_ROW; i++) {
            for (var j = 0; j < LogicManager.MAP_COL; j++) {
                var item = self.mapItemList[i][j];
                if (item.state == 1 && self.checkOverlap2(item)) {
                    return true;
                }
            }
        }
        return false;
    };
    /** 判断 MapItem 与 moveItem 是否有重叠 */
    GameMainView.prototype.checkOverlap2 = function (item) {
        var self = this;
        var len = self.moveItem.itemList.length;
        for (var i = 0; i < len; i++) {
            var len2 = self.moveItem.itemList[i].length;
            for (var j = 0; j < len2; j++) {
                var block = self.moveItem.itemList[i][j];
                if (LogicManager.getInstance.inTouchArea(block.x + self.moveItem.x, block.y + self.moveItem.y, block.width, block.height, item)) {
                    return true;
                }
            }
        }
        return false;
    };
    /**
     * 检测地图小格子与 TetrisItem 中所有的 BlockItem 重叠情况，并更新地图小格子。
     *
     */
    GameMainView.prototype.checkMapItem = function (tetris, item) {
        var self = this;
        if (self.checkCanShadow()) {
            var len = tetris.itemList.length;
            for (var i = 0; i < len; i++) {
                var len2 = tetris.itemList[i].length;
                for (var j = 0; j < len2; j++) {
                    var block = tetris.itemList[i][j];
                    if (LogicManager.getInstance.inTouchArea(block.x + tetris.x, block.y + tetris.y, block.width, block.height, item)) {
                        self.updataMapItem(item.row, item.col, 2, block.iconColor);
                        return;
                    }
                }
            }
        }
        if (item.state == 2) {
            self.updataMapItem(item.row, item.col, 0);
        }
    };
    GameMainView.prototype.touchBeginHandler = function (e) {
        var self = this;
        self.chooseItem = e.currentTarget.getChildAt(0);
        if (self.chooseItem.state == 1)
            return;
        e.currentTarget.getChildAt(0).visible = false;
        self.moveItem.creatShape(self.chooseItem.myShape, self.chooseItem.ranColor);
        self.moveItem.x = self.chooseItem.x + e.currentTarget.x - self.mapGroup.x;
        self.moveItem.y = 500;
        self.initOffset(e.stageX, e.stageY);
        self.moveItem.visible = true;
    };
    GameMainView.prototype.touchEndHandler = function () {
        var self = this;
        self.moveItem.visible = false;
        if (self.touchEndMapItem()) {
            self.chooseItem.state = 1;
        }
        for (var i = 1; i <= LogicManager.RANDOM_COUNT; i++) {
            var item = self["ranGroup" + i].getChildAt(0);
            self["ranGroup" + i].getChildAt(0).visible = item.state == 0;
        }
        self.rebuildRanGroup();
        self.checkMapBlock();
    };
    /** 判断下方块是否使用完，如使用完新生成 */
    GameMainView.prototype.rebuildRanGroup = function () {
        var self = this;
        for (var i = 1; i <= LogicManager.RANDOM_COUNT; i++) {
            var item = self["ranGroup" + i].getChildAt(0);
            if (item.state == 0) {
                return;
            }
        }
        self.randomTetrisItem();
    };
    GameMainView.prototype.initOffset = function (sx, sy) {
        this.offSetX = sx - this.moveItem.x;
        this.offSetY = sy - this.moveItem.y;
    };
    GameMainView.prototype.touchMoveHandler = function (e) {
        var self = this;
        var sX = e.stageX;
        var sY = e.stageY;
        self.moveItem.x = sX - self.offSetX;
        self.moveItem.y = sY - self.offSetY;
    };
    GameMainView.prototype.clickhandler = function () {
        var self = this;
    };
    GameMainView.prototype.createMap = function () {
        var self = this;
        self.mapItemList = [];
        for (var i = 0; i < LogicManager.MAP_ROW; i++) {
            var arr = [];
            for (var j = 0; j < LogicManager.MAP_COL; j++) {
                var item = new MapItem(i, j);
                item.x = j * item.width;
                item.y = i * item.height;
                self.mapGroup.addChild(item);
                arr.push(item);
            }
            self.mapItemList.push(arr);
        }
    };
    /**随机生成下面的待放入块 */
    GameMainView.prototype.randomTetrisItem = function () {
        var self = this;
        DisplayUtils.removeAllChildren(self.ranGroup1);
        DisplayUtils.removeAllChildren(self.ranGroup2);
        DisplayUtils.removeAllChildren(self.ranGroup3);
        for (var i = 1; i <= LogicManager.RANDOM_COUNT; i++) {
            var item = new TetrisItem();
            item.scaleX = item.scaleY = 0.5;
            self["ranGroup" + i].addChild(item);
        }
    };
    GameMainView.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
        var self = this;
    };
    return GameMainView;
}(UI.BaseScene));
__reflect(GameMainView.prototype, "GameMainView");
//# sourceMappingURL=GameMainView.js.map