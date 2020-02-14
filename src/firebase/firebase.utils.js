import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: "AIzaSyCTjqJmQ5Cnj5LOEaKsRpByIvNGl8jJK1k",
  authDomain: "crwn-db-6ff0f.firebaseapp.com",
  databaseURL: "https://crwn-db-6ff0f.firebaseio.com",
  projectId: "crwn-db-6ff0f",
  storageBucket: "crwn-db-6ff0f.appspot.com",
  messagingSenderId: "561504295718",
  appId: "1:561504295718:web:92034d083b529ad3a27fe7",
  measurementId: "G-M7LCMNX9L0"
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if(!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName, 
        email, 
        createdAt, 
        ...additionalData
      })
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef;
}

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
