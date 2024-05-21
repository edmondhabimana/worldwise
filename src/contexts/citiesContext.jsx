import { createContext, 
         useReducer, 
         useContext, 
         useEffect } from "react";
import { query, 
         collection, 
         orderBy, 
         onSnapshot } from "firebase/firestore";
import { db } from "../firebase/config";

const CitiesContext = createContext()

const initialState = {
  cities: [],
  isLoading: [],
  error: ''
}

function reducer(state, action) {
  switch (action.type){
    case 'loading':
      return { ...state, isLoading: true}
    
    case "cities/loaded":
      return {...state, isLoading: false, cities: action.payload}

    default: 
      throw new Error("Unknown action type")
  }
}

function CitiesProvider({children}) {
  const [{ cities, isLoading, error }, dispatch] = useReducer(
    reducer,
    initialState
  )

  // console.log('cities',cities);

  useEffect(() => {
    const getCities = async () => {
      dispatch({type: "loading"})

      const q = query(collection(db, 'cities'), orderBy('createdAt', 'desc'))
    
      onSnapshot(q, (querySnapshot) => {
        const getCities = []
        querySnapshot.forEach((doc) => {
          // console.log(doc.data());
          getCities.push({...doc.data()})
        })
        dispatch({ type: "cities/loaded", payload: getCities})
      })
    
    }

    getCities()
  }, [])

  return(
    <CitiesContext.Provider
      value={{
        cities,
        isLoading,
        error,
      }}
    >
      {children}
    </CitiesContext.Provider>
  )
}

function useCities() {
  const context = useContext(CitiesContext);
  if (context === undefined)
    throw new Error("CitiesContext was used outside the CitiesProvider");
  return context;
}

export { CitiesProvider, useCities };