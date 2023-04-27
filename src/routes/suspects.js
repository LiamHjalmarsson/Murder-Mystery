import { PubSub } from "../utilities/pubsub.js";

export default {}

;(() => {
    PubSub.subscribe({
        event: "render_suspects",
        listener: render_suspects
    });
})();

function render_suspects () {
    console.log("helo");
}