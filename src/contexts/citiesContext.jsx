import { createContext, useReducer, useContext } from "react";

const CitiesContext = createContext()

const initialState = {
  cityAndCountry: [],
  isLoading: [],
  error: ''
}

function reducer(state, action) {
  switch (action.type){
    case 'loading':
      return { ...state, isLoading: true}
    
    case "cityAndCountry/loaded":
      return {...state, isLoading: false, cityAndCountry:action.payload}

    default: 
      throw new Error("Unknown action type")
  }
}

function CitiesProvider({children}) {
  const [{ cityAndCountry, isLoading, error }, dispatch] = useReducer(
    reducer,
    initialState
  )



  return(
    <CitiesContext.Provider
      value={{
        cityAndCountry,
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