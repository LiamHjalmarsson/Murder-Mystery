import { PubSub } from "../../utilities/pubsub.js";
import { createElement } from "../js/functions.js";

export default {}

;(() => {
    PubSub.subscribe({
        event: "render_component_character_interaction",
        listener: render_component_character_interaction
    });
})();

function render_component_character_interaction () {
    console.log("helo");
}