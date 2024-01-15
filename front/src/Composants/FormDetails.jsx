import Mailto from '../assets/LogoNotimail.png';
import { FaArrowLeftLong } from "react-icons/fa6";
import '../index.css'
import { NavLink } from 'react-router-dom';

export const FormDetails = ({ jsonData }) => {
  const handleSubmit = (event) => {
    //retrait du comportement par defaut du bouton submit qui est de recharger la page
    event.preventDefault();
  }

  return (
    <>
      <section className='SectionForm'>
        <img src={Mailto} id='NotimailLogo' alt="Logo du site" />
        <div className='row align'>
          <NavLink to="/admin">
            <button className='backBtn'><FaArrowLeftLong style={{ fontSize: '2rem', color: '#FFFF' }} /></button>
          </NavLink>
          <h2 className='NameEntr'>Entreprise</h2>
        </div>

        <form className='Formulaire' onSubmit={handleSubmit}>

          <div className='row spaceBeetw'>
            <label htmlFor="entreprise">Entreprise:</label>
            <input className='inputForm' type="text" id="entreprise" name="firm_name" />
          </div>

          <div className='row spaceBeetw'>
            <label htmlFor="contactNom">Contact:</label>
            <div className='column'>
              <input className='inputForm' type="text" id="contactNom" name="first_name" placeholder='Nom' />
              <input className='inputForm' type="text" id="contactPrenom" name="last_name" placeholder='Prénom' />
            </div>
          </div>

          <div className='row spaceBeetw'>
            <label htmlFor="tel">Téléphone:</label>
            <input className='inputForm' type="tel" id="tel" name="phone_number" />
          </div>

          <div className='row spaceBeetw'>
            <label htmlFor="email">Email:</label>
            <input className='inputForm' type="email" id="email" name="email" />
          </div>

          <div className='row spaceBeetw'>
            <label htmlFor="identifiant">Identifiant:</label>
            <input className='inputForm' type="text" id="identifiant" name="password" />
          </div>

          <div className='row'>
            <label htmlFor="isAdmin">Admin:</label>
            <input className='inputForm' type="checkbox" id="isAdmin" name="isAdmin" />
          </div>

          <div className='row'>
            <div className='row'>
              <button type="button" className='deleteBtn'>Supprimer</button>
              <button type="submit" className='submitForm'>Terminer</button>
            </div>
          </div>
        </form>
      </section>

    </>
  );
};
