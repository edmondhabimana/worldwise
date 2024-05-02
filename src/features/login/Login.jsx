import { useEffect } from "react"
import { useOutletContext } from "react-router-dom"

export default function Login() {

  const [ setBackgroundImage ] = useOutletContext()

  useEffect(() => {
    setBackgroundImage(false)
  }, [setBackgroundImage])

  return(
    <h1>Login</h1>
  )
}