import { createContext, 
         useReducer, 
         useContext, 
         useEffect, 
         useCallback} from "react";
import { query, 
         collection, 
         orderBy, 
         onSnapshot,
         getDoc, 
         doc,
         where } from "firebase/firestore";
import { db } from "../firebase/config";

const CitiesContext = createContext()

const initialState = {
  cities: [],
  coordinates: [],
  lastLocation: {lat: 51.481383, lng: -0.131836},
  isLoading: false,
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

    case "coordinates/loaded":
      return {...state, coordinates: [...action.payload]}

    case "lastLocation":
      return {...state, lastLocation: action.payload === undefined ? state.lastLocation : action.payload}

    default: 
      throw new Error("Unknown action type")
  }
}

function CitiesProvider({children}) {
  const [{ cities, coordinates, lastLocation, isLoading, selectedCity, isActive, error }, dispatch] = useReducer(
    reducer,
    initialState
  )

  console.log('lastLocation', lastLocation);

  const getCities = useCallback(
    async function getCities(userid) {
      dispatch({type: "loading"})
      const q = query(collection(db, 'cities'), orderBy('createdAt', 'desc'), where("userID", "==", userid))
      onSnapshot(q, (querySnapshot) => {
        const allCities = []
        querySnapshot.forEach((doc) => {
          allCities.push({...doc.data()})
        })
        dispatch({ type: "cities/loaded", payload: allCities})
      })
    
    }, 
    []
  )

  useEffect(() => {
    const getLastLocation = async () => {
      const q = query(collection(db, 'cities'), orderBy('createdAt', 'desc'))
      onSnapshot(q, (querySnapshot) => {
        const allLocations = []
        querySnapshot.forEach((doc) => {
          // console.log(doc.data());
          allLocations.push(doc.data().coordinates)
        })
        dispatch({ type: "lastLocation", payload: allLocations[0]})
      })
    }

   getLastLocation()
  }, [])

  const setMapToCurrentCity = useCallback(
    async function setMapToCurrentCity(city) {
      const docRef = doc(db, "cities", city)
      const docSnap = await getDoc(docRef)
    
      if(docSnap.exists()) {
        dispatch({ type: "lastLocation", payload: docSnap.data().coordinates})
      }
    },[]
  )


  useEffect(() => {
    const getAllCitiesCoordinates = async () => {
      const q = query(collection(db, "cities"))
      onSnapshot(q, (querySnapshot) => {
        const locations = []
        querySnapshot.forEach((doc) => {
          locations.push({
            coordinates: doc.data().coordinates,
            city: doc.data().city,
            countryShortName: doc.data().countryShortName
          })
        })
        dispatch({ type: "coordinates/loaded", payload: locations})
      })
    }

    getAllCitiesCoordinates()
  },[])

  function handleActive(id) {
    dispatch({ type: "selectedCity", payload: id})
    // setSelectedCity(id !== selectedCity && id)
  }

  return(
    <CitiesContext.Provider
      value={{
        cities,
        coordinates,
        lastLocation,
        isLoading,
        handleActive,
        setMapToCurrentCity,
        selectedCity,
        error,
        dispatch,
        isActive,
        getCities
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