import App from "../firebase.js";
import { getFirestore, setDoc, doc, collection, onSnapshot, getDocs } from "firebase/firestore";

export const db = getFirestore(App);

export const getFromDB = async (collectionName) => {
    const collectionRef = collection(db, collectionName);
    const dbdocs = await getDocs(collectionRef);
    const data = dbdocs.docs.map((doc) => doc.data());

    return data;
}

export const colRef = (colName) => {
    return collection(db, colName);
}

export const docRef = (docName) => {
    return doc(docName)
}

export const setDocRef = async (docRef, keys) => {
    return await setDoc(docRef, keys)
}

export const querySnapshot = async (name) => {
    let colcet = collection(db, name);
    let docs = await getDocs(collection);
};
