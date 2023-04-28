import { PubSub } from "/src/utilities/pubsub.js";
import { checkLoginStatus } from "./utilities/functions/firebase_functions";

let check = await checkLoginStatus();

if (check) {
    PubSub.publish({
        event: "render_map",
        detail: {
            location: {
                lat: 55.608627,
                long: 13.005227
            }
        }
    });
} else {
    PubSub.publish({
        event: "render_startUp",
        detail: "login"
    });
}



