import { useLoaderData } from "react-router-dom"
import { getCountries } from "../../firebase/config"
import CountryItem from "./CountryItem"

export default function CountryList() {
  const countries = useLoaderData()

  return(
    <div>
      {countries.map((country, index) => (
        <CountryItem key={index} country={country}/>
      ))}
    </div>
  )
}

export async function loader() {
  const countries = await getCountries()
  return countries
}