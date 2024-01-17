import React, { useState } from 'react';
import Mailto from '../assets/LogoNotimail.png';
import FlecheLog from '../assets/flecheLogin.svg';
import CadenaFermer from '../assets/fermer.png';
import CadenaOuvert from '../assets/ouvert.png';
import { useNavigate } from 'react-router-dom';

export const LoginPage = ({ dataFirmName, updateLoggedInFirmName }) => {
  const [selectedUser, setSelectedUser] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [loginFirm, setLoginFirm] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
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

  const handleFirmChange = (event) => {
    //Login envoyer au serv
    setLoginFirm(event.target.value);
  };

  const handlePasswordChange = (event) => {
    //login mdp envoyer au serv
    setLoginPassword(event.target.value);
  };


  const handleMouseEnter = () => {
    setIsMouseOver(true);
  };

  const handleMouseLeave = () => {
    setIsMouseOver(false);
  };


  const handleLogin = async () => {
    try {
      const response = await fetch('http://localhost:3000/users/get_all_users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firm_name: selectedUser,
          password: loginPassword,
        }),
      });

      if (response.ok) {
        const user = await response.json();

        // Mise à jour de l'état dans le composant parent
        updateLoggedInFirmName(user.firm_name);

        // Navigation vers la page appropriée
        navigate(user.is_admin ? '/admin' : '/entreprise');
      } else {
        setErrorMessage('Nom d\'entreprise ou mot de passe incorrect');
      }
    } catch (error) {
      console.error('Erreur lors de la connexion :', error);
      setErrorMessage('Une erreur s\'est produite lors de la connexion');
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
            value={loginPassword}
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
