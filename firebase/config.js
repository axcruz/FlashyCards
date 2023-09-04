import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCbk13FSTXWtcH4gFUH3ciRTLGPnpArj50",
  authDomain: "flashycards-fa22f.firebaseapp.com",
  projectId: "flashycards-fa22f",
  storageBucket: "flashycards-fa22f.appspot.com",
  messagingSenderId: "598528385258",
  appId: "1:598528385258:web:ce9e6fc65c433020e43793",
  measurementId: "G-KB529PP80Q",
};

let app;

if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app();
}

const db = app.firestore();
const auth = firebase.auth();

export { db, auth };
