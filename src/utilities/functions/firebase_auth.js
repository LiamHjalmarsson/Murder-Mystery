import { PubSub } from "../pubsub.js";
import App from "../firebase.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword,
    signOut, onAuthStateChanged
} from "firebase/auth";

export const auth = getAuth(App);

export const registerPlayer = async (email, password) => {
    if (!validateField(email)) {
        console.log("Please enter a valid username");
        return;
    }

    if (!validatePassword(email)) {
        console.log("Please enter a password longer then 4 charaters");
        return;
    }

    try {
        let user = await createUserWithEmailAndPassword(auth, email, password);
        return user.user.uid;
    } catch (error) {
        console.log(error)
        return false;
    }
}

export const loginPlayer = async (email, password) => {

    if (!email) {
        return { error: "Please enter a valid email" }
    }

    if (!password) {
        return { error: "Please enter password" }
    }

    try {
        let user = await signInWithEmailAndPassword(auth, email, password);
        console.log(user);
        return user;
    }  catch (error) {
        console.log("error")
        return false;
    }
}

// No need to be exported used here
function validateField (field) {
    if (field === ""  && field.length <= 0) {
        return false;
    } else {
        return true;
    }
}

// No need to be exported used here
function validatePassword (password) {
    if (password <= 4) {
        return false;
    } else {
        return true;
    }
}


export const logoutPlayer = async () => {
    try {
        console.log("User logged out");
        await signOut(auth);
    } catch (error) {
        console.log(error);
    }
}

export const unsubAuth = () => { 
    onAuthStateChanged(auth, (user) => {
        console.log("user status changed", user);
    });
}
