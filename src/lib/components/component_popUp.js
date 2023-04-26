import { PubSub } from "../../utilities/pubsub.js";
import { createElement } from "../js/functions.js";
import { logoutPlayer } from "../../utilities/functions/firebase_auth.js";

export default {}

;(() => {
    PubSub.subscribe({
        event: "render::component_PopUp",
        listener: render
    });
})();

function render (data) {

    let app = document.querySelector("#app");

    let wrapperPopUp = createElement("div", "", "wrapperPopUp");
    app.appendChild(wrapperPopUp);

    let containerPopUp = createElement("div", "", "containerPopUp"); 

    wrapperPopUp.append(containerPopUp);

    let close = createElement("div", "", "close");
    close.addEventListener("click", () => {
        wrapperPopUp.remove();
    });

    containerPopUp.append(close);

    containerPopUp.append(displayInformation(data));
}

function displayInformation ( data ) { 
    let box = createElement("div", "", "box");
    let header = createElement("div", "smallheader", ""); 
    let message = createElement("div", "popUp", ""); 

    if (data.error) {
        header.textContent = "Error";
        message.textContent = data.error; 
    }

    if (data.message) { 

    }

    box.append(header, message);
    return box;
}

