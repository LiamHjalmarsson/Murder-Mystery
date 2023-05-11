import { PubSub } from "../../../utilities/pubsub.js";
import { createElement } from "../../js/functions.js";
import { getUserDoc, getFromDB, addDocAddData } from "../../../utilities/functions/firebase_functions.js";

export default {}

;(() => {

    PubSub.subscribe({
        event: "render_component_startUp_form",
        listener: component_startUp_form
    });
    
})();

function component_startUp_form (params) {
    let formStartUp = createElement("form", "", "formStartUp");

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

    formStartUp.querySelectorAll("div > input").forEach(input => {
        input.addEventListener("keyup", (e) => {
            if (e.target.value !== "") {
                e.target.parentElement.lastElementChild.classList.add("active");
            } else {
                e.target.parentElement.lastElementChild.classList.remove("active");
            }
        });
    });

    PubSub.publish({
        event: "render_component_startUp_btns",
        detail: params
    });

    formStartUp.addEventListener("submit", (e) => {
        formListener(e, params);
    });
}

async function formListener (e, params) { 
    e.preventDefault();
    let username = document.querySelector("#username").value;
    let password = document.querySelector("#password").value;

    if (params === "login") {

        let user = await getUserDoc(username, password);

        if (user.params === "error") {

            PubSub.publish({
                event: "render_component_popup",
                detail: user
            });

        } else {

            const userLocal = {
                userId: user.id,
                password: password,
                username: username
            };

            localStorage.setItem("user", JSON.stringify(userLocal));

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

    } else {

        await addUser();
        
        PubSub.publish({
            event: "render_startUp", 
            detail: "login"
        });

    }
}

async function addUser () {
    let usersInDB = await getFromDB("users");
    
    let username = document.querySelector("#username").value;
    let password = document.querySelector("#password").value;
    
    let userExists = usersInDB.find(user => user.username === username); 

    let docDataUser = {
        password: password,
        username: username,
        // clues: [],
        charaters: [
            {
                characterId: 1
            },
            {
                characterId: 2
            },
        ],
        chapters: [
            {
                chapter: 1,
                completed: false,
                onGoing: true,
                searchOnGoing   : false,
                searchDone: false,
            }, 
        ],
        // searchLocations: [
        //     {
        //     }
        // ]
    }

    if (userExists === undefined) {
        await addDocAddData("users", docDataUser);
    } else {
        console.log("error user exists in db", userExists);
    }
}