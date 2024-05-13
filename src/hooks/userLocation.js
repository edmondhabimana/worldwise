import { useState } from "react";
import { useMapEvents } from "react-leaflet";

// const loader = new Loader({
//   apiKey: "AIzaSyCISYh0ARKfmih1O7e7Ekdw6dpxvVx_Z3s",
//   version: "weekly",
//   // ...additionalOptions,
// });
export default function useUserLoaction() {
  const [ myPosition, setMyPosition ] = useState(null)
  const [isLoading, setIsLoading] = useState(false)


  function handleLocation() {
    if(navigator.geolocation) {
      setIsLoading(true)
      navigator.geolocation.getCurrentPosition(function(pos) {
        setMyPosition({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        })
        setIsLoading(false)
      }, function(error) {
        console.log(error);
        console.log(error.message);
        // console.error("Error Code = " + error.code + " - " + error.message);
        setIsLoading(false)
      })
    }
  }

  return { handleLocation, isLoading, myPosition }
}
