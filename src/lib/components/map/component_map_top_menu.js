import { PubSub } from "../../../utilities/pubsub.js";
import { createElement } from "../../js/functions.js";

export default {}

;(() => {
    
    PubSub.subscribe({
        event: "render_navigation",
        listener: renderTopMenu
    });

})();

function renderTopMenu (response) {
    let container_map = document.querySelector("#container_map");
    let map = document.querySelector("#map");

    let topNavigation = createElement("div", "", "topNavigation");

    topNavigation.innerHTML = `
        <div id="navigationContainer">
            <div id="guessMurderBox">
                <button id="guessMurder" class="topNav"> Gissa mördaren </button>
            </div>
            <div id="timeContainer"> 
                <h3 id="timeLeft"> </h3>
            </div>
        </div>
    `;

    container_map.insertBefore(topNavigation, map);

    document.querySelector("#guessMurder").addEventListener("click", () => {
        PubSub.publish({
            event: "render_guess_murder",
            detail: response
        });
    });
}