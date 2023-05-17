import { PubSub } from "../../../utilities/pubsub.js";
import { createElement } from "../../js/functions.js";

export default {}

;(() => {

    PubSub.subscribe({
        event: "render_startUp_btns",
        listener: render_startUp_btns
    });
    
})();

function render_startUp_btns (params) {
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