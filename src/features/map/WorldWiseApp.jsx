import { useEffect, useState } from "react"
import styled from "styled-components"
import styles from "./WorldWiseApp.module.css"
import { Outlet, NavLink } from "react-router-dom"
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet"
import { useCities } from "../../contexts/citiesContext"
import { useAuth } from "../../contexts/AuthContext"
import { useLogout } from "../../hooks/useLogout"
import ProfileThumbnail from "../profileThumbnail/ProfileThumbnail"
import { Button } from "../../ui/Button"
import ChangeMapPosition from "./ChangeMapPosition"
import userLocation  from "../../hooks/userLocation"
import DetectClick from "./DetectClick"
import logo from '../../assets/logo.png'
import FlagImage from '../../ui/FlagImage'
import profileImage from '../../assets/profile-image-placeholder.webp'

const WorldWiseAppContainer = styled.div`
  height: 100vh;
  width: 100vw;
  padding: 25px;
  position: relative;

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
    background-color: ${props => props.isactive === "true" ? "#242a2e" : ""} ;
  }
`
const Profile = styled.div`
  position: absolute;
  right: 15px;
  top: 15px;
  z-index: 10;
  color: white;
  background-color: #2d3438;
  padding: 10px;
  border-radius: 8px;

  display: flex;
  align-items: center;
  gap: 10px;
`
const ProfileName = styled.p`
  font-weight: 600;
`
const ProfileButton = styled.button`
  padding: 8px;
  border-radius: 8px;
  text-transform: uppercase;
  background-color: #42484c;
  color: white;
  border: none;
  font-size: 12px;
  cursor: pointer;
  /* font-weight: 500; */
`
const User = styled.div`
  background-color: green;
  width: 50px;
  height: 50px;
  border-radius: 50%;
`
const ProfileImage = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
`
const Copyright = styled.div`
  padding-bottom: 10px;
  color: #9a9b9d;
  font-size: 13px;
  position: fixed;
  bottom: 30px;
`

export default function WorldWiseApp() {
  const [ coord, setCoord ] = useState([51.481383, -0.131836])
  const [ year, setYear ] = useState('')
  const [showUploadPopup, setShowUploadPopup] = useState(false)
  const [profileImageExist, setProfileImageExist] = useState(false)
  const { handleLocation, isLoading, myPosition} = userLocation()
  const { dispatch, isActive, coordinates, lastLocation } = useCities()
  const { logout } = useLogout()
  const { userDocument, checkIfImageFileExist } = useAuth()
  // const { userDocument } = useUserDocument(user)
  // console.log('user', user);
  console.log('user document',userDocument);
  // const { displayName, photoURL } = userDocument
  const { lat, lng } = lastLocation
  // console.log('user photo',user);
  // console.log('coord', coord);

  // console.log('userResults', userResults);
  


  useEffect(function() {
    myPosition  &&
      setCoord([myPosition.lat, myPosition.lng])
  }, [myPosition])

  useEffect(() => {
    const now = new Date()
    setYear(now.toString().split(' ')[3]);
    setCoord([lat, lng])
  }, [lat, lng])

  useEffect(() => {
    if(userDocument === null) return

    async function checkImage() {
     const results =  await checkIfImageFileExist()
 
      setProfileImageExist(results[0])
     
    }
    checkImage()
  }, [checkIfImageFileExist, userDocument])


  return(
    <>
      {userDocument !== null &&
        <WorldWiseAppContainer>
          <DataDiv>
            <LogoImage src={logo} alt="company logo"/>
            <NavContainer>
              <CustomNav 
                to={'/app/cities'} 
                onClick={() => dispatch({type: "selectedCity", payload: null})}
                isactive={isActive.toString()}
              >
                cities
              </CustomNav>
              <CustomNav 
                to={'/app/countries'} 
                onClick={() => dispatch({type: "selectedCity", payload: null})}
                isactive={isActive.toString()}
              >
                countries
              </CustomNav>
            </NavContainer>
            <Outlet/> 
            <Copyright>
              <p>Copyright {year} by WorldWise Inc.</p>
            </Copyright> 
          </DataDiv>
          <DivWithMap>
            <Profile>
              <User onClick={() => setShowUploadPopup(true)}>
                <ProfileImage src={profileImageExist ? userDocument.photoURL : profileImage} />
              </User>
              <ProfileName>Welcome, {userDocument.displayName}</ProfileName>
              <ProfileButton onClick={() => logout()}>logout</ProfileButton>
            </Profile>
            <ProfileThumbnail 
              showUploadPopup={showUploadPopup}
              setShowUploadPopup={setShowUploadPopup}
            />
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
                <>
                  <Marker position={[myPosition.lat, myPosition.lng]}>
                    <Popup>
                      A pretty CSS3 popup. <br /> Easily customizable.
                    </Popup>
                  </Marker>
                </>
              }
              {
                coordinates.map((position, index) => (
                <Marker position={position.coordinates} key={index}>
                  <Popup className={styles.popup}>
                    <FlagImage src={`https://flagsapi.com/${position.countryShortName}/shiny/64.png`} />
                    <p>{position.city}</p>
                  </Popup>
                </Marker>
                ))
              }
              <DetectClick/>
              <ChangeMapPosition position={coord}/>
            </Map>
          </DivWithMap>
        </WorldWiseAppContainer>
      }
    </>

  )
}

