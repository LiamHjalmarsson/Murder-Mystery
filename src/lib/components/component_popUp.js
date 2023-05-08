import { PubSub } from "../../utilities/pubsub.js";
import { createElement } from "../js/functions.js";
import { docUpdate, getDocByClue } from "../../utilities/functions/firebase_functions.js";

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

    displayInformation(response);
}

function displayInformation ( res ) { 
    let { params, response } = res;

    let box = createElement("form", "", "box");
    document.querySelector("#containerPopUp").appendChild(box);

    box.innerHTML = `
        <div class="navContainer">
            <div class="navClose"> 
                <div class="close" id="popUpClose"> </div>
            </div>
            <h3 class="headerPopUp"> </h3>
        </div>
        <div class="popUp">
        </div>
    `
    let header = document.querySelector(".headerPopUp"); 
    let message = document.querySelector(".popUp"); 


    document.querySelector("#popUpClose").addEventListener("click", () => {
        document.querySelector("#wrapperPopUp").remove();
    });

    switch(params) {
        case "error":
            header.textContent = "Error!";
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

                let puzzel = await getDocByClue(input.value); 

                if (puzzel.params) {
                    input.classList.add("error");
                } else {

                    input.classList.remove("error");

                    PubSub.publish({
                        event: "render_riddle",
                        detail: { 
                            response: {
                                data: response.data,
                                storys: response.storys,
                                puzzel: puzzel
                            }
                        }
                    }); 
                }
            });
        break;
    }

}