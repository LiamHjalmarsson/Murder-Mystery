import { PubSub } from "../../../utilities/pubsub.js";
import { createElement } from "../../js/functions.js";
import { getFromDB, addDocAddData } from "../../../utilities/functions/firebase_functions.js";

export default {}

;(() => {

    PubSub.subscribe({
        event: "render_component_startUp_btns",
        listener: component_startUp_btns
    });
    
})();

function component_startUp_btns (params) {

    let btnContainer = createElement("div", "", "btnContainer");
    let btnDeatils = ["register", "login"];

    btnDeatils.forEach(btn => {
        let button = createElement("button", `playGame`);
        button.textContent = btn;
        btnContainer.append(button);

        if (button.textContent === params) {
            button.classList.add("active");
        }

        if (!button.classList.contains("active")) {
            button.addEventListener("click", () => {
                PubSub.publish({
                    event: "render_startUp",
                    detail: button.textContent
                });
            });
        }
    });
    document.querySelector("#formStartUp").appendChild(btnContainer);
}
