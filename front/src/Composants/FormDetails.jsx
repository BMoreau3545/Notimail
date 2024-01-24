import React, { useState, useEffect } from 'react';
import Mailto from '../assets/LogoNotimail.png';
import { FaArrowLeftLong } from "react-icons/fa6";
import '../index.css';
import { NavLink, useParams } from 'react-router-dom';

export const FormDetails = () => {
  const { firm_name: firmNameParam } = useParams();

  const token = localStorage.getItem('token');

  // Fetch the details of the selected company using firmNameParam
  useEffect(() => {
    fetch(`http://localhost:3000/users/update_user?firm_name=${firmNameParam}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`, 
      },
    })
      .then((res) => res.json())
      .then((companyDetails) => {
        console.log(companyDetails);
      })

      .catch((err) => console.error(err));
  }, [firmNameParam]);

  const handleDeleteFirm = () => {
    // Récupérer le nom de l'entreprise à partir des paramètres d'URL
    const firmName = firmNameParam;
  
    // Vérifier si le nom de l'entreprise est présent (optionnel)
    if (!firmName) {
      console.error("Nom de l'entreprise manquant");
      return;
    }
  
    // Configuration de la requête fetch pour la suppression
    fetch(`http://localhost:3000/users/delete_user/${firmName}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`, 
      },
    })
      .then((response) => {
        if (!response.ok) {
          console.error('Erreur lors de la suppression de l\'entreprise');
          return;
        }
        // Suppression réussie
        console.log('Entreprise supprimée avec succès');
      })
      .catch((error) => {
        console.error('Erreur lors de la suppression de l\'entreprise:', error);
      });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
  };
 //   
 useEffect(() => {
  fetch(`http://localhost:3000/users/get_user/${firmNameParam}`, {
  method: 'GET',
  headers: {
    Authorization: `Bearer ${token}`, 
  },
})
    .then((res) => res.json())
    .then((firmNameParam) => {
      console.log(firmNameParam)
      ;
    })
    .catch((err) => console.error(err));
}, [firmNameParam]);

  // Ajouter une entreprise
  const handleAddFirm = () => {
    // Les données du formulaire à envoyer
    const formData = {
      firm_name: document.getElementById('entreprise').value,
      first_name: document.getElementById('contactNom').value,
      last_name: document.getElementById('contactPrenom').value,
      phone_number: document.getElementById('tel').value,
      email: document.getElementById('email').value,
      isAdmin: document.getElementById('isAdmin').checked,
    };

    // Configuration de la requête fetch
    fetch('http://localhost:3000/users/create_user', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erreur lors de la création de l'entreprise");
        }
        return response.json();
      })
      .then((data) => {
        // Réponse du backend après la création réussie
        console.log('Entreprise créée avec succès:', data);
      })
      .catch((error) => {
        console.error("Erreur lors de la création de l'entreprise:", error);
      });
  };

  return (
    <>
      <section className='SectionForm'>
        <img src={Mailto} id='NotimailLogo' alt="Logo du site" />
        <div className='row align'>
          <NavLink to="/admin">
            <button className='backBtn'>
              <FaArrowLeftLong style={{ fontSize: '2rem', color: '#FFFF' }} />
            </button>
          </NavLink>
          <h2 className='NameEntr'>Entreprise</h2>
        </div>

        <form className='Formulaire' onSubmit={handleSubmit}>

          <div className='row spaceBeetw'>
            <label htmlFor="entreprise">Entreprise:</label>
            <input className='inputForm' type="text" id="entreprise" name="firm_name" placeholder='25 caractère maximum'/>
          </div>

          <div className='row spaceBeetw'>
            <label htmlFor="contactNom">Contact:</label>
            <div className='column'>
              <input className='inputForm contact' type="text" id="contactNom" name="first_name" placeholder='Nom' />
              <input className='inputForm contact' type="text" id="contactPrenom" name="last_name" placeholder='Prénom' />
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
            <input className='inputForm' type="text" id="identifiant" name="manual_password" />
          </div>

          <div className='row flexStart'>
            <label htmlFor="isAdmin">Admin:</label>
            <input className='inputForm' type="checkbox" id="isAdmin" name="isAdmin" />
          </div>

          <div className='row'>
            <div className='row'>
              <button onClick={handleDeleteFirm} type="button" className='deleteBtn'>Supprimer</button>
              <button onClick={handleAddFirm} type="submit" className='submitForm'>Terminer</button>
            </div>
          </div>
        </form>
      </section>
    </>
  );
};
