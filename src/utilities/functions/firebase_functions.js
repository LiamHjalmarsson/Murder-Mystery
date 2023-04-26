import App from "../firebase.js";
import { getFirestore, setDoc, doc, collection, onSnapshot, getDocs, 
    query, orderBy, updateDoc, arrayUnion } from "firebase/firestore";

export const db = getFirestore(App);

// Retrieving all documents in a collection. 
export const getFromDB = async (collectionName) => {
    // const collectionRef = collection(db, collectionName); // reference to the collection to retrieve documents from.
    const collectionRef = colRef(collectionName); // reference to the collection to retrieve documents from.
    const dbdocs = await getDocs(collectionRef); // Retrieving all documents in the specified collection.
    const data = dbdocs.docs.map((doc) => doc.data()); // Mapping over each document to extract the data from it.

    return data;
}

// creating a reference to a specific collection.
export const colRef = (colName) => {
    return collection(db, colName); // Returning a reference to the specified collection.
}

// creating a reference to a specific document.
export const docRef = (docName) => {
    return doc(docName); // Returning a reference to the specified document.
}

// setting the data of a specific document.
export const setDocRef = async (docRef, keys) => {
    return await setDoc(docRef, keys) // Setting the specified document's data to the provided data.
}

export const colRefrens = (colName) => {
    let colRef = doc(collection(db, colName)); // Returning a reference to the specified collection
    return colRef;
}

// functions to addDocument and add data 
export const addDocAddData = async (colName, docName, docData) => {
    await setDoc(doc(db, colName, docName), docData);
}

// functions to do updates 
export const docUpdate = async (collRef, docRef, upData) => {
    const reference = doc(db, collRef, docRef);
    await updateDoc(reference, upData);

    // how to call await docUpdate("users", "123456", { username: "new user" } );
}

export const docUpdateArry = async (collRef, docRef, upData) => {
    const reference = doc(db, collRef, docRef);

    await updateDoc(reference, {
        members: arrayUnion(upData)
    });
}

// not done to listen for changes in document
export const realTime = async (refCol) => {

    let reference = colRef(refCol);
    
    onSnapshot(reference, (snapshot) => {

        let array = [];
        snapshot.docs.forEach((doc) => {
            array.push({ ...doc.data(), id: doc.id });
        })

        console.log(array);
    })

    // let snapshot = await getDocs(colRef(refCol));

    // let array = [];

    // snapshot.docs.forEach((doc) => {
    //     array.push({
    //         ...doc.data(),
    //         id: doc.id,
    //     });
    // });

    // return array;
}

export const realtimeListner = async (refCol) => {
    const docRef = doc(db, refCol, "123456");

    const unsubDoc = onSnapshot(docRef, (doc) => {
        console.log(doc.data());
    })

}

export const que = (colName, filter) => {
    let reference = colRef(colName)
    return query(reference, orderBy("createdAt"));
}