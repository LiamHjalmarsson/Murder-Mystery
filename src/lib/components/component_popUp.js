import { PubSub } from "../../utilities/pubsub.js";
import { createElement } from "../js/functions.js";
import { getClueDoc } from "../../utilities/functions/firebase_functions.js";

export default {}

;(() => {

    PubSub.subscribe({
        event: "render_component_popup",
        listener: render_component_popup
    });

})();

function render_component_popup ( response ) {
    let app = document.querySelector("#app");

    let wrapperPopUp = createElement("div", "", "wrapperPopUp");
    app.appendChild(wrapperPopUp);

    let containerPopUp = createElement("div", "", "containerPopUp"); 

    wrapperPopUp.append(containerPopUp);

    let close = createElement("div", "class");
    close.addEventListener("click", () => {
        wrapperPopUp.remove();
    });

    containerPopUp.append(close);
    containerPopUp.append(displayInformation(response));
}

function displayInformation ( res ) { 
    let { params, response } = res;

    let box = createElement("form", "", "box");
    let header = createElement("div", "smallheader", ""); 
    let message = createElement("div", "popUp", ""); 

    box.append(header, message);

    switch(params) {
        case "error":
            header.textContent = "Error";
            message.textContent = response.error; 
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
            input.placeholder  = "Enter the clue!";
            
            let button = createElement("button", "", ""); 
            button.textContent = "Submit your answer";

            message.append(input);
            box.append(button);

            box.addEventListener("submit", async (e) => {
                e.preventDefault();
                let clueResponse = await getClueDoc(input.value); // hämtar clue gör lite kontroll om det är rätt 

                if (clueResponse.params) {
                    input.classList.add("error");
                } else {

                    input.classList.remove("error");

                    PubSub.publish({
                        event: "render_riddle",
                        detail: { 
                            response: {
                                data: response.data,
                                storys: response.storys,
                                clue: clueResponse
                            }
                        }
                    }); 
                }
            });
        break;
    }
    return box;
}