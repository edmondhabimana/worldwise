import { Link } from "react-router-dom"
import styled from "styled-components"
import FlagImage from "../../ui/FlagImage"

const CountryContainer = styled.div`
  background-color: #42484c;
  border-radius: 8px;
  border-left: 4px solid  #ffb545;
  padding: 5px 30px;
  text-align: center;
  font-weight: 600;
`
const CustomLink = styled(Link)`
  text-decoration: none;
  color: white;
`


export default function CountryItem({country}) {
  const [ countryName, shortName ] = country

  return(
    <CustomLink to={`/app/countries/${countryName}`}>
      <CountryContainer>
      <FlagImage src={`https://flagsapi.com/${shortName}/shiny/64.png`} />
      <p>{countryName}</p>
      </CountryContainer>
    </CustomLink>

  )
}