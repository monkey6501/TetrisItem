module UI {
	export class BaseScene extends UI.BaseView {

		public constructor(uiskinPath: string) {
			super(uiskinPath)
			let self = this;
			self.type = UIType.Scene;
		}
	}
}