import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { NavBar } from './Composants/Navbar.jsx'
import { FormDetails } from './Composants/FormDetails.jsx'
import { AccueilEntreprise } from './Pages/AccueilEntreprise.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <NavBar/>
    <AccueilEntreprise/>
  </React.StrictMode>,
)
