import { PubSub } from "../utilities/pubsub.js";
import { createElement } from "../lib/js/functions.js";
import { getFromDB, addDocAddData, realTime } from "../utilities/functions/firebase_functions.js";
export default {}

;(() => {
    
    PubSub.subscribe({
        event: "render_navigation",
        listener: renderNavigation
    });

    PubSub.subscribe({
        event: "render_counDown",
        listener: countDown
    });

})();

let intervalId;

function renderNavigation ( response ) {
    let container_map = document.querySelector("#container_map");
    let map = document.querySelector("#map");

    container_map.insertBefore(renderTopMenu(), map);
    container_map.append(render_buttonsNav(response)); 

    document.querySelector("#guessMurder").addEventListener("click", () => {
        PubSub.publish({
            event: "render_guess_murder",
        });
    });
} 

function renderTopMenu () {
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

    return topNavigation;
}

function render_buttonsNav (response) {

    let navigationBox = createElement("div", "", "navigationBox");

    let buttons = [
        {
            text: "Lös Gåta",
            id: "topLeft",
            icon: "../../src/lib/icons/search.png",
        },
        {
            text: "Loga Ut", 
            id: "topRight",
            icon: "../../src/lib/icons/letter.png",
        },
        {
            text: "Väska",
            id: "bottomLeft",
            icon: "../../src/lib/icons/backpack.png",
        },
        {
            text: "Misstänkta",
            id: "bottomRight",
            icon: "../../src/lib/icons/spyware.png",
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

    return navigationBox;
}

async function diffrentBtns (btn, { response } ) {
    let { data, storys } = response;

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
        
        case "Loga Ut":

            stopCountdown();
            localStorage.clear();
            PubSub.publish({
                event: "render_startUp",
                detail: "login"
            });

        break;

        case "Väska":

            PubSub.publish({
                event: "render_bag",
                detail: {
                    response: {
                        data: data,
                    }
                }
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

function countDown() {
    let remainingTime = 4 * 60 * 60; 
    
    intervalId = setInterval(() => {
        if (remainingTime > 0) {
            remainingTime--;

            let remainingHours = Math.floor(remainingTime / 3600);
            let remainingMinutes = Math.floor((remainingTime % 3600) / 60);
            let remainingSeconds = remainingTime % 60;

            if (document.querySelector("#timeLeft")) {
                document.querySelector("#timeLeft").innerHTML = `Timer: <br> ${remainingHours}: ${remainingMinutes}m : ${remainingSeconds}s`
            }
        } else {
            clearInterval(intervalId);
        }
    }, 1000);

}

function stopCountdown() {
    clearInterval(intervalId);
}