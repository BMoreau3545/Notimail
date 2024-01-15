import React, { useState } from 'react';
import Mailto from '../assets/LogoNotimail.png';
import FlecheLog from '../assets/flecheLogin.svg';
import CadenaFermer from '../assets/fermer.png';
import CadenaOuvert from '../assets/ouvert.png';
import { useNavigate } from 'react-router-dom';

export const LoginPage = ({ jsonData }) => {
  const [selectedUser, setSelectedUser] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [password, setPassword] = useState('');
  const [isMouseOver, setIsMouseOver] = useState(false);
  const navigate = useNavigate(); // Utilisez useNavigate pour effectuer des redirections

  const handleOptionChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedUser(selectedValue);
    console.log(`Option sélectionnée : ${selectedValue}`);
  };

  const handleToggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

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
    if (jsonData && jsonData.users) {
      const user = jsonData.users.find(
        (user) => user.firm_name === selectedUser && user.password === password
      );
  
      if (user) {
        // Connexion réussie
        console.log('Connexion réussie');
  
        // Stockez le nom de l'entreprise dans un état local
        const loggedInFirmName = user.firm_name;
  
        // Redirigez l'utilisateur vers la page appropriée après la connexion réussie
        navigate(user.is_admin ? '/admin' : '/entreprise');
  


      } else {
        // Connexion échouée, affichez un message d'erreur ou effectuez d'autres actions
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
            {jsonData && jsonData.users && jsonData.users.map((user) => (
              <option key={user.firm_name} value={user.firm_name}>
                {user.firm_name}
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
      </div>
    </>
  );
};
