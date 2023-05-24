import { PubSub } from "../../../utilities/pubsub.js";
import { createElement, fadeInElement } from "../../js/functions.js";
import { getFromDB } from "../../../utilities/functions/firebase_functions.js";

export default {}

;(() => {

    PubSub.subscribe({
        event: "leadboard",
        listener: renderleadboard
    });

})();

async function renderleadboard (response) {
    let app = document.querySelector("#app");
    let leadboard = await getFromDB("leadboard");

    let container = createElement("div", "containerPopUP", "containerLead");
    app.appendChild(container);

    let containerWrapper = createElement("div", "", "containerWrapper");
    container.append(containerWrapper);

    containerWrapper.innerHTML = ` 
        <div id="bagNav">
            <div class="bagClose"> 
                <div class="close" id="containerBagClose"> 
                    <i class="fa-solid fa-xmark"></i>
                </div>
            </div>
            <h2 class="bagHeader"> Leadboard </h2>
        </div>
        <div id="usersLead">  
        </div>
    `;

    leadboard.forEach(user => {
        let timestampInMillis = user.createdAt.seconds * 1000 + Math.round(user.createdAt.nanoseconds / 1000000);
        let userTimeStart = user.UserStartedAt.seconds * 1000 + Math.round(user.UserStartedAt.nanoseconds / 1000000);
        
        let date = new Date(timestampInMillis);
        let dateUser = new Date(userTimeStart);
        
        let hours = date.getHours();
        let minutes = date.getMinutes();

        let Userhours = dateUser.getHours();
        let USerminutes = dateUser.getMinutes();
        
        let timeString = `${hours - Userhours}:${minutes - USerminutes}`;

        let div = createElement("div", "leadUser");
        div.innerHTML = `
            <div> Spelar: ${user.username} </div>
            <div> Gissning efter: ${timeString} </div>
            <div> Gissade: ${user.murderGuessCorrect === true ? "Rätt" : "Fel"} </div>
        `;

        document.querySelector("#usersLead").append(div);
    });

    document.querySelector("#containerBagClose").addEventListener("click", () => {
        PubSub.publish({
            event: "render_map",
            detail: response
        });
    });

    fadeInElement(container);
}