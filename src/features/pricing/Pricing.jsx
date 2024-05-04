import { useEffect } from "react"
import { useOutletContext } from "react-router-dom"
import city from '../../assets/img-2.jpg'
import styled from "styled-components"
import Title from "../../ui/Title"

const PricingContainer = styled.div`
  margin-top: 30px;
  padding-right: 180px;
  padding-left: 180px;
  height: 75vh;
  max-width: 1440px;
  margin-left: auto;
  margin-right: auto;

  display: flex;
  align-items: center;
  gap: 80px;

  @media (max-width: 1190px) {
    padding-right: 80px;
    padding-left: 80px;
  }

  @media (max-width: 992px) {
    padding-right: 50px;
    padding-left: 50px;
    gap: 50px;
  }

  @media (max-width: 724px) {
    flex-direction: column-reverse;
  }
`

const CityImage = styled.img`
  width: 400px;

  @media (max-width: 992px) {
    width: 300px;
  }

  @media (max-width: 395px) {
    width: 200px;
  }
`
const P = styled.p`
  color: var(--title-white-color);
  margin-top: 30px;

  @media (max-width: 395px) {
    font-size: 12px;
  }
`

export default function Pricing() {

  const [ setBackgroundImage ] = useOutletContext()

  useEffect(() => {
    setBackgroundImage(false)
  }, [setBackgroundImage])

  return(
    <PricingContainer>
      <div>
        <Title>Simple pricing.</Title>
        <Title>Just $9/month.</Title>
        <P>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Vitae vel labore mollitia iusto. Recusandae quos provident, laboriosam fugit voluptatem iste.</P>
      </div>
      <CityImage src={city} alt="picture of a city"/>
    </PricingContainer>
  )
}