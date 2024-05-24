import { useEffect, useState } from "react"
import { NavLink } from "react-router-dom"
import styled from "styled-components"
import { deleteCity } from "../../firebase/config"
import FlagImage from "../../ui/FlagImage"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faX } from "@fortawesome/free-solid-svg-icons"

const CustomNavLink = styled(NavLink)`
  text-decoration: none;
  color: white;

  &.active {
    border: 1px solid #00a200;
    color: #00a200;
  }
`
const CityContainer = styled.div`
  background-color: #42484c;
  margin-bottom: 15px;
  margin-left: auto;
  margin-right: auto;
  padding: 10px 20px;
  border-radius: 5px;
  border-left: #00a200 solid 5px;
  width: 90%;

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

export default function CityItem ({city}) {
  const [ newTimestamp, setNewTimestamp ] = useState('')
  // console.log(city);
  const { city: cityName, countryShortName, tripDate } = city

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
    <CustomNavLink to={`${cityName}`}>
      <CityContainer>
        <SubContainer>
          <FlagImage src={`https://flagsapi.com/${countryShortName}/shiny/64.png`} />
          <p>{cityName}</p>
        </SubContainer>
        <SubContainer>
          <PDate>({newTimestamp})</PDate>
          <XIcon icon={faX} onClick={() => deleteCity(cityName)}/>
        </SubContainer>
      </CityContainer>
    </CustomNavLink>

  )
}