import { PubSub } from "../../utilities/pubsub.js";
import { createElement } from "../js/functions.js";
import { getFromDB, addDocAddData, docUpdate, docUpdateArry } from "../../utilities/functions/firebase_functions.js";

export function formLogReg (inputsDetail) {
    let formStartUp = createElement("form", "", "formStartUp");

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

    return formStartUp;
}

export function btnsForm (params) {
    let btnContainer = createElement("div", "", "btnContainer");
    let btnDeatils = ["register", "login"];

    btnDeatils.forEach(btn => {
        let button = createElement("button", `playGame`);
        button.textContent = btn;
        btnContainer.append(button);

        if (button.textContent === params) {
            button.classList.add("active");
        }

        if (!button.classList.contains("active")) {
            button.addEventListener("click", () => {
                PubSub.publish({
                    event: "render_startUp",
                    detail: button.textContent
                });
            });
        }
    });
    return btnContainer;
}

export async function addTeamAndMember () {
    let usersInDB = await getFromDB("users");
    
    let username = document.querySelector("#username").value;
    let password = document.querySelector("#password").value;
    
    let userExists = usersInDB.find(user => user.username === username);

    let docDataUser = {
        username: username,
        password: password  
    }

    if (userExists === undefined) {

        await addDocAddData("users", username, docDataUser);

    }

}