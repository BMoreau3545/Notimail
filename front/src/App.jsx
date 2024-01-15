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

  useEffect(() => {
    fetch('../json')
      .then((res) => res.json())
      .then((data) => {
        setJsonData(data);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage jsonData={jsonData} />} />
        <Route path="/admin" element={<AccueilAdmin jsonData={jsonData} />} />
        <Route path="/adminDetails" element={<FormDetails jsonData={jsonData} />} />
        <Route path="/entreprise" element={<AccueilEntreprise jsonData={jsonData} />} />
        <Route path='*' element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
