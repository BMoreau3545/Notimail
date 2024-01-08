import { NavLink } from 'react-router-dom';
import CadenaFermer from '../assets/fermer.png';
import CadenaOuvert from '../assets/ouvert.png';
import "../index.css"
import React, { useState } from 'react';
import Mailto from '../assets/LogoNotimail.png';

export const PasswordInput = () => {
  const [password, setPassword] = useState('');
  const [isMouseOver, setIsMouseOver] = useState(false);

  const handleMouseEnter = () => {
    setIsMouseOver(true);
  };

  const handleMouseLeave = () => {
    setIsMouseOver(false);
  };
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
        <img  src={isMouseOver ? CadenaOuvert : CadenaFermer} id="login" class="glow" alt="Logo du site" onMouseEnter={handleMouseEnter}        onMouseLeave={handleMouseLeave}/>
      </div>
    </>

  );
};
