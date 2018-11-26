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
var SocketEvents = (function (_super) {
    __extends(SocketEvents, _super);
    function SocketEvents(type, bubbles, cancelable) {
        if (bubbles === void 0) { bubbles = false; }
        if (cancelable === void 0) { cancelable = false; }
        return _super.call(this, type, bubbles, cancelable) || this;
    }
    Object.defineProperty(SocketEvents.prototype, "pkg", {
        get: function () {
            var self = this;
            return self._pkg;
        },
        enumerable: true,
        configurable: true
    });
    /**
    * 用于拼事件类型，使用协议号的16进制表示
    * @param ...args 一级协议，二级协议号
    * */
    SocketEvents.format = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var strArr = [];
        for (var i = 0; i < args.length; i++) {
            strArr.push(args[i].toString(16));
        }
        return strArr.join("+");
    };
    SocketEvents.DATA = "data";
    SocketEvents.SOCKET_CONNECT = "socketConnect";
    /** socket连接成功 **/
    SocketEvents.SOCKET_OPEN = "socket_open";
    /** socket错误 **/
    SocketEvents.SOCKET_ERROR = "socket_error";
    /** socket 关闭 **/
    SocketEvents.SOCKET_CLOSE = "SOCKET_close";
    /** socket 数据事件 **/
    SocketEvents.SOCKET_DATA = "socket_data";
    /** socket 中断 **/
    SocketEvents.SOCKET_CONNECT_STOP = "socket_connect_stop";
    /** socket 重连 **/
    SocketEvents.SOCKET_RECONNECT_SUCCESS = "socket_reconnect_success";
    return SocketEvents;
}(egret.Event));
__reflect(SocketEvents.prototype, "SocketEvents");
//# sourceMappingURL=SocketEvents.js.map