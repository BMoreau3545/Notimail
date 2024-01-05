import Mailto from '../assets/LogoNotimail.png';
import { FaArrowLeftLong } from "react-icons/fa6";
import '../index.css'

export const FormDetails = () => {
  const handleSubmit = (event) => {
    //retrait du comportement par defaut du bouton submit qui est de recharger la page
    event.preventDefault(); 
  }

  return (
    <>
    <section className='SectionForm'>
      <img src={Mailto} id='NotimailLogo' alt="Logo du site" />
      <div className='row align'>
      <button className='backBtn'><FaArrowLeftLong style={{ fontSize: '2rem',color: '#FFFF'}} /></button> 
      <h2 className='NameEntr'>Entreprise</h2>    
      </div>


      <form className='Formulaire' onSubmit={handleSubmit}>
  
        <div className='row spaceBeetw'>
            <label htmlFor="entreprise">Entreprise:</label>
            <input type="text" id="entreprise" name="entreprise" />
        </div>


        <div className='row spaceBeetw'>
          <label htmlFor="contactNom">Contact:</label>
            <div className='column'>
              <input type="text" id="contactNom" name="contactNom" placeholder='Nom' />
              <input type="text" id="contactPrenom" name="contactPrenom" placeholder='Prénom'/>
            </div>
        </div>
      
        <div className='row spaceBeetw'>
          <label htmlFor="tel">Téléphone:</label>
          <input type="tel" id="tel" name="tel" />
        </div>
        
        <div className='row spaceBeetw'>
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" />
        </div>

        <div className='row spaceBeetw'>
          <label htmlFor="identifiant">Identifiant:</label>
          <input type="text" id="identifiant" name="identifiant" />
        </div>

        <div className='row'>
          <label htmlFor="isAdmin">Admin:</label>
          <input type="checkbox" id="isAdmin" name="isAdmin" />
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
  