import { useEffect } from "react"
import { useOutletContext } from "react-router-dom"
import styled from "styled-components"
import Container from "../../ui/Container"
import city from '../../assets/img-2.jpg'
import Image from "../../ui/Image"
import Title from "../../ui/Title"
import P from "../../ui/P"



const ContainerPricing = styled(Container)`
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
    /* height: calc(100% - 50px); */
  }
`
const ImagePricing = styled(Image)`
  @media (max-width: 992px) {
    width: 300px;
  }

  @media (max-width: 395px) {
    width: 200px;
  }
`
const TitlePricing = styled(Title)`
  @media (max-width: 992px) {
    font-size: 30px;
  }

  @media (max-width: 724px) {
    text-align: center;
  }

  @media (max-width: 395px) {
    font-size: 20px;
  }
`
const PPricing = styled(P)`
  @media (max-width: 724px) {
    margin-bottom: 50px;
  }

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
    <ContainerPricing>
      <div>
        <TitlePricing>Simple pricing.</TitlePricing>
        <TitlePricing>Just $9/month.</TitlePricing>
        <PPricing>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Vitae vel labore mollitia iusto. Recusandae quos provident, laboriosam fugit voluptatem iste.</PPricing>
      </div>
      <ImagePricing src={city} alt="picture of a city"/>
    </ContainerPricing>
  )
}