import { useEffect } from "react";
import { useLoaderData, useNavigate } from "react-router-dom"
import styled from "styled-components";
import { useCities } from "../../contexts/citiesContext";
import { getCitiesBySelectedCountry } from "../../firebase/config";
import CityItem from "./CityItem";
import BackButton from "../../ui/BackButton";
import CitiesContainer from "../../ui/CitiesContainer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeftLong } from "@fortawesome/pro-regular-svg-icons";

const ButtonContainer = styled.div`
  margin-bottom: 50px;
`
const SelectedByCountry = styled(CitiesContainer)`
  margin-bottom: 20px;
` 
const LeftArrowIcon = styled(FontAwesomeIcon)`
  margin-right: 5px;
`

export default function SelectByCountry() {
  const cities = useLoaderData()
  const { dispatch } = useCities()
  const navigate = useNavigate()
  // console.log(cities);

  function handleNavigation() {
    navigate(-1)
  }

  useEffect(() => {
    dispatch({type: "active", payload: true})
  }, [dispatch])

  return(
    <>
      <SelectedByCountry>
        {cities.map((city, index) => (
          <CityItem city={city} key={index} index={index}/>
        ))}
      </SelectedByCountry>
      <ButtonContainer>
        <BackButton onClick={() => handleNavigation()}>
        <LeftArrowIcon icon={faArrowLeftLong} />
          back
        </BackButton>
      </ButtonContainer>
    </>
  )
}

export async function loader({params}) {
  const { country } = params
  const cities = await getCitiesBySelectedCountry(country)
  return cities
}