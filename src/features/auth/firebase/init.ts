import firebase from "firebase";
import "firebase/auth";

// FIXME: hardcoded config
const firebaseConfig = {
    apiKey: "AIzaSyABlBQc-tjCRKWwBj8jTTrMiT2M2UKiJpk",
    authDomain: "github-client-47c49.firebaseapp.com",
    databaseURL: "https://github-client-47c49.firebaseio.com",
    projectId: "github-client-47c49",
    storageBucket: "github-client-47c49.appspot.com",
    messagingSenderId: "14406286286",
    appId: "1:14406286286:web:58c7c11c2762d36a55c99f",
};

firebase.initializeApp(firebaseConfig);

export default firebase;
