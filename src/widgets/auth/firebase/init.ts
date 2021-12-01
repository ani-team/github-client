import firebase from "firebase/app";
import "firebase/auth";
import { firebaseConfig } from "shared/get-env";

/**
 * Инициализация firebase приложения
 */
firebase.initializeApp(firebaseConfig);

export default firebase;
