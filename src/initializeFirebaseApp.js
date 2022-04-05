import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database";
import { syncStatus } from "./firebaseHelper";
let auth, store, database;
export default function initializeFirebaseApp(config) {
  const app = initializeApp(config);
  // const firebaseConfig = {
  //   apiKey: "",
  //   authDomain: "",
  //   databaseURL: "",
  //   projectId: "",
  //   storageBucket: "",
  //   messagingSenderId: "",
  //   appId: "",
  // };
  auth = getAuth(app);
  store = getFirestore(app);
  database = getDatabase(app);
  syncStatus();
  return app;
}
export const getAuthObj = () => auth;
export const getStoreObj = () => store;
export const getDbObj = () => database;
