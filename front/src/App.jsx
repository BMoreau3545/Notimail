// App.js (ou tout autre composant parent)
import { useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { LoginPage } from './Pages/LoginPage.jsx';
import { AccueilEntreprise } from './Pages/AccueilEntreprise.jsx';
import { AccueilAdmin } from './Pages/AccueilAdmin.jsx';
import { Error } from './Pages/Error.jsx';
import { FormDetails } from './Composants/FormDetails.jsx'

function App(cardData) {
  const [dataFirmName, setDataFirmName] = useState([]); 
  //save data fetch
  const [loggedInFirmName, setLoggedInFirmName] = useState('');
  //enrengistrement du nom de connexion

  const updateLoggedInFirmName = (firmName) => {
    setLoggedInFirmName(firmName);
  };


  // Fetch base de données 
  useEffect(() => {
    fetch('http://localhost:3000/users/get_all_firm_name')
      .then((res) => res.json())
      .then((data) => {
       setDataFirmName(data);
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
          path="/" element={<LoginPage dataFirmName={dataFirmName} updateLoggedInFirmName={updateLoggedInFirmName} loggedInFirmName={loggedInFirmName} />} />
        <Route path="/admin" element={<AccueilAdmin dataFirmName={dataFirmName} loggedInFirmName={loggedInFirmName} />} />
        <Route path="/entreprise" element={<AccueilEntreprise dataFirmName={dataFirmName} loggedInFirmName={loggedInFirmName} />} />
        <Route path="/adminDetails" element={<FormDetails cardData={cardData} dataFirmName={dataFirmName} />} />
        <Route path='*' element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
