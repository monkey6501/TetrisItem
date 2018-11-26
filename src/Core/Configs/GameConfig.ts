class GameConfig {
	/** 版本语言 */
	public static Language: string = "CN";
	/** 版本号 */
	public static Version: string = "20180414";
	public static IsMobile: boolean;
	public static PlatformName: string;
	public static PlayerId: string;
	public static HttpHead: string;
	public static Token: string;
	public static AreaId: number;
	public static IsOnLine: boolean = navigator.onLine;
	/** 是否测试 */
	public static IsDebug: boolean = false;

	//获得浏览器类型 pc android ios -- 可扩展为其他 如 微信、qqzone、qq、微博、校内、facebook
	public static systemType(): string {
		var ua = window.navigator.userAgent.toLowerCase();
		var microStr = "" + ua.match(/MicroMessenger/i);
		if (("" + ua.match(/windows nt/i)) == "windows nt") {
			return "windows";
		} else if (("" + ua.match(/iphone/i)) == "iphone") {
			return "ios";
		} else if (("" + ua.match(/android/i)) == "android") {
			return "android";
		} else if (("" + ua.match(/ipad/i)) == "ipad") {
			return "ipad";
		} else if (("" + ua.match(/linux/i)) == "linux") {
			return "linux";
		} else if (("" + ua.match(/mac/i)) == "mac") {
			return "mac";
		} else if (("" + ua.match(/ucbrower/i)) == "ucbrower") {
			return "ucbrower";
		} else {
			LogManager.logFormat("未知系统类型");
		}
	}
	//获得平台类型 如 微信、qqzone、qq、微博、校内、facebook
	public static platformType(): string {
		var ua = window.navigator.userAgent.toLowerCase();
		if (("" + ua.match(/micromessenger/i)) == "micromessenger") {
			return "micromessenger";
		} else if (("" + ua.match(/qzone/i)) == "qzone") {
			return "qzone";
		} else if (("" + ua.match(/weibo/i)) == "weibo") {
			return "weibo";
		} else if (("" + ua.match(/qq/i)) == "qq") {
			return "qq";
		} else if (("" + ua.match(/renren/i)) == "renren") {
			return "renren";
		} else if (("" + ua.match(/txmicroblog/i)) == "txmicroblog") {
			return "txmicroblog";
		} else if (("" + ua.match(/douban/i)) == "douban") {
			return "douban";
		} else {
			return "other";
		}
	}

	public static systemInfo: any;

	public static IsIos(): boolean {
		return ext.getPlatform() == "wx" && String(GameConfig.systemInfo.model).indexOf("iPhone") != -1;
	}

	public static IsIphoneX(): boolean {
		return ext.getPlatform() == "wx" && (String(GameConfig.systemInfo.model).indexOf("iPhone X") != -1
			|| String(GameConfig.systemInfo.model).indexOf("LLD-AL20") != -1
			|| String(GameConfig.systemInfo.model).indexOf("iPhone11") != -1);
	}

	public static IsWX(): boolean {
		return ext.getPlatform() == "wx";
	}
}
