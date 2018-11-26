class AchievementsVO {
	public constructor() {
	}

	public id: number;
	public live: string;
	public flavorText: string;
	public premiumCurrency: number;
	public rewardParams: string;
	public description: string;
	public name: string;
	public iconId: number;
	public rewardFunction: string;
	public param1: string;
	public param2: string;
	public rewardText: string;
	public checkFunction: string;
	public type: number;
	public group: number;
	/** 是否领取奖励 */
	public isComplete: boolean = false;
	/** 当前进度，0为进度完成，可以领取奖励 */
	public process: string = "-1";
}