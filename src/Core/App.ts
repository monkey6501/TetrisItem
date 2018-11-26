class App {


	/** 统一的计时器和帧刷管理类 */
	public static get TimerManager(): TimerManager {
		return TimerManager.Instance();
	}
}