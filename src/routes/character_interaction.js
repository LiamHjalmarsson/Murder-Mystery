import { PubSub } from "../utilities/pubsub.js";
import { createElement } from "../lib/js/functions.js";
import { docUpdateArry, getFromDB, updateArrayMap } from "../utilities/functions/firebase_functions.js";

export default {}

;(() => {

    PubSub.subscribe({
        event: "render_charater_interaction",
        listener: render_character_interaction
    });

})();

function render_character_interaction ( { response }, counter = 0 ) {
    let { data, story } = response;

    let app = document.querySelector("#app");
    app.innerHTML = "";

    let containerDialog = createElement("div", "", "containerDialog");
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
            document.querySelector("#nextPart").remove();
            btnsChoice(data);
        } 
    });
}

async function btnsChoice (data) {

    let choiseContainer = createElement("div", "", "choiseContainer");
    document.querySelector("#containerDialog").appendChild(choiseContainer);

    choiseContainer.innerHTML = `
        <div>
            <button> Find a new character </button>
        </div>
        <div> 
            <button id="btnClueSearch"> Go to a search area </button>
        </div>
    `;

    console.log(data);
    answerListener(data);
}

function answerListener (data) {

    console.log(data, "correct");

    document.querySelector("#btnClueSearch").addEventListener("click", async (e) => {
        e.preventDefault();
       
               /*  let indexChapter = data.chapters.findIndex((chapter) => chapter.searchOnGoing === true); */
                let chapterId = data.chapters.filter((chapter) => chapter.completed).map(id => id.chapter)[0];
                console.log(chapterId);

                console.log(indexChapter, chapterId);

                let characters = await getFromDB("characters");

                let character = characters.some(character => character.Id === character.characterId);   

              /*   await updateArrayMap('users', data.id, 'chapters', indexChapter, { 
                    searchDone: true, searchOnGoing: false, onGoing: false 
                }); */
    
                await docUpdateArry("users", data.id, "chapters", {  
                    chapter: chapterId + 1,
                    completed: false,
                    onGoing: true,
                    searchDone: false,
                    searchOnGoing: true,
                });
    
               /*  await docUpdateArry("users", data.id, "characters", { characterId: character.Id });
     */
                let updateUser = await getFromDB("users", data.id);
    
                console.log(updateUser);
                PubSub.publish({
                    event: "render_map",
                    detail: {
                        response: {
                            data: updateUser
                        }
                    }
                });
    })
}
