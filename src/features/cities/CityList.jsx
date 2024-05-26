import { useEffect } from "react";
import styled from "styled-components"
import { useCities } from "../../contexts/citiesContext";
import CityItem from "./CityItem";
import CitiesContainer from "../../ui/CitiesContainer"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/pro-duotone-svg-icons";

const LoadingIcon = styled(FontAwesomeIcon)`
  font-size: 40px;
  display: block;
  margin-left: auto;
  margin-right: auto;
  margin-top: 100px;
`

export default function CityList() {
  const { cities, isLoading } = useCities()
  const { dispatch } = useCities()
  
  useEffect(() => {
    dispatch({type: "active", payload: true})
  }, [dispatch])

  return(
    <CitiesContainer>
      {isLoading ? 
        <LoadingIcon icon={faSpinner} spin /> : 
        cities.map((city, index) => (
          <CityItem 
            city={city} 
            key={index} 
            index={index} 
          />
        ))
      }
    </CitiesContainer>
  )
}

