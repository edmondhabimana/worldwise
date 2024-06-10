import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import GlobalStyles from './styles/GlobalStyles'
import './App.css'
import AppLayout from './ui/AppLayout'
import Home from './features/homepage/Home'
import Pricing from './features/pricing/Pricing'
import Product from './features/product/Product'
import Login from './features/login/Login'
import WorldWiseApp from './features/map/WorldWiseApp'
import ProtectedRoutes from './features/protectedRoutes/ProtectedRoutes'
import Form, { loader as formLoader } from './features/form/FormComponent'
import {action as addCity } from './features/form/FormComponent'
import CityList from './features/cities/CityList'
import CountryList, {loader as countriesLoader} from './features/countries/CountryList'
import City, {loader as currentCityLoader} from './features/cities/City'
import SelectByCountry, {loader as citiesByCountryLoader} from './features/cities/SelectByCountry'
import Error from './features/error/Error'


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
    element: (
      <ProtectedRoutes>
        <WorldWiseApp/>
      </ProtectedRoutes>
    ),
    errorElement: <Error/>,

    children: [
      {
        path: '/app/cities',
        element: <CityList/>,
      },
      {
        path: '/app/cities/:id',
        element: <City/>,
        loader: currentCityLoader,
        errorElement: <Error/>
      },
      {
        path: '/app/form/:lat/:lng',
        element: <Form/>,
        loader: formLoader,
        action: addCity,
        errorElement: <Error/>
      },
      {
        path: '/app/countries',
        element: <CountryList/>,
        loader: countriesLoader,
        errorElement: <Error/>
      },
      {
        path: '/app/countries/:country',
        element: <SelectByCountry/>,
        loader: citiesByCountryLoader,
        errorElement: <Error/>
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
