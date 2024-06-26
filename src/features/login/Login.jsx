import { useEffect, useState } from "react"
import { useNavigate, useOutletContext } from "react-router-dom"
import { createUserDocumentFromAuth, 
         signInWithGooglePopup,
         signInAuthUserWithEmailAndPassword } from "../../firebase/config"
import useScreenSize from "../../hooks/useScreenSize"
import { useAuth } from "../../contexts/AuthContext"
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
import { faArrowRightLong, faSpinner } from "@fortawesome/pro-light-svg-icons"


const defaultFormFields = {
  email: '',
  password: '',
};

const LoginAndSignUpContainer = styled(Container)`
  /* background-color: red; */
  padding-bottom: 60px;
  margin-bottom: 25px;
  justify-content: center;
  gap: 30px;

  @media (max-width: 1175px) {
    padding-left: 0;
    padding-right: 0;
  }

  @media (max-width: 818px) {
    flex-direction: column;
  }
`
const GoogleButton = styled(Button)`
  display: flex;
  gap: 8px;
  justify-content: center;

  @media (max-width: 381px) {
    gap: 4px;
  }
`
const Div = styled.div`
 display: flex;
 flex-direction: column;
`
const RevealButton = styled.button`
  border-bottom: 1px solid white;
  border-top: none;
  border-left: none;
  border-right: none;
  background-color: #2d3438;
  color: white;
  text-transform: uppercase;
  font-size: 16px;
  cursor: pointer;

  @media (max-width: 381px) {
    font-size: 12px;
  }
`
const RightArrow = styled(FontAwesomeIcon)`
  margin-left: 10px;

  @media (max-width: 381px) {
    margin-left: 6px;
  }
`

export default function Login() {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const [ emailPasswordError, setEmailPasswordError ] = useState('')
  const [ showForm, setShowForm ] = useState(false)
  const [ loginPending, setLoginPending ] = useState(false)
  const [ googleLoginPending, setGoogleLoginPending ] = useState(false)
  const { email, password } = formFields;
  const { dispatch } = useAuth()
  const navigate = useNavigate()
  const [ setBackgroundImage ] = useOutletContext()
  const { width } = useScreenSize()
  // console.log(width);

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const logGoogleUser = async () => {
    setGoogleLoginPending(true)
    const { user } = await signInWithGooglePopup()
    setGoogleLoginPending(false)
    createUserDocumentFromAuth(user)
    dispatch({ type: 'login', payload: user })
    navigate('/app/cities')
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    if(!email || !password) {
      setEmailPasswordError('Invalid email/password')
      return
    }
    setLoginPending(true)

    try {
     const { user } = await signInAuthUserWithEmailAndPassword(email, password);
     dispatch({ type: 'login', payload: user })
     setLoginPending(false)
     navigate('/app/cities')
    //  console.log(user);
      resetFormFields();
    } catch (error) {

      if(error.code === 'auth/invalid-credential') {
        setEmailPasswordError('Invalid email/password')
      }else {
        console.log('user sign in failed', error.message);
      }
      setLoginPending(false)
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormFields({ ...formFields, [name]: value });
  };

  useEffect(() => {
    setBackgroundImage(false)
  }, [setBackgroundImage])

  useEffect(() => {
    if(width >= 818) {
      setShowForm(false)
    }
  }, [width])

  return(
    <LoginAndSignUpContainer>
      {!showForm && 
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
              <Button>
                {loginPending && <FontAwesomeIcon icon={faSpinner} spin />}
                {!loginPending && 'login'}
              </Button>
              <Error>{emailPasswordError}</Error>
            </Div>
            <GoogleButton 
              onClick={(e) => {
                e.preventDefault();
                logGoogleUser();
              }}
            >
              {googleLoginPending && <FontAwesomeIcon icon={faSpinner} spin />}
              {!googleLoginPending && <FontAwesomeIcon icon={faGoogle} />}
              {!googleLoginPending && 'Sign in with Google'}
            </GoogleButton>
          </Form>
      }

      { 818 < width ? 
       <Signup/> : 
       !showForm && 
       <RevealButton onClick={() => setShowForm((value) => !value)}>
        sign up
        <RightArrow icon={faArrowRightLong} />
      </RevealButton> 
      }
      {showForm && 
        <Signup/>
      }
      {!(818 < width) && showForm &&
        <RevealButton onClick={() => setShowForm((value) => !value)}>
          login
          <RightArrow icon={faArrowRightLong} />
        </RevealButton> 
      }
    </LoginAndSignUpContainer>
  )
}