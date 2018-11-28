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
var SocketManager = (function (_super) {
    __extends(SocketManager, _super);
    function SocketManager() {
        var _this = _super.call(this) || this;
        _this._hasInitEvents = false;
        return _this;
    }
    SocketManager.prototype.setup = function (ip, port) {
        var self = this;
        self._socket = new ByteSocket(false);
        self._socket.connect(ip, port);
        self._out = new GameSocketOut(self);
        self.initEvents();
    };
    SocketManager.prototype.reConnect = function (ip, port) {
        var self = this;
        self._socket.connect(ip, port);
    };
    SocketManager.prototype.initEvents = function () {
        var self = this;
        if (self._hasInitEvents) {
            return;
        }
        self.addEventListener(SocketEvents.SOCKET_CONNECT, self.onConnectHandler, self);
        self._socket.addEventListener(SocketEvents.SOCKET_ERROR, self.onErrorHandler, self);
        self._socket.addEventListener(SocketEvents.SOCKET_CLOSE, self.onSocketCloseHandler, self);
        self._socket.addEventListener(SocketEvents.SOCKET_DATA, self.onSocketDataHandler, self);
        self._hasInitEvents = true;
    };
    SocketManager.prototype.removeEvents = function () {
        var self = this;
        self._hasInitEvents = false;
        self.removeEventListener(SocketEvents.SOCKET_CONNECT, self.onConnectHandler, self);
        self._socket.removeEventListener(SocketEvents.SOCKET_ERROR, self.onErrorHandler, self);
        self._socket.removeEventListener(SocketEvents.SOCKET_CLOSE, self.onSocketCloseHandler, self);
        self._socket.removeEventListener(SocketEvents.SOCKET_DATA, self.onSocketDataHandler, self);
    };
    /** 服务器连接成功 */
    SocketManager.prototype.onConnectHandler = function (evt) {
        var self = this;
        LogManager.logFormat("连接服务器成功");
        self.removeEventListener(SocketEvents.SOCKET_CONNECT, self.onConnectHandler, self);
        this.dispatchEventWith(SocketEvents.SOCKET_CONNECT);
    };
    /** 接受到的服务器数据 */
    SocketManager.prototype.onSocketDataHandler = function (evt) {
        var self = this;
        var pkg = evt.data;
        if (pkg != null) {
            // LogManager.logFormat("收到的数据协议号" + pkg.code);
            var code = pkg.code;
            var by = pkg.readBody();
            self.dispatchEventWith(SocketEvents.format(code), false, by.bytes);
        }
    };
    /** Socket连接关闭 */
    SocketManager.prototype.onSocketCloseHandler = function () {
        LogManager.logFormat("服务器没有连接上");
        SocketManager.getInstance.close();
    };
    /** Socket连接错误 */
    SocketManager.prototype.onErrorHandler = function (evt) {
        SocketManager.getInstance.close();
    };
    /** 关闭Socket连接 */
    SocketManager.prototype.close = function () {
        var self = this;
        if (self._socket != null) {
            self._socket.close();
            // ScenesManager.getInstance.openView(UIUtil.createAlert(ViewClassName.BrokenLineAlert), LayerManager.SCENE_POP_LAYER);
        }
    };
    Object.defineProperty(SocketManager.prototype, "socket", {
        get: function () {
            var self = this;
            return self._socket;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SocketManager.prototype, "out", {
        get: function () {
            var self = this;
            return self._out;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SocketManager, "getInstance", {
        get: function () {
            if (SocketManager._instance == null) {
                SocketManager._instance = new SocketManager();
            }
            return SocketManager._instance;
        },
        enumerable: true,
        configurable: true
    });
    return SocketManager;
}(egret.EventDispatcher));
__reflect(SocketManager.prototype, "SocketManager");
//# sourceMappingURL=SocketManager.js.map