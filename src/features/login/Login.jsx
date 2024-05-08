import { useEffect, useState } from "react"
import { useOutletContext } from "react-router-dom"
import { Button } from "../../ui/Button"
import Container from "../../ui/Container"
import { Error } from "../../ui/Error"
import { Form } from "../../ui/Form"
import { Label } from "../../ui/Label"
import { Input } from "../../ui/Input"
import Signup from "../signup/Signup"
import styled from "styled-components"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faGoogle } from "@fortawesome/free-brands-svg-icons"
import { createUserDocumentFromAuth, 
         signInWithGooglePopup,
         signInAuthUserWithEmailAndPassword } from "../../firebase/config"

const defaultFormFields = {
  email: '',
  password: '',
};

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
const Div = styled.div`
 display: flex;
 flex-direction: column;
`

export default function Login() {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const [ emailPasswordError, setEmailPasswordError ] = useState('')
  const { email, password } = formFields;

  const [ setBackgroundImage ] = useOutletContext()

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const logGoogleUser = async () => {
    const { user } = await signInWithGooglePopup()
    createUserDocumentFromAuth(user)
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await signInAuthUserWithEmailAndPassword(email, password);
      resetFormFields();
    } catch (error) {

      if(error.code === 'auth/invalid-credential') {
        setEmailPasswordError('Invalid email/password')
      }else {
        console.log('user sign in failed', error.message);
      }
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormFields({ ...formFields, [name]: value });
  };

  useEffect(() => {
    setBackgroundImage(false)
  }, [setBackgroundImage])

  return(
    <LoginAndSignUpContainer>
      <Form onSubmit={handleSubmit}>
        <Label>
          <span>Email Address</span>
          <Input 
            type="email" 
            placeholder="jack@example.com"
            name="email"
            onChange={() => handleChange(event)}
            onFocus={() => setEmailPasswordError('')}
            value={email}
          />
        </Label>
        <Label>
          <span>Password</span>
          <Input 
            type="password" 
            placeholder="Password"
            name="password"
            value={password}
            onChange={() => handleChange(event)}
            onFocus={() => setEmailPasswordError('')}
          />
        </Label>
        <Div>
          <Button>login</Button>
          <Error>{emailPasswordError}</Error>
        </Div>
        <GoogleButton onClick={logGoogleUser}>
          <FontAwesomeIcon icon={faGoogle} />
          Sign in with Google
        </GoogleButton>
      </Form>
      <Signup/>
    </LoginAndSignUpContainer>
  )
}