var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var SkinName = (function () {
    function SkinName() {
    }
    SkinName.LoginViewSkin = "resource/gameSkins/login/LoginViewSkin.exml";
    SkinName.GameMainViewSkin = "resource/gameSkins/game/GameMainViewSkin.exml";
    SkinName.BlockItemSkin = "resource/gameSkins/game/BlockItemSkin.exml";
    SkinName.TetrisItemSkin = "resource/gameSkins/game/TetrisItemSkin.exml";
    return SkinName;
}());
__reflect(SkinName.prototype, "SkinName");
//# sourceMappingURL=SkinName.js.map