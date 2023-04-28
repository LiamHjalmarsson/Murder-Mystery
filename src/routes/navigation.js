import { PubSub } from "../utilities/pubsub.js";
import { createElement } from "../lib/js/functions.js";
import { getFromDB, addDocAddData, realTime } from "../utilities/functions/firebase_functions.js";
export default {}

;(() => {
    PubSub.subscribe({
        event: "render_map",
        listener: renderNavigation
    });
})();

function renderNavigation () {
    let container_map = document.querySelector("#container_map");
    let map = document.querySelector("#map");

    let navigationBox = createElement("div", "", "navigationBox");

    let topMenu = renderTopMenu();
    container_map.insertBefore(topMenu, map);
    container_map.append(navigationBox);

    countDown();
    
    let buttons = [
        {
            text: "Lös Gåta",
            id: "topLeft",
            icon: "path...",
        },
        {
            text: "Brevlåda",
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

        button.addEventListener("click", diffrentBtns);

        navigationBox.append(button);
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

async function diffrentBtns (e) {
    e.preventDefault();

    switch (e.target.innerText) {
        case "Lös Gåta":
            realTime("storyTelling", "chapterOne")
        break;
            
        case "Brevlåda":
            // docUpdateArry("storyTelling", "chapterOne", "myArrayField", "xxx")
            localStorage.clear();
            PubSub.publish({
                event: "render_startUp",
                detail: "login"
            });
        break;

        case "Väska":
            let db = await getFromDB("storyTelling", "chapterOne");

            let counter = 0;
            let app = document.querySelector("#app");

            let wrapperPopUp = createElement("div", "", "wrapperPopUp");
            app.appendChild(wrapperPopUp);
        
            let containerPopUp = createElement("div", "", "containerPopUp"); 
        
            wrapperPopUp.append(containerPopUp);
        
            let close = createElement("div", "", "close");
            let text = createElement("div", "", "text");
            text.innerHTML = db.partsChapter[counter];

            containerPopUp.append(close, text);

            close.addEventListener("click", () => {
                counter++
                if (counter < db.partsChapter.length) {
                    text.innerHTML = db.partsChapter[counter];
                } else {
                    let btn = createElement("button", "", "");
                    btn.textContent = "next"
                    containerPopUp.append(btn)
                    btn.addEventListener("click", () => {
                        PubSub.publish({
                            event: "render_map",
                            detail: {
                                location: {
                                    lat: db.locationCharacter._lat,
                                    long: db.locationCharacter._long,
                                }, 
                            }
                        })
                    })
                }
            });
        
        break;

        case "Misstänkta":
            addDocAddData("xxx", { hello: 1 }, "hello");
        break;
    }

}

function countDown() {
    let remainingTime = 4 * 60 * 60; // 4 hours in seconds
    
    const intervalId = setInterval(() => {
        if (remainingTime > 0) {
            console.log(remainingTime);
            remainingTime--;

            let remainingHours = Math.floor(remainingTime / 3600);
            let remainingMinutes = Math.floor((remainingTime % 3600) / 60);
            let remainingSeconds = remainingTime % 60;

            if (document.querySelector("#timeLeft")) {
                document.querySelector("#timeLeft").innerHTML = `Timer: <br> ${remainingHours}: ${remainingMinutes}m : ${remainingSeconds}s`
            }
        } else {
            console.log("Countdown finished!");
            clearInterval(intervalId);
        }
    }, 1000);
}