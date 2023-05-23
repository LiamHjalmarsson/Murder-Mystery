import { PubSub } from "/src/utilities/pubsub.js";
import { getUserDoc } from "./utilities/functions/firebase_functions.js";

async function checkLoginStatus() {
    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (storedUser) {
        const isAuthenticated = await getUserDoc(storedUser.username, storedUser.password)
        
        if (!isAuthenticated) {
            localStorage.removeItem("user");
            return false;
        }
        return { detail: true, data: isAuthenticated }
    }
}

async function controlStatus () {
    let check = await checkLoginStatus();
    
    if (!check) {
        PubSub.publish({
            event: "render_startUp",
            detail: "login"
        });
    } else {
    
        PubSub.publish({
            event: "render_map",
            detail: {
                response: {
                    data: check.data
                }
            }
        });
    }
}

controlStatus();