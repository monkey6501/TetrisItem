class PathManager {
	public constructor() { }

	private static _instance: PathManager;
	public static get Instance(): PathManager {
		if (!this._instance) {
			this._instance = new PathManager();
		}
		return this._instance;
	}

	private _resourceUrl: string = "";
	public get resourceUrl(): string {
		let self = this;
		return self._resourceUrl;
	}
	public set resourceUrl(value: string) {
		let self = this;
		self._resourceUrl = value;
	}

	public get ThemePath(): string {
		let self = this;
		return self._resourceUrl + "config/" + "default.thm.json";
	}

	public get MapBackgoundPath(): string {
		let self = this;
		return self._resourceUrl + "Common/map/{0}.jpg";
	}

	public get EquipPath(): string {
		let self = this;
		return self._resourceUrl + "Common/equip/{0}.png";
	}

	public get MercenaryPath(): string {
		let self = this;
		return self._resourceUrl + "Common/mercenarys/mercenary/{0}.png";
	}

	public get SevenDayPath(): string {
		let self = this;
		return self._resourceUrl + "Common/sevenDay/{0}.png";
	}

	public get MercenaryLargePath(): string {
		let self = this;
		return self._resourceUrl + "Common/mercenarys/drawing/{0}.png";
	}

	public get Mercenary_Small_Path(): string {
		let self = this;
		return self._resourceUrl + "Common/mercenarys/mercenary_small/{0}.png";
	}

	public get HeroSkill_Path(): string {
		let self = this;
		return self._resourceUrl + "Common/skill/heroSk_{0}.png";
	}

	public get Hero_Path(): string {
		let self = this;
		return self._resourceUrl + "Common/heroes/big/{0}.png";
	}

	public get HeroGoldBody_Path(): string {
		let self = this;
		return self._resourceUrl + "Common/heroes/gb/{0}.png";
	}

	public get HeroSkin_Path(): string {
		let self = this;
		return self._resourceUrl + "Common/heroes/skin/{0}.png";
	}

	public get HeroSmallSkin_Path(): string {
		let self = this;
		return self._resourceUrl + "Common/heroes/smallSkin/{0}.png";
	}

	public get Ancient_Path(): string {
		let self = this;
		return self._resourceUrl + "Common/ancient/ancientIcon_{0}.png";
	}

	public get SkillPath(): string {
		let self = this;
		return self._resourceUrl + "Common/skill/heroSk_{0}.png";
	}

	public get ItemPath(): string {
		let self = this;
		return self._resourceUrl + "Common/item/{0}.png";
	}

	public get SoundPath(): string {
		let self = this;
		return self._resourceUrl + "Common/sound/";
	}

	public get Shop(): string {
		let self = this;
		return self._resourceUrl + "Common/shop/{0}.png";
	}

	public get Share(): string {
		let self = this;
		return self._resourceUrl + "Common/share/{0}.jpg";
	}

	public get language_path(): string {
		let self = this;
		return self._resourceUrl + GameConfig.Language + "/config/language" + ".txt?v=" + Math.random();
	}

	public get ConfigUrls(): string[] {
		let self = this;
		return [
			//公共资源
			self._resourceUrl + "config/" + "game_com.res.json?v=" + Math.random(),
			self._resourceUrl + "config/" + "game_animation.res.json?v=" + Math.random(),
			//对应国家的资源
			self._resourceUrl + GameConfig.Language + "/config/" + "default.res.json?v=" + Math.random(),
			self._resourceUrl + GameConfig.Language + "/config/" + "game_ui.res.json?v=" + Math.random(),
		];
	}
}