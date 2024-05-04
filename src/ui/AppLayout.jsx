import { Outlet } from "react-router-dom"
import Navigation from "./Navigation"
import { useState } from "react"
import styled, {css} from "styled-components"
import image from '../assets/bg.jpg'

const backgrounds = {
  backgroundWithImage: css`
    background-position: center;
    background-size: cover;
    background-image: url(${image});
    height: 94vh;
  `,
  backgroundNoImage: css`
    background-color: #2d3438;
  `
}

const Container = styled.div`
  margin-top: 25px;
  margin-left: 25px;
  margin-right: 25px;
  ${(props) => backgrounds[props.background]}
`

const Overlay = styled.div`
  background-color: #2d3438d0;
  width: 100%;
  height: 100%;
`

export default function AppLayout() {
  const [ backgroundImage, setBackgroundImage ] = useState(true)

  return(
    <Container 
     background={backgroundImage ? 'backgroundWithImage' : 'backgroundNoImage'}
    >
      <Overlay>
        <Navigation/>
        <Outlet context={[setBackgroundImage]} />
      </Overlay>
    </Container>
  )
}