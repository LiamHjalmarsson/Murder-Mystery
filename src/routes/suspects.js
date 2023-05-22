
import { getFromDB } from "../utilities/functions/firebase_functions.js";
import { PubSub } from "../utilities/pubsub.js";
import { createElement } from "../lib/js/functions.js";

export default {}

;(() => {
    PubSub.subscribe({
        event: "render_suspects",
        listener: render_suspects

    });
})();

async function render_suspects ({response}) {
    let {data} = response;
    console.log(data);
 let app = document.querySelector("#app");
 let suspectsWrapper = createElement("div","", "wrapSus");


 app.append(suspectsWrapper);
 var rubrik = createElement("div","rubrik");
var div = document.createElement('H1');
    div.textContent = "Misstänkta";
   rubrik.appendChild(div);
  
   let exitBtn = createElement("div","","Xbtn");
   exitBtn.innerHTML = "X";
   rubrik.append(exitBtn);
 exitBtn.addEventListener("click", () => {
 suspectsWrapper.remove();
 });

    let app = document.querySelector("#app");
    let suspectsWrapper = createElement("div","", "wrapSus");

    app.append(suspectsWrapper);
    var rubrik = createElement("div","rubrik");
    var div = document.createElement('H1');
    div.textContent = "Karaktärer";
    rubrik.appendChild(div);
    
    let exitBtn = createElement("div","","Xbtn");
    exitBtn.innerHTML = `<i class="fa-solid fa-xmark"></i>`;
    rubrik.append(exitBtn);
    exitBtn.addEventListener("click", () => {
        suspectsWrapper.remove();
    });
>>>>>>> Stashed changes

    let suspectsContainer = createElement("div", "suspectsContainer");
     suspectsWrapper.append(rubrik, suspectsContainer);

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
                event: "render_component_suspects_bio",
                detail: chapter
            })
         })
         let name = createElement("div","name");
         name.textContent =(chapter.fullName);
        
         SusBtnBox.append(iconsDiv);
         SusBtnBox.append(name);
         suspectsContainer.append(SusBtnBox);

   });

 

    
}