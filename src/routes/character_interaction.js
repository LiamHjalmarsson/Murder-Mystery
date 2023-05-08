import { PubSub } from "../utilities/pubsub.js";
import { createElement } from "../lib/js/functions.js";

export default {}

;(() => {

    PubSub.subscribe({
        event: "render_charater_interaction",
        listener: render_character_interaction
    });

})();

function render_character_interaction ( { response }, counter = 0 ) {
    let { data, story } = response;

    let app = document.querySelector("#app");
    app.innerHTML = "";

    let containerDialog = createElement("div", "", "containerDialog");
    app.appendChild(containerDialog);

    containerDialog.style.backgroundImage = `url(../../src/lib/images/${story.imageRef}.jpg)`;

    let dialogBox = createElement("div", "", "dialogBox"); 
    containerDialog.append(dialogBox);

    dialogBox.innerHTML = `
        <div>
            <h3> ${ story.character } </h3>
        </div>
        <div id="dialogText"> 
            <p> ${ story.partsChapter[counter] } </p>
        </div>
        <div>
            <div id="nextPart"> -> </div>
        </div>
    `;

    document.querySelector("#nextPart").addEventListener("click", () => {
        counter++
        if (counter < story.partsChapter.length) {
            text.innerHTML = story.partsChapter[counter];
        } else {
            let btn = createElement("button", "", "");
            btn.textContent = "next"
            dialogBox.append(btn)
        }
    });
}