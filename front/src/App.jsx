import { useState } from 'react'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { UserList } from './composants/UserList.jsx';
import { AccueilEntreprise } from './Pages/AccueilEntreprise.jsx';
import { FormDetails } from './composants/UserList.jsx';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/home" element={<UserList />} />
        {/* <Route path="/Admin" element={<AccueilAdmin />} /> */}
        <Route path="/admindetails" element={<FormDetails />} />
        <Route path="/entreprise" element={<AccueilEntreprise />} /> 
        {/* <Route path="/Entreprise/:id" element={<EntrepriseID />} /> */}
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App


