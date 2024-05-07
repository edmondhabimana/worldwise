import { useEffect } from "react"
import { useOutletContext } from "react-router-dom"
import { Button } from "../../ui/Button"
import Container from "../../ui/Container"
import styled from "styled-components"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faGoogle } from "@fortawesome/free-brands-svg-icons"
import { createUserDocumentFromAuth, signInWithGooglePopup } from "../../firebase/config"

const LoginAndSignUpContainer = styled(Container)`
  padding-bottom: 60px;
  margin-bottom: 25px;
  justify-content: center;
  gap: 30px;
`

const LoginContainer = styled.div`
  width: 38%;
  margin-top: 20px;
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
const GoogleButton = styled(Button)`
  display: flex;
  gap: 8px;
  justify-content: center;
`

export default function Login() {

  const [ setBackgroundImage ] = useOutletContext()

  const logGoogleUser = async () => {
    const { user } = await signInWithGooglePopup()
    createUserDocumentFromAuth(user)
  }

  useEffect(() => {
    setBackgroundImage(false)
  }, [setBackgroundImage])

  return(
    <LoginAndSignUpContainer>
      <LoginContainer>
        <Label>
          <span>Email Address</span>
          <Input type="text" placeholder="jack@example.com" />
        </Label>
        <Label>
          <span>Password</span>
          <Input type="text" placeholder="Password"/>
        </Label>
        <Button>login</Button>
        <GoogleButton onClick={logGoogleUser}>
          <FontAwesomeIcon icon={faGoogle} />
          Sign in with Google
        </GoogleButton>
      </LoginContainer>
      <LoginContainer>
        <Label>
          <span>Display Name</span>
          <Input type="text" placeholder="Jack Denial"/>
        </Label>
        <Label>
          <span>Email Address</span>
          <Input type="text" placeholder="jack@example.com"/>
        </Label>
        <Label>
          <span>Password</span>
          <Input type="text" placeholder="Password"/>
        </Label>
        <Label>
          <span>Confirm Password</span>
          <Input type="text" placeholder="Confirm Password"/>
        </Label>
        <Button>sign up</Button>
      </LoginContainer>
    </LoginAndSignUpContainer>
  )
}