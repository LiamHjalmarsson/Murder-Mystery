
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

async function render_suspects () {
 let app = document.querySelector("#app");
 app.innerHTML ="";
 let suspectsWrapper = createElement("div","", "wrapSus");

 app.append(suspectsWrapper);
 var rubrik = createElement("div","rubrik");
var div = document.createElement('H1');
    div.textContent = "Misstänkta";
   rubrik.appendChild(div);
  
   let exitBtn = createElement("div", "Xbtn");
   exitBtn.innerHTML = "X";
   rubrik.append(exitBtn);

    // exitBtn.addEventListener("click");
    // console.log("Klickad");


    let suspectsContainer = createElement("div", "suspectsContainer");
     suspectsWrapper.append(rubrik, suspectsContainer);

    let characters = await getFromDB ("charaters");
    console.log(characters);
    let dataDB = await getFromDB("charaters", "Alfred");
    console.log(dataDB);

    let susBtns = [
        {
            id: "JosettePic",
            icon: "../../src/lib/ProfilePics/Josette.png",
            text: "Josette",
        },

        {
            id: "BjörnPic",
            icon: "../../src/lib/ProfilePics/Björn.png",
            text: "Björn",
        },
        {
            id: "BritaPic",
            icon: "../../src/lib/ProfilePics/Brita.png",
            text: "Brita",
            },

        {
            id: "JuliettePic",
            icon: "../../src/lib/ProfilePics/Juliette.png",
            text: "Juliette",
        },
        {
            id: "IngridPic",
            icon: "../../src/lib/ProfilePics/Ingrid.png",
            text: "Ingrid",
            },

        {
            id: "GustafPic",
            icon: "../../src/lib/ProfilePics/Gustaf.png",
            text: "Gustaf",
            },
            {
               
                id: "JanusPic",
                icon: "../../src/lib/ProfilePics/Janus.png",
                text: "Janus",
            },

    ];
    console.log(susBtns);

    susBtns.forEach(btn => {
        let SusBtnBox = createElement("div", "susBtn", btn.id);
         let iconsDiv = createElement("div", "", "iconSus");
         iconsDiv.style.backgroundImage = `url(${btn.icon})`;
         let name = createElement("div","name");
         name.textContent =(btn.text);
         
   
        // SusBtnBox.addEventListener("click", () => {
        //     diffrentBtns(btn.text);
        // });
        
         SusBtnBox.append(iconsDiv);
         SusBtnBox.append(name);
         suspectsContainer.append(SusBtnBox);

   });

 

    
}