import App from "../firebase.js";
import { getFirestore, setDoc, doc, collection, getDocs, getDoc,
    query, updateDoc, arrayUnion, where, serverTimestamp } from "firebase/firestore";

export const db = getFirestore(App);

export const getUserDoc = async (username, password) => {
    if (username === "" || password === "") {
        return { 
                params: "error", 
                response : { 
                    error: "Inget lösenord eller användare inskrivit" 
            }};
    } else {
        let colRef = collection(db, "users");
        let queryRef = query(colRef, where("username", "==", username), where("password", "==", password));
        let result = await getDocs(queryRef);
    
        if (result.empty) {
            return { 
                params: "error", 
                response : { 
                    error: "Fel användare eller lösenord" 
            }};
        } else {
            return result.docs[0].data();
        }
    }
};

export const getDocByClue = async (colName, answer, { response } ) => {
    let { data, storys } = response;

    let colRef = collection(db, colName);
    // let queryRef = query(colRef, where("unlockRiddleKey", "==", answer));
    let queryRef = query(colRef, where("removeThis", "==", answer));

    let result = await getDocs(queryRef);

    if (result.empty) {
        return { 
            params: "error", 
            response : { 
                error: "Fel svar prova igen" 
            }};
    } else {
        let newData = result.docs[0].data();
        if (colName === "puzzelStory") {
            let dataStoryExists = data.chapters.find((chapter) => chapter.chapter === newData.chapterId && chapter.onGoing);

            if (dataStoryExists === undefined || !dataStoryExists.onGoing) {
                return { 
                    params: "error", 
                    response : { 
                        error: "Redan skrivit in denna nyckeln prova med en annan" 
                    }};
            } else {
                return newData;
            }
        } else {
            if (storys.clueId === newData.clueId) {   
                return newData;
            } else {
                return { 
                    params: "error", 
                    response : { 
                        error: "Där var ett problem med att lägga till ledtråden" 
                    }};
            }
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
                    error: "Hittade inget matchande dokument" 
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
            id: document.id,
            createdAt: serverTimestamp()
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

        return newValue;
    } catch (error) {
        return { 
            params: "error", 
            response : { 
                error: "Error med att uppdaterad dokument" 
            }
        };
    }
}

export const updateArrayMap = async (colName, docId, arrayField, index, updateObj) => {
    const colRef = collection(db, colName);
    const docRef = doc(colRef, docId);

    try {
        const docSnapshot = await getDoc(docRef);
    
        const arraryToUpdate = docSnapshot.data()[arrayField].map((item, i) => {
            if (i === index) {
            return {
                ...item,
                ...updateObj
            };
            }
            return item;
        });
    
        await updateDoc(docRef, {
            [arrayField]: arraryToUpdate
        });

        return arraryToUpdate;
    } catch (error) {
        return { 
            params: "error", 
            response : { 
                error: "Error med att uppdaterad dokument" 
            }
        };
    }
};

export const deleteArrayMap = async (colName, docId, arrayField, index) => {
    const colRef = collection(db, colName);
    const docRef = doc(colRef, docId);

    try {
        const docSnapshot = await getDoc(docRef);
        const arrayToUpdate = docSnapshot.data()[arrayField].filter((item, i) => i !== index);
    
        await updateDoc(docRef, {
            [arrayField]: arrayToUpdate
        });
    
        return arrayToUpdate;
    } catch (error) {
        return { 
            params: "error", 
            response : { 
                error: "Error med att uppdaterad dokument" 
            }
        };
    }
};