import * as FBApp from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

FBApp.initializeApp({
  appId:
    "154661939232-dd9r76njn2s632phqv9tc4qonsf21jlm.apps.googleusercontent.com",
  apiKey: " AIzaSyBhyn-Q_rHns1eGgiHRHQKTmdYL210z8Yk ",
  authDomain: "job-seeker-with-weather.firebaseapp.com",
});

const auth = getAuth(FBApp.getApp());
const googleProvider = new GoogleAuthProvider();

const loginWithGoogle = async () => {
  const resut = await signInWithPopup(auth, googleProvider);
  return await resut.user.getIdToken();
};

export { loginWithGoogle };
