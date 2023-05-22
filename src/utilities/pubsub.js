const listeners = {};

const ignore_publish = ["problems"];

export const PubSub = {
    
	subscribe: function (data) {
		let {event, listener, events} = data;

		if (!events) {
			events = [event];
		}

		events.forEach( event => {

			if (listeners[event] === undefined) {
				listeners[event] = [listener];
			} else {
				listeners[event] = [...listeners[event], listener];
			}    
		});

	},

	publish: function (data) {
		let { event, detail } = data;

		const doLog = !ignore_publish.includes(event);

		if (doLog) {
			console.log( "Event Published: " + event, detail );
		}

		if (listeners[event] === undefined) {
			doLog && console.log(`Event (${event}) has no listeners`);
			return;
		}

		listeners[event].forEach((listener) => {
			listener(detail);
		});
	},

}
