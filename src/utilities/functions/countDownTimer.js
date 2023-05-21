import App from "../firebase.js";
import { getFirestore, setDoc, doc, collection, getDoc,} from "firebase/firestore";
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

window.addEventListener('beforeunload', async () => {
    let user = JSON.parse(localStorage.getItem("user"));

    if (user !== null) {
        let colRef = collection(db, "users");
        let docRef = doc(colRef, user.userId);
        await setDoc(docRef, {
            countdownStart: countdownStart
        }, { merge: true });
    }
});

function displayCountdown(remainingTime) {
    let hours = Math.floor(remainingTime / (1000 * 60 * 60));
    let minutes = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((remainingTime % (1000 * 60)) / 1000);

    if (document.querySelector("#timeLeft")) {
        if (remainingTime <= 0) {
            document.querySelector("#timeLeft").innerHTML = `0: 00m : 00s`;
            document.querySelector("#guessMurder").setAttribute("disabled", true);
            document.querySelector("#guessMurder").classList.add("locked");

            document.querySelectorAll(".navigationBtn").forEach(btn => {
                // btn.setAttribute("disabled", true);
                // btn.classList.add("locked");
            });
        } else {
            document.querySelector("#timeLeft").innerHTML = `${hours}: ${minutes}m : ${seconds}s`;
        }
    }
}