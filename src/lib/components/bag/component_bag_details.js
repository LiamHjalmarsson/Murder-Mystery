import { PubSub } from "../../../utilities/pubsub.js";
import { createElement } from "../../js/functions.js";

export default {}

;(() => {

    PubSub.subscribe({
        event: "render_bag_details",
        listener: renderInventory
    });

})();

async function renderInventory ( { response }) {
    let { data, clues } = response;

    let inventory = createElement("div", "", "inventory");

    clues.sort((a, b) => a.clueId > b.clueId);

    clues.forEach(clue => {
        const foundClue = createElement("div", "foundClue");
        const imgClue = createElement("div", "imgClue");
    
        const found = data.clues.some(userClue => userClue.clueId === clue.clueId);

        imgClue.style.backgroundImage = found ? `url(${clue.imageRef})` : `url(../../src/lib/icons/lock.png)`;

        foundClue.addEventListener("click", () => {
            if (found) {
                PubSub.publish({
                    event: "render_component_bag_detail",
                    detail: clue
                });
            } else {
                console.log("error");
            }
        });

        foundClue.append(imgClue);
        inventory.append(foundClue);
    });
    
    document.querySelector("#containerInventory").append(inventory);
}