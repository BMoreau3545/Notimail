import { useState } from 'react'
import './App.css'
// import { BrowserRouter, Route, Routes } from 'react-router-dom';
// import { Home } from './pages/home';
// import { AccueilEntreprise } from './Pages/AccueilEntreprise'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/AccueilAdmin" element={<AccueilAdmin />} />
        <Route path="/AccueilAdminDetails" element={<AccueilAdminDetails />} />
        <Route path="/AccueilEntreprise" element={<AccueilEntreprise />} />
        <Route path="/Entreprise/:id" element={<EntrepriseID />} />
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App


