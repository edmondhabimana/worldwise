import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../../contexts/AuthContext"
import { Form } from "../../ui/Form"
import { Label } from "../../ui/Label"
import { Input } from "../../ui/Input"
import { Button } from "../../ui/Button"
import { Error } from "../../ui/Error"
import { createAuthUserWithEmailAndPassword, 
         createUserDocumentFromAuth,
         updateUserDisplayNameOnProfileObject } from "../../firebase/config" 
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSpinner } from "@fortawesome/pro-light-svg-icons"

const defaultFormFields = {
  displayName: '',
  email: '',
  password: '',
  confirmPassword: '',
}

const validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

export default function Signup() {
  const [formField, setFormFields] = useState(defaultFormFields)
  const [ passwordError, setPasswordError ] = useState('')
  const [ displayNameError, setDisplayNameError ] = useState('')
  const [ emailError, setEmailError ] = useState('')
  const [ isPending, setIsPending ] = useState(false)
  const [ userExistError, setUserExistError ] = useState('')
  const { displayName, email, password, confirmPassword } = formField
  // console.log(displayName);
  const navigate = useNavigate()
  const { dispatch } = useAuth()

  const resetFormFields = () => {
    setFormFields(defaultFormFields)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setIsPending(true)

    if(displayName === '') {
      setDisplayNameError('User name required')
      return
    }

    if(email.slice(-4) !== '.com') {
      setEmailError('Email address required')
      return
    }

    if(!email.match(validRegex)) {
      setEmailError('Email address required')
      return
    }

    if(email === '') {
      setEmailError('Email address required')
      return
    }

    if (password === '' || confirmPassword === '') {
      setPasswordError('password required')
      return
    }

    if(password !== confirmPassword) {
      setPasswordError('passwords do not match')
      return
    }

    try{
      const { user } = await createAuthUserWithEmailAndPassword(
        email,
        password
      );

      await createUserDocumentFromAuth(user, {displayName})
      await updateUserDisplayNameOnProfileObject(displayName)

      dispatch({type: 'login', payload: user})
      
      setIsPending(false)
      resetFormFields()
      navigate('/app/cities')
    } catch (error) {
      if(error.code === 'auth/email-already-in-use') {
        setUserExistError('Cannot create user, email already exist')
      } else if(error.code === 'auth/weak-password'){
        setPasswordError(error.message.slice(10, 50))
      }else {
        console.log('user creation encountered an error', error.message);
      }
      setIsPending(false)
    }

    console.log('form was submitted');
  }

  const handleChange = (event) => {
    const { name, value } = event.target

    setFormFields({...formField, [name]: value})
  }

  return(
    <Form onSubmit={handleSubmit}>
      <Label>
        <span>Display Name</span>
        <Input 
          type="text" 
          placeholder="Jack Denial" 
          name="displayName" 
          onChange={() => handleChange(event)}
          onFocus={() => setDisplayNameError('')}
          value={displayName}
        />
        <Error>{displayNameError}</Error>
      </Label>
      <Label>
        <span>Email Address</span>
        <Input 
          type="email" 
          placeholder="jack@example.com"
          name="email"
          onChange={() => handleChange(event)}
          onFocus={() => setEmailError('')}
          value={email}
        />
        <Error>{emailError}</Error>
      </Label>
      <Label>
        <span>Password</span>
        <Input 
          type="password" 
          placeholder="Password"
          name="password"
          value={password}
          onChange={() => handleChange(event)}
          onFocus={() => setPasswordError('')}
        />
        <Error>{passwordError}</Error>
      </Label>
      <Label>
        <span>Confirm Password</span>
        <Input 
          type="password" 
          placeholder="Confirm Password"
          name="confirmPassword"
          value={confirmPassword}
          onChange={() => handleChange(event)}
          onFocus={() => setPasswordError('')}
        />
        <Error>{passwordError}</Error>
      </Label>
      <Button>
        {isPending && <FontAwesomeIcon icon={faSpinner} spin />}
        {!isPending && 'sign up'}
      </Button>
      <Error>{userExistError}</Error>
    </Form>
  )
}