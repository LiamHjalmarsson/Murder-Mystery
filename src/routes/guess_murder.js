import { getFromDB } from "../utilities/functions/firebase_functions.js";
import { PubSub } from "../utilities/pubsub.js";
import { createElement } from "../lib/js/functions.js";

export default {}

;(() => {
    PubSub.subscribe({
        event: "render_guess_murder",
        listener: render_guess_murder
    });
})();

async function render_guess_murder (response) {
 
    console.log(response);

}