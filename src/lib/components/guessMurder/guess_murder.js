import { getFromDB } from "../../../utilities/functions/firebase_functions.js";
import { PubSub } from "../../../utilities/pubsub.js";
import { createElement } from "../../js/functions.js";

export default {}

;(() => {
    PubSub.subscribe({
        event: "render_guess_murder",
        listener: render_guess_murder
    });
})();

async function render_guess_murder (response) {
    let {data} = response;
    let app = document.querySelector("#app");
    let guessMurderWrapper = createElement("div","", "wrapSus");

    app.append(guessMurderWrapper);
    var rubrik = createElement("div","rubrik");
    var div = document.createElement('H1');
    div.textContent = "Gissa mördaren!";
    rubrik.appendChild(div);
    
    let exitBtn = createElement("div","","Xbtn");
    exitBtn.innerHTML = `<i class="fa-solid fa-xmark"></i>`;
    rubrik.append(exitBtn);
    exitBtn.addEventListener("click", () => {
        guessMurderWrapper.remove();
    });

    let GuessMurderContainer = createElement("div", "suspectsContainer");
    guessMurderWrapper.append(rubrik, GuessMurderContainer);

    let characters = await getFromDB ("charaters");

    characters.sort((a, b) => a.Id > b.Id);
    characters.forEach(characterDb => {
        if (characterDb.Id !== 1) {
            let SusBtnBox = createElement("div", "susBtn", characterDb.imgref);
            let iconsDiv = createElement("div", "", "iconSus");
            let name = createElement("div","name");

            let found = data.characters.some(character => character.characterId === characterDb.Id);

            iconsDiv.style.backgroundImage = found ? `url(${characterDb.ImgProfile})` : `url(../../../../library/lock.png)`;
        
            if (found) {
                iconsDiv.addEventListener("click", () => {
                    PubSub.publish({
                        event: "render_guess_weaponMotive",
                            detail: { response : {
                                data: data,
                                character: characterDb
                            }}
                        });
                    });
                        
                name.textContent = characterDb.fullName;
            } else {
                name.textContent = "?";
            }

            SusBtnBox.append(iconsDiv);
            SusBtnBox.append(name);
            GuessMurderContainer.append(SusBtnBox);
        }
    });
}