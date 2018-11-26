var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Formulas = (function () {
    function Formulas() {
        /**上一次刷新远古BOSS的关卡 */
        this.lastCheckPowerfulBossLevel = 0;
        this.lastCheckPowerfulBossResult = false;
        Formulas.cachedMonsterLife[Formulas.levelWhereScaleChanges] = new BigNumber(Formulas.earlyBase).pow(Formulas.levelWhereScaleChanges - 1).multiplyN(10);
        Formulas.cachedMonsterLife[500] = new BigNumber(Formulas.lateBase).pow(500 - Formulas.levelWhereScaleChanges).multiply(Formulas.cachedMonsterLife[Formulas.levelWhereScaleChanges]);
    }
    Object.defineProperty(Formulas, "instance", {
        get: function () {
            if (Formulas._instance == null) {
                Formulas._instance = new Formulas();
            }
            return Formulas._instance;
        },
        enumerable: true,
        configurable: true
    });
    /**点击状态下的总秒伤 */
    Formulas.prototype.totalDpsFormula = function () {
        var achievementAdd = new BigNumber(BagManager.getInstance.bags.TryGetValue(ITEM_TYPE.GIFT_DAMAGE));
        var dps = new BigNumber(0);
        dps = dps.add(HeroesManager.instance.heroesTotalDps)
            .multiply(AncientManager.instance.comboClickPercent.multiply(PlayerInfoManager.getInstance.comboClick).percentIncreaseToMultiplier())
            .multiplyN(SkillManager.getInstance.dpsDouble)
            .multiply(achievementAdd.percentIncreaseToMultiplier())
            .addN(5);
        return dps;
    };
    /**挂机状态下的总秒伤 */
    Formulas.prototype.idleTotalDpsFormula = function () {
        var achievementAdd = new BigNumber(BagManager.getInstance.bags.TryGetValue(ITEM_TYPE.GIFT_DAMAGE));
        var dps = new BigNumber(0);
        dps = dps.add(HeroesManager.instance.heroesTotalDps)
            .multiply(AncientManager.instance.idleDpsPercent.percentIncreaseToMultiplier())
            .multiply(AncientManager.instance.idleUnassignedAutoclickerBonusPercent.multiplyN(Number(BagManager.getInstance.bags.TryGetValue(ITEM_TYPE.AUTO_CLICK))).percentIncreaseToMultiplier())
            .multiplyN(SkillManager.getInstance.dpsDouble)
            .multiply(achievementAdd.percentIncreaseToMultiplier())
            .addN(5);
        return dps;
    };
    /**暴击伤害倍率--已经算上暴击概率 */
    Formulas.prototype.getCriticalMultiply = function () {
        var percent = this.getCriticalPercent();
        var ran = 100 * Math.random();
        var critical = new BigNumber(1);
        AdventureManager.getInstance.isCrit = false;
        if (percent >= ran) {
            critical = critical.multiply(AncientManager.instance.criticalClickMultiplierPercent.percentIncreaseToMultiplier())
                .multiplyN(HeroSkillsManager.instance.getCriticalTimes())
                .multiply(HeroesManager.instance.getTotalSkinAdd(0, 3).percentIncreaseToMultiplier());
            AdventureManager.getInstance.isCrit = true;
            AdventureLogManager.getInstance.clickCirtCount++;
            AdventureLogManager.getInstance.clickCirtSecondIndex++;
        }
        return critical;
    };
    /**总点击伤害 */
    Formulas.prototype.totalClickDamageFormula = function () {
        var damage = new BigNumber(0);
        var achievementAdd = new BigNumber(BagManager.getInstance.bags.TryGetValue(ITEM_TYPE.Achievement_CLICK_DAMAGE));
        var privilegeAdd = new BigNumber(PrivilegeManager.instance.clickDamageAdd());
        damage = damage.add(HeroesManager.instance.getHeroesClickDamage())
            .multiplyN(SkillManager.getInstance.clickDoubleTwo)
            .add(achievementAdd)
            .add(PlayerInfoManager.getInstance.getTotalDps().multiplyN(HeroSkillsManager.instance.getTotalDpsPercentAddClickDamage()).multiplyN(0.01).multiply(AncientManager.instance.clickDamagePercent.percentIncreaseToMultiplier()))
            .add(privilegeAdd)
            .add(HeroesManager.instance.getTotalSkinAdd(0, 5))
            .add(new BigNumber(BagManager.getInstance.bags.TryGetValue(ITEM_TYPE.CLICK_DAMAGE)))
            .addN(4);
        return damage;
    };
    /**英雄秒伤公式--返回英雄秒伤 */
    Formulas.prototype.heroAttackFormula = function (param1, level) {
        var privilegeMultiply = Number(PrivilegeManager.instance.dpsPercentAdd());
        var attack = param1.baseAttack.multiply(new BigNumber(level))
            .multiply(param1.damageMultiplier)
            .multiply(param1.goldBodyMultiply.add(HeroesManager.instance.getTotalSkinAdd(param1.id, 0)).percentIncreaseToMultiplier())
            .multiply(HeroSkillsManager.instance.getHeroMultiplier(param1.id))
            .multiplyN(Math.pow(2, PlayerInfoManager.getInstance.rubyDamageNumber))
            .multiply(PlayerInfoManager.getInstance.accumulateHeroSoul.multiplyN(0.1).add(AncientManager.instance.dpsHeroSoulsPercent.multiplyN(0.01)).addN(1))
            .multiplyN(Math.pow(1.05, AdventureLogManager.getInstance.logData.darkRitualNum))
            .multiplyN((privilegeMultiply + 100) / 100)
            .multiply(HeroesManager.instance.getTotalSkinAdd(param1.id, 1).percentIncreaseToMultiplier());
        return attack;
    };
    /**英雄点击伤害公式--返回英雄点击伤害 */
    Formulas.prototype.heroClickDamageFormula = function (param1, level) {
        var clickDamage = new BigNumber(param1.baseClickDamage).multiply(new BigNumber(level))
            .multiply(param1.damageMultiplier)
            .multiply(HeroSkillsManager.instance.getHeroMultiplier(param1.id))
            .multiply(AncientManager.instance.clickDamagePercent.percentIncreaseToMultiplier())
            .multiply(HeroesManager.instance.getTotalSkinAdd(0, 2).percentIncreaseToMultiplier())
            .multiply(PlayerInfoManager.getInstance.accumulateHeroSoul.multiplyN(0.1).add(AncientManager.instance.dpsHeroSoulsPercent.multiplyN(0.01)).addN(1));
        return clickDamage;
    };
    Formulas.prototype.goldMaxLevelUpFormula = function (param1) {
        var result = new BigNumber(0);
        var add = 1;
        var gold = new BigNumber(BagManager.getInstance.bags.TryGetValue(ITEM_TYPE.GOLD));
        while (add <= 10000) {
            result = this.heroCostFormula(param1, param1.level, param1.level + add);
            if (result.biggerEqualThan(gold)) {
                return add - 1;
            }
            add++;
        }
        return 10000;
    };
    /**
     * 英雄升级花费公式--返回英雄升级花费金币
     *
     * level:开始升级等级
     * levelTo:升到的等级
     */
    Formulas.prototype.heroCostFormula = function (param1, level, levelTo) {
        var cost = param1.baseCost;
        var tem;
        var tem0 = 1.07;
        var tem1 = 0;
        var tem2;
        var tem3;
        var tem4;
        var tem5;
        if (param1.id > 50) {
            tem0 = 1.22;
        }
        var ancientAdd = 1 - AncientManager.instance.heroLevelCostPercent.multiplyN(0.01).numberValue();
        if (param1.id == 1) {
            if (level <= 15) {
                tem = new BigNumber(0);
                if (levelTo <= 15) {
                    tem1 = level;
                    while (tem1 < levelTo) {
                        tem = tem.add(new BigNumber((5 + tem1) * Math.pow(tem0, tem1) * ancientAdd));
                        tem1++;
                    }
                    return tem.floor();
                }
                tem1 = level;
                while (tem1 < 15) {
                    tem = tem.add(new BigNumber((5 + tem1) * Math.pow(tem0, tem1) * ancientAdd));
                    tem1++;
                }
                tem = tem.add(new BigNumber(20 * ((Math.pow(tem0, levelTo) - Math.pow(tem0, 15)) / (tem0 - 1)) * ancientAdd));
                return tem.floor();
            }
            tem = new BigNumber(ancientAdd * 20);
            cost = new BigNumber(tem0);
            cost = cost.pow(levelTo);
            tem2 = new BigNumber(tem0);
            tem3 = level;
            tem2 = tem2.pow(tem3);
            tem4 = cost.subtract(tem2);
            tem5 = new BigNumber(tem0 - 1);
            tem4 = tem4.divide(tem5);
            tem = tem.multiply(tem4);
            return tem.floor();
        }
        cost = param1.baseCost;
        var tem6 = new BigNumber(tem0).pow(levelTo);
        tem6 = tem6.subtract(new BigNumber(tem0).pow(level));
        tem6 = tem6.divide(new BigNumber(tem0 - 1));
        cost = cost.multiply(tem6);
        cost = cost.multiply(new BigNumber(ancientAdd));
        cost = cost.floor();
        return cost;
    };
    /**怪物血量计算过渡公式之一 */
    Formulas.prototype.oldMonsterLifeFormula = function (param1) {
        var self = this;
        var life = null;
        var tem = NaN;
        var tem1 = NaN;
        var tme2 = null;
        var temNumber1 = 1.6;
        var temNumber2 = 1.15;
        var temLevel = 140;
        if (param1.level < temLevel) {
            tem = param1.level;
            tem1 = 0;
        }
        else {
            tem = temLevel;
            tem1 = param1.level - temLevel;
        }
        var tme3 = new BigNumber(temNumber1);
        tme3 = tme3.pow(tem - 1);
        life = param1.baseLife;
        life = life.multiply(tme3);
        life = life.add(new BigNumber((tem - 1) * 10));
        if (param1.isBoss) {
            life = life.multiply(new BigNumber(self.getBossHpMultiplier(param1.level)));
        }
        if (tem1) {
            tme2 = new BigNumber(temNumber2);
            tme2 = tme2.pow(tem1);
            life = life.multiply(tme2);
        }
        life = life.ceil();
        return life;
    };
    /**怪物血量计算过渡公式之二 */
    Formulas.prototype.monsterLifeByFiveHundreds = function (param1) {
        var self = this;
        var life;
        var tem;
        var tem1;
        if (Formulas.cachedMonsterLife[param1] != null) {
            life = Formulas.cachedMonsterLife[param1];
        }
        else {
            tem = Math.floor(param1 / 500);
            tem1 = Formulas.lateBase + (tem - 1) * Formulas.increasePerFiveHundredLevels;
            life = new BigNumber(tem1).pow(500).multiply(this.monsterLifeByFiveHundreds(param1 - 500));
            Formulas.cachedMonsterLife[param1] = life;
        }
        return life;
    };
    /**怪物血量公式 */
    Formulas.prototype.monsterLifeFormula = function (param1) {
        var self = this;
        var life = new BigNumber(1);
        var tem;
        var tem1;
        var tem2;
        var tem3;
        var tem4;
        var tem5;
        var tem6;
        if (param1.level > 500) {
            return self.oldMonsterLifeFormula(param1);
        }
        if (param1.level <= Formulas.levelWhereScaleChanges) {
            life = new BigNumber(Formulas.earlyBase).pow(param1.level - 1).multiply(param1.baseLife);
            tem = param1.level;
            tem1 = 0;
        }
        else if (param1.level <= 500) {
            life = new BigNumber(Formulas.lateBase).pow(param1.level - Formulas.levelWhereScaleChanges).multiply(Formulas.cachedMonsterLife[Formulas.levelWhereScaleChanges]);
            tem = Formulas.levelWhereScaleChanges;
        }
        else if (param1.level > 200000) {
            life = Formulas.healthAt200k.multiply(new BigNumber(1.545).pow(param1.level - 200001));
        }
        else {
            tem2 = Math.floor(param1.level / 500);
            tem3 = tem2 * 500;
            tem4 = param1.level - tem3;
            tem5 = Formulas.lateBase + tem2 * Formulas.increasePerFiveHundredLevels;
            tem6 = self.monsterLifeByFiveHundreds(tem3);
            life = new BigNumber(tem5).pow(tem4).multiply(tem6);
            tem = Formulas.levelWhereScaleChanges;
        }
        life = life.add(new BigNumber((tem - 1) * 10));
        if (param1.isBoss) {
            life = life.multiply(new BigNumber(self.getBossHpMultiplier(param1.level)));
        }
        life = life.ceil();
        return life;
    };
    Formulas.prototype.getUncappedBossHpMultiplier = function (param1) {
        var self = this;
        var add = AncientManager.instance.bossLifePercent.numberValue();
        var multiply = 1 + Math.floor(param1 / Formulas.BOSS_HEALTH_INCREASE_ZONE_INTERVAL) * Formulas.BOSS_HEALTH_INCREASE_PER_ZONE_INTERVAL;
        return multiply * Formulas.BOSS_HP_MULTIPLIER * (1 - add / 100);
    };
    /**boss血量加成 */
    Formulas.prototype.getBossHpMultiplier = function (level) {
        var self = this;
        return Math.max(self.getUncappedBossHpMultiplier(level), Formulas.MINIMUM_BOSS_HP_MULTIPLIER);
    };
    /**怪物掉落金币公式 */
    Formulas.prototype.monsterGoldFormula = function (param1, param2) {
        if (param2 === void 0) { param2 = false; }
        var self = this;
        var tem = new BigNumber(1);
        var tenX = 1;
        var tem0 = 1;
        if (param1.level > 75) {
            tem0 = Math.min(3, Math.pow(1.025, param1.level - 75));
        }
        if (param1.isBoxMonster) {
            tem = self.getTreasureChestMultiplier();
        }
        if (self.isTenXGold()) {
            tenX = 10;
        }
        var gold = self.oldMonsterLifeFormula(param1);
        if (PlayerInfoManager.getInstance.info.isidle) {
            gold = gold.multiply(AncientManager.instance.idleGoldPercent.percentIncreaseToMultiplier());
        }
        var privilegeMultiply = new BigNumber(PrivilegeManager.instance.goldPercentAdd());
        gold = gold.divide(new BigNumber(15));
        gold = gold.multiply(tem);
        gold = gold.multiply(AncientManager.instance.goldPercent.percentIncreaseToMultiplier());
        gold = gold.multiply(new BigNumber(tem0));
        gold = gold.multiplyN(tenX);
        gold = gold.multiplyN(SkillManager.getInstance.goldDouble);
        gold = gold.multiply(privilegeMultiply.percentIncreaseToMultiplier());
        gold = gold.multiply(HeroesManager.instance.getTotalSkinAdd(0, 4).percentIncreaseToMultiplier());
        gold = gold.ceil();
        return gold;
    };
    /**10倍金币出现 */
    Formulas.prototype.isTenXGold = function () {
        var bol;
        var percent = 0;
        percent += AncientManager.instance.tenXGoldChance.numberValue();
        bol = percent > 100 * Math.random() ? true : false;
        return bol;
    };
    /**宝箱金币掉落加成 */
    Formulas.prototype.getTreasureChestMultiplier = function () {
        var multiply = new BigNumber(1);
        multiply = multiply.multiply(AncientManager.instance.treasureChestGoldPercent.percentIncreaseToMultiplier()).multiplyN(Formulas.TREASURE_MULTIPLIER);
        return multiply;
    };
    /**检测是否远古BOSS */
    Formulas.prototype.isPowerfulBoss = function (param1) {
        var self = this;
        var tem = 0;
        if (param1 < PlayerInfoManager.getInstance.playerMsg.missionId) {
            return false;
        }
        if (param1 < self.lastCheckPowerfulBossLevel) {
            return false;
        }
        if (param1 == self.lastCheckPowerfulBossLevel) {
            return self.lastCheckPowerfulBossResult;
        }
        self.lastCheckPowerfulBossLevel = param1;
        if (param1 >= 100) {
            if (param1 <= 1000 && param1 % 100 == 0 || param1 == 110 || param1 == 120 || param1 == 130) {
                self.lastCheckPowerfulBossResult = true;
                return true;
            }
            if (param1 % 5 == 0) {
                tem = self.getBossChance(param1);
                var randomNum = Math.random() * 100;
                if (randomNum < tem) {
                    self.lastCheckPowerfulBossResult = true;
                    return true;
                }
            }
        }
        self.lastCheckPowerfulBossResult = false;
        return false;
    };
    Formulas.prototype.getBossChance = function (param1) {
        var tem = 25 - Formulas.PRIMAL_BOSS_CHANCE_DECREASE_PERCENT * Math.floor(param1 / Formulas.ZONES_BETWEEN_PRIMAL_BOSS_CHANCE_DECREASE);
        var precent = AncientManager.instance.primalBossSpawnPercent.percentIncreaseToMultiplier();
        var result = Math.max(tem + precent.numberValue(), 5);
        return Math.min(result, 100);
    };
    /**远古BOSS掉落转生英魂的数量 */
    Formulas.prototype.getSacrificedHeroSoulRewards = function (param1) {
        var self = this;
        var privilegeMultiply = new BigNumber(PrivilegeManager.instance.soulPercentAdd());
        var result = new BigNumber(0);
        if (param1 == 100) {
            result = new BigNumber(1);
        }
        if (param1 > 100 && param1 % 5 == 0) {
            result = result.add(new BigNumber(Math.floor(Math.pow(((param1 - 100) / 5 + 4) / 5, 1.3))));
        }
        result = result.multiply(HeroesManager.instance.getTotalSkinAdd(0, 6).percentIncreaseToMultiplier());
        result = result.multiply(privilegeMultiply.percentIncreaseToMultiplier());
        result = result.ceil();
        return result;
    };
    /**宝箱出现概率 */
    Formulas.prototype.getTreasureChestChance = function (param1) {
        var AncientPercent = AncientManager.instance.treasureChestSpawnPercent.percentIncreaseToMultiplier().numberValue();
        var tem = 0.0099999999 * (1 - Math.exp(-0.006 * Math.floor(param1 / Formulas.TREASURE_CHANCE_DECREASE_ZONE_INTERVAL)));
        var percent = Math.max((Formulas.CHANCE_OF_TREASURE_MONSTER - tem) * AncientPercent, Formulas.MINIMUM_TREASURE_CHANCE_MULTIPLIER);
        return Math.min(0.99, percent);
    };
    Formulas.prototype.getCriticalPercent = function () {
        var percent = HeroSkillsManager.instance.getCriticalPercent();
        percent += SkillManager.getInstance.clickCirt;
        return percent;
    };
    Formulas.cachedMonsterLife = {};
    Formulas.earlyBase = 1.55;
    Formulas.lateBase = 1.145;
    Formulas.levelWhereScaleChanges = 140;
    Formulas.increasePerFiveHundredLevels = 0.001;
    Formulas.healthAt200k = new BigNumber("1.240e25409");
    /**boss血量加成基数 */
    Formulas.BOSS_HP_MULTIPLIER = 10;
    Formulas.BOSS_HEALTH_INCREASE_ZONE_INTERVAL = 500;
    Formulas.BOSS_HEALTH_INCREASE_PER_ZONE_INTERVAL = 0.04;
    Formulas.MINIMUM_BOSS_HP_MULTIPLIER = 5;
    /** 初始暴击倍率 */
    Formulas.baseCriticalTimes = 10;
    /**宝箱加成基数 */
    Formulas.TREASURE_MULTIPLIER = 10;
    /**盒子怪ID */
    Formulas.MONSTER_BOX = 52; //86
    /**转生技能ID */
    Formulas.REVIVE_SKILL = 96;
    /**转生技能英雄ID */
    Formulas.REVIVE_HERO = 20;
    /**转生技能所需英雄等级 */
    Formulas.REVIVE_SKILL_LEVEL = 150;
    /**人物角色列表 */
    Formulas.personIdList = [1, 4, 7, 10, 13, 16, 18, 20, 21, 24, 27, 30, 33, 36, 38, 40];
    Formulas.PRIMAL_BOSS_CHANCE_DECREASE_PERCENT = 2;
    Formulas.ZONES_BETWEEN_PRIMAL_BOSS_CHANCE_DECREASE = 500;
    Formulas.TREASURE_CHANCE_DECREASE_ZONE_INTERVAL = 500;
    Formulas.MINIMUM_TREASURE_CHANCE_MULTIPLIER = 0.01;
    Formulas.CHANCE_OF_TREASURE_MONSTER = 0.01;
    return Formulas;
}());
__reflect(Formulas.prototype, "Formulas");
//# sourceMappingURL=Formulas.js.map