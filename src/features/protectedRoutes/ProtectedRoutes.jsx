import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { useEffect } from "react";

export default function ProtectedRoutes({children}) {
  const { user } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if(user === null) {
      navigate('/login')
    }
  }, [user, navigate])
  return children
}