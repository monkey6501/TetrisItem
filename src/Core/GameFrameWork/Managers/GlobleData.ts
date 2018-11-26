class GlobleData extends egret.DisplayObject {

	private _hasParasComplete: boolean = false;
	private _totalStepCsvList: TSDictionary<string, any> = new TSDictionary<string, any>();
	private _needParseCount: number = 0;
	private _currParseCount: number = 0;
	private _csvZipData: JSZip;
	private static AllCacheData: TSDictionary<string, TSDictionary<number, any>> = new TSDictionary<string, TSDictionary<number, any>>();
	private _callback: Function;
	public get hasParasComplete(): boolean {
		return this._hasParasComplete;
	}

	public setup(callback: Function): void {
		let self = this;
		self._callback = callback;
		self.initModel();
		self.initStep();
	}

	public static ServerConfigVO: string = "ServerConfig_json";
	public static AchievementsVO: string = "Achievements_json";
	public static HeroVO: string = "Heroes_json";
	public static MonsterVO: string = "Monsters_json";
	public static HeroSkillVO: string = "Skill_json";
	public static BoneAnimationVO: string = "BoneAnimation_json";
	public static LevelVO: string = "Level_json";
	public static EquipVO: string = "Equip_json";
	public static AncientVO: string = "Ancients_json";
	public static ShopVO: string = "Shop_json";
	public static MercenariesTaskVO: string = "MercenariesTask_json";
	public static AncientsPriceVO: string = "AncientsPrice_json";
	public static ZoneVO: string = "Zones_json";
	public static MercenariesVO: string = "Mercenaries_json";
	public static ItemVO: string = "Item_json";
	public static ErrorCodeVO: string = "ErrorCode_json";
	public static SkillVO: string = "Skill_json";
	public static SoundVO: string = "Sound_json";
	public static RoleSoundVO: string = "RoleSound_json";
	public static SkinVO: string = "Skin_json";
	public static SkinSkillVO: string = "SkinSkill_json";
	public static ActivityVO: string = "Activity_json";
	public static AwardVO: string = "Award_json";
	public static ActivityAwardVO: string = "ActivityAward_json";
	public static ShareVO: string = "Share_json";
	public static ChargeVO: string = "Charge_json";
	public static PrivilegeVO: string = "Privilege_json";
	public static SystemOpenVO: string = "SystemOpen_json";
	public static GuideVO: string = "Guide_json";
	public static PlayerNameVO: string = "PlayerName_json";
	public static StrongerVO: string = "Stronger_json";
	public static ColorWordVO: string = "ColorWord_json";
	public static TaskVO: string = "Task_json";

	private initModel(): void {
		let self = this;
		self._totalStepCsvList.Add(GlobleData.ServerConfigVO, ServerConfigVO);
		self._totalStepCsvList.Add(GlobleData.AchievementsVO, AchievementsVO);
		self._totalStepCsvList.Add(GlobleData.HeroVO, HeroVO);
		self._totalStepCsvList.Add(GlobleData.MonsterVO, MonsterVO);
		self._totalStepCsvList.Add(GlobleData.BoneAnimationVO, BoneAnimationVO);
		self._totalStepCsvList.Add(GlobleData.LevelVO, LevelVO);
		self._totalStepCsvList.Add(GlobleData.HeroSkillVO, HeroSkillVO);
		self._totalStepCsvList.Add(GlobleData.EquipVO, EquipVO);
		self._totalStepCsvList.Add(GlobleData.AncientVO, AncientVO);
		self._totalStepCsvList.Add(GlobleData.ShopVO, ShopVO);
		self._totalStepCsvList.Add(GlobleData.MercenariesTaskVO, MercenariesTaskVO);
		self._totalStepCsvList.Add(GlobleData.AncientsPriceVO, AncientsPriceVO);
		self._totalStepCsvList.Add(GlobleData.ZoneVO, ZoneVO);
		self._totalStepCsvList.Add(GlobleData.MercenariesVO, MercenariesVO);
		self._totalStepCsvList.Add(GlobleData.ItemVO, ItemVO);
		self._totalStepCsvList.Add(GlobleData.ErrorCodeVO, ErrorCodeVO);
		self._totalStepCsvList.Add(GlobleData.SkillVO, SkillVO);
		self._totalStepCsvList.Add(GlobleData.SoundVO, SoundVO);
		self._totalStepCsvList.Add(GlobleData.RoleSoundVO, RoleSoundVO);
		self._totalStepCsvList.Add(GlobleData.SkinVO, SkinVO);
		self._totalStepCsvList.Add(GlobleData.SkinSkillVO, SkinSkillVO);
		self._totalStepCsvList.Add(GlobleData.ActivityVO, ActivityVO);
		self._totalStepCsvList.Add(GlobleData.AwardVO, AwardVO);
		self._totalStepCsvList.Add(GlobleData.ActivityAwardVO, ActivityAwardVO);
		self._totalStepCsvList.Add(GlobleData.ShareVO, ShareVO);
		self._totalStepCsvList.Add(GlobleData.ChargeVO, ChargeVO);
		self._totalStepCsvList.Add(GlobleData.PrivilegeVO, PrivilegeVO);
		self._totalStepCsvList.Add(GlobleData.SystemOpenVO, SystemOpenVO);
		self._totalStepCsvList.Add(GlobleData.GuideVO, GuideVO);
		self._totalStepCsvList.Add(GlobleData.PlayerNameVO, PlayerNameVO);
		self._totalStepCsvList.Add(GlobleData.StrongerVO, StrongerVO);
		self._totalStepCsvList.Add(GlobleData.ColorWordVO, ColorWordVO);
		self._totalStepCsvList.Add(GlobleData.TaskVO, TaskVO);
	}

	// 解析初始数据表
	private initStep(): void {
		let self = this;
		self._needParseCount = self._totalStepCsvList.GetLenght();
		RES.getResAsync("json_zip", this.onloadDataComplete, self);
		LogManager.logFormat("dataFile is json_zip");
	}
	private onloadDataComplete(data: any, key: string): void {
		let self = this;
		self._csvZipData = new JSZip(data);
		LogManager.logFormat("onloadDataComplete is json_zip:" + key);
		App.TimerManager.doFrame(0, 0, self.onEnterFrameLoader, self);
	}

	private onEnterFrameLoader(): void {
		let self = this;
		if (self._currParseCount >= self._needParseCount) {
			App.TimerManager.remove(self.onEnterFrameLoader, self);
			this._hasParasComplete = true;
			GameEnterManager.Instance.setup();
			if (self._callback) self._callback();
		}
		else {
			//一次解析两个文件
			self.getCsvFile();
			self.getCsvFile();
		}
	}

	private getCsvFile(): void {
		let self = this;
		if (self._currParseCount < self._needParseCount) {
			let key: string = self._totalStepCsvList.getKeyByIndex(self._currParseCount);
			key = key.replace('_', '.');
			let data: any = self._csvZipData.file(key);
			if (data == null) {
				LogManager.errorFormat("can't get key from key :" + key);
			}
			let csvStr: string = self._csvZipData.file(key).asText();
			self.starSingleParse(csvStr);
		}
	}

	private starSingleParse(csvStr: string): void {
		let self = this;
		let key: string = self._totalStepCsvList.getKeyByIndex(self._currParseCount);
		let DataClass: any = self._totalStepCsvList.getValueByIndex(self._currParseCount);
		let dic: TSDictionary<number, any> = CSVParser.ParseJsonData(DataClass, csvStr);
		GlobleData.AllCacheData.Add(key, dic);
		self._currParseCount++;
	}

	private static _instance: GlobleData;
	public constructor() { super(); }
	public static get getInstance(): GlobleData {
		if (!this._instance) {
			this._instance = new GlobleData();
		}
		return this._instance;
	}

	public static getData(type: string, key: number): any {
		let dic: TSDictionary<number, any> = GlobleData.AllCacheData.TryGetValue(type);
		if (!dic) return [];
		return dic.TryGetValue(key);
	}

	public static getDataByFilter(type: string, filterType: any, filterValue: any): any[] {
		let dic: TSDictionary<number, any> = GlobleData.AllCacheData.TryGetValue(type);
		if (!dic) return [];
		let filterd: any[] = dic.TryGetListByCondition((bean) => bean[filterType] == filterValue);
		return filterd
	}

	public static getAllValue(type: string): Array<any> {
		let dic: TSDictionary<number, any> = GlobleData.AllCacheData.TryGetValue(type);
		if (!dic) return [];
		return dic.getValues();
	}

	public static getDataByCondition(type: string, value: (value: any) => boolean): Array<any> {
		let dic: TSDictionary<number, any> = GlobleData.AllCacheData.TryGetValue(type);
		if (!dic) return [];
		let arr: any[] = dic.TryGetListByCondition(value);
		return arr;
	}
}