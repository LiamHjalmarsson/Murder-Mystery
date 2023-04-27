import { PubSub } from "../utilities/pubsub.js";

export default {}

;(() => {

    PubSub.subscribe({
        event: "render_start_endLetter",
        listener: render_start_endLetter
    });

})();

function render_start_endLetter () {
    console.log("helo");
}