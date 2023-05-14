import { PubSub } from "../../../utilities/pubsub.js";
import { createElement } from "../../js/functions.js";
import { docUpdateArry, getFromDB, updateArrayMap } from "../../../utilities/functions/firebase_functions.js";

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
    app.appendChild(containerDialog);

    if (found) {
        containerDialog.classList.add("chapterFoundReading"); 
    }

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

    nextPartListner(data, story, found, counter);
}

function nextPartListner (data, story, found, counter) {
    document.querySelector("#nextPart").addEventListener("click", () => {
        counter++
        if (counter < story.partsChapter.length) {
            document.querySelector("#dialogText").innerHTML = story.partsChapter[counter];
        } else {

            if (!found) {
                document.querySelector("#nextPart").remove();

                PubSub.publish({
                    event: "render_charater_interaction_btns",
                    detail: {
                        response: {
                            data: data,
                            story: story
                        }
                    }
                });

            } else {
                let nextChapter = data.chapters.find(chapter => chapter.chapter === story.chapterId + 1); 
                document.querySelector("#nextPart").remove();
                
                if (nextChapter === undefined) {

                    PubSub.publish({
                        event: "render_charater_interaction_reOpen",
                        detail: {
                            response: {
                                data: data,
                                story: story
                            }
                        }
                    });
                } else {
                    document.querySelector("#containerDialog").remove();
                }
            }
        } 
    });
}