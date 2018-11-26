class EventsManager extends egret.EventDispatcher {
	public constructor() {
		super();
	}


	private static _instance: EventsManager;
	public static get getInstance(): EventsManager {
		if (!EventsManager._instance) {
			EventsManager._instance = new EventsManager();
		}
		return EventsManager._instance;
	}
}