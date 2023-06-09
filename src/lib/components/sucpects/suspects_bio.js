import { PubSub } from "../../../utilities/pubsub.js";
import { createElement } from "../../js/functions.js";

export default {}

;(() => {
    PubSub.subscribe({
        event: "render_component_suspects_bio",
        listener: render_component_suspects_bio
    });
})();

function render_component_suspects_bio (chapter) {
    let app = document.querySelector("#app");
    let bioWrapper = createElement("div","", "wrapBio");
    app.appendChild(bioWrapper);

    bioWrapper.innerHTML = `
        <div id="SusBio">
            <div class="CloseBio">
                <div class="close" id="containerClose"><i class="fa-solid fa-xmark"></i></div>
            </div>
            
            <div id="info">
                <h1 class="title1">${chapter.fullName}</h1>
                <h4 class="title2">${chapter.title}</h4>
            </div>    

            <div id="BioInfo">
                <div id="SuspectInfo">
                    <p class="bioChar">${chapter.bio}</p>
                
                    <div id="ImgBox">
                            <div class="imgSus"></div>
                    </div>
                </div>  
            </div>
        </div>
    `

    document.querySelector(".imgSus").style.backgroundImage = `url(${chapter.imgref})`;

    document.querySelector(".CloseBio").addEventListener("click", () => {
        bioWrapper.remove();
    });
}