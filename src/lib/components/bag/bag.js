import { PubSub } from "../../../utilities/pubsub.js";
import { createElement, fadeInElement, fadeOutElement } from "../../js/functions.js";
import { getFromDB } from "../../../utilities/functions/firebase_functions.js";

export default {}

;(() => {

    PubSub.subscribe({
        event: "render_bag",
        listener: render_bag
    });

})();

async function render_bag ( data ) {
    let app = document.querySelector("#app");
    let cluesDb = await getFromDB("clues");

    let containerBag = createElement("div", "containerPopUP", "containerBag");
    app.appendChild(containerBag);

    let containerWrapper = createElement("div", "", "containerWrapper");
    containerBag.append(containerWrapper);

    containerWrapper.innerHTML = ` 
        <div id="bagNav">
            <div class="bagClose"> 
                <div class="close" id="containerBagClose"> 
                    <i class="fa-solid fa-xmark"></i>
                </div>
            </div>
            <h2 class="bagHeader"> Väska </h2>
        </div>
        <div id="containerInventory">  
        </div>
    `;

    document.querySelector("#containerBagClose").addEventListener("click", () => {
        if (document.querySelector("#app > #wrapperPopUp")) {
            document.querySelector("#app > #wrapperPopUp").remove();
        }
        fadeOutElement(containerBag);
    });

    fadeInElement(containerBag);

    PubSub.publish({
        event: "render_bag_details", 
        detail: {
            response: {
                data: data,
                clues: cluesDb
            }
        }
    });
}