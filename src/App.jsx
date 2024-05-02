import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import GlobalStyles from './styles/GlobalStyles'
import './App.css'
import AppLayout from './ui/AppLayout'
import Home from './features/homepage/Home'
import Pricing from './features/pricing/Pricing'
import Product from './features/product/Product'
import Login from './features/login/Login'

const router = createBrowserRouter([
  {
    element: <AppLayout/>,

    children: [
      {
        path: '/',
        element: <Home/>
      },
      {
        path: '/pricing',
        element: <Pricing/>
      },
      {
        path: '/product',
        element: <Product/>
      },
      {
        path: '/login',
        element: <Login/>
      }
    ]
  }
])

function App() {

  return(
    <>
      <GlobalStyles />
      <RouterProvider router={router}/>
    </>
  )  
  
}

export default App
