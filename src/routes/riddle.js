import { PubSub } from "../utilities/pubsub.js";

export default {}

;(() => {
    PubSub.subscribe({
        event: "render_riddle",
        listener: render_riddle
    });
})();

function render_riddle () {
    console.log("helo");
}