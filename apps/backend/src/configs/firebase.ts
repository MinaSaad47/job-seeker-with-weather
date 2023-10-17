import FBAdmin from "firebase-admin";
import * as FBApp from "firebase/app";
import * as FBAuth from "firebase/auth";

import firebaseConfig from "./firebase.config.json";
import serviceAccountConfig from "./firebase_service_account.config.json";

FBAdmin.initializeApp({
  credential: FBAdmin.credential.cert(serviceAccountConfig as any),
});

FBApp.initializeApp(firebaseConfig);

export { FBAdmin, FBApp, FBAuth };
