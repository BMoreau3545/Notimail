import { NavLink } from 'react-router-dom';
import Envoie from '../assets/envoie.png';
import Plus from '../assets/plus.png';
import "../index.css"
import React, { useState } from 'react';
import Mailto from '../assets/LogoNotimail.png';

export const Badpage = () => {
  const [badpage, setBadpage] = useState('');
 


  return (
    <>

        <div>
        <img src={Envoie} alt="" />
        <img src={Plus} alt="" />
      </div>
    </>

  );
};
