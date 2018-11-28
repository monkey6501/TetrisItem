var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var SoundManager = (function () {
    function SoundManager() {
    }
    /**播放音效*/
    SoundManager.playEffect = function (soundId) {
        //判断音效按钮是否静音，是则return 否则播放
        var self = this;
        if (self.gameVoice)
            self.loaderEffectSound(soundId);
    };
    SoundManager.playBattleEffect = function (soundId) {
        //判断音效按钮是否静音，是则return 否则播放
        var self = this;
        if (self.battleSound)
            self.loaderEffectSound(soundId);
    };
    SoundManager.loaderEffectSound = function (soundId) {
        return __awaiter(this, void 0, void 0, function () {
            var self, vo;
            return __generator(this, function (_a) {
                self = this;
                if (self.ALL_SOUND == false)
                    return [2 /*return*/];
                vo = GlobleData.getData(GlobleData.SoundVO, soundId);
                if (vo == null)
                    return [2 /*return*/];
                if (RES.getRes(PathManager.Instance.SoundPath + vo.file) == null) {
                    ResUtil.getInstance.loadAsyncSound(vo.file, function () {
                        SoundManager.createEffectSound(vo);
                    });
                }
                else {
                    SoundManager.createEffectSound(vo);
                }
                return [2 /*return*/];
            });
        });
    };
    SoundManager.createEffectSound = function (vo) {
        var self = this;
        var sound_eff = RES.getRes(PathManager.Instance.SoundPath + vo.file);
        if (sound_eff) {
            sound_eff.type = egret.Sound.EFFECT;
            var soundChannelEffect = sound_eff.play(0, vo.loop);
            soundChannelEffect.addEventListener(egret.Event.SOUND_COMPLETE, function () { }, this);
            soundChannelEffect.volume = vo.volume;
        }
    };
    /**播放背景音乐*/
    SoundManager.playBgSound = function (soundId, loop) {
        if (loop === void 0) { loop = true; }
        var self = this;
        self.loaderBGSound(soundId, loop);
    };
    SoundManager.loaderBGSound = function (soundId, loop) {
        if (loop === void 0) { loop = true; }
        return __awaiter(this, void 0, void 0, function () {
            var self, vo;
            return __generator(this, function (_a) {
                self = this;
                vo = GlobleData.getData(GlobleData.SoundVO, soundId);
                if (vo == null)
                    return [2 /*return*/];
                if (RES.getRes(PathManager.Instance.SoundPath + vo.file) == null) {
                    ResUtil.getInstance.loadAsyncSound(vo.file, function () {
                        SoundManager.createBgSound(vo, loop);
                    });
                }
                else {
                    SoundManager.createBgSound(vo, loop);
                }
                return [2 /*return*/];
            });
        });
    };
    SoundManager.createBgSound = function (vo, loop) {
        if (loop === void 0) { loop = true; }
        var self = this;
        self.sdbg = RES.getRes(PathManager.Instance.SoundPath + vo.file);
        if (self.sdbg) {
            self.sdbg.type = egret.Sound.MUSIC;
            SoundManager.stopBgSound();
            self.soundChannel = self.sdbg.play(0, loop ? 0 : 1);
            self.soundChannel.volume = vo.volume;
        }
    };
    /**停止背景音乐*/
    SoundManager.stopBgSound = function () {
        var self = this;
        if (self.soundChannel) {
            var channel = self.soundChannel;
            channel.stop();
            self.soundChannel = null;
        }
    };
    //判断音乐按钮是否静音，是则停止播放，否则恢复播放
    SoundManager.battleSound = true;
    /** 游戏音效开关 */
    SoundManager.gameVoice = true;
    SoundManager.ALL_SOUND = true;
    return SoundManager;
}());
__reflect(SoundManager.prototype, "SoundManager");
//# sourceMappingURL=SoundManager.js.map