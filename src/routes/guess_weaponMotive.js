import { PubSub } from "../utilities/pubsub.js";
import { createElement } from "../lib/js/functions.js";
import { getFromDB } from "../utilities/functions/firebase_functions.js";

export default {}

;(() => {
    PubSub.subscribe({
        event: "render_guess_weaponMotive",
        listener: render_guess_weaponMotive
    });
})();

async function render_guess_weaponMotive ({response}) {
    let {data, character} = response;
    let app = document.querySelector("#app");
    let bioWrapper = createElement("div","", "wrapBio");
    app.appendChild(bioWrapper);

    let cluesDb = await getFromDB("clues");

    bioWrapper.innerHTML = `
        <div id="SusBio">
            <div class="CloseBio">
                <div class="close" id="containerClose"><i class="fa-solid fa-xmark"></i></div>
            </div>
            <div id="infoMurderGuess">
                <p> Tror du att det var ${character.fullName} som begick mordet </p>
            </div>
            <div id="cluesMurderGuss">
            </div>
        </div>
    `

    document.querySelector(".CloseBio").addEventListener("click", () => {
        bioWrapper.remove();
    });
}