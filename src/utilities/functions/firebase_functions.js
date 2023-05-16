import App from "../firebase.js";
import { getFirestore, setDoc, doc, collection, onSnapshot, getDocs, getDoc,
    query, updateDoc, arrayUnion, where } from "firebase/firestore";
import { PubSub } from "../pubsub.js";

export const db = getFirestore(App);

export const getUserDoc = async (username, password) => {

    if (username === "" || password === "") {
        return false;
    } else {

        let colRef = collection(db, "users");
        let queryRef = query(colRef, where("username", "==", username), where("password", "==", password));
        let result = await getDocs(queryRef);
    
        if (result.empty) {
    
            return false;
    
        } else {
            return result.docs[0].data();
        }
    }

};

export const getDocByClue = async (colName, answer, response) => {

    let colRef = collection(db, colName);
    let queryRef = query(colRef, where("unlockRiddleKey", "==", answer));
    let result = await getDocs(queryRef);

    if (result.empty) {
        return { 
            params: "error", 
            response : { 
                error: "Wrong answer" 
            }};
    } else {
        let newData = result.docs[0].data();

        if (colName === "puzzelStory") {
            let dataStoryExists = response.chapters.find((chapter) => chapter.chapter === newData.chapterId && chapter.onGoing);
    
            if (dataStoryExists === undefined || !dataStoryExists.onGoing) {
                return { 
                    params: "error", 
                    response : { 
                        error: "Already enter this value" 
                    }}; ;
            } else {
                return newData;
            }
        } else {

            let dataSearchArea = response.chapters.find((chapter) => chapter.chapter === newData.chapterId && chapter.onGoing);
            return newData;

        }

    }
};


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

            return { 
                params: "error", 
                response : { 
                    error: "No matching document found" 
                }
            };
            
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


export const addDocAddData = async (colName, docData, docId) => {
    let colRef = collection(db, colName);

    if (docId) {
        let document = doc(colRef, docId);

        return await setDoc(document, {
            ...docData,
            id: document.id
        });

    } else {
        let document = doc(colRef);

        return await setDoc(document, {
            ...docData,
            id: document.id
        });
    
    }
}


export const docUpdate = async (colName, docId, upData) => {
    let colRef = collection(db, colName);
    let refDoc = doc(colRef, docId);

    let update = await updateDoc(refDoc, upData);

    return update;
}


export const docUpdateArry = async (colName, docId, arrayField, newValue) => {
    let colRef = collection(db, colName);
    let refDoc = doc(colRef, docId);

    let dataToUpdate = { [arrayField]: arrayUnion(newValue) };

    try {
        await updateDoc(refDoc, dataToUpdate);

        console.log(`Document with ID ${docId} successfully updated.`, newValue);

        return newValue;
    } catch (error) {
        console.error(`Error updating document with ID ${docId}:`, error);

        return false;
    }

}


export const updateArrayMap = async (colName, docId, arr, index, updateObj) => {
    const colRef = collection(db, colName);
    const docRef = doc(colRef, docId);

    try {
        const docSnapshot = await getDoc(docRef);
    
        const arraryToUpdate = docSnapshot.data()[arr].map((item, i) => {
            if (i === index) {
            return {
                ...item,
                ...updateObj
            };
            }
            return item;
        });
    
        await updateDoc(docRef, {
            [arr]: arraryToUpdate
        });

        return arraryToUpdate;
    } catch (error) {
        console.error(`Error updating document with ID ${docId}:`, error);
        return false;
    }
};

export async function checkLoginStatus() {
    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (storedUser) {
        const isAuthenticated = await getUserDoc(storedUser.username, storedUser.password)
        
        if (!isAuthenticated) {
            localStorage.removeItem("userId");
            return false;
        }
        return { detail: true, data: isAuthenticated }
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

                let data = { ...docSnap.data(), id: docSnap.id }

                PubSub.publish({
                    event: "update_map", 
                    detail: data
                });
                
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