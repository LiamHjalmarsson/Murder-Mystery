import { PubSub } from "../../../utilities/pubsub.js";
import { createElement } from "../../js/functions.js";
import { docUpdateArry, getFromDB, updateArrayMap } from "../../../utilities/functions/firebase_functions.js";

export default {}

;(() => {

    PubSub.subscribe({
        event: "render_charater_interaction_reOpen",
        listener: renderCharacterFindButton
    });

})();

async function renderCharacterFindButton( { response } ) {
    console.log(response);
    let { data, story } = response;
    let choiseContainer = createElement("div", "", "choiseContainer");
    document.querySelector("#containerDialog").appendChild(choiseContainer);

    choiseContainer.innerHTML = `
        <div>
            <button id="btnCharacterFind"> Find a new character </button>
        </div>
    `;
    
    document.querySelector("#btnCharacterFind").addEventListener("click", async () => {
        let chapterId = data.chapters.find((chapter) => chapter.chapter === story.chapterId);
        let indexChapter = data.chapters.findIndex((chapter) => chapter.onGoing === true);
    
        await updateArrayMap("users", data.id, "chapters", indexChapter, {
            searchOnGoing: false,
            paused: true,
            onGoing: false,
        });

        await docUpdateArry("users", data.id, "chapters", {
            chapter: chapterId.chapter + 1,
            onGoing: true,
        });
    
    
        let updateUser = await getFromDB("users", data.id);
    
        PubSub.publish({
            event: "render_map",
            detail: {
            response: {
                data: updateUser,
            },
            },
        });
    });
}