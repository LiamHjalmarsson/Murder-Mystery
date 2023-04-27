import { PubSub } from "../../utilities/pubsub.js";
import { createElement } from "../js/functions.js";

export default {}

;(() => {
    PubSub.subscribe({
        event: "render_component_riddle_question",
        listener: render_component_riddle_question
    });
})();

function render_component_riddle_question () {
    console.log("hello");
}