class Formulas {

	private static cachedMonsterLife: Object = {};

	private static earlyBase: number = 1.55;

	private static lateBase: number = 1.145;

	private static levelWhereScaleChanges: number = 140;

	private static increasePerFiveHundredLevels: number = 0.001;

	private static healthAt200k: BigNumber = new BigNumber("1.240e25409");

	/**boss血量加成基数 */
	private static BOSS_HP_MULTIPLIER: number = 10;

	public static BOSS_HEALTH_INCREASE_ZONE_INTERVAL: number = 500;

	public static BOSS_HEALTH_INCREASE_PER_ZONE_INTERVAL: number = 0.04;

	public static MINIMUM_BOSS_HP_MULTIPLIER: number = 5;
	/** 初始暴击倍率 */
	public static baseCriticalTimes: number = 10;

	/**宝箱加成基数 */
	public static TREASURE_MULTIPLIER: number = 10;
	/**盒子怪ID */
	public static MONSTER_BOX: number = 52;//86
	/**转生技能ID */
	public static REVIVE_SKILL: number = 96;
	/**转生技能英雄ID */
	public static REVIVE_HERO: number = 20;
	/**转生技能所需英雄等级 */
	public static REVIVE_SKILL_LEVEL: number = 150;
	/**人物角色列表 */
	public static personIdList: number[] = [1, 4, 7, 10, 13, 16, 18, 20, 21, 24, 27, 30, 33, 36, 38, 40];

	public constructor() {
		Formulas.cachedMonsterLife[Formulas.levelWhereScaleChanges] = new BigNumber(Formulas.earlyBase).pow(Formulas.levelWhereScaleChanges - 1).multiplyN(10);
		Formulas.cachedMonsterLife[500] = new BigNumber(Formulas.lateBase).pow(500 - Formulas.levelWhereScaleChanges).multiply(Formulas.cachedMonsterLife[Formulas.levelWhereScaleChanges]);
	}

	private static _instance: Formulas;

	public static get instance(): Formulas {
		if (Formulas._instance == null) {
			Formulas._instance = new Formulas();
		}
		return Formulas._instance;
	}

	/**点击状态下的总秒伤 */
	public totalDpsFormula(): BigNumber {
		let achievementAdd: BigNumber = new BigNumber(BagManager.getInstance.bags.TryGetValue(ITEM_TYPE.GIFT_DAMAGE));
		let dps: BigNumber = new BigNumber(0);
		dps = dps.add(HeroesManager.instance.heroesTotalDps)
			.multiply(AncientManager.instance.comboClickPercent.multiply(PlayerInfoManager.getInstance.comboClick).percentIncreaseToMultiplier())
			.multiplyN(SkillManager.getInstance.dpsDouble)
			.multiply(achievementAdd.percentIncreaseToMultiplier())
			.addN(5)
		return dps;
	}

	/**挂机状态下的总秒伤 */
	public idleTotalDpsFormula(): BigNumber {
		let achievementAdd: BigNumber = new BigNumber(BagManager.getInstance.bags.TryGetValue(ITEM_TYPE.GIFT_DAMAGE));
		let dps: BigNumber = new BigNumber(0);
		dps = dps.add(HeroesManager.instance.heroesTotalDps)
			.multiply(AncientManager.instance.idleDpsPercent.percentIncreaseToMultiplier())
			.multiply(AncientManager.instance.idleUnassignedAutoclickerBonusPercent.multiplyN(Number(BagManager.getInstance.bags.TryGetValue(ITEM_TYPE.AUTO_CLICK))).percentIncreaseToMultiplier())
			.multiplyN(SkillManager.getInstance.dpsDouble)
			.multiply(achievementAdd.percentIncreaseToMultiplier())
			.addN(5)
		return dps;
	}


