import { getFromDB } from "../../../utilities/functions/firebase_functions.js";
import { PubSub } from "../../../utilities/pubsub.js";
import { createElement } from "../../js/functions.js";

export default {}

;(() => {
    PubSub.subscribe({
        event: "render_suspects",
        listener: render_suspects

    });
})();

async function render_suspects ({response}) {
    let {data} = response;
    let app = document.querySelector("#app");
    let suspectsWrapper = createElement("div","", "wrapSus");

    app.append(suspectsWrapper);
    var rubrik = createElement("div","rubrik");
    var div = document.createElement('H1');
    div.textContent = "Karaktärer";
    rubrik.appendChild(div);

    let exitBtn = createElement("div","","Xbtn");
    exitBtn.innerHTML = `<i class="fa-solid fa-xmark"></i>`;
    rubrik.append(exitBtn);
    exitBtn.addEventListener("click", () => {
        if (document.querySelector("#app > #wrapperPopUp")) {
            document.querySelector("#app > #wrapperPopUp").remove();
        }
        suspectsWrapper.remove();
    });

    let suspectsContainer = createElement("div", "suspectsContainer");
    suspectsWrapper.append(rubrik, suspectsContainer);

    let characters = await getFromDB ("charaters");
    characters.forEach(chapter => {
        let SusBtnBox = createElement("div", "susBtn", chapter.imgref);
        let iconsDiv = createElement("div", "", "iconSus");
        let name = createElement("div","name");

        let found = data.characters.some(character => character.characterId === chapter.Id);
        
        iconsDiv.style.backgroundImage = found ? `url(${chapter.ImgProfile}` : `url(../../../../library/lock.png)`;
        name.textContent = found ? chapter.fullName : "?";
        
        if (found) {
            iconsDiv.addEventListener("click", (e) => {
                if (document.querySelector("#app > #wrapperPopUp")) {
                    document.querySelector("#app > #wrapperPopUp").remove();
                }
                PubSub.publish({
                    event: "render_component_suspects_bio",
                    detail: chapter
                });
            });
        } else {

            iconsDiv.addEventListener("click", () => {
                if (document.querySelector("#app > #wrapperPopUp")) {
                    document.querySelector("#app > #wrapperPopUp").remove();
                }
                PubSub.publish({
                    event: "render_popup",
                    detail: { 
                        params: "locked", 
                        response : { 
                            msg: "This item is locked" 
                        }
                    }
                });
            });
        }
        
        SusBtnBox.append(iconsDiv, name);
        suspectsContainer.append(SusBtnBox);
    }); 
}