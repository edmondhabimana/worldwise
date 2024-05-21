import { useLoaderData } from "react-router-dom"
import { getCities } from "../../firebase/config"
import CityItem from "./CityItem";
import styled from "styled-components";

const Div = styled.div`
  /* background-color: red; */
  
  width: 100%;
  overflow: scroll;
  margin-bottom: 50px;
  scrollbar-color: #2d3438 #2d3438;

  /* &.scroller {
    scrollbar-color: red;
  } */
`

export default function CityList() {
  const cities = useLoaderData()
  // console.log(cities);

  return(
    <Div>
      {cities.map((city, index) => (
        <CityItem city={city} key={index}/>
      ))}
    </Div>
  )
}

export async function loader() {
  const cities = await getCities()
  return cities
}