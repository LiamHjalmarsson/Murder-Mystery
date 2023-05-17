import { PubSub } from "../../../utilities/pubsub.js";
import { createElement } from "../../js/functions.js";
import { docUpdateArry, getFromDB, updateArrayMap } from "../../../utilities/functions/firebase_functions.js";

export default {}

;(() => {

    PubSub.subscribe({
        event: "render_charater_interaction_btns",
        listener: render_character_interaction_btns
    });

})();

async function render_character_interaction_btns ( { response } ) {
    let { data, story } = response;
    
    let choiseContainer = createElement("div", "", "choiseContainer");
    document.querySelector("#dialogBox").appendChild(choiseContainer);

    let gotClue = data.clues.find((clue) => clue.clueId === story.clueId);

    if (story.secoundCharacter) {
        choiseContainer.innerHTML = `
            <div>
                <button id="btnCharacterFind"> Find a new character 1</button>
            </div>
            <div>
                <button id="btnsecoundCharacterFind"> Find a new character 2</button>
            </div>
        `;
    }
    else if (gotClue && story.alley) {
        choiseContainer.innerHTML = `
        <div> 
            <button id="btnContuineOnPausedChapter"> Continue old path  </button>
        </div>
    `;
    } else if (gotClue && !story.alley) {
        choiseContainer.innerHTML = `
        <div>
            <button id="btnCharacterFind"> Find a new character </button>
        </div>
        <div> 
            <button id="btnContuineOnPausedChapter"> Continue old path  </button>
        </div>
    `;
    }
    else if (story.locationSearch && !story.alley ) {
        choiseContainer.innerHTML = `
            <div>
                <button id="btnCharacterFind"> Find a new character </button>
            </div>
            <div> 
                <button id="btnClueSearch"> Go to a search area </button>
            </div>
        `;
    } 
    else if (story.locationSearch && story.alley) {
        choiseContainer.innerHTML = `
            <div> 
                <button id="btnClueSearch"> Go to a search area </button>
            </div>
        `;
    } 
    else {
        choiseContainer.innerHTML = `
            <div>
                <button id="btnCharacterFind"> Find a new character </button>
            </div>
        `;
    }

    answerListener(data, story);
}

function answerListener (data, story) {

    if (document.querySelector("#btnClueSearch")) {
        btnSearchListner(data);
    }

    if (document.querySelector("#btnCharacterFind")) {
        btnCharacterFindListner(data, story);
    }

    if (document.querySelector("#btnsecoundCharacterFind")) {
        btnSecoundCharacterOption(data, story);
    }

    if (document.querySelector("#btnContuineOnPausedChapter")) {
        btnContuineOnPausedChapter(data);
    }

}

function btnSearchListner (data) {
    document.querySelector("#btnClueSearch").addEventListener("click", async () => {
        let indexChapter = data.chapters.findIndex((chapter) => chapter.onGoing === true);
        let indexPaused = data.chapters.findIndex((chapter) => chapter.paused === true);

        if (indexPaused) {
            await updateArrayMap('users', data.id, 'chapters', indexPaused, { 
                paused: false
            });
        }

        await updateArrayMap('users', data.id, 'chapters', indexChapter, { 
            searchOnGoing: true, completed: true
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
}

function btnCharacterFindListner (data, story) {
    document.querySelector("#btnCharacterFind").addEventListener("click", async () => {
        let indexChapter = data.chapters.findIndex((chapter) => chapter.onGoing);
        
        await updateArrayMap('users', data.id, 'chapters', indexChapter, { 
            completed: true, onGoing: false
        });

        let completedChapters = data.chapters.filter((chapter) => chapter.onGoing);
        let lastCorrectChapter = completedChapters.length > 0 ? completedChapters[completedChapters.length - 1].chapter : null;

        await docUpdateArry("users", data.id, "characters", { characterId: story.characterId });
    
        await docUpdateArry("users", data.id, "chapters", {  
            chapter: lastCorrectChapter + 1,
            onGoing: true,
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
}

function btnSecoundCharacterOption (data, story) {
    document.querySelector("#btnsecoundCharacterFind").addEventListener("click", async (e) => {
        let indexChapter = data.chapters.findIndex((chapter) => chapter.onGoing);
        
        await updateArrayMap('users', data.id, 'chapters', indexChapter, { 
            completed: true, onGoing: false
        });

        let completedChapters = data.chapters.filter((chapter) => chapter.onGoing);
        let lastCorrectChapter = completedChapters.length > 0 ? completedChapters[completedChapters.length - 1].chapter : null;

        await docUpdateArry("users", data.id, "characters", { characterId: story.characterId });
    
        await docUpdateArry("users", data.id, "chapters", {  
            chapter: lastCorrectChapter + 2,
            onGoing: true,
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
}

function btnContuineOnPausedChapter(data) {
    document.querySelector("#btnContuineOnPausedChapter").addEventListener("click", async () => {
        let indexChapterPaused = data.chapters.findIndex((chapter) => chapter.paused === true);
        let indexChapter = data.chapters.findIndex((chapter) => chapter.onGoing);
        
        await updateArrayMap('users', data.id, 'chapters', indexChapter, { 
            completed: true, onGoing: false
        });
        
        await updateArrayMap('users', data.id, 'chapters', indexChapterPaused, { 
            onGoing: true, paused: false
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
}