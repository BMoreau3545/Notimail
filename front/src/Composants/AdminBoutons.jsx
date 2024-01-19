import MailSelect from '../assets/envoie.png';
import Newuser from '../assets/plus.png';
import "../adminboutons.css";
import React, { useState } from 'react';
import Modal from 'react-responsive-modal';
import { NavLink } from 'react-router-dom';

export const AdminBoutons = ({ cardData, newANotif }) => {
  const [open, setOpen] = useState(false);

  // Gestion de la modal
  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);

  // Filtrer les entreprises notifiées (true dans newANotif)
  const notifiedFirms = cardData && cardData
    ? cardData.filter((user, index) => newANotif[index])
    : [];

  return (
    <>
      <div id='badpage'>
        <NavLink to="/adminDetails">
          <button>
            <img src={Newuser} className="icon" alt="Bouton pour ajouter un utilisateur" />
          </button>
        </NavLink>
        <button>
          <img src={MailSelect} onClick={onOpenModal} className="icon" alt="Bouton pour envoyer un mail aux entreprises cochées" />
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
          <button className='envoyer'>Envoyer</button>
        </div>
      </Modal>
    </>
  );
};
