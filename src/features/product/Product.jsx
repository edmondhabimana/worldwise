import { useEffect } from "react"
import { useOutletContext } from "react-router-dom"
import sunSet from '../../assets/img-2.jpg'
import Container from "../../ui/Container"
import Image from "../../ui/Image"
import Title from "../../ui/Title"
import P from "../../ui/P"
import styled from "styled-components"

const ContainerProduct = styled(Container)`
  @media (max-width: 1245px) {
    padding-right: 80px;
    padding-left: 80px;
  }

  @media (max-width: 1042px) {
    padding-right: 50px;
    padding-left: 50px;
    gap: 50px;
  }

  @media (max-width: 765px) {
    flex-direction: column-reverse;
    /* bottom: 25px; */
  }
`
const ImageProduct = styled(Image)`
  @media (max-width: 1042px) {
    width: 300px;
    margin-bottom: 50px;
  }

  @media (max-width: 425px) {
    width: 200px;
    margin-bottom: 50px;
  }
`

const TitleProduct = styled(Title)`
  @media (max-width: 1042px) {
    font-size: 30px;
  }

  @media (max-width: 765px) {
    text-align: center;
  }

  @media (max-width: 425px) {
    font-size: 20px;
  }
`
const PProduct = styled(P)`
  @media (max-width: 425px) {
    font-size: 12px;
  }
`

export default function Product() {
  const [ setBackgroundImage ] = useOutletContext()

  useEffect(() => {
    setBackgroundImage(false)
  }, [setBackgroundImage])
  
  return(
    <ContainerProduct>
      <ImageProduct src={sunSet} alt="person and dog watching the sun set"/>
      <div>
        <TitleProduct>About WorldWide.</TitleProduct>
        <PProduct>Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo est dicta illum vero culpa cum quaerat architecto sapiente eius non soluta, molestiae nihil laborum, placeat debitis, laboriosam at fuga perspiciatis?</PProduct>
        <PProduct>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Corporis doloribus libero sunt expedita ratione iusto, magni, id sapiente sequi officiis et.</PProduct>
      </div>
    </ContainerProduct>
  )
}