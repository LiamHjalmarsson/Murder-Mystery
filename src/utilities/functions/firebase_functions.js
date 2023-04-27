import App from "../firebase.js";
import { getFirestore, setDoc, doc, collection, onSnapshot, getDocs, getDoc,
    query, orderBy, updateDoc, arrayUnion } from "firebase/firestore";

export const db = getFirestore(App);

// Retrieving all documents in a collection exampel all documents in users. 
export const getFromDB = async (collectionName) => {
    let collectionRef = collection(db, collectionName); // reference to the collection to retrieve the documents
    let dbdocs = await getDocs(collectionRef); // Retrieving all documents in the specified collection.
    let data = dbdocs.docs.map((doc) => doc.data()); // Mapping over each of the documents to extract the data from it.

    return data; // returns the data
}

// Retrieving data from a specific document in a collection with auto-generated IDs
export const getFromDB2 = async (collectionName, documentId) => {
    const documentRef = doc(collection(db, collectionName), documentId);
    const documentSnapshot = await getDoc(documentRef);
    
    return documentSnapshot.exists() ? documentSnapshot.data() : null;
};

// used to add a new document in firebase takes 3 parameters 
// colName = Collection name tex "users", docName witch will be the name/id of the document created, docData the data that will be put in the document
export const addDocAddData = async (colName, docName, docData) => {
    await setDoc(doc(db, colName, docName), docData);
}

// Used to update documents takes 3 parameters the collection name, the document name/id and the data to update
export const docUpdate = async (collRef, docRef, upData) => {
    let reference = doc(db, collRef, docRef);
    await updateDoc(reference, upData);

    // how to call await docUpdate("users", "123456", { username: "new user" } );
}

// Used to update arrays in documents takes 3 parameters the collection name, the document name/id and the data to update
export const docUpdateArry = async (collRef, docRef, upData) => {
    let reference = doc(db, collRef, docRef);

    await updateDoc(reference, {
        members: arrayUnion(upData)
    });
}


























// Below not using at moment saveing incase of use 

// not completyey done, listen for changes in documents 
export const realTime = async (refCol) => {

    let reference = colRef(refCol);
    
    onSnapshot(reference, (snapshot) => {

        let array = [];
        snapshot.docs.forEach((doc) => {
            array.push({ ...doc.data(), id: doc.id });
        })

        console.log(array);
    })
}

export const realtimeListner = async (refCol) => {
    const docRef = doc(db, refCol, "123456");

    const unsubDoc = onSnapshot(docRef, (doc) => {
        console.log(doc.data());
    })

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
    let x = collection(db, colName);
    let colRef = doc(collection(db, colName)); // Returning a reference to the specified collection

    console.log(x)
    console.log("///////")
    console.log(colRef);
    return colRef;
}

export const que = (colName, filter) => {
    let reference = colRef(colName)
    return query(reference, orderBy("createdAt"));
}