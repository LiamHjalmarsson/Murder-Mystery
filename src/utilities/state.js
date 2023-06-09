import { PubSub } from "./subpub.js";

let State = {};

export default {
    get state() { return State },
};

// INIT
(() => {

    const subscriptions = [
        {
            events: "db::get::login::received",
            middleware: (response, params) => {
                State.courses = response.courses;
                State.user = response.user;
            },
        },
    ];

    subscriptions.forEach(sb => {
        let { events, middleware } = sb;

        if (!Array.isArray(events)) {
            events = [events];
        }

        events.forEach(event => {

            SubPub.subscribe({
                event,
                listener: ({ response, params }) => {

                    response = response?.payload?.data;
                    middleware && middleware(response, params);

                    const parsed_event = SubPub.parseEvent(event);
                    SubPub.publish({
                        event: parsed_event.type + "::" + parsed_event.name + "::" + parsed_event.action + "::done",
                        detail: { response, params }
                    });

                }
            });

        });

    });

})();