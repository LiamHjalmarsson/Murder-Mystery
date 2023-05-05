import { PubSub } from "../utilities/pubsub.js";
import { createElement } from "../lib/js/functions.js";
import { getFromDB } from "../utilities/functions/firebase_functions.js";

export default {}

;(() => {

    PubSub.subscribe({
        event: "render_bag",
        listener: render_bag
    });

})();

async function render_bag ( { response}) {

    let { data } = response;

    let app = document.querySelector("#app");
    // app.innerHTML = "";

    let containerBag = createElement("div", "containerPopUP", "containerBag");
    app.appendChild(containerBag);

    let containerWrapper = createElement("div", "", "containerWrapper");
    containerBag.append(containerWrapper);

    containerWrapper.innerHTML = ` 
        <div id="bagNav">
            <div class="bagClose"> 
                <div class="close" id="containerBagClose"> </div>
            </div>
            <h3 class="bagHeader"> Väska </h3>
        </div>
        <div id="containerInventory">  
        </div>
    `;

    document.querySelector("#containerBagClose").addEventListener("click", () => {
        containerBag.remove();
    });

    document.querySelector("#containerInventory").append(await renderInventory(data));
}

async function renderInventory (data) {
    let cluesDb = await getFromDB("clues");

    let inventory = createElement("div", "", "inventory");

    data.clues.forEach(userClue => {

        cluesDb.forEach(clue => {

            let foundClue = createElement("div", "foundClue");
            let imgClue = createElement("div", "imgClue");

            if (userClue.clueId === clue.clueId) { 
                imgClue.style.backgroundImage = `url(../../src/lib/icons/${clue.imageRef}.png)`;

                foundClue.addEventListener("click", (e) => {
                    PubSub.publish({
                        event: "render_component_bag_detail",
                        detail: {
                            response: {
                                clue: clue,
                                data: data
                            }
                        }
                    });
                });

            } else {
                imgClue.style.backgroundImage = `url(../../src/lib/icons/lock.png)`;
            }

            foundClue.append(imgClue);
            inventory.append(foundClue);

        });
    });

    return inventory;
}