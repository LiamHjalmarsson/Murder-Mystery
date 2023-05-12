import { PubSub } from "../utilities/pubsub.js";
import { createElement } from "../lib/js/functions.js";
import { docUpdateArry, getFromDB, updateArrayMap } from "../utilities/functions/firebase_functions.js";

export default {}

;(() => {

    PubSub.subscribe({
        event: "render_riddle",
        listener: render_riddle
    });

})();

function render_riddle ( { response } ) {
    let app = document.querySelector("#app");
    app.innerHTML = "";

    let riddleContainer = createElement("div", "", "riddleContainer");
    app.append(riddleContainer);

    riddleContainer.innerHTML = `
        <div id="riddleBox">
            <div>
                <div id="riddleIcon"></div>
                <div id="riddleText">
                    <p>${response.puzzel.riddle}</p>
                </div>
                <input type="text" id="riddleAnswer">
                <div>
                    <button id="btnAnswerRiddle"> send answer </button>
                </div>
            </div>
        </div>
    `;

    answerListener(response);
}

function answerListener (response) {
    let { data, puzzel, storys } = response;

    document.querySelector("#btnAnswerRiddle").addEventListener("click", async (e) => {
        e.preventDefault();
        let riddleAnswerInput = document.querySelector("#riddleAnswer").value;

            if (riddleAnswerInput === puzzel.answer) {
            // To get riddles to go to character interaction
            if (!puzzel.clueId) {

                let updateUser = await getFromDB("users", data.id);
        
                PubSub.publish({
                    event: "render_charater_interaction",
                    detail: {
                        response: {
                            data: updateUser,
                            story: storys,
                        }
                    }
                });
            // When you go to a riddle for a search area to update clues etc
            } else {

                let indexChapter = data.chapters.findIndex((chapter) => chapter.searchOnGoing === true);
                let chapterId = data.chapters.filter((chapter) => chapter.searchOnGoing).map(id => id.chapter)[0];
                
                if (chapterId === undefined) { 
                    console.log("error", undefined);
                    return;
                }

                let clues = await getFromDB("clues");
                let clue = clues.filter(clue => clue.clueId === puzzel.clueId)[0];
                
                let allStorys = await getFromDB("storyTelling");

                let storysSort = allStorys.sort((a, b) => (a.chapterId > b.chapterId) ? 1 : -1)

                let lastIndex = data.searchArea ? data.searchArea.length: 0;

                let nextChapter = storysSort.filter(story => story.partAfterSearch)[lastIndex];

                if (nextChapter) {

                    await updateArrayMap('users', data.id, 'chapters', indexChapter, { 
                        searchDone: true, searchOnGoing: false, onGoing: false, completed: true
                    });

                    await docUpdateArry("users", data.id, "searchArea", { searchArea: lastIndex });

                    await docUpdateArry("users", data.id, "chapters", {  
                        chapter: nextChapter.chapterId,
                        onGoing: true,
                        searchOnGoing: false,
                    });

                    await docUpdateArry("users", data.id, "clues", { clueId: clue.clueId });
            
                    let updateUser = await getFromDB("users", data.id);

                    PubSub.publish({
                        event: "render_map",
                        detail: {
                            response: {
                                data: updateUser
                            }
                        }
                    });
                }
            }

        } else {
            console.log("Wrong answer");
        }
    });
}