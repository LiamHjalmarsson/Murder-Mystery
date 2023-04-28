import App from "../firebase.js";
import { getFirestore, setDoc, doc, collection, onSnapshot, getDocs, getDoc,
    query, orderBy, updateDoc, arrayUnion, where } from "firebase/firestore";

import { auth } from "./firebase_auth.js";

export const db = getFirestore(App);

// get the correct users id when login in 
export const getUserDoc = async (username, password) => {
    let colRef = collection(db, "users");
    let queryRef = query(colRef, where("username", "==", username), where("password", "==", password));
    let result = await getDocs(queryRef);

    if (result.empty) {
        return { error : "No matching document found" } ;
    } else if (result.size > 1) {
        return { error : "Multiple matching documents found" };
    } else {
        return result.docs[0].id
    }
};

// Retrieving all documents in a collection and all there data
// or if an id is given get the spesfic document and its data 
export const getFromDB = async (colName, docId) => {
    let colRef = collection(db, colName);

    if (docId) {
        let docRef = doc(colRef, docId);
        let docSnap = await getDoc(docRef);

        if (docSnap.exists()) {

            let data = docSnap.data();
            data.id = docSnap.id;
            return data;

        } else {

            return { error : "No matching document found" };

        }

    } else {

        let dbdocs = await getDocs(colRef);
        
        let data = dbdocs.docs.map((doc) => {
            let docData = doc.data();
            docData.id = doc.id;
            return docData;
        });

        return data;
    }
}

// used to add a new document in firebase takes 3 parameters 
// what the name of the collection the data to add and if we want to spefici the id or generat a auto id
export const addDocAddData = async (colName, docData, docId) => {

    let colRef = collection(db, colName);

    if (docId) {
        let document = doc(colRef, docId);
        let user = await setDoc(document, docData);
        return { documentID: docId, user: docData };
    } else {
        let document = doc(colRef);
        await setDoc(document, docData);
    
        return { documentID: document.id, user: docData }
    }

}

// Used to update documents takes 3 parameters the collection name, the document name/id and the data to update
export const docUpdate = async (colName, docId, upData) => {
    let colRef = collection(db, colName);
    let refDoc = doc(colRef, docId);
    await updateDoc(refDoc, upData);

    // how to call await docUpdate("users", "123456", { username: "new user" } );
}

// Used to update arrays in documents takes 4 parameters the collection name, the document 
// id, the name of array and the data to add
export const docUpdateArry = async (colName, docId, arrayField, newValue) => {
    let colRef = collection(db, colName);
    let refDoc = doc(colRef, docId);

    let dataToUpdate = { [arrayField]: arrayUnion(newValue) };

    try {
        await updateDoc(refDoc, dataToUpdate);

        console.log(`Document with ID ${docId} successfully updated.`);

        return true;
    } catch (error) {
        console.error(`Error updating document with ID ${docId}:`, error);

        return false;
    }

}

// updaterar document om de ändras lämna om behövs 
export const realTime = async (colName, id) => {
    let colRef = collection(db, colName);
    let isUpdating = false;

    if (id) {
        let docRef = doc(colRef, id);
        onSnapshot(docRef, (docSnap) => {
            if (docSnap.exists()) {
                console.log({ ...docSnap.data(), id: docSnap.id });
                isUpdating = true;
            } else {
                console.log({ error: "No matching document found" });
            }
        });
    } else {
        onSnapshot(colRef, (snapshot) => {
            let array = [];
            snapshot.docs.forEach((doc) => {
                array.push({ ...doc.data(), id: doc.id});
            });
            console.log(array);
            isUpdating = true;
        });
    }

    return isUpdating;
}

// Function to check if a user is logged in and authenticate them if necessary
export async function checkLoginStatus() {
    const storedUserId = localStorage.getItem("userId");
    const username = localStorage.getItem("username");
    const password = localStorage.getItem("password");

    if (storedUserId) {
        // Authenticate the user using the stored user ID
        const isAuthenticated = await getUserDoc(username, password)

        return { detail: true, data: isAuthenticated, sos: "sos" }
        if (!isAuthenticated) {
            // If the stored user ID is invalid, remove it from local storage
            localStorage.removeItem("userId");
            return { error: "failed to authenticate" }
        }
    }
}