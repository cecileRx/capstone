
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword } from 'firebase/auth'
import {
  getFirestore,
  doc,
  getDoc,
  setDoc
} from "firebase/firestore";




const firebaseConfig = {
  apiKey: "AIzaSyCwfAtFcqit2nYnynnVei3IVXzh_8NZLkY",
  authDomain: "biche-shirts-db.firebaseapp.com",
  projectId: "biche-shirts-db",
  storageBucket: "biche-shirts-db.appspot.com",
  messagingSenderId: "904173729990",
  appId: "1:904173729990:web:f00079d1207558f6167fc7"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: "select_account"
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);


export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth, additionnalInformation) => {

  if (!userAuth) return;

  const userDocRef = doc(db, 'users', userAuth.uid);

  const userSnapshot = await getDoc(userDocRef);

  if(!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef,  {
        displayName,
        email,
        createdAt,
        ...additionnalInformation
      });
    } catch (error) {
      console.log('error creating user', error.message)
    }
  }
  return userDocRef;
};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await createUserWithEmailAndPassword(auth, email, password);
}
