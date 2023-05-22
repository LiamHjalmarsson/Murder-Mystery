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
            icon: `<i class="fa-sharp fa-solid fa-magnifying-glass-location"></i>`,
        },
        {
            text: "Spåra", 
            id: "topRight",
            icon: `<i class="fa-solid fa-person-walking"></i>`,
        },
        {
            text: "Väska",
            id: "bottomLeft",
            icon: `<i class="fa-sharp fa-solid fa-suitcase"></i>`,
        },
        {
            text: "Karaktärer",
            id: "bottomRight",
            icon: `<i class="fa-solid fa-user-secret"></i>`,
        }
    ];

    buttons.forEach(btn => {
        let buttonBox = createElement("button", "navigationBtn", btn.id);

        let iconsDiv = createElement("div", "", "iconNav");
        iconsDiv.innerHTML = btn.icon;
    
        let button = createElement("div", "infoNavBtn");
        button.textContent = btn.text;
        
        buttonBox.addEventListener("click", () => {
            diffrentBtns(btn.text, response);
        });
        
        buttonBox.append(iconsDiv, button);
        navigationBox.append(buttonBox);
        
        function handleClick() {
            buttonBox.removeEventListener("click", handleClick);
        }
    });
    

    container_map.append(navigationBox); 
}

async function diffrentBtns (btn, { response } ) {
    let { data } = response;

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
                    }
                }
            });
        break;
        
        case "Spåra":

            if (!document.querySelector("#topRight").classList.contains("active")) { 
                PubSub.publish({
                    event: "render_map",
                    detail: {
                        response: {
                            data: data,
                            tracking: true
                        }
                    }
                });
            } else {
                PubSub.publish({
                    event: "render_map",
                    detail: {
                        response: {
                            data: data,
                            tracking: false
                        }
                    }
                });
            }
        break;

        case "Väska":
            PubSub.publish({
                event: "render_bag",
                detail: data
            });
        break;

        case "Karaktärer":
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