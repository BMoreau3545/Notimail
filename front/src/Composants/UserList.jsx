import { NavLink } from 'react-router-dom';
import Mailto from '../assets/LogoNotimail.png';
import "../index.css"
import React, { useState } from 'react';
import {PasswordInput} from './PasswordInput'

export const UserList = () => {
  const [UserList, setUserList] = useState('');

  const handleOptionChange = (event) => {
    setUserList(event.target.value);
  };
  return (
    <>
      <img src={Mailto} id='NotimailLogo' alt="Logo du site" />
      <div>

        <label className='flecheUser' htmlFor="dropdown"></label>
        <select id="dropdown" value={UserList} onChange={handleOptionChange}>
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

        {/* Ajout du composant MDP a la page home  */}
        {<PasswordInput />}
      </div>
    </>
  );
};
