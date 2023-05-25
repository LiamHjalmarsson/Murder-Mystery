import { PubSub } from "../../../utilities/pubsub.js";
import { createElement, fadeInElement } from "../../js/functions.js";
import { docUpdateArry, getFromDB, updateArrayMap, docUpdate } from "../../../utilities/functions/firebase_functions.js";

export default {}

;(() => {

    PubSub.subscribe({
        event: "render_riddle",
        listener: render_riddle
    });

})();

function render_riddle ( { response } ) {
    let app = document.querySelector("#app");

    let riddleContainer = createElement("div", "", "riddleContainer");
    app.append(riddleContainer);

    riddleContainer.innerHTML = `
        <div id="riddleBox">
            <div>
                <div id="riddleIcon"></div>
                <div id="riddleText">
                    <p>${response.puzzel.riddle}</p>
                </div>
                <div id="riddleTip">
                    <p>${response.puzzel.amountOfWords}</p>
                </div>
                <input type="text" id="riddleAnswer">
                <div>
                    <button id="btnAnswerRiddle"> Skicka in ditt svar </button>
                </div>
            </div>
        </div>
    `;

    answerListener(response);

    fadeInElement(riddleContainer);
}

function answerListener (response) {
    let { data, puzzel, storys } = response;

    document.querySelector("#btnAnswerRiddle").addEventListener("click", async (e) => {
        e.preventDefault();
        let riddleAnswerInput = document.querySelector("#riddleAnswer").value.toLowerCase();

        if (riddleAnswerInput === puzzel.removeThis || riddleAnswerInput === puzzel.answer) {
            if (!puzzel.clueId) {
                btnCharacterInteraction(data, storys);
            } else {
                btnSearchArea(data, puzzel);
            }
        } else {
            document.querySelector("#riddleAnswer").style.borderColor = "red";
        }
    });
}

async function btnCharacterInteraction (data, storys) {
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
}

async function btnSearchArea (data, puzzel) {
    let indexChapter = data.chapters.findIndex((chapter) => chapter.searchOnGoing);
    let chapterId = data.chapters.filter((chapter) => chapter.searchOnGoing).map(id => id.chapter)[0];
    
    if (chapterId === undefined) { 
        return;
    }

    let clues = await getFromDB("clues");
    let clue = clues.filter(clue => clue.clueId === puzzel.clueId)[0];
    
    let allStorys = await getFromDB("storyTelling");
    let storysSort = allStorys.sort((a, b) => (a.chapterId > b.chapterId) ? 1 : -1);
    let lastIndex = data.searchArea ? data.searchArea.length: 0;

    if (clue.clueId !== 6 && clue.clueId !== 5) {
        let nextChapter = storysSort.filter(story => story.partAfterSearch)[lastIndex];

        if (nextChapter !== undefined) {

            await docUpdateArry("users", data.id, "chapters", {  
                chapter: nextChapter.chapterId,
                onGoing: true,
                searchOnGoing: false,
            });

            await updateArrayMap('users', data.id, 'chapters', indexChapter, { 
                searchDone: true, searchOnGoing: false, onGoing: false, completed: true
            });
        }
    } else {

        if (clue.clueId === 6 ) {
            await updateArrayMap('users', data.id, 'chapters', indexChapter, { 
                searchDone: true, searchOnGoing: false, onGoing: false, completed: true, gameFinished: true
            });

            await docUpdateArry("users", data.id, "chapters", {  
                chapter: 12,
                onGoing: true,
                searchOnGoing: false,
            });

        } else {
            await updateArrayMap('users', data.id, 'chapters', indexChapter, { 
                searchDone: true, searchOnGoing: false, onGoing: false, completed: true, gameFinished: true
            });

            await docUpdate("users", data.id, { gameFinished: true } );

        }
    }

    await docUpdateArry("users", data.id, "searchArea", { searchArea: lastIndex });
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