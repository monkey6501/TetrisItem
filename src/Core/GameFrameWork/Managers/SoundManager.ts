class SoundManager {
	public constructor() {
	}

	private static sdbg: egret.Sound;
	private static soundChannel: egret.SoundChannel;

	/**播放音效*/
	public static playEffect(soundId: number) {
		//判断音效按钮是否静音，是则return 否则播放
		let self = this;
		if (self.gameVoice)
			self.loaderEffectSound(soundId);
	}

	public static playBattleEffect(soundId: number) {
		//判断音效按钮是否静音，是则return 否则播放
		let self = this;
		if (self.battleSound)
			self.loaderEffectSound(soundId);
	}

	private static async loaderEffectSound(soundId: number) {
		let self = this;
		if (self.ALL_SOUND == false) return;
		let vo: SoundVO = GlobleData.getData(GlobleData.SoundVO, soundId);
		if (vo == null) return;
		if (RES.getRes(PathManager.Instance.SoundPath + vo.file) == null) {
			ResUtil.getInstance.loadAsyncSound(vo.file, () => {
				SoundManager.createEffectSound(vo);
			});
		}
		else {
			SoundManager.createEffectSound(vo);
		}
	}

	private static createEffectSound(vo: SoundVO): void {
		let self = this;
		var sound_eff: egret.Sound = RES.getRes(PathManager.Instance.SoundPath + vo.file);
		if (sound_eff) {
			sound_eff.type = egret.Sound.EFFECT;
			let soundChannelEffect: egret.SoundChannel = sound_eff.play(0, vo.loop);
			soundChannelEffect.addEventListener(egret.Event.SOUND_COMPLETE, () => { }, this)
			soundChannelEffect.volume = vo.volume;
		}
	}

	/**播放背景音乐*/
	public static playBgSound(soundId: number, loop: boolean = true) {
		let self = this;
		self.loaderBGSound(soundId, loop);
	}

	private static async loaderBGSound(soundId: number, loop: boolean = true) {
		let self = this;
		let vo: SoundVO = GlobleData.getData(GlobleData.SoundVO, soundId);
		if (vo == null) return;
		if (RES.getRes(PathManager.Instance.SoundPath + vo.file) == null) {
			ResUtil.getInstance.loadAsyncSound(vo.file, () => {
				SoundManager.createBgSound(vo, loop);
			});
		}
		else {
			SoundManager.createBgSound(vo, loop);
		}
	}

	private static createBgSound(vo: SoundVO, loop: boolean = true): void {
		let self = this;
		self.sdbg = RES.getRes(PathManager.Instance.SoundPath + vo.file);
		if (self.sdbg) {
			self.sdbg.type = egret.Sound.MUSIC;
			SoundManager.stopBgSound();
			self.soundChannel = self.sdbg.play(0, loop ? 0 : 1);
			self.soundChannel.volume = vo.volume;
		}
	}

	/**停止背景音乐*/
	public static stopBgSound() {
		let self = this;
		if (self.soundChannel) {
			let channel: egret.SoundChannel = self.soundChannel;
			channel.stop();
			self.soundChannel = null;
		}
	}
	//判断音乐按钮是否静音，是则停止播放，否则恢复播放
	public static battleSound: boolean = true;
	/** 游戏音效开关 */
	public static gameVoice: boolean = true;
	public static ALL_SOUND: boolean = true;
}