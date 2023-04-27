import { PubSub } from "../../utilities/pubsub.js";
import { createElement } from "../js/functions.js";

export default {}

;(() => {
    PubSub.subscribe({
        event: "render_component_bag_detail",
        listener: render_component_bag_detail
    });
})();

function render_component_bag_detail () {
    console.log("hello");
}