	/**暴击伤害倍率--已经算上暴击概率 */
	public getCriticalMultiply(): BigNumber {
		let percent: number = this.getCriticalPercent();
		let ran: number = 100 * Math.random();
		let critical: BigNumber = new BigNumber(1);
		AdventureManager.getInstance.isCrit = false;
		if (percent >= ran) {
			critical = critical.multiply(AncientManager.instance.criticalClickMultiplierPercent.percentIncreaseToMultiplier())
				.multiplyN(HeroSkillsManager.instance.getCriticalTimes())
				.multiply(HeroesManager.instance.getTotalSkinAdd(0, 3).percentIncreaseToMultiplier())
			AdventureManager.getInstance.isCrit = true;
			AdventureLogManager.getInstance.clickCirtCount++;
			AdventureLogManager.getInstance.clickCirtSecondIndex++;
		}
		return critical;
	}

	/**总点击伤害 */
	public totalClickDamageFormula(): BigNumber {
		let damage: BigNumber = new BigNumber(0);
		let achievementAdd: BigNumber = new BigNumber(BagManager.getInstance.bags.TryGetValue(ITEM_TYPE.Achievement_CLICK_DAMAGE));
		let privilegeAdd: BigNumber = new BigNumber(PrivilegeManager.instance.clickDamageAdd());
		damage = damage.add(HeroesManager.instance.getHeroesClickDamage())
			.multiplyN(SkillManager.getInstance.clickDoubleTwo)
			.add(achievementAdd)
			.add(PlayerInfoManager.getInstance.getTotalDps().multiplyN(HeroSkillsManager.instance.getTotalDpsPercentAddClickDamage()).multiplyN(0.01).multiply(AncientManager.instance.clickDamagePercent.percentIncreaseToMultiplier()))
			.add(privilegeAdd)
			.add(HeroesManager.instance.getTotalSkinAdd(0, 5))
			.add(new BigNumber(BagManager.getInstance.bags.TryGetValue(ITEM_TYPE.CLICK_DAMAGE)))
			.addN(4);
		return damage;
	}

	/**英雄秒伤公式--返回英雄秒伤 */
	public heroAttackFormula(param1: HeroInfo, level: number): BigNumber {
		let privilegeMultiply: number = Number(PrivilegeManager.instance.dpsPercentAdd());
		let attack: BigNumber = param1.baseAttack.multiply(new BigNumber(level))
			.multiply(param1.damageMultiplier)
			.multiply(param1.goldBodyMultiply.add(HeroesManager.instance.getTotalSkinAdd(param1.id, 0)).percentIncreaseToMultiplier())
			.multiply(HeroSkillsManager.instance.getHeroMultiplier(param1.id))
			.multiplyN(Math.pow(2, PlayerInfoManager.getInstance.rubyDamageNumber))
			.multiply(PlayerInfoManager.getInstance.accumulateHeroSoul.multiplyN(0.1).add(AncientManager.instance.dpsHeroSoulsPercent.multiplyN(0.01)).addN(1))
			.multiplyN(Math.pow(1.05, AdventureLogManager.getInstance.logData.darkRitualNum))
			.multiplyN((privilegeMultiply + 100) / 100)
			.multiply(HeroesManager.instance.getTotalSkinAdd(param1.id, 1).percentIncreaseToMultiplier())
		return attack;
	}

	/**英雄点击伤害公式--返回英雄点击伤害 */
	public heroClickDamageFormula(param1: HeroInfo, level: number): BigNumber {
		let clickDamage: BigNumber = new BigNumber(param1.baseClickDamage).multiply(new BigNumber(level))
			.multiply(param1.damageMultiplier)
			.multiply(HeroSkillsManager.instance.getHeroMultiplier(param1.id))
			.multiply(AncientManager.instance.clickDamagePercent.percentIncreaseToMultiplier())
			.multiply(HeroesManager.instance.getTotalSkinAdd(0, 2).percentIncreaseToMultiplier())
			.multiply(PlayerInfoManager.getInstance.accumulateHeroSoul.multiplyN(0.1).add(AncientManager.instance.dpsHeroSoulsPercent.multiplyN(0.01)).addN(1))
		return clickDamage;
	}

