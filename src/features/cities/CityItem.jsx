import { useEffect, useState } from "react"
import { NavLink, useNavigate } from "react-router-dom"
import styled from "styled-components"
import { deleteCity } from "../../firebase/config"
import { useCities } from "../../contexts/citiesContext"
import FlagImage from "../../ui/FlagImage"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faX } from "@fortawesome/free-solid-svg-icons"

// const CustomNavLink = styled(NavLink)`
//   text-decoration: none;
//   color: white;
// `
const CityContainer = styled.div`
  background-color: #42484c;
  margin-bottom: 15px;
  margin-left: auto;
  margin-right: auto;
  padding: 10px 20px;
  border-radius: 5px;
  border-left: #00a200 solid 5px;
  border: ${props => props.index === props.selectedcity ? '2px solid #00a200' : ''};
  border-left: ${props => props.index === props.selectedcity ? '#00a200 solid 5px' : ''};
  width: 90%;
  cursor: pointer;

  display: flex;
  justify-content: space-between;
`
const SubContainer = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
`
const PDate = styled.p`
  font-size: 14px;
`
const XIcon = styled(FontAwesomeIcon)`
  width: 8px;
  height: 8px;
  padding: 5px;
  border-radius: 50%;
  background-color: #2d3438;
`

export default function CityItem ({city, index}) {
  const [ newTimestamp, setNewTimestamp ] = useState('')
  // console.log(city);
  const { city: cityName, countryShortName, tripDate } = city
  const { handleActive, selectedCity : selectedcity } = useCities()
  const navigate = useNavigate()

  function handleNavigation() {
    navigate(`/app/cities/${cityName}`)
  }

  useEffect(() => {
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    const newDate = new Date(tripDate)
    const getMonth = newDate.getMonth()
    const month = monthNames[getMonth]
    // console.log('month', month);
    const [ , , date, year, ] = newDate.toString().split(' ')

    setNewTimestamp(`${month} ${date}, ${year}`)

  }, [tripDate])
  return(
    <CityContainer 
      selectedcity={selectedcity}
      index={index} 
      onClick={() => {handleActive(index); handleNavigation()}}
    >
      <SubContainer>
        <FlagImage src={`https://flagsapi.com/${countryShortName}/shiny/64.png`} />
        <p>{cityName}</p>
      </SubContainer>
      <SubContainer>
        <PDate>({newTimestamp})</PDate>
        <XIcon icon={faX} onClick={() => deleteCity(cityName)}/>
      </SubContainer>
    </CityContainer>
  )
}