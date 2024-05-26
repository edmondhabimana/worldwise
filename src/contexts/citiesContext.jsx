import { createContext, 
         useReducer, 
         useContext, 
         useEffect, 
         useCallback} from "react";
import { query, 
         collection, 
         orderBy, 
         onSnapshot,
         getDocs, 
         limit,
         where } from "firebase/firestore";
import { db } from "../firebase/config";

const CitiesContext = createContext()

const initialState = {
  cities: [],
  isLoading: [],
  selectedCity: null,
  isActive: true,
  error: ''
}

function reducer(state, action) {
  switch (action.type){
    case 'loading':
      return { ...state, isLoading: true}
    
    case "cities/loaded":
      return {...state, isLoading: false, cities: action.payload}

    case "selectedCity":
      return {...state, selectedCity: action.payload}

    case "active":
      return {...state, isActive: action.payload}

    default: 
      throw new Error("Unknown action type")
  }
}

function CitiesProvider({children}) {
  const [{ cities, isLoading, selectedCity, isActive, error }, dispatch] = useReducer(
    reducer,
    initialState
  )

  // console.log('isActive', isActive);

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

  function handleActive(id) {
    dispatch({ type: "selectedCity", payload: id})
    // setSelectedCity(id !== selectedCity && id)
  }

  return(
    <CitiesContext.Provider
      value={{
        cities,
        isLoading,
        handleActive,
        selectedCity,
        error,
        dispatch,
        isActive
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