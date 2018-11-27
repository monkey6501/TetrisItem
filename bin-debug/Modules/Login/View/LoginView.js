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
var LoginView = (function (_super) {
    __extends(LoginView, _super);
    function LoginView() {
        return _super.call(this, SkinName.LoginViewSkin) || this;
    }
    LoginView.prototype.addEvents = function () {
        _super.prototype.addEvents.call(this);
        var self = this;
        self.beginBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, self.beginBtnHandler, self);
    };
    LoginView.prototype.show = function () {
        _super.prototype.show.call(this);
        var self = this;
    };
    LoginView.prototype.beginBtnHandler = function () {
        var self = this;
        // ScenesManager.getInstance.removeView(ViewClassName.LoginView);  //后面检查一下，这个self.close()有没有删除ScenesManager里面的self._views存的值
        self.close();
        ScenesManager.getInstance.openView(UIUtil.createScene(ViewClassName.GameMainView), LayerManager.GAME_UI_LAYER, true);
    };
    LoginView.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
        var self = this;
    };
    return LoginView;
}(UI.BaseScene));
__reflect(LoginView.prototype, "LoginView");
//# sourceMappingURL=LoginView.js.map