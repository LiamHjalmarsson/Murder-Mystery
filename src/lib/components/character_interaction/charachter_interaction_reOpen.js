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
    let { data, story } = response;

    let choiseContainer = createElement("div", "", "choiseContainer");
    document.querySelector("#dialogBox").appendChild(choiseContainer);

    if (!story.alley) {
        let clue = data.clues.some(clue => clue.clueId === story.clueId);
        let chapter = data.chapters.some(chapter => chapter.chapter === story.chapterId + 1);
        if (!clue && story.clueId === 4) { 
            choiseContainer.innerHTML = `
                <div>
                    <button id="btnCharacterFind"> Hitta karaktär </button>
                </div>
                <div>
                    <button id="btnSearch"> Gå till sökområde </button>
                </div>
            `;

            document.querySelector("#btnSearch").addEventListener("click", async () => {
                let indexChapter = data.chapters.findIndex((chapter) => chapter.onGoing);
                let index = data.chapters.findIndex((chapter) => chapter.chapter === 8);

                await updateArrayMap("users", data.id, "chapters", indexChapter, {
                    searchOnGoing: false,
                    paused: true,
                    onGoing: false,
                });
        
                await updateArrayMap('users', data.id, 'chapters', index, { 
                    searchOnGoing: true, completed: true, onGoing: true
                });
        
                let updateUser = await getFromDB("users", data.id);
            
                PubSub.publish({
                    event: "render_map",
                    detail: {
                        response: {
                            data: updateUser
                        }
                    }
                });
            });

        } else {
            choiseContainer.innerHTML = `
                <div>
                    <button id="btnCharacterFind"> Hitta karaktär </button>
                </div>
            `;
        }
        

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
    } else {
        document.querySelector("#containerDialog").remove();
    }
}