
declare class ext {
    static loadingHide(): void;
    static getRelease(): boolean;
    static getHttpHead(): string;
    static getIsIos(): boolean;
    static getPlatform(): string;
    static getIsShowAdv(): boolean;
    static getIsSelectHead(): boolean;
    static getIsEditNickName(): boolean;
    static getIsSkipLogoPage(): boolean;
    static getIsServerList(): boolean;
    static getIsLog(): boolean;
    static beginFBGameSence(): Promise<any>;
    static showFacebookAd(type: number, placementId: string, fromId: number, missioinId: number, param: string): Promise<any>;
    static preloadingFBAdv(placementId: string): Promise<any>;
    static JsFBGetFriends();
    static JsWan83ShareUrl();
    static JsWan83CreateRole();
    static JsWan83Follow();
    static JsWan83GetFriends(callback);
    static JsWan83Init(parameters, callback);
    static JsPayWan83(json, callback);
    static JsWan83Share(parameters, callback);
    static JsWan83IsShare();
    static addFavorites(Params, callback);
    static getCenterUrl(): string;
    static getServerListUrl(): string;
    static getResourceUrl(): string;
    static getGamePre(): string;
    static getrankUrl(): string;
    static getPlayerId(): string;
    static getParameters(): Object;
    static jsPopPayTips(score: number): void;
    static newRequest(url, callback, cache);
    static prepareEnterPlatForm();
    static queryProducts(): Promise<any>;
    static pay(goodsId, areaId, playerId): Promise<any>;
    static getGoodsList(): any;
    static bindModal();
    static payOnReady();
    static createAsyncData(friendId, playerId);
    static shareAsync(data, callback);
    static setCenterUrl(url);

    static sendRequestJson(url, callback, self);
    static getLocation(callback, self);
    static getUserInfo(callback, self);
    static connectSocket(url, callback, self);
    static getUnionId(url, unionData, callback, self)
    static onSocketOpen(callback, self);
    static onSocketMessage(callback, self);
    static sendSocketMessage(data);
    static onNavigateBackMiniProgram();
    static getLogin(callback, self);
    static shareMessage(shareData, callback);
    static payment(buyQuantity, productId, userName, sessionKey, playerId, url);

    static initHgameSdk(callback, self);
    static getPlatformInfo(callback, self);
    static hgameLogin(callback);
    static hgamePay(data);
    static gameReport(action, baseData, extendData);
    static hgameShare(data, callback);
    static hgameShowVideoAd();
    static loadServerConfig(callback);
    static doExtraAction(type, data, callback);
    static getFriendList(callback);
    static getIsAD(): boolean;
    static setUserCloudStorage(data)
    static getLaunchOptionsSync(): any;
    static getSystemInfo(callback);
    static exitMiniProgram();
    static hysdkReport(type);
    static onShow(callback);
    static onHide(callback);
    static showShareMenu();
    static onShareAppMessage();
    static sendOpenDataContext(command, type);
    static getOpenDataContext(): any;
    static setClipboardData(value, callback);
    static showLoading()
    static hideLoading();
    static startWanBaSdk(callback);
    static wanbaPay(data);
    static exchangeProduct(data, failBack);
    static ShowVideoAd(callback);
    static triggerGC();
    static setKeepScreenOn();
    static clearStorage(callback);
    static reConnect();
    static createRewardedVideoAd(adId, callback, failBack);
    static addShortcut(callback);
    /////////////////////////////////////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////////////////////////////////////////
}
