import { PubSub } from "./pubsub.js";

export default {}

;(() => {

    function on_response({ response, parsed_event, params }) {
        PubSub.publish({
            event: parsed_event.type + "::" + parsed_event.name + "::" + parsed_event.action + "::received",
            detail: { response, params },
        });
    }

    const events = [

    ];

    events.forEach(event => {

        const parsed_event = PubSub.parseEvent(event);
        const action = parsed_event.action;

        PubSub.subscribe({
            event,
            listener: detail => {

                let { params } = detail;

                if (action !== "login") {
                    params = {
                        ...params,
                    };
                }


                switch (parsed_event.name) {
                    case "get":

                    if (parsed_event.wait === "no_wait") {
                        _get({ action, params });
                        on_response({ response: null, parsed_event, params });
                    } else {
                        _get({ action, params })
                        .then(response => on_response({ response, parsed_event, params }));
                    }

                    break;

                    case "post":

                    if (parsed_event.wait === "no_wait") {
                        _post({ body: { action, params } });
                        on_response({ response: null, parsed_event, params });
                    } else {
                        _post({ body: { action, params } })
                        .then(response => on_response({ response, parsed_event, params }));
                    }

                    break;

                    case "delete":

                    if (parsed_event.wait === "no_wait") {
                        _delete({ body: { action, params } });
                        on_response({ response: null, parsed_event, params });
                    } else {
                        _delete({ body: { action, params } })
                        .then(response => on_response({ response, parsed_event, params }));
                    }

                    break;

                    case "patch":

                    if (parsed_event.wait === "no_wait") {
                        _patch({ body: { action, params } });
                        on_response({ response: null, parsed_event, params });
                    } else {
                        _patch({ body: { action, params } })
                        .then(response => on_response({ response, parsed_event, params }));
                    }

                    break;

                }
            }
        });
    });

})()