import { PubSub } from "../../../utilities/pubsub.js";
import { startCountdown } from "../../../utilities/functions/firebase_functions.js";

export default {}

;(() => {
    
    PubSub.subscribe({
        event: "render_counDown",
        listener: () => {
            let user = JSON.parse(localStorage.getItem("user"));
            startCountdown(user.userId);
        }
    });

    // PubSub.subscribe({
    //     event: "render_stopCounDown",
    //     listener: stopCountDown
    // });

})();

// let countdownStart;

// function countDown() {
//     // let user = JSON.parse(localStorage.getItem("user"));
//     let countDown = JSON.parse(localStorage.getItem("userCount"));

//     countdownStart = countDown.userCount;

//     let currentTime = new Date().getTime();
//     let elapsedTime = currentTime - countdownStart;
//     let remainingTime = 4 * 60 * 60 * 1000 - elapsedTime;

//     if (remainingTime > 0) {
//         setInterval(function() {
//             currentTime = new Date().getTime();
//             elapsedTime = currentTime - countdownStart;
//             remainingTime = 4 * 60 * 60 * 1000 - elapsedTime;
//             displayCountdown(remainingTime);
//         }, 1000);
//     }
// }

// function displayCountdown(remainingTime) {
//     let hours = Math.floor(remainingTime / (1000 * 60 * 60));
//     let minutes = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60));
//     let seconds = Math.floor((remainingTime % (1000 * 60)) / 1000);

//     if (document.querySelector("#timeLeft")) {
//         document.querySelector("#timeLeft").innerHTML = `Timer: <br> ${hours}: ${minutes}m : ${seconds}s`;
//     }
// }