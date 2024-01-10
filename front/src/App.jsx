import { useState } from 'react'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { UserList } from './composants/UserList.jsx';
import { AccueilEntreprise } from './Pages/AccueilEntreprise.jsx';
import { FormDetails } from './composants/FormDetails.jsx';
import { AccueilAdmin } from './Pages/AccueilAdmin.jsx';
import { Error } from './Pages/Error.jsx';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<UserList />} />
        <Route path="/admin" element={<AccueilAdmin />} /> 
        <Route path="/admindetails" element={<FormDetails />} />
        <Route path="/entreprise" element={<AccueilEntreprise />} /> 
        <Route path='*' element={<Error/>}></Route>
        {/* <Route path="/Entreprise/:id" element={<EntrepriseID />} /> */}
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App


