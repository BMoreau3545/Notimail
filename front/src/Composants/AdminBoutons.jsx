import MailSelect from '../assets/envoie.png';
import Newuser from '../assets/plus.png';
import "../adminboutons.css";
import React, { useEffect, useState } from 'react';
import Modal from 'react-responsive-modal';
import { NavLink } from 'react-router-dom';

export const AdminBoutons = ({ cardData, newANotif }) => {
  const [open, setOpen] = useState(false);
  const [notifiedFirms, setNotifiedFirms] = useState([]);

  // Gestion de la modal
  const onOpenModal = () => {
    setNotifiedFirms(getNotifiedFirms());
    setOpen(true);
  };
  const onCloseModal = () => setOpen(false);

  useEffect (() => {
    console.log('test', notifiedFirms);
  }, [notifiedFirms]);

  // Fonction pour obtenir les entreprises notifiées
  const getNotifiedFirms = () => {
    console.log(newANotif)
    return cardData && cardData
      ? cardData.filter((user, index) => newANotif[index])
      : [];
  };

  // Fonction pour envoyer la notification aux entreprises
  const handleSendNotification = async () => {
    try {
    
      const response = await fetch('http://localhost:3000/users/notify', {
        method: 'PUT',
        headers: {
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmaXJtX25hbWUiOiJhZG1pbiIsImlhdCI6MTcwNTY3NjM2MywiZXhwIjoxNzEzNDUyMzYzfQ.jswgQhW1Cr4uGI4n3kj_nbosNC18LxKjg7GfOSXC_3s`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firm_names: notifiedFirms.map(user => user.firm_name),
          
        }),
      });

      const dataNotif = await response.json();
      console.log(dataNotif);

      if (response.ok) {
        console.log('Notification envoyée avec succès');
      } else {
        console.error('Erreur lors de l\'envoi de la notification', response);
      }
    } catch (error) {
      console.error('Erreur lors de la notification', error, response);
    } finally {
      onCloseModal();
    }
  };

  return (
    <>
      <div id='badpage'>
        <NavLink to="/adminDetails">
          <button>
            <img src={Newuser} className="icon" alt="Bouton pour ajouter un utilisateur" />
          </button>
        </NavLink>
        <button onClick={onOpenModal}>
          <img src={MailSelect} className="icon" alt="Bouton pour envoyer un mail aux entreprises cochées" />
        </button>
      </div>

      <Modal open={open} onClose={onCloseModal} center>
        <p>
          Vous vous apprêtez à notifier :
        </p>
        <div className='mailList'>
          <ul>
            {notifiedFirms.map((user) => (
              <li key={user.firm_name}>{user.firm_name}</li>
            ))}
          </ul>
        </div>
        <div className='boutonsModal'>
          <button onClick={onCloseModal} className='annuler'>Annuler</button>
          <button onClick={handleSendNotification} className='envoyer'>Envoyer</button>
        </div>
      </Modal>
    </>
  );
};
