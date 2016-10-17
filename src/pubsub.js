const eventStore = {};

export default class Events {
    static on(eventName, handler) {
        eventStore[eventName] = eventStore[eventName] || [];
        eventStore[eventName].push(handler);
		return this;
    }

    static trigger(eventName, data) {
        if (eventStore[eventName]) {
            for (let handler of eventStore[eventName]) {
                handler(data);
            }
        }
    }
}