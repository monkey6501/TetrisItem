class SocketManager extends egret.EventDispatcher {
	private _hasInitEvents: boolean = false;
	private _out: GameSocketOut;
	private _socket: ByteSocket;

	public constructor() {
		super();
	}

	public setup(ip, port): void {
		let self = this;
		self._socket = new ByteSocket(false);
		self._socket.connect(ip, port);
		self._out = new GameSocketOut(self);
		self.initEvents();
	}

	public reConnect(ip, port): void {
		let self = this;
		self._socket.connect(ip, port);
	}

	private initEvents(): void {
		let self = this;
		if (self._hasInitEvents) {
			return;
		}
		self.addEventListener(SocketEvents.SOCKET_CONNECT, self.onConnectHandler, self);
		self._socket.addEventListener(SocketEvents.SOCKET_ERROR, self.onErrorHandler, self);
		self._socket.addEventListener(SocketEvents.SOCKET_CLOSE, self.onSocketCloseHandler, self);
		self._socket.addEventListener(SocketEvents.SOCKET_DATA, self.onSocketDataHandler, self);
		self._hasInitEvents = true;
	}

	public removeEvents(): void {
		let self = this;
		self._hasInitEvents = false;
		self.removeEventListener(SocketEvents.SOCKET_CONNECT, self.onConnectHandler, self);
		self._socket.removeEventListener(SocketEvents.SOCKET_ERROR, self.onErrorHandler, self);
		self._socket.removeEventListener(SocketEvents.SOCKET_CLOSE, self.onSocketCloseHandler, self);
		self._socket.removeEventListener(SocketEvents.SOCKET_DATA, self.onSocketDataHandler, self);
	}

	/** 服务器连接成功 */
	public onConnectHandler(evt: egret.Event): void {
		let self = this;
		LogManager.logFormat("连接服务器成功");
		self.removeEventListener(SocketEvents.SOCKET_CONNECT, self.onConnectHandler, self);
		this.dispatchEventWith(SocketEvents.SOCKET_CONNECT);
	}
	/** 接受到的服务器数据 */
	private onSocketDataHandler(evt: egret.Event): void {
		let self = this;
		var pkg: PackageIn = evt.data as PackageIn;
		if (pkg != null) {
			// LogManager.logFormat("收到的数据协议号" + pkg.code);
			let code: number = pkg.code;
			let by: egret.ByteArray = pkg.readBody();
			self.dispatchEventWith(SocketEvents.format(code), false, by.bytes);
		}
	}
	/** Socket连接关闭 */
	private onSocketCloseHandler(): void {
		LogManager.logFormat("服务器没有连接上");
		SocketManager.getInstance.close();
	}
	/** Socket连接错误 */
	private onErrorHandler(evt: egret.Event): void {
		SocketManager.getInstance.close();
	}
	/** 关闭Socket连接 */
	public close(): void {
		let self = this;
		if (self._socket != null) {
			self._socket.close();
			ScenesManager.getInstance.openView(UIUtil.createAlert(ViewClassName.BrokenLineAlert), LayerManager.SCENE_POP_LAYER);
		}
	}

	public get socket() {
		let self = this;
		return self._socket;
	}

	public get out(): GameSocketOut {
		let self = this;
		return self._out;
	}

	private static _instance: SocketManager;
	public static get getInstance(): SocketManager {
		if (SocketManager._instance == null) {
			SocketManager._instance = new SocketManager();
		}
		return SocketManager._instance;
	}
}