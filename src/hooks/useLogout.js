import { useState } from "react"
import { useAuth } from "../contexts/AuthContext"
import { signoutUser } from "../firebase/config"

export const useLogout = () => {
  const [error, setError] = useState(null)
  const [isPending, setIsPending] = useState(false)
  const { dispatch } = useAuth()

  const logout = async () => {
    setError(null)
    setIsPending(true)

    try {
      await signoutUser()
      dispatch({type: 'logout'})
      setIsPending(false)
    } catch(error) {
      setError(error.message)
      setIsPending(false)
    }
  }

  return {logout, error, isPending}
}