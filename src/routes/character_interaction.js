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
            ${ story.partsChapter[counter] }
        </div>
        <div>
            <div id="nextPart"> -> </div>
        </div>
    `;

    document.querySelector("#nextPart").addEventListener("click", () => {
        counter++
        if (counter < story.partsChapter.length) {
            document.querySelector("#dialogText").innerHTML = story.partsChapter[counter];
        } else {
            document.querySelector("#nextPart").remove();
            btnsChoice(data);
        } 
    });
}

async function btnsChoice (data) {

    let choiseContainer = createElement("div", "", "choiseContainer");
    document.querySelector("#containerDialog").appendChild(choiseContainer);

    choiseContainer.innerHTML = `
        <div>
            <button> Find a new charater </button>
        </div>
        <div> 
            <button> Go to a search area </button>
        </div>
    `;

    console.log(data);
}