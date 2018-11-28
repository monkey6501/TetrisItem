var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var BoneManager = (function () {
    function BoneManager() {
        this._factory = dragonBones.EgretFactory.factory;
    }
    Object.defineProperty(BoneManager, "Instance", {
        get: function () {
            if (!this._instance) {
                this._instance = new BoneManager();
            }
            return this._instance;
        },
        enumerable: true,
        configurable: true
    });
    BoneManager.prototype.test_showBone = function (resId) {
        var testBone = ResourcePool.getIntance().pop(resId, ResourcePool.SKE);
        DisplayUtils.addToStageCenter(testBone, true);
        testBone.playTimes = 0;
        testBone.removeAtLastFrame = false;
        testBone.play();
    };
    BoneManager.prototype.start = function () {
        App.TimerManager.doFrame(0, 0, this.onUpdate, this);
    };
    BoneManager.prototype.stop = function () {
        App.TimerManager.remove(this.onUpdate, this);
    };
    BoneManager.prototype.onUpdate = function (event) {
        dragonBones.WorldClock.clock.advanceTime(-1);
    };
    BoneManager.prototype.getArmature = function (path) {
        if (this._factory.getDragonBonesData(path) == null) {
            var ske = this.getSkeData(path);
            var textureData = this.getTextureData(path);
            var texture = this.getTexture(path);
            this._factory.parseDragonBonesData(ske);
            this._factory.parseTextureAtlasData(textureData, texture);
        }
        var armature = this._factory.buildArmature(path);
        return armature;
    };
    BoneManager.prototype.getSkeData = function (path) {
        return RES.getRes(path + BoneConfig.SKE_END_TAG);
    };
    BoneManager.prototype.getTextureData = function (path) {
        return RES.getRes(path + BoneConfig.TEXTUREDATA_END_TAG);
    };
    BoneManager.prototype.getTexture = function (path) {
        return RES.getRes(path + BoneConfig.TEXTURE_END_TAG);
    };
    return BoneManager;
}());
__reflect(BoneManager.prototype, "BoneManager");
//# sourceMappingURL=BoneManager.js.map