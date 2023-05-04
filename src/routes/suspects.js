
import { getFromDB } from "../utilities/functions/firebase_functions.js";
import { PubSub } from "../utilities/pubsub.js";

export default {}

;(() => {
    PubSub.subscribe({
        event: "render_suspects",
        listener: render_suspects
    });
})();

async function render_suspects () {
   document.querySelector("#app").innerHTML = "";
    let div = document.createElement("div");
    div.textContent("Misstänkta");
    document.appendChild(div);
  

    var rubrik = document.createElement('H1');
    rubrik.innerHTML = "Misstänkta";

    let suspectsContainer = createElement("div", "", "suspectsContainer");
    app.append(suspectsContainer);

    let characters = await getFromDB ("charaters");
    console.log(characters);
    let dataDB = await getFromDB("charaters", "Alfred");
    console.log(dataDB);

    let susBtns = [
        {
            text: "Josette Elina Petrova",
            id: "JosettePic",
            icon: "(../../src/library/ProfilePics/Josette.png",
        },

        {
            text: "Björn Carl Höök",
            id: "BjörnPic",
            icon: "(../../src/library/ProfilePics/Björn.png",
        },
        {
            text: "Brita Lisa Johansdotter Höök",
            id: "BritaPic",
            icon: "(../../src/library/ProfilePics/Brita.png",
            },

        {
            text: "Juliette Abigail Williams",
            id: "JuliettePic",
            icon: "(../../src/library/ProfilePics/Juliette.png",
        },
        {
            text: "Ingrid Britta Borelius",
            id: "IngridPic",
            icon: "(../../src/library/ProfilePics/Ingrid.png",
            },

        {
            text: "Gustaf Otto Carl Borelius",
            id: "GustafPic",
            icon: "(../../src/library/ProfilePics/Gustaf.png",
            },
            {
                text: "Janus Sune Silversson",
                id: "JanusPic",
                icon: "(../../src/library/ProfilePics/Janus.png",
            },

    ];

    susBtns.forEach(btn => {
        let SusBtnBox = createElement("div", "susBtn", btn.id);

        let iconsDiv = createElement("div", "", "iconSus");
        iconsDiv.style.backgroundImage = ``;
        
        SusBtnBox.addEventListener("click", () => {
            diffrentBtns(btn.text);
        });
        
        SusBtnBox.append(iconsDiv, button);
        navigationBox.append(SusBtnBox);

        let exitBtn = createElement("div", "Xbtn", btn.id)
        exitBtn.innerHTML = "X";
        exitBtn.append(SusBtnBox);
    });

    
}