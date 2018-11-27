var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var UIUtil = (function () {
    function UIUtil() {
    }
    /** 创建提示框 */
    UIUtil.createAlert = function (className) {
        var classZ = className;
        var view = new classZ();
        view.uiName = className + "";
        return view;
    };
    /** 创建面板 */
    UIUtil.createPanel = function (className, isRandom) {
        if (isRandom === void 0) { isRandom = false; }
        var classZ = className;
        var view = new classZ();
        if (isRandom) {
            view.uiName = className + Math.random() + "";
        }
        else {
            view.uiName = className + "";
        }
        return view;
    };
    /** 创建场景 */
    UIUtil.createScene = function (className) {
        var classZ = className;
        var view = new classZ();
        view.uiName = className + "";
        return view;
    };
    /**
    * 设置滤镜变灰
    */
    UIUtil.setFilters = function (component) {
        if (component) {
            //颜色矩阵数组
            var colorMatrix = [
                0.3, 0.6, 0, 0, 0,
                0.3, 0.6, 0, 0, 0,
                0.3, 0.6, 0, 0, 0,
                0, 0, 0, 1, 0
            ];
            var colorFlilter = new egret.ColorMatrixFilter(colorMatrix);
            component.filters = [colorFlilter];
        }
    };
    /**
    * 设置滤镜变灰
    */
    UIUtil.setObjFilters = function (component) {
        if (component) {
            //颜色矩阵数组
            var colorMatrix = [
                0.3, 0.6, 0, 0, 0,
                0.3, 0.6, 0, 0, 0,
                0.3, 0.6, 0, 0, 0,
                0, 0, 0, 1, 0
            ];
            var colorFlilter = new egret.ColorMatrixFilter(colorMatrix);
            component.filters = [colorFlilter];
        }
    };
    /**
    * 设置文本红色和通用色切换
    */
    UIUtil.changeColor = function (label, bol) {
        if (label) {
            if (bol) {
                label.textColor = 0x503637;
            }
            else {
                label.textColor = 0xff0000;
            }
        }
    };
    /**
     *
     * @param {egret.TextField} textFile
     * @param {string} str
     *  "增加<font size='60' color='0x2bff00' i='true' b='false'>100</font>点初始点击伤害"
     */
    UIUtil.setText = function (textFile, str) {
        if (str === void 0) { str = ""; }
        if (!textFile)
            return;
        var styleParser = new egret.HtmlTextParser();
        textFile.textFlow = styleParser.parser(str);
    };
    UIUtil.getHtmlText = function (des) {
        if (des == "")
            return null;
        var txt = new egret.TextField();
        var styleParser = new egret.HtmlTextParser();
        txt.textFlow = styleParser.parser(des);
        return txt;
    };
    return UIUtil;
}());
__reflect(UIUtil.prototype, "UIUtil");
