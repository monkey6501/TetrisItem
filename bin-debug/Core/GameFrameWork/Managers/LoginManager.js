var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 登陆管理类
 * @author weiqiang.huang
 */
var LoginManager = (function () {
    function LoginManager() {
    }
    LoginManager.prototype.setup = function () {
        var self = this;
    };
    Object.defineProperty(LoginManager, "getInstance", {
        get: function () {
            if (LoginManager._instance == null) {
                LoginManager._instance = new LoginManager();
            }
            return LoginManager._instance;
        },
        enumerable: true,
        configurable: true
    });
    return LoginManager;
}());
__reflect(LoginManager.prototype, "LoginManager");
//# sourceMappingURL=LoginManager.js.map