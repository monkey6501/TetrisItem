class SimpleList extends egret.DisplayObjectContainer {
	public constructor() {
		super();
	}

	private _items: ISimpleListItem[] = [];
	private initList(): void {
		if (this._itemRender == null) return;
		if (this._minItemHeight == 0) return;
		if (this._viewWidth == 0 || this._viewHeight == 0) return;
		this.createMask();
		this.createListItems();
		this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);
		this.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouchMove, this);
		this.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);
		this.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.onTouchEnd, this);
	}

	private touchPoints: TouchPoint[] = [];
	private onTouchBegin(event: egret.TouchEvent): void {
		let touchPoint: TouchPoint = this.searchTouchPoint(event.touchPointID);
		if (touchPoint == null) {
			touchPoint = new TouchPoint();
			touchPoint.touchPointID = event.touchPointID;
		}
		touchPoint.positions.push(new egret.Point(event.stageX, event.stageY));
		this.touchPoints.push(touchPoint);
	}

	private onTouchMove(event: egret.TouchEvent): void {
		this.updateScroll(event.touchPointID, event.stageX, event.stageY, false);
	}

	private onTouchEnd(event: egret.TouchEvent): void {
		let touchPoint: TouchPoint = this.updateScroll(event.touchPointID, event.stageX, event.stageY, true);
		ObjectUtils.removeFromArray(touchPoint, this.touchPoints);
	}

	private searchTouchPoint(touchPointID: number): TouchPoint {
		for (let i: number = 0; i < this.touchPoints.length; i++) {
			if (this.touchPoints[i].touchPointID == touchPointID) {
				return this.touchPoints[i];
			}
		}
	}

	private DistanceToTime: number = 700;
	private PositionMutiply: number = 4;
	private updateScroll(touchPointID: number, stageX: number, stageY: number, isTween: boolean): TouchPoint {
		let touchPoint: TouchPoint = this.searchTouchPoint(touchPointID);
		if (touchPoint == null) return null;
		//计算scrollPosition
		touchPoint.positions.push(new egret.Point(stageX, stageY));
		let lastPointIndex: number = touchPoint.positions.length - 1;
		let distance: number = egret.Point.distance(touchPoint.positions[lastPointIndex], touchPoint.positions[lastPointIndex - 1]);
		if (isTween) distance *= this.PositionMutiply;
		if (touchPoint.positions[lastPointIndex].y < touchPoint.positions[lastPointIndex - 1].y) distance = -distance;
		//检查阈值
		let targetScrollPos: number = MathUtils.Clamp(0, this.getMaxScrollPosition(), this.scrollPosition + distance);
		//执行动画
		if (isTween) {
			egret.Tween.get(this).to({ scrollPosition: targetScrollPos }, (Math.abs(distance) / this.DistanceToTime) * 1000, egret.Ease.backOut);
		} else {
			this.scrollPosition = targetScrollPos;
		}
		return touchPoint;
	}

	private createMask(): void {
		this._mask.graphics.beginFill(0xff0000);
		this._mask.graphics.drawRect(0, 0, this._viewWidth, this._viewHeight);
		this._mask.graphics.endFill();
		this.addChild(this._mask);
		this.mask = this._mask;
	}

	private createListItems(): void {
		let count: number = (this._viewHeight / this._minItemHeight) + 2;
		for (let i: number = 0; i < count; i++) {
			let item = new this._itemRender();
			this._items.push(item);
		}
	}

	public render(): void {
		if (this._data == null) return;
		let posArr: number[] = this.positionToStartIndex(this._scrollPosition);
		let index: number = posArr[0];
		let position: number = posArr[1];
		for (let i: number = 0; i < this._items.length; i++) {
			let item: any = this._items[i];
			let dataItem: any = this._data[i + index];
			if (dataItem == null) {
				DisplayUtils.removeFromParent(item);
				continue;
			} else {
				this.addChild(item);
			}
			item.dataUpdate(dataItem);
			this._data[i + index].$itemHeight = item.height;
			item.y = position
			position += item.height;
			position += this.itemGap;
		}
	}

	private positionToStartIndex(position: number): number[] {
		let currentPos: number = position;
		let lastItemPos: number = currentPos;
		let i: number;
		for (i = 0; i < this.data.length; i++) {
			if (currentPos >= 0) {
				return [i - 1, lastItemPos];
			} else {
				lastItemPos = currentPos;
				if (this.data[i].$itemHeight) {
					currentPos += this.data[i].$itemHeight;
				} else {
					currentPos += this.minItemHeight;
				}
				currentPos += this.itemGap;
			}
		}
		return [i - 1, lastItemPos];
	}

	private getMaxScrollPosition(): number {
		let currentPos: number = 0;
		for (let i: number = 0; i < this.data.length; i++) {
			if (this.data[i].$itemHeight) {
				currentPos -= this.data[i].$itemHeight;
			} else {
				currentPos -= this.minItemHeight;
			}
			currentPos -= this.itemGap;
		}
		return currentPos + this._viewHeight;
	}


	private _itemRender: any;
	private _mask: egret.Shape = new egret.Shape();
	public set itemRender(itemRender: any) {
		this._itemRender = itemRender;
		this.initList();
	}

	private _viewWidth: number = 0;
	private _viewHeight: number = 0;
	public viewport(viewWidth: number, viewHeight: number): void {
		this._viewWidth = viewWidth;
		this._viewHeight = viewHeight;
		this.initList();
	}

	private _minItemHeight: number = 0;
	public get minItemHeight(): number {
		return this._minItemHeight;
	}

	public set minItemHeight(value: number) {
		this._minItemHeight = value;
		this.initList();
	}

	private _itemGap: number = 0;
	public get itemGap(): number {
		return this._itemGap;
	}

	public set itemGap(value: number) {
		this._itemGap = value;
	}

	private _data: any[];
	public set data(value: any[]) {
		this._data = value;
		this.render();
	}

	public get data(): any[] {
		return this._data;
	}

	private _scrollPosition: number = 0;
	public get scrollPosition(): number {
		return this._scrollPosition;
	}

	public set scrollPosition(value: number) {
		this._scrollPosition = value;
		this.render();
	}
}