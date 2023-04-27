import { PubSub } from "../utilities/pubsub.js";

export default {}

;(() => {
    PubSub.subscribe({
        event: "render_guess_weaponMotive",
        listener: render_guess_weaponMotive
    });
})();

function render_guess_weaponMotive () {
    console.log("helo");
}