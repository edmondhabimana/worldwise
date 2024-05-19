import { useEffect, useState } from "react";
import { Form, useLoaderData, useNavigate } from "react-router-dom"
import styled from "styled-components";
// import { useCities } from "../../contexts/citiesContext";
import { reverseGeo } from "../../service/reverseGeo";
import ReactDatePicker from "react-datepicker";
import { Label } from "../../ui/Label";
import { Input } from "../../ui/Input";
import { Button } from "../../ui/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeftLong } from "@fortawesome/pro-regular-svg-icons";

const ErrorDiv = styled.div`
  font-weight: 600;
  margin-top: 50px;
`
const RouterForm = styled(Form)`
  width: 90%;
  background-color: #42484c;
  padding: 25px;
  border-radius: 5px;
`
const FormLabel = styled(Label)`
  margin-bottom: 5px;
  font-weight: 600;
`
const FormInput = styled(Input)`
  width: 100%;
  margin-bottom: 20px;
  background-color: #d5dee0;


  &:focus {
    background-color: white;
    outline: none;
  }
`
const DatePicker = styled(ReactDatePicker)`
  height: 38px;
  border-radius: 5px;
  font-size: 16px;
  padding-left: 5px;
  border: none;
  width: 100%;
  margin-bottom: 20px;
  background-color: #d5dee0;

  &:focus {
    background-color: white;
    outline: none;
  }
`
const CityNameContainer = styled.div`
  position: relative;
  /* background-color: red; */
`
const FlagImage = styled.img`
  width: 40px;
  position: absolute;
  right: 10px;
`
const DateContainer = styled.div`
  display: flex;
  flex-direction: column;
`
const TextArea = styled.textarea`
  width: 100%;
  border-radius: 5px;
  height: 70px;
  margin-bottom: 20px;
  background-color: #d5dee0;

  &:focus {
    background-color: white;
    outline: none;
  }
`
const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
`
const BackButton = styled(Button)`
  background-color: #42484c;
  color: white;
  border: 1px solid white;
`
const ArrowIcon = styled(FontAwesomeIcon)`
  margin-right: 5px;
`

export default function FormComponent() {
  const [ city, setCity ] = useState()
  const [ country, setCountry ] = useState()
  const [ error, setError ] = useState(null)
  const [ countryAbbreviation, setCountryAbbreviation] = useState()
  const [ startDate, setStartDate ] = useState()

  const locationData = useLoaderData()
  const navigate = useNavigate()

  function handleNavigation() {
    navigate('/app/cities')
  }

  useEffect(() => {
    if(locationData === "error"){
      setError("That doesn't seem to be a city. Click somewhere else.")
    } else {
    setError(null)
    setCity(locationData[0])
    setCountry(locationData[1])
    setCountryAbbreviation(locationData[2])
    }

  },[locationData])

  return(
    <>
      {error ? 
        <ErrorDiv>
          <p>{error}</p>
        </ErrorDiv> :
        <RouterForm method="POST">
          <CityNameContainer>
            <FormLabel>City name</FormLabel>
            <FormInput 
              type="text" 
              name="city" 
              defaultValue={city}
              required
            />
            <input type="hidden" name="country" value={country}/>
            <FlagImage src={`https://flagsapi.com/${countryAbbreviation}/shiny/64.png`} />
          </CityNameContainer>
          <DateContainer>
            <FormLabel>When did you go to {city}?</FormLabel>
            {/* <FormInput type="text" name="date" /> */}
            <DatePicker selected={startDate} name="date" onChange={(date) => setStartDate(date)} required/>
          </DateContainer>
          <div>
            <FormLabel>Notes about your trip to {city}</FormLabel>
            <TextArea type="text" name="description"/>
          </div>
          <ButtonContainer>
            <Button>add</Button>
            <BackButton
              onClick={(e) => {
                e.preventDefault();
                handleNavigation();
              }}
            >
              <ArrowIcon icon={faArrowLeftLong} />
              back
            </BackButton>
          </ButtonContainer>
        </RouterForm>
      }
    </>
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

export async function action({request}) {
  const formData = await request.formData()
  const data = Object.fromEntries(formData)
  console.log(data);
  return null
}