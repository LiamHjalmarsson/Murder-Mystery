import { PubSub } from "../utilities/pubsub.js";

export default {}

;(() => {
    PubSub.subscribe({
        event: "render_charater_interaction",
        listener: render_charater_interaction
    });
})();

function render_charater_interaction () {
    console.log("helo");
}