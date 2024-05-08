import { Form } from "../../ui/Form"
import { Label } from "../../ui/Label"
import { Input } from "../../ui/Input"
import { Button } from "../../ui/Button"
import { createAuthUserWithEmailAndPassword, 
         createUserDocumentFromAuth } from "../../firebase/config" 
import { useState } from "react"
import styled from "styled-components"

const defaultFormFields = {
  displayName: '',
  email: '',
  password: '',
  confirmPassword: '',
}

const validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

const Error = styled.p`
  color: red;
  font-size: 13px;
`

export default function Signup() {
  const [formField, setFormFields] = useState(defaultFormFields)
  const [ passwordError, setPasswordError ] = useState('')
  const [ displayNameError, setDisplayNameError ] = useState('')
  const [ emailError, setEmailError ] = useState('')
  const [ userExistError, setUserExistError ] = useState('')
  const { displayName, email, password, confirmPassword } = formField
  // console.log(displayName);

  const resetFormFields = () => {
    setFormFields(defaultFormFields)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

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
      resetFormFields()
    } catch (error) {
      if(error.code === 'auth/email-already-in-use') {
        setUserExistError('Cannot create user, email already exist')
      } else if(error.code === 'auth/weak-password'){
        setPasswordError(error.message.slice(10, 50))
      }else {
        console.log('user creation encountered an error', error.message);
      }
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
      <Button>sign up</Button>
      <Error>{userExistError}</Error>
    </Form>
  )
}