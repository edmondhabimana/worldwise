import { useEffect, useState } from "react"
import { MapContainer, TileLayer, Marker, Popup, useMapEvents, useMap } from "react-leaflet"
// import { Loader } from "@googlemaps/js-api-loader"
// import { useMap } from "../../hooks/useMap"
import { Button } from "../../ui/Button"
import ChangeMapPosition from "../map/changeMapPosition"
import userLocation  from "../../hooks/userLocation"
import styled from "styled-components"
// import 'leaflet/dist/leaflet.css';

const GetUserLocationButton = styled(Button)`
  position: absolute;
  bottom: 50%;
  right: 50%;
  z-index: 10;
`
const Map = styled(MapContainer)`
  height: 100vh;
  background-color: red;
  /* position: relative; */
  z-index: 3;
  width: 50%;
`

export default function WorldWiseApp() {
  const [ coord, setCoord ] = useState([51.505, -0.09])

  const { handleLocation, isLoading, myPosition} = userLocation()
  console.log('my position', myPosition);

  useEffect(function() {
    myPosition  ?
      setCoord([myPosition.lat, myPosition.lng]) :
      setCoord([51.505, -0.09])
  }, [myPosition])

    // const map = useMapEvents({
    //   click() {
    //     map.locate()
    //   },
    //   locationfound(e) {
    //     setCoord(e.latlng)
    //     map.flyTo(e.latlng, map.getZoom())
    //   },
    // })

  // function LocationMarker() {
  //   useMapEvents({
  //     click(e) {
  //       console.log(e);
  //       setCoord(e.latlng)
  //       setLat(e.latlng.lat)
  //       setLng(e.latlng.lng)
  //     }
  //   })

  //   return coord === null ? null : (
  //     <Marker position={coord}>
  //       <Popup>You are here</Popup>
  //     </Marker>
  //   )
  
  // }

  // function LocationMarker() {
  //   const map = useMapEvents({
  //     click() {
  //       map.locate()
  //     },
  //     locationfound(e) {
  //       setCoord(e.latlng)
  //       map.flyTo(e.latlng, map.getZoom())
  //     },
  //   })

  //   return(
  //     <div>
  //       {coord === null ? 
  //         null : 
  //         <Marker position={coord}>
  //           <Popup>You are here</Popup>
  //         </Marker>
  //       }
  //       <GetUserLocationButton>get user location</GetUserLocationButton>
  //     </div>
  //   )
  // }






  return(
    <div>
      {!myPosition && 
        <GetUserLocationButton onClick={() => handleLocation()}>
          {isLoading ? 'LOADING...' : 'use your position'}
        </GetUserLocationButton>
      }
      <Map center={coord} zoom={6} scrollWheelZoom={true}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          
        />
        { myPosition && 
            <Marker position={coord}>
              <Popup>
                A pretty CSS3 popup. <br /> Easily customizable.
              </Popup>
            </Marker>
        }

        <ChangeMapPosition position={coord}/>
      </Map>
    </div>
  )
}