	public goldMaxLevelUpFormula(param1: HeroInfo): number {
		let result: BigNumber = new BigNumber(0);
		let add: number = 1;
		let gold: BigNumber = new BigNumber(BagManager.getInstance.bags.TryGetValue(ITEM_TYPE.GOLD));
		while (add <= 10000) {
			result = this.heroCostFormula(param1, param1.level, param1.level + add);
			if (result.biggerEqualThan(gold)) {
				return add - 1;
			}
			add++;
		}
		return 10000;
	}

	/**
	 * 英雄升级花费公式--返回英雄升级花费金币
	 * 
	 * level:开始升级等级
	 * levelTo:升到的等级
	 */
	public heroCostFormula(param1: HeroInfo, level: number, levelTo: number): BigNumber {
		let cost: BigNumber = param1.baseCost;
		let tem: BigNumber;
		let tem0: number = 1.07;
		let tem1: number = 0;
		let tem2: BigNumber;
		let tem3: number;
		let tem4: BigNumber;
		let tem5: BigNumber;
		if (param1.id > 50) {
			tem0 = 1.22;
		}
		let ancientAdd: number = 1 - AncientManager.instance.heroLevelCostPercent.multiplyN(0.01).numberValue();
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
		let tem6: BigNumber = new BigNumber(tem0).pow(levelTo);
		tem6 = tem6.subtract(new BigNumber(tem0).pow(level));
		tem6 = tem6.divide(new BigNumber(tem0 - 1));
		cost = cost.multiply(tem6);
		cost = cost.multiply(new BigNumber(ancientAdd));
		cost = cost.floor();
		return cost;
	}

	/**怪物血量计算过渡公式之一 */
	public oldMonsterLifeFormula(param1: MonsterInfo): BigNumber {
		let self = this;
		let life: BigNumber = null;
		let tem: number = NaN;
		let tem1: number = NaN;
		let tme2: BigNumber = null;
		let temNumber1: number = 1.6;
		let temNumber2: Number = 1.15;
		let temLevel: number = 140;
		if (param1.level < temLevel) {
			tem = param1.level;
			tem1 = 0;
		}
		else {
			tem = temLevel;
			tem1 = param1.level - temLevel;
		}
		let tme3: BigNumber = new BigNumber(temNumber1);
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
	}

	/**怪物血量计算过渡公式之二 */
	private monsterLifeByFiveHundreds(param1: number): BigNumber {
		let self = this;
		let life: BigNumber;
		let tem: number;
		let tem1: number;
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
	}

	/**怪物血量公式 */
	public monsterLifeFormula(param1: MonsterInfo): BigNumber {
		let self = this;
		let life: BigNumber = new BigNumber(1);
		let tem: number;
		let tem1: number;
		let tem2: number;
		let tem3: number;
		let tem4: number;
		let tem5: number;
		let tem6: BigNumber;
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
	}

	private getUncappedBossHpMultiplier(param1: number): number {
		let self = this;
		let add: number = AncientManager.instance.bossLifePercent.numberValue();
		let multiply: number = 1 + Math.floor(param1 / Formulas.BOSS_HEALTH_INCREASE_ZONE_INTERVAL) * Formulas.BOSS_HEALTH_INCREASE_PER_ZONE_INTERVAL;
		return multiply * Formulas.BOSS_HP_MULTIPLIER * (1 - add / 100);
	}

	/**boss血量加成 */
	private getBossHpMultiplier(level: number): number {
		let self = this;
		return Math.max(self.getUncappedBossHpMultiplier(level), Formulas.MINIMUM_BOSS_HP_MULTIPLIER);
	}

	/**怪物掉落金币公式 */
	public monsterGoldFormula(param1: MonsterInfo, param2: boolean = false): BigNumber {
		let self = this;
		let tem: BigNumber = new BigNumber(1);
		let tenX: number = 1;
		let tem0: number = 1;
		if (param1.level > 75) {
			tem0 = Math.min(3, Math.pow(1.025, param1.level - 75));
		}
		if (param1.isBoxMonster) {
			tem = self.getTreasureChestMultiplier();
		}
		if (self.isTenXGold()) {
			tenX = 10;
		}
		let gold: BigNumber = self.oldMonsterLifeFormula(param1);
		if (PlayerInfoManager.getInstance.info.isidle) {
			gold = gold.multiply(AncientManager.instance.idleGoldPercent.percentIncreaseToMultiplier());
		}
		let privilegeMultiply: BigNumber = new BigNumber(PrivilegeManager.instance.goldPercentAdd());
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
	}

	/**10倍金币出现 */
	private isTenXGold(): boolean {
		let bol: boolean;
		let percent: number = 0;
		percent += AncientManager.instance.tenXGoldChance.numberValue();
		bol = percent > 100 * Math.random() ? true : false;
		return bol;
	}

	/**宝箱金币掉落加成 */
	private getTreasureChestMultiplier(): BigNumber {
		let multiply: BigNumber = new BigNumber(1);
		multiply = multiply.multiply(AncientManager.instance.treasureChestGoldPercent.percentIncreaseToMultiplier()).multiplyN(Formulas.TREASURE_MULTIPLIER);
		return multiply;
	}

	/**上一次刷新远古BOSS的关卡 */
	public lastCheckPowerfulBossLevel: number = 0;
	private lastCheckPowerfulBossResult: boolean = false;
	/**检测是否远古BOSS */
	public isPowerfulBoss(param1: number): boolean {
		let self = this;

		let tem: number = 0;
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
				let randomNum: number = Math.random() * 100
				if (randomNum < tem) {
					self.lastCheckPowerfulBossResult = true;
					return true;
				}
			}
		}
		self.lastCheckPowerfulBossResult = false;
		return false;
	}

	private static PRIMAL_BOSS_CHANCE_DECREASE_PERCENT: number = 2;

	private static ZONES_BETWEEN_PRIMAL_BOSS_CHANCE_DECREASE: number = 500;

	private getBossChance(param1: number): number {
		let tem: number = 25 - Formulas.PRIMAL_BOSS_CHANCE_DECREASE_PERCENT * Math.floor(param1 / Formulas.ZONES_BETWEEN_PRIMAL_BOSS_CHANCE_DECREASE);
		let precent: BigNumber = AncientManager.instance.primalBossSpawnPercent.percentIncreaseToMultiplier();
		let result: number = Math.max(tem + precent.numberValue(), 5);
		return Math.min(result, 100);
	}

	/**远古BOSS掉落转生英魂的数量 */
	public getSacrificedHeroSoulRewards(param1: number): BigNumber {
		let self = this;
		let privilegeMultiply: BigNumber = new BigNumber(PrivilegeManager.instance.soulPercentAdd());
		let result: BigNumber = new BigNumber(0);
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
	}

	public static TREASURE_CHANCE_DECREASE_ZONE_INTERVAL: number = 500;

	public static MINIMUM_TREASURE_CHANCE_MULTIPLIER: number = 0.01;

	public static CHANCE_OF_TREASURE_MONSTER: number = 0.01;

	/**宝箱出现概率 */
	public getTreasureChestChance(param1: number): number {
		let AncientPercent: number = AncientManager.instance.treasureChestSpawnPercent.percentIncreaseToMultiplier().numberValue();
		let tem: number = 0.0099999999 * (1 - Math.exp(-0.006 * Math.floor(param1 / Formulas.TREASURE_CHANCE_DECREASE_ZONE_INTERVAL)));
		let percent: number = Math.max((Formulas.CHANCE_OF_TREASURE_MONSTER - tem) * AncientPercent, Formulas.MINIMUM_TREASURE_CHANCE_MULTIPLIER);
		return Math.min(0.99, percent);
	}

	public getCriticalPercent(): number {
		let percent: number = HeroSkillsManager.instance.getCriticalPercent();
		percent += SkillManager.getInstance.clickCirt;
		return percent;
	}
}