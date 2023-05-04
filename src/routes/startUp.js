
import { PubSub } from "../utilities/pubsub.js";
import { createElement } from "../lib/js/functions.js";
import { formLogReg, btnsForm, addUser } from "../lib/components/component_startUp.js";
import { getUserDoc, getFromDB } from "../utilities/functions/firebase_functions.js";

export default {}


// ett omedelbart / självkörade anropat funktionsuttryck som kör koden i funktionen när modulen importeras.
;(() => {

    // subscribar / premenurerar på ett event ("render_startUp")
    // listner function med function namn som kallas när ett event är triggat
    PubSub.subscribe({
        event: "render_startUp",
        listener: render_startUp
    });

})();

// function tar emot information från sin publish 
async function render_startUp ( params ) {
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
    gameTitle.textContent = "Dåd på kungens hörna";

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

            // kommer åt användarens document genom username & password
            let user = await getUserDoc(username, password);

            if (user.params === "error") {

                // om det blir en error kommer popUp upp 
                PubSub.publish({
                    event: "render_component_popup",
                    detail: user
                });

            } else {

                // ett object med lite information om användaren 
                const userLocal = {
                    userId: user.id,
                    password: password,
                    username: username
                };

                // användar objectet spara i localStorage 
                localStorage.setItem("user", JSON.stringify(userLocal));

                console.log("startUp", user);
                // publiserar ett event 
                PubSub.publish({ // Eventet och dens detail data kommer att skickas till all listeners som subsribar på eventet "render_map".
                    event: "render_map",
                    detail: {
                        response: {
                            data: user
                        }
                    }
                });

                PubSub.publish({
                    event: "render_counDown"
                });

            }

        } else {

            // skapar användaren och lägger till i db samt gör små kontroller innan det läggs till 
            await addUser();
            
            PubSub.publish({
                event: "render_startUp", 
                detail: "login"
            });
            
        }
    });
}
