import { createElement } from "./src/lib/js/functions";
import { formLogReg, btnsForm, addTeamAndMember } from "./src/lib/components/component_startUp.js";
import { addDocAddData } from "./src/utilities/functions/firebase_functions";

async function addDB () {
    let app = document.querySelector("#app");
    app.innerHTML = "";

    let formContainer = createElement("div", "", "startUpContainer");
    app.append(formContainer);
    
    let inputsDetail = [
        {
            type: "text",
            collectionName: "collectionName",
            id: "collectionName",
            label: "Enter a collectionName"
        },
        {
            type: "text",
            documentName: "documentName",
            id: "documentName",
            label: "Enter a documentName"
        },
        {
            type: "text",
            key: "key",
            id: "key",
            label: "Enter a key"
        },
        {
            type: "text",
            key: "value",
            id: "value",
            label: "Enter a value"
        }
    ]

    let form = formLogReg(inputsDetail);

    formContainer.append(form);

    let formStartUp = document.querySelector("#formStartUp");
    let btnContainer = createElement("div", "", "btnContainer");

    let btnConfrim = createElement("button", "playGame");
    btnConfrim.textContent = "ADD TO DATABASE";

    let btnAddKeysAndValues = createElement("button", "playGame");
    btnAddKeysAndValues.textContent = "ADD KEY ND VALUE";

    btnContainer.append(btnConfrim, btnAddKeysAndValues);
    formStartUp.append(btnContainer);

    formStartUp.querySelectorAll("div > input").forEach(input => {
        input.addEventListener("keyup", (e) => {
            if (e.target.value !== "") {
                e.target.parentElement.lastElementChild.classList.add("active");
            } else {
                e.target.parentElement.lastElementChild.classList.remove("active");
            }
        });
    });

    let docData = {}
    
    btnAddKeysAndValues.addEventListener("click", (e) => {
        e.preventDefault();
        
        let key = document.querySelector("#key").value;
        let value = document.querySelector("#value").value;

        docData[key] = value;

        document.querySelector("#value").value = "";
        document.querySelector("#key").value = "";

        console.log(docData);
    });

    formStartUp.addEventListener("submit", async (e) => {
        e.preventDefault();

        let collectionName = document.querySelector("#collectionName").value;
        let documentName = document.querySelector("#documentName").value;

        await addDocAddData(collectionName, documentName, docData);

        formStartUp.reset();
    });



}

addDB();