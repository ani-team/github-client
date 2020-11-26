import firebase from "firebase/app";
import "firebase/auth";
import { firebaseConfig } from "shared/get-env";

firebase.initializeApp(firebaseConfig);

export default firebase;
