import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { NavBar } from './Composants/Navbar.jsx'
import { AccueilEntreprise } from './Pages/AccueilEntreprise.jsx'
import { CardEntreprise } from './Composants/CardEntreprise.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App/>
    {/* <CardEntreprise /> */}
  </React.StrictMode>,
)
