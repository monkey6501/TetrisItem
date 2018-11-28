var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var PathManager = (function () {
    function PathManager() {
        this._resourceUrl = "";
    }
    Object.defineProperty(PathManager, "Instance", {
        get: function () {
            if (!this._instance) {
                this._instance = new PathManager();
            }
            return this._instance;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PathManager.prototype, "resourceUrl", {
        get: function () {
            var self = this;
            return self._resourceUrl;
        },
        set: function (value) {
            var self = this;
            self._resourceUrl = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PathManager.prototype, "ThemePath", {
        get: function () {
            var self = this;
            return self._resourceUrl + "default.thm.json";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PathManager.prototype, "MapBackgoundPath", {
        get: function () {
            var self = this;
            return self._resourceUrl + "Common/map/{0}.jpg";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PathManager.prototype, "EquipPath", {
        get: function () {
            var self = this;
            return self._resourceUrl + "Common/equip/{0}.png";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PathManager.prototype, "MercenaryPath", {
        get: function () {
            var self = this;
            return self._resourceUrl + "Common/mercenarys/mercenary/{0}.png";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PathManager.prototype, "SevenDayPath", {
        get: function () {
            var self = this;
            return self._resourceUrl + "Common/sevenDay/{0}.png";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PathManager.prototype, "MercenaryLargePath", {
        get: function () {
            var self = this;
            return self._resourceUrl + "Common/mercenarys/drawing/{0}.png";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PathManager.prototype, "Mercenary_Small_Path", {
        get: function () {
            var self = this;
            return self._resourceUrl + "Common/mercenarys/mercenary_small/{0}.png";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PathManager.prototype, "HeroSkill_Path", {
        get: function () {
            var self = this;
            return self._resourceUrl + "Common/skill/heroSk_{0}.png";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PathManager.prototype, "Hero_Path", {
        get: function () {
            var self = this;
            return self._resourceUrl + "Common/heroes/big/{0}.png";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PathManager.prototype, "HeroGoldBody_Path", {
        get: function () {
            var self = this;
            return self._resourceUrl + "Common/heroes/gb/{0}.png";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PathManager.prototype, "HeroSkin_Path", {
        get: function () {
            var self = this;
            return self._resourceUrl + "Common/heroes/skin/{0}.png";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PathManager.prototype, "HeroSmallSkin_Path", {
        get: function () {
            var self = this;
            return self._resourceUrl + "Common/heroes/smallSkin/{0}.png";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PathManager.prototype, "Ancient_Path", {
        get: function () {
            var self = this;
            return self._resourceUrl + "Common/ancient/ancientIcon_{0}.png";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PathManager.prototype, "SkillPath", {
        get: function () {
            var self = this;
            return self._resourceUrl + "Common/skill/heroSk_{0}.png";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PathManager.prototype, "ItemPath", {
        get: function () {
            var self = this;
            return self._resourceUrl + "Common/item/{0}.png";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PathManager.prototype, "SoundPath", {
        get: function () {
            var self = this;
            return self._resourceUrl + "Common/sound/";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PathManager.prototype, "Shop", {
        get: function () {
            var self = this;
            return self._resourceUrl + "Common/shop/{0}.png";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PathManager.prototype, "Share", {
        get: function () {
            var self = this;
            return self._resourceUrl + "Common/share/{0}.jpg";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PathManager.prototype, "language_path", {
        get: function () {
            var self = this;
            return self._resourceUrl + "/config/language" + ".txt?v=" + Math.random();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PathManager.prototype, "ConfigUrls", {
        get: function () {
            var self = this;
            return [
                self._resourceUrl + "default.res.json?v=" + Math.random(),
                self._resourceUrl + "config/" + "game_com.res.json?v=" + Math.random(),
                self._resourceUrl + "config/" + "game_ui.res.json?v=" + Math.random(),
            ];
        },
        enumerable: true,
        configurable: true
    });
    return PathManager;
}());
__reflect(PathManager.prototype, "PathManager");
//# sourceMappingURL=PathManager.js.map