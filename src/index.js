import { PubSub } from "/src/utilities/pubsub.js";

PubSub.publish({
    event: "render::startUp",
    detail: "login"
});

