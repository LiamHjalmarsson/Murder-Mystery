import { PubSub } from "../../utilities/pubsub.js";
import { createElement } from "../js/functions.js";

export default {}

;(() => {
    PubSub.subscribe({
        event: "render_component_popup",
        listener: render_component_popup
    });
})();

function render_component_popup (data) {

    console.log("data");
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

    box.append(header, message);

    console.log(data.response);

    switch(data.response) {
        case "error":
            header.textContent = "Error";
            message.textContent = data.error; 
        break;

        case "wrong":
            header.textContent = "Ajdå!";

        break;

        case "success":
            header.textContent = "Grattis";

        break;

        default:
            header.textContent = "Skriv in kod";
            let input = createElement("input", "popUp_input", ""); 
            message.append(input);
        break;
    }

    return box;
}

