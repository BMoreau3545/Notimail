import React, { useState } from 'react';
import Mailto from '../assets/LogoNotimail.png';
import FlecheLog from '../assets/flecheLogin.svg';
import CadenaFermer from '../assets/fermer.png';
import CadenaOuvert from '../assets/ouvert.png';
import { useNavigate } from 'react-router-dom';

export const LoginPage = ({ dataFirmName, updateLoggedInFirmName }) => {
  const [selectedUser, setSelectedUser] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [loginPassword, setLoginPassword] = useState('');
  const [isMouseOver, setIsMouseOver] = useState(false);
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState('');


  //fonction qui recupere l'option choisi dans la liste d'utlisateur ( via la fleche de selection)
  const handleOptionChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedUser(selectedValue);
    console.log(`Option sélectionnée : ${selectedValue}`);
  };

  //ouverture de la liste deroulante
  const handleToggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  //gestion du submit si touche entrer appuyer
  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleLogin();
    }
  }
 // stock l'information du champs MDP
  const handlePasswordChange = (event) => {
    //login mdp envoyer au serv
    setLoginPassword(event.target.value);
  };

  // changement d'etat et d'image du cadenas a la page connexion lors d'un hover
  const handleMouseEnter = () => {
    setIsMouseOver(true);
  };
  // meme chose , lorsque le hover n'est pu actif
  const handleMouseLeave = () => {
    setIsMouseOver(false);
  };
  //Gestion de la connexion
  const handleLogin = async () => {
    try {
      //fetch de la requete de log in
      const response = await fetch('http://localhost:3000/auth/login', {
        method: 'POST',
        //methode post pour envoyer au serveur les informations entrées (user + mdp )
        headers: {
          'Content-Type': 'application/json',
        },
        // Info envoyer au serv sous la forme d'un JSON
        body: JSON.stringify({
          firm_name: selectedUser,
          password: loginPassword,
          is_admin: selectedUser === 'admin'
        }),
      });
      // Si la reponse du serveur est valide
      if (response.ok) {
        //gestion du token utilisateur sauvegarder en localstorage
        const user = await response.json();
        localStorage.setItem('token', user.token);
        localStorage.setItem('firmName', user.user.firm_name);
        localStorage.setItem('isAdmin', user.user.is_admin);

        // Mise à jour de l'état dans le composant parent
        updateLoggedInFirmName(user.user.firm_name);

        // Navigation vers la page appropriée par defaut entreprise, mais admin si l'user a le statut admin
        navigate(user.user.is_admin ? '/admin' : '/entreprise');
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
