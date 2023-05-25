import { PubSub } from "../../../utilities/pubsub.js";
import { createElement, fadeInElement, fadeOutElement } from "../../js/functions.js";

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

async function render_character_interaction({ response }, counter = 0) {
    let { data, story, found } = response;
    let app = document.querySelector("#app");

    // if (!found) {
    //     app.innerHTML = "";
    // }

    let containerDialog = createElement("div", "", "containerDialog");
    app.appendChild(containerDialog);

    if (found) {
        containerDialog.classList.add("chapterFoundReading");
    }

    containerDialog.style.backgroundImage = `url()`;

    let dialogBox = createElement("div", "", "dialogBox");
    containerDialog.append(dialogBox);

    fadeInElement(containerDialog);

    let personDialog = createElement("div", "", "personDialog");
    personDialog.textContent =  story.character.charAt(0).toUpperCase() + story.character.slice(1);
    dialogBox.appendChild(personDialog);

    let dialogText = createElement("div", "", "dialogText");
    dialogBox.appendChild(dialogText);

    let text = story.partsChapter[counter];

    writeOutText(dialogText, text);

    let nextPart = createElement("div", "nextPart", "nextPart");
    nextPart.innerHTML = `
        <div>
            <i class="fa-solid fa-arrow-right"></i>
        </div>
    `;

    dialogBox.appendChild(nextPart);
    nextPartListener(data, story, found, counter);
}

function nextPartListener(data, story, found, counter) {
    let nextPartButton = document.querySelector("#nextPart");
    let dialogText = document.querySelector("#dialogText");

    nextPartButton.addEventListener("click", () => {
        counter++;
        if (counter < story.partsChapter.length) {
            document.querySelector("#nextPart").classList.remove("fade-in");
            let text = story.partsChapter[counter];
            writeOutText(dialogText, text);
        } else {
            if (!found) {
                nextPartButton.remove();
        
                PubSub.publish({
                    event: "render_charater_interaction_btns",
                    detail: {
                    response: {
                            data: data,
                            story: story,
                        },
                    },
                });
            } else {
                let nextChapter = data.chapters.find((chapter) => chapter.chapter === story.chapterId + 1);
                nextPartButton.remove();
        
                if (nextChapter === undefined || nextChapter) {
                    PubSub.publish({
                    event: "render_charater_interaction_reOpen",
                    detail: {
                        response: {
                                data: data,
                                story: story,
                            },
                        },
                    });
                } else {
                    document.querySelector("#containerDialog").remove();
                }
            }
        }
    });
}

function writeOutText(element, text) {
    let index = 0;
    const speed = 10;
    element.textContent = "";

    function addNextLetter() {
        if (index < text.length) {
            element.textContent += text[index];
            index++;
            setTimeout(addNextLetter, speed);
        } else {
            fadeInElement(document.querySelector("#nextPart"))
        }
    }
    addNextLetter();
}