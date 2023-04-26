import { PubSub } from "../utilities/pubsub.js";
import { createElement } from "../lib/js/functions.js";
import { logoutPlayer } from "../utilities/functions/firebase_auth.js";

export default {}

;(() => {
    PubSub.subscribe({
        event: "render::map",
        listener: render
    });
})();

function render () {

    let container_map = document.querySelector("#container_map");
    let map = document.querySelector("#map");

    let topNavigation = createElement("div", "", "topNavigation");

    let navigationBox = createElement("div", "", "navigationBox");
    container_map.insertBefore(topNavigation, map);
    container_map.append(navigationBox);

    let buttons = [
        {
            text: "Lös Gåta",
            id: "topLeft",
            icon: "path...",
        },
        {
            text: "Loga ut",
            id: "topRight",
            icon: "path...",
        },
        {
            text: "Väska",
            id: "bottomLeft",
            icon: "path...",
        },
        {
            text: "Misstänkta ",
            id: "bottomRight",
            icon: "path...",
        }
    ];

    buttons.forEach(btn => {
        let button = createElement("button", "navigationBtn", btn.id);

        button.classList.add("navigationBtn");
        button.textContent = btn.text;

        button.addEventListener("click", (e) => {
            let btnText = btn.target.innerText;

            console.log(btnText);
        });

        navigationBox.append(button);
    });

} 


function buttonsEventHandler (btn) {
    let btnText = btn.target.innerText;

    switch(btnText) {
        case "Lös Gåta":
            console.log("Lös Gå")
        break;
        case "Loga ut":
            console.log("Loga ut")
        break;
        case "Väska":
            console.log("Väska")
        break;
        case "Misstänkta":
            console.log("Misstänkta")
        break;
    }
}