import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { LoginPage } from './Pages/LoginPage.jsx';
import { AccueilEntreprise } from './Pages/AccueilEntreprise.jsx';
import { AccueilAdmin } from './Pages/AccueilAdmin.jsx';
import { Error } from './Pages/Error.jsx';
import { FormDetails } from './Composants/FormDetails.jsx';
import { EditForm } from './Composants/EditForm.jsx';

function App() {
  //liste des users
  const [dataFirmName, setDataFirmName] = useState([]); 
  //donnée des champs du loggin renvoyer au back
  const [loggedInFirmName, setLoggedInFirmName] = useState('');
  const [loginPassword, setLoginPassword] = useState('');


  //fonction pour recuperer le nom d'utilisateur utilisé 
  const updateLoggedInFirmName = (firmName) => {
    setLoggedInFirmName(firmName);
  };

  //fetch des utilisateur existant ( choix deroulant )
  useEffect(() => { 
    fetch('http://localhost:3000/users/get_all_firm_name')
      .then((res) => res.json())
      .then((dataFirmName) => {
        setDataFirmName(dataFirmName);
      })
      .catch((err) => {
        console.error('Erreur de requête fetch :', err);
      });
  }, []);

  return (
    <BrowserRouter>
      <Routes> 
        <Route path="/" element={ <LoginPage
              loginPassword={loginPassword}
              dataFirmName={dataFirmName}
              updateLoggedInFirmName={updateLoggedInFirmName}
              loggedInFirmName={loggedInFirmName} />
          }
        />
        <Route
          path="/admin"
          element={<AccueilAdmin dataFirmName={dataFirmName} loggedInFirmName={loggedInFirmName} />}
        />
        <Route
          path="/entreprise"
          element={<AccueilEntreprise dataFirmName={dataFirmName} loggedInFirmName={loggedInFirmName} />}
        />
        <Route
          path="/adminDetails"
          element={<FormDetails />}
        />
        <Route path="/adminDetails/:firm_name" element={<EditForm />} />
        <Route path='*' element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;