import { PubSub } from "../../../utilities/pubsub.js";
import { createElement } from "../../js/functions.js";

export default {}

;(() => {

    PubSub.subscribe({
        event: "render_bag_details",
        listener: render_bag_details
    });

})();

async function render_bag_details ( { response }) {
    let { data, clues } = response;
    let inventory = createElement("div", "", "inventory");

    clues.sort((a, b) => a.clueId > b.clueId);

    clues.forEach(clue => {
        const foundClue = createElement("div", "foundClue");
        const imgClue = createElement("div", "imgClue");
    
        const found = data.clues.some(userClue => userClue.clueId === clue.clueId);

        imgClue.style.backgroundImage = found ? `url(${clue.imageRef})` : `url(../../../../../../library/lock.png)`;

        foundClue.addEventListener("click", () => {

            if (document.querySelector("#app > #wrapperPopUp")) {
                document.querySelector("#app > #wrapperPopUp").remove();
            }

            if (found) {
                PubSub.publish({
                    event: "render_bag_details_item",
                    detail: clue
                });
            } else {
                PubSub.publish({
                    event: "render_popup",
                    detail: { 
                        params: "locked", 
                        response : { 
                            msg: "Låst ledtråd" 
                        }
                    }
                })
            }
        });

        foundClue.append(imgClue);
        inventory.append(foundClue);
    });
    
    document.querySelector("#containerInventory").append(inventory);
}