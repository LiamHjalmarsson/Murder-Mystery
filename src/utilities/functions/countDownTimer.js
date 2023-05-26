import { createElement } from "../../lib/js/functions.js";
import App from "../firebase.js";
import { getFirestore, setDoc, doc, collection, getDoc,} from "firebase/firestore";
import { getFromDB } from "./firebase_functions.js";
import { PubSub } from "../pubsub.js";

export const db = getFirestore(App);

let countdownStart;
let countdownInterval;

export const startCountdown = async (userId) => {
    let colRef = collection(db, "users");
    let docRef = doc(colRef, userId);
    let docSnap = await getDoc(docRef);

    if (docSnap.exists() && docSnap.data().countdownStart) {
        countdownStart = docSnap.data().countdownStart;
    } else {
        countdownStart = new Date().getTime();
    }

    let currentTime = new Date().getTime();
    let elapsedTime = currentTime - countdownStart;
    let remainingTime = 4 * 60 * 60 * 1000 - elapsedTime;

    if (remainingTime > 0) {
        countdownInterval = setInterval(function() {
            currentTime = new Date().getTime();
            elapsedTime = currentTime - countdownStart;
            remainingTime = 4 * 60 * 60 * 1000 - elapsedTime;
            displayCountdown(remainingTime);
        }, 1000);
    }
    displayCountdown(remainingTime);
}

export const logout = async (userId) => {
    let colRef = collection(db, "users");
    let docRef = doc(colRef, userId);
    await setDoc(docRef, {
        countdownStart: countdownStart
    }, { merge: true });

    clearInterval(countdownInterval); 
}

window.addEventListener('beforeunload', async (e) => {
    let user = JSON.parse(localStorage.getItem("user"));

    if (user !== null) {
        e.preventDefault();
        let colRef = collection(db, "users");
        let docRef = doc(colRef, user.userId);
        let data = await setDoc(docRef, {
            countdownStart: countdownStart
        }, { merge: true });

        return data;
    }
});

export const timeSave = async (data) => {
    let colRef = collection(db, "users");
    let docRef = doc(colRef, data.id);
    await setDoc(docRef, {
        countdownStart: countdownStart
    }, { merge: true });
}

async function displayCountdown(remainingTime) {
    let hours = Math.floor(remainingTime / (1000 * 60 * 60));
    let minutes = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((remainingTime % (1000 * 60)) / 1000);

    if (document.querySelector("#timeLeft")) {
        if (remainingTime <= 0) {
            document.querySelector("#timeLeft").innerHTML = `0: 00m : 00s`;

            // let container = document.querySelector("#guessMurderBox");
            // container.innerHTML = ""; 

            // let btn = createElement("button", "leadboard", "guessMurder");
            // btn.textContent = "Leadboard";
            // container.append(btn);

            // let userId = JSON.parse(localStorage.getItem("user"));

            // let user = await getFromDB("users", userId.userId);

            // document.querySelector("#guessMurder").addEventListener("click", () => {
            //     PubSub.publish({
            //         event: "leadboard", 
            //         detail: {
            //             response: {
            //                 data: user
            //             }
            //         }
            //     });
            // });
        } else {
            document.querySelector("#timeLeft").innerHTML = `${hours}: ${minutes}m : ${seconds}s`;
        }
    }
}