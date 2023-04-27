import { PubSub } from "../utilities/pubsub.js";

export default {}

;(() => {
    PubSub.subscribe({
        event: "render_clues",
        listener: render_clues
    });
})();

function render_clues () {
    console.log("helo");
}