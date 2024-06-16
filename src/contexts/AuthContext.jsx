import { createContext, useCallback, useContext, useEffect, useReducer } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { getDownloadURL, ref} from "firebase/storage"
import { doc } from "firebase/firestore";
import { auth, db, storage } from "../firebase/config";
import { onSnapshot } from "firebase/firestore";

export const AuthContext = createContext()

export const reducer = ( state, action ) => {
  switch (action.type) {
    case "login":
      return { ...state, user: action.payload }
    case "logout":
      return { ...state, user: null }
    case "auth_is_ready":
      return { ...state, user: action.payload, authIsReady: action.payload === null ? false : true}
    case "user_info":
      return { ...state, userDocument: action.payload}
    default:
      return state
  }
}


const AuthProvider = ({children}) => {
  const [ { user, authIsReady, userDocument }, dispatch ] = useReducer(reducer, {
    user: null,
    authIsReady: false,
    userDocument: null
  })

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      dispatch({ type: 'auth_is_ready', payload: user})

      if(user === null) return

      onSnapshot(doc(db, "users", user.uid), (doc) => {
        // console.log(doc.data());
        dispatch({ type: 'user_info', payload: doc.data()})
      })
    })
  }, [])

  // useEffect(() => {

  // }, [user.uid])

  const checkIfImageFileExist = async () => {
    if(userDocument === null) return

    return await getDownloadURL(
    ref(storage, userDocument.photoURL)
    ).then((url) => {
      return [true, url]
    }).catch((error) => {
      return [false, error.message]
    })
  }

  return(
    <AuthContext.Provider value={{ user, authIsReady, dispatch, userDocument, checkIfImageFileExist}}>
      { children }
    </AuthContext.Provider>
  )
}

function useAuth() {
  const context = useContext(AuthContext)
  if(context === undefined)
    throw new Error("AuthContext was used outside the AuthProvider")
  return context
}

export { AuthProvider, useAuth }