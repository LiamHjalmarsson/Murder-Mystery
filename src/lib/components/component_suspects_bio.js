import { PubSub } from "../../utilities/pubsub.js";
import { createElement } from "../js/functions.js";

export default {}

;(() => {
    PubSub.subscribe({
        event: "render_component_suspects_bio",
        listener: render_component_suspects_bio
    });
})();

function render_component_suspects_bio () {
    console.log("hello");
}