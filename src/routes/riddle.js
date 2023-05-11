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
    let { data, puzzel, storys } = response;

    let app = document.querySelector("#app");
    app.innerHTML = "";

    let riddleContainer = createElement("div", "", "riddleContainer");
    app.append(riddleContainer);

    riddleContainer.innerHTML = `
        <div id="riddleBox">
            <div>
                <div id="riddleIcon"></div>
                <div id="riddleText">
                    <p>${puzzel.riddle}</p>
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

            if (!puzzel.isClue) {

                if (storys.alley) {
                    data.chapters.forEach( async (chapter, index) => {
                        if (chapter.onGoing) {
                            let updateUser = await getFromDB("users", data.id);
        
                            PubSub.publish({
                                event: "render_charater_interaction",
                                detail: {
                                    response: {
                                        data: updateUser,
                                        story: storys
                                    }
                                }
                            });
                        }
                    });
                    
                } else {
                    // let indexChapter = data.chapters.findIndex((chapter) => chapter.onGoing === true);
                    // await updateArrayMap('users', data.id, 'chapters', indexChapter, { 
                    //     completed: true, onGoing: false
                    // });

                    let updateUser = await getFromDB("users", data.id);
        
                    PubSub.publish({
                        event: "render_charater_interaction",
                        detail: {
                            response: {
                                data: updateUser,
                                story: storys
                            }
                        }
                    });
                }

            } else {

                let indexChapter = data.chapters.findIndex((chapter) => chapter.searchOnGoing === true);
                let chapterId = data.chapters.filter((chapter) => chapter.searchOnGoing).map(id => id.chapter)[0];
                
                if (chapterId === undefined) { 
                    console.log("error", undefined);
                    return;
                    // PubSub.publish({ 
                    //     event: "",
                    //     detail: { 
                    //         params: "error", 
                    //         response : { 
                    //             error: "Problems loging in try again!" 
                    //         }
                    //     }
                    // });
                }

                let clues = await getFromDB("clues");

                let clue = clues.filter(clue => clue.clueId === puzzel.clueId)[0];  
                
                await updateArrayMap('users', data.id, 'chapters', indexChapter, { 
                    searchDone: true, searchOnGoing: false, onGoing: false, completed: true
                });
                
                let allStorys = await getFromDB("storyTelling");

                allStorys.forEach(async (story) => {
                    const storyUser = data.chapters.filter((chapter) => chapter.chapter === story.chapterId).map(chapter => chapter.chapterId);
                    
                    if (story.partAfterSearch && storyUser) {
                        await docUpdateArry("users", data.id, "chapters", {  
                            chapter: story.chapterId,
                            completed: false,
                            onGoing: true,
                            searchDone: false,
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
                });
            }

        } else {
            console.log("Wrong answer");
        }
    });
}