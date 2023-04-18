import { initializeApp } from 'firebase/app';

const key = import.meta.env.VITE_FIREBASE_API_KEY
const authDomain = import.meta.env.VITE_FIREBASE_AUTH_DOMAIN
const projectId = import.meta.env.VITE_FIREBASE_PROJECTID
const storageBucket = import.meta.env.VITE_FIREBASE_STORAGEBUCKET
const messagingSenderId = import.meta.env.VITE_MESSAGINGSENDERID
const appId = import.meta.env.VITE_APPID

const firebaseConfig = {
    apiKey: key,
    authDomain: authDomain,
    projectId: projectId,
    storageBucket: storageBucket,
    messagingSenderId: messagingSenderId,
    appId: appId
};

const app = initializeApp(firebaseConfig); 

export default app;
