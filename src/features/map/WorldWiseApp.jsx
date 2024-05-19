import { useEffect, useState } from "react"
import styled from "styled-components"
import { Outlet, NavLink } from "react-router-dom"
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet"
import { Button } from "../../ui/Button"
import ChangeMapPosition from "./ChangeMapPosition"
import userLocation  from "../../hooks/userLocation"
import DetectClick from "./DetectClick"
import logo from '../../assets/logo.png'

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
  position: relative;

  display: flex;
  flex-direction: column;
  align-items: center;
`
const LogoImage = styled.img`
  width: 200px;
  margin-top: 30px;
  margin-bottom: 30px;
`
const NavContainer = styled.div`
  background-color: #42484c;
  border-radius: 5px;
  margin-bottom: 10px;
  display: flex;
`
const CustomNav = styled(NavLink)`
  color: white;
  text-decoration: none;
  padding-left: 20px;
  padding-right: 20px;
  align-self: flex-end;
  padding: 5px 20px;
  border-radius: 5px;
  text-transform: uppercase;
  font-weight: 600;
  font-size: 13px;

  &.active {
    background-color: #242a2e;
  }
`
const Copyright = styled.div`
  padding-top: 10px;
  padding-bottom: 20px;
  color: #9a9b9d;
  font-size: 13px;
  position: fixed;
  bottom: 30px;
  background-color: #2d3438;
`

export default function WorldWiseApp() {
  const [ coord, setCoord ] = useState([51.481383, -0.131836])
  const [ year, setYear ] = useState('')
  const { handleLocation, isLoading, myPosition} = userLocation()
  


  useEffect(function() {
    myPosition  ?
      setCoord([myPosition.lat, myPosition.lng]) :
      setCoord([51.481383, -0.131836])
  }, [myPosition])

  useEffect(() => {
    const now = new Date()
    setYear(now.toString().split(' ')[3]);
  }, [])

  return(
    <WorldWiseAppContainer>
      <DataDiv>
        <LogoImage src={logo} alt="company logo"/>
        <NavContainer>
          <CustomNav to={'/app/cities'} >cities</CustomNav>
          <CustomNav to={'/app/countries'} >countries</CustomNav>
        </NavContainer>
        <Outlet/> 
        <Copyright>
          <p>Copyright {year} by WorldWise Inc.</p>
        </Copyright> 
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

