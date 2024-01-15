import React, { useState } from 'react';
import Mailto from '../assets/LogoNotimail.png';
import FlecheLog from '../assets/flecheLogin.svg';
import CadenaFermer from '../assets/fermer.png';
import CadenaOuvert from '../assets/ouvert.png';

export const LoginPage = () => {
  const [selectedUser, setSelectedUser] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleOptionChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedUser(selectedValue);
    console.log(`Option sélectionnée : ${selectedValue}`);
  };

  const handleToggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

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
      <div className='center column'>
        <img src={Mailto} id='NotimailLogo' alt="Logo du site" />
        <div className="center">
          <label className='flecheUser' htmlFor="dropdown" onClick={handleToggleDropdown}></label>
          <select
            id="dropdown"
            value={selectedUser}
            onChange={handleOptionChange}
            size={isDropdownOpen ? 5 : 1} // Changer la taille en fonction de l'état du menu déroulant
          >
            <option value=""></option>
            <option value="entreprise01">Entreprise 01</option>
            <option value="entreprise02">Entreprise 02</option>
            <option value="entreprise03">Entreprise 03</option>
            <option value="entreprise04">Entreprise 04</option>
            <option value="entreprise05">Entreprise 05</option>
            <option value="entreprise06">Entreprise 06</option>
            <option value="entreprise07">Entreprise 07</option>
            <option value="entreprise08">Entreprise 08</option>
            <option value="entreprise09">Entreprise 09</option>
            <option value="entreprise10">Entreprise 10</option>
            <option value="entreprise11">Entreprise 11</option>
            <option value="entreprise12">Entreprise 12</option>
            <option value="entreprise13">Entreprise 13</option>
            <option value="entreprise14">Entreprise 14</option>
            <option value="entreprise15">Entreprise 15</option>
            <option value="entreprise16">Entreprise 16</option>
            <option value="entreprise17">Entreprise 17</option>
            <option value="entreprise18">Entreprise 18</option>
            <option value="entreprise19">Entreprise 19</option>
            <option value="entreprise20">Entreprise 20</option>
            <option value="entreprise21">Entreprise 21</option>
            <option value="entreprise22">Entreprise 22</option>
            <option value="entreprise23">Entreprise 23</option>
            <option value="entreprise24">Entreprise 24</option>
            <option value="entreprise25">Entreprise 25</option>
            <option value="entreprise26">Entreprise 26</option>
            <option value="entreprise27">Entreprise 27</option>
            <option value="entreprise28">Entreprise 28</option>
            <option value="entreprise29">Entreprise 29</option>
            <option value="entreprise30">Entreprise 30</option>
            <option value="entreprise31">Entreprise 31</option>
            <option value="entreprise32">Entreprise 32</option>
            <option value="entreprise33">Entreprise 33</option>
            <option value="entreprise34">Entreprise 34</option>
            <option value="entreprise35">Entreprise 35</option>
            <option value="entreprise36">Entreprise 36</option>
            <option value="entreprise37">Entreprise 37</option>
            <option value="entreprise38">Entreprise 38</option>
            <option value="entreprise39">Entreprise 39</option>
            <option value="entreprise40">Entreprise 40</option>
            <option value="Admin">Admin</option>
          </select>
          <img
            src={FlecheLog}
            id='flechelog'
            alt="fleche select entreprise"
            onClick={handleToggleDropdown} // Cliquer sur l'image doit également déclencher le changement d'état
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
          <img src={isMouseOver ? CadenaOuvert : CadenaFermer} id="login" alt="Logo du site" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} />
        </div>
      </div>
    </>
  );
};
