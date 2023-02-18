// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";
import { getAuth, connectAuthEmulator } from "firebase/auth";
import { getStorage, connectStorageEmulator } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA93auoFK8ML3tRPo5VziHBtXOq4knHNx8",
  authDomain: "document-tracking-system-2daa9.firebaseapp.com",
  projectId: "document-tracking-system-2daa9",
  storageBucket: "document-tracking-system-2daa9.appspot.com",
  messagingSenderId: "793884086056",
  appId: "1:793884086056:web:662779ced329393cfb4a1d",
  measurementId: "G-N3KRCLYP11",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const analytics = getAnalytics(app);
export const storage = getStorage(app);

// connect to emulator
connectFirestoreEmulator(db, "localhost", 8080);
// connectauthemulator needs to have this format http://localhost:9099 or else it will throw an error
connectAuthEmulator(auth, "http://localhost:9099");
connectStorageEmulator(storage, "localhost", 9199);
