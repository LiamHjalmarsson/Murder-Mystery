import App from "../firebase.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";

export const auth = getAuth(App);

export const registerPlayer = async (email, password) => {

    if (!validateField(email)) {
        console.log("Please enter a valid email");
        return;
    }

    if (!validatePassword(password)) {
        console.log("Please enter a password longer then 4 charaters");
        return;
    }

    try {
        await createUserWithEmailAndPassword(auth, email, password);
        return true;
    } catch (error) {
        console.log(error)
    }

}

export const loginPlayer = async (email, password) => {
    try {
        await signInWithEmailAndPassword(auth, email, password)
    } catch (error) {
        console.log(error);
    }
}

export const logoutPlayer = async () => {
    try {
        await signOut(auth);
    } catch (error) {
        console.log(error);
    }
}

function validateField (field) {
    console.log(field);
    if (field === ""  && field.length <= 0) {
        return false;
    } else {
        return true;
    }
}

function validatePassword (password) {
    if (password <= 4) {
        return false;
    } else {
        return true;
    }

}
