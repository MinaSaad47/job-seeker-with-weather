import FBAdmin from "firebase-admin";
import * as FBApp from "firebase/app";
import * as FBAuth from "firebase/auth";

import firebaseConfig from "./firebase.config.json";
import serviceAccountConfig from "./firebase_service_account.config.json";

FBAdmin.initializeApp({
  credential: FBAdmin.credential.cert(serviceAccountConfig as any),
  storageBucket: firebaseConfig.storageBucket,
});

FBApp.initializeApp(firebaseConfig);

const storageBaseUrl = `https://firebasestorage.googleapis.com/v0/b/${firebaseConfig.storageBucket}/o`;

export { FBAdmin, FBApp, FBAuth, storageBaseUrl };
