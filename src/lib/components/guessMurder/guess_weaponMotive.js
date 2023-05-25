import { PubSub } from "../../../utilities/pubsub.js";
import { createElement } from "../../js/functions.js";
import { getFromDB } from "../../../utilities/functions/firebase_functions.js";

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
    cluesDb.sort((a, b) => a.clueId > b.clueId);

    bioWrapper.innerHTML = `
        <div id="SusBio">
            <div class="CloseBio">
                <div class="close" id="containerClose"><i class="fa-solid fa-xmark"></i></div>
            </div>
            <div id="infoMurderGuess">
                <p> Tror du att det var ${character.fullName} som begick mordet </p>
                <h3 class="headGuess"> Ledtrådar </h3>
                <div id="cluesMurderGuss"></div>
                <div id="btnMurderGussBox">
                    <button id="btnMurderGuss"> Gissa mördare </button>
                </div>
            </div>
        </div>
    `
    cluesDb.forEach(clue => {
        const foundClue = createElement("div", "cluesGuess");
        const imgClue = createElement("div", "imgClue");
    
        const found = data.clues.some(userClue => userClue.clueId === clue.clueId);

        imgClue.style.backgroundImage = found ? `url(${clue.imageRef})` : `url(../../../../library/lock.png)`;

        foundClue.append(imgClue);
        document.querySelector("#cluesMurderGuss").append(foundClue);

    });

    document.querySelector(".CloseBio").addEventListener("click", () => {
        bioWrapper.remove();
    });

    document.querySelector("#btnMurderGuss").addEventListener("click", () => {

        PubSub.publish({
            event: "render_popup",
            detail: { 
                params: "guessMurder", 
                response : {
                    data: data,
                    character: character
                }
            }
        }); 
    });
}