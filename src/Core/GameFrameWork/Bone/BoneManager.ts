class BoneManager {
	private static _instance: BoneManager;
	private _factory: dragonBones.EgretFactory;
	public constructor() { this._factory = dragonBones.EgretFactory.factory; }
	public static get Instance(): BoneManager {
		if (!this._instance) {
			this._instance = new BoneManager();
		}
		return this._instance;
	}

	public test_showBone(resId: string) {
		let testBone: BoneAnimation = ResourcePool.getIntance().pop(resId, ResourcePool.SKE);
		DisplayUtils.addToStageCenter(testBone, true);
		testBone.playTimes = 0;
		testBone.removeAtLastFrame = false;
		testBone.play();
	}

	public start(): void {
		App.TimerManager.doFrame(0, 0, this.onUpdate, this);
	}
	public stop() {
		App.TimerManager.remove(this.onUpdate, this);
	}

	private onUpdate(event: Event): void {
		dragonBones.WorldClock.clock.advanceTime(-1);
	}

	public getArmature(path: string): dragonBones.Armature {
		if (this._factory.getDragonBonesData(path) == null) {
			let ske = this.getSkeData(path);
			let textureData = this.getTextureData(path);
			let texture = this.getTexture(path);

			this._factory.parseDragonBonesData(ske);
			this._factory.parseTextureAtlasData(textureData, texture);
		}
		let armature: dragonBones.Armature = this._factory.buildArmature(path);
		return armature;
	}

	private getSkeData(path: string): any {
		return RES.getRes(path + BoneConfig.SKE_END_TAG);
	}
	private getTextureData(path: string): any {
		return RES.getRes(path + BoneConfig.TEXTUREDATA_END_TAG);
	}
	private getTexture(path: string): any {
		return RES.getRes(path + BoneConfig.TEXTURE_END_TAG);
	}
}