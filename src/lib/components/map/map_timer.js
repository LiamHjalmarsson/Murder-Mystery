import { PubSub } from "../../../utilities/pubsub.js";

export default {}

;(() => {
    
    PubSub.subscribe({
        event: "render_counDown",
        listener: countDown
    });

    PubSub.subscribe({
        event: "render_stopCounDown",
        listener: stopCountDown
    });

})();

let intervalId;

function countDown() {
    let remainingTime = 4 * 60 * 60; 
    
    intervalId = setInterval(() => {
        if (remainingTime > 0) {
            remainingTime--;

            let remainingHours = Math.floor(remainingTime / 3600);
            let remainingMinutes = Math.floor((remainingTime % 3600) / 60);
            let remainingSeconds = remainingTime % 60;

            if (document.querySelector("#timeLeft")) {
                document.querySelector("#timeLeft").innerHTML = `Timer: <br> ${remainingHours}: ${remainingMinutes}m : ${remainingSeconds}s`
            }
        } else {
            clearInterval(intervalId);
        }
    }, 1000);
}

function stopCountDown() {
    clearInterval(intervalId);
}
