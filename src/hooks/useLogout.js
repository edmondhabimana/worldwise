import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext"
import { signoutUser } from "../firebase/config"

export const useLogout = () => {
  const [error, setError] = useState(null)
  const [isPending, setIsPending] = useState(false)
  const { dispatch } = useAuth()
  const navigate = useNavigate()

  const logout = async () => {
    setError(null)
    setIsPending(true)

    try {
      await signoutUser()
      dispatch({type: 'logout'})
      navigate('/login')
      setIsPending(false)
    } catch(error) {
      setError(error.message)
      setIsPending(false)
    }
  }

  return {logout, error, isPending}
}