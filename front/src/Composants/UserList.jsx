import { NavLink } from 'react-router-dom';
import Mailto from '../assets/LogoNotimail.png';
import "../index.css"
import React, { useState } from 'react';

export const UserList = () => {
  const [UserList, setUserList] = useState(''); 

  const handleOptionChange = (event) => {
    setUserList(event.target.value);
  };
  return (
    <div>
      <label htmlFor="dropdown"></label>
      <select id="dropdown" value={UserList} onChange={handleOptionChange}>

       <option value=""> </option>
        <option value="entreprise01">Entreprise 01</option>
        <option value="entreprise02">Entreprise 02</option>
        <option value="entreprise03">Entreprise 03</option>
        <option value="entreprise04">Entreprise 04</option>
        <option value="entreprise05">Entreprise 05</option>
        <option value="entreprise06">Entreprise 06</option>
        <option value="entreprise07">Entreprise 07</option>
        <option value="entreprise08">Entreprise 08</option>
        
      </select>
    </div>
  );
};
