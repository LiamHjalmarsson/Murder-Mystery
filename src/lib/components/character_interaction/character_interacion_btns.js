import { PubSub } from "../../../utilities/pubsub.js";
import { createElement } from "../../js/functions.js";
import { docUpdateArry, getFromDB, updateArrayMap } from "../../../utilities/functions/firebase_functions.js";
import { timeSave } from "../../../utilities/functions/countDownTimer.js";

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
        btnTwoCharacterOption(choiseContainer, data, story);
    }
    else if (gotClue && story.alley) {
        btnPausedChapter(choiseContainer, data, story);
    } 
    else if (gotClue && !story.alley) {
        btnPausedAndCharacter(choiseContainer, data, story);
    }
    else if (story.locationSearch && !story.alley ) {
        btnCharacterSearch(choiseContainer, data, story);
    } 
    else if (story.locationSearch && story.alley) {
        btnSearch(choiseContainer, data, story);
    } 
    else {
        btnCharacterFind(choiseContainer, data, story);
    }

}

function btnTwoCharacterOption (choiseContainer, data, story) {
    choiseContainer.innerHTML = `
        <div>
            <button id="btnCharacterFind"> Hitta karaktär alternativ ett </button>
        </div>
        <div>
            <button id="btnsecoundCharacterFind"> Hitta karaktär alternativ två </button>
        </div>
    `;
    btnCharacterFindListner(data, story);
    btnSecoundCharacterOptionListner(data, story);
}

function btnPausedChapter (choiseContainer, data) {
    choiseContainer.innerHTML = `
        <div> 
            <button id="btnContuineOnPausedChapter"> Fortsätt på den gammla vägen </button>
        </div>
    `;
    btnContuineOnPausedChapterListner(data);
}

function btnPausedAndCharacter (choiseContainer, data, story) {
    choiseContainer.innerHTML = `
        <div>
            <button id="btnCharacterFind"> Hitta karaktär </button>
        </div>
        <div> 
            <button id="btnContuineOnPausedChapter"> Fortsätt på den gammla vägen </button>
        </div>
    `;
    btnCharacterFindListner(data, story);
    btnContuineOnPausedChapterListner(data);
}

function btnCharacterSearch (choiseContainer, data, story) {
    choiseContainer.innerHTML = `
        <div>
            <button id="btnCharacterFind"> Hitta karaktär </button>
        </div>
        <div> 
            <button id="btnClueSearch"> Gå till sökområde </button>
        </div>
    `;
    btnCharacterFindListner(data, story);
    btnSearchListner(data, story);
}

function btnSearch (choiseContainer, data, story) {
    choiseContainer.innerHTML = `
        <div> 
            <button id="btnClueSearch"> Gå till sökområde </button>
        </div>
    `;
    btnSearchListner(data, story);
}

function btnCharacterFind (choiseContainer, data, story) { 
    choiseContainer.innerHTML = `
        <div>
            <button id="btnCharacterFind"> Hitta karaktär </button>
        </div>
    `;

    btnCharacterFindListner(data, story);
}

function btnSearchListner (data, story) {
    document.querySelector("#btnClueSearch").addEventListener("click", async () => {
        let indexChapter = data.chapters.findIndex((chapter) => chapter.onGoing);
        let indexPaused = data.chapters.findIndex((chapter) => chapter.paused);
        let paused = data.chapters.some((chapter) => chapter.paused);

        await docUpdateArry("users", data.id, "characters", { characterId: story.characterId });

        if (paused) {
            await updateArrayMap('users', data.id, 'chapters', indexPaused, { 
                paused: false
            });
        }

        await updateArrayMap('users', data.id, 'chapters', indexChapter, { 
            searchOnGoing: true, completed: true
        });
    
        await timeSave(data);
        
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
    
        await timeSave(data);

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

function btnSecoundCharacterOptionListner (data, story) {
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

        await timeSave(data);
    
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

function btnContuineOnPausedChapterListner(data) {
    document.querySelector("#btnContuineOnPausedChapter").addEventListener("click", async () => {
        let indexChapterPaused = data.chapters.findIndex((chapter) => chapter.paused === true);
        let indexChapter = data.chapters.findIndex((chapter) => chapter.onGoing);
        
        await updateArrayMap('users', data.id, 'chapters', indexChapter, { 
            completed: true, onGoing: false
        });
        
        await updateArrayMap('users', data.id, 'chapters', indexChapterPaused, { 
            onGoing: true, paused: false
        });

        await timeSave(data);

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