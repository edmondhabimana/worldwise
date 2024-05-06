import { useEffect } from "react"
import { useOutletContext } from "react-router-dom"
import { Button } from "../../ui/Button"
import styled from "styled-components"

const LoginContainer = styled.div`
  width: 38%;
  margin-left: auto;
  margin-right: auto;
  margin-top: 100px;
  position: relative;
  z-index: 1;
  background-color: #42484c;
  padding: 30px;
  border-radius: 5px;

  display: flex;
  flex-direction: column;
  gap: 15px;
`
const Label = styled.label`
  color: white;
  font-weight: 500;

  display: flex;
  flex-direction: column;
  gap: 5px;
`
const Input = styled.input`
  height: 38px;
  border-radius: 5px;
  font-size: 16px;
  padding-left: 5px;
  border: none;
`
const LoginButton = styled(Button)`
  align-self: flex-start;
`

export default function Login() {

  const [ setBackgroundImage ] = useOutletContext()

  useEffect(() => {
    setBackgroundImage(false)
  }, [setBackgroundImage])

  return(
    <LoginContainer>
      <Label>
        <span>Email address</span>
        <Input type="text" placeholder="jack@example.com" />
      </Label>
      <Label>
        <span>Password</span>
        <Input type="text" />
      </Label>
      <LoginButton>login</LoginButton>
    </LoginContainer>
  )
}