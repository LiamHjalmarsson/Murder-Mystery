import { PubSub } from "../utilities/pubsub.js";
import { createElement } from "../lib/js/functions.js";
import { docUpdateArry, getFromDB, updateArrayMap } from "../utilities/functions/firebase_functions.js";

export default {}

;(() => {

    // PubSub.subscribe({
    //     event: "render_charater_interaction",
    //     listener: render_character_interaction
    // });

    // PubSub.subscribe({
    //     event: "map_found_charater_interaction",
    //     listener: render_character_interaction
    // });

})();

// function render_character_interaction ( { response }, counter = 0 ) {
//     let { data, story, found } = response;
//     let app = document.querySelector("#app");

//     if (!found) {
//         app.innerHTML = "";
//     }

//     let containerDialog = createElement("div", "", "containerDialog");
//     app.appendChild(containerDialog);

//     if (found) {
//         containerDialog.classList.add("chapterFoundReading"); 
//     }

//     containerDialog.style.backgroundImage = `url(../../src/lib/images/${story.imageRef}.jpg)`;

//     let dialogBox = createElement("div", "", "dialogBox"); 
//     containerDialog.append(dialogBox);

//     dialogBox.innerHTML = `
//         <div>
//             <h3> ${ story.character } </h3>
//         </div>
//         <div id="dialogText"> 
//             ${ story.partsChapter[counter] }
//         </div>
//         <div>
//             <div id="nextPart"> -> </div>
//         </div>
//     `;

//     document.querySelector("#nextPart").addEventListener("click", () => {
//         counter++
//         if (counter < story.partsChapter.length) {
//             document.querySelector("#dialogText").innerHTML = story.partsChapter[counter];
//         } else {
//             let choiseContainer = createElement("div", "", "choiseContainer");
//             document.querySelector("#containerDialog").appendChild(choiseContainer);

//             if (!found) {

//                 document.querySelector("#nextPart").remove();
//                 btnsChoice(data, story);

//             } else {
//                 let nextChapter = data.chapters.find(chapter => chapter.chapter === story.chapterId + 1); 

//                 if (nextChapter === undefined) {
//                     renderCharacterFindButton(data, story);
//                 }
//             }
//         } 
//     });
// }

// async function btnsChoice (data, story) {
//     let choiseContainer = createElement("div", "", "choiseContainer");
//     document.querySelector("#containerDialog").appendChild(choiseContainer);

//     if (story.secoundCharacter) {
//         choiseContainer.innerHTML = `
//             <div>
//                 <button id="btnCharacterFind"> Find a new character </button>
//             </div>
//             <div>
//                 <button id="btnsecoundCharacterFind"> Find a new character </button>
//             </div>
//         `;
//     }
//     else if (story.locationSearch && !story.alley ) {
//         choiseContainer.innerHTML = `
//             <div>
//                 <button id="btnCharacterFind"> Find a new character </button>
//             </div>
//             <div> 
//                 <button id="btnClueSearch"> Go to a search area </button>
//             </div>
//         `;
//     } 
//     else if (story.locationSearch && story.alley) {
//         choiseContainer.innerHTML = `
//             <div> 
//                 <button id="btnClueSearch"> Go to a search area </button>
//             </div>
//         `;
//     } 
//     else {
//         choiseContainer.innerHTML = `
//             <div>
//                 <button id="btnCharacterFind"> Find a new character </button>
//             </div>
//         `;
//     }
//     answerListener(data, story);
// }

// function answerListener (data, story) {

//     if (document.querySelector("#btnClueSearch")) {
//         document.querySelector("#btnClueSearch").addEventListener("click", async () => {
//             let indexChapter = data.chapters.findIndex((chapter) => chapter.onGoing === true);
//             await updateArrayMap('users', data.id, 'chapters', indexChapter, { 
//                 searchOnGoing: true, completed: true
//             });

//             let updateUser = await getFromDB("users", data.id);
        
//             PubSub.publish({
//                 event: "render_map",
//                 detail: {
//                     response: {
//                         data: updateUser
//                     }
//                 }
//             });
//         });
//     }

//     if (document.querySelector("#btnCharacterFind")) {
//         document.querySelector("#btnCharacterFind").addEventListener("click", async () => {
//             let indexChapter = data.chapters.findIndex((chapter) => chapter.onGoing);
            
//             await updateArrayMap('users', data.id, 'chapters', indexChapter, { 
//                 completed: true, onGoing: false
//             });

//             let completedChapters = data.chapters.filter((chapter) => chapter.onGoing);
//             let lastCorrectChapter = completedChapters.length > 0 ? completedChapters[completedChapters.length - 1].chapter : null;

//             await docUpdateArry("users", data.id, "characters", { characterId: story.characterId });
        
//             await docUpdateArry("users", data.id, "chapters", {  
//                 chapter: lastCorrectChapter + 1,
//                 onGoing: true,
//             });
        
//             let updateUser = await getFromDB("users", data.id);

//             PubSub.publish({
//                 event: "render_map",
//                 detail: {
//                     response: {
//                         data: updateUser
//                     }
//                 }
//             });
//         });
//     }

//     if (document.querySelector("#btnsecoundCharacterFind")) {
//         document.querySelector("#btnsecoundCharacterFind").addEventListener("click", async (e) => {
//             let indexChapter = data.chapters.findIndex((chapter) => chapter.onGoing);
            
//             await updateArrayMap('users', data.id, 'chapters', indexChapter, { 
//                 completed: true, onGoing: false
//             });

//             let completedChapters = data.chapters.filter((chapter) => chapter.onGoing);
//             let lastCorrectChapter = completedChapters.length > 0 ? completedChapters[completedChapters.length - 1].chapter : null;

//             await docUpdateArry("users", data.id, "characters", { characterId: story.characterId });
        
//             await docUpdateArry("users", data.id, "chapters", {  
//                 chapter: lastCorrectChapter + 2,
//                 onGoing: true,
//             });
        
//             let updateUser = await getFromDB("users", data.id);

//             PubSub.publish({
//                 event: "render_map",
//                 detail: {
//                     response: {
//                         data: updateUser
//                     }
//                 }
//             });
//         });
//     }
// }

// async function renderCharacterFindButton(data, story) {
//     let choiseContainer = createElement("div", "", "choiseContainer");
//     document.querySelector("#containerDialog").appendChild(choiseContainer);

//     choiseContainer.innerHTML = `
//         <div>
//             <button id="btnCharacterFind"> Find a new character </button>
//         </div>
//     `;
    
//     document.querySelector("#btnCharacterFind").addEventListener("click", async () => {
//         let chapterId = data.chapters.find((chapter) => chapter.chapter === story.chapterId);
//         let indexChapter = data.chapters.findIndex((chapter) => chapter.onGoing === true);
    
//         await updateArrayMap("users", data.id, "chapters", indexChapter, {
//             searchOnGoing: false,
//             searchPaused: true,
//             onGoing: false,
//         });
    
//         await docUpdateArry("users", data.id, "chapters", {
//             chapter: chapterId.chapter + 1,
//             onGoing: true,
//         });
    
//         let updateUser = await getFromDB("users", data.id);
    
//         PubSub.publish({
//             event: "render_map",
//             detail: {
//             response: {
//                 data: updateUser,
//             },
//             },
//         });
//     });
// }