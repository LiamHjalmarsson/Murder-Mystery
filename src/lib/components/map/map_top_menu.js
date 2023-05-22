import { PubSub } from "../../../utilities/pubsub.js";
import { createElement } from "../../js/functions.js";
import { logout } from "../../../utilities/functions/countDownTimer.js";

export default {}

;(() => {
    
    PubSub.subscribe({
        event: "render_navigation",
        listener: renderTopMenu
    });

})();

function renderTopMenu ({response}) {
    let { data } = response;
    let container_map = document.querySelector("#container_map");
    let map = document.querySelector("#map");
    let topNavigation = createElement("div", "", "topNavigation");

    topNavigation.innerHTML = `
        <div id="navigationContainer">
            <div id="guessMurderBox">
                <button id="guessMurder" class="topNav"> Gissa <br> mördaren </button>
            </div>
            <div id="timeContainer"> 
                <h3 id="timeLeft"> </h3>
                <div id="logOut">
                    <i class="fa-solid fa-right-from-bracket"></i>
                </div>
            </div>
        </div>
    `;

    container_map.insertBefore(topNavigation, map);

    PubSub.publish({
        event: "render_counDown"
    });

    document.querySelector("#guessMurder").addEventListener("click", () => {
        PubSub.publish({
            event: "render_guess_murder",
            detail: response
        });
    });

    document.querySelector("#logOut").addEventListener("click", () => {
            localStorage.removeItem("user");
            logout(data.id);

            PubSub.publish({
                event: "render_startUp",
                detail: "login"
            });
    }); 
}