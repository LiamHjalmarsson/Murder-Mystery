import { PubSub } from "../../../utilities/pubsub.js";
import { createElement } from "../../js/functions.js";
import { getUserDoc, getFromDB, addDocAddData } from "../../../utilities/functions/firebase_functions.js";

export default {}

;(() => {

    PubSub.subscribe({
        event: "render_startUp_form",
        listener: render_startUp_form
    });
    
})();

function render_startUp_form (params) {
    let formStartUp = createElement("form", "", "formStartUp");

    let inputsDetail = [
        {
            type: "text",
            name: "username",
            id: "username",
            label: "Skriv in användarnamn"
        },
        {
            type: "password",
            name: "password",
            id: "password",
            label: "Skriv in lösenord"
        }
    ];

    inputsDetail.forEach(element => {
        let div = createElement("div", "box_input");

        let input = createElement("input", "formStartUp_input", element.id);
        input.type = element.type;
        input.name = element.name;

        let label = createElement("label", "labelInput");
        label.for = element.name;
        label.textContent = element.label

        div.append(input, label);
        formStartUp.appendChild(div);
    });

    document.querySelector("#startUpContainer").appendChild(formStartUp);

    inputAddClass(formStartUp);

    PubSub.publish({
        event: "render_startUp_btns",
        detail: params
    });

    formStartUp.addEventListener("submit", (e) => {
        formListener(e, params);
    });
}

function inputAddClass (formStartUp) {
    formStartUp.querySelectorAll("div > input").forEach(input => {
        input.addEventListener("keyup", (e) => {
            if (e.target.value !== "") {
                e.target.parentElement.lastElementChild.classList.add("active");
            } else {
                e.target.parentElement.lastElementChild.classList.remove("active");
            }
        });
    });
}

async function formListener (e, params) { 
    e.preventDefault();
    let username = document.querySelector("#username").value.toLowerCase();
    let password = document.querySelector("#password").value.toLowerCase();

    if (params === "login") {
        let user = await getUserDoc(username, password);

        if (user.params === "error") {

            PubSub.publish({
                event: "render_popup",
                detail: user
            });

        } else {

            let userLocal = {
                userId: user.id,
                password: password,
                username: username
            };

            let userTime;
            if (user.countdownStart) {
                userTime = {
                    userCount: user.countdownStart
                }
            } else {
                userTime = {
                    userCount: user.createdAt
                }
            }

            localStorage.setItem("userCount", JSON.stringify(userTime));
            localStorage.setItem("user", JSON.stringify(userLocal));

            if (user.newStart) {
                PubSub.publish({ 
                    event: "render_start_endLetter",
                    detail: user
                });
            } else {
                PubSub.publish({
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
        }
    } else {
        if (username !== "" && password !== "") {
            let user = await addUser();
            if (user) {

                PubSub.publish({
                    event: "render_popup",
                    detail: { params: "created" }
                });

            } else {
                PubSub.publish({
                    event: "render_popup",
                    detail: { 
                        params: "error", 
                        response : { 
                            error: "Användar existerar redan" 
                        }
                    }
                });
            }
        }
    }
}

async function addUser () {
    let usersInDB = await getFromDB("users");
    let username = document.querySelector("#username").value.toLowerCase();
    let password = document.querySelector("#password").value.toLowerCase();
    let userExists = usersInDB.find(user => user.username === username); 

    let docDataUser = {
        password: password,
        username: username,
        clues: [],
        characters: [
            {
                characterId: 1
            }
        ],
        chapters: [
            {
                chapter: 1,
                onGoing: true,
            }, 
        ],
        newStart: true,
        timesGuessing: 2
    }

    if (userExists === undefined) {
        await addDocAddData("users", docDataUser);

        return true;
    } else {
        return false;
    }
}