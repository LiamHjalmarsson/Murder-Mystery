import { PubSub } from "../../utilities/pubsub.js";
import { createElement } from "../../lib/js/functions.js";
import { colRef, docRef, getFromDB, setDocRef } from "../../firebase/functions/firebase_functions.js";
import { registerPlayer, loginPlayer } from "../../firebase/functions/firebase_auth.js";

export default {}

;(() => {

    PubSub.subscribe({
        event: "render::Regeister",
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
            type: "text",
            name: "playerName",
            id: "playerName",
            label: "Enter player name"
        },
        {
            type: "password",
            name: "password",
            id: "password",
            label: "Enter password"
        },
        {
            type: "text",
            name: "teamName",
            id: "teamName",
            label: "Join a team"
        },
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
    
    let buttonReg = createElement("button", "playGame");
    buttonReg.textContent = "Regeister";

    let buttonLog = createElement("button", "playGame");
    buttonLog.textContent = "Login";

    btnContainer.append(buttonReg, buttonLog);

    formStartUp.append(btnContainer)

    formStartUp.querySelectorAll("div > input").forEach(input => {
        input.addEventListener("keyup", (e) => {
            if (e.target.value !== "") {
                e.target.parentElement.lastElementChild.classList.add("active");
            } else {
                e.target.parentElement.lastElementChild.classList.remove("active");
            }
        });
    });

    buttonReg.classList.add("active");

    buttonLog.addEventListener("click", () => {
        PubSub.publish({
            event: "render::Login"
        });
    });

    formStartUp.addEventListener("submit", async (e)  => {
        e.preventDefault();
        
        let email = document.querySelector("#email").value;
        let password = document.querySelector("#password").value;

        PubSub.publish({
            event: "render::Map"
        });

        // if (await registerPlayer(email, password)) {
        //     addTeamAndMember(e);
        // }
    });

}

async function addTeamAndMember (e) {
    e.preventDefault();

    let teamsInDB = await getFromDB("teams");
    
    let teamName = document.querySelector("#teamName").value;
    let playerName = document.querySelector("#playerName").value;
    let email = document.querySelector("#email").value;

    let teamRef = colRef("teams");
    let memberRef = colRef("members");

    let docRefTeam = docRef(teamRef);
    let docRefMember = docRef(memberRef);

    let teamExists = teamsInDB.find(team => team.teamName === teamName);

    if (teamExists === undefined) {

        setDocRef(docRefTeam, {
            teamName: teamName 
        });
    
        setDocRef(docRefMember, {
            email: email,
            player: playerName, 
            team: teamName
        });

    } else {
        setDocRef(docRefMember, {
            email: email,
            member: playerName, 
            team: teamName
        });
    } 

    PubSub.publish({
        event: "Login"
    });

}