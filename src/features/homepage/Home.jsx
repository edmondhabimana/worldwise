import { useEffect } from "react"
import { useOutletContext } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import styled from "styled-components"
import { Button } from "../../ui/Button"

const HomeConatiner = styled.div`
  margin-right: auto;
  margin-left: auto;
  text-align: center;
  margin-top: 100px;
  padding: 10px 50px;

  @media (max-width: 2560px) {
    max-width: 1440px;
  }
`
const H1 = styled.h1`
  color: #ececec;
  font-size: 45px;
  font-weight: 600;

  @media (max-width: 500px) {
    font-size: 35px;
  }

  @media (max-width: 395px) {
    font-size: 25px;
  }
`
const P = styled.p`
  color: #a1a1a2;
  font-size: 20px;
  margin-top: 30px;
  margin-bottom: 30px;

  @media (max-width: 500px) {
    font-size: 13px;
  }
`

export default function Home() {

  const [ setBackgroundImage ] = useOutletContext()
  const navigate = useNavigate()

  function handleNavigation() {
    navigate('/login')
  }

  useEffect(() => {
    setBackgroundImage(true)
  }, [setBackgroundImage])

  return (
    <HomeConatiner>
    <H1>You travel the world.
    WorldWise keeps track of your adventures.</H1>
    <P>A world map that tracks your footsteps into every city you can think of. Never forget your wonderful experiences, and show your friends how you have wandered the world.</P>
    <Button onClick={() => handleNavigation()}>start tracking now</Button>
    </HomeConatiner>
  )
}