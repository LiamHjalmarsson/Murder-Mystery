import { PubSub } from "../utilities/pubsub.js";
import { createElement } from "../lib/js/functions.js";
import { docUpdateArry, getFromDB, updateArrayMap } from "../utilities/functions/firebase_functions.js";

export default {}

;(() => {

    PubSub.subscribe({
        event: "render_charater_interaction",
        listener: render_character_interaction
    });

    PubSub.subscribe({
        event: "map_found_charater_interaction",
        listener: render_character_interaction
    });

})();

function render_character_interaction ( { response }, counter = 0 ) {
    let { data, story, found } = response;

    let app = document.querySelector("#app");

    if (!found) {
        app.innerHTML = "";
    }

    let containerDialog = createElement("div", "", "containerDialog");

    if (found) {
        containerDialog.classList.add("chapterFoundReading"); 
    }
    
    app.appendChild(containerDialog);

    containerDialog.style.backgroundImage = `url(../../src/lib/images/${story.imageRef}.jpg)`;

    let dialogBox = createElement("div", "", "dialogBox"); 
    containerDialog.append(dialogBox);

    dialogBox.innerHTML = `
        <div>
            <h3> ${ story.character } </h3>
        </div>
        <div id="dialogText"> 
            ${ story.partsChapter[counter] }
        </div>
        <div>
            <div id="nextPart"> -> </div>
        </div>
    `;

    document.querySelector("#nextPart").addEventListener("click", () => {
        counter++
        if (counter < story.partsChapter.length) {
            document.querySelector("#dialogText").innerHTML = story.partsChapter[counter];
        } else {

            if (found) {
                containerDialog.remove();
            } else {
                document.querySelector("#nextPart").remove();
                btnsChoice(data, story);
            }
        } 
    });
}

async function btnsChoice (data, story) {
    let choiseContainer = createElement("div", "", "choiseContainer");
    document.querySelector("#containerDialog").appendChild(choiseContainer);

    // let found = data.chapters.find(chapter => chapter.chapter === story.chapterId + 1);
    
    // console.log(found);
    // if (found == undefined) {
    //     found = false;
    // } 

    // if (found) {
    //     PubSub.publish({
    //         event: "render_map",
    //         detail: {
    //             response: {
    //                 data: data
    //             }
    //         }
    //     });
    // }

    if (story.locationSearch && !story.alley ) {
        choiseContainer.innerHTML = `
            <div>
                <button id="btnCharacterFind"> Find a new character </button>
            </div>
            <div> 
                <button id="btnClueSearch"> Go to a search area </button>
            </div>
        `;
    } else if (story.locationSearch && story.alley) {
        choiseContainer.innerHTML = `
            <div> 
                <button id="btnClueSearch"> Go to a search area </button>
            </div>
        `;
    } else {
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

        document.querySelector("#btnClueSearch").addEventListener("click", async (e) => {
            e.preventDefault();
            
            let indexChapter = data.chapters.findIndex((chapter) => chapter.onGoing === true);
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

    if (document.querySelector("#btnCharacterFind")) {
        document.querySelector("#btnCharacterFind").addEventListener("click", async (e) => {

            e.preventDefault();

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
}


            // prova att göra en collection för story och en för search area 
            // när man klickar på knappen för marker går man in i collection story och går nan'
            // in i search läger man till sök område.

            // när man är klar med en search ska man också gå vidare till en ny story.. 