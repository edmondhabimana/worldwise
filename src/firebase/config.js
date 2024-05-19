import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
} from 'firebase/auth'
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore'


const firebaseConfig = {
  apiKey: "AIzaSyA2vlHYWJPT2BGOej1kyYUK9AxQwII_nCc",
  authDomain: "worldwise-39a70.firebaseapp.com",
  projectId: "worldwise-39a70",
  storageBucket: "worldwise-39a70.appspot.com",
  messagingSenderId: "645116457770",
  appId: "1:645116457770:web:90172ccd5f73f9642a6453"
};

const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
  prompt: 'select_account'
})

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider)

export const db = getFirestore(firebaseApp);

export const createUserDocumentFromAuth = async (
  userAuth, 
  additionalInformation = {}
) => {

 const userDocRef = doc(db, 'users', userAuth.uid)

 const userSnapshot = await getDoc(userDocRef)

 if (!userSnapshot.exists()) {
  const { displayName, email } = userAuth

  const createdAt = new Date()

  try {
    await setDoc(userDocRef, {
      displayName,
      email,
      createdAt,
      ...additionalInformation,
    })
  } catch (error) {
    console.log('error creating the user', error.message);
  }
 }

 return userDocRef
}

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if(!email || !password) return

  return await createUserWithEmailAndPassword(auth, email, password)
}

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
  if(!email || !password) return

  return await signInWithEmailAndPassword(auth, email, password)
}

export const createCity = async (_city, _country, _countryShortName, _date, _description = '') => {
  await setDoc(doc(db, "cities", `${_city}`), {
    city: _city,
    country: _country,
    shortName: _countryShortName,
    timeStamp: _date,
    description: _description
  })
}