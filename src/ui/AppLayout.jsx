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
    /* z-index: -1; */
    /* height: 100%; */
  `,
  backgroundNoImage: css`
    background-color: #2d3438;
    /* width: 100%; */
    /* align-self: auto; */
  `
}

const ApplayoutContainer = styled.div`
  margin-top: 25px;
  margin-left: 25px;
  margin-right: 25px;
  /* margin-bottom: 25px; */
  /* background-color: red; */
  /* height: 100%; */
  min-height: calc(100vh - 50px);
  position: relative;
  /* display: flex; */
  ${(props) => backgrounds[props.background]}

`

const Overlay = styled.div`
  background-color: #2d3438d0;
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  /* z-index: 0; */
  /* margin-top: 25px;
  margin-left: 25px;
  margin-right: 25px;
  margin-bottom: 25px; */
  /* min-height: calc(100vh - 50px); */

  /* align-self: auto; */
`

export default function AppLayout() {
  const [ backgroundImage, setBackgroundImage ] = useState(true)

  return(
    <ApplayoutContainer 
     background={backgroundImage ? 'backgroundWithImage' : 'backgroundNoImage'}
    >
      <Overlay>
      </Overlay>
      <Navigation/>
      <Outlet context={[setBackgroundImage]} />
    </ApplayoutContainer>
  )
}