const listeners = {}; // innehåller alla functioner från subsrcibe 

const ignore_publish = ["problems"];

export const PubSub = {
    
	subscribe: function (data) {
		// samma som data.event data.listner, data.events
		let {event, listener, events} = data;

		if (!events) {
			// gör events lika med en array av strängen
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

		// Vi får här den listner som matchar eventet text render_startUp och loppar om det finns flera listners / funktioner 
		// console.log(listeners[event]);
		listeners[event].forEach((listener) => {
			console.log(listener, detail);
			listener(detail); // detta är varje funktion med detail som en parameter / kan vara en sträng eller data av olika typer 
		});
	},

}
