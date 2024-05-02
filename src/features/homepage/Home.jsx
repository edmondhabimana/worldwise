import { useEffect } from "react"
import { useOutletContext } from "react-router-dom"

export default function Home() {

  const [ setBackgroundImage ] = useOutletContext()

  useEffect(() => {
    setBackgroundImage(true)
  }, [setBackgroundImage])

  return (
    <div>
    <h1>You travel the world.
    WorldWise keeps track of your adventures.</h1>
    <p>A world map that tracks your footsteps into every city you can think of. Never forget your wonderful experiences, and show your friends how you have wandered the world.</p>
    </div>
  )
}