import { PubSub } from "../../../utilities/pubsub.js";
import { createElement } from "../../js/functions.js";

export default {}

;(() => {

    PubSub.subscribe({
        event: "render_component_bag_detail",
        listener: render_component_bag_detail
    });
    
})();

function render_component_bag_detail ( { response } ) {
    let { clue } = response;

    console.log(response);
    console.log(clue);
    let app = document.querySelector("#app");

    let container = createElement("div", "containerPopUP", "containerItem");
    app.appendChild(container);

    let containerWrapper = createElement("div", "", "containerWrapper");
    container.append(containerWrapper);

    containerWrapper.innerHTML = ` 
        <div id="bagNav">
            <div class="bagClose"> 
                <div class="close" id="containerItemClose"> </div>
            </div>
            <h3 class="bagHeader"> ${clue.clue} </h3>
        </div>
        <div id="itemInventory">  
            <div id="itemImgBox">
                <div class="imgClue" id="imgClue"></div>
            </div>
            <div id="itemInformation">
                <p> ${clue.information} </p>
            </div>
        </div>
    `;

    document.querySelector("#imgClue").style.backgroundImage = `url(../../src/lib/icons/${clue.imageRef}.png)`;

    document.querySelector("#containerItemClose").addEventListener("click", () => {
        container.remove();
    });
}

