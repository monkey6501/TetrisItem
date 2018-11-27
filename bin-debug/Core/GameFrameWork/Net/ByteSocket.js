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
var ByteSocket = (function (_super) {
    __extends(ByteSocket, _super);
    function ByteSocket(encrypted, isDebug) {
        if (isDebug === void 0) { isDebug = false; }
        var _this = _super.call(this) || this;
        _this._m_PackageQueue = new Array();
        var self = _this;
        SocketConfig.DEBUG = isDebug;
        self._readBuffer = new egret.ByteArray();
        self._headerTemp = new egret.ByteArray();
        self._encrypted = encrypted;
        return _this;
        // self.setKey(SocketConfig.KEY);
    }
    /** 设置加密KEY */
    ByteSocket.prototype.setKey = function (key) {
        var self = this;
        self.RECEIVE_KEY = new egret.ByteArray();
        self.SEND_KEY = new egret.ByteArray();
        for (var i = 0; i < 8; i++) {
            self.RECEIVE_KEY.writeByte(key[i]);
            self.SEND_KEY.writeByte(key[i]);
        }
    };
    /** 重置加密KEY */
    ByteSocket.prototype.resetKey = function () {
        this.setKey(SocketConfig.KEY);
    };
    /// <summary>
    /// 发送probuf 包
    /// </summary>
    /// <param name="pkg"></param>
    /// <param name="msg"></param>
    ByteSocket.prototype.sendProtobuffer = function (pkg, data) {
        var self = this;
        if (data != null) {
            var btyearray = new egret.ByteArray(data);
            pkg.writeBytes(btyearray, 0, btyearray.length);
        }
        self.send(pkg);
    };
    ByteSocket.prototype.send = function (pkg) {
        var self = this;
        if (self._socket && self._socket.connected) {
            pkg.pack();
            if (self._encrypted) {
                pkg.position = 0;
                self.SEND_KEY.position = 0;
                var dataH = void 0;
                var sendH = void 0;
                var lastData = void 0;
                var pagPosition = void 0;
                var sendPosition = void 0;
                var sendByteArray = new egret.ByteArray();
                var sendKeyAY = new egret.ByteArray();
                var nextKeyDataBy = new egret.ByteArray();
                for (var i = 0; i < pkg.length; i++) {
                    if (i > 0) {
                        pagPosition = i;
                        sendPosition = i % 8;
                        pkg.position = pagPosition;
                        self.SEND_KEY.position = sendPosition;
                        var tempPkgData = lastData;
                        if (i >= 8) {
                            if (sendKeyAY.position >= 8 && nextKeyDataBy.length > 0) {
                                sendKeyAY.clear();
                                sendKeyAY = self.copyByteArray(nextKeyDataBy);
                                nextKeyDataBy.clear();
                            }
                            sendKeyAY.position = sendPosition;
                            sendH = sendKeyAY.readByte();
                            sendH = (sendH + tempPkgData) ^ i;
                            nextKeyDataBy.writeByte(sendH);
                        }
                        else {
                            sendH = self.SEND_KEY.readByte();
                            sendH = (sendH + tempPkgData) ^ i;
                            sendKeyAY.writeByte(sendH);
                        }
                        dataH = pkg.readByte();
                        dataH = (dataH ^ sendH) + tempPkgData;
                        lastData = dataH;
                        sendByteArray.writeByte(dataH);
                    }
                    else {
                        dataH = pkg.readByte();
                        sendH = self.SEND_KEY.readByte();
                        dataH = dataH ^ sendH;
                        lastData = dataH;
                        sendByteArray.writeByte(dataH);
                        sendKeyAY.writeByte(sendH);
                    }
                }
                var keyBackup = new egret.ByteArray();
                if (nextKeyDataBy.length > 0) {
                    keyBackup = self.copyByteArray(nextKeyDataBy);
                }
                sendKeyAY.position = nextKeyDataBy.position;
                for (i = sendKeyAY.position; i < sendKeyAY.length; i++) {
                    keyBackup.writeByte(sendKeyAY.readByte());
                }
                self.SEND_KEY.clear();
                self.SEND_KEY = self.copyByteArray(keyBackup);
                keyBackup.clear();
                sendKeyAY.clear();
                nextKeyDataBy.clear();
                self._socket.writeBytes(sendByteArray, 0, sendByteArray.length);
            }
            else {
                pkg.position = 0;
                self._socket.writeBytes(pkg, 0, pkg.length);
            }
            self._socket.flush();
        }
    };
    ByteSocket.prototype.connect = function (ip, port) {
        var self = this;
        //已经连接上了 再次请求连接  先关闭上次连接
        if (self._socket != null) {
            self.close();
        }
        //TCP 连接
        self._socket = new egret.WebSocket();
        self._socket.type = egret.WebSocket.TYPE_BINARY;
        SocketConfig.IP = ip;
        SocketConfig.PORT = port;
        self._readBuffer.position = 0;
        self._readOffset = 0;
        self._writeOffset = 0;
        self._socket.addEventListener(egret.Event.CONNECT, self.onConnectHandler, self);
        self._socket.addEventListener(egret.IOErrorEvent.IO_ERROR, self.onErrorHandler, self);
        self._socket.addEventListener(egret.Event.CLOSE, self.onCloseHandler, self);
        self._socket.connectByUrl(ip + ":" + port + "/weegame");
    };
    ByteSocket.prototype.onErrorHandler = function (evt) {
        LogManager.logFormat("连接错误");
        var self = this;
        var event = new egret.Event(SocketEvents.SOCKET_ERROR);
        self.dispatchEvent(event);
    };
    ByteSocket.prototype.onCloseHandler = function () {
        LogManager.logFormat("连接关闭");
        var self = this;
        var event = new egret.Event(SocketEvents.SOCKET_CLOSE);
        self.dispatchEvent(event);
    };
    ByteSocket.prototype.onConnectHandler = function () {
        var self = this;
        LogManager.logFormat("连接socket成功");
        SocketManager.getInstance.onConnectHandler(null);
        self._socket.addEventListener(egret.ProgressEvent.SOCKET_DATA, self.onReceiveMessageHandler, self);
    };
    ByteSocket.prototype.onReceiveMessageHandler = function () {
        var self = this;
        if (!self._socket.connected) {
            //与服务器断开连接
            self.close();
            return;
        }
        //Receive方法一直等待服务器消息
        var arr = new egret.ByteArray();
        self._socket.readBytes(arr);
        var len = arr.length;
        if (len > 0) {
            var receivebuff = arr;
            //接受的时候保存在流中
            self._readBuffer.writeBytes(receivebuff, 0, len);
            self._writeOffset += len;
            if (self._writeOffset > 1) {
                self._readOffset = 0;
                if (len >= PackageIn.HEADER_SIZE) {
                    self.readPackage();
                }
            }
        }
    };
    ByteSocket.prototype.readPackage = function () {
        var self = this;
        var dataLeft = self._writeOffset - self._readOffset;
        var readByte = self.copyByteArray(self._readBuffer);
        readByte.position = 0;
        do {
            var len = 0;
            //解析包长
            self._readBuffer.position = self._readOffset;
            while (self._readOffset + 4 < self._writeOffset) {
                //解析包头
                self._headerTemp.clear();
                self._headerTemp.writeByte(self._readBuffer.readByte());
                self._headerTemp.writeByte(self._readBuffer.readByte());
                self._headerTemp.writeByte(self._readBuffer.readByte());
                self._headerTemp.writeByte(self._readBuffer.readByte());
                if (self._encrypted) {
                    self._headerTemp = self.decrptBytes(self._headerTemp, 4, self.copyByteArray(self.RECEIVE_KEY));
                }
                self._headerTemp.position = 0;
                if (self._headerTemp.readShort() == PackageOut.HEADER) {
                    //拿到包长
                    len = self._headerTemp.readUnsignedShort();
                    break;
                }
                else {
                    self._readOffset++;
                }
            }
            dataLeft = self._writeOffset - self._readOffset;
            if (dataLeft >= len && len != 0) {
                var readByteTemp = new egret.ByteArray();
                self._readBuffer.position = self._readOffset;
                var k = 0;
                for (k = 0; k < dataLeft; k++) {
                    readByteTemp.writeByte(readByte.readByte());
                }
                var buff = new PackageIn();
                if (self._encrypted) {
                    buff.loadE(readByteTemp, len, self.RECEIVE_KEY);
                }
                else {
                    buff.load(readByteTemp, len);
                }
                self._readOffset += len;
                dataLeft = self._writeOffset - self._readOffset;
                self.handlePackage(buff);
            }
            else {
                break;
            }
        } while (dataLeft >= PackageIn.HEADER_SIZE);
        self._readBuffer.position = 0;
        if (dataLeft > 0) {
            self._readBuffer.writeBytes(self._readBuffer, self._readOffset, dataLeft);
        }
        self._readOffset = 0;
        self._writeOffset = dataLeft;
    };
    ByteSocket.prototype.handlePackage = function (pkg) {
        var self = this;
        if (pkg.checksum == pkg.calculateCheckSum()) {
            pkg.position = PackageIn.HEADER_SIZE;
            //LogManager.logFormat("[解析包体]: " + pkg.code.toString());			
            self._m_PackageQueue.push(pkg);
            self.onGetSocketData();
        }
    };
    ByteSocket.prototype.decrptBytes = function (src, len, key) {
        var self = this;
        var i = 0;
        var result = new egret.ByteArray();
        src.position = 0;
        key.position = 0;
        var srcData;
        var lastSrcData;
        var keyData;
        var keyDataBy = new egret.ByteArray();
        var nextKeyDataBy = new egret.ByteArray();
        var keyPosition;
        var srcPosition;
        var tempResultData;
        for (i = 0; i < len; i++) {
            if (i > 0) {
                keyPosition = i % 8;
                key.position = keyPosition;
                if (i >= 8) {
                    if (keyDataBy.position >= 8 && nextKeyDataBy.length > 0) {
                        keyDataBy.clear();
                        keyDataBy = self.copyByteArray(nextKeyDataBy);
                        nextKeyDataBy.clear();
                    }
                    keyDataBy.position = keyPosition;
                    keyData = keyDataBy.readByte();
                    keyData = (keyData + lastSrcData) ^ i;
                }
                else {
                    keyData = key.readByte();
                    keyData = (keyData + lastSrcData) ^ i;
                    keyDataBy.writeByte(keyData);
                }
                srcData = src.readByte();
                tempResultData = ((srcData - lastSrcData) ^ keyData);
                result.writeByte(tempResultData);
                lastSrcData = srcData;
            }
            else {
                srcData = src.readByte();
                keyData = key.readByte();
                tempResultData = (srcData ^ keyData);
                result.writeByte(tempResultData);
                keyDataBy.writeByte(keyData);
                lastSrcData = srcData;
            }
        }
        return result;
    };
    ByteSocket.prototype.copyByteArray = function (src) {
        var self = this;
        var result = new egret.ByteArray();
        src.position = 0;
        for (var i = 0; i < src.length; i++) {
            result.writeByte(src.readByte());
        }
        return result;
    };
    ByteSocket.prototype.onGetSocketData = function () {
        var self = this;
        if (self._m_PackageQueue.length > 0) {
            var handlerCount = 0;
            while (handlerCount < SocketConfig.HANDLER_MAX) {
                if (self._m_PackageQueue.length <= 0) {
                    return;
                }
                handlerCount++;
                var pkg = self._m_PackageQueue.shift();
                self.dispatchEventWith(SocketEvents.SOCKET_DATA, false, pkg);
            }
        }
    };
    ByteSocket.prototype.close = function () {
        var self = this;
        if (self._socket.connected) {
            self._socket.close();
        }
        self._socket = null;
    };
    Object.defineProperty(ByteSocket.prototype, "connected", {
        get: function () {
            var self = this;
            return self._socket.connected;
        },
        enumerable: true,
        configurable: true
    });
    return ByteSocket;
}(egret.EventDispatcher));
__reflect(ByteSocket.prototype, "ByteSocket");
