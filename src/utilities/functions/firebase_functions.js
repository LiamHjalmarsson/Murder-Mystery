import App from "../firebase.js";
import { getFirestore, setDoc, doc, collection, onSnapshot, getDocs, getDoc,
    query, orderBy, updateDoc, arrayUnion, where } from "firebase/firestore";

export const db = getFirestore(App);

// get the correct users id when login in 
export const getUserDoc = async (username, password) => {
    let colRef = collection(db, "users");
    let queryRef = query(colRef, where("username", "==", username), where("password", "==", password));
    let result = await getDocs(queryRef);

    if (result.empty) {
        return { response: "error", error : "No matching document found" } ;
    } else if (result.size > 1) {
        return { response: "error", error : "Multiple matching documents found" };
    } else {
        // console.log(result.docs[0].id);
        return { id: result.docs[0].id, data: result.docs[0].data() }
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
    let update = await updateDoc(refDoc, upData);

    return update;
}

// Update a array of objects choose collection, doc, what array, the key to change value and the value 
export const updateArrayMap = async (colName, docName, arr, key, value) => {
    let colRef = collection(db, colName);
    let documentRef = doc(colRef, docName);
  
    let documentSnapshot = await getDoc(documentRef);
  
    let updatedArr = documentSnapshot.data()[arr].map((item, index) => {
        if (index === 1) {
            return {
                ...item,
                [key]: value,
            };
        }
        
        return item;
    });

    let updated = await setDoc(documentRef, {
        ...documentSnapshot.data(),
        [arr]: updatedArr,
    });
  
    return updated;
};

// Used to update arrays in documents takes 4 parameters the collection name, the document id, the name of array and the data to add not 
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

// Function to check if a user is logged in and authenticate them if necessary
export async function checkLoginStatus() {
    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (storedUser) {
        // Authenticate the user using the stored user ID
        const isAuthenticated = await getUserDoc(storedUser.username, storedUser.password)
        
        if (!storedUser) {
            // If the stored user ID is invalid, remove it from local storage
            localStorage.removeItem("userId");
            return { error: "failed to authenticate" }
        }

        return { detail: true, data: isAuthenticated, sos: "sos" }
    }
}













// Används inte för tillfället kommer kanseke inte användas 
// updaterar document om de ändras lämna om behövs 
export const realTime = async (colName, id) => {
    let colRef = collection(db, colName);
    let isUpdating = false;

    if (id) {
        let docRef = doc(colRef, id);
        onSnapshot(docRef, (docSnap) => {
            if (docSnap.exists()) {
                console.log("data", { ...docSnap.data(), id: docSnap.id });
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
            console.log("array", array);
            isUpdating = true;
        });
    }
    return isUpdating;
}