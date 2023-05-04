import { PubSub } from "../../utilities/pubsub.js";
import { createElement } from "../js/functions.js";
import { getFromDB, addDocAddData } from "../../utilities/functions/firebase_functions.js";

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

export async function addUser (user) {
    let usersInDB = await getFromDB("users"); // kommer åt alla användare 
    
    let username = document.querySelector("#username").value;
    let password = document.querySelector("#password").value;
    
    let userExists = usersInDB.find(user => user.username === username); // kontroll om användarnamnt finns 

    // object datan som ska läggas till 
    let docDataUser = {
        password: password,
        username: username,
        clues: [],
        charaters: [],
        chapters: [
            {
                chapter: 1,
                completed: false,
                onGoing: true,
                searchOnGoing   : false,
                searchDone: false,
            }, 
        ],
    }

    if (userExists === undefined) {
        let user = await addDocAddData("users", docDataUser); // lägger till användaren i db 
        return user;
    } else {
        console.log("error user exists in db", userExists);
    }

}




// {
            //     chapter: "chapterOne",
            //     completed: false,
            //     onGoing: true,
            //     searchArea: false,
            //     searchDone: false,
            // }, 
            // {
            //     chapter: "chapterTwo",
            // }, 
            // {
            //     chapter: "chapterThree",
            // }, 
            // {
            //     chapter: "chapterFour",
            // }, 
            // {
            //     chapter: "chapterFive",
            // }, 
            // {
            //     chapter: "chapterSix",
            // }, 
            // {
            //     chapter: "chapterSeven",
            // }, 
            // {
            //     chapter: "chapterEight",
            // }, 
            // {
            //     chapter: "chapterNine",
            // }, 
            // {
            //     chapter: "chapterTen",
            // }, 
            // {
            //     chapter: "chapterEleven",
            // }, 
            // {
            //     chapter: "chapterTwelve",
            // }, 
            // {
            //     chapter: "chapterThirteen",
// }