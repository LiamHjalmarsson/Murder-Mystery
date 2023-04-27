import { PubSub } from "../utilities/pubsub.js";

export default {}

;(() => {
    PubSub.subscribe({
        event: "render_guess_murder",
        listener: render_guess_murder
    });
})();

function render_guess_murder () {
    console.log("helo");
}