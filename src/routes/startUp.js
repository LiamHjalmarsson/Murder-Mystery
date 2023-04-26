import { PubSub } from "../utilities/pubsub.js";
import { createElement } from "../lib/js/functions.js";
import { formLogReg, btnsForm, addTeamAndMember } from "../lib/components/component_startUp.js";
import { registerPlayer, loginPlayer, unsubAuth } from "../utilities/functions/firebase_auth.js";
import { getFromDB, addDocAddData, docUpdate, 
    realTime, realtimeListner, docUpdateArry } from "../utilities/functions/firebase_functions.js";

export default {}

;(() => {
    PubSub.subscribe({
        event: "render::startUp",
        listener: render
    });
})();

async function render ( params ) {
    
    let app = document.querySelector("#app");
    app.innerHTML = "";

    let formContainer = createElement("div", "", "startUpContainer");
    app.append(formContainer);
    
    let inputsDetail = [
        {
            type: "text",
            name: "username",
            id: "username",
            label: "Enter username"
        },
        {
            type: "password",
            name: "password",
            id: "password",
            label: "Enter password"
        }
    ]

    let gameTitle = createElement("h2", "gameTitle");
    gameTitle.textContent = "Dåd i kungens hörna";

    let form = formLogReg(inputsDetail);

    formContainer.append(gameTitle, form);

    let formStartUp = document.querySelector("#formStartUp");

    formStartUp.append(btnsForm(params));

    formStartUp.querySelectorAll("div > input").forEach(input => {
        input.addEventListener("keyup", (e) => {
            if (e.target.value !== "") {
                e.target.parentElement.lastElementChild.classList.add("active");
            } else {
                e.target.parentElement.lastElementChild.classList.remove("active");
            }
        });
    });

    formStartUp.addEventListener("submit", async (e) => {
        e.preventDefault();
        let username = document.querySelector("#username").value;
        let password = document.querySelector("#password").value;

        if (params === "login") {
            let data;

            let user = await loginPlayer(username, password);
            
            // if (data.error) { 

            //     PubSub.publish({
            //         event: "render::component_PopUp",
            //         detail: data
            //     });

            // } else {

                // unsubAuth();
        
                realTime("users");
                PubSub.publish({
                    event: "render::map"
                });
            // }
        } else {

            if (await registerPlayer(username, password)) {
                await addTeamAndMember();
    
                PubSub.publish({
                    event: "render::startUp", 
                    detail: "login"
                });
            }

        }
    });
}
