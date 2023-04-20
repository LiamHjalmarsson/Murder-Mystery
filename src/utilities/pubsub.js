const listeners = {};

export const PubSub = {
    
	parseEvent: function (event) {

			const separator = "::";
			const parsed = {};
			const keys = ["type", "name", "action", "phase", "wait"];

			let i = 0;
			while (event.length > 0) {
				let index = event.indexOf(separator);
				if (index === -1) index = 100;
				parsed[keys[i++]] = event.substring(0, index);
				event = event.substring(index + separator.length);
			}
			
			return parsed;
	},

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

			listeners[event].forEach((listener) => {
				listener(detail);
			});
	},

}
