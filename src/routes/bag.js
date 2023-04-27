import { PubSub } from "../utilities/pubsub.js";

export default {}

;(() => {
    PubSub.subscribe({
        event: "render_bag",
        listener: render_bag
    });
})();

function render_bag () {
    console.log("helo");
}