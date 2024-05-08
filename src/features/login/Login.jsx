import { useEffect } from "react"
import { useOutletContext } from "react-router-dom"
import { Button } from "../../ui/Button"
import Container from "../../ui/Container"
import { Form } from "../../ui/Form"
import { Label } from "../../ui/Label"
import { Input } from "../../ui/Input"
import Signup from "../signup/Signup"
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
      <Form>
        <Label>
          <span>Email Address</span>
          <Input type="text" placeholder="jack@example.com" required/>
        </Label>
        <Label>
          <span>Password</span>
          <Input type="text" placeholder="Password" required/>
        </Label>
        <Button>login</Button>
        <GoogleButton onClick={logGoogleUser}>
          <FontAwesomeIcon icon={faGoogle} />
          Sign in with Google
        </GoogleButton>
      </Form>
      <Signup/>
    </LoginAndSignUpContainer>
  )
}