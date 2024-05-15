import { useEffect, useState } from "react";
import { Form, useLoaderData } from "react-router-dom"
// import { useCities } from "../../contexts/citiesContext";
import { reverseGeo } from "../../service/reverseGeo";


export default function FormComponent() {
  const [ city, setCity ] = useState()
  const [ country, setCountry ] = useState()

  const locationData = useLoaderData()
  console.log('params', locationData);

  useEffect(() => {
    setCity(locationData[2])
    setCountry(locationData[3])
  },[locationData])

  return(
    <Form method="POST">
      <div>
        <label>City name</label>
        <input type="text" name="city" defaultValue={city}/>
      </div>
      <div>
        <label>When did you go to {city}?</label>
        <input/>
      </div>
      <div>
        <label>Notes about your trip to {city}</label>
        <input/>
      </div>
    </Form>
  )
}

export async function loader({params}) {
  // const coords = []
  // coords.push(params.lat)
  // coords.push(params.lng)
  const {lat, lng } = params
  const locationData = await reverseGeo(lat, lng)
  return locationData
}