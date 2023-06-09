import { PubSub } from "../../../utilities/pubsub.js";
import { createElement, fadeInElement, fadeOutElement } from "../../js/functions.js";

export default {}

;(() => {

    PubSub.subscribe({
        event: "render_bag_details_item",
        listener: render_bag_details_item
    });
    
})();

function render_bag_details_item (clue) {
    let app = document.querySelector("#app");

    let container = createElement("div", "containerPopUP", "containerItem");
    app.appendChild(container);

    fadeInElement(container);
    let containerWrapper = createElement("div", "", "containerWrapper");
    container.append(containerWrapper);

    containerWrapper.innerHTML = ` 
        <div id="bagNav">
            <div class="bagClose"> 
                <div class="close" id="containerItemClose"> 
                    <i class="fa-solid fa-xmark"></i> 
                </div>
            </div>
            <h3 class="bagHeader"> ${clue.clue} </h3>
        </div>
        <div id="itemInventory">  
            <div id="itemImgBox">
                <div class="imgClue" id="imgClue"></div>
            </div>
            <div id="itemInformation">
                <p>Ledtrådsnummer:${clue.clueId} </p>
                <p>Plats: ${clue.place} </p>
                <p> Mottagare: ${clue.mottagare} </p>
                <p> Mottagare: ${clue.sändare} </p>
            </div>
            <div id="itemDetailInfo">
            <p> Info: ${clue.Info} </p>  
        </div>
    `;

    document.querySelector("#imgClue").style.backgroundImage = `url(${clue.imageRef})`;

    document.querySelector("#containerItemClose").addEventListener("click", () => {
        fadeOutElement(container);
    });
}

