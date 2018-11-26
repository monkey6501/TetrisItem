var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var UIModel = (function () {
    function UIModel() {
    }
    return UIModel;
}());
__reflect(UIModel.prototype, "UIModel");
var UIType;
(function (UIType) {
    UIType[UIType["Scene"] = 0] = "Scene";
    UIType[UIType["Panel"] = 1] = "Panel";
    UIType[UIType["Alert"] = 2] = "Alert";
})(UIType || (UIType = {}));
//# sourceMappingURL=UIModel.js.map