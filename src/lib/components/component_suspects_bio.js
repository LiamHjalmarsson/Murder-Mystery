import { PubSub } from "../../utilities/pubsub.js";
import { createElement } from "../js/functions.js";

export default {}

;(() => {
    PubSub.subscribe({
        event: "render_component_suspects_bio",
        listener: render_component_suspects_bio
    });
})();

function render_component_suspects_bio () {
    console.log("hello");
    let app = document.querySelector("#app");
    app.innerHTML ="";
    let bioWrapper = createElement("div","", "wrapBio");
    app.append(bioWrapper);

    var nameRubrik = createElement("H1");
    // funktion som hämtar rätt namn till det som användaren klickat på
    nameRubrik.textContent = "Alfred";
    nameRubrik.appendChild(bioWrapper);

    let X = createElement("div", "exitBtn");
    X.inneerHTML = "X";
    nameRubrik.append(X);
}