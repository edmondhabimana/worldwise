import { useEffect } from "react"
import { useOutletContext } from "react-router-dom"

export default function Pricing() {

  const [ setBackgroundImage ] = useOutletContext()

  useEffect(() => {
    setBackgroundImage(false)
  }, [setBackgroundImage])

  return(
    <h1>Pricing</h1>
  )
}