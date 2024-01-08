import { NavLink } from 'react-router-dom';
import Cadena from '../assets/fermer.png';
import "../index.css"
import React, { useState } from 'react';
import Mailto from '../assets/LogoNotimail.png';

export const PasswordInput = () => {
  const [password, setPassword] = useState('');

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };


  return (
    <>
        <div className='AreaPassword'>
        <input
          type="password"
          id="password"
          name="password"
          placeholder='Mot de passe'
          value={password}
          onChange={handlePasswordChange}
        />
        <img src={Cadena} id="login" alt="Logo du site" />
      </div>
    </>

  );
};
