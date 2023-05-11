import { getFromDB } from "../utilities/functions/firebase_functions.js";
import { PubSub } from "../utilities/pubsub.js";
import { createElement } from "../lib/js/functions.js";

export default {}

;(() => {
    PubSub.subscribe({
        event: "render_guess_murder",
        listener: render_guess_murder
    });
})();


async function render_guess_murder ({response}) {
    let {data} = response;
 let app = document.querySelector("#app");
 let guessMurderWrapper = createElement("div","", "wrapSus");

 app.append(guessMurderWrapper);
 var rubrik = createElement("div","rubrik");
var div = document.createElement('H1');
    div.textContent = "Gissa mördaren!";
   rubrik.appendChild(div);
  
   let exitBtn = createElement("div","","Xbtn");
   exitBtn.innerHTML = "X";
   rubrik.append(exitBtn);
 exitBtn.addEventListener("click", () => {
    guessMurderWrapper.remove();
 });

    let GuessMurderContainer = createElement("div", "suspectsContainer");
    guessMurderWrapper.append(rubrik, GuessMurderContainer);

    let characters = await getFromDB ("charaters");
    console.log(characters);
    

    

    characters.forEach(chapter => {
        let SusBtnBox = createElement("div", "susBtn", chapter.imgref);
         let iconsDiv = createElement("div", "", "iconSus");

        //  const found = data.chapter.some(userChapter => userChapter.charaters === characters.Id);

        //  if (found) {
        //     iconsDiv.addEventListener("click", (e) => {
        //         PubSub.publish({
        //             event: "render_component_suspects_bio",
        //             detail: chapter
        //         });
        //     });
        // }
         iconsDiv.style.backgroundImage = `url(../../src/lib/ProfilePics/${chapter.ImgProfile}.png)`;
       
       
         iconsDiv.addEventListener("click", () => {
            
            PubSub.publish({
                event: "render_guess_weaponMotive",
                detail: chapter
            })
         })
         let name = createElement("div","name");
         name.textContent =(chapter.fullName);
        
         SusBtnBox.append(iconsDiv);
         SusBtnBox.append(name);
         GuessMurderContainer.append(SusBtnBox);

   });

 

    
}