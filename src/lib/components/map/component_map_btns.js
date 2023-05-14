import { PubSub } from "../../../utilities/pubsub.js";
import { createElement } from "../../js/functions.js";

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
            icon: "../../../../src/lib/icons/search.png",
        },
        {
            text: "Logga ut", 
            id: "topRight",
            icon: "../../../../src/lib/icons/letter.png",
        },
        {
            text: "Väska",
            id: "bottomLeft",
            icon: "../../../../src/lib/icons/backpack.png",
        },
        {
            text: "Misstänkta",
            id: "bottomRight",
            icon: "../../../../src/lib/icons/spyware.png",
        }
    ];

    buttons.forEach(btn => {
        let buttonBox = createElement("div", "navigationBtn", btn.id);

        let iconsDiv = createElement("div", "", "iconNav");
        iconsDiv.style.backgroundImage = `url(${btn.icon})`;
    
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
                event: "render_component_popup",
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

        localStorage.clear();
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