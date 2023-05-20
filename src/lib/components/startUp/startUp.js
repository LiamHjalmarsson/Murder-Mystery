import { PubSub } from "../../../utilities/pubsub.js";
import { createElement } from "../../js/functions.js";

export default {}

;(() => {

    PubSub.subscribe({
        event: "render_startUp",
        listener: render_startUp
    });

})();

function render_startUp ( params ) {
    let app = document.querySelector("#app");
    app.innerHTML = "";

    let formContainer = createElement("div", "", "startUpContainer");
    app.append(formContainer);
    
    let gameTitle = createElement("h2", "gameTitle");
    gameTitle.textContent = "Dådet på kungens hörna";

    formContainer.append(gameTitle);

    PubSub.publish({
        event: "render_startUp_form",
        detail: params
    });
}