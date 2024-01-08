import { NavLink } from 'react-router-dom';
import Mailto from '../assets/LogoNotimail.png';
import "../index.css"
import React, { useState } from 'react';

export const PasswordInput = () => {
  const [password, setPassword] = useState('');

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };


  return (
    <div>
      <input
        type="password"
        id="password"
        name="password"
        value={password}
        onChange={handlePasswordChange}
      />
    </div>
  );
};
