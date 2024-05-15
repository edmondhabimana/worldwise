import { useEffect, useState } from "react"
import { Outlet } from "react-router-dom"
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet"
import { Button } from "../../ui/Button"
import ChangeMapPosition from "./ChangeMapPosition"
import userLocation  from "../../hooks/userLocation"
import DetectClick from "./DetectClick"
import styled from "styled-components"

const WorldWiseAppContainer = styled.div`
  height: 100vh;
  width: 100vw;
  padding: 25px;
  display: flex;
  align-items: center;
  justify-content: center;
`
const DivWithMap = styled.div`
  height: 100%;
  background-color: red;
  position: relative;
  /* z-index: 3; */
  width: 50%;
`
const Map = styled(MapContainer)`
  height: 100%;
  background-color: red;
  z-index: 3;
  width: 100%;
`
const GetUserLocationButton = styled(Button)`
  position: absolute;
  bottom: 40px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 10;
`
const DataDiv = styled.div`
  background-color: #2d3438;
  width: 50%;
  height: 100%;
  color: white;
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

  return(
    <WorldWiseAppContainer>
      <DataDiv>
        <Outlet/>  
      </DataDiv>
      <DivWithMap>
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
          <DetectClick/>
          <ChangeMapPosition position={coord}/>
        </Map>
      </DivWithMap>
    </WorldWiseAppContainer>
  )
}

