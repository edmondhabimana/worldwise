import { useEffect, useState } from "react";
import { useLoaderData, Link, useNavigate, redirect} from "react-router-dom"
import { useCities } from "../../contexts/citiesContext";
import { getCurrentCity } from "../../firebase/config";
import FlagImage from "../../ui/FlagImage";
import BackButton from "../../ui/BackButton";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeftLong, faArrowRightLong } from "@fortawesome/pro-regular-svg-icons";

const CityContainer = styled.div`
  background-color: #42484c;
  width: 90%;
  padding: 25px;

  display: flex;
  flex-direction: column;
`
const CityName = styled.div`
  margin-bottom: 20px;
  display: flex;
  gap: 10px;
`
const VisitOn = styled.p`
  margin-bottom: 20px;
`
const CustomLink = styled(Link)`
  color: #ffb545;
  text-decoration-line: underline;
  margin-bottom: 20px;
  display: inline-block;
`
const Title = styled.div`
  color: #bdbdbd;
  margin-bottom: 10px;
  font-weight: 600;
  text-transform: uppercase;
  font-size: 12px;
`
const CityBackButton = styled(BackButton)`
  align-self: flex-start;
`
const LeftArrowIcon = styled(FontAwesomeIcon)`
  margin-right: 5px;
`
const RightArrowIcon = styled(FontAwesomeIcon)`
  margin-left: 5px;
`

export default function City() {
  const [ newDate, setNewDate ] = useState('')
  const currentCity = useLoaderData()
  const { dispatch } = useCities()

  const { city, countryShortName, description, tripDate } = currentCity
  const navigate = useNavigate()

  function handleNavigation() {
    navigate(-1)
  }

  useEffect(() => {
    // console.log(new Date(tripDate));
    // console.log(new Date(tripDate).toString().split(' '));
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    const day = dayNames[new Date(tripDate).getDay()]
    // console.log('day', typeof new Date(tripDate).getDay());
    const month = monthNames[new Date(tripDate).getMonth()]
    // console.log('month', typeof new Date(tripDate).getMonth());
    const [ , , date, year ] = new Date(tripDate).toString().split(' ')

    setNewDate(`${day}, ${month} ${date}, ${year}`)
    dispatch({type: "active", payload: false})
  },[tripDate, dispatch])



  return(
    <CityContainer>
      <div>
        <Title>city name</Title>
        <CityName>
          <FlagImage src={`https://flagsapi.com/${countryShortName}/shiny/64.png`} />
          <p>{city}</p>
        </CityName>
      </div>
      <Title>you went to {city} on</Title>
      <VisitOn>{newDate}</VisitOn>
      <Title>learn more</Title>
      <CustomLink to={`https://en.wikipedia.org/wiki/${city}`} target="_blank">
        check out {city} on Wikipedia 
        <RightArrowIcon icon={faArrowRightLong} />
      </CustomLink>
      <CityBackButton onClick={() => handleNavigation()}>
        <LeftArrowIcon icon={faArrowLeftLong} />
        back
      </CityBackButton>
    </CityContainer>
  )
}

export async function loader({params}) {
  const { id } = params
  const currentCity = await getCurrentCity(id)
  if(currentCity === null){
    return redirect('/app/cities')
  } else {
    return currentCity
  }
}