import * as FBApp from "firebase/app";
import * as FBAuth from "firebase/auth";

import firebaseConfig from "./firebase.config.json";

FBApp.initializeApp(firebaseConfig);

export { FBApp, FBAuth };
