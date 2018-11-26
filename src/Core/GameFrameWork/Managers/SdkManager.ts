class SdkManager {
	public constructor() {
	}

	private static _instance: SdkManager;
	public static get getInstance(): SdkManager {
		if (!SdkManager._instance) {
			SdkManager._instance = new SdkManager();
		}
		return SdkManager._instance;
	}


	public hGameReport(action): void {
		let baseData: any = {
			"game_key": 'e54e9c90b2ccad16',   //游戏平台提供的game_key
			"open_id": PlayerInfoManager.getInstance.info.hgameInfo.open_id,	      //游戏平台提供的用户ID
			"role": PlayerInfoManager.getInstance.playerMsg.playerId.toString(),            //游戏角色的唯一ID
			"nickname": PlayerInfoManager.getInstance.playerMsg.nickName,    //游戏中角色的昵称，没有昵称的可以传
			"area": 'HOODINN',
			"group": '1'           //游戏服务器标志
		}
		let extendData: any;
		switch (action) {
			case "enterGame":
				extendData = {
					"level": PlayerInfoManager.getInstance.playerMsg.missionId, //整型，默认为0，当前等级
					"vipLevel": 0, //整型，默认为0，VIP等级
					"score": 0, //整型，默认为0，战力、综合评分等
					"isNew": LoginManager.getInstance.isNew, //替代创建角色接口，如果是创建角色后第一次登录为1，默认为0
				}
				break;
			case "levelUpgrade":
				extendData = {
					"level": PlayerInfoManager.getInstance.playerMsg.HighestMissionId
				}
				break;
			case "startGame":
				extendData = {
					"level": PlayerInfoManager.getInstance.playerMsg.missionId
				}
				break;
		}
		ext.gameReport(action, baseData, extendData);
	}

	public paySdk(id: number): void {
		if (GameConfig.IsIos()) {
			return MessageManger.getInstance.showText(LanguageManager.getInstance.getLanguageText("mondes.ioscharge.text"));
		}
		let vo: ChargeVO = GlobleData.getData(GlobleData.ChargeVO, id);
		switch (ext.getPlatform()) {
			case "hgame":
				let data: any = {
					"userName": PlayerInfoManager.getInstance.info.hgameInfo.open_id,
					"playerId": PlayerInfoManager.getInstance.playerMsg.playerId,
					"productId": id
				}
				ext.hgamePay(data);
				break;
			case "wx":
				let url = LoginManager.getInstance.getRequestUrl(LoginManager.getInstance.showServer.ssl, LoginManager.getInstance.showServer.host, LoginManager.getInstance.showServer.httpPort, "100/6");
				ext.payment(vo.price * 10, vo.productId, PlayerInfoManager.getInstance.userName, PlayerInfoManager.getInstance.sessionKey, PlayerInfoManager.getInstance.playerId, url);
				break;
			case "wanba":
				let exchangeData: any = {
					playerId: PlayerInfoManager.getInstance.playerId,
					price: vo.price * 10
				}
				if (ext.getIsIos()) {
					exchangeData.productId = vo.iosItemId;
				} else {
					exchangeData.productId = vo.androidItemId;
				}
				ext.exchangeProduct(exchangeData, this.payFail);
				break;
			default:
				SocketManager.getInstance.out.sendSimulationCharge(Number(id));
				break;
		}
	}

	private payFail(): void {
		MessageManger.getInstance.showText(LanguageManager.getInstance.getLanguageText("models.sdkManager.payFail"));
	}

	/**不用这个，用下面那个通用的分享接口 */
	public hGameShare(shareId, callBack, extendData: any = null) {
		let shareVo: ShareVO = ActivityManager.getInstance.getShareTypeList(shareId)[0];
		switch (ext.getPlatform()) {
			case "hgame":
				let shareData: any = {
					open_id: PlayerInfoManager.getInstance.info.hgameInfo.open_id,
					game_key: "e54e9c90b2ccad16",
					timestamp: new Date().valueOf(),
					title: "进击的战神", //默认为游戏名称
					message: shareVo.desc,
					shareKey: PlayerInfoManager.getInstance.playerId + "," + shareId,
					imgUrl: "https://quanwang.7road.net/httpsClickHeroes/resource/Common/share/" + shareVo.icon + ".jpg", //默认为当前游戏的icon
					extend: extendData  //option, 这里是额外的参数，接入各平台不同
				}
				ext.hgameShare(shareData, callBack);
				break;
		}
	}

	public totalShare(shareId, sucCallBack, failCallBack = null) {
		let shareVo: ShareVO = ActivityManager.getInstance.getShareTypeList(shareId)[0];
		let str: string;
		if (shareId == 101) {
			str = LanguageManager.getInstance.languageReplace(shareVo.desc, [PlayerInfoManager.getInstance.playerMsg.HighestMissionId]);
		} else {
			str = shareVo.desc;
		}
		switch (ext.getPlatform()) {
			case "hgame":
				let shareData: any = {
					open_id: PlayerInfoManager.getInstance.info.hgameInfo.open_id,
					game_key: "e54e9c90b2ccad16",
					timestamp: new Date().valueOf(),
					title: "进击的战神", //默认为游戏名称
					message: str,
					shareKey: PlayerInfoManager.getInstance.playerId + "," + shareId,
					imgUrl: "https://quanwang.7road.net/httpsClickHeroes/resource/Common/share/" + shareVo.icon + ".jpg", //默认为当前游戏的icon
					extend: {}  //option, 这里是额外的参数，接入各平台不同
				}
				ext.hgameShare(shareData, sucCallBack);
				break;
			case "wx":
				let shareWXData: any = {
					title: shareVo != null ? str : "分享", //默认为游戏名称
					shareKey: PlayerInfoManager.getInstance.playerId + "," + shareId,
					imgUrl: PathManager.Instance.Share.replace("{0}", shareVo.icon),
				}
				SdkManager.getInstance.wxHysdkReport(4);
				ext.shareMessage(shareWXData, sucCallBack);
				break;
			case "wanba":
				let shareWanbaData: any = {
					title: "小兵快跑", //默认为游戏名称
					desc: str,
					shareKey: PlayerInfoManager.getInstance.playerId + "," + shareId,
					image_url: PathManager.Instance.Share.replace("{0}", shareVo.icon)
				}
				ext.shareMessage(shareWanbaData, sucCallBack);
				// SdkManager.getInstance.wxHysdkReport(4);
				break;
			case "dev":
				sucCallBack();
				break;
			default:
				break;
		}
	}

	public getFriendList(data: any, callBack): void {
		switch (ext.getPlatform()) {
			case "hgame":
				ext.getFriendList(callBack);
				break;
			case "wx":
				ext.sendOpenDataContext("open", "friend");
				// let friendDataList: any;
				// if (openContext["canvas"]["userDataList"]) {
				// 	friendDataList = JSON.parse(openContext["canvas"]["userDataList"]);
				// }
				// callBack(friendDataList);
				this.createRank();
				break;
			case "dev":
				let list: protocol.IRankUserMsg[] = [];
				SocketManager.getInstance.out.sendFriendList(list, 2);
				break;
			case "wanba":
				SocketManager.getInstance.out.sendRequestFriendList();
				break;
			default:
				break;
		}
	}

	private createRank(): void {
		let self = this;
		ScenesManager.getInstance.openView(UIUtil.createPanel(ViewClassName.WXRankView), LayerManager.GAME_UI_LAYER);
	}

	public getSystemInfo(): void {
		let self = this;
		switch (ext.getPlatform()) {
			case "wanba":
				ext.getSystemInfo((result) => {
					SocketManager.getInstance.out.sendPhoneModel(result);
				});
				break;
			case "wx":
				ext.getSystemInfo((result) => {
					GameConfig.systemInfo = result;
					SocketManager.getInstance.out.sendPhoneModel(result ? result.model : "test");
				});
				break;
		}
	}

	private reportMissison: number = 0;
	private reportRebirthNum: number = 0;
	/**上报信息 */
	public setUserCloudStorage(action: string): void {
		let self = this;
		let sendData: number = 0;
		switch (ext.getPlatform()) {
			case "hgame":
			case "wx":
				// switch (action) {
				// 	case "missionMaxNum":
				// 		self.reportMissison = PlayerInfoManager.getInstance.playerMsg.HighestMissionId;
				// 		break;
				// 	case "rebirthNum":
				// 		self.reportRebirthNum = PlayerInfoManager.getInstance.info.reviveBySkillCount;
				// 		break;
				// }
				self.reportMissison = PlayerInfoManager.getInstance.playerMsg.HighestMissionId;
				self.reportRebirthNum = PlayerInfoManager.getInstance.info.reviveBySkillCount;
				sendData = self.reportMissison * 1000 + self.reportRebirthNum
				ext.setUserCloudStorage(sendData);
				break;
			case "wanba":
				break;
			case "dev":
				break;
			default:
				break;
		}
	}

	/** 观看广告 */
	public ShowVideoAd(adId: string, callBack: Function): void {
		switch (ext.getPlatform()) {
			case "hgame":
				ext.hgameShowVideoAd().then((res) => {
					if (res.isEnd) {
						callBack();
					} else {
						MessageManger.getInstance.showText(LanguageManager.getInstance.getLanguageText("models.adv.txt"));
					}
				}).catch(() => {
					callBack();
				})
				// (res) => {
				// 	console.log("aaaaaaaaaa :" + adId)
				// 	if (res.isEnd) {
				// 		callBack()
				// 	}
				// }
				break;
			case "wx":
				ext.createRewardedVideoAd(adId, callBack, () => { MessageManger.getInstance.showText(LanguageManager.getInstance.getLanguageText("models.adv.fail")) });
				break;
			case "wanba":
				ext.ShowVideoAd(callBack);
				break;
			case "dev":
				break;
			default:
				break;
		}
	}

	/**生成桌面快捷方式图标 */
	public addShortcut(callBack): void {
		switch (ext.getPlatform()) {
			case "hgame":
				break;
			case "wx":
				break;
			case "wanba":
				ext.addShortcut(callBack);
				break;
			case "dev":
				break;
			default:
				break;
		}
	}

	/** 辉耀SDK上报接口 */
	public wxHysdkReport(type: number): void {
		ext.hysdkReport(type);
	}
}