import { useLoaderData } from "react-router-dom"
import { getCountries } from "../../firebase/config"
import CountryItem from "./CountryItem"
import styled from "styled-components"

const CountriesContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 15px;
`

export default function CountryList() {
  const countries = useLoaderData()

  return(
    <CountriesContainer>
      {countries.map((country, index) => (
        <CountryItem key={index} country={country}/>
      ))}
    </CountriesContainer>
  )
}

export async function loader() {
  const countries = await getCountries()
  return countries
}