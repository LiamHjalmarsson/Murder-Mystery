
import { PubSub } from "../utilities/pubsub.js";
import { createElement } from "../lib/js/functions.js";
import { formLogReg, btnsForm, addUser } from "../lib/components/component_startUp.js";
import { registerPlayer } from "../utilities/functions/firebase_auth.js";
import { getUserDoc, checkLoginStatus } from "../utilities/functions/firebase_functions.js";

export default {}

;(() => {
    PubSub.subscribe({
        event: "render_startUp",
        listener: render_startUp
    });
})();

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

    // if (params === "login") {
    //     inputsDetail = [
    //         {
    //             type: "text",
    //             name: "email",
    //             id: "email",
    //             label: "Enter email"
    //         },
    //         {
    //             type: "password",
    //             name: "password",
    //             id: "password",
    //             label: "Enter password"
    //         }
    //     ]
    // } else {
    //     inputsDetail = [
    //         {
    //             type: "text",
    //             name: "email",
    //             id: "email",
    //             label: "Enter email"
    //         },
    //         {
    //             type: "password",
    //             name: "password",
    //             id: "password",
    //             label: "Enter password"
    //         },
    //         {
    //             type: "text",
    //             name: "username",
    //             id: "username",
    //             label: "Enter username"
    //         }
    //     ]
    // }

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
        // let email = document.querySelector("#email").value;

        if (params === "login") {

            let userID = await getUserDoc(username, password);

            if (userID.error) {

                PubSub.publish({
                    event: "render_component_popup",
                    detail: userID
                });

            } else {

                console.log(userID);
                localStorage.setItem("userId", userID);
                localStorage.setItem("password", password);
                localStorage.setItem("username", username);

                PubSub.publish({
                    event: "render_map",
                    detail: {
                        location: {
                            lat: 55.608627,
                            long: 13.005227
                        }
                    }
                });

            }

        } else {

            // keep if we change to email 
                // let user = await registerPlayer(email, password)
                // await addUser(user);

            let user = await addUser();
            console.log("användare till lagd", user);
            
            PubSub.publish({
                event: "render_startUp", 
                detail: "login"
            });
            

        }
    });
}
