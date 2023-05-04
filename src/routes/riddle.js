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
    let { data, clue, storys } = response;

    console.log(response);
    let app = document.querySelector("#app");
    app.innerHTML = "";

    let riddleContainer = createElement("div", "", "riddleContainer");
    app.append(riddleContainer);

    riddleContainer.innerHTML = `
        <div id="riddleBox">
            <div>
                <div id="riddleIcon"></div>
                <div id="riddleText">
                    <p>${clue.riddle}</p>
                </div>
                <input type="text" id="riddleAnswer">
                <div>
                    <button id="btnAnswerRiddle"> send answer </button>
                </div>
            </div>
        </div>
    `;

    answerListener(data, clue, storys);
}

function answerListener (data, clue, storys) {

    document.querySelector("#btnAnswerRiddle").addEventListener("click", async (e) => {
        e.preventDefault();
        let riddleAnswerInput = document.querySelector("#riddleAnswer").value;

        if (riddleAnswerInput === clue.riddleAnswer) {

                let indexChapter = data.chapters.findIndex((chapter) => chapter.onGoing === true);
                let chapterId = data.chapters.filter((chapter) => chapter.onGoing).map(id => id.chapter)[0];

                // kommer göras uppdatering
                await updateArrayMap('users', data.id, 'chapters', indexChapter, { onGoing: false, completed: true, searchDone: true });

                await docUpdateArry("users", data.id, "chapters", {  
                    chapter: chapterId + 1,
                    completed: false,
                    onGoing: true,
                    searchArea: false,
                    searchDone: false,
                });

                await docUpdateArry("users", data.id, "clues", { clue: clue.clue, informaion: clue.information });

                let updateUser = await getFromDB("users", data.id);

                PubSub.publish({
                    event: "render_map",
                    detail: {
                        response: {
                            data: updateUser
                        }
                    }
                });

        } else {
            console.log("Wrong answer");
        }
    });
}