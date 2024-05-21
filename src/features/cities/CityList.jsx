import CityItem from "./CityItem";
import styled from "styled-components";
import { useCities } from "../../contexts/citiesContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/pro-duotone-svg-icons";

const Div = styled.div`
  width: 100%;
  overflow: scroll;
  margin-bottom: 50px;
  scrollbar-color: #2d3438 #2d3438;
`
const LoadingIcon = styled(FontAwesomeIcon)`
  font-size: 40px;
  display: block;
  margin-left: auto;
  margin-right: auto;
  margin-top: 100px;
`

export default function CityList() {
  const { cities, isLoading } = useCities()

  return(
    <Div>
      {isLoading ? 
        <LoadingIcon icon={faSpinner} spin /> : 
        cities.map((city, index) => (
          <CityItem city={city} key={index}/>
        ))
      }
    </Div>
  )
}

