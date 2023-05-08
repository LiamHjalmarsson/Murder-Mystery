
import { PubSub } from "../utilities/pubsub.js";
import { createElement } from "../lib/js/functions.js";
import { formLogReg, btnsForm, addUser } from "../lib/components/component_startUp.js";
import { getUserDoc, getFromDB } from "../utilities/functions/firebase_functions.js";

export default {}

;(() => {

    PubSub.subscribe({
        event: "render_startUp",
        listener: render_startUp
    });

})();

async function render_startUp ( params ) {
    let app = document.querySelector("#app");
    app.innerHTML = "";

    let formContainer = createElement("div", "", "startUpContainer");
    app.append(formContainer);
    
    let gameTitle = createElement("h2", "gameTitle");
    gameTitle.textContent = "Dåd på kungens hörna";

    formContainer.append(gameTitle);

    PubSub.publish({
        event: "render_component_startUp_form",
        detail: params
    });
}
