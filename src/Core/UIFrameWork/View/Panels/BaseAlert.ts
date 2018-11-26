module UI {
	export class BaseAlert extends BaseView {

		// public maskRect: eui.Rect;
		public btn_close: eui.Group;
		public offsetX: number = 0;
		public offsetY: number = 0;
		public offsetW: number = 0;
		public offsetH: number = 0;
		public isDispose: boolean = false;
		protected isMaskTouch: boolean = true;
		public maskImg: eui.Image;

		public constructor(uiskinPath: string) {
			super(uiskinPath);
			let self = this;
			self.type = UIType.Alert;
			self.isCache = false;
		}

		public show(): void {
			super.show();
			let self = this;
			self.isDispose = false;
			self.onDisplayResizeHandler();
			// if (!self.maskRect) {
			// 	self.maskRect = self.getMask(0.7);
			// }
			if (!self.maskImg) {
				self.getImgMask(0.7);
			}
			self.anchorOffsetY = StageUtils.getInstance.stage.stageHeight;
			// LayerManager.getInstance.addToLayer(self.maskRect, LayerManager.GAME_UI_LAYER);
			LayerManager.getInstance.addToLayer(self.maskImg, LayerManager.GAME_UI_LAYER);
			this.x = (StageUtils.getInstance.stage.stageWidth - this.width) >> 1;
			this.y = (StageUtils.getInstance.stage.stageHeight - this.height) >> 1;
			LayerManager.getInstance.addToLayer(self, LayerManager.GAME_POP_LAYER);
			egret.Tween.get(self).to({ anchorOffsetY: 0 }, 300).call(() => {
				egret.Tween.removeTweens(self);
			});
			self.isMaskTouch && self.maskImg && self.maskImg.addEventListener(egret.TouchEvent.TOUCH_TAP, self.onMaskHandler, self);
			self.btn_close && self.btn_close.addEventListener(egret.TouchEvent.TOUCH_TAP, self.closePanel, self);
		}

		public showToStage(): void {
			super.showToStage();
			let self = this;
		}

		public addEvents(): void {
			super.addEvents();
			let self = this;
			self.addEventListener(egret.Event.RESIZE, self.onDisplayResizeHandler, self);
		}

		public removeEvents(): void {
			super.removeEvents();
			let self = this;
			self.btn_close && self.btn_close.removeEventListener(egret.TouchEvent.TOUCH_TAP, self.closePanel, self);
			self.isMaskTouch && self.maskImg && self.maskImg.removeEventListener(egret.TouchEvent.TOUCH_TAP, self.onMaskHandler, self);
			self.removeEventListener(egret.Event.RESIZE, self.onDisplayResizeHandler, self);
		}

		protected onMaskHandler() {
			let self = this;
			self.closePanel();
		}

		protected onDisplayResizeHandler() {
			let self = this;
			self.x = ((StageUtils.getInstance.stage.stageWidth - (self.width - self.offsetW)) >> 1) + self.offsetX;
			self.y = ((StageUtils.getInstance.stage.stageHeight - (self.height - self.offsetH)) >> 1) + self.offsetY;
		}
		/** 创建遮罩 */
		protected getMask(maskAlpha) {
			let rect = new eui.Rect();
			rect.touchEnabled = true;
			rect.percentWidth = 100;
			rect.percentHeight = 100;
			rect.fillColor = 0x0;
			rect.fillAlpha = maskAlpha;
			return rect;
		}

		/** 创建图片遮罩 */
		protected getImgMask(maskAlpha) {
			let self = this;
			self.maskImg = new eui.Image()
			self.maskImg.source = "com_json.frame_alpha_1";
			self.maskImg.alpha = maskAlpha;
			self.maskImg.scale9Grid = new egret.Rectangle(12, 12, 76, 76);
			self.maskImg.bottom = 0;
			self.maskImg.top = 0;
			self.maskImg.right = 0
			self.maskImg.left = 0
		}

		protected closePanel() {
			let self = this;
			if (self.getBackName() != null) {
				ScenesManager.getInstance.openView(UIUtil.createAlert(self.getBackName()))
				return;
			}
			self.dispose();
		}

		//不显示且移除界面
		public hide(): void {
			super.hide();
			let self = this;
			DisplayUtils.removeFromParent(self.maskImg);
			self.maskImg = null;
			// DisplayUtils.removeFromParent(self.maskRect);
			// self.maskRect = null;
		}
	}
}