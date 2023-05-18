import { PubSub } from "../../../utilities/pubsub.js";
import { createElement } from "../../js/functions.js";
import { userTime } from "../../../utilities/functions/firebase_functions.js"

export default {}

;(() => {
    
    PubSub.subscribe({
        event: "render_navigation",
        listener: render_buttonsNav
    });

})();

function render_buttonsNav (response) {
    let container_map = document.querySelector("#container_map");
    let navigationBox = createElement("div", "", "navigationBox");

    let buttons = [
        {
            text: "Lös Gåta",
            id: "topLeft",
            icon: `<i class="fa-sharp fa-solid fa-magnifying-glass-location"></i>`,
        },
        {
            text: "Logga ut", 
            id: "topRight",
            icon: `<i class="fa-solid fa-right-from-bracket"></i>`,
        },
        {
            text: "Väska",
            id: "bottomLeft",
            icon: `<i class="fa-sharp fa-solid fa-suitcase"></i>`,
        },
        {
            text: "Misstänkta",
            id: "bottomRight",
            icon: `<i class="fa-solid fa-user-secret"></i>`,
        }
    ];

    buttons.forEach(btn => {
        let buttonBox = createElement("div", "navigationBtn", btn.id);

        let iconsDiv = createElement("div", "", "iconNav");
        iconsDiv.innerHTML = btn.icon;
    
        let button = createElement("div", "infoNavBtn");
        button.textContent = btn.text;
        
        buttonBox.addEventListener("click", () => {
            diffrentBtns(btn.text, response);
        });
        
        buttonBox.append(iconsDiv, button);
        navigationBox.append(buttonBox);
    });

    container_map.append(navigationBox); 
}

async function diffrentBtns (btn, { response } ) {
    let { data, storys } = response;

    if (document.querySelector("#wrapperPopUp")) {
        document.querySelector("#wrapperPopUp").remove();
    }
    
    switch (btn) {
        case "Lös Gåta":
            PubSub.publish({
                event: "render_popup",
                detail: {
                    params: "",  
                    response: {
                        data: data,
                        storys: storys
                    }
                }
            });
        break;
        
        case "Logga ut":
            localStorage.removeItem("user");


            PubSub.publish({
                event: "render_startUp",
                detail: "login"
            });
        break;

        case "Väska":
            PubSub.publish({
                event: "render_bag",
                detail: data
            });
        break;

        case "Misstänkta":
            PubSub.publish({
                event: "render_suspects",
                detail: {
                    response: {
                        data: data,
                    }
                }
            });
        break;
    }
}