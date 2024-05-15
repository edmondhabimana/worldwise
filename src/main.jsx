import React from 'react'
import ReactDOM from 'react-dom/client'
import { StyleSheetManager } from 'styled-components'
import App from './App.jsx'
import './index.css'
import { CitiesProvider } from './contexts/citiesContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <StyleSheetManager shouldForwardProp={() => true}>
      <CitiesProvider>
        <App />
      </CitiesProvider>
    </StyleSheetManager>
  </React.StrictMode>,
)
