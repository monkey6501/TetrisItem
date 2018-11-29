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
        _this.hammer = new eui.Image();
        _this.destroyPos = {};
        _this.offSetX = 0;
        _this.offSetY = 0;
        _this.offSetX1 = 0;
        _this.offSetY1 = 0;
        return _this;
    }
    GameMainView.prototype.addEvents = function () {
        _super.prototype.addEvents.call(this);
        var self = this;
        self.destroyBtn.addEventListener(egret.TouchEvent.TOUCH_BEGIN, self.destroyBtnHandler, self);
        self.restartBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, self.restartHandler, self);
        self.refreshBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, self.refreshBtnHandler, self);
        self.ranGroup1.addEventListener(egret.TouchEvent.TOUCH_BEGIN, self.touchBeginHandler, self);
        self.ranGroup2.addEventListener(egret.TouchEvent.TOUCH_BEGIN, self.touchBeginHandler, self);
        self.ranGroup3.addEventListener(egret.TouchEvent.TOUCH_BEGIN, self.touchBeginHandler, self);
        self.addEventListener(egret.TouchEvent.TOUCH_END, self.touchEndHandler, self);
        self.addEventListener(egret.TouchEvent.TOUCH_MOVE, self.touchMoveHandler, self);
        App.TimerManager.doFrame(6, 0, self.enterHandler, self);
    };
    GameMainView.prototype.removeEvents = function () {
        var self = this;
        self.destroyBtn.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, self.destroyBtnHandler, self);
        self.restartBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, self.restartHandler, self);
        self.refreshBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, self.refreshBtnHandler, self);
        self.ranGroup1.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, self.touchBeginHandler, self);
        self.ranGroup2.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, self.touchBeginHandler, self);
        self.ranGroup3.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, self.touchBeginHandler, self);
        self.removeEventListener(egret.TouchEvent.TOUCH_END, self.touchEndHandler, self);
        self.removeEventListener(egret.TouchEvent.TOUCH_MOVE, self.touchMoveHandler, self);
        App.TimerManager.remove(self.enterHandler, self);
    };
    GameMainView.prototype.show = function () {
        _super.prototype.show.call(this);
        var self = this;
        self.randomTetrisItem();
        self.createMap();
        self.mapGroup.addChild(self.moveItem);
        self.mapGroup.addChild(self.hammer);
        self.hammer.source = "game_json.icon1";
        self.hammer.visible = false;
        self.moveItem.visible = false;
    };
    GameMainView.prototype.enterHandler = function () {
        var self = this;
        if (self.moveItem.visible) {
            self.updataMap();
        }
        if (self.hammer.visible) {
            self.updataHammerMap();
        }
    };
    GameMainView.prototype.updataScoreLabel = function (value) {
        var self = this;
        self.scoreLabel.text = value + "";
    };
    /** 出现移动块，更新地图 */
    GameMainView.prototype.updataMap = function () {
        var self = this;
        for (var i = 0; i < LogicManager.MAP_ROW; i++) {
            for (var j = 0; j < LogicManager.MAP_COL; j++) {
                var item = self.mapItemList[i][j];
                self.checkMapItem(self.moveItem, item);
            }
        }
    };
    /** 出现锤子，更新地图 */
    GameMainView.prototype.updataHammerMap = function () {
        var self = this;
        for (var i = 0; i < LogicManager.MAP_ROW; i++) {
            for (var j = 0; j < LogicManager.MAP_COL; j++) {
                var item = self.mapItemList[i][j];
                self.checkHammerMapItem(item);
            }
        }
    };
    /**
     * 根据锤子位置检测地图，并更新地图小格子。
     *
     */
    GameMainView.prototype.checkHammerMapItem = function (item) {
        var self = this;
        if (self.checkHammerInMap()) {
            if (LogicManager.getInstance.inTouchArea(self.hammer.x, self.hammer.y, self.hammer.width, self.hammer.height, item)) {
                item.showDestroyShadow(1);
                self.showDestroyArea(item);
                self.destroyPos = { row: item.row, col: item.col };
                console.log(item.row, item.col);
                return;
            }
        }
    };
    /** 展示销毁面积 */
    GameMainView.prototype.showDestroyArea = function (item) {
        var self = this;
        for (var i = 0; i < LogicManager.MAP_ROW; i++) {
            for (var j = 0; j < LogicManager.MAP_COL; j++) {
                var mapItem = self.mapItemList[i][j];
                if (LogicManager.getInstance.betweenTwoNumber(i, item.row - LogicManager.HAMMER_AREA, item.row + LogicManager.HAMMER_AREA) &&
                    LogicManager.getInstance.betweenTwoNumber(j, item.col - LogicManager.HAMMER_AREA, item.col + LogicManager.HAMMER_AREA)) {
                    mapItem.showDestroyShadow(1);
                }
                else {
                    mapItem.showDestroyShadow(0);
                }
            }
        }
    };
    /**检测锤子是否在地图上 */
    GameMainView.prototype.checkHammerInMap = function () {
        var self = this;
        return true;
    };
    /** TOUCH_END 后把阴影的方块固定 */
    GameMainView.prototype.touchEndMapItem = function () {
        var self = this;
        var result = false;
        for (var i = 0; i < LogicManager.MAP_ROW; i++) {
            for (var j = 0; j < LogicManager.MAP_COL; j++) {
                var item = self.mapItemList[i][j];
                if (item.state == 2) {
                    LogicManager.getInstance.score++;
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
                LogicManager.getInstance.score++;
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
    /** 判断 self.moveItem 与地图上非空点是否有重叠 */
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
    /** 判断 一个MapItem 与 self.moveItem 是否有重叠 */
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
     * 检测地图小格子与移动的 TetrisItem 中所有的 BlockItem 重叠情况，并更新地图小格子。
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
    GameMainView.prototype.initOffset = function (sx, sy) {
        this.offSetX = sx - this.moveItem.x;
        this.offSetY = sy - this.moveItem.y;
    };
    GameMainView.prototype.initHarmmerOffset = function (sx, sy) {
        this.offSetX1 = sx - this.hammer.x;
        this.offSetY1 = sy - this.hammer.y;
    };
    GameMainView.prototype.touchMoveHandler = function (e) {
        var self = this;
        var sX = e.stageX;
        var sY = e.stageY;
        if (self.moveItem.visible) {
            self.moveItem.x = sX - self.offSetX;
            self.moveItem.y = sY - self.offSetY;
        }
        if (self.hammer.visible) {
            self.hammer.x = sX - self.offSetX1;
            self.hammer.y = sY - self.offSetY1;
        }
    };
    GameMainView.prototype.touchEndHandler = function () {
        var self = this;
        self.moveItem.visible = false;
        if (self.hammer.visible) {
            self.hammerRelease();
            self.hammer.visible = false;
            return;
        }
        if (self.touchEndMapItem()) {
            self.chooseItem.state = 1;
        }
        for (var i = 1; i <= LogicManager.RANDOM_COUNT; i++) {
            var item = self["ranGroup" + i].getChildAt(0);
            self["ranGroup" + i].getChildAt(0).visible = item.state == 0;
        }
        self.rebuildRanGroup();
        self.checkMapBlock();
        self.updataScoreLabel(LogicManager.getInstance.score);
        if (!self.canContinue()) {
            MessageManger.getInstance.showText("不行了");
        }
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
    /** 判断是否能继续加块 */
    GameMainView.prototype.canContinue = function () {
        var self = this;
        var result = false;
        for (var i = 1; i <= LogicManager.RANDOM_COUNT; i++) {
            var item = self["ranGroup" + i].getChildAt(0);
            if (item.state == 0 && self.checkItemAddMap(item)) {
                return true;
            }
        }
        return result;
    };
    /** 检测 TetrisItem 能不能放到 Map 中 */
    GameMainView.prototype.checkItemAddMap = function (item) {
        var self = this;
        for (var i = 0; i < LogicManager.MAP_ROW; i++) {
            if (i > LogicManager.MAP_ROW - item.myShape.length) {
                return false;
            }
            for (var j = 0; j < LogicManager.MAP_COL; j++) {
                if (j > LogicManager.MAP_COL - item.myShape[0].length) {
                    break;
                }
                if (self.checkMatchShape(i, j, item)) {
                    return true;
                }
            }
        }
        return false;
    };
    /** 从地图的一个点出发往右下延伸一块 TetrisItem 矩形区域，这个区域是否存在与给的 TetrisItem 相匹配的形状 */
    GameMainView.prototype.checkMatchShape = function (r, c, item) {
        var self = this;
        var result = true;
        for (var i = 0; i < item.myShape.length; i++) {
            for (var j = 0; j < item.myShape[i].length; j++) {
                var mapItem = self.mapItemList[i + r][j + c];
                if (item.myShape[i][j] == 1 && mapItem.state == 1) {
                    return false;
                }
            }
        }
        return result;
    };
    /** 重新开始游戏 */
    GameMainView.prototype.restartHandler = function () {
        var self = this;
        self.clearMap();
        self.randomTetrisItem();
        LogicManager.getInstance.score = 0;
        self.updataScoreLabel(LogicManager.getInstance.score);
    };
    /** 销毁地图格子 */
    GameMainView.prototype.destroyBtnHandler = function (e) {
        var self = this;
        self.hammer.visible = true;
        self.hammer.x = self.mapGroup.x;
        self.hammer.y = 500;
        self.initHarmmerOffset(e.stageX, e.stageY);
    };
    /** 刷新待放入块 */
    GameMainView.prototype.refreshBtnHandler = function () {
        var self = this;
        self.randomTetrisItem();
    };
    /**释放锤子 */
    GameMainView.prototype.hammerRelease = function () {
        var self = this;
        for (var i = self.destroyPos.row - LogicManager.HAMMER_AREA; i <= self.destroyPos.row + LogicManager.HAMMER_AREA; i++) {
            for (var j = self.destroyPos.col - LogicManager.HAMMER_AREA; j <= self.destroyPos.col + LogicManager.HAMMER_AREA; j++) {
                if (LogicManager.getInstance.betweenTwoNumber(i, 0, LogicManager.MAP_ROW - 1) && LogicManager.getInstance.betweenTwoNumber(j, 0, LogicManager.MAP_COL - 1)) {
                    self.updataMapItem(i, j, 0);
                }
            }
        }
    };
    /**清空地图 */
    GameMainView.prototype.clearMap = function () {
        var self = this;
        for (var i = 0; i < LogicManager.MAP_ROW; i++) {
            for (var j = 0; j < LogicManager.MAP_COL; j++) {
                var item = self.mapItemList[i][j];
                item.setIconType(1, 0);
            }
        }
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