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
var GlobleData = (function (_super) {
    __extends(GlobleData, _super);
    function GlobleData() {
        var _this = _super.call(this) || this;
        _this._hasParasComplete = false;
        _this._totalStepCsvList = new TSDictionary();
        _this._needParseCount = 0;
        _this._currParseCount = 0;
        return _this;
    }
    Object.defineProperty(GlobleData.prototype, "hasParasComplete", {
        get: function () {
            return this._hasParasComplete;
        },
        enumerable: true,
        configurable: true
    });
    GlobleData.prototype.setup = function (callback) {
        var self = this;
        self._callback = callback;
        self.initModel();
        self.initStep();
    };
    GlobleData.prototype.initModel = function () {
        var self = this;
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
    };
    // 解析初始数据表
    GlobleData.prototype.initStep = function () {
        var self = this;
        self._needParseCount = self._totalStepCsvList.GetLenght();
        RES.getResAsync("json_zip", this.onloadDataComplete, self);
        LogManager.logFormat("dataFile is json_zip");
    };
    GlobleData.prototype.onloadDataComplete = function (data, key) {
        var self = this;
        self._csvZipData = new JSZip(data);
        LogManager.logFormat("onloadDataComplete is json_zip:" + key);
        App.TimerManager.doFrame(0, 0, self.onEnterFrameLoader, self);
    };
    GlobleData.prototype.onEnterFrameLoader = function () {
        var self = this;
        if (self._currParseCount >= self._needParseCount) {
            App.TimerManager.remove(self.onEnterFrameLoader, self);
            this._hasParasComplete = true;
            GameEnterManager.Instance.setup();
            if (self._callback)
                self._callback();
        }
        else {
            //一次解析两个文件
            self.getCsvFile();
            self.getCsvFile();
        }
    };
    GlobleData.prototype.getCsvFile = function () {
        var self = this;
        if (self._currParseCount < self._needParseCount) {
            var key = self._totalStepCsvList.getKeyByIndex(self._currParseCount);
            key = key.replace('_', '.');
            var data = self._csvZipData.file(key);
            if (data == null) {
                LogManager.errorFormat("can't get key from key :" + key);
            }
            var csvStr = self._csvZipData.file(key).asText();
            self.starSingleParse(csvStr);
        }
    };
    GlobleData.prototype.starSingleParse = function (csvStr) {
        var self = this;
        var key = self._totalStepCsvList.getKeyByIndex(self._currParseCount);
        var DataClass = self._totalStepCsvList.getValueByIndex(self._currParseCount);
        var dic = CSVParser.ParseJsonData(DataClass, csvStr);
        GlobleData.AllCacheData.Add(key, dic);
        self._currParseCount++;
    };
    Object.defineProperty(GlobleData, "getInstance", {
        get: function () {
            if (!this._instance) {
                this._instance = new GlobleData();
            }
            return this._instance;
        },
        enumerable: true,
        configurable: true
    });
    GlobleData.getData = function (type, key) {
        var dic = GlobleData.AllCacheData.TryGetValue(type);
        if (!dic)
            return [];
        return dic.TryGetValue(key);
    };
    GlobleData.getDataByFilter = function (type, filterType, filterValue) {
        var dic = GlobleData.AllCacheData.TryGetValue(type);
        if (!dic)
            return [];
        var filterd = dic.TryGetListByCondition(function (bean) { return bean[filterType] == filterValue; });
        return filterd;
    };
    GlobleData.getAllValue = function (type) {
        var dic = GlobleData.AllCacheData.TryGetValue(type);
        if (!dic)
            return [];
        return dic.getValues();
    };
    GlobleData.getDataByCondition = function (type, value) {
        var dic = GlobleData.AllCacheData.TryGetValue(type);
        if (!dic)
            return [];
        var arr = dic.TryGetListByCondition(value);
        return arr;
    };
    GlobleData.AllCacheData = new TSDictionary();
    GlobleData.ServerConfigVO = "ServerConfig_json";
    GlobleData.AchievementsVO = "Achievements_json";
    GlobleData.HeroVO = "Heroes_json";
    GlobleData.MonsterVO = "Monsters_json";
    GlobleData.HeroSkillVO = "Skill_json";
    GlobleData.BoneAnimationVO = "BoneAnimation_json";
    GlobleData.LevelVO = "Level_json";
    GlobleData.EquipVO = "Equip_json";
    GlobleData.AncientVO = "Ancients_json";
    GlobleData.ShopVO = "Shop_json";
    GlobleData.MercenariesTaskVO = "MercenariesTask_json";
    GlobleData.AncientsPriceVO = "AncientsPrice_json";
    GlobleData.ZoneVO = "Zones_json";
    GlobleData.MercenariesVO = "Mercenaries_json";
    GlobleData.ItemVO = "Item_json";
    GlobleData.ErrorCodeVO = "ErrorCode_json";
    GlobleData.SkillVO = "Skill_json";
    GlobleData.SoundVO = "Sound_json";
    GlobleData.RoleSoundVO = "RoleSound_json";
    GlobleData.SkinVO = "Skin_json";
    GlobleData.SkinSkillVO = "SkinSkill_json";
    GlobleData.ActivityVO = "Activity_json";
    GlobleData.AwardVO = "Award_json";
    GlobleData.ActivityAwardVO = "ActivityAward_json";
    GlobleData.ShareVO = "Share_json";
    GlobleData.ChargeVO = "Charge_json";
    GlobleData.PrivilegeVO = "Privilege_json";
    GlobleData.SystemOpenVO = "SystemOpen_json";
    GlobleData.GuideVO = "Guide_json";
    GlobleData.PlayerNameVO = "PlayerName_json";
    GlobleData.StrongerVO = "Stronger_json";
    GlobleData.ColorWordVO = "ColorWord_json";
    GlobleData.TaskVO = "Task_json";
    return GlobleData;
}(egret.DisplayObject));
__reflect(GlobleData.prototype, "GlobleData");
//# sourceMappingURL=GlobleData.js.map