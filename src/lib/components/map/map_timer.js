import { PubSub } from "../../../utilities/pubsub.js";
import { startCountdown } from "../../../utilities/functions/countDownTimer.js";

export default {}

;(() => {
    
    PubSub.subscribe({
        event: "render_counDown",
        listener: () => {
            let user = JSON.parse(localStorage.getItem("user"));
            startCountdown(user.userId);
        }
    });

})();