import firebase from "firebase/app";
import "firebase/auth";
import { firebaseConfig } from "shared/config";

/**
 * Инициализация firebase приложения
 */
firebase.initializeApp(firebaseConfig);

export default firebase;
