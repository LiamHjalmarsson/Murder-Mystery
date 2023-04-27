import { PubSub } from "/src/utilities/pubsub.js";

PubSub.publish({
    event: "render_startUp",
    detail: "login"
});

