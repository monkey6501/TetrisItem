/** 
 * 登陆管理类
 */
class LoginManager {

	public constructor() {
	}

	private gameId: any;
	public setup(): void {
		let self = this;
	}

	private static _instance: LoginManager;
	public static get getInstance(): LoginManager {
		if (LoginManager._instance == null) {
			LoginManager._instance = new LoginManager();
		}
		return LoginManager._instance;
	}
}