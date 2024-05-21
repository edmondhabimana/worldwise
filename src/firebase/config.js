import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
} from 'firebase/auth'
import { getFirestore, 
         doc, 
         getDoc, 
         setDoc, 
         collection, 
         getDocs, 
         Timestamp, 
         deleteDoc, 
       } from 'firebase/firestore'


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

export const createCity = async (city, country, countryShortName, date, description = '') => {
  const createdAt = Timestamp.fromDate(new Date())
  await setDoc(doc(db, "cities", `${city}`), {
    city,
    country,
    countryShortName,
    tripDate: date,
    description,
    createdAt
  })
}

export const getCountries = async () => {
  const querySnapshot = await getDocs(collection(db, "cities"))
  const countries = []
  querySnapshot.forEach((doc) => {
    countries.push(doc.data().country)
  })
  const uniqueCountries = new Set(countries)
  return [...uniqueCountries]
}

export const deleteCity = async (id) => {
  await deleteDoc(doc(db, 'cities', `${id}`))
}