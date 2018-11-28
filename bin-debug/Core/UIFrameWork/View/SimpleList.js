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
var SimpleList = (function (_super) {
    __extends(SimpleList, _super);
    function SimpleList() {
        var _this = _super.call(this) || this;
        _this._items = [];
        _this.touchPoints = [];
        _this.DistanceToTime = 700;
        _this.PositionMutiply = 4;
        _this._mask = new egret.Shape();
        _this._viewWidth = 0;
        _this._viewHeight = 0;
        _this._minItemHeight = 0;
        _this._itemGap = 0;
        _this._scrollPosition = 0;
        return _this;
    }
    SimpleList.prototype.initList = function () {
        if (this._itemRender == null)
            return;
        if (this._minItemHeight == 0)
            return;
        if (this._viewWidth == 0 || this._viewHeight == 0)
            return;
        this.createMask();
        this.createListItems();
        this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);
        this.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouchMove, this);
        this.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);
        this.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.onTouchEnd, this);
    };
    SimpleList.prototype.onTouchBegin = function (event) {
        var touchPoint = this.searchTouchPoint(event.touchPointID);
        if (touchPoint == null) {
            touchPoint = new TouchPoint();
            touchPoint.touchPointID = event.touchPointID;
        }
        touchPoint.positions.push(new egret.Point(event.stageX, event.stageY));
        this.touchPoints.push(touchPoint);
    };
    SimpleList.prototype.onTouchMove = function (event) {
        this.updateScroll(event.touchPointID, event.stageX, event.stageY, false);
    };
    SimpleList.prototype.onTouchEnd = function (event) {
        var touchPoint = this.updateScroll(event.touchPointID, event.stageX, event.stageY, true);
        ObjectUtils.removeFromArray(touchPoint, this.touchPoints);
    };
    SimpleList.prototype.searchTouchPoint = function (touchPointID) {
        for (var i = 0; i < this.touchPoints.length; i++) {
            if (this.touchPoints[i].touchPointID == touchPointID) {
                return this.touchPoints[i];
            }
        }
    };
    SimpleList.prototype.updateScroll = function (touchPointID, stageX, stageY, isTween) {
        var touchPoint = this.searchTouchPoint(touchPointID);
        if (touchPoint == null)
            return null;
        //计算scrollPosition
        touchPoint.positions.push(new egret.Point(stageX, stageY));
        var lastPointIndex = touchPoint.positions.length - 1;
        var distance = egret.Point.distance(touchPoint.positions[lastPointIndex], touchPoint.positions[lastPointIndex - 1]);
        if (isTween)
            distance *= this.PositionMutiply;
        if (touchPoint.positions[lastPointIndex].y < touchPoint.positions[lastPointIndex - 1].y)
            distance = -distance;
        //检查阈值
        var targetScrollPos = MathUtils.Clamp(0, this.getMaxScrollPosition(), this.scrollPosition + distance);
        //执行动画
        if (isTween) {
            egret.Tween.get(this).to({ scrollPosition: targetScrollPos }, (Math.abs(distance) / this.DistanceToTime) * 1000, egret.Ease.backOut);
        }
        else {
            this.scrollPosition = targetScrollPos;
        }
        return touchPoint;
    };
    SimpleList.prototype.createMask = function () {
        this._mask.graphics.beginFill(0xff0000);
        this._mask.graphics.drawRect(0, 0, this._viewWidth, this._viewHeight);
        this._mask.graphics.endFill();
        this.addChild(this._mask);
        this.mask = this._mask;
    };
    SimpleList.prototype.createListItems = function () {
        var count = (this._viewHeight / this._minItemHeight) + 2;
        for (var i = 0; i < count; i++) {
            var item = new this._itemRender();
            this._items.push(item);
        }
    };
    SimpleList.prototype.render = function () {
        if (this._data == null)
            return;
        var posArr = this.positionToStartIndex(this._scrollPosition);
        var index = posArr[0];
        var position = posArr[1];
        for (var i = 0; i < this._items.length; i++) {
            var item = this._items[i];
            var dataItem = this._data[i + index];
            if (dataItem == null) {
                DisplayUtils.removeFromParent(item);
                continue;
            }
            else {
                this.addChild(item);
            }
            item.dataUpdate(dataItem);
            this._data[i + index].$itemHeight = item.height;
            item.y = position;
            position += item.height;
            position += this.itemGap;
        }
    };
    SimpleList.prototype.positionToStartIndex = function (position) {
        var currentPos = position;
        var lastItemPos = currentPos;
        var i;
        for (i = 0; i < this.data.length; i++) {
            if (currentPos >= 0) {
                return [i - 1, lastItemPos];
            }
            else {
                lastItemPos = currentPos;
                if (this.data[i].$itemHeight) {
                    currentPos += this.data[i].$itemHeight;
                }
                else {
                    currentPos += this.minItemHeight;
                }
                currentPos += this.itemGap;
            }
        }
        return [i - 1, lastItemPos];
    };
    SimpleList.prototype.getMaxScrollPosition = function () {
        var currentPos = 0;
        for (var i = 0; i < this.data.length; i++) {
            if (this.data[i].$itemHeight) {
                currentPos -= this.data[i].$itemHeight;
            }
            else {
                currentPos -= this.minItemHeight;
            }
            currentPos -= this.itemGap;
        }
        return currentPos + this._viewHeight;
    };
    Object.defineProperty(SimpleList.prototype, "itemRender", {
        set: function (itemRender) {
            this._itemRender = itemRender;
            this.initList();
        },
        enumerable: true,
        configurable: true
    });
    SimpleList.prototype.viewport = function (viewWidth, viewHeight) {
        this._viewWidth = viewWidth;
        this._viewHeight = viewHeight;
        this.initList();
    };
    Object.defineProperty(SimpleList.prototype, "minItemHeight", {
        get: function () {
            return this._minItemHeight;
        },
        set: function (value) {
            this._minItemHeight = value;
            this.initList();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SimpleList.prototype, "itemGap", {
        get: function () {
            return this._itemGap;
        },
        set: function (value) {
            this._itemGap = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SimpleList.prototype, "data", {
        get: function () {
            return this._data;
        },
        set: function (value) {
            this._data = value;
            this.render();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SimpleList.prototype, "scrollPosition", {
        get: function () {
            return this._scrollPosition;
        },
        set: function (value) {
            this._scrollPosition = value;
            this.render();
        },
        enumerable: true,
        configurable: true
    });
    return SimpleList;
}(egret.DisplayObjectContainer));
__reflect(SimpleList.prototype, "SimpleList");
//# sourceMappingURL=SimpleList.js.map