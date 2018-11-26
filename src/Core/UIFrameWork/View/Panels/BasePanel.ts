module UI {
	export class BasePanel extends UI.BaseView {

		public constructor(uiskinPath: string) {
			super(uiskinPath);
			let self = this;
			self.type = UIType.Panel;
		}
	}
}