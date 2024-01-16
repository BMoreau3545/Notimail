import React, { useState } from 'react';
import Mailto from '../assets/LogoNotimail.png';
import FlecheLog from '../assets/flecheLogin.svg';
import CadenaFermer from '../assets/fermer.png';
import CadenaOuvert from '../assets/ouvert.png';
import { useNavigate } from 'react-router-dom';

export const LoginPage = ({ dataFirmName, updateLoggedInFirmName }) => {
  const [selectedUser, setSelectedUser] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [password, setPassword] = useState('');
  const [isMouseOver, setIsMouseOver] = useState(false);
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState('');

  const handleOptionChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedUser(selectedValue);
    console.log(`Option sélectionnée : ${selectedValue}`);
  };

  const handleToggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleLogin();
    }
  }

  const handleMouseEnter = () => {
    setIsMouseOver(true);
  };

  const handleMouseLeave = () => {
    setIsMouseOver(false);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleLogin = () => {
    if (dataFirmName && dataFirmName.length > 0) {
      const user = dataFirmName.find(
        (user) => user.firm_name === selectedUser && user.password === password
      );

      if (user) {
        const loggedInFirmName = user.firm_name;
        console.log(loggedInFirmName);
        setErrorMessage('');
        navigate(user.is_admin ? '/admin' : '/entreprise');
      } else {
        setErrorMessage('Nom d\'entreprise ou mot de passe incorrect');
        console.log('Nom d\'entreprise ou mot de passe incorrect');
      }
    } else {
      console.error('Données JSON non disponibles');
    }
  };

  return (
    <>
      <div className='center column'>
        <img src={Mailto} id='NotimailLogo' alt="Logo du site" />
        <div className="center">
          <label className='flecheUser' htmlFor="dropdown" onClick={handleToggleDropdown}></label>
          <select
            id="dropdown"
            value={selectedUser}
            onChange={handleOptionChange}
            size={isDropdownOpen ? 5 : 1}
          >
            <option value=""></option>
            {dataFirmName && dataFirmName.map((index) => (
              <option key={index} value={index}>
                {index}
              </option>
            ))}

          </select>
          <img
            src={FlecheLog}
            id='flechelog'
            alt="fleche select entreprise"
            onClick={handleToggleDropdown}
            style={{ cursor: 'pointer' }}
          />
        </div>

        <div className='AreaPassword'>
          <input
            type="password"
            id="password"
            name="password"
            placeholder='Mot de passe'
            value={password}
            onChange={handlePasswordChange}
            onKeyDown={handleKeyDown}
          />
          <img
            src={isMouseOver ? CadenaOuvert : CadenaFermer}
            id="login"
            alt="Logo du site"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={handleLogin}
            style={{ cursor: 'pointer' }}
          />

        </div>
        {errorMessage && (
          <div style={{ color: 'red', marginTop: '10px' }}>{errorMessage}</div>
        )}
      </div>
    </>
  );
};
