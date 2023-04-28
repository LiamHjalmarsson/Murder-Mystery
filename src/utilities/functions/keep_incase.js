////////////////////// AUTH ///////////////////////////
// export const authState = () => {
//     auth.onAuthStateChanged(async (user) => {
//         if (user) {
//             await dataSnap(user.uid);
//             console.log('Data snapshot retrieved successfully.');
//         }
//     });
// };

// export const dataSnap = async (uid) => {
//     const collection = colRef('users');
//     const userDoc = docRef(collection, uid);
    
//     onSnapshot(userDoc, (doc) => {
//         const data = doc.data();
//         console.log(data);
//     });
// };


////////////////////// AUTH ///////////////////////////

// export const userAuth = async () => {
//     const user = auth.currentUser;

//     if (user) {
//         dataDocument("users", user.uid);
//     } else {
//         console.error('No user logged in.');
//     }
// }

// export const userAuthUpdate = async () => {
//     const user = auth.currentUser;

//     if (user) {
//         console.log(user);
//         await docUpdate("users", user.uid, { xxx: "xxxx"});
//     } else {
//         console.error('No user logged in.');
//     }
// }

// Retrieving a spesific document and its data 
// export const dataDocument = async (colName, id) => {
//     const colRef = collection(db, colName);
//     const document = doc(colRef, id);

//     const docSnapshot = await getDoc(document);
    
//     if (docSnapshot.exists()) {
//         let data = docSnapshot.data();
//         return data;
//     } else {
//         console.log("document dosent exists");
//         return null; 
//     }

// }


// random id 
// export const addDocData = async (colName, docData) => {
//     const colRef = collection(db, colName);
//     let document = doc(colRef);
//     await setDoc(document, docData);

//     return document.id
// }