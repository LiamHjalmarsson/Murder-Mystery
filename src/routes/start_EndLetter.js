import { PubSub } from "../utilities/pubsub.js";
import { docUpdate } from "../utilities/functions/firebase_functions.js"

export default {}

;(() => {

    PubSub.subscribe({
        event: "render_start_endLetter",
        listener: render_start_endLetter
    });

})();

function render_start_endLetter (user) {
    let app = document.querySelector("#app");
    app.innerHTML = "";

    console.log(user);
    const div = document.createElement('div');
    const img = document.createElement('img');
    img.src = '../../library/startletter.png';

    let box = document.createElement('div');
    box.id = "startletterBox";

    const button = document.createElement('button');
    button.id = "startGameLetter";
    button.textContent = 'Go to map';
    button.addEventListener('click', ()=> {

        docUpdate("users", user.id, { newStart: false });
        PubSub.publish({
            event: "render_map",
            detail: {
                response: {
                    data: user
                }
            }
        });

        PubSub.publish({
            event: "render_counDown"
        });
    });

    div.appendChild(img);
    div.appendChild(box);
    box.append(button);

    app.append(div);
}