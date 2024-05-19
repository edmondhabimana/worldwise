import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import GlobalStyles from './styles/GlobalStyles'
import './App.css'
import AppLayout from './ui/AppLayout'
import Home from './features/homepage/Home'
import Pricing from './features/pricing/Pricing'
import Product from './features/product/Product'
import Login from './features/login/Login'
import WorldWiseApp from './features/map/WorldWiseApp'
import Form, { loader as formLoader } from './features/form/FormComponent'
import {action as addCity } from './features/form/FormComponent'
// , { loader as formLoader }
import CityList from './features/cities/CityList'
import CountryList from './features/countries/CountryList'

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
    ],
  },
  {
    element: <WorldWiseApp/>,
    children: [
      {
        path: '/app/cities',
        element: <CityList/>
      },
      {
        path: '/app/form/:lat/:lng',
        element: <Form/>,
        loader: formLoader,
        action: addCity
      },
      {
        path: '/app/countries',
        element: <CountryList/>
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
