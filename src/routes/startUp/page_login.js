import { PubSub } from "../../utilities/pubsub.js";
import { createElement } from "../../lib/js/functions.js";
import { colRef, docRef, getFromDB, setDocRef } from "../../firebase/functions/firebase_functions.js";
import { loginPlayer, registerPlayer } from "../../firebase/functions/firebase_auth.js";

export default {}

;(() => {

    PubSub.subscribe({
        event: "render::Login",
        listener: render
    });

})();

async function render () {

    let main = document.querySelector("#app");
    main.innerHTML = "";

    let formContainer = createElement("div", "", "pageStartUp");
    main.append(formContainer);

    let formStartUp = createElement("form", "", "formStartUp");
    formContainer.append(formStartUp);
    
    let inputsDetail = [
        {
            type: "email",
            name: "email",
            id: "email",
            label: "Enter email"
        },
        {
            type: "password",
            name: "password",
            id: "password",
            label: "Enter password"
        }
    ]

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

    let btnContainer = createElement("div", "", "btnContainer");

    let buttonReg = createElement("button", `playGame`);
    buttonReg.textContent = "Regeister";

    let buttonLog = createElement("button", "playGame");
    buttonLog.textContent = "Login";
    btnContainer.append(buttonReg, buttonLog);

    formStartUp.append(btnContainer)

    formStartUp.querySelectorAll("div input").forEach(input => {
        input.addEventListener("keyup", (e) => {
            if (e.target.value !== "") {
                e.target.parentElement.lastElementChild.classList.add("active");
            } else {
                e.target.parentElement.lastElementChild.classList.remove("active");
            }
        });
    });


    buttonLog.classList.add("active");

    buttonReg.addEventListener("click", () => {
        PubSub.publish({
            event: "render::Regeister"
        });
    });

    formStartUp.addEventListener("submit", async ()  => {
        let email = document.querySelector("#email").value;
        let password = document.querySelector("#password").value;

        // loginPlayer(email, password)

        PubSub.publish({
            event: "render::Map"
        });

    });

}
