import { PubSub } from "/src/utilities/pubsub.js";
import { checkLoginStatus } from "./utilities/functions/firebase_functions";

let check = await checkLoginStatus();

if (check) {

    PubSub.publish({
        event: "render_counDown"
    });

    PubSub.publish({
        event: "render_map",
        detail: {
            response: {
                data: check.data
            }
        }
    });

} else {

    PubSub.publish({
        event: "render_startUp",
        detail: "login"
    });
    
}



