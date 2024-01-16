// App.js (ou tout autre composant parent)
import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { LoginPage } from './Pages/LoginPage.jsx';
import { AccueilEntreprise } from './Pages/AccueilEntreprise.jsx';
import { AccueilAdmin } from './Pages/AccueilAdmin.jsx';
import { Error } from './Pages/Error.jsx';
import { FormDetails } from './Composants/FormDetails.jsx'

function App() {
  const [jsonData, setJsonData] = useState([]); 
  //save data
  const [loggedInFirmName, setLoggedInFirmName] = useState('');
  //enrengistrement du nom de connexion

  const updateLoggedInFirmName = (firmName) => {
    setLoggedInFirmName(firmName);
  };


  // Fetch base de données 
  useEffect(() => {
    fetch('http://localhost:3000/users/get_all_firm_name  ')
      .then((res) => res.json())
      .then((data) => {
        setJsonData(data);
        console.log(data)
      })
      .catch((err) => {
        console.error('Erreur de requête fetch :', err);
      });
      
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/" element={<LoginPage jsonData={jsonData} updateLoggedInFirmName={updateLoggedInFirmName} loggedInFirmName={loggedInFirmName} />} />
        <Route path="/admin" element={<AccueilAdmin jsonData={jsonData} loggedInFirmName={loggedInFirmName} />} />
        <Route path="/entreprise" element={<AccueilEntreprise jsonData={jsonData} loggedInFirmName={loggedInFirmName} />} />
        <Route path="/adminDetails" element={<FormDetails jsonData={jsonData} />} />
        <Route path='*' element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
