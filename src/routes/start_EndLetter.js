import { PubSub } from "../utilities/pubsub.js";

export default {}

;(() => {

    PubSub.subscribe({
        event: "render_start_endLetter",
        listener: render_start_endLetter
    });

})();

function render_start_endLetter () {
    console.log("hello");
    const div = document.createElement('div');
    const img = document.createElement('img');
    img.src = 'path/to/startletter.png';

    const button = document.createElement('button');
    button.textContent = 'Go to map';
    button.addEventListener('click', ()=> {
        const user= '...';

        PubSub.publish({
            event: "render_map",
            detail: {
                response: {
                    data: user
                }
            }
        })
    });

    div.appendChild(img);
    div.appendChild(button);

    console.log ("hello");
}