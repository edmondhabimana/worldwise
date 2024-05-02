import { useEffect } from "react"
import { useOutletContext } from "react-router-dom"

export default function Product() {
  const [ setBackgroundImage ] = useOutletContext()

  useEffect(() => {
    setBackgroundImage(false)
  }, [setBackgroundImage])
  
  return(
    <h1>Product</h1>
  )
}