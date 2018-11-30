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
var TetrisItem = (function (_super) {
    __extends(TetrisItem, _super);
    function TetrisItem() {
        var _this = _super.call(this) || this;
        /**
         *    1   2   3    4    5   6     7   8     9     10    11   12    13   14    15    16    17   18   19   20    21   22   23   24     25  26    27     28    29   30      31
         *    *   **  *   ***   *   *     *   **   **     **   ****   *   **     **    *    *     **   **   *     *   ***  ***  *       *  *****  *   ***    ***     *   *      ***
         *            *         *   **   **    *   *      **          *    **   **    **    **    *     *   *     *     *  *    ***   ***         *     *    *       *   *      ***
         *                      *                                     *               *      *    *     *   **   **                               *     *    *     ***   ***    ***
         *                                                            *                                                                           *
         *                                                                                                                                        *
         */
        _this.shapeList = [[[1]],
            [[1, 1]],
            [[1], [1]],
            [[1, 1, 1]],
            [[1], [1], [1]],
            [[1, 0], [1, 1]],
            [[0, 1], [1, 1]],
            [[1, 1], [0, 1]],
            [[1, 1], [1, 0]],
            [[1, 1], [1, 1]],
            [[1, 1, 1, 1]],
            [[1], [1], [1], [1]],
            [[1, 1, 0], [0, 1, 1]],
            [[0, 1, 1], [1, 1, 0]],
            [[0, 1], [1, 1], [1, 0]],
            [[1, 0], [1, 1], [0, 1]],
            [[1, 1], [1, 0], [1, 0]],
            [[1, 1], [0, 1], [0, 1]],
            [[1, 0], [1, 0], [1, 1]],
            [[0, 1], [0, 1], [1, 1]],
            [[1, 1, 1], [0, 0, 1]],
            [[1, 1, 1], [1, 0, 0]],
            [[1, 0, 0], [1, 1, 1]],
            [[0, 0, 1], [1, 1, 1]],
            [[1, 1, 1, 1, 1]],
            [[1], [1], [1], [1], [1]],
            [[1, 1, 1], [0, 0, 1], [0, 0, 1]],
            [[1, 1, 1], [1, 0, 0], [1, 0, 0]],
            [[0, 0, 1], [0, 0, 1], [1, 1, 1]],
            [[1, 0, 0], [1, 0, 0], [1, 1, 1]],
            [[1, 1, 1], [1, 1, 1], [1, 1, 1]]
        ];
        //出现的权重列表                 1  2  3  4  5  6  7  8  9 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 25 26 27 28 29 30 31
        _this.weightList = [4, 4, 4, 4, 4, 2, 2, 2, 2, 4, 4, 4, 2, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 4, 4, 2, 2, 2, 2, 4];
        _this.totalWeight = 0;
        _this.shapeLen = 0;
        _this.myShape = [];
        /** 0:没有使用  1:已经使用 */
        _this.state = 0;
        _this._canUse = true;
        _this.itemList = [];
        _this.skinName = SkinName.TetrisItemSkin;
        return _this;
    }
    TetrisItem.prototype.childrenCreated = function () {
        var self = this;
        _super.prototype.childrenCreated.call(this);
        self.initData();
        self.initView();
        self.addEvent();
    };
    TetrisItem.prototype.initView = function () {
        var self = this;
        // self.showAllShape();
        self.addChild(self.iconGroup);
        self.ranColor = Math.floor(Math.random() * 6) + 1;
        self.creatShape(self.shapeList[self.getRandomShape()], self.ranColor);
    };
    /**初始化数据 */
    TetrisItem.prototype.initData = function () {
        var self = this;
        self.totalWeight = 0;
        self.shapeLen = self.weightList.length;
        for (var i = 0; i < self.shapeLen; i++) {
            self.totalWeight += self.weightList[i];
        }
    };
    Object.defineProperty(TetrisItem.prototype, "canUse", {
        get: function () {
            var self = this;
            return self._canUse;
        },
        set: function (value) {
            var self = this;
            self._canUse = value;
            if (self._canUse) {
                self.filters = null;
            }
            else {
                UIUtil.setFilters(self);
            }
        },
        enumerable: true,
        configurable: true
    });
    /**获取随机形状的index */
    TetrisItem.prototype.getRandomShape = function () {
        var self = this;
        var randomShape = Math.floor(self.totalWeight * Math.random()) + 1;
        for (var i = 0; i < self.shapeLen; i++) {
            if (randomShape <= self.weightList[i]) {
                return i;
            }
            randomShape -= self.weightList[i];
        }
        return 0;
    };
    /**创建形状 */
    TetrisItem.prototype.creatShape = function (shape, colorType) {
        var self = this;
        self.myShape = shape.concat();
        var len1 = self.myShape.length;
        self.itemList = [];
        DisplayUtils.removeAllChildren(self.iconGroup);
        for (var j = 0; j < len1; j++) {
            var len2 = self.myShape[j].length;
            var arr = [];
            for (var k = 0; k < len2; k++) {
                if (self.myShape[j][k] != 0) {
                    var block = new BlockItem();
                    block.setData(colorType, j, k);
                    block.x = k * block.width;
                    block.y = j * block.height;
                    self.iconGroup.addChild(block);
                    arr.push(block);
                }
            }
            self.itemList.push(arr);
        }
    };
    /**展示所有形状---测试用的 */
    TetrisItem.prototype.showAllShape = function () {
        var self = this;
        var ranShape = self.shapeList[Math.floor(self.shapeLen * Math.random())];
        console.log("self.shapeLen :" + self.shapeLen);
        for (var i = 0; i < self.shapeLen; i++) {
            var len1 = self.shapeList[i].length;
            var tetrisBox = new egret.Sprite();
            var ranColor = Math.floor(Math.random() * 6) + 1;
            for (var j = 0; j < len1; j++) {
                var len2 = self.shapeList[i][j].length;
                for (var k = 0; k < len2; k++) {
                    if (self.shapeList[i][j][k] != 0) {
                        var block = new BlockItem();
                        block.setData(ranColor, j, k);
                        block.x = k * block.width;
                        block.y = j * block.height;
                        tetrisBox.addChild(block);
                    }
                }
            }
            tetrisBox.x = i % 4 * 150;
            tetrisBox.y = Math.floor(i / 4) * 150;
            tetrisBox.scaleX = tetrisBox.scaleY = 0.4;
            self.addChild(tetrisBox);
        }
    };
    TetrisItem.prototype.addEvent = function () {
        var self = this;
        self.addEventListener(egret.TouchEvent.TOUCH_BEGIN, self.touchBeginHandler, self);
        self.addEventListener(egret.Event.REMOVED_FROM_STAGE, self.removeFromStage, self);
    };
    TetrisItem.prototype.removeEvent = function () {
        var self = this;
        self.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, self.touchBeginHandler, self);
    };
    TetrisItem.prototype.removeFromStage = function () {
        var self = this;
        self.removeEventListener(egret.Event.REMOVED_FROM_STAGE, self.removeFromStage, self);
        self.dispose();
    };
    TetrisItem.prototype.touchBeginHandler = function () {
        var self = this;
        // self.setVisible(false);
        EventsManager.getInstance.dispatchEventWith(EventName.ITEM_CLICK, false, { type: self.ranColor, shape: self.myShape });
    };
    TetrisItem.prototype.setVisible = function (value) {
        var self = this;
        self.iconGroup.visible = value;
    };
    TetrisItem.prototype.dispose = function () {
        var self = this;
        self.removeEvent();
        DisplayUtils.removeFromParent(self);
    };
    return TetrisItem;
}(eui.Component));
__reflect(TetrisItem.prototype, "TetrisItem");
//# sourceMappingURL=TetrisItem.js.map