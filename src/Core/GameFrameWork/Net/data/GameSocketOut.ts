class GameSocketOut {

	private _socketMgr: SocketManager;
	public constructor(socket: SocketManager) {
		let self = this;
		self._socketMgr = socket;
	}
	/** 发送登陆请求 */
	// public sendServerLogin(headUrl: string = "", nickName: string = "", shareKey: string = ""): void {
	// 	let self = this;
	// 	let packageOut: PackageOut = new PackageOut();
	// 	packageOut.init(PackageOutTypeVo.LOGIN);
	// 	let msg: protocol.CommonMsg = new protocol.CommonMsg();
	// 	msg.intPar1 = PlayerInfoManager.getInstance.playerId;
	// 	msg.intPar2 = PlayerInfoManager.getInstance.wxScene;
	// 	msg.strPar1 = nickName;
	// 	msg.strPar2 = headUrl;
	// 	msg.strPar3 = shareKey;
	// 	let data = protocol.CommonMsg.encode(msg).finish();
	// 	self._socketMgr.socket.sendProtobuffer(packageOut, data);
	// }
}