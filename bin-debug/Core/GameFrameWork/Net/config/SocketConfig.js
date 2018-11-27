var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var SocketConfig = (function () {
    function SocketConfig() {
    }
    /** IP地址 */
    SocketConfig.IP = "";
    /** 头的最大长度 */
    SocketConfig.HANDLER_MAX = 50;
    /** 加密的KEY */
    SocketConfig.KEY = [0xae, 0xbf, 0x56, 0x78, 0xab, 0xcd, 0xef, 0xf1];
    SocketConfig.HOST = "";
    return SocketConfig;
}());
__reflect(SocketConfig.prototype, "SocketConfig");
