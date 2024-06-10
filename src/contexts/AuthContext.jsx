import { createContext, useContext, useEffect, useReducer } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/config";

export const AuthContext = createContext()

export const reducer = ( state, action ) => {
  switch (action.type) {
    case "login":
      return { ...state, user: action.payload }
    case "logout":
      return { ...state, user: null }
    case "auth_is_ready":
      return { ...state, user: action.payload, authIsReady: action.payload === null ? false : true}
    default:
      return state
  }
}


const AuthProvider = ({children}) => {
  const [ { user, authIsReady }, dispatch ] = useReducer(reducer, {
    user: null,
    authIsReady: false
  })

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      dispatch({ type: 'auth_is_ready', payload: user})
    })
  }, [])

  return(
    <AuthContext.Provider value={{ user, authIsReady, dispatch}}>
